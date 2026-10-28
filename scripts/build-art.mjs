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

// Common CSS defs & styles
const COMMON_FONTS = `
  text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .serif-title {
    font-family: "Cinzel", "Cinzel Decorative", "Times New Roman", Georgia, serif;
  }
`;

function buildHeroDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="260" viewBox="0 0 846 260" role="img" aria-labelledby="heroTitle heroDesc">
  <title id="heroTitle">Awerkori · Project Nox — Identidade Oficial</title>
  <desc id="heroDesc">Identidade visual oficial do Project Nox. Ecossistema cósmico, elegante em roxo e dourado, destacando extensões e arquitetura digital.</desc>

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

    /* Animations */
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
  
  <!-- Right ambient glow -->
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
    <!-- Star ✦ Glyphs -->
    <text x="340" y="38" font-size="9" fill="#fbbf24" opacity="0.6">✦</text>
    <text x="730" y="95" font-size="8" fill="#e879f9" opacity="0.5">✦</text>
    <text x="610" y="225" font-size="9" fill="#fbbf24" opacity="0.6">✦</text>
  </g>

  <!-- Left: Official Project Nox Symbol & Celestial Orbits -->
  <g id="symbolSection">
    <!-- Nebula Auroras -->
    <circle cx="110" cy="130" r="95" fill="url(#symbolNebula)" class="aurora-pulse"/>
    <circle cx="110" cy="130" r="65" fill="url(#goldCoreGlow)" class="aurora-pulse"/>

    <!-- Outer Orbit Ring -->
    <circle cx="110" cy="130" r="74" fill="none" stroke="url(#orbitStroke)" stroke-width="1.2" stroke-dasharray="14 10 3 10" class="orbit-cw"/>
    <!-- Inner Orbit Ring -->
    <circle cx="110" cy="130" r="62" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="6 8" opacity="0.6" class="orbit-ccw"/>

    <!-- Orbital Satellite Node 1 (Golden Star) -->
    <g class="satellite">
      <circle cx="110" cy="56" r="3" fill="#fef08a" filter="url(#goldGlow)"/>
      <circle cx="110" cy="56" r="1.2" fill="#ffffff"/>
    </g>
    <!-- Orbital Satellite Node 2 (Violet Star) -->
    <g class="satellite-sub">
      <circle cx="110" cy="192" r="2.2" fill="#d946ef" filter="url(#softGlow)"/>
    </g>

    <!-- Official Emblem WebP (Golden Omega with Alpha inside) -->
    <image href="${officialDataUri}" x="52" y="72" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Center & Right: Typography & Brand -->
  <g transform="translate(216, 0)">
    <!-- Top Monogram & Tracker -->
    <g transform="translate(0, 52)">
      <text x="0" y="0" font-size="9" fill="#fbbf24" filter="url(#softGlow)">✦</text>
      <text x="14" y="-1" class="badge-tracker">AWERKORI</text>
      <text x="122" y="-1" class="badge-tracker" fill="#8b859e">·</text>
      <text x="134" y="-1" class="badge-tracker" fill="#fbbf24">PROJECT NOX</text>
    </g>

    <!-- Main Title -->
    <text x="0" y="108" class="hero-title">Project Nox</text>

    <!-- Tagline -->
    <text x="0" y="142" class="hero-tagline">Sistemas, automações e ecossistemas abertos de leitura e streaming</text>

    <!-- Refined Feature Badges -->
    <g transform="translate(0, 168)">
      <!-- Badge 1: Mihon & TachiyomiSY -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="168" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Mihon &amp; TachiyomiSY</text>
      </g>
      <!-- Badge 2: Aniyomi Streaming -->
      <g transform="translate(178, 0)">
        <rect x="0" y="0" width="138" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Aniyomi &amp; Forks</text>
      </g>
      <!-- Badge 3: Protobuf & Cloudflare -->
      <g transform="translate(326, 0)">
        <rect x="0" y="0" width="162" height="27" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
        <text x="10" y="17" font-size="9" fill="#fbbf24">✦</text>
        <text x="23" y="17" class="pill-label">Protobuf &amp; Cloudflare</text>
      </g>
    </g>

    <!-- Bottom Decorative Horizon Line -->
    <line x1="0" y1="216" x2="600" y2="216" stroke="#2a1c40" stroke-width="1"/>
    <line x1="0" y1="216" x2="160" y2="216" stroke="url(#goldMetal)" stroke-width="1.2"/>
    <text x="0" y="235" class="meta-edge">EST. 2022 · DIGITAL SOVEREIGNTY &amp; OPEN MEDIA</text>
    <text x="596" y="235" class="monogram" text-anchor="end">NΩΛ</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMask)">
    <rect x="0" y="0" width="160" height="260" fill="url(#sweepBeam)" class="sweep-move"/>
  </g>
