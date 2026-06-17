import { useState } from 'react';
import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

const ITEMS = [
  { src: 'https://placehold.co/480x600/c03a5f/ffffff?text=Birthday+Display', alt: 'Happy Birthday yard card display in Eagle Mountain', label: 'Birthday - Eagle Mountain, 2025', cat: 'birthdays', w: 480, h: 600 },
  { src: 'https://placehold.co/480x380/9a2d4a/fce8ef?text=Graduation+2025', alt: 'Class of 2025 graduation yard card in Lehi', label: 'Graduation - Lehi, 2025', cat: 'graduations', w: 480, h: 380 },
  { src: 'https://placehold.co/480x520/3a9ab8/ffffff?text=Welcome+Home', alt: 'Welcome home missionary return yard card', label: 'Welcome Home - Eagle Mountain, 2025', cat: 'welcome-home', w: 480, h: 520 },
  { src: "https://placehold.co/480x420/fce8ef/c03a5f?text=It's+a+Girl!", alt: "It's a girl new baby yard card in Saratoga Springs", label: 'New Baby - Saratoga Springs, 2024', cat: 'other', w: 480, h: 420 },
  { src: 'https://placehold.co/480x560/c03a5f/ffffff?text=Sweet+16', alt: 'Sweet 16 birthday yard card display', label: 'Sweet 16 - Eagle Mountain, 2024', cat: 'birthdays', w: 480, h: 560 },
  { src: 'https://placehold.co/480x460/150610/fce8ef?text=Class+of+2024', alt: 'Class of 2024 graduation yard card', label: 'Graduation - Eagle Mountain, 2024', cat: 'graduations', w: 480, h: 460 },
  { src: 'https://placehold.co/480x400/3a9ab8/ffffff?text=Elder+Returns', alt: 'Elder returns from mission welcome home yard card', label: 'Mission Return - Eagle Mountain, 2024', cat: 'welcome-home', w: 480, h: 400 },
  { src: 'https://placehold.co/480x580/9a2d4a/fce8ef?text=50th+Birthday', alt: '50th milestone birthday yard card in Lehi', label: '50th Birthday - Lehi, 2024', cat: 'birthdays', w: 480, h: 580 },
  { src: 'https://placehold.co/480x440/c03a5f/ffffff?text=Retirement+Party', alt: 'Retirement yard card display in Eagle Mountain', label: 'Retirement - Eagle Mountain, 2024', cat: 'other', w: 480, h: 440 },
  { src: 'https://placehold.co/480x360/fce8ef/c03a5f?text=Birthday+1st', alt: 'First birthday yard card in Saratoga Springs', label: '1st Birthday - Saratoga Springs, 2023', cat: 'birthdays', w: 480, h: 360 },
  { src: 'https://placehold.co/480x500/9a2d4a/fce8ef?text=CONGRATULATIONS', alt: 'Congratulations graduation yard card', label: 'Graduation - Eagle Mountain, 2023', cat: 'graduations', w: 480, h: 500 },
  { src: 'https://placehold.co/480x480/150610/fce8ef?text=Welcome+Back+Sister', alt: 'Welcome back missionary sister return yard card', label: 'Sister Return - Lehi, 2023', cat: 'welcome-home', w: 480, h: 480 },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'birthdays', label: 'Birthdays' },
  { key: 'graduations', label: 'Graduations' },
  { key: 'welcome-home', label: 'Welcome Home' },
  { key: 'other', label: 'Other' },
];

export default function Gallery() {
  usePageMeta(
    'Gallery | Cedar Valley Yard Cards - Eagle Mountain Celebrations',
    'Browse our yard card setups for Eagle Mountain families - birthdays, graduations, welcome homes, and more. 5 years of celebrations.'
  );

  const [active, setActive] = useState('all');
  const visible = ITEMS.filter(i => active === 'all' || i.cat === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero inner-page-hero">
        <SparklesCanvas density={140} />
        <div className="hero-content inner-hero-content">
          <span className="eyebrow">Our Work</span>
          <h1>Five Years of Celebrations in Eagle Mountain</h1>
          <p>A few of our favorite setups - from sweet sixteens to missionary returns.</p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="gallery-section">
        <div className="gallery-section-inner">
          <div className="gallery-filters reveal">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                className={`filter-btn ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="gallery-masonry">
            {visible.map((item) => (
              <div key={item.src} className="gallery-item" data-cat={item.cat}>
                <img src={item.src} alt={item.alt} width={item.w} height={item.h} loading="lazy" />
                <div className="gallery-overlay"><span className="gallery-label">{item.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conversion Row ── */}
      <section className="gallery-cta">
        <div className="gallery-cta-inner">
          <div className="gallery-cta-quote">
            "Definitely brightened up her day. The display was up when we woke up and it was perfect - exactly what we'd asked for. So easy."
          </div>
          <div className="gallery-cta-right reveal">
            <h2>Want to See Your Yard Like This?</h2>
            <Link to="/booking" className="btn-white">Book Your Date</Link>
          </div>
        </div>
      </section>
    </>
  );
}
