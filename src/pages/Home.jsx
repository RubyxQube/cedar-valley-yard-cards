import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';
import siteConfig from '../siteConfig';

const REVIEWS = [
  {
    quote: "Definitely brightened up her day. The display was up when we woke up and it was perfect - exactly what we'd asked for. So easy.",
    name: 'Happy Customer', location: 'Eagle Mountain, UT',
  },
  {
    quote: "Best!! Made him feel so special. We couldn't believe how great the display looked - the whole neighborhood was stopping to take pictures.",
    name: 'Satisfied Family', location: 'Eagle Mountain, UT',
  },
  {
    quote: "We did this for my mom's 70th birthday and she was in tears when she looked out the window. Worth every penny.",
    name: 'Sarah M.', location: 'Eagle Mountain, UT',
  },
  {
    quote: "Booked for my son's graduation and they pulled it off perfectly. Display was up before 6am. The neighbors kept stopping to ask who did it.",
    name: 'Jennifer T.', location: 'Lehi, UT',
  },
];

function StarRow() {
  return (
    <div className="review-stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function Home() {
  usePageMeta(
    'Cedar Valley Yard Cards | Yard Card Rentals in Eagle Mountain, Utah',
    "Eagle Mountain's full-service yard card rental. We set up and tear down for birthdays, graduations, welcome homes, and more. You take all the credit."
  );

  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  function goTo(idx) { setCurrent(idx); }
  function startAuto() { timerRef.current = setInterval(() => setCurrent(c => (c + 1) % REVIEWS.length), 5000); }

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  function handleDot(idx) {
    clearInterval(timerRef.current);
    goTo(idx);
    startAuto();
  }

  const OccasionIcon = ({ children }) => (
    <div className="occasion-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );

  const ChevronRight = () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero home-hero" style={{ position: 'relative' }}>
        <div className="hero-img-wrap">
          <img
            src="/images/hero-home.webp"
            alt="Colorful oversized yard card display set up in an Eagle Mountain residential yard"
            width="1448" height="1086" loading="lazy"
          />
          <div className="hero-img-overlay" />
        </div>
        <SparklesCanvas density={220} />
        <div className="hero-content hero-text-block">
          <span className="hero-eyebrow">Eagle Mountain's Yard Card Rental</span>
          <h1>Celebrate Someone <span className="hero-accent">Special</span></h1>
          <p className="hero-sub">We set it up before they wake up. You take all the credit.</p>
          <div className="hero-ctas">
            <Link to="/booking" className="btn">Book Your Date</Link>
            <Link to="/gallery" className="btn-outline">See Our Work</Link>
          </div>
          <div className="hero-phone-link">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <a href={siteConfig.phoneHref} style={{ color: 'inherit' }}>{siteConfig.phone}</a>
          </div>
        </div>
      </section>

      {/* ── Occasion Strip ── */}
      <section className="occasion-strip reveal">
        <div className="occasion-strip-inner">
          {[
            { to: '/occasions#birthdays', label: 'Birthdays', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
            { to: '/occasions#graduations', label: 'Graduations', icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></> },
            { to: '/occasions#welcome-home', label: 'Welcome Home', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
            { to: '/occasions#new-baby', label: 'New Babies', icon: <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></> },
            { to: '/occasions#retirement', label: 'Retirements', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
          ].map(({ to, label, icon }) => (
            <Link key={to} to={to} className="occasion-item">
              <OccasionIcon>{icon}</OccasionIcon>
              <span className="occasion-label">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-it-works">
        <div className="how-it-works-inner">
          <p className="eyebrow how-eyebrow">The Process</p>
          <h2 className="how-title reveal">Simple From Start to Surprise</h2>
          <div className="how-steps">
            {[
              ['1', 'Pick Your Date + Occasion', 'Browse our calendar and tell us who you\'re celebrating. We\'ll confirm your date and get the details from you.'],
              ['2', 'We Arrive Before They Wake Up', 'Early morning setup, full display in place, we\'re gone before anyone knows. No coordinating required on your end.'],
              ['3', 'They\'re Surprised, We Pack Up', 'Their reaction is the reward. We handle teardown so you can spend the day celebrating instead of cleaning up.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="how-step reveal">
                <span className="how-step-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Occasion Showcase ── */}
      <section>
        <div className="feature-row row-blush reveal">
          <div className="feature-row-img">
            <img src="/images/gallery/birthday-40-tanner.webp" alt="Oversized birthday yard card display" width="900" height="600" loading="lazy" />
          </div>
          <div className="feature-row-text">
            <span className="eyebrow">Birthdays</span>
            <h2>The Classic. The One They'll Talk About.</h2>
            <p>From sweet sixteens to 60th milestone birthdays, we build displays that stop traffic. Tell us who's celebrating - we handle the rest.</p>
            <Link to="/booking?occasion=birthday" className="feature-link">Book a Birthday <ChevronRight /></Link>
          </div>
        </div>
        <div className="feature-row flip row-light reveal">
          <div className="feature-row-img">
            <img src="/images/gallery/graduation-brinley.webp" alt="Yard card graduation display" width="900" height="600" loading="lazy" />
          </div>
          <div className="feature-row-text">
            <span className="eyebrow">Graduations</span>
            <h2>Grad Season is Our Favorite</h2>
            <p>Eagle Mountain and Lehi seniors graduate in May and June - and their yards should show it. Dates fill up fast, so book early.</p>
            <Link to="/booking?occasion=graduation" className="feature-link">Book a Graduation <ChevronRight /></Link>
          </div>
        </div>
        <div className="feature-row row-blush reveal">
          <div className="feature-row-img">
            <img src="/images/gallery/missionary-homecoming-sister-cannon.webp" alt="Welcome home yard card display" width="900" height="600" loading="lazy" />
          </div>
          <div className="feature-row-text">
            <span className="eyebrow">Welcome Home</span>
            <h2>Because Coming Home is a Big Deal Here.</h2>
            <p>Missionary returns, military homecomings, study abroad - the front yard is the first thing they see. We make sure it says everything you feel.</p>
            <Link to="/booking?occasion=welcome-home" className="feature-link">Book a Welcome Home <ChevronRight /></Link>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="gallery-preview">
        <div className="gallery-preview-inner">
          <div className="gallery-preview-header reveal">
            <h2>A Few of Our Favorites</h2>
            <Link to="/gallery">See All Our Work <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }}><polyline points="9 18 15 12 9 6" /></svg></Link>
          </div>
          <div className="gallery-preview-grid">
            {[
              ['/images/gallery/birthday-sweet-16-qwynn.webp',              'Sweet 16 yard card display',             'Sweet 16 — Eagle Mountain'],
              ['/images/gallery/graduation-sofia.webp',                     'Graduation yard card display',           'Graduation — Eagle Mountain, 2026'],
              ['/images/gallery/missionary-homecoming-sister-cannon.webp',  'Welcome home missionary return',         'Mission Return — Eagle Mountain'],
              ['/images/gallery/birthday-1st-palmer.webp',                  '1st birthday yard card setup',           '1st Birthday — Eagle Mountain'],
              ['/images/gallery/graduation-brinley.webp',                   'Congrats Grad Brinley yard card',        'Graduation — Eagle Mountain, 2026'],
              ['/images/gallery/retirement-amy.webp',                       'Happily Retired yard card display',      'Retirement — Eagle Mountain'],
            ].map(([src, alt, label]) => (
              <div key={src} className="gallery-preview-item reveal">
                <img src={src} alt={alt} width="900" height="600" loading="lazy" />
                <div className="gallery-preview-overlay"><span className="gallery-preview-label">{label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="reviews-section">
        <div className="reviews-inner">
          <p className="eyebrow reviews-label" style={{ color: 'var(--teal-lt)' }}>What Families Say</p>
          <h2 className="reviews-title">Our Neighbors Love It</h2>
          <div className="reviews-carousel-wrap">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`review-slide ${i === current ? 'active' : ''}`}>
                <StarRow />
                <p className="review-quote">"{r.quote}"</p>
                <p className="review-name">{r.name}</p>
                <p className="review-location">{r.location}</p>
                <div className="review-platform"><GoogleIcon /> Google Review</div>
              </div>
            ))}
          </div>
          <div className="review-dots">
            {REVIEWS.map((_, i) => (
              <button key={i} className={`review-dot ${i === current ? 'active' : ''}`} onClick={() => handleDot(i)} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-interrupt cta-interrupt-teal reveal">
        <h2>Ready to Make Someone's Day?</h2>
        <p>Dates fill up fast around graduation season - grab yours now.</p>
        <Link to="/booking" className="btn-white">Book Your Date</Link>
      </section>
    </>
  );
}
