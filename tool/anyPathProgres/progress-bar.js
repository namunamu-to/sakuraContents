class ProgressBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.shadowRoot.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.path = [];        // 経路
    this.backgroundImg = null;
    this.markerImg = null;
    this.clipRect = null;
    this.progress = 0;
  }

  static get observedAttributes() {
    return ['progress', 'dat'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'dat' && newValue) {
      this.loadDat(newValue);
    } else if (name === 'progress') {
      this.progress = parseFloat(newValue);
      this.drawAll();
    }
  }

  async loadDat(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("DAT not found");
      const data = await res.json();

      this.path = data.path || [];
      this.clipRect = data.clipRect || null;
      this.canvas.width = this.clipRect ? this.clipRect.width : 600;
      this.canvas.height = this.clipRect ? this.clipRect.height : 400;
      this.path.forEach(p => {
        if (this.clipRect) {
          p.x -= this.clipRect.x;
          p.y -= this.clipRect.y;
        }
      });

      // 画像ロード
      [this.backgroundImg, this.markerImg] = await Promise.all([
        this.loadImage(data.background),
        this.loadImage(data.marker)
      ]);

      this.drawAll();
      console.log("✅ DAT読み込み完了", this.path.length, "points");
    } catch (err) {
      console.warn("⚠ DAT読み込み失敗:", err);
      this.path = [];
      this.backgroundImg = null;
      this.markerImg = null;
      this.drawAll();
    }
  }

  loadImage(src) {
    return new Promise(resolve => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  drawAll() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景
    if (this.backgroundImg) {
      //ctx.drawImage(this.backgroundImg, this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height);
      const sx = this.clipRect ? this.clipRect.x : 0;
      const sy = this.clipRect ? this.clipRect.y : 0;
      const sWidth = this.clipRect ? this.clipRect.width : this.backgroundImg.width;
      const sHeight = this.clipRect ? this.clipRect.height : this.backgroundImg.height;
      ctx.drawImage(this.backgroundImg, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
    }

    // 経路
    if (this.path.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.path[0].x, this.path[0].y);
      for (let i = 1; i < this.path.length; i++) {
        ctx.lineTo(this.path[i].x, this.path[i].y);
      }
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // マーカー
    if (this.path.length > 0) {
      const idx = Math.floor(this.progress * (this.path.length - 1));
      const p = this.path[idx];
      if (!p) return;
      if (this.markerImg) {
        const size = 35;
        ctx.drawImage(this.markerImg, p.x - size/2, p.y - size/2, size, size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.strokeStyle = 'orange';
        ctx.stroke();
      }
    }
  }
}

customElements.define('progress-bar', ProgressBar);
