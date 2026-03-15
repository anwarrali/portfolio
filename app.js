/* ══════════════════════════════════
   INTRO SEQUENCE
══════════════════════════════════ */
(function runIntro() {
  const intro = document.getElementById("intro");
  const overlay = document.getElementById("introOverlay");
  const letters = document.querySelectorAll(".intro-letter");
  const sub = document.getElementById("introSub");
  const bar = document.getElementById("introBar");
  const nav = document.getElementById("mainNav");
  const hero = document.getElementById("heroInner");

  // Particle canvas inside intro
  const ic = document.getElementById("intro-bg-canvas");
  const ictx = ic.getContext("2d");
  let iW,
    iH,
    iPts = [];
  function resizeIC() {
    iW = ic.width = window.innerWidth;
    iH = ic.height = window.innerHeight;
  }
  resizeIC();
  window.addEventListener("resize", resizeIC);
  for (let i = 0; i < 70; i++) {
    iPts.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.3 + 0.4,
      a: Math.random() * 0.4 + 0.1,
    });
  }
  let iRAF;
  function drawIC() {
    ictx.clearRect(0, 0, iW, iH);
    iPts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = iW;
      if (p.x > iW) p.x = 0;
      if (p.y < 0) p.y = iH;
      if (p.y > iH) p.y = 0;
      ictx.beginPath();
      ictx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ictx.fillStyle = `rgba(168,85,247,${p.a})`;
      ictx.fill();
    });
    iPts.forEach((p, i) => {
      for (let j = i + 1; j < iPts.length; j++) {
        const d = Math.hypot(p.x - iPts[j].x, p.y - iPts[j].y);
        if (d < 110) {
          ictx.beginPath();
          ictx.moveTo(p.x, p.y);
          ictx.lineTo(iPts[j].x, iPts[j].y);
          ictx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - d / 110)})`;
          ictx.lineWidth = 0.5;
          ictx.stroke();
        }
      }
    });
    iRAF = requestAnimationFrame(drawIC);
  }
  drawIC();

  // Stagger letters in
  letters.forEach((l, i) => {
    setTimeout(() => l.classList.add("show"), 80 + i * 80);
  });

  // Sub-line + bar — trigger after letters are all in (~480ms)
  setTimeout(() => {
    sub.classList.add("show");
    bar.classList.add("grow");
  }, 600);

  // After 2000ms — bar is done (600 + 900 = 1500ms), give 500ms to admire, then sweep
  setTimeout(() => {
    overlay.classList.add("exit");
    setTimeout(() => {
      intro.classList.add("hidden");
      cancelAnimationFrame(iRAF);
      nav.classList.add("show");
      setTimeout(() => hero.classList.add("show"), 200);
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
      });
    }, 900);
  }, 2000);
})();

/* ══════════════════════════════════
   CURSOR
══════════════════════════════════ */
const glow = document.getElementById("cursorGlow");
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
  glow.style.left = mx + "px";
  glow.style.top = my + "px";
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();
document
  .querySelectorAll("a,button,.project-card,.glass-card,.cert-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      dot.style.width = "12px";
      dot.style.height = "12px";
      ring.style.width = "50px";
      ring.style.height = "50px";
      ring.style.borderColor = "rgba(168,85,247,0.9)";
    });
    el.addEventListener("mouseleave", () => {
      dot.style.width = "7px";
      dot.style.height = "7px";
      ring.style.width = "34px";
      ring.style.height = "34px";
      ring.style.borderColor = "rgba(168,85,247,0.55)";
    });
  });

/* ══════════════════════════════════
   BACKGROUND PARTICLE CANVAS
══════════════════════════════════ */
const bgC = document.getElementById("bg-canvas");
const ctx = bgC.getContext("2d");
let W,
  H,
  pts = [];
function resizeBg() {
  W = bgC.width = window.innerWidth;
  H = bgC.height = window.innerHeight;
}
resizeBg();
window.addEventListener("resize", resizeBg);
for (let i = 0; i < 90; i++) {
  pts.push({
    x: Math.random() * 1920,
    y: Math.random() * 1080,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.4,
    a: Math.random() * 0.45 + 0.08,
  });
}
(function drawBg() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${p.a})`;
    ctx.fill();
  });
  pts.forEach((p, i) => {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.07 * (1 - d / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawBg);
})();

