import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const profileDir = path.join(rootDir, 'assets', 'profile');

// Read the official Project Nox icon base64
const officialWebpPath = path.join(profileDir, 'nox-official.webp');
const officialWebpB64 = (await fs.readFile(officialWebpPath)).toString('base64');
const officialDataUri = `data:image/webp;base64,${officialWebpB64}`;

function escapeXml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const COMMON_FONTS = `
  text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
`;

// ==========================================
// 1. HERO DESKTOP (846 x 260) — PRESERVED INTACT
// ==========================================
function buildHeroDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="260" viewBox="0 0 846 260" role="img" aria-labelledby="heroTitle heroDesc">
  <title id="heroTitle">Awerkori · Project Nox — Identidade Oficial</title>
  <desc id="heroDesc">Identidade visual oficial do Project Nox com icone oficial, animacao orbital e atmosfera cosmica em roxo e dourado.</desc>

  <defs>
    <!-- Background Gradient -->
    <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090610"/>
      <stop offset="45%" stop-color="#120a1f"/>
      <stop offset="100%" stop-color="#08050e"/>
    </linearGradient>

    <!-- Cosmic Nebula Radial Glows -->
    <radialGradient id="symbolNebula" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.45"/>
      <stop offset="50%" stop-color="#581c87" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#090610" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="goldCoreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#090610" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="ambientRight" cx="90%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#090610" stop-opacity="0"/>
    </radialGradient>

    <!-- Metallic Gold Gradient -->
    <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff4b8"/>
      <stop offset="35%" stop-color="#fbbf24"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <!-- Title Gradient (Gold to Cosmic Violet) -->
    <linearGradient id="titleCosmic" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff8d6"/>
      <stop offset="30%" stop-color="#facc15"/>
      <stop offset="65%" stop-color="#e879f9"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>

    <!-- Orbital Ring Gradient -->
    <linearGradient id="orbitStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Light Sweep Gradient -->
    <linearGradient id="sweepBeam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#fef08a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <!-- Glow Filters -->
    <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Mask for light sweep -->
    <mask id="heroMask">
      <rect x="0.5" y="0.5" width="845" height="259" rx="14" fill="#ffffff"/>
    </mask>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-tracker {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3px;
      fill: #e9d5ff;
    }
    .hero-title {
      font-family: "Cinzel", "Cinzel Decorative", "Times New Roman", Georgia, serif;
      font-size: 44px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#titleCosmic);
    }
    .hero-tagline {
      font-size: 13.5px;
      font-weight: 400;
      fill: #c4b5fd;
      letter-spacing: 0.2px;
    }
    .pill-label {
      font-size: 10.5px;
      font-weight: 600;
      fill: #fef08a;
      letter-spacing: 0.5px;
    }
    .monogram {
      font-family: "Cinzel", Georgia, serif;
      font-size: 14px;
      letter-spacing: 4px;
      fill: #fbbf24;
      font-weight: 600;
    }
    .meta-edge {
      font-size: 9.5px;
      letter-spacing: 1.5px;
      fill: #8b859e;
    }

    /* Orbital and Nebula Animations */
    .aurora-pulse {
      animation: nebulaBreathe 8s ease-in-out infinite alternate;
      transform-origin: 110px 130px;
    }
    .orbit-cw {
      animation: spinCW 32s linear infinite;
      transform-origin: 110px 130px;
    }
    .orbit-ccw {
      animation: spinCCW 24s linear infinite;
      transform-origin: 110px 130px;
    }
    .satellite {
      animation: spinCW 18s linear infinite;
      transform-origin: 110px 130px;
    }
    .satellite-sub {
      animation: spinCCW 28s linear infinite;
      transform-origin: 110px 130px;
    }
    .sweep-move {
      animation: sweepCycle 14s ease-in-out infinite;
    }
    .star-twinkle-1 {
      animation: twinkle 4.2s ease-in-out infinite alternate;
    }
    .star-twinkle-2 {
      animation: twinkle 5.8s ease-in-out infinite alternate 1.5s;
    }
    .star-twinkle-3 {
      animation: twinkle 6.5s ease-in-out infinite alternate 3s;
    }

    @keyframes spinCW {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spinCCW {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes nebulaBreathe {
      0% { opacity: 0.35; transform: scale(0.95); }
      50% { opacity: 0.85; transform: scale(1.08); }
      100% { opacity: 0.45; transform: scale(0.98); }
    }
    @keyframes sweepCycle {
      0%, 15% { transform: translateX(-350px) skewX(-20deg); opacity: 0; }
      40% { opacity: 0.7; }
      75%, 100% { transform: translateX(1150px) skewX(-20deg); opacity: 0; }
    }
    @keyframes twinkle {
      0% { opacity: 0.15; transform: scale(0.8); }
      100% { opacity: 0.95; transform: scale(1.3); }
    }

    @media (prefers-reduced-motion: reduce) {
      .aurora-pulse, .orbit-cw, .orbit-ccw, .satellite, .satellite-sub, .sweep-move, .star-twinkle-1, .star-twinkle-2, .star-twinkle-3 {
        animation: none !important;
      }
    }
  </style>

  <!-- Canvas Surface -->
  <rect x="0.5" y="0.5" width="845" height="259" rx="14" fill="url(#heroBg)" stroke="#382156" stroke-width="1"/>
  <rect x="1" y="1" width="844" height="258" rx="13" fill="url(#ambientRight)"/>

  <!-- Celestial Stars -->
  <g class="star-twinkle-1">
    <circle cx="280" cy="42" r="1.3" fill="#ffffff"/>
    <circle cx="560" cy="50" r="1" fill="#fef08a"/>
    <circle cx="750" cy="180" r="1.4" fill="#ffffff"/>
    <circle cx="390" cy="220" r="1.1" fill="#e9d5ff"/>
  </g>
  <g class="star-twinkle-2">
    <circle cx="230" cy="210" r="1" fill="#ffffff"/>
    <circle cx="490" cy="35" r="1.3" fill="#fef08a"/>
    <circle cx="680" cy="75" r="1" fill="#c084fc"/>
    <circle cx="790" cy="130" r="1.2" fill="#ffffff"/>
  </g>
  <g class="star-twinkle-3">
    <text x="340" y="38" font-size="9" fill="#fbbf24" opacity="0.6">✦</text>
    <text x="730" y="95" font-size="8" fill="#e879f9" opacity="0.5">✦</text>
    <text x="610" y="225" font-size="9" fill="#fbbf24" opacity="0.6">✦</text>
  </g>

  <!-- Left: Official Project Nox Symbol and Celestial Orbits -->
  <g id="symbolSection">
    <!-- Nebula Auroras -->
    <circle cx="110" cy="130" r="95" fill="url(#symbolNebula)" class="aurora-pulse"/>
    <circle cx="110" cy="130" r="65" fill="url(#goldCoreGlow)" class="aurora-pulse"/>

    <!-- Outer Orbit Ring -->
    <circle cx="110" cy="130" r="74" fill="none" stroke="url(#orbitStroke)" stroke-width="1.2" stroke-dasharray="14 10 3 10" class="orbit-cw"/>
    <!-- Inner Orbit Ring -->
    <circle cx="110" cy="130" r="62" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="6 8" opacity="0.6" class="orbit-ccw"/>

    <!-- Orbital Satellite Node 1 (Golden Planet) -->
    <g class="satellite">
      <circle cx="110" cy="56" r="3.2" fill="#fef08a" filter="url(#goldGlow)"/>
      <circle cx="110" cy="56" r="1.4" fill="#ffffff"/>
    </g>
    <!-- Orbital Satellite Node 2 (Violet Planet) -->
    <g class="satellite-sub">
      <circle cx="110" cy="192" r="2.4" fill="#d946ef" filter="url(#softGlow)"/>
    </g>

    <!-- Official Emblem WebP (Golden Omega with Alpha inside) -->
    <image href="${officialDataUri}" x="52" y="72" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Center and Right: Typography and Brand -->
  <g transform="translate(216, 0)">
    <!-- Top Monogram and Tracker -->
    <g transform="translate(0, 52)">
      <text x="0" y="0" font-size="9" fill="#fbbf24" filter="url(#softGlow)">✦</text>
      <text x="14" y="-1" class="badge-tracker">AWERKORI</text>
      <text x="122" y="-1" class="badge-tracker" fill="#8b859e">·</text>
      <text x="134" y="-1" class="badge-tracker" fill="#fbbf24">PROJECT NOX</text>
    </g>

    <!-- Main Title -->
    <text x="0" y="108" class="hero-title">Project Nox</text>

    <!-- Refined Portuguese Tagline -->
    <text x="0" y="142" class="hero-tagline">Desenvolvimento de extensões, ferramentas e ecossistema aberto.</text>

    <!-- Refined Feature Badges -->
    <g transform="translate(0, 168)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="140" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Mihon e forks</text>
      </g>
      <g transform="translate(150, 0)">
        <rect x="0" y="0" width="145" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Aniyomi e forks</text>
      </g>
      <g transform="translate(305, 0)">
        <rect x="0" y="0" width="155" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Software aberto</text>
      </g>
    </g>

    <!-- Bottom Decorative Horizon Line -->
    <line x1="0" y1="216" x2="600" y2="216" stroke="#2a1c40" stroke-width="1"/>
    <line x1="0" y1="216" x2="160" y2="216" stroke="url(#goldMetal)" stroke-width="1.2"/>
    <text x="0" y="235" class="meta-edge">✦ IDENTIDADE E ENGENHARIA DIGITAL ✦</text>
    <text x="596" y="235" class="monogram" text-anchor="end">✦ NΩΛ ✦</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMask)">
    <rect x="0" y="0" width="160" height="260" fill="url(#sweepBeam)" class="sweep-move"/>
  </g>
</svg>
`;
}

// ==========================================
// 2. HERO MOBILE (420 x 330) — ELEVATED TO MATCH DESKTOP
// Preserves BOTH orbits (purple and gold), BOTH rotating planets,
// rotation speeds/directions, light sweep beam, and cosmic glow.
// ==========================================
function buildHeroMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="330" viewBox="0 0 420 330" role="img" aria-labelledby="heroMobTitle">
  <title id="heroMobTitle">Awerkori · Project Nox</title>
  <defs>
    <linearGradient id="heroBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090610"/>
      <stop offset="50%" stop-color="#140d24"/>
      <stop offset="100%" stop-color="#08050e"/>
    </linearGradient>
    <radialGradient id="nebulaM" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#581c87" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#090610" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="goldGlowM" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#090610" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="titleCosmicM" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff8d6"/>
      <stop offset="40%" stop-color="#facc15"/>
      <stop offset="80%" stop-color="#e879f9"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="goldMetalM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff4b8"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <!-- Orbital Ring Gradient (Gold to Violet) -->
    <linearGradient id="orbitStrokeM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.85"/>
    </linearGradient>
    <!-- Light Sweep Gradient -->
    <linearGradient id="sweepBeamM" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#fef08a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <!-- Filters -->
    <filter id="goldGlowFilterM" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softGlowFilterM" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <mask id="heroMaskM">
      <rect x="0.5" y="0.5" width="419" height="329" rx="14" fill="#ffffff"/>
    </mask>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-tracker-m {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2.5px;
      fill: #e9d5ff;
    }
    .hero-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#titleCosmicM);
    }
    .hero-tagline-m {
      font-size: 11.5px;
      fill: #c4b5fd;
    }
    .pill-label-m {
      font-size: 9.5px;
      font-weight: 600;
      fill: #fef08a;
    }

    /* Orbital and Nebula Animations matching Desktop */
    .aurora-pulse-m {
      animation: nebulaBreathe 8s ease-in-out infinite alternate;
      transform-origin: 210px 85px;
    }
    .orbit-cw-m {
      animation: spinCW 32s linear infinite;
      transform-origin: 210px 85px;
    }
    .orbit-ccw-m {
      animation: spinCCW 24s linear infinite;
      transform-origin: 210px 85px;
    }
    .satellite-m {
      animation: spinCW 18s linear infinite;
      transform-origin: 210px 85px;
    }
    .satellite-sub-m {
      animation: spinCCW 28s linear infinite;
      transform-origin: 210px 85px;
    }
    .sweep-move-m {
      animation: sweepCycleM 14s ease-in-out infinite;
    }
    .star-twinkle-m1 {
      animation: twinkle 4.2s ease-in-out infinite alternate;
    }
    .star-twinkle-m2 {
      animation: twinkle 5.8s ease-in-out infinite alternate 1.5s;
    }

    @keyframes spinCW {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spinCCW {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes nebulaBreathe {
      0% { opacity: 0.35; transform: scale(0.95); }
      50% { opacity: 0.85; transform: scale(1.08); }
      100% { opacity: 0.45; transform: scale(0.98); }
    }
    @keyframes sweepCycleM {
      0%, 15% { transform: translateX(-200px) skewX(-20deg); opacity: 0; }
      40% { opacity: 0.65; }
      75%, 100% { transform: translateX(650px) skewX(-20deg); opacity: 0; }
    }
    @keyframes twinkle {
      0% { opacity: 0.15; transform: scale(0.8); }
      100% { opacity: 0.95; transform: scale(1.3); }
    }

    @media (prefers-reduced-motion: reduce) {
      .orbit-cw-m, .orbit-ccw-m, .satellite-m, .satellite-sub-m, .aurora-pulse-m, .sweep-move-m, .star-twinkle-m1, .star-twinkle-m2 {
        animation: none !important;
      }
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="329" rx="14" fill="url(#heroBgM)" stroke="#382156" stroke-width="1"/>

  <!-- Celestial Stars -->
  <g class="star-twinkle-m1">
    <circle cx="50" cy="40" r="1.2" fill="#ffffff"/>
    <circle cx="370" cy="45" r="1.1" fill="#fef08a"/>
    <circle cx="340" cy="180" r="1.3" fill="#ffffff"/>
    <circle cx="80" cy="220" r="1.1" fill="#e9d5ff"/>
  </g>
  <g class="star-twinkle-m2">
    <circle cx="45" cy="160" r="1.1" fill="#ffffff"/>
    <circle cx="375" cy="120" r="1.2" fill="#c084fc"/>
    <text x="65" y="80" font-size="8" fill="#fbbf24" opacity="0.6">✦</text>
    <text x="350" y="80" font-size="8" fill="#e879f9" opacity="0.6">✦</text>
  </g>

  <!-- Symbol Top Center with DUAL ORBITS & DUAL SATELLITES -->
  <g id="symbolMobile">
    <!-- Nebula Auroras -->
    <circle cx="210" cy="85" r="75" fill="url(#nebulaM)" class="aurora-pulse-m"/>
    <circle cx="210" cy="85" r="50" fill="url(#goldGlowM)" class="aurora-pulse-m"/>

    <!-- Outer Orbit Ring (Golden / Gradient) -->
    <circle cx="210" cy="85" r="70" fill="none" stroke="url(#orbitStrokeM)" stroke-width="1.2" stroke-dasharray="14 10 3 10" class="orbit-cw-m"/>
    <!-- Inner Orbit Ring (Violet) -->
    <circle cx="210" cy="85" r="58" fill="none" stroke="#a855f7" stroke-width="0.9" stroke-dasharray="6 8" opacity="0.65" class="orbit-ccw-m"/>

    <!-- Orbital Satellite 1: Golden Planet (on outer ring, r=70) -->
    <g class="satellite-m">
      <circle cx="210" cy="15" r="3.2" fill="#fef08a" filter="url(#goldGlowFilterM)"/>
      <circle cx="210" cy="15" r="1.4" fill="#ffffff"/>
    </g>

    <!-- Orbital Satellite 2: Violet Planet (on inner ring, r=58) -->
    <g class="satellite-sub-m">
      <circle cx="210" cy="143" r="2.5" fill="#d946ef" filter="url(#softGlowFilterM)"/>
      <circle cx="210" cy="143" r="1" fill="#ffffff"/>
    </g>

    <!-- Official Emblem WebP (Golden Omega with Alpha inside) -->
    <image href="${officialDataUri}" x="165" y="40" width="90" height="90" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Centered Content -->
  <g transform="translate(210, 168)" text-anchor="middle">
    <text x="0" y="0" class="badge-tracker-m">✦ AWERKORI · PROJECT NOX ✦</text>
    <text x="0" y="34" class="hero-title-m">Project Nox</text>
    <text x="0" y="56" class="hero-tagline-m">Extensões, ferramentas e ecossistema aberto</text>

    <!-- Badges Row -->
    <g transform="translate(-140, 72)">
      <rect x="0" y="0" width="130" height="24" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="65" y="16" class="pill-label-m" text-anchor="middle">Mihon e forks</text>

      <rect x="150" y="0" width="130" height="24" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="215" y="16" class="pill-label-m" text-anchor="middle">Aniyomi e forks</text>
    </g>

    <!-- Bottom Line -->
    <line x1="-150" y1="116" x2="150" y2="116" stroke="#2a1c40" stroke-width="1"/>
    <line x1="-35" y1="116" x2="35" y2="116" stroke="url(#goldMetalM)" stroke-width="1.2"/>
    <text x="0" y="136" font-size="10" fill="#fbbf24" letter-spacing="3px">✦ NΩΛ ✦</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMaskM)">
    <rect x="0" y="0" width="120" height="330" fill="url(#sweepBeamM)" class="sweep-move-m"/>
  </g>
</svg>
`;
}

