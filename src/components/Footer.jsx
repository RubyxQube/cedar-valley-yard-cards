import { Link } from 'react-router-dom';
import siteConfig from '../siteConfig';

export default function Footer() {
  const { businessName, phone, phoneHref, social, agency } = siteConfig;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt={businessName} className="footer-brand-logo" loading="lazy" />
          <p>Eagle Mountain's Yard Card Specialists. Full-service setup and teardown - you take all the credit.</p>
          <a href={phoneHref} className="footer-phone">{phone}</a>
          <Link to="/booking" className="btn" style={{ fontSize: '13px', padding: '10px 20px', display: 'inline-block' }}>Book Your Date</Link>
          <div className="footer-social">
            <a href={social.instagram} target="_blank" rel="noopener" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={social.facebook} target="_blank" rel="noopener" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <div className="footer-links-grid">
            <Link to="/occasions">Occasions</Link>
            <Link to="/occasions#birthdays">Birthdays</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/occasions#graduations">Graduations</Link>
            <Link to="/ideas">Ideas</Link>
            <Link to="/occasions#welcome-home">Welcome Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/occasions#new-baby">New Babies</Link>
            <Link to="/booking">Book Now</Link>
            <Link to="/occasions#retirement">Retirements</Link>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <span className="footer-bar-left">&copy; 2026 {businessName}. All rights reserved.</span>
        <span className="footer-bar-right">
          Eagle Mountain, UT &bull;
          <a href={agency.url} target="_blank" rel="noopener" className="rxq-credit">
            <img src="/rxq-logo.png" alt={agency.name} height="18" />
            Built and powered by {agency.name}
          </a>
        </span>
      </div>
    </footer>
  );
}
