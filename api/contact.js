import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, phone, email, occasion, celebrant, date, address, grassArea, setupTime, displayDesc, preferences, message, hearAbout, promoCode } = req.body;
  try {
    await resend.emails.send({
      from: 'RubyxQube Demo <onboarding@resend.dev>',
      to: process.env.ALERT_EMAIL,
      subject: `New yard card request - ${name} (${occasion})`,
      html: `
        <h2>New Yard Card Booking Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || 'not provided'}</p>
        <hr>
        <p><b>Occasion:</b> ${occasion}</p>
        <p><b>Celebrating:</b> ${celebrant}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Grass area:</b> ${grassArea || 'not specified'}</p>
        <p><b>Setup time:</b> ${setupTime}</p>
        <hr>
        <p><b>Display description:</b> ${displayDesc}</p>
        <p><b>Colors / themes / interests:</b> ${preferences}</p>
        <p><b>Additional notes:</b> ${message || 'none'}</p>
        <hr>
        <p><b>How they heard about us:</b> ${hearAbout || 'not provided'}</p>
        <p><b>Promo code:</b> ${promoCode || 'none'}</p>
      `,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Send failed' });
  }
}
