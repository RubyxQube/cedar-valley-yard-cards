import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

const ITEMS = [
  { src: '/images/gallery/birthday-40-tanner.webp',                    alt: 'Happy Birthday 40 yard card display — Tanner',              label: 'Birthday 40 — Eagle Mountain',         cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-brinley.webp',                    alt: 'Congrats Grad Brinley Class of 2026 yard card',             label: 'Graduation — Eagle Mountain, 2026',    cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/missionary-homecoming-sister-cannon.webp',   alt: 'Welcome Home Sister Cannon missionary return yard card',    label: 'Missionary Return — Eagle Mountain',   cat: 'welcome-home', w: 900, h: 600 },
  { src: '/images/gallery/birthday-sweet-16-qwynn.webp',               alt: 'Sweet 16 yard card display — Qwynn',                       label: 'Sweet 16 — Eagle Mountain',            cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-sofia.webp',                      alt: 'Congrats Sofia Class of 2026 graduation yard card',         label: 'Graduation — Eagle Mountain, 2026',    cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/welcome-home-cleora.webp',                   alt: 'Welcome Home Cleora yard card display',                    label: 'Welcome Home — Eagle Mountain',        cat: 'welcome-home', w: 900, h: 600 },
  { src: '/images/gallery/birthday-1st-palmer.webp',                   alt: 'Happy 1st Birthday Palmer yard card',                      label: '1st Birthday — Eagle Mountain',        cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-chase.webp',                      alt: 'Congrats Chase Class of 2025 graduation yard card',         label: 'Graduation — Eagle Mountain, 2025',    cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/missionary-farewell-sister-rose.webp',       alt: 'Called to Serve Sister Rose missionary farewell yard card', label: 'Mission Farewell — Eagle Mountain',    cat: 'welcome-home', w: 900, h: 600 },
  { src: '/images/gallery/birthday-6th-kamden-kohen.webp',             alt: 'Happy 6th Birthday Kamden and Kohen Jurassic Park yard card', label: 'Birthday Twins — Eagle Mountain',   cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-brayden.webp',                    alt: 'Congrats Brayden Class of 2026 graduation yard card',       label: 'Graduation — Eagle Mountain, 2026',    cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/welcome-home-disney.webp',                   alt: 'Disney Here We Come yard card display',                    label: 'Disney Trip — Eagle Mountain',         cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/birthday-18-will.webp',                      alt: 'Happy Birthday 18 Will yard card display',                 label: 'Birthday 18 — Eagle Mountain',         cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-rockwell-cleora.webp',            alt: 'Congrats Grad Rockwell and Cleora Class of 2025',          label: 'Graduation Siblings — Eagle Mountain', cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/retirement-amy.webp',                        alt: 'Happily Retired Amy yard card display',                    label: 'Retirement — Eagle Mountain',          cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/birthday-ryan-space.webp',                   alt: 'Happy Birthday Ryan space theme yard card',                label: 'Birthday Space Theme — Eagle Mountain',cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/graduation-arikka.webp',                     alt: 'Congrats Arikka Class of 2026 graduation yard card',       label: 'Graduation — Eagle Mountain, 2026',    cat: 'graduations',  w: 900, h: 600 },
  { src: '/images/gallery/wedding-mr-mrs-burkhardt.webp',              alt: 'Congrats Mr and Mrs Burkhardt wedding yard card',          label: 'Wedding — Eagle Mountain',             cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/birthday-robby-jo.webp',                     alt: 'Happy Birthday Robby Jo tropical yard card',               label: 'Birthday — Eagle Mountain',            cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/welcome-home-generic.webp',                  alt: 'Welcome Home yard card display',                          label: 'Welcome Home — Eagle Mountain',        cat: 'welcome-home', w: 900, h: 600 },
  { src: '/images/gallery/anniversary-50th.webp',                      alt: 'Happy 50th Anniversary yard card display',                 label: '50th Anniversary — Eagle Mountain',    cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/birthday-9th-oakley.webp',                   alt: 'Happy 9th Birthday Oakley gaming theme yard card',         label: 'Birthday Gaming — Eagle Mountain',     cat: 'birthdays',    w: 900, h: 600 },
  { src: '/images/gallery/other-20yrs-richard.webp',                   alt: 'Congrats 20 Years Richard milestone yard card',            label: 'Milestone — Eagle Mountain',           cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/school-eagle-valley-elementary.webp',        alt: 'Welcome Back Eagles yard card at Eagle Valley Elementary', label: 'School Event — Eagle Mountain',        cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/school-teacher-appreciation.webp',           alt: 'Thank You 116 Years teacher appreciation yard card',       label: 'Teacher Appreciation — Eagle Mountain',cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/other-good-luck-aviettes.webp',              alt: 'Good Luck Aviettes dance team yard card display',          label: 'Good Luck Aviettes — Eagle Mountain',  cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/other-you-are-loved-finn.webp',              alt: 'You Are Loved Finn yard card display',                     label: 'You Are Loved — Eagle Mountain',       cat: 'other',        w: 900, h: 600 },
  { src: '/images/gallery/birthday-robyn-jo-beach.webp',               alt: 'Happy Birthday Robyn Jo tropical beach theme yard card',   label: 'Birthday Beach — Eagle Mountain',      cat: 'birthdays',    w: 900, h: 600 },
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
  const [lb, setLb] = useState(null);
  const visible = ITEMS.filter(i => active === 'all' || i.cat === active);

  useEffect(() => { setLb(null); }, [active]);

  useEffect(() => {
    if (lb === null) return;
    function onKey(e) {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') setLb(i => (i - 1 + visible.length) % visible.length);
      if (e.key === 'ArrowRight') setLb(i => (i + 1) % visible.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb, visible.length]);

  useEffect(() => {
    document.body.style.overflow = lb !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lb]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero inner-page-hero">
        <SparklesCanvas density={140} />
        <div className="hero-content inner-hero-content">
          <span className="eyebrow">Our Work</span>
          <h1><span className="hero-accent">Five Years</span> of Celebrations in Eagle Mountain</h1>
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
            {visible.map((item, idx) => (
              <div key={item.src} className="gallery-item" data-cat={item.cat} onClick={() => setLb(idx)}>
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

      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button className="lightbox-close" onClick={() => setLb(null)} aria-label="Close">&#x2715;</button>
          <button className="lightbox-prev" onClick={e => { e.stopPropagation(); setLb(i => (i - 1 + visible.length) % visible.length); }} aria-label="Previous">&#8249;</button>
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={visible[lb].src} alt={visible[lb].alt} />
            <p className="lightbox-caption">{visible[lb].label}</p>
          </div>
          <button className="lightbox-next" onClick={e => { e.stopPropagation(); setLb(i => (i + 1) % visible.length); }} aria-label="Next">&#8250;</button>
        </div>
      )}
    </>
  );
}
