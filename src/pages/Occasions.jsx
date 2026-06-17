import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

const ChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Occasions() {
  usePageMeta(
    'Occasions | Cedar Valley Yard Cards - Eagle Mountain Yard Card Rentals',
    'Yard cards for every celebration - birthdays, graduations, LDS missionary returns, retirements, new babies, and more in Eagle Mountain, Utah.'
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero inner-page-hero">
        <SparklesCanvas density={140} />
        <div className="hero-content inner-hero-content">
          <span className="eyebrow">All Occasions</span>
          <h1>Every Celebration Has Its Moment</h1>
          <p>We set up yard cards for birthdays, graduations, welcome homes, new babies, retirements, and everything in between.</p>
        </div>
      </section>

      {/* ── Birthday ── */}
      <section className="occasion-section feature-row row-light reveal" id="birthdays">
        <div className="feature-row-img">
          <img src="https://placehold.co/600x500/c03a5f/ffffff?text=Birthday+Display" alt="Colorful oversized birthday yard card display" width="600" height="500" loading="lazy" />
        </div>
        <div className="feature-row-text">
          <span className="eyebrow">Birthdays</span>
          <h2>The Classic Birthday Yard Card</h2>
          <p>Whether they're turning 1 or 100, a birthday display stops everyone in the neighborhood. We bring the letters, the numbers, the decorative pieces - all of it. You tell us the age, the colors, and the name, and we handle the rest.</p>
          <p>Popular options include balloon bouquets, themed character pieces, and confetti cutouts. Ask us when you book.</p>
          <Link to="/booking?occasion=birthday" className="feature-link">Book a Birthday <ChevronRight /></Link>
        </div>
      </section>

      {/* ── Graduation ── */}
      <section className="occasion-section feature-row flip row-blush reveal" id="graduations">
        <div className="feature-row-img">
          <img src="https://placehold.co/600x500/9a2d4a/fce8ef?text=Graduation+Display" alt="Graduation yard card display with class year in Eagle Mountain Utah" width="600" height="500" loading="lazy" />
        </div>
        <div className="feature-row-text">
          <span className="eyebrow">Graduations</span>
          <h2>Grad Season is Our Favorite</h2>
          <p>Eagle Mountain and Lehi seniors graduate in May and June - and their yards should show it. We do class years, school names, graduate names, and school colors.</p>
          <p>Book early in the spring. May and June dates go fast - sometimes 6-8 weeks out.</p>
          <Link to="/booking?occasion=graduation" className="feature-link">Book a Graduation <ChevronRight /></Link>
        </div>
      </section>

      {/* ── Welcome Home ── */}
      <section className="occasion-section feature-row row-light reveal" id="welcome-home">
        <div className="feature-row-img">
          <img src="https://placehold.co/600x500/3a9ab8/ffffff?text=Welcome+Home+Display" alt="Welcome home missionary return yard card display" width="600" height="500" loading="lazy" />
        </div>
        <div className="feature-row-text">
          <span className="eyebrow">Welcome Home</span>
          <h2>Welcome Home is a Big Deal Here</h2>
          <p>Whether they're returning from a mission, deployment, or study abroad, the front yard display is the first thing they see. In Eagle Mountain and throughout Utah County, welcome home displays are a tradition.</p>
          <p>We customize for missionary returns (mission name, homecoming date), military returns, and everything in between.</p>
          <Link to="/booking?occasion=welcome-home" className="feature-link">Book a Welcome Home <ChevronRight /></Link>
        </div>
      </section>

      {/* ── Other Occasions ── */}
      <section className="other-occasions">
        <div className="other-occasions-inner">
          <p className="eyebrow">More Reasons to Celebrate</p>
          <h2>We Do These Too</h2>
          <p className="other-occasions-subtitle">Every milestone deserves a moment. Here are a few more occasions we love to celebrate.</p>
          <div className="occasions-grid">
            {[
              {
                id: 'new-baby', title: 'New Babies', to: '/booking?occasion=new-baby', cta: 'Book a Baby Display',
                desc: "It's a boy. It's a girl. It's twins. Welcome the newest member of your neighborhood with a display the whole street will notice.",
                icon: <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>,
              },
              {
                id: 'retirement', title: 'Retirements', to: '/booking?occasion=retirement', cta: 'Book a Retirement Display',
                desc: "They put in the years. They earned the party. A yard card display is the kind of send-off that matches the moment.",
                icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
              },
              {
                id: 'anniversary', title: 'Anniversaries', to: '/booking?occasion=anniversary', cta: 'Book an Anniversary Display',
                desc: "25 years. 40 years. 50 years. An anniversary this significant deserves to be announced to the neighborhood.",
                icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
              },
              {
                id: 'other', title: 'Any Reason', to: '/booking?occasion=other', cta: 'Book Any Occasion',
                desc: "Just because? That counts. Congrats on the promotion, good luck at state, thanks for being an amazing neighbor.",
                icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
              },
            ].map(({ id, title, desc, to, cta, icon }) => (
              <div key={id} className="occasion-card reveal" id={id}>
                <div className="occasion-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link to={to}>{cta} <ChevronRight size={12} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-interrupt cta-interrupt-gradient reveal">
        <h2>Your Occasion is on Our List. Let's Book Your Date.</h2>
        <p>We'll confirm within 24 hours and take it from there. You don't have to lift a finger.</p>
        <Link to="/booking" className="btn-white">Book Your Date</Link>
      </section>
    </>
  );
}