// ==========================================
// 3. COMPACT PROJECT CARD (DESKTOP: 846 x 104)
// Sleek, minimal vertical footprint, high elegance
// ==========================================
function buildProjectCard({
  id,
  title,
  badgeText,
  desc,
  iconSvg,
  tagText,
  accentColor = '#fbbf24'
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="104" viewBox="0 0 846 104" role="img" aria-labelledby="${id}Title ${id}Desc">
  <title id="${id}Title">${title}</title>
  <desc id="${id}Desc">${desc}</desc>
  <defs>
    <linearGradient id="${id}Bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <radialGradient id="${id}Glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0e0a19" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}BorderGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#7c3aed" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#3e2063" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: ${accentColor};
    }
    .card-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.2px;
      fill: #ffffff;
    }
    .card-desc {
      font-size: 12.5px;
      fill: #c4b5fd;
    }
    .tag-text {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.5px;
      fill: #fef08a;
    }
    .halo-pulse {
      animation: iconBreath 6s ease-in-out infinite alternate;
    }
    @keyframes iconBreath {
      0% { opacity: 0.35; }
      100% { opacity: 0.85; }
    }
    @media (prefers-reduced-motion: reduce) {
      .halo-pulse { animation: none !important; }
    }
  </style>

  <!-- Surface with subtle gradient border -->
  <rect x="0.5" y="0.5" width="845" height="103" rx="12" fill="url(#${id}Bg)" stroke="url(#${id}BorderGrad)" stroke-width="1"/>
  <!-- Glowing accent bar -->
  <path d="M14 1H150" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>

  <!-- Left Icon Frame (Compact: 64x64 at 20, 20) -->
  <g transform="translate(20, 16)">
    <circle cx="36" cy="36" r="32" fill="url(#${id}Glow)" class="halo-pulse"/>
    <rect x="4" y="4" width="64" height="64" rx="14" fill="#1b112e" stroke="#522785" stroke-width="1.1"/>
    <g transform="translate(-3, -3)">
      ${iconSvg}
    </g>
  </g>

  <!-- Central Content -->
  <g transform="translate(108, 22)">
    <text x="0" y="8" class="badge-label">✦ ${escapeXml(badgeText)}</text>
    <text x="0" y="32" class="card-title">${escapeXml(title)}</text>
    <text x="0" y="54" class="card-desc">${escapeXml(desc)}</text>
  </g>

  <!-- Right Decorative Tag Badge -->
  <g transform="translate(685, 36)">
    <rect x="0" y="0" width="135" height="32" rx="8" fill="#190f2d" stroke="#4c277a" stroke-width="0.9"/>
    <text x="67" y="21" class="tag-text" text-anchor="middle">${escapeXml(tagText)}</text>
  </g>
