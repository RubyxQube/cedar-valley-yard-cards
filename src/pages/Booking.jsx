import { useState } from 'react';
import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';
import siteConfig from '../siteConfig';

const OCCASIONS = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'welcome-home', label: 'Welcome Home / Missionary Return' },
  { value: 'new-baby', label: 'New Baby' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'other', label: 'Other' },
];

const FAQS = [
  { q: 'How far in advance do I need to book?', a: 'We recommend 2-4 weeks ahead, especially for graduation season (May-June) when dates go fast. That said, if you need something last-minute, reach out and we\'ll do our best.' },
  { q: 'What areas do you serve?', a: 'We serve Eagle Mountain, Saratoga Springs, Lehi, and Herriman. Not sure if we cover your area? Text us and we\'ll let you know.' },
  { q: 'What time do you set up?', a: 'We set up early morning, usually between 5am and 7am, so the display is waiting when your person wakes up. We\'re gone before they step outside.' },
  { q: 'How long does the display stay up?', a: 'Rentals are typically for one day. We set up in the morning and pick everything up in the evening. Need it longer? Ask when you book and we\'ll work something out.' },
  { q: 'What if it rains?', a: 'Our signs are weather-resistant. If there\'s severe weather forecasted, we\'ll reach out to reschedule or we\'ll work together on a plan that still makes the day special.' },
  { q: 'Can I customize the colors and message?', a: 'Yes - that\'s kind of the whole point. Tell us the name, the age, the colors, and any special message. We\'ll build the display around what feels personal.' },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Booking() {
  usePageMeta(
    'Book a Yard Card | Cedar Valley Yard Cards - Eagle Mountain, Utah',
    'Book your Eagle Mountain yard card rental. We set up and tear down - you take all the credit. Birthdays, graduations, welcome homes, and more.'
  );

  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', occasion: '',
    address: '', honoree: '', message: '', howHeard: '',
    agreeContact: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or text us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="booking-success">
        <SparklesCanvas density={180} />
        <div className="booking-success-content">
          <svg width="64" height="64" fill="none" stroke="var(--teal)" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h1>You're Booked!</h1>
          <p>We'll confirm within 24 hours and follow up to finalize the details. Keep an eye on your phone - we'll text you.</p>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero small-page-hero">
        <SparklesCanvas density={120} />
        <div className="small-hero-content">
          <h1>Book Your Yard Card</h1>
          <p>Fill out the form and we'll confirm within 24 hours. Easy.</p>
        </div>
      </section>

      {/* ── Booking Layout ── */}
      <section className="booking-section">
        <div className="booking-layout">

          {/* ── Form ── */}
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <h2>Tell Us About Your Celebration</h2>

            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(801) 555-0000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date Needed *</label>
                <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="occasion">Occasion *</label>
                <select id="occasion" name="occasion" required value={form.occasion} onChange={handleChange}>
                  <option value="">Select one...</option>
                  {OCCASIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <input id="address" name="address" type="text" required value={form.address} onChange={handleChange} placeholder="123 Main St, Eagle Mountain, UT 84005" />
            </div>

            <div className="form-group">
              <label htmlFor="honoree">Who Are We Celebrating? *</label>
              <input id="honoree" name="honoree" type="text" required value={form.honoree} onChange={handleChange} placeholder="e.g. Emily, turning 16" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Custom Message or Notes <span className="label-optional">(optional)</span></label>
              <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Color preferences, special wording, anything we should know..." />
            </div>

            <div className="form-group">
              <label htmlFor="howHeard">How did you hear about us? <span className="label-optional">(optional)</span></label>
              <select id="howHeard" name="howHeard" value={form.howHeard} onChange={handleChange}>
                <option value="">Select one...</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="google">Google Search</option>
                <option value="neighbor">Saw a Display in the Neighborhood</option>
                <option value="word-of-mouth">Friend or Family Recommendation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="checkbox-option">
              <input id="agreeContact" name="agreeContact" type="checkbox" checked={form.agreeContact} onChange={handleChange} required />
              <label htmlFor="agreeContact">I agree to be contacted about my booking via text or email. *</label>
            </div>

            {status === 'error' && (
              <p className="form-error">{errorMsg}</p>
            )}

            <button type="submit" className="btn form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Request Your Date'}
            </button>

            <p className="form-footnote">
              Prefer to reach us directly? Text <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.
            </p>
          </form>

          {/* ── Trust Sidebar ── */}
          <aside className="booking-trust">
            <div className="booking-trust-card">
              <h3>What Happens Next</h3>
              <ul className="booking-trust-list">
                {[
                  'We confirm your date within 24 hours',
                  'We follow up to finalize colors, message, and details',
                  'We set up early morning while everyone\'s still asleep',
                  'You watch the reaction — we handle teardown that evening',
                ].map((step) => (
                  <li key={step}><CheckIcon /><span>{step}</span></li>
                ))}
              </ul>
            </div>

            <div className="booking-trust-card">
              <h3>Service Area</h3>
              <ul className="booking-area-list">
                {siteConfig.serviceArea.map(area => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
              <p className="booking-trust-note">Not on the list? Text us — we may still be able to help.</p>
            </div>

            <div className="booking-trust-card booking-trust-contact">
              <p>Questions? Reach us anytime.</p>
              <a href={siteConfig.phoneHref} className="booking-phone-link">{siteConfig.phone}</a>
              <div className="booking-social-links">
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                <span>·</span>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="reveal">Common Questions</h2>
          <div className="faq-grid">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="faq-item reveal">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
