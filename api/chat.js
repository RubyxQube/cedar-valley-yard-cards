const SYSTEM_PROMPT = `You are the AI assistant for Cedar Valley Yard Cards, a yard card rental business in Eagle Mountain, Utah. Help customers with questions, pricing, and booking.

BUSINESS INFO:
- Service: Full-service yard card rental — delivery, setup, all-day display, and teardown included
- Price: $80 flat rate for Eagle Mountain & Saratoga Springs. Lehi, Herriman, and surrounding areas have a travel fee.
- Rush fee: +$25 for bookings less than 48 hours out
- Cancellation fee: $25 within 48 hours of scheduled setup
- Occasions: Birthdays, graduations, missionary returns/farewells, welcome homes, new babies, retirements, anniversaries, and more
- Setup time: Early morning (5am–7am) so the display is waiting when they wake up
- Rental period: One day (setup in the morning, pickup in the evening). Longer available — ask when booking.
- Booking: Fill out the form on the website; confirmed within 24 hours
- Phone: (801) 598-9197
- Service area: Eagle Mountain, Saratoga Springs, Lehi, Herriman

LEAD CAPTURE: Collect the customer's name, contact info (phone or email), and what they need (occasion and/or date) through natural conversation — never ask for all three at once. Once you have all three, call the capture_lead tool.

TONE: Friendly, warm, direct. Like a neighbor who does this for a living. Never pushy or salesy. Answer questions first, then offer help. Never make up prices or details not listed above.

FORMATTING RULES — this is a chat widget:
- Use **bold** for emphasis and *italics* sparingly — they render correctly.
- For lists, write each item on its own line starting with "- "
- Separate topics with a blank line.
- No hashtag headers (##). No horizontal rules (---). No backticks.
- Keep responses concise — this is a small chat bubble, not a document.`;

const TOOLS = [
  {
    name: 'capture_lead',
    description: 'Call this once you have collected the customer name, contact info (phone or email), and what they need. Sends an alert to the business owner.',
    input_schema: {
      type: 'object',
      properties: {
        name:    { type: 'string', description: 'Customer name' },
        contact: { type: 'string', description: 'Phone number or email address' },
        details: { type: 'string', description: 'What they need — occasion, date, honoree name, any other details' },
        reply:   { type: 'string', description: 'Your confirmation message to the customer' },
      },
      required: ['name', 'contact', 'details', 'reply'],
    },
  },
];

async function sendAlerts({ name, contact, details }) {
  const msg = `New lead from Cedar Valley Yard Cards chat!\n\nName: ${name}\nContact: ${contact}\nDetails: ${details}`;
  const tasks = [];

  if (process.env.NTFY_TOPIC) {
    tasks.push(
      fetch(`https://ntfy.sh/${process.env.NTFY_TOPIC}`, {
        method: 'POST',
        body: msg,
        headers: { Title: 'CVYC Chat Lead', Priority: 'high' },
      }).catch(() => {})
    );
  }

  if (process.env.TEXTBELT_KEY && process.env.ALERT_PHONE_NUMBER) {
    tasks.push(
      fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: process.env.ALERT_PHONE_NUMBER,
          message: msg.slice(0, 160),
          key: process.env.TEXTBELT_KEY,
        }),
      }).catch(() => {})
    );
  }

  if (process.env.RESEND_API_KEY && process.env.ALERT_EMAIL) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Cedar Valley Yard Cards <noreply@cedarvalleyyardcards.com>',
          to: process.env.ALERT_EMAIL,
          subject: 'New Chat Lead — Cedar Valley Yard Cards',
          text: msg,
        }),
      }).catch(() => {})
    );
  }

  await Promise.allSettled(tasks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'Invalid request' });

  let apiRes;
  try {
    apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages,
      }),
    });
  } catch (err) {
    console.error('[chat] network error', err);
    return res.status(500).json({ error: 'Something went wrong. Please call us at (801) 598-9197.' });
  }

  if (!apiRes.ok) {
    const errBody = await apiRes.text().catch(() => '');
    console.error('[chat] Anthropic error', apiRes.status, errBody);
    return res.status(500).json({ error: 'Something went wrong. Please call us at (801) 598-9197.' });
  }

  const data = await apiRes.json();

  const toolUse = data.content?.find(b => b.type === 'tool_use' && b.name === 'capture_lead');
  if (toolUse) {
    const { name, contact, details, reply } = toolUse.input;
    await sendAlerts({ name, contact, details });
    return res.status(200).json({ type: 'lead_captured', reply });
  }

  const textBlock = data.content?.find(b => b.type === 'text');
  const reply = textBlock?.text || "Sorry, I didn't catch that. Give us a call at (801) 598-9197.";
  return res.status(200).json({ type: 'message', reply });
}