</svg>
`;
}

// ==========================================
// 4. COMPACT PROJECT CARD (MOBILE: 420 x 106)
// ==========================================
function buildProjectCardMobile({
  id,
  title,
  badgeText,
  desc,
  tagText,
  accentColor = '#fbbf24'
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="106" viewBox="0 0 420 106" role="img" aria-labelledby="${id}MobTitle">
  <title id="${id}MobTitle">${title}</title>
  <defs>
    <linearGradient id="${id}BgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="${id}BorderM" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#3e2063" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-label-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: ${accentColor};
    }
    .card-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 17.5px;
      font-weight: 700;
      fill: #ffffff;
    }
    .card-desc-m {
      font-size: 11px;
      fill: #c4b5fd;
    }
    .tag-label-m {
      font-size: 8px;
      font-weight: 600;
      fill: #fef08a;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="105" rx="11" fill="url(#${id}BgM)" stroke="url(#${id}BorderM)" stroke-width="1"/>
  <path d="M12 1H90" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>

  <g transform="translate(16, 17)">
    <text x="0" y="6" class="badge-label-m">✦ ${escapeXml(badgeText)}</text>
    <text x="0" y="27" class="card-title-m">${escapeXml(title)}</text>
    <text x="0" y="47" class="card-desc-m">${escapeXml(desc)}</text>
    
    <g transform="translate(0, 58)">
      <rect x="0" y="0" width="115" height="19" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="57" y="13" class="tag-label-m" text-anchor="middle">${escapeXml(tagText)}</text>
    </g>
  </g>
</svg>
`;
}

