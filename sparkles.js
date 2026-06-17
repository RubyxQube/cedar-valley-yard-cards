/**
 * Sparkles — ambient floating particle dots with opacity twinkle animation.
 * Random dots drift slowly in random directions while continuously fading
 * in and out at independent rates. Creates the "magical ambient presence"
 * effect — like light dust, fairy lights, or floating stars.
 *
 * Canvas 2D — no WebGL, no CDN, no tsparticles dependency.
 *
 * NOTE: The original component used @tsparticles at density:800 because
 * that library's renderer is WebGL-accelerated. Our Canvas 2D version
 * performs well at density 100-400. Use a CSS mask-image gradient on the
 * canvas wrapper to shape the visible region (see usage examples below).
 *
 * vs particle-flow.js: particle-flow = noise-based directional flow streams
 * (organic, purposeful motion). sparkles = random drift + twinkle (ambient,
 * magical, no dominant direction). These complement each other — use
 * particle-flow on the hero, sparkles on a trust/CTA section.
 *
 * Usage A — full hero background (standalone):
 *   new Sparkles('heroCanvas', {
 *     color:   '#ffffff',
 *     density: 200,
 *     size:    1.5,
 *     speed:   0.5
 *   })
 *
 * Usage B — section overlay with CSS mask (rising sparkles from bottom):
 *   <!-- Wrapper: position:relative; overflow:hidden; mask applied here -->
 *   <div class="sparkle-section"
 *        style="position:relative; overflow:hidden;
 *               mask-image:radial-gradient(50% 60%, white, transparent 85%);
 *               -webkit-mask-image:radial-gradient(50% 60%, white, transparent 85%);">
 *     <canvas id="sparkCanvas" style="position:absolute;inset:0;width:100%;height:100%;"></canvas>
 *     <div style="position:relative;z-index:10;"><!-- section content --></div>
 *   </div>
 *   <script>
 *   new Sparkles('sparkCanvas', { density: 250, color: '#ffffff',
 *                                 background: 'transparent', opacity: 0.8 });
 *   </script>
 *
 * Usage C — color sparkles to match a gradient section background:
 *   new Sparkles('sparkCanvas', {
 *     color:    '#c4b5fd',   // violet-300, matches purple gradient bg
 *     density:  180,
 *     size:     1.2,
 *     speed:    0.3,
 *     opacity:  0.7,
 *     background: 'transparent'
 *   })
 *
 * Options:
 *   color        — particle color (any CSS color, hex recommended), default '#ffffff'
 *   background   — canvas bg ('transparent' or hex), default 'transparent'
 *   density      — number of particles, default 200 (tsparticles default was 800 — library was GPU)
 *   speed        — max drift speed in px/frame, default 0.5
 *   minSpeed     — min drift speed (default: speed/10)
 *   opacity      — max particle opacity 0-1, default 0.9
 *   opacitySpeed — twinkle speed multiplier, default 3 (higher = faster fade cycle)
 *   minOpacity   — min particle opacity (default: opacity/10)
 *   size         — max particle radius in px, default 1
 *   minSize      — min particle radius (default: size/2.5)
 *
 * Color + trade combos:
 *   White particles:  '#ffffff' — any dark hero (universal)
 *   Gold:             '#fbbf24' — premium, roofing, luxury
 *   Violet:           '#c4b5fd' — law, counselors, mortgage (over purple gradient)
 *   Sky blue:         '#7dd3fc' — window cleaning, plumbing
 *   Mint:             '#6ee7b7' — dentists, vets, tree service
 *   Warm white:       '#fef3c7' — cozy residential trades (HVAC, appliance)
 */
class Sparkles {
  constructor(canvasId, opts = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.opts = Object.assign({
      color:        '#ffffff',
      background:   'transparent',
      density:      200,
      speed:        0.5,
      minSpeed:     null,
      opacity:      0.9,
      opacitySpeed: 3,
      minOpacity:   null,
      size:         1,
      minSize:      null,
    }, opts);

    this._particles = [];
    this._w = 0;
    this._h = 0;
    this._ctx = this.canvas.getContext('2d');

    this._resize = this._resize.bind(this);
    this._tick   = this._tick.bind(this);

    this._resize();
    this._build();
    window.addEventListener('resize', this._resize, { passive: true });
    this._raf = requestAnimationFrame(this._tick);
  }

  // ─── helpers ──────────────────────────────────────────────────────────────

  _rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // ─── setup ────────────────────────────────────────────────────────────────

  _resize() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    const w = parent?.clientWidth  || window.innerWidth;
    const h = parent?.clientHeight || window.innerHeight;
    this._w = w;
    this._h = h;
    canvas.width  = w;
    canvas.height = h;
  }

  _build() {
    const o   = this.opts;
    const w   = this._w;
    const h   = this._h;

    const minSpd  = o.minSpeed   ?? o.speed   / 10;
    const minOp   = o.minOpacity ?? o.opacity / 10;
    const minSz   = o.minSize    ?? o.size    / 2.5;

    // opacitySpeed: tsparticles treats this as "units per second"-ish.
    // Scale to a per-frame delta that feels equivalent.
    const opBase = o.opacitySpeed * 0.001;

    this._particles = Array.from({ length: o.density }, () => {
      const spd   = this._rand(minSpd, o.speed);
      const angle = Math.random() * Math.PI * 2;
      const maxOp = this._rand(minOp, o.opacity);
      const curOp = Math.random() * maxOp;

      return {
        x:       Math.random() * w,
        y:       Math.random() * h,
        vx:      Math.cos(angle) * spd,
        vy:      Math.sin(angle) * spd,
        size:    this._rand(minSz, o.size),
        op:      curOp,
        maxOp,
        minOp,
        opDelta: this._rand(0.4, 1.2) * opBase,   // individual twinkle speed
        opDir:   Math.random() > 0.5 ? 1 : -1,    // start fading in or out
      };
    });
  }

  // ─── animation ────────────────────────────────────────────────────────────

  _tick() {
    const ctx = this._ctx;
    const w   = this._w;
    const h   = this._h;
    const o   = this.opts;

    // Clear or fill background
    if (!o.background || o.background === 'transparent') {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = o.background;
      ctx.fillRect(0, 0, w, h);
    }

    // All particles share the same color; only opacity varies per-particle
    ctx.fillStyle = o.color;

    this._particles.forEach(p => {
      // ── move ──────────────────────────────────────────────────────
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges seamlessly
      if (p.x < 0) p.x += w;
      if (p.x > w) p.x -= w;
      if (p.y < 0) p.y += h;
      if (p.y > h) p.y -= h;

      // ── twinkle ───────────────────────────────────────────────────
      p.op += p.opDelta * p.opDir;
      if (p.op >= p.maxOp) { p.op = p.maxOp; p.opDir = -1; }
      if (p.op <= p.minOp) { p.op = p.minOp; p.opDir =  1; }

      // ── draw ──────────────────────────────────────────────────────
      ctx.globalAlpha = p.op;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    this._raf = requestAnimationFrame(this._tick);
  }

  // ─── public ───────────────────────────────────────────────────────────────

  /**
   * Change particle color at runtime.
   * Useful if the section's background changes (dark/light mode toggle).
   */
  setColor(hex) {
    this.opts.color = hex;
  }

  /**
   * Swap particle count without rebuilding the whole class.
   * Useful for responsive breakpoints (fewer particles on mobile).
   */
  setDensity(n) {
    this.opts.density = n;
    this._build();
  }

  destroy() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._resize);
    this._particles = [];
    this._ctx = null;
  }
}