/* ══════════════════════════════════
   THREE.JS  — BG KEYBOARD + 2x </> ICONS
══════════════════════════════════ */
const threeC = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: threeC,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  48,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 1.2, 9);
camera.lookAt(0, 0.3, 0);

/* ── KEYBOARD ── */
const kbGroup = new THREE.Group();
kbGroup.position.set(0, 0, 0);
scene.add(kbGroup);

const baseW = 10,
  baseH = 0.24,
  baseD = 3.6;

// Base plate — thin, sleek
const baseMat = new THREE.MeshStandardMaterial({
  color: 0x0d0520,
  metalness: 0.95,
  roughness: 0.08,
  emissive: 0x07021a,
  emissiveIntensity: 0.6,
});
kbGroup.add(
  new THREE.Mesh(new THREE.BoxGeometry(baseW, baseH, baseD), baseMat),
);

// Thin chamfered top surface
const topMat = new THREE.MeshStandardMaterial({
  color: 0x160835,
  metalness: 0.9,
  roughness: 0.12,
  emissive: 0x0e0525,
  emissiveIntensity: 0.4,
});
const topSlab = new THREE.Mesh(
  new THREE.BoxGeometry(baseW - 0.1, 0.04, baseD - 0.1),
  topMat,
);
topSlab.position.y = baseH / 2;
kbGroup.add(topSlab);

// LED underglow — front + sides
const glowMat = new THREE.MeshStandardMaterial({
  color: 0x7c3aed,
  emissive: 0x7c3aed,
  emissiveIntensity: 6,
  roughness: 1,
});
const gFront = new THREE.Mesh(
  new THREE.BoxGeometry(baseW * 0.96, 0.05, 0.06),
  glowMat,
);
gFront.position.set(0, -baseH / 2 + 0.01, baseD / 2);
kbGroup.add(gFront);
[-baseW / 2, baseW / 2].forEach((x) => {
  const gSide = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.05, baseD * 0.94),
    glowMat,
  );
  gSide.position.set(x, -baseH / 2 + 0.01, 0);
  kbGroup.add(gSide);
});

// Key helper
function makeKey(w, h, d, col) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color: col.c,
      metalness: 0.6,
      roughness: 0.25,
      emissive: col.e,
      emissiveIntensity: 0.3,
    }),
  );
  // top shine strip
  const shine = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.7, 0.012, d * 0.25),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      roughness: 1,
    }),
  );
  shine.position.set(-w * 0.05, h / 2, -d * 0.22);
  body.add(shine);
  g.add(body);
  return g;
}

const KP = [
  { c: 0x4c1d95, e: 0x2e1065 },
  { c: 0x5b21b6, e: 0x3b0f8a },
  { c: 0x6d28d9, e: 0x4c1d95 },
  { c: 0x7c3aed, e: 0x5b21b6 },
  { c: 0x8b5cf6, e: 0x6d28d9 },
  { c: 0xa855f7, e: 0x7c3aed },
  { c: 0xf59e0b, e: 0x92400e },
];
const rndK = () => KP[Math.floor(Math.random() * KP.length)];
const KH = 0.16,
  YK = baseH / 2 + KH / 2 + 0.02;

