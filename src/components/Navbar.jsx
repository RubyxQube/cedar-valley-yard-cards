import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';

const links = [
  { to: '/occasions', label: 'Occasions' },
  { to: '/gallery',   label: 'Gallery' },
  { to: '/ideas',     label: 'Ideas' },
  { to: '/about',     label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  function close() { setOpen(false); }

  return (
    <nav className={open ? 'nav-open' : ''} id="mainNav">
      <Link to="/" className="nav-logo" onClick={close}>
        <img src="/logo-nav.png" alt={siteConfig.businessName} height="64" loading="eager" />
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