// ==========================================
// 5. GRAPHIC BUTTON (Compact Height: 34px)
// ==========================================
function buildGraphicButton({
  id,
  label,
  iconSvg,
  width = 155,
  isPrimary = false
}) {
  const bgGrad = isPrimary
    ? `<linearGradient id="${id}BtnBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22123f"/>
        <stop offset="50%" stop-color="#2d1553"/>
        <stop offset="100%" stop-color="#1a0e32"/>
      </linearGradient>`
    : `<linearGradient id="${id}BtnBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#130b22"/>
        <stop offset="50%" stop-color="#180e2b"/>
        <stop offset="100%" stop-color="#0c0717"/>
      </linearGradient>`;

  const borderGrad = isPrimary
    ? `<linearGradient id="${id}BtnBorder" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.65"/>
      </linearGradient>`
    : `<linearGradient id="${id}BtnBorder" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#552887" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#2f144d" stop-opacity="0.5"/>
      </linearGradient>`;

  const textColor = isPrimary ? '#ffffff' : '#e6edf3';
  const arrowColor = isPrimary ? '#fbbf24' : '#a78bfa';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="34" viewBox="0 0 ${width} 34" role="img" aria-label="${escapeXml(label)}">
  <defs>
    ${bgGrad}
    ${borderGrad}
  </defs>
  <style>
    ${COMMON_FONTS}
    .btn-lbl {
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.2px;
      fill: ${textColor};
    }
  </style>
  <rect x="0.5" y="0.5" width="${width - 1}" height="33" rx="7" fill="url(#${id}BtnBg)" stroke="url(#${id}BtnBorder)" stroke-width="1"/>
  <path d="M8 2H${width - 8}" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" stroke-linecap="round"/>

  <!-- Left Icon -->
  <g transform="translate(11, 8)">
    ${iconSvg}
  </g>

  <!-- Button Label -->
  <text x="32" y="22" class="btn-lbl">${escapeXml(label)}</text>

  <!-- Right Chevron -->
  <g transform="translate(${width - 16}, 12)">
    <path d="M0 0l3.5 4.5-3.5 4.5" fill="none" stroke="${arrowColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;
}

