import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

const ChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0, color: 'var(--teal)' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  usePageMeta(
    'Pricing | Cedar Valley Yard Cards - Eagle Mountain Yard Card Rentals',
    'Flat $80 yard card rental in Eagle Mountain and Saratoga Springs. Full setup, display all day, and teardown included. No hidden fees.'
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero inner-page-hero">
        <SparklesCanvas density={140} />
        <div className="hero-content inner-hero-content">
          <span className="eyebrow">Simple Pricing</span>
          <h1>Flat Rate. No Surprises.</h1>
          <p>Everything included — delivery, setup, full-day display, and teardown.</p>
        </div>
      </section>

      {/* ── Main Pricing Card ── */}
      <section className="pricing-section">
        <div className="pricing-inner">

          <div className="pricing-card-primary reveal">
            <div className="pricing-card-header">
              <span className="pricing-eyebrow">Eagle Mountain &amp; Saratoga Springs</span>
              <div className="pricing-price">
                <span className="pricing-dollar">$</span>
                <span className="pricing-amount">80</span>
              </div>
              <p className="pricing-tagline">Full yard card display, all day.</p>
            </div>
            <div className="pricing-card-body">
              <ul className="pricing-includes">
                {[
                  'Delivery and professional setup (early morning)',
                  'Full-day display — all day, all the reactions',
                  'Teardown and removal included',
                  'Personalized message, name, and age/year',
                  'Color and theme coordination',
                  'Confirmation within 24 hours of booking',
                ].map(item => (
                  <li key={item}><CheckIcon /><span>{item}</span></li>
                ))}
              </ul>
              <Link to="/booking" className="btn pricing-cta-btn">Book Your Date <ChevronRight /></Link>
            </div>
          </div>

          {/* ── Add-ons / Fees ── */}
          <div className="pricing-addons reveal">
            <h2>Additional Fees</h2>
            <div className="pricing-addon-grid">
              {[
                { label: 'Rush Booking', amount: '+$25', desc: 'Bookings made less than 48 hours in advance' },
                { label: 'Cancellation', amount: '$25', desc: 'Within 48 hours of scheduled setup' },
                { label: 'Damage', amount: '$25/piece', desc: 'Per damaged or missing piece — we keep it fair' },
                { label: 'Out-of-Area Travel', amount: 'Varies', desc: 'Lehi, Herriman, and beyond — ask when booking' },
              ].map(({ label, amount, desc }) => (
                <div key={label} className="pricing-addon-card reveal">
                  <div className="pricing-addon-top">
                    <span className="pricing-addon-label">{label}</span>
                    <span className="pricing-addon-amount">{amount}</span>
                  </div>
                  <p className="pricing-addon-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pricing-faq">
        <div className="pricing-faq-inner">
          <h2 className="reveal">Common Questions</h2>
          <div className="pricing-faq-grid">
            {[
              {
                q: 'What\'s included in the $80?',
                a: 'Everything. Delivery, full professional setup early in the morning, the display stays up all day, and we come back and take it all down. You don\'t lift a finger.',
              },
              {
                q: 'What areas do you serve?',
                a: 'Eagle Mountain and Saratoga Springs are our home base — those are included in the flat rate. We also serve Lehi, Herriman, and surrounding areas with a travel fee. Just ask when you book.',
              },
              {
                q: 'How early do you set up?',
                a: 'Typically between 5am and 7am so the display is waiting when they wake up. We coordinate timing with you when you book.',
              },
              {
                q: 'How do I book?',
                a: 'Fill out our booking form and we\'ll confirm your date within 24 hours. We\'ll get the display details — name, age or year, colors — from you at that point.',
              },
              {
                q: 'What if I need to cancel?',
                a: 'Cancellations within 48 hours of your scheduled setup date have a $25 fee. Outside of that, we\'ll work with you — just reach out.',
              },
              {
                q: 'Is the $80 a deposit or the full amount?',
                a: 'That\'s the full amount. No deposit, no hidden fees. $80 covers the whole experience.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="pricing-faq-item reveal">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-interrupt cta-interrupt-teal reveal">
        <h2>Ready to Make Someone's Day?</h2>
        <p>Book your date and we'll take it from there.</p>
        <Link to="/booking" className="btn-white">Book Your Date</Link>
      </section>
    </>
  );
}
