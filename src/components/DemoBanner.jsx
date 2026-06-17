import { useState, useEffect, useRef } from 'react';
import siteConfig from '../siteConfig';

export default function DemoBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef(null);

  useEffect(() => {
    function sync() {
      const h = (visible && bannerRef.current) ? bannerRef.current.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty('--banner-h', h + 'px');
      document.body.classList.toggle('banner-visible', h > 0);
    }
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="demo-banner" ref={bannerRef}>
      <div className="demo-banner-left">
        <a href={siteConfig.agency.url} target="_blank" rel="noopener">
          <img src={siteConfig.agency.logo} alt={siteConfig.agency.name} height="20" />
        </a>
        <span className="demo-banner-business">{siteConfig.businessName}</span>
        <span className="demo-banner-badge">Sample Website</span>
        <span className="demo-banner-desc">This is a demo site built by RubyxQube.</span>
      </div>
      <button className="banner-dismiss" onClick={() => setVisible(false)} aria-label="Dismiss banner">&#x2715;</button>
    </div>
  );
}