[
  { n: 14, z: -1.26, xs: -4.36, step: 0.644, kD: 0.58 },
  { n: 14, z: -0.68, xs: -4.36, step: 0.644, kD: 0.58 },
  { n: 13, z: -0.09, xs: -4.04, step: 0.655, kD: 0.58 },
  { n: 12, z: 0.5, xs: -3.72, step: 0.666, kD: 0.58 },
  { n: 9, z: 1.08, xs: -3.4, step: 0.666, kD: 0.58, sp: true },
].forEach((row) => {
  for (let k = 0; k < row.n; k++) {
    let kw = 0.58,
      xp = row.xs + k * row.step;
    if (row.sp) {
      if (k === 0) {
        kw = 0.9;
        xp = -3.74;
      } else if (k === 1) {
        kw = 0.9;
        xp = -2.82;
      } else if (k === 2) {
        kw = 3.5;
        xp = -0.78;
      } else if (k === 3) {
        kw = 0.9;
        xp = 1.39;
      } else if (k === 4) {
        kw = 0.9;
        xp = 2.31;
      } else {
        xp = 3.1 + (k - 5) * 0.72;
      }
    }
    const col = row.sp && k === 2 ? { c: 0x2e1065, e: 0x1a0840 } : rndK();
    const key = makeKey(kw - 0.07, KH, row.kD - 0.07, col);
    key.position.set(xp, YK, row.z);
    kbGroup.add(key);
  }
});

// Subtle wireframe shell
kbGroup.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(baseW + 0.06, baseH + 0.28, baseD + 0.06),
    new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    }),
  ),
);

/* ── </> ICON FACTORY ── */
const D = 0.16;
function bar3d(w, h, hex) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, D),
    new THREE.MeshStandardMaterial({
      color: hex,
      metalness: 0.75,
      roughness: 0.18,
      emissive: hex,
      emissiveIntensity: 0.45,
    }),
  );
}
function makeCodeIcon() {
  const g = new THREE.Group();
  // < — tip left
  const lbG = new THREE.Group();
  lbG.position.x = -0.6;
  const lt = bar3d(0.1, 0.36, 0xa855f7);
  lt.position.set(-0.08, 0.22, 0);
  lt.rotation.z = -0.65;
  lbG.add(lt);
  const lb = bar3d(0.1, 0.36, 0xa855f7);
  lb.position.set(-0.08, -0.22, 0);
  lb.rotation.z = 0.65;
  lbG.add(lb);
  g.add(lbG);
  // /
  const sl = bar3d(0.09, 0.68, 0xf59e0b);
  sl.rotation.z = -0.42;
  g.add(sl);
  // > — tip right
  const rbG = new THREE.Group();
  rbG.position.x = 0.6;
  const rt = bar3d(0.1, 0.36, 0xa855f7);
  rt.position.set(0.08, 0.22, 0);
  rt.rotation.z = 0.65;
  rbG.add(rt);
  const rb = bar3d(0.1, 0.36, 0xa855f7);
  rb.position.set(0.08, -0.22, 0);
  rb.rotation.z = -0.65;
  rbG.add(rb);
  g.add(rbG);
  return g;
}

// Icon 1 — top right
const codeIcon1 = makeCodeIcon();
codeIcon1.scale.setScalar(0.42);
codeIcon1.position.set(5.8, 2.2, 0);
scene.add(codeIcon1);

// Icon 2 — bottom left
const codeIcon2 = makeCodeIcon();
codeIcon2.scale.setScalar(0.38);
codeIcon2.position.set(-5.2, -2.0, 0);
scene.add(codeIcon2);

/* ── LIGHTING ── */
scene.add(new THREE.AmbientLight(0x9966ff, 0.5));
const pt1 = new THREE.PointLight(0x7c3aed, 10, 30);
pt1.position.set(5, 6, 5);
scene.add(pt1);
const pt2 = new THREE.PointLight(0xa855f7, 6, 22);
pt2.position.set(-5, -3, 4);
scene.add(pt2);
const pt3 = new THREE.PointLight(0xf59e0b, 4, 20);
pt3.position.set(0, 7, -5);
scene.add(pt3);
const rim = new THREE.DirectionalLight(0xc084fc, 2);
rim.position.set(-4, 5, 3);
scene.add(rim);

