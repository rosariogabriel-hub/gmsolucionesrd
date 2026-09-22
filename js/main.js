(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // ---------- Nav ----------
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Reveal ----------
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  // Loops: only while visible
  const loops = document.querySelectorAll("[data-loop]");
  if ("IntersectionObserver" in window && !reduce) {
    const lo = new IntersectionObserver((entries) => { for (const e of entries) e.target.classList.toggle("is-playing", e.isIntersecting); }, { threshold: 0.3 });
    loops.forEach((el) => lo.observe(el));
  }

  // Click tracking hook (analytics wired later)
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest("[data-track]");
    if (a && typeof window.gmTrack === "function") window.gmTrack(a.dataset.track);
  });

  // ---------- Hero title: word by word ----------
  const title = document.querySelector(".hero__title");
  if (title && !reduce) {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}"><span>${w}</span></span>`).join(" ");
  }

  // ---------- Rotating line ----------
  document.querySelectorAll("[data-rot]").forEach((rot) => {
    const items = [...rot.children];
    let i = 0;
    items[0].classList.add("is-on");
    if (reduce) return;
    setInterval(() => {
      const cur = items[i];
      cur.classList.remove("is-on"); cur.classList.add("is-out");
      setTimeout(() => cur.classList.remove("is-out"), 700);
      i = (i + 1) % items.length;
      items[i].classList.add("is-on");
    }, 3000);
  });

  // ---------- Global cursor light ----------
  const light = document.getElementById("light");
  if (light && !reduce && finePointer) {
    let tx = 0.5, ty = 0.35, cx = 0.5, cy = 0.35, auto = !finePointer, t0 = performance.now();
    if (finePointer) {
      window.addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth; ty = e.clientY / innerHeight; auto = false; }, { passive: true });
      document.addEventListener("pointerleave", () => { auto = true; });
    }
    const loop = (now) => {
      if (auto) { const t = (now - t0) / 1000; tx = 0.5 + Math.cos(t * 0.25) * 0.32; ty = 0.45 + Math.sin(t * 0.37) * 0.25; }
      cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
      light.style.setProperty("--mx", (cx * 100).toFixed(2) + "%");
      light.style.setProperty("--my", (cy * 100).toFixed(2) + "%");
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---------- 2D canvas helper ----------
  const runCanvas = (canvas, setup, draw, { observe, maxDpr = 2 } = {}) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const host = observe || canvas.parentElement;
    const st = { w: 0, h: 0, mx: -9999, my: -9999, tmx: -9999, tmy: -9999, t: 0, visible: false };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, maxDpr);
      st.w = canvas.clientWidth; st.h = canvas.clientHeight;
      canvas.width = Math.floor(st.w * dpr); canvas.height = Math.floor(st.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setup(st);
    };
    resize();
    if ("ResizeObserver" in window) new ResizeObserver(() => resize()).observe(canvas); else addEventListener("resize", resize);
    if (finePointer) {
      host.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); st.tmx = e.clientX - r.left; st.tmy = e.clientY - r.top; });
      host.addEventListener("pointerleave", () => { st.tmx = -9999; st.tmy = -9999; });
    }
    new IntersectionObserver((es) => { st.visible = es[0].isIntersecting; }).observe(host);
    const start = performance.now();
    const frame = (now) => {
      if (st.visible) {
        st.t = reduce ? 0 : (now - start) / 1000;
        if (st.tmx === -9999) { st.mx = -9999; st.my = -9999; } else { st.mx = st.mx < -5000 ? st.tmx : st.mx + (st.tmx - st.mx) * 0.1; st.my = st.my < -5000 ? st.tmy : st.my + (st.tmy - st.my) * 0.1; }
        ctx.clearRect(0, 0, st.w, st.h);
        draw(ctx, st);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  // ---------- Aurora (WebGL) ----------
  const NOISE = `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
    float snoise(vec2 v){
      const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
      vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
      vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
      vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
      vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
      vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0); m=m*m; m=m*m;
      vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
      m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
      vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw; return 130.0*dot(m,g);
    }`;
  const AURORA_FS = `
    precision highp float;
    uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_k;
    ${NOISE}
    void main(){
      vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y;
      vec2 p=vec2(uv.x*ar, uv.y); float t=u_time*0.07;
      float n1=snoise(p*1.1+vec2(t,-t*0.6));
      float n2=snoise(p*2.0-vec2(t*0.5,t*0.8)+n1*0.55);
      float n3=snoise(p*0.6+vec2(-t*0.35,t*0.45)+n2*0.35);
      float m=smoothstep(-0.25,0.95,n1*0.55+n2*0.3+n3*0.45)*u_k;
      vec2 mp=vec2(u_mouse.x*ar,u_mouse.y); float d=distance(p,mp); float glow=exp(-d*d*5.0)*0.28*u_k;
      vec3 base=vec3(0.024,0.067,0.047);
      vec3 teal=vec3(0.055,0.373,0.290);
      vec3 g1=vec3(0.122,0.541,0.357);
      vec3 g2=vec3(0.369,0.890,0.651);
      vec3 col=mix(base,teal,m*0.95);
      col=mix(col,g1,smoothstep(0.5,1.0,m)*0.85);
      col=mix(col,g2,smoothstep(0.82,1.0,m)*0.35);
      col+=g2*glow;
      float v=smoothstep(1.5,0.35,length(uv-vec2(0.5,0.55))*1.5); col*=mix(0.7,1.0,v);
      gl_FragColor=vec4(col,1.0);
    }`;
  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

  const aurora = (canvas) => {
    const k = parseFloat(canvas.dataset.aurora || "1");
    const gl = canvas.getContext("webgl", { antialias: false });
    const host = canvas.parentElement;
    if (!gl) { host.style.background = "radial-gradient(ellipse 80% 70% at 30% 40%, #0B2419 0%, #06110C 70%)"; return; }
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, AURORA_FS)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res"), uTime = gl.getUniformLocation(prog, "u_time"), uMouse = gl.getUniformLocation(prog, "u_mouse"), uK = gl.getUniformLocation(prog, "u_k");
    let mx = 0.6, my = 0.5, tmx = 0.6, tmy = 0.5, visible = false;
    if (finePointer) host.parentElement.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height; });
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr); canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    if ("ResizeObserver" in window) new ResizeObserver(() => resize()).observe(canvas); else addEventListener("resize", resize);
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(host);
    const start = performance.now();
    const frame = (now) => {
      if (visible) {
        mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000);
        gl.uniform2f(uMouse, mx, my); gl.uniform1f(uK, k);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  document.querySelectorAll("[data-aurora]").forEach(aurora);

  // ---------- Globe ----------
  (() => {
    const canvas = document.querySelector("[data-globe]");
    if (!canvas) return;
    let sph = [], arcs = [];
    runCanvas(canvas, (s) => {
      const n = 720; sph = [];
      for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2; const r = Math.sqrt(1 - y * y); const th = i * 2.399963; sph.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
      arcs = Array.from({ length: 7 }, () => [sph[Math.floor(Math.random() * n)], sph[Math.floor(Math.random() * n)], Math.random() * 6]);
    }, (ctx, s) => {
      const narrow = s.w < 900;
      const R = narrow ? Math.min(s.w, s.h) * 0.40 : Math.min(s.w * 0.23, s.h * 0.42);
      const cx = narrow ? s.w * 0.5 : s.w * 0.76, cy = narrow ? s.h * 0.66 : s.h * 0.5;
      const tilt = -0.35 + (s.my > -5000 ? (s.my / s.h - 0.5) * 0.25 : 0);
      const rot = s.t * 0.16 + (s.mx > -5000 ? (s.mx / s.w - 0.5) * 0.4 : 0);
      const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), stt = Math.sin(tilt);
      const proj = (p) => { let x = p[0] * cr - p[2] * sr, z = p[0] * sr + p[2] * cr, y = p[1]; const y2 = y * ct - z * stt; z = y * stt + z * ct; const f = 1 / (1.9 - z * 0.7); return [cx + x * R * f, cy + y2 * R * f, z]; };
      const am = narrow ? 0.7 : 1;
      const dot = narrow ? 0.6 : 0.9;
      for (const p of sph) { const [x, y, z] = proj(p); const a = (0.12 + (z + 1) * 0.38) * am; ctx.fillStyle = `rgba(94,227,166,${a})`; ctx.beginPath(); ctx.arc(x, y, dot + (z + 1) * dot, 0, Math.PI * 2); ctx.fill(); }
      for (const [a, b, ph] of arcs) {
        const A = proj(a), B = proj(b); if (A[2] < -0.15 && B[2] < -0.15) continue;
        const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2; const dx = mx - cx, dy = my - cy; const d = Math.hypot(dx, dy) || 1; const lift = 0.5 + Math.min(1, Math.hypot(A[0] - B[0], A[1] - B[1]) / R);
        const qx = cx + dx / d * R * lift, qy = cy + dy / d * R * lift;
        const t = (Math.sin(s.t * 0.7 + ph) + 1) / 2;
        ctx.strokeStyle = `rgba(94,227,166,${0.35 * am})`; ctx.lineWidth = 1.2; ctx.setLineDash([6, 8]); ctx.lineDashOffset = -s.t * 30;
        ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.quadraticCurveTo(qx, qy, B[0], B[1]); ctx.stroke(); ctx.setLineDash([]);
        const px = (1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * qx + t * t * B[0], py = (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * qy + t * t * B[1];
        ctx.fillStyle = "rgba(94,227,166,0.95)"; ctx.beginPath(); ctx.arc(px, py, 2.6, 0, Math.PI * 2); ctx.fill();
      }
    }, { observe: canvas.closest(".hero"), maxDpr: 3 });
  })();

  // ---------- Constellation (Método) ----------
  (() => {
    const canvas = document.querySelector("[data-constellation]");
    if (!canvas) return;
    let pts = [];
    runCanvas(canvas, (s) => {
      const n = Math.round((s.w * s.h) / (s.w < 700 ? 22000 : 14000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * s.w, y: Math.random() * s.h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: 1 + Math.random() * 1.5, hi: Math.random() < 0.12 }));
    }, (ctx, s) => {
      const R = 130;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (s.mx > -5000) { const dx = s.mx - p.x, dy = s.my - p.y, d = Math.hypot(dx, dy); if (d < 220 && d > 1) { p.x += dx / d * 0.3; p.y += dy / d * 0.3; } }
        if (p.x < -10) p.x = s.w + 10; if (p.x > s.w + 10) p.x = -10; if (p.y < -10) p.y = s.h + 10; if (p.y > s.h + 10) p.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j]; const dx = a.x - b.x, dy = a.y - b.y; const d2 = dx * dx + dy * dy;
        if (d2 < R * R) { ctx.strokeStyle = `rgba(94,227,166,${(1 - Math.sqrt(d2) / R) * 0.28})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const p of pts) { ctx.fillStyle = p.hi ? "rgba(94,227,166,0.9)" : "rgba(47,179,122,0.6)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.hi ? p.r + 0.8 : p.r, 0, Math.PI * 2); ctx.fill(); }
    }, { observe: canvas.closest(".section") });
  })();

  // ---------- Floating panels ----------
  document.querySelectorAll("[data-panels]").forEach((wrap) => {
    const panels = [...wrap.querySelectorAll(".panel")];
    const host = wrap.closest(".sol");
    let px = 0, py = 0, tx = 0, ty = 0, visible = false;
    if (finePointer) {
      host.addEventListener("pointermove", (e) => { const r = host.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5; });
      host.addEventListener("pointerleave", () => { tx = 0; ty = 0; });
    }
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(host);
    const t0 = performance.now();
    const loop = (now) => {
      if (visible) {
        px += (tx - px) * 0.06; py += (ty - py) * 0.06;
        const t = (now - t0) / 1000;
        panels.forEach((el, i) => {
          const depth = parseFloat(el.dataset.depth || "1");
          el.style.setProperty("--x", (-px * 26 * depth).toFixed(2) + "px");
          el.style.setProperty("--y", (-py * 18 * depth).toFixed(2) + "px");
          el.style.setProperty("--f", (reduce ? 0 : Math.sin(t * 0.8 + i * 1.7) * 7).toFixed(2) + "px");
        });
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  // ---------- Phone demo ----------
  const chat = document.getElementById("waChat");
  const sheet = document.getElementById("waSheet");
  const sheetTitle = document.getElementById("waSheetTitle");
  const sheetRows = document.getElementById("waSheetRows");
  const caption = document.getElementById("demoCaption");
  if (!chat) return;

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (s) => esc(s).replace(/\*([^*]+)\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
  const DESK_OPTIONS = [["1.60 x 1.50 m nogal", "Escritorio en L"], ["1.80 x 1.60 m blanco", "Escritorio en L"], ["Ninguna de estas", "Lo dejo fuera del pedido"]];

  const timeline = [
    { t: 0,     type: "caption", text: "7:45 p. m. Nadie estaba pendiente del teléfono." },
    { t: 600,   type: "me",   text: "Buenas, necesito 12 sillas ergonómicas y 3 escritorios en L para una oficina en Piantini", time: "7:45 p. m." },
    { t: 2300,  type: "typing" },
    { t: 3500,  type: "bot",  text: "Para *escritorio en L* tengo varias opciones. ¿Cuál es?", time: "7:45 p. m.", listButton: "Ver opciones" },
    { t: 4700,  type: "sheet", title: "Opciones", rows: DESK_OPTIONS },
    { t: 6300,  type: "pick", index: 0 },
    { t: 6900,  type: "sheetClose" },
    { t: 7100,  type: "me",   text: "1.60 x 1.50 m nogal", time: "7:46 p. m." },
    { t: 7900,  type: "typing" },
    { t: 9300,  type: "bot",  text: "📋 *Tu solicitud de cotización*\n• 12 × Silla ergonómica malla con soporte lumbar\n• 3 × Escritorio en L 1.60 x 1.50 m nogal\n🚚 Entrega e instalación incluidas.", time: "7:46 p. m.", footer: "Toca una opción o escríbeme cambios", buttons: ["Pedir cotización", "Agregar o cambiar", "Hablar con alguien"] },
    { t: 11600, type: "tap",  index: 0 },
    { t: 12200, type: "me",   text: "Pedir cotización", time: "7:46 p. m." },
    { t: 12800, type: "typing" },
    { t: 13700, type: "bot",  text: "Perfecto. ¿A nombre de qué empresa o persona preparamos la cotización?", time: "7:46 p. m." },
    { t: 15200, type: "me",   text: "Oficina Piantini SRL", time: "7:47 p. m." },
    { t: 15800, type: "typing" },
    { t: 16600, type: "bot",  text: "¿Para cuándo lo necesitan?", time: "7:47 p. m.", buttons: ["Esta semana", "Este mes", "Solo cotizando"] },
    { t: 18000, type: "tap",  index: 1 },
    { t: 18500, type: "me",   text: "Este mes", time: "7:47 p. m." },
    { t: 19100, type: "typing" },
    { t: 20200, type: "bot",  text: "✅ *Solicitud de cotización #14 recibida*\nUn asesor la revisa y te la envía por aquí mismo en breve.", time: "7:47 p. m." },
    { t: 22300, type: "caption", text: "8:05 p. m." },
    { t: 23200, type: "typing" },
    { t: 24000, type: "doc",  name: "Cotización #14 · Oficina Piantini SRL.pdf", meta: "1 página · PDF · 86 KB", time: "8:05 p. m." },
    { t: 24900, type: "bot",  text: "Aquí tienes tu *cotización #14*, revisada por Laura, con entrega e instalación incluidas. Válida por 15 días.", time: "8:05 p. m." },
    { t: 26900, type: "caption", text: "Cotización enviada. Cliente calificado." },
    { t: 31500, type: "restart" },
  ];

  let timers = [], typingEl = null, lastBotButtons = null;
  const scrollDown = () => { chat.scrollTop = chat.scrollHeight; };
  const trim = () => { const nodes = chat.querySelectorAll(".msg, .typing"); for (let i = 0; i < nodes.length - 5; i++) nodes[i].remove(); };
  const removeTyping = () => { if (typingEl) { typingEl.remove(); typingEl = null; } };
  const addMsg = (who, html, time, extras = {}) => {
    removeTyping();
    const el = document.createElement("div");
    el.className = `msg msg--${who}` + (extras.doc ? " msg--doc" : "");
    let inner = extras.doc
      ? `<div class="doc"><div class="doc__icon">PDF</div><div><div class="doc__name">${esc(extras.doc.name)}</div><div class="doc__meta">${esc(extras.doc.meta)}</div></div></div>`
      : `<div class="msg__text">${html}</div>`;
    if (extras.footer) inner += `<div class="msg__footer">${esc(extras.footer)}</div>`;
    inner += `<span class="msg__time">${esc(time)}</span>`;
    if (extras.listButton) inner += `<div class="msg__btn">${esc(extras.listButton)}</div>`;
    if (extras.buttons) inner += extras.buttons.map((b) => `<div class="msg__btn">${esc(b)}</div>`).join("");
    el.innerHTML = inner;
    chat.appendChild(el);
    lastBotButtons = extras.buttons ? el.querySelectorAll(".msg__btn") : null;
    trim(); scrollDown();
  };
  const showTyping = () => { removeTyping(); typingEl = document.createElement("div"); typingEl.className = "typing"; typingEl.innerHTML = "<i></i><i></i><i></i>"; chat.appendChild(typingEl); trim(); scrollDown(); };
  const setCaption = (text) => { caption.classList.remove("is-on"); setTimeout(() => { caption.textContent = text; caption.classList.add("is-on"); }, 260); };
  const openSheet = (t, rows) => { sheetTitle.textContent = t; sheetRows.innerHTML = rows.map(([a, b]) => `<div class="wa__row"><span class="wa__radio"></span><div><div class="wa__row-t">${esc(a)}</div><div class="wa__row-s">${esc(b)}</div></div></div>`).join(""); sheet.classList.add("is-open"); sheet.setAttribute("aria-hidden", "false"); };
  const pickRow = (i) => { const r = sheetRows.children[i]; if (r) r.classList.add("is-picked"); };
  const closeSheet = () => { sheet.classList.remove("is-open"); sheet.setAttribute("aria-hidden", "true"); };
  const run = (step) => {
    switch (step.type) {
      case "caption": setCaption(step.text); break;
      case "me": addMsg("me", fmt(step.text), step.time); break;
      case "bot": addMsg("bot", fmt(step.text), step.time, { listButton: step.listButton, buttons: step.buttons, footer: step.footer }); break;
      case "typing": showTyping(); break;
      case "sheet": openSheet(step.title, step.rows); break;
      case "pick": pickRow(step.index); break;
      case "sheetClose": closeSheet(); break;
      case "tap": if (lastBotButtons && lastBotButtons[step.index]) lastBotButtons[step.index].classList.add("is-tapped"); break;
      case "doc": addMsg("bot", "", step.time, { doc: { name: step.name, meta: step.meta } }); break;
      case "restart": restart(); break;
    }
  };
  const clearAll = () => { timers.forEach(clearTimeout); timers = []; typingEl = null; lastBotButtons = null; closeSheet(); };
  const play = () => { clearAll(); chat.classList.remove("is-fading"); chat.innerHTML = ""; caption.classList.remove("is-on"); timeline.forEach((step) => timers.push(setTimeout(() => run(step), step.t))); };
  const restart = () => { chat.classList.add("is-fading"); caption.classList.remove("is-on"); timers.push(setTimeout(play, 420)); };

  if (reduce) {
    caption.textContent = "Cotización enviada. Cliente calificado."; caption.classList.add("is-on");
    addMsg("me", fmt("Buenas, necesito 12 sillas ergonómicas y 3 escritorios en L para una oficina en Piantini"), "7:45 p. m.");
    addMsg("bot", fmt("📋 *Tu solicitud de cotización*\n• 12 × Silla ergonómica malla con soporte lumbar\n• 3 × Escritorio en L 1.60 x 1.50 m nogal"), "7:46 p. m.", { buttons: ["Pedir cotización", "Agregar o cambiar", "Hablar con alguien"] });
    addMsg("bot", fmt("✅ *Solicitud de cotización #14 recibida*\nUn asesor la revisa y te la envía por aquí mismo."), "7:47 p. m.");
    addMsg("bot", "", "8:05 p. m.", { doc: { name: "Cotización #14 · Oficina Piantini SRL.pdf", meta: "1 página · PDF · 86 KB" } });
    return;
  }
  const phone = document.getElementById("phone");
  let playing = false;
  new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && !playing) { playing = true; play(); }
      else if (!e.isIntersecting && playing) { playing = false; clearAll(); }
    }
  }, { threshold: 0.3 }).observe(phone);
})();