// ==========================================
// 6. ICONS SVG SNIPPETS
// ==========================================
const ICONS = {
  manga: `
    <path d="M19 23c7-3 15-3 20 2v34c-5-4-13-4-20-2z" fill="#2d174d" stroke="#a855f7" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M59 23c-7-3-15-3-20 2v34c5-4 13-4 20-2z" fill="#2d174d" stroke="#a855f7" stroke-width="1.6" stroke-linejoin="round"/>
    <line x1="39" y1="25" x2="39" y2="59" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="31" x2="34" y2="29" stroke="#e9d5ff" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="24" y1="38" x2="34" y2="36" stroke="#e9d5ff" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="44" y1="29" x2="54" y2="31" stroke="#e9d5ff" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="44" y1="36" x2="54" y2="38" stroke="#e9d5ff" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="39" cy="18" r="2" fill="#fbbf24"/>
  `,
  anime: `
    <circle cx="39" cy="39" r="26" fill="none" stroke="#7c3aed" stroke-width="1.4" stroke-dasharray="7 5"/>
    <circle cx="39" cy="39" r="18" fill="#2d174d" stroke="#fbbf24" stroke-width="1.4"/>
    <path d="M35 30l13 9-13 9z" fill="#fbbf24"/>
    <circle cx="39" cy="13" r="1.5" fill="#fef08a"/>
    <circle cx="65" cy="39" r="1.5" fill="#c084fc"/>
  `,
  tickets: `
    <rect x="18" y="25" width="42" height="28" rx="5" fill="#2d174d" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="30" y1="25" x2="30" y2="53" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M44 34l1.5 3.5 3.5.5-2.5 2.5.5 3.5-3-1.8-3 1.8.5-3.5-2.5-2.5 3.5-.5z" fill="#fbbf24"/>
    <circle cx="18" cy="39" r="3.5" fill="#1b112e"/>
    <circle cx="60" cy="39" r="3.5" fill="#1b112e"/>
  `,
  site: `
    <circle cx="39" cy="39" r="22" fill="#24133f" stroke="#7c3aed" stroke-width="1.4"/>
    <ellipse cx="39" cy="39" rx="10" ry="22" fill="none" stroke="#a855f7" stroke-width="1.1"/>
    <line x1="17" y1="39" x2="61" y2="39" stroke="#fbbf24" stroke-width="1.3"/>
    <ellipse cx="39" cy="39" rx="26" ry="7" fill="none" stroke="#fbbf24" stroke-width="0.9" opacity="0.6" transform="rotate(-20 39 39)"/>
  `,
  about: `
    <circle cx="39" cy="39" r="22" fill="#24133f" stroke="#7c3aed" stroke-width="1.4"/>
    <path d="M39 22v34M22 39h34" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M39 29l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" fill="#facc15"/>
    <circle cx="39" cy="39" r="1.8" fill="#ffffff"/>
  `
};

