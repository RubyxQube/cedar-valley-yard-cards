export class Sparkles {
  constructor(canvasOrId, opts = {}) {
    this.canvas = typeof canvasOrId === 'string'
      ? document.getElementById(canvasOrId)
      : canvasOrId;
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

  _rand(min, max) { return Math.random() * (max - min) + min; }

  _resize() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    const w = parent?.clientWidth  || window.innerWidth;
    const h = parent?.clientHeight || window.innerHeight;
    this._w = w; this._h = h;
    canvas.width = w; canvas.height = h;
  }

  _build() {
    const o = this.opts, w = this._w, h = this._h;
    const minSpd = o.minSpeed   ?? o.speed   / 10;
    const minOp  = o.minOpacity ?? o.opacity / 10;
    const minSz  = o.minSize    ?? o.size    / 2.5;
    const opBase = o.opacitySpeed * 0.001;

    this._particles = Array.from({ length: o.density }, () => {
      const spd = this._rand(minSpd, o.speed);
      const angle = Math.random() * Math.PI * 2;
      const maxOp = this._rand(minOp, o.opacity);
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
        size: this._rand(minSz, o.size),
        op: Math.random() * maxOp, maxOp, minOp,
        opDelta: this._rand(0.4, 1.2) * opBase,
        opDir: Math.random() > 0.5 ? 1 : -1,
      };
    });
  }

  _tick() {
    const ctx = this._ctx, w = this._w, h = this._h, o = this.opts;
    if (!o.background || o.background === 'transparent') {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = o.background;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = o.color;
    this._particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += w; if (p.x > w) p.x -= w;
      if (p.y < 0) p.y += h; if (p.y > h) p.y -= h;
      p.op += p.opDelta * p.opDir;
      if (p.op >= p.maxOp) { p.op = p.maxOp; p.opDir = -1; }
      if (p.op <= p.minOp) { p.op = p.minOp; p.opDir =  1; }
      ctx.globalAlpha = p.op;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    this._raf = requestAnimationFrame(this._tick);
  }

  destroy() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._resize);
    this._particles = [];
    this._ctx = null;
  }
}
