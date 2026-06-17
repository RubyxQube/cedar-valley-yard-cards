import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta(
    'About Us | Cedar Valley Yard Cards - Eagle Mountain, Utah',
    'Cedar Valley Yard Cards has been surprising Eagle Mountain families for 5 years. We\'re your neighbors and we love a good celebration.'
  );

  return (
    <>
      {/* ── About Hero ── */}
      <section className="page-hero about-hero">
        <SparklesCanvas density={160} />
        <div className="about-hero-content">
          <h1>We've Been Surprising Our Eagle Mountain Neighbors for 5 Years.</h1>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="origin-section">
        <div className="origin-row">
          <div className="origin-img reveal">
            <img
              src="/images/about/owners.webp"
              alt="Cedar Valley Yard Cards owners in Eagle Mountain, Utah"
              width="500" height="600" loading="lazy"
            />
          </div>
          <div className="origin-text reveal">
            <span className="eyebrow">OUR STORY</span>
            <h2>We Started This Because Celebrations Matter.</h2>
            <p>We're a family right here in Eagle Mountain. A few years ago we wanted to do something special for a neighbor - one of those moments where you really want the gesture to land - and we realized how hard it was to pull off something meaningful without the yard card option existing nearby. So we built it ourselves.</p>
            <p>The idea was simple: make it easy for anyone in this community to show up for the people they love. You shouldn't have to spend your whole evening hauling signs and figuring out placement. You shouldn't have to wake up at 4am and hope it looks right. We handle all of that so you can focus on what actually matters - the reaction on their face when they walk outside.</p>
            <p>Five years later, we've set up hundreds of yards across Eagle Mountain, Saratoga Springs, and Lehi. We still love every single setup. The morning text messages from customers saying "they screamed, they cried, they couldn't believe it" - that's why we do this.</p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="values-section">
        <div className="values-inner">
          <span className="eyebrow values-eyebrow">WHAT WE'RE ABOUT</span>
          <div className="values-grid">
            <div className="value-card reveal">
              <svg className="value-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M26 8L8 22v22h12v-12h12v12h12V22L26 8z" />
              </svg>
              <h3>We're Your Neighbors</h3>
              <p>We live here too. We know these streets, these schools, these families. When we set up your yard, we're doing it for our community - not just a customer.</p>
            </div>
            <div className="value-card reveal">
              <svg className="value-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="26,6 32,20 48,20 35,29 40,44 26,35 12,44 17,29 4,20 20,20" />
              </svg>
              <h3>We Do All The Work</h3>
              <p>Delivery, setup, teardown. You don't lift a finger. Book your date and we handle everything else - early morning, rain check coordination, the whole thing.</p>
            </div>
            <div className="value-card reveal">
              <svg className="value-icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M26 6 C14 6 6 14 6 24 C6 34 14 46 26 46 C38 46 46 34 46 24 C46 14 38 6 26 6Z" />
                <path d="M18 22 C18 22 22 18 26 22 C30 26 34 22 34 22" strokeWidth="1.5" />
                <circle cx="26" cy="14" r="3" fill="currentColor" stroke="none" />
              </svg>
              <h3>We Love a Good Surprise</h3>
              <p>We're gone before they wake up. Early morning, quiet, zero spoiled reactions. The whole point is that first moment when they see the yard and know someone really showed up for them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="stats-inner">
          <div className="stats-grid reveal">
            {[['500+', 'Setups Completed'], ['5', 'Years in Eagle Mountain'], ['100%', 'Word-of-Mouth Growth']].map(([num, label]) => (
              <div key={label} className="stat-item">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="photos-grid reveal">
            <img src="/images/about/setup-birthday.webp" alt="Birthday yard card display" width="600" height="400" loading="lazy" />
            <img src="/images/about/setup-graduation.webp" alt="Graduation yard card setup" width="600" height="400" loading="lazy" />
            <img src="/images/about/setup-welcome-home.webp" alt="Welcome home yard card display" width="600" height="400" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <h2 className="reveal">Whoever You're Celebrating, We Can't Wait to Help You Surprise Them.</h2>
        <Link to="/booking" className="about-btn-white reveal">Book Your Date</Link>
      </section>
    </>
  );
}
