import { Link } from 'react-router-dom';
import SparklesCanvas from '../components/SparklesCanvas';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Page Not Found | Cedar Valley Yard Cards',
    'The page you were looking for doesn\'t exist.'
  );

  return (
    <section className="page-hero inner-page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SparklesCanvas density={100} />
      <div className="hero-content inner-hero-content" style={{ textAlign: 'center' }}>
        <span className="eyebrow">404</span>
        <h1>This Page Doesn't Exist</h1>
        <p style={{ marginBottom: '32px' }}>But a yard card celebration definitely can.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    </section>
  );
}