// ==========================================
// 7. BUTTON MINI-ICONS (18x18)
// ==========================================
const BTN_ICONS = {
  dist: `<path d="M2 5l7-3 7 3v8l-7 3-7-3z" fill="none" stroke="#fbbf24" stroke-width="1.4" stroke-linejoin="round"/><path d="M2 5l7 3 7-3M9 8v8" stroke="#fbbf24" stroke-width="1.2"/>`,
  source: `<path d="M5 4l-4 5 4 5M13 4l4 5-4 5M10 2l-3 14" fill="none" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  ticket: `<rect x="1" y="3" width="16" height="12" rx="2" fill="none" stroke="#fbbf24" stroke-width="1.3"/><line x1="6" y1="3" x2="6" y2="15" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/><circle cx="11" cy="9" r="1.6" fill="#fbbf24"/>`,
  tracker: `<path d="M2 15V9M7 15V4M12 15V7M16 15V2" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>`,
  site: `<circle cx="9" cy="9" r="7" fill="none" stroke="#fbbf24" stroke-width="1.3"/><ellipse cx="9" cy="9" rx="3.2" ry="7" fill="none" stroke="#fbbf24" stroke-width="1"/><line x1="2" y1="9" x2="16" y2="9" stroke="#fbbf24" stroke-width="1"/>`
};

// ==========================================
// 8. CARD "MAIS SOBRE MIM" (COMPACT DESKTOP: 846 x 88)
// ==========================================
function buildAboutDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="88" viewBox="0 0 846 88" role="img" aria-labelledby="aboutTitle aboutDesc">
  <title id="aboutTitle">Mais sobre mim — zyo.se/awerkori</title>
  <desc id="aboutDesc">Perfil pessoal com links, projetos autorais e canais de contato fora do GitHub.</desc>
  <defs>
    <linearGradient id="aboutBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f091c"/>
      <stop offset="50%" stop-color="#150d26"/>
      <stop offset="100%" stop-color="#0a0614"/>
    </linearGradient>
    <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0f091c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-about {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #fbbf24;
    }
    .about-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      fill: #ffffff;
    }
    .about-desc {
      font-size: 12px;
      fill: #c4b5fd;
    }
    .btn-about-text {
      font-size: 11.5px;
      font-weight: 600;
      fill: #fef08a;
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="87" rx="12" fill="url(#aboutBg)" stroke="#3e2063" stroke-width="1"/>
  <path d="M14 1H120" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>

  <!-- Icon (Compact) -->
  <g transform="translate(20, 12)">
    <circle cx="32" cy="32" r="28" fill="url(#aboutGlow)"/>
    <rect x="5" y="5" width="54" height="54" rx="12" fill="#1b112e" stroke="#522785" stroke-width="1.1"/>
    <g transform="translate(-7, -7)">
      ${ICONS.about}
    </g>
  </g>

  <!-- Text -->
  <g transform="translate(100, 19)">
    <text x="0" y="7" class="badge-about">✦ PERFIL PESSOAL · ALÉM DO GITHUB</text>
    <text x="0" y="29" class="about-title">Mais sobre mim</text>
    <text x="0" y="49" class="about-desc">Projetos autorais, perfil pessoal e links fora do GitHub.</text>
  </g>

  <!-- Right Pill -->
  <g transform="translate(650, 27)">
    <rect x="0" y="0" width="168" height="34" rx="8" fill="#1c1130" stroke="#582a8c" stroke-width="1"/>
    <text x="74" y="22" class="btn-about-text" text-anchor="middle">zyo.se/awerkori ↗</text>
  </g>
</svg>
`;
}

function buildAboutMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="96" viewBox="0 0 420 96" role="img" aria-labelledby="aboutMobTitle">
  <title id="aboutMobTitle">Mais sobre mim — zyo.se/awerkori</title>
  <defs>
    <linearGradient id="aboutBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f091c"/>
      <stop offset="50%" stop-color="#150d26"/>
      <stop offset="100%" stop-color="#0a0614"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-about-m {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 1.6px;
      fill: #fbbf24;
    }
    .about-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 16.5px;
      font-weight: 700;
      fill: #ffffff;
    }
    .about-desc-m {
      font-size: 10.5px;
      fill: #c4b5fd;
    }
    .btn-about-m {
      font-size: 10px;
      font-weight: 600;
      fill: #fef08a;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="95" rx="10" fill="url(#aboutBgM)" stroke="#3e2063" stroke-width="1"/>
  <path d="M12 1H80" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>

  <g transform="translate(16, 16)">
    <text x="0" y="6" class="badge-about-m">✦ PERFIL PESSOAL · ALÉM DO GITHUB</text>
    <text x="0" y="26" class="about-title-m">Mais sobre mim</text>
    <text x="0" y="44" class="about-desc-m">Projetos autorais, perfil e links fora do GitHub.</text>

    <g transform="translate(0, 52)">
      <rect x="0" y="0" width="150" height="22" rx="5" fill="#1c1130" stroke="#582a8c" stroke-width="0.8"/>
      <text x="75" y="15" class="btn-about-m" text-anchor="middle">zyo.se/awerkori ↗</text>
    </g>
  </g>
</svg>
`;
}

// ==========================================
// 9. SLEEK DIVIDER (846 x 10)
// ==========================================
function buildDivider() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="10" viewBox="0 0 846 10" role="presentation">
  <defs>
    <linearGradient id="divGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#382156" stop-opacity="0"/>
      <stop offset="40%" stop-color="#7c3aed" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#7c3aed" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#382156" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <line x1="20" y1="5" x2="826" y2="5" stroke="url(#divGrad)" stroke-width="1"/>
  <circle cx="423" cy="5" r="2" fill="#fef08a"/>
</svg>
`;
}

