import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { useReveal } from '../hooks/useReveal';

function useHashScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0 }); return; }
    const id = hash.slice(1);
    const attempt = (tries = 0) => {
      const el = document.getElementById(id);
      if (el) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--banner-h') || '0') + 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (tries < 10) {
        setTimeout(() => attempt(tries + 1), 80);
      }
    };
    setTimeout(() => attempt(), 100);
  }, [pathname, hash]);
}

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useHashScroll();

  useReveal();

  return (
    <>
      <Navbar />
      <div className={pathname === '/' ? '' : 'page-wrap'}>
        {children}
        <Footer />
      </div>
      <ChatWidget />
    </>
  );
}
