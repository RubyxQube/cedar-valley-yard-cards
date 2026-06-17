import { useEffect, useRef } from 'react';
import { Sparkles } from '../lib/Sparkles';

export default function SparklesCanvas({ density = 200, opts = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = new Sparkles(canvas, { color: '#fce38a', density, size: 1.5, speed: 0.4, opacity: 0.85, ...opts });
    return () => s.destroy();
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