/* ── MOUSE + RESIZE ── */
let mxN = 0,
  myN = 0;
document.addEventListener("mousemove", (e) => {
  mxN = (e.clientX / window.innerWidth - 0.5) * 2;
  myN = (e.clientY / window.innerHeight - 0.5) * 2;
});

function handleResponsive() {
  const w = window.innerWidth;
  // Keyboard scale
  if (w < 600) {
    kbGroup.scale.setScalar(0.45);
    codeIcon1.scale.setScalar(0.25);
    codeIcon2.scale.setScalar(0.22);
  } else if (w < 1000) {
    kbGroup.scale.setScalar(0.75);
    codeIcon1.scale.setScalar(0.35);
    codeIcon2.scale.setScalar(0.3);
  } else {
    kbGroup.scale.setScalar(1);
    codeIcon1.scale.setScalar(0.42);
    codeIcon2.scale.setScalar(0.38);
  }
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  handleResponsive();
});
handleResponsive();

/* ── ANIMATION ── */
let t3 = 0;
(function animThree() {
  t3 += 0.012;

  // Keyboard — mostly frontal, fast mouse tracking
  const targetY = Math.sin(t3 * 0.35) * 0.18 + mxN * 0.35;
  const targetX = -0.08 + myN * 0.2;
  kbGroup.rotation.y += (targetY - kbGroup.rotation.y) * 0.1;
  kbGroup.rotation.x += (targetX - kbGroup.rotation.x) * 0.1;
  kbGroup.position.y = Math.sin(t3 * 1.1) * 0.22;

  // Icon 1 top-right — tumbles + floats
  codeIcon1.rotation.x += 0.008;
  codeIcon1.rotation.y += 0.012;
  codeIcon1.rotation.z = Math.sin(t3 * 0.9) * 0.18;
  codeIcon1.position.y = 2.2 + Math.sin(t3 * 1.1) * 0.28;
  codeIcon1.position.x = 5.8 + mxN * 0.08;

  // Icon 2 bottom-left — opposite phase
  codeIcon2.rotation.x -= 0.007;
  codeIcon2.rotation.y += 0.01;
  codeIcon2.rotation.z = Math.sin(t3 * 0.7 + 2.0) * 0.18;
  codeIcon2.position.y = -2.0 + Math.sin(t3 * 0.95 + 1.5) * 0.28;
  codeIcon2.position.x = -5.2 + mxN * 0.08;

  // Lights orbit
  pt1.position.x = Math.sin(t3) * 7;
  pt1.position.y = Math.cos(t3) * 6;
  pt2.position.x = Math.cos(t3 * 0.7) * 6;
  pt2.position.z = Math.sin(t3 * 0.5) * 5;
  pt3.intensity = 3 + Math.sin(t3 * 1.3) * 1.2;

  renderer.render(scene, camera);
  requestAnimationFrame(animThree);
})();

/* ══════════════════════════════════
   CONTACT FORM
══════════════════════════════════ */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const form = e.target;
  const n = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const m = document.getElementById("fmessage").value.trim();
  
  if (!n || !email || !m) {
    document.getElementById("fname").style.borderColor = !n ? "rgba(248,113,113,0.7)" : "";
    document.getElementById("femail").style.borderColor = !email ? "rgba(248,113,113,0.7)" : "";
    document.getElementById("fmessage").style.borderColor = !m ? "rgba(248,113,113,0.7)" : "";
    return;
  }

  const btn = document.getElementById("btnSend");
  btn.innerText = "Sending...";
  btn.disabled = true;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("contactForm").style.display = "none";
      document.getElementById("formSuccess").style.display = "block";
    } else {
      alert("Oops! There was a problem submitting your form. Please try again.");
      btn.innerText = "Send Message";
      btn.disabled = false;
    }
  })
  .catch(error => {
    alert("Oops! There was a problem submitting your form. Please try again.");
    btn.innerText = "Send Message";
    btn.disabled = false;
  });
});