// ==========================================
// BUILD ALL ASSETS
// ==========================================
async function main() {
  console.log('Generating Project Nox compact assets...');

  // 1. Hero (Preserved approved)
  await fs.writeFile(path.join(profileDir, 'hero.svg'), buildHeroDesktop());
  await fs.writeFile(path.join(profileDir, 'hero-mobile.svg'), buildHeroMobile());
  console.log('  ✓ hero.svg & hero-mobile.svg');

  // 2. Project Nox · Mangá
  await fs.writeFile(path.join(profileDir, 'card-manga.svg'), buildProjectCard({
    id: 'manga',
    title: 'Project Nox · Mangá',
    badgeText: 'EXTENSÕES DE MANGÁ · MIHON E FORKS',
    desc: 'Extensões compiladas para Mihon e forks, com foco em estabilidade.',
    tagText: '✦ Mihon e forks',
    iconSvg: ICONS.manga,
    accentColor: '#fbbf24'
  }));
  await fs.writeFile(path.join(profileDir, 'card-manga-mobile.svg'), buildProjectCardMobile({
    id: 'manga',
    title: 'Project Nox · Mangá',
    badgeText: 'EXTENSÕES DE MANGÁ',
    desc: 'Extensões para Mihon e forks em português.',
    tagText: '✦ Mihon e forks',
    accentColor: '#fbbf24'
  }));
  console.log('  ✓ card-manga.svg & mobile');

  // 3. Project Nox · Anime
  await fs.writeFile(path.join(profileDir, 'card-anime.svg'), buildProjectCard({
    id: 'anime',
    title: 'Project Nox · Anime',
    badgeText: 'EXTENSÕES DE ANIME · ANIYOMI E FORKS',
    desc: 'Extensões compiladas para Aniyomi e forks com streaming contínuo.',
    tagText: '✦ Aniyomi e forks',
    iconSvg: ICONS.anime,
    accentColor: '#fbbf24'
  }));
  await fs.writeFile(path.join(profileDir, 'card-anime-mobile.svg'), buildProjectCardMobile({
    id: 'anime',
    title: 'Project Nox · Anime',
    badgeText: 'EXTENSÕES DE ANIME',
    desc: 'Extensões compiladas para Aniyomi e forks.',
    tagText: '✦ Aniyomi e forks',
    accentColor: '#fbbf24'
  }));
  console.log('  ✓ card-anime.svg & mobile');

  // 4. Project Nox · Tickets
  await fs.writeFile(path.join(profileDir, 'card-tickets.svg'), buildProjectCard({
    id: 'tickets',
    title: 'Project Nox · Tickets',
    badgeText: 'CENTRAL DE ATENDIMENTO E PEDIDOS',
    desc: 'Reporte problemas em extensões de mangá e anime e envie solicitações.',
    tagText: '✦ Suporte & Pedidos',
    iconSvg: ICONS.tickets,
    accentColor: '#fbbf24'
  }));
  await fs.writeFile(path.join(profileDir, 'card-tickets-mobile.svg'), buildProjectCardMobile({
    id: 'tickets',
    title: 'Project Nox · Tickets',
    badgeText: 'CENTRAL DE ATENDIMENTO',
    desc: 'Reporte problemas e envie solicitações.',
    tagText: '✦ Suporte & Pedidos',
    accentColor: '#fbbf24'
  }));
  console.log('  ✓ card-tickets.svg & mobile');

  // 5. Project Nox · Site
  await fs.writeFile(path.join(profileDir, 'card-site.svg'), buildProjectCard({
    id: 'site',
    title: 'Project Nox · Site',
    badgeText: 'PORTAL OFICIAL · WEB E CATÁLOGO',
    desc: 'Portal oficial do Project Nox para leitura e catálogo de obras.',
    tagText: '✦ Site Oficial',
    iconSvg: ICONS.site,
    accentColor: '#fbbf24'
  }));
  await fs.writeFile(path.join(profileDir, 'card-site-mobile.svg'), buildProjectCardMobile({
    id: 'site',
    title: 'Project Nox · Site',
    badgeText: 'PORTAL OFICIAL',
    desc: 'Portal oficial do Project Nox para leitura de obras.',
    tagText: '✦ Site Oficial',
    accentColor: '#fbbf24'
  }));
  console.log('  ✓ card-site.svg & mobile');

  // 6. Mais sobre mim
  await fs.writeFile(path.join(profileDir, 'card-about.svg'), buildAboutDesktop());
  await fs.writeFile(path.join(profileDir, 'card-about-mobile.svg'), buildAboutMobile());
  console.log('  ✓ card-about.svg & mobile');

  // 7. Divider
  await fs.writeFile(path.join(profileDir, 'divider.svg'), buildDivider());
  console.log('  ✓ divider.svg');

  // 8. Graphic Buttons
  // Mangá: Distribuição (Primary) & Código-fonte (Secondary)
  await fs.writeFile(path.join(profileDir, 'btn-manga-dist.svg'), buildGraphicButton({
    id: 'btnMangaDist',
    label: 'Distribuição',
    iconSvg: BTN_ICONS.dist,
    width: 155,
    isPrimary: true
  }));
  await fs.writeFile(path.join(profileDir, 'btn-manga-source.svg'), buildGraphicButton({
    id: 'btnMangaSrc',
    label: 'Código-fonte',
    iconSvg: BTN_ICONS.source,
    width: 155,
    isPrimary: false
  }));

  // Anime: Distribuição (Primary) & Código-fonte (Secondary)
  await fs.writeFile(path.join(profileDir, 'btn-anime-dist.svg'), buildGraphicButton({
    id: 'btnAnimeDist',
    label: 'Distribuição',
    iconSvg: BTN_ICONS.dist,
    width: 155,
    isPrimary: true
  }));
  await fs.writeFile(path.join(profileDir, 'btn-anime-source.svg'), buildGraphicButton({
    id: 'btnAnimeSrc',
    label: 'Código-fonte',
    iconSvg: BTN_ICONS.source,
    width: 155,
    isPrimary: false
  }));

  // Tickets: 1. Painel de tickets (Primary) & 2. Abrir ticket (Secondary)
  await fs.writeFile(path.join(profileDir, 'btn-tickets-tracker.svg'), buildGraphicButton({
    id: 'btnTicketsTrk',
    label: 'Painel de tickets',
    iconSvg: BTN_ICONS.tracker,
    width: 160,
    isPrimary: true
  }));
  await fs.writeFile(path.join(profileDir, 'btn-tickets-open.svg'), buildGraphicButton({
    id: 'btnTicketsOpen',
    label: 'Abrir ticket',
    iconSvg: BTN_ICONS.ticket,
    width: 145,
    isPrimary: false
  }));

  // Site: 1. Acessar nosso site (Primary) & 2. Código-fonte (Secondary)
  await fs.writeFile(path.join(profileDir, 'btn-site-open.svg'), buildGraphicButton({
    id: 'btnSiteOpen',
    label: 'Acessar nosso site',
    iconSvg: BTN_ICONS.site,
    width: 165,
    isPrimary: true
  }));
  await fs.writeFile(path.join(profileDir, 'btn-site-source.svg'), buildGraphicButton({
    id: 'btnSiteSrc',
    label: 'Código-fonte',
    iconSvg: BTN_ICONS.source,
    width: 150,
    isPrimary: false
  }));

  console.log('  ✓ Graphic buttons (8 files)');
  console.log('All compact SVG assets generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
