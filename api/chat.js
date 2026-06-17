export const config = { runtime: 'nodejs' };

const CAPTURE_LEAD_TOOL = {
  name: 'capture_lead',
  description: "Call this tool exactly once when you have collected the visitor's name, a way to contact them (phone or email), and what they are celebrating or need help with. Do not call it before all three are known.",
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: "The visitor's full name or first name as given." },
      contact: { type: 'string', description: 'Phone number or email address the visitor provided.' },
      occasion: { type: 'string', description: 'What they are celebrating or what they need (e.g. "Birthday for my son turning 10", "Graduation for Emma").' },
    },
    required: ['name', 'contact', 'occasion'],
  },
};

const DEFAULT_SYSTEM_PROMPT = `You are the friendly chat assistant for Cedar Valley Yard Cards, a yard card rental business in Eagle Mountain, Utah.

Your job is to answer visitor questions, help them figure out what they need, and capture their contact info so the team can follow up.

ABOUT THE BUSINESS:
- Business: Cedar Valley Yard Cards
- Phone: (801) 598-9197
- Location: Eagle Mountain, Utah
- Service area: Eagle Mountain, Saratoga Springs, Lehi, and Herriman

PRICING:
- Base price: $80 flat rate (includes delivery, setup, and teardown)
- Rush fee: +$25 for bookings with less than 48 hours notice
- Cancellation fee: $25 if cancelled within 48 hours of scheduled setup
- Damage fee: $25 per damaged piece
- Out-of-area: varies — they should call or fill out the booking form for a quote

HOW IT WORKS:
- Signs are delivered and set up between 5am and 7am on the celebration day
- Teardown happens the same evening — it's a one-day rental
- Signs are weather-resistant; severe weather means a free reschedule
- Customers can customize the name, age, colors, and message

OCCASIONS WE SERVE:
- Birthdays (all ages — milestone birthdays especially welcome)
- Graduations (high school and college)
- Missionary farewells and homecomings
- Welcome homes
- Retirements
- New baby arrivals
- Anniversaries

BOOKING:
- Recommended lead time is 2–4 weeks
- May and June book up fast — encourage early booking for spring graduates
- To book: visit the Booking page at /booking on the site, or call (801) 598-9197

LEAD CAPTURE INSTRUCTIONS:
Collect the visitor's name, a way to contact them (phone or email), and what they need — but never ask for all three at once. Gather these naturally through conversation. Once you have all three, call the capture_lead tool immediately. Only call it once.

If someone asks about pricing, availability, or wants to get started, guide them toward leaving their info or visiting /booking.

Never make up details about inventory, availability, or anything not listed here. If you don't know, say "I want to make sure I get that right for you — give us a call at (801) 598-9197."

FORMATTING RULES — this is a chat widget:
- You can use **bold** for emphasis and *italics* sparingly — they will render correctly.
- For lists, write each item on its own line starting with "- "
- Separate topics with a blank line.
- No hashtag headers (##). No horizontal rules (---). No backticks.
- Keep responses concise — this is a small chat bubble, not a document.

TONE:
- Friendly, direct, confident. Never salesy or pushy.
- Answer the question first, then offer help.
- Keep responses short — 2–3 sentences unless detail is genuinely needed.
- This is a neighbor-helping-neighbor business. Sound like it.`;

async function fireAlerts(name, contact, occasion) {
  const topic = process.env.NTFY_TOPIC;
  const resendKey = process.env.RESEND_API_KEY;
  const alertEmail = process.env.ALERT_EMAIL;

  await Promise.allSettled([
    topic && fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: `New lead from Cedar Valley Yard Cards chat\n\nName: ${name}\nContact: ${contact}\nOccasion: ${occasion}`,
    }),
    resendKey && alertEmail && fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Cedar Valley Yard Cards <onboarding@resend.dev>',
        to: [alertEmail],
        subject: `New Chat Lead: ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Contact:</strong> ${contact}</p><p><strong>Occasion:</strong> ${occasion}</p>`,
      }),
    }),
  ]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: DEFAULT_SYSTEM_PROMPT,
        tools: [CAPTURE_LEAD_TOOL],
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: 'Something went wrong. Please call us at (801) 598-9197.' });
    }

    const data = await response.json();

    if (data.stop_reason === 'tool_use') {
      const toolBlock = data.content.find(b => b.type === 'tool_use' && b.name === 'capture_lead');
      if (toolBlock) {
        const { name, contact, occasion } = toolBlock.input;
        await fireAlerts(name, contact, occasion);
        return res.status(200).json({
          type: 'lead_captured',
          reply: `Thanks so much, ${name}! I've passed your info along and someone will reach out soon to confirm your date. In the meantime, feel free to call us at (801) 598-9197 if you'd like to talk right away.`,
        });
      }
    }

    const textBlock = data.content.find(b => b.type === 'text');
    return res.status(200).json({ type: 'message', reply: textBlock?.text || '' });

  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please call us at (801) 598-9197.' });
  }
}
