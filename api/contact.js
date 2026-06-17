export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, occasion, address, honoree, message, howHeard } = req.body;

  if (!name || !email || !phone || !date || !occasion || !address || !honoree) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const lines = [
    `New booking request from Cedar Valley Yard Cards website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Date Needed: ${date}`,
    `Occasion: ${occasion}`,
    `Delivery Address: ${address}`,
    `Who We're Celebrating: ${honoree}`,
    message ? `Message/Notes: ${message}` : null,
    howHeard ? `How They Heard About Us: ${howHeard}` : null,
  ].filter(Boolean).join('\n');

  // TODO: swap for email/SMS provider (Resend, Twilio, etc.)
  console.log('[contact form submission]\n', lines);

  return res.status(200).json({ ok: true });
}
