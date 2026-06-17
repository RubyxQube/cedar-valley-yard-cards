import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';

const links = [
  { to: '/occasions', label: 'Occasions' },
  { to: '/gallery',   label: 'Gallery' },
  { to: '/pricing',   label: 'Pricing' },
  { to: '/ideas',     label: 'Ideas' },
  { to: '/about',     label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  function close() { setOpen(false); }

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, [open]);

  return (
    <nav className={open ? 'nav-open' : ''} id="mainNav" ref={navRef}>
      <Link to="/" className="nav-logo" onClick={close}>
        <img src="/logo-nav.png" alt={siteConfig.businessName} height="48" loading="eager" />
        <div className="nav-logo-text">
          <span className="nav-logo-top">Cedar Valley</span>
          <span className="nav-logo-bottom">Yard Cards</span>
        </div>
      </Link>

      <button
        className="nav-hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <ul className="nav-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={pathname.startsWith(to) ? 'active' : ''} onClick={close}>
              {label}
            </Link>
          </li>
        ))}
        <li className="nav-book">
          <Link to="/booking" className={pathname === '/booking' ? 'active' : ''} onClick={close}>
            Book Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}
