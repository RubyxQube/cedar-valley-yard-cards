import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

const ChevronRight = ({ size = 12 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle' }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CARDS = [
  { tag: 'Planning', title: 'How to Pull Off a Yard Card Surprise (Without Them Knowing)', summary: 'Coordinate timing, keep the address handy, let us handle the rest.', href: '#article-1', img: 'https://placehold.co/560x315/fce8ef/c03a5f?text=Planning+Guide', alt: 'Planning a yard card surprise' },
  { tag: 'Graduations', title: 'Graduation Yard Card Ideas for Eagle Mountain Seniors', summary: 'Local tips for grad season in Eagle Mountain and Lehi - including when to book.', href: '#article-2', img: 'https://placehold.co/560x315/9a2d4a/fce8ef?text=Graduation+Ideas', alt: 'Graduation yard card ideas' },
  { tag: 'Welcome Home', title: 'Missionary Return Yard Cards: Making the Welcome Home Unforgettable', summary: 'Utah County families know how special a mission return is. Here\'s how to honor it.', href: '#article-3', img: 'https://placehold.co/560x315/3a9ab8/ffffff?text=Missionary+Return', alt: 'Missionary return yard card ideas' },
  { tag: 'Birthdays', title: 'Milestone Birthday Displays: 16, 30, 40, 50, 60, and Beyond', summary: 'Some birthdays deserve more than a card. Here\'s how to make the milestone count.', href: '#article-4', img: 'https://placehold.co/560x315/c03a5f/ffffff?text=Milestone+Birthdays', alt: 'Milestone birthday yard card ideas' },
];

export default function Ideas() {
  usePageMeta(
    'Celebration Ideas | Cedar Valley Yard Cards - Eagle Mountain',
    'Inspiration for celebrating Eagle Mountain families - graduation yard card ideas, missionary return surprises, milestone birthday displays, and how it all works.'
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero inner-page-hero">
        <SparklesCanvas density={140} />
        <div className="hero-content inner-hero-content">
          <span className="eyebrow">Ideas + Guides</span>
          <h1>Celebration Inspiration for Eagle Mountain Families</h1>
          <p>Planning tips, occasion guides, and ideas for making someone feel extraordinary.</p>
        </div>
      </section>

      {/* ── Card Grid ── */}
      <section className="articles-index">
        <div className="articles-index-inner">
          <h2 className="reveal">Planning Guides</h2>
          <div className="article-grid">
            {CARDS.map(({ tag, title, summary, href, img, alt }) => (
              <div key={href} className="article-card reveal">
                <div className="article-thumb">
                  <img src={img} alt={alt} width="560" height="315" loading="lazy" />
                </div>
                <div className="article-card-body">
                  <span className="article-tag">{tag}</span>
                  <h3 className="article-card-title">{title}</h3>
                  <p className="article-summary">{summary}</p>
                  <a href={href} className="article-read-more">Read the guide <ChevronRight /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline Articles ── */}
      <section className="articles-body">

        <div className="article-col reveal" id="article-1">
          <span className="article-tag">Planning</span>
          <h2>How to Pull Off a Yard Card Surprise (Without Them Knowing)</h2>
          <img src="https://placehold.co/720x405/fce8ef/c03a5f?text=Planning+Guide" alt="Planning a yard card surprise" className="article-img" width="720" height="405" loading="lazy" />
          <div className="article-body-text">
            <p>The best yard card surprises share one thing in common: the person had absolutely no idea. Here's how families in Eagle Mountain pull it off every time without letting anything slip.</p>
            <h3>Start with the address, not the occasion</h3>
            <p>When you book with us, the first thing we need is the delivery address. Double-check it. Triple-check it. The most common hiccup in a yard card surprise isn't timing - it's a wrong house number or a missing street suffix.</p>
            <h3>Coordinate the timing around their schedule</h3>
            <p>We set up early - typically between 5am and 7am - so the display is waiting when they wake up. But you know their schedule better than we do. If they're an early riser, let us know. We'll adjust setup time to fit the surprise window you need.</p>
            <h3>Warn the neighbors you trust</h3>
            <p>A heads-up to the immediate neighbors prevents accidental spoilers. Just the neighbor who's likely to see our truck pull up and post something on the neighborhood Facebook group before your person even wakes up.</p>
            <h3>Let us handle the rest</h3>
            <p>Once we have your date, address, occasion details, and any color or message preferences, our job is to make you look like the most thoughtful person in their life. You don't need to coordinate the setup or stress about teardown. That's all on us.</p>
            <p>Ready to plan yours? <Link to="/booking" style={{ color: 'var(--rose)', fontWeight: '700' }}>Book your date here</Link> and we'll confirm within 24 hours.</p>
          </div>
        </div>

        <div className="article-col reveal" id="article-2">
          <span className="article-tag">Graduations</span>
          <h2>Graduation Yard Card Ideas for Eagle Mountain Seniors</h2>
          <img src="https://placehold.co/720x405/9a2d4a/fce8ef?text=Graduation+Season+Guide" alt="Graduation yard card display ideas" className="article-img" width="720" height="405" loading="lazy" />
          <div className="article-body-text">
            <p>Graduation season in Eagle Mountain and Lehi is our busiest time of year - and for good reason. There are few moments in a teenager's life that feel as significant as finishing high school.</p>
            <h3>Book as early as February or March</h3>
            <p>We're not saying this to create urgency for its own sake. May and June dates genuinely fill up 6 to 8 weeks in advance. By mid-April, weekends near graduation dates are typically gone. If you know the graduation date, book it now.</p>
            <h3>What to include on the display</h3>
            <p>The most popular graduation displays include the graduate's first name, their graduation year, and their school. If you have school colors, we'll match them. Some families add a quote or a single word - totally up to you.</p>
            <h3>Make it last all day</h3>
            <p>Most families choose to keep the display up for the day of graduation and one or two days after. Relatives, friends, and neighbors will stop by - it extends the celebration past just the ceremony.</p>
            <p>For Eagle Mountain seniors graduating in May or June, now is the right time. <Link to="/booking?occasion=graduation" style={{ color: 'var(--rose)', fontWeight: '700' }}>Book a graduation display</Link> and let's make it one they remember.</p>
          </div>
        </div>

        <div className="article-col reveal" id="article-3">
          <span className="article-tag">Welcome Home</span>
          <h2>Missionary Return Yard Cards: Making the Welcome Home Unforgettable</h2>
          <img src="https://placehold.co/720x405/3a9ab8/ffffff?text=Missionary+Return+Guide" alt="Welcome home missionary return yard card guide" className="article-img" width="720" height="405" loading="lazy" />
          <div className="article-body-text">
            <p>In Eagle Mountain and throughout Utah County, a missionary return is one of the most significant homecoming moments a family experiences. Two years of anticipation. The yard display should match that moment.</p>
            <h3>Start with the mission name</h3>
            <p>The single most meaningful detail you can add is the mission name. "Welcome Home Elder Anderson - Ecuador Guayaquil Mission." That specificity tells the whole neighborhood what this person just did.</p>
            <h3>Coordinate with the homecoming schedule</h3>
            <p>Missionary returns in Utah County often involve airport pickups in the early morning or late night. We'll set up based on the expected arrival time. Tell us when the car is likely to arrive, and we'll make sure the display is in place before they get there.</p>
            <h3>Sister missionaries and elders deserve the same celebration</h3>
            <p>A sister returning from 18 months of service put in the same dedication, the same sacrifice, the same love for the people she served. The display should reflect that.</p>
            <h3>Military and study abroad homecomings</h3>
            <p>Military homecomings and returns from study abroad programs deserve exactly the same treatment. The emotion of that moment is the same regardless of where they were.</p>
            <p><Link to="/booking?occasion=welcome-home" style={{ color: 'var(--rose)', fontWeight: '700' }}>Book a welcome home display</Link> and let's make the first thing they see when they pull into the neighborhood be something they'll never forget.</p>
          </div>
        </div>

        <div className="article-col reveal" id="article-4">
          <span className="article-tag">Birthdays</span>
          <h2>Milestone Birthday Displays: 16, 30, 40, 50, 60, and Beyond</h2>
          <img src="https://placehold.co/720x405/c03a5f/ffffff?text=Milestone+Birthday+Guide" alt="Milestone birthday yard card display ideas" className="article-img" width="720" height="405" loading="lazy" />
          <div className="article-body-text">
            <p>Some birthdays feel different. Not just older - more significant. A 16th, a 30th, a 50th. A yard card display doesn't just celebrate the number - it says "we see how significant this is."</p>
            <h3>Sweet 16</h3>
            <p>The displays that work best here are colorful and personalized: name in giant letters, the number 16, and a short message. If she has a favorite color or a theme, we can work with it.</p>
            <h3>The 30s and 40s</h3>
            <p>Turning 30 or 40 is culturally loaded. "Flirty Thirty," "Fabulous at Forty," or just their name and the number, big and bold. The humor and the pride live together in these displays.</p>
            <h3>50th, 60th, and beyond</h3>
            <p>At 50, 60, 70, and beyond, the number in giant letters on the lawn is a statement of pride. It tells the whole neighborhood that this person has done something worth celebrating.</p>
            <ul>
              <li>Choose 1-2 colors that feel personal to them</li>
              <li>Include their name - not just the age</li>
              <li>Keep the message short and specific to who they are</li>
              <li>Consider keeping the display up for 2-3 days so everyone can see it</li>
            </ul>
            <p><Link to="/booking?occasion=birthday" style={{ color: 'var(--rose)', fontWeight: '700' }}>Book a birthday display</Link> today.</p>
          </div>
        </div>

        <div className="soft-cta reveal">
          <p>Ready to plan your celebration?</p>
          <Link to="/booking">Book Your Date <ChevronRight size={14} /></Link>
        </div>

      </section>
    </>
  );
}
