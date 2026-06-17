import { useLocation } from 'react-router-dom';
import DemoBanner from './DemoBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import { useReveal } from '../hooks/useReveal';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useReveal();

  return (
    <>
      {isHome && <DemoBanner />}
      <Navbar />
      <div className={isHome ? '' : 'page-wrap'}>
        {children}
        <Footer />
      </div>
    </>
  );
}