</svg>
`;
}

function buildHeroMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="340" viewBox="0 0 420 340" role="img" aria-labelledby="heroMobTitle">
  <title id="heroMobTitle">Awerkori · Project Nox</title>
  <defs>
    <linearGradient id="heroBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090610"/>
      <stop offset="50%" stop-color="#140d24"/>
      <stop offset="100%" stop-color="#08050e"/>
    </linearGradient>
    <radialGradient id="nebulaM" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#581c87" stop-opacity="0.15"/>
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
      font-size: 9px;
      font-weight: 600;
      fill: #fef08a;
    }
    .orbit-cw-m {
      animation: spinCW 28s linear infinite;
      transform-origin: 210px 80px;
    }
    .aurora-pulse-m {
      animation: nebulaBreatheM 8s ease-in-out infinite alternate;
      transform-origin: 210px 80px;
    }
    @keyframes spinCW {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes nebulaBreatheM {
      0% { opacity: 0.35; transform: scale(0.95); }
      100% { opacity: 0.85; transform: scale(1.08); }
    }
    @media (prefers-reduced-motion: reduce) {
      .orbit-cw-m, .aurora-pulse-m { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="339" rx="14" fill="url(#heroBgM)" stroke="#382156" stroke-width="1"/>

  <!-- Symbol Top Center -->
  <g id="symbolMobile">
    <circle cx="210" cy="80" r="70" fill="url(#nebulaM)" class="aurora-pulse-m"/>
    <circle cx="210" cy="80" r="48" fill="url(#goldGlowM)" class="aurora-pulse-m"/>
    <circle cx="210" cy="80" r="56" fill="none" stroke="#fbbf24" stroke-width="1.1" stroke-dasharray="12 8 3 8" opacity="0.8" class="orbit-cw-m"/>
    <image href="${officialDataUri}" x="165" y="35" width="90" height="90" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Centered Content -->
  <g transform="translate(210, 158)" text-anchor="middle">
    <text x="0" y="0" class="badge-tracker-m">✦ AWERKORI · PROJECT NOX ✦</text>
    <text x="0" y="40" class="hero-title-m">Project Nox</text>
    <text x="0" y="66" class="hero-tagline-m">Sistemas abertos de leitura e streaming</text>

    <!-- Badges Row -->
    <g transform="translate(-165, 86)">
      <rect x="0" y="0" width="102" height="24" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="51" y="16" class="pill-label-m" text-anchor="middle">Mihon / Forks</text>

      <rect x="112" y="0" width="106" height="24" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="165" y="16" class="pill-label-m" text-anchor="middle">Aniyomi Anime</text>

      <rect x="228" y="0" width="102" height="24" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="279" y="16" class="pill-label-m" text-anchor="middle">Protobuf / Web</text>
    </g>

    <!-- Bottom Line -->
    <line x1="-160" y1="135" x2="160" y2="135" stroke="#2a1c40" stroke-width="1"/>
    <line x1="-40" y1="135" x2="40" y2="135" stroke="url(#goldMetalM)" stroke-width="1.2"/>
    <text x="0" y="156" font-size="9" fill="#8b859e" letter-spacing="2px">EST. 2022 · DIGITAL SOVEREIGNTY</text>
  </g>
</svg>
`;
}

function buildCardExtensoesMangaDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="154" viewBox="0 0 846 154" role="img" aria-labelledby="mangaCardTitle mangaCardDesc">
  <title id="mangaCardTitle">Project Nox Extensões · Mangá</title>
  <desc id="mangaCardDesc">Repositório oficial de extensões compiladas para Mihon, TachiyomiSY e variantes com foco em PT-BR.</desc>
  <defs>
    <linearGradient id="mangaCardBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#150c26"/>
      <stop offset="100%" stop-color="#0a0713"/>
    </linearGradient>
    <radialGradient id="mangaIconGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0e0a19" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldButton" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="borderGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="mangaGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-primary {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #fbbf24;
    }
    .card-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 23px;
      font-weight: 700;
      letter-spacing: -0.2px;
      fill: #ffffff;
    }
    .card-desc {
      font-size: 12.5px;
      line-height: 18px;
      fill: #c4b5fd;
    }
    .spec-pill {
      font-size: 10px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.6px;
      fill: #090610;
    }
    .card-halo {
      animation: cardPulse 7s ease-in-out infinite alternate;
    }
    .star-rot {
      animation: starRotate 20s linear infinite;
      transform-origin: 58px 77px;
    }
    .arrow-drift {
      animation: arrowGlide 2.2s ease-in-out infinite;
    }
    @keyframes cardPulse {
      0% { opacity: 0.35; }
      100% { opacity: 0.8; }
    }
    @keyframes starRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes arrowGlide {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(4px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .card-halo, .star-rot, .arrow-drift { animation: none !important; }
    }
  </style>

  <!-- Card Surface -->
  <rect x="0.5" y="0.5" width="845" height="153" rx="13" fill="url(#mangaCardBg)" stroke="#44216e" stroke-width="1"/>
  <!-- Top Accent Bar -->
  <path d="M14 1H260" stroke="url(#goldButton)" stroke-width="2" stroke-linecap="round"/>

  <!-- Left Icon Frame (Grimoire / Manga Glyph) -->
  <g transform="translate(24, 27)">
    <circle cx="48" cy="50" r="44" fill="url(#mangaIconGlow)" class="card-halo"/>
    <rect x="12" y="14" width="72" height="72" rx="14" fill="#1b112e" stroke="#5b2a95" stroke-width="1.2"/>
    
    <!-- Rotating Celestial Ring behind icon -->
    <circle cx="48" cy="50" r="30" fill="none" stroke="#fbbf24" stroke-width="0.8" stroke-dasharray="8 6" opacity="0.6" class="star-rot"/>

    <!-- Grimoire / Open Manga Book Icon -->
    <g transform="translate(32, 33)" stroke="#fbbf24" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 5c4-2 9-2 14 2 5-4 10-4 14-2v24c-4-2-9-2-14 2-5-4-10-4-14-2Z" fill="#2d174d" fill-opacity="0.7"/>
      <path d="M16 7v24"/>
      <line x1="6" y1="13" x2="12" y2="13" stroke="#e9d5ff" stroke-width="1.4"/>
      <line x1="6" y1="18" x2="12" y2="18" stroke="#e9d5ff" stroke-width="1.4"/>
      <line x1="20" y1="13" x2="26" y2="13" stroke="#e9d5ff" stroke-width="1.4"/>
      <line x1="20" y1="18" x2="26" y2="18" stroke="#e9d5ff" stroke-width="1.4"/>
    </g>
  </g>

  <!-- Central Content -->
  <g transform="translate(142, 26)">
    <!-- Category Badge -->
    <text x="0" y="10" class="badge-primary">✦ REPOSITÓRIO OFICIAL · DESTAQUE PRINCIPAL</text>
    
    <!-- Title -->
    <text x="0" y="38" class="card-title">Project Nox Extensões · Mangá</text>

    <!-- Faithful Description -->
    <text x="0" y="62" class="card-desc">Repositório oficial de distribuição e publicação das extensões compiladas do Project Nox.</text>
    <text x="0" y="79" class="card-desc">Compatível com Mihon, TachiyomiSY e variantes, com foco principal na curadoria em PT-BR.</text>

    <!-- Specs Pills -->
    <g transform="translate(0, 96)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="144" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill">Catálogo index.pb</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(152, 0)">
        <rect x="0" y="0" width="138" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill">Foco Central PT-BR</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(298, 0)">
        <rect x="0" y="0" width="138" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill">Mihon &amp; TachiyomiSY</text>
      </g>
    </g>
  </g>

  <!-- Right CTA Button -->
  <g transform="translate(668, 56)">
    <rect x="0" y="0" width="154" height="42" rx="10" fill="url(#goldButton)" filter="url(#mangaGlow)"/>
    <g transform="translate(18, 25)">
      <text x="0" y="0" class="btn-text">Ver Repositório</text>
      <g class="arrow-drift">
        <path d="M102 -4l5 4-5 4m5-4H90" fill="none" stroke="#090610" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </g>
  </g>
</svg>
`;
}

function buildCardExtensoesMangaMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="210" viewBox="0 0 420 210" role="img" aria-labelledby="mangaCardMobTitle">
  <title id="mangaCardMobTitle">Project Nox Extensões · Mangá</title>
  <defs>
    <linearGradient id="mangaCardBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#150c26"/>
      <stop offset="100%" stop-color="#0a0713"/>
    </linearGradient>
    <linearGradient id="goldButtonM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-primary-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: #fbbf24;
    }
    .card-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      fill: #ffffff;
    }
    .card-desc-m {
      font-size: 11px;
      line-height: 16px;
      fill: #c4b5fd;
    }
    .spec-pill-m {
      font-size: 9px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text-m {
      font-size: 11px;
      font-weight: 700;
      fill: #090610;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="209" rx="12" fill="url(#mangaCardBgM)" stroke="#44216e" stroke-width="1"/>
  <path d="M12 1H180" stroke="url(#goldButtonM)" stroke-width="2" stroke-linecap="round"/>

  <!-- Content -->
  <g transform="translate(18, 22)">
    <text x="0" y="8" class="badge-primary-m">✦ REPOSITÓRIO OFICIAL · DESTAQUE</text>
    <text x="0" y="32" class="card-title-m">Project Nox Extensões · Mangá</text>
    <text x="0" y="54" class="card-desc-m">Extensões compiladas para Mihon, TachiyomiSY e variantes.</text>
    <text x="0" y="70" class="card-desc-m">Catálogo moderno em Protobuf (index.pb) e foco em PT-BR.</text>

    <!-- Pills -->
    <g transform="translate(0, 86)">
      <rect x="0" y="0" width="112" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="12" y="13" class="spec-pill-m">Catálogo index.pb</text>

      <rect x="120" y="0" width="102" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="132" y="13" class="spec-pill-m">Foco em PT-BR</text>

      <rect x="230" y="0" width="118" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="242" y="13" class="spec-pill-m">Mihon / Tachiyomi</text>
    </g>

    <!-- Button -->
    <g transform="translate(0, 122)">
      <rect x="0" y="0" width="384" height="36" rx="8" fill="url(#goldButtonM)"/>
      <text x="192" y="22" class="btn-text-m" text-anchor="middle">Acessar Repositório Awerkori/extensoes →</text>
    </g>
  </g>
</svg>
`;
}

function buildCardExtensoesAnimeDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="154" viewBox="0 0 846 154" role="img" aria-labelledby="animeCardTitle animeCardDesc">
  <title id="animeCardTitle">Project Nox Anime · Repositório de Extensões</title>
  <desc id="animeCardDesc">Repositório oficial de extensões compiladas do Project Nox Anime para streaming no Aniyomi e forks.</desc>
  <defs>
    <linearGradient id="animeCardBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140a24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <radialGradient id="animeIconGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0e0a19" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldButtonA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="animeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-primary-a {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #fbbf24;
    }
    .card-title-a {
      font-family: "Cinzel", Georgia, serif;
      font-size: 23px;
      font-weight: 700;
      letter-spacing: -0.2px;
      fill: #ffffff;
    }
    .card-desc-a {
      font-size: 12.5px;
      line-height: 18px;
      fill: #c4b5fd;
    }
    .spec-pill-a {
      font-size: 10px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text-a {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.6px;
      fill: #090610;
    }
    .card-halo-a {
      animation: cardPulseA 7s ease-in-out infinite alternate 1s;
    }
    .prism-pulse {
      animation: prismGlow 4s ease-in-out infinite alternate;
    }
    .arrow-drift-a {
      animation: arrowGlideA 2.2s ease-in-out infinite 0.3s;
    }
    @keyframes cardPulseA {
      0% { opacity: 0.35; }
      100% { opacity: 0.85; }
    }
    @keyframes prismGlow {
      0% { transform: scale(0.97); opacity: 0.8; }
      100% { transform: scale(1.03); opacity: 1; }
    }
    @keyframes arrowGlideA {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(4px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .card-halo-a, .prism-pulse, .arrow-drift-a { animation: none !important; }
    }
  </style>

  <!-- Card Surface -->
  <rect x="0.5" y="0.5" width="845" height="153" rx="13" fill="url(#animeCardBg)" stroke="#44216e" stroke-width="1"/>
  <path d="M14 1H260" stroke="url(#goldButtonA)" stroke-width="2" stroke-linecap="round"/>

  <!-- Left Icon Frame (Prism / Video Stream Glyph) -->
  <g transform="translate(24, 27)">
    <circle cx="48" cy="50" r="44" fill="url(#animeIconGlow)" class="card-halo-a"/>
    <rect x="12" y="14" width="72" height="72" rx="14" fill="#1b112e" stroke="#5b2a95" stroke-width="1.2"/>
    
    <!-- Rotating Celestial Ring -->
    <circle cx="48" cy="50" r="30" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="10 6" opacity="0.6"/>

    <!-- Anime Play / Streaming Prism Icon -->
    <g transform="translate(32, 34)" class="prism-pulse">
      <!-- Screen Border -->
      <rect x="2" y="4" width="28" height="24" rx="4" fill="#2d174d" fill-opacity="0.7" stroke="#fbbf24" stroke-width="1.8"/>
      <!-- Play Triangle -->
      <polygon points="12,11 22,16 12,21" fill="#fbbf24"/>
      <!-- Signal Waves -->
      <path d="M25 8a4 4 0 0 1 0 16" fill="none" stroke="#e9d5ff" stroke-width="1.4" stroke-linecap="round"/>
    </g>
  </g>

  <!-- Central Content -->
  <g transform="translate(142, 26)">
    <text x="0" y="10" class="badge-primary-a">✦ REPOSITÓRIO OFICIAL · DESTAQUE PRINCIPAL</text>
    <text x="0" y="38" class="card-title-a">Project Nox Anime · Extensões</text>
    <text x="0" y="62" class="card-desc-a">Repositório oficial de extensões compiladas para o ecossistema Aniyomi e forks.</text>
    <text x="0" y="79" class="card-desc-a">Distribuição contínua de índices compilados para streaming direto de vídeos e animes.</text>

    <!-- Specs Pills -->
    <g transform="translate(0, 96)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="144" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill-a">Ecossistema Aniyomi</text>
      </g>
      <g transform="translate(152, 0)">
        <rect x="0" y="0" width="154" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill-a">Catálogo index.min.json</text>
      </g>
      <g transform="translate(314, 0)">
        <rect x="0" y="0" width="138" height="22" rx="6" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
        <text x="8" y="14" font-size="8.5" fill="#fbbf24">✦</text>
        <text x="20" y="14" class="spec-pill-a">Streaming de Vídeo</text>
      </g>
    </g>
  </g>

  <!-- Right CTA Button -->
  <g transform="translate(668, 56)">
    <rect x="0" y="0" width="154" height="42" rx="10" fill="url(#goldButtonA)" filter="url(#animeGlow)"/>
    <g transform="translate(18, 25)">
      <text x="0" y="0" class="btn-text-a">Ver Repositório</text>
      <g class="arrow-drift-a">
        <path d="M102 -4l5 4-5 4m5-4H90" fill="none" stroke="#090610" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </g>
  </g>
</svg>
`;
}

function buildCardExtensoesAnimeMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="210" viewBox="0 0 420 210" role="img" aria-labelledby="animeCardMobTitle">
  <title id="animeCardMobTitle">Project Nox Anime · Extensões</title>
  <defs>
    <linearGradient id="animeCardBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140a24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="goldButtonAM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-primary-am {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: #fbbf24;
    }
    .card-title-am {
      font-family: "Cinzel", Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      fill: #ffffff;
    }
    .card-desc-am {
      font-size: 11px;
      line-height: 16px;
      fill: #c4b5fd;
    }
    .spec-pill-am {
      font-size: 9px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text-am {
      font-size: 11px;
      font-weight: 700;
      fill: #090610;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="209" rx="12" fill="url(#animeCardBgM)" stroke="#44216e" stroke-width="1"/>
  <path d="M12 1H180" stroke="url(#goldButtonAM)" stroke-width="2" stroke-linecap="round"/>

  <!-- Content -->
  <g transform="translate(18, 22)">
    <text x="0" y="8" class="badge-primary-am">✦ REPOSITÓRIO OFICIAL · DESTAQUE</text>
    <text x="0" y="32" class="card-title-am">Project Nox Anime · Extensões</text>
    <text x="0" y="54" class="card-desc-am">Extensões compiladas para o ecossistema Aniyomi e derivados.</text>
    <text x="0" y="70" class="card-desc-am">Catálogo compilado para streaming contínuo de animes.</text>

    <!-- Pills -->
    <g transform="translate(0, 86)">
      <rect x="0" y="0" width="112" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="12" y="13" class="spec-pill-am">Aniyomi &amp; Forks</text>

      <rect x="120" y="0" width="122" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="132" y="13" class="spec-pill-am">Índice Compilado</text>

      <rect x="250" y="0" width="98" height="20" rx="5" fill="#1b122c" stroke="#4c277a" stroke-width="0.8"/>
      <text x="262" y="13" class="spec-pill-am">Streaming HD</text>
    </g>

    <!-- Button -->
    <g transform="translate(0, 122)">
      <rect x="0" y="0" width="384" height="36" rx="8" fill="url(#goldButtonAM)"/>
      <text x="192" y="22" class="btn-text-am" text-anchor="middle">Acessar Repositório Awerkori/anime-extensoes →</text>
    </g>
  </g>
</svg>
`;
}

function buildCardSiteMangaDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="98" viewBox="0 0 846 98" role="img" aria-labelledby="siteCardTitle">
  <title id="siteCardTitle">Site Mangá — Plataforma de Leitura e Catálogo Web</title>
  <defs>
    <linearGradient id="siteBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0915"/>
      <stop offset="100%" stop-color="#120c1e"/>
    </linearGradient>
    <linearGradient id="goldAccentS" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-sec {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #a78bfa;
    }
    .site-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      fill: #f3e8ff;
    }
    .site-desc {
      font-size: 12px;
      fill: #9d94b0;
    }
    .site-link {
      font-size: 11.5px;
      font-weight: 600;
      fill: #fbbf24;
    }
    .link-glow {
      animation: linkPulse 3s ease-in-out infinite alternate;
    }
    @keyframes linkPulse {
      0% { opacity: 0.8; }
      100% { opacity: 1; transform: translateX(2px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .link-glow { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="97" rx="11" fill="url(#siteBg)" stroke="#301f4a" stroke-width="1"/>
  <path d="M12 1H100" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Icon (Web Globe / Reader) -->
  <g transform="translate(26, 26)">
    <rect x="0" y="0" width="46" height="46" rx="10" fill="#181028" stroke="#4c277a" stroke-width="1"/>
    <!-- Globe / Book icon -->
    <g transform="translate(13, 13)" stroke="#c4b5fd" stroke-width="1.6" fill="none">
      <circle cx="10" cy="10" r="9"/>
      <ellipse cx="10" cy="10" rx="4" ry="9"/>
      <line x1="1" y1="10" x2="19" y2="10"/>
    </g>
  </g>

  <!-- Details -->
  <g transform="translate(90, 26)">
    <text x="0" y="8" class="badge-sec">ECOSSISTEMA WEB · PROJETO COMPLEMENTAR</text>
    <text x="0" y="30" class="site-title">Leitor Web &amp; Catálogo Project Nox</text>
    <text x="0" y="49" class="site-desc">Plataforma de leitura contínua e catálogo mantido no ecossistema SvelteKit &amp; Cloudflare Workers.</text>
  </g>

  <!-- Right Access Link -->
  <g transform="translate(818, 52)" text-anchor="end">
    <g class="link-glow">
      <text x="-22" y="0" class="site-link">Acessar leitor web</text>
      <path d="M-14 -4l6 4-6 4m6-4h-10" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
`;
}

function buildCardSiteMangaMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="120" viewBox="0 0 420 120" role="img" aria-labelledby="siteCardMobTitle">
  <title id="siteCardMobTitle">Leitor Web Project Nox</title>
  <defs>
    <linearGradient id="siteBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0915"/>
      <stop offset="100%" stop-color="#120c1e"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-sec-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      fill: #a78bfa;
    }
    .site-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      fill: #f3e8ff;
    }
    .site-desc-m {
      font-size: 10.5px;
      fill: #9d94b0;
    }
    .site-link-m {
      font-size: 10px;
      font-weight: 600;
      fill: #fbbf24;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="119" rx="10" fill="url(#siteBgM)" stroke="#301f4a" stroke-width="1"/>

  <g transform="translate(18, 22)">
    <text x="0" y="6" class="badge-sec-m">ECOSSISTEMA WEB · PROJETO COMPLEMENTAR</text>
    <text x="0" y="28" class="site-title-m">Leitor Web &amp; Catálogo Project Nox</text>
    <text x="0" y="47" class="site-desc-m">Leitura contínua em SvelteKit &amp; Cloudflare Workers.</text>
    
    <g transform="translate(0, 72)">
      <text x="0" y="0" class="site-link-m">Acessar manga.project-nox-awerkori.workers.dev ↗</text>
    </g>
  </g>
</svg>
`;
}

function buildCardAboutDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="114" viewBox="0 0 846 114" role="img" aria-labelledby="aboutTitle aboutDesc">
  <title id="aboutTitle">Mais sobre mim — Conexões e Presença Digital</title>
  <desc id="aboutDesc">Perfil, ecossistema pessoal e projetos autorais em zyo.se/awerkori.</desc>
  <defs>
    <linearGradient id="aboutBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0817"/>
      <stop offset="50%" stop-color="#140a24"/>
      <stop offset="100%" stop-color="#080510"/>
    </linearGradient>
    <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="#a855f7" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0c0817" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldBorderA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-about {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2.2px;
      fill: #fbbf24;
    }
    .about-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 21px;
      font-weight: 700;
      fill: #ffffff;
      letter-spacing: -0.2px;
    }
    .about-desc {
      font-size: 12.5px;
      fill: #c4b5fd;
    }
    .portal-link {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      fill: #fbbf24;
    }
    .portal-pulse {
      animation: portalBreath 6s ease-in-out infinite alternate;
    }
    .compass-spin {
      animation: compassRotate 26s linear infinite;
      transform-origin: 48px 57px;
    }
    @keyframes portalBreath {
      0% { opacity: 0.4; }
      100% { opacity: 0.9; }
    }
    @keyframes compassRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .portal-pulse, .compass-spin { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="113" rx="13" fill="url(#aboutBg)" stroke="#3c205c" stroke-width="1"/>
  <path d="M14 1H160" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>

  <!-- Left Celestial Compass Glyph -->
  <g transform="translate(24, 0)">
    <circle cx="48" cy="57" r="38" fill="url(#portalGlow)" class="portal-pulse"/>
    <rect x="22" y="31" width="52" height="52" rx="12" fill="#1b102e" stroke="#502582" stroke-width="1.2"/>
    
    <!-- Rotating Compass Ring -->
    <circle cx="48" cy="57" r="21" fill="none" stroke="#fbbf24" stroke-width="0.9" stroke-dasharray="6 4 2 4" opacity="0.8" class="compass-spin"/>

    <!-- Celestial Core Star -->
    <g transform="translate(48, 57)">
      <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#fbbf24"/>
      <circle cx="0" cy="0" r="2.5" fill="#ffffff"/>
    </g>
  </g>

  <!-- Content -->
  <g transform="translate(122, 25)">
    <text x="0" y="8" class="badge-about">✦ ALÉM DO GITHUB · PRESENÇA DIGITAL</text>
    <text x="0" y="34" class="about-title">Mais sobre mim</text>
    <text x="0" y="56" class="about-desc">Conexões pessoais, ecossistema expandido e trajetória criativa centralizados no Zyo.</text>
  </g>

  <!-- Right Access Button -->
  <g transform="translate(818, 57)" text-anchor="end">
    <rect x="-190" y="-19" width="190" height="38" rx="9" fill="#1a112c" stroke="#502582" stroke-width="1"/>
    <text x="-32" y="5" class="portal-link">zyo.se/awerkori</text>
    <path d="M-22 -4l6 6m0 0h-6m6 0v-6" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;
}

function buildCardAboutMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="136" viewBox="0 0 420 136" role="img" aria-labelledby="aboutMobTitle">
  <title id="aboutMobTitle">Mais sobre mim — zyo.se/awerkori</title>
  <defs>
    <linearGradient id="aboutBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0817"/>
      <stop offset="50%" stop-color="#140a24"/>
      <stop offset="100%" stop-color="#080510"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-about-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: #fbbf24;
    }
    .about-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      fill: #ffffff;
    }
    .about-desc-m {
      font-size: 11px;
      fill: #c4b5fd;
    }
    .portal-link-m {
      font-size: 11px;
      font-weight: 700;
      fill: #fbbf24;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="135" rx="11" fill="url(#aboutBgM)" stroke="#3c205c" stroke-width="1"/>

  <g transform="translate(18, 22)">
    <text x="0" y="6" class="badge-about-m">✦ ALÉM DO GITHUB · PRESENÇA DIGITAL</text>
    <text x="0" y="30" class="about-title-m">Mais sobre mim</text>
    <text x="0" y="50" class="about-desc-m">Perfil pessoal, ecossistema e projetos em zyo.se/awerkori.</text>

    <g transform="translate(0, 72)">
      <rect x="0" y="0" width="384" height="32" rx="7" fill="#1b112e" stroke="#502582" stroke-width="0.9"/>
      <text x="192" y="20" class="portal-link-m" text-anchor="middle">Acessar perfil completo em zyo.se/awerkori ↗</text>
    </g>
  </g>
</svg>
`;
}

function buildDivider() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="32" viewBox="0 0 846 32" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="divLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b1d62" stop-opacity="0"/>
      <stop offset="35%" stop-color="#7c3aed" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="65%" stop-color="#7c3aed" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3b1d62" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="divStarGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#9333ea" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <style>
    .star-breathe {
      animation: divPulse 4s ease-in-out infinite alternate;
      transform-origin: 423px 16px;
    }
    @keyframes divPulse {
      0% { transform: scale(0.85); opacity: 0.7; }
      100% { transform: scale(1.15); opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .star-breathe { animation: none !important; }
    }
  </style>
  <line x1="28" y1="16" x2="818" y2="16" stroke="url(#divLine)" stroke-width="1.2"/>
  <circle cx="423" cy="16" r="12" fill="url(#divStarGlow)" class="star-breathe"/>
  <text x="423" y="20" font-size="11" fill="#fef08a" text-anchor="middle" class="star-breathe">✦</text>
</svg>
`;
}

async function main() {
  console.log('[Art] Building high-end Project Nox cosmic assets...');

  await fs.mkdir(profileDir, { recursive: true });

  await fs.writeFile(path.join(profileDir, 'hero.svg'), buildHeroDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'hero-mobile.svg'), buildHeroMobile(), 'utf8');
  console.log('  ✓ hero.svg & hero-mobile.svg');

  await fs.writeFile(path.join(profileDir, 'card-extensoes-manga.svg'), buildCardExtensoesMangaDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-extensoes-manga-mobile.svg'), buildCardExtensoesMangaMobile(), 'utf8');
  console.log('  ✓ card-extensoes-manga.svg & mobile');

  await fs.writeFile(path.join(profileDir, 'card-extensoes-anime.svg'), buildCardExtensoesAnimeDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-extensoes-anime-mobile.svg'), buildCardExtensoesAnimeMobile(), 'utf8');
  console.log('  ✓ card-extensoes-anime.svg & mobile');

  await fs.writeFile(path.join(profileDir, 'card-site-manga.svg'), buildCardSiteMangaDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-site-manga-mobile.svg'), buildCardSiteMangaMobile(), 'utf8');
  console.log('  ✓ card-site-manga.svg & mobile');

  await fs.writeFile(path.join(profileDir, 'card-about.svg'), buildCardAboutDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-about-mobile.svg'), buildCardAboutMobile(), 'utf8');
  console.log('  ✓ card-about.svg & mobile');

  await fs.writeFile(path.join(profileDir, 'divider.svg'), buildDivider(), 'utf8');
  console.log('  ✓ divider.svg');

  console.log('[Art] All assets built successfully!');
}

main().catch(err => {
  console.error('[Art] Error:', err);
  process.exit(1);
});
