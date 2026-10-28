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

const COMMON_FONTS = `
  text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
`;

function buildHeroDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="236" viewBox="0 0 846 236" role="img" aria-labelledby="heroTitle heroDesc">
  <title id="heroTitle">Awerkori · Project Nox</title>
  <desc id="heroDesc">Identidade oficial do Project Nox com ícone orbital animado e atmosfera cósmica roxa e dourada.</desc>

  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090610"/>
      <stop offset="45%" stop-color="#120a1f"/>
      <stop offset="100%" stop-color="#08050e"/>
    </linearGradient>

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

    <linearGradient id="titleCosmic" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff8d6"/>
      <stop offset="30%" stop-color="#facc15"/>
      <stop offset="65%" stop-color="#e879f9"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>

    <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff4b8"/>
      <stop offset="35%" stop-color="#fbbf24"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <linearGradient id="orbitStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="sweepBeam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#fef08a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

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

    <mask id="heroMask">
      <rect x="0.5" y="0.5" width="845" height="235" rx="14" fill="#ffffff"/>
    </mask>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-tracker {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2.5px;
      fill: #e9d5ff;
    }
    .hero-title {
      font-family: "Cinzel", "Cinzel Decorative", "Times New Roman", Georgia, serif;
      font-size: 46px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#titleCosmic);
    }
    .hero-tagline {
      font-size: 14px;
      font-weight: 400;
      fill: #c4b5fd;
      letter-spacing: 0.2px;
    }
    .monogram {
      font-family: "Cinzel", Georgia, serif;
      font-size: 14px;
      letter-spacing: 4px;
      fill: #fbbf24;
      font-weight: 600;
    }

    /* Orbital & Nebula Animations */
    .aurora-pulse {
      animation: nebulaBreathe 8s ease-in-out infinite alternate;
      transform-origin: 110px 118px;
    }
    .orbit-cw {
      animation: spinCW 32s linear infinite;
      transform-origin: 110px 118px;
    }
    .orbit-ccw {
      animation: spinCCW 24s linear infinite;
      transform-origin: 110px 118px;
    }
    .satellite {
      animation: spinCW 18s linear infinite;
      transform-origin: 110px 118px;
    }
    .satellite-sub {
      animation: spinCCW 28s linear infinite;
      transform-origin: 110px 118px;
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
      .aurora-pulse, .orbit-cw, .orbit-ccw, .satellite, .satellite-sub, .sweep-move, .star-twinkle-1, .star-twinkle-2 {
        animation: none !important;
      }
    }
  </style>

  <!-- Surface -->
  <rect x="0.5" y="0.5" width="845" height="235" rx="14" fill="url(#heroBg)" stroke="#382156" stroke-width="1"/>
  <rect x="1" y="1" width="844" height="234" rx="13" fill="url(#ambientRight)"/>

  <!-- Celestial Stars -->
  <g class="star-twinkle-1">
    <circle cx="280" cy="38" r="1.3" fill="#ffffff"/>
    <circle cx="560" cy="46" r="1" fill="#fef08a"/>
    <circle cx="750" cy="155" r="1.4" fill="#ffffff"/>
    <circle cx="390" cy="195" r="1.1" fill="#e9d5ff"/>
  </g>
  <g class="star-twinkle-2">
    <circle cx="230" cy="185" r="1" fill="#ffffff"/>
    <circle cx="490" cy="32" r="1.3" fill="#fef08a"/>
    <circle cx="680" cy="65" r="1" fill="#c084fc"/>
    <text x="340" y="34" font-size="9" fill="#fbbf24" opacity="0.6">✦</text>
    <text x="730" y="85" font-size="8" fill="#e879f9" opacity="0.5">✦</text>
  </g>

  <!-- Official Icon & Celestial Orbits (Centered vertically at 118) -->
  <g id="symbolSection">
    <circle cx="110" cy="118" r="95" fill="url(#symbolNebula)" class="aurora-pulse"/>
    <circle cx="110" cy="118" r="65" fill="url(#goldCoreGlow)" class="aurora-pulse"/>

    <!-- Outer Orbit Ring -->
    <circle cx="110" cy="118" r="74" fill="none" stroke="url(#orbitStroke)" stroke-width="1.2" stroke-dasharray="14 10 3 10" class="orbit-cw"/>
    <!-- Inner Orbit Ring -->
    <circle cx="110" cy="118" r="62" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="6 8" opacity="0.6" class="orbit-ccw"/>

    <!-- Orbital Satellites (Planetinhas) -->
    <g class="satellite">
      <circle cx="110" cy="44" r="3" fill="#fef08a" filter="url(#goldGlow)"/>
      <circle cx="110" cy="44" r="1.2" fill="#ffffff"/>
    </g>
    <g class="satellite-sub">
      <circle cx="110" cy="180" r="2.2" fill="#d946ef" filter="url(#softGlow)"/>
    </g>

    <!-- Official Emblem WebP (Golden Omega with Alpha inside) -->
    <image href="${officialDataUri}" x="52" y="60" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Typography & Brand -->
  <g transform="translate(216, 0)">
    <g transform="translate(0, 48)">
      <text x="0" y="0" font-size="9" fill="#fbbf24" filter="url(#softGlow)">✦</text>
      <text x="14" y="-1" class="badge-tracker">AWERKORI</text>
      <text x="122" y="-1" class="badge-tracker" fill="#8b859e">·</text>
      <text x="134" y="-1" class="badge-tracker" fill="#fbbf24">PROJECT NOX</text>
    </g>

    <text x="0" y="104" class="hero-title">Project Nox</text>
    <text x="0" y="140" class="hero-tagline">Desenvolvimento de extensões, ferramentas e sistemas para o Project Nox.</text>

    <!-- Bottom Line -->
    <line x1="0" y1="180" x2="600" y2="180" stroke="#2a1c40" stroke-width="1"/>
    <line x1="0" y1="180" x2="140" y2="180" stroke="url(#goldMetal)" stroke-width="1.2"/>
    <text x="596" y="198" class="monogram" text-anchor="end">✦ NΩΛ ✦</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMask)">
    <rect x="0" y="0" width="160" height="236" fill="url(#sweepBeam)" class="sweep-move"/>
  </g>
</svg>
`;
}

function buildHeroMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="286" viewBox="0 0 420 286" role="img" aria-labelledby="heroMobTitle">
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
      letter-spacing: 2.2px;
      fill: #e9d5ff;
    }
    .hero-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#titleCosmicM);
    }
    .hero-tagline-m {
      font-size: 11.5px;
      fill: #c4b5fd;
      line-height: 16px;
    }
    .orbit-cw-m {
      animation: spinCW 28s linear infinite;
      transform-origin: 210px 72px;
    }
    .satellite-m {
      animation: spinCW 16s linear infinite;
      transform-origin: 210px 72px;
    }
    .aurora-pulse-m {
      animation: nebulaBreatheM 8s ease-in-out infinite alternate;
      transform-origin: 210px 72px;
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
      .orbit-cw-m, .satellite-m, .aurora-pulse-m { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="285" rx="14" fill="url(#heroBgM)" stroke="#382156" stroke-width="1"/>

  <!-- Symbol Top Center -->
  <g id="symbolMobile">
    <circle cx="210" cy="72" r="66" fill="url(#nebulaM)" class="aurora-pulse-m"/>
    <circle cx="210" cy="72" r="44" fill="url(#goldGlowM)" class="aurora-pulse-m"/>
    <circle cx="210" cy="72" r="52" fill="none" stroke="#fbbf24" stroke-width="1.1" stroke-dasharray="12 8 3 8" opacity="0.8" class="orbit-cw-m"/>
    <g class="satellite-m">
      <circle cx="210" cy="20" r="2.5" fill="#fef08a"/>
    </g>
    <image href="${officialDataUri}" x="169" y="31" width="82" height="82" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Centered Content -->
  <g transform="translate(210, 146)" text-anchor="middle">
    <text x="0" y="0" class="badge-tracker-m">✦ AWERKORI · PROJECT NOX ✦</text>
    <text x="0" y="36" class="hero-title-m">Project Nox</text>
    <text x="0" y="62" class="hero-tagline-m">Extensões, ferramentas e sistemas abertos</text>
    <text x="0" y="78" class="hero-tagline-m">para leitura e streaming.</text>

    <!-- Bottom Line -->
    <line x1="-140" y1="104" x2="140" y2="104" stroke="#2a1c40" stroke-width="1"/>
    <line x1="-35" y1="104" x2="35" y2="104" stroke="url(#goldMetalM)" stroke-width="1.2"/>
    <text x="0" y="123" font-size="10" fill="#fbbf24" letter-spacing="3px">✦ NΩΛ ✦</text>
  </g>
</svg>
`;
}

function buildProjectCard({
  id,
  title,
  label,
  desc1,
  desc2,
  reposText,
  iconSvg,
  buttonText,
  accentColor = '#fbbf24'
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="142" viewBox="0 0 846 142" role="img" aria-labelledby="${id}Title ${id}Desc">
  <title id="${id}Title">${title}</title>
  <desc id="${id}Desc">${desc1} ${desc2}</desc>
  <defs>
    <linearGradient id="${id}Bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <radialGradient id="${id}Glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#0e0a19" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}Btn" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="${id}Filter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-label {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: ${accentColor};
    }
    .card-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.2px;
      fill: #ffffff;
    }
    .card-desc {
      font-size: 12.5px;
      fill: #c4b5fd;
    }
    .repos-sub {
      font-size: 10.5px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text {
      font-size: 11.5px;
      font-weight: 700;
      fill: #090610;
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

  <!-- Surface -->
  <rect x="0.5" y="0.5" width="845" height="141" rx="14" fill="url(#${id}Bg)" stroke="#3e2063" stroke-width="1"/>
  <path d="M14 1H180" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>

  <!-- Left Icon Frame (Exact Center at 65, 71) -->
  <g transform="translate(26, 22)">
    <circle cx="49" cy="49" r="44" fill="url(#${id}Glow)" class="halo-pulse"/>
    <rect x="10" y="10" width="78" height="78" rx="16" fill="#1b112e" stroke="#522785" stroke-width="1.2"/>
    <g transform="translate(10, 10)">
      ${iconSvg}
    </g>
  </g>

  <!-- Central Content -->
  <g transform="translate(136, 24)">
    <text x="0" y="8" class="badge-label">✦ ${label}</text>
    <text x="0" y="34" class="card-title">${title}</text>
    <text x="0" y="58" class="card-desc">${desc1}</text>
    <text x="0" y="74" class="card-desc">${desc2}</text>
    <text x="0" y="98" class="repos-sub">${reposText}</text>
  </g>

  <!-- Right CTA Button (Fully Contained) -->
  <g transform="translate(676, 50)">
    <rect x="0" y="0" width="146" height="42" rx="10" fill="url(#${id}Btn)" filter="url(#${id}Filter)"/>
    <text x="64" y="26" class="btn-text" text-anchor="middle">${buttonText}</text>
    <path d="M122 21l4 0m-2 -3l3 3-3 3" fill="none" stroke="#090610" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;
}

function buildProjectCardMobile({
  id,
  title,
  label,
  desc,
  reposText,
  buttonText,
  accentColor = '#fbbf24'
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="172" viewBox="0 0 420 172" role="img" aria-labelledby="${id}MobTitle">
  <title id="${id}MobTitle">${title}</title>
  <defs>
    <linearGradient id="${id}BgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="${id}BtnM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff099"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
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
      font-size: 18.5px;
      font-weight: 700;
      fill: #ffffff;
    }
    .card-desc-m {
      font-size: 11px;
      line-height: 15px;
      fill: #c4b5fd;
    }
    .repos-sub-m {
      font-size: 9.5px;
      font-weight: 600;
      fill: #e9d5ff;
    }
    .btn-text-m {
      font-size: 11px;
      font-weight: 700;
      fill: #090610;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="171" rx="12" fill="url(#${id}BgM)" stroke="#3e2063" stroke-width="1"/>
  <path d="M12 1H120" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>

  <g transform="translate(18, 18)">
    <text x="0" y="6" class="badge-label-m">✦ ${label}</text>
    <text x="0" y="27" class="card-title-m">${title}</text>
    <text x="0" y="46" class="card-desc-m">${desc}</text>
    <text x="0" y="66" class="repos-sub-m">${reposText}</text>

    <!-- Full-width Mobile CTA Button -->
    <g transform="translate(0, 84)">
      <rect x="0" y="0" width="384" height="36" rx="8" fill="url(#${id}BtnM)"/>
      <text x="192" y="23" class="btn-text-m" text-anchor="middle">${buttonText} →</text>
    </g>
  </g>
</svg>
`;
}

// Exactly Centered Glyphs inside a 78x78 container (Center = 39, 39)
const MANGA_GLYPH = `
  <g stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(13, 17)">
    <path d="M4 6c7-3 15-3 22 2 7-5 15-5 22-2v32c-7-3-15-3-22 2-7-5-15-5-22-2Z" fill="#2d174d" fill-opacity="0.8"/>
    <path d="M26 8v32"/>
    <line x1="10" y1="16" x2="20" y2="16" stroke="#e9d5ff" stroke-width="1.6"/>
    <line x1="10" y1="22" x2="20" y2="22" stroke="#e9d5ff" stroke-width="1.6"/>
    <line x1="32" y1="16" x2="42" y2="16" stroke="#e9d5ff" stroke-width="1.6"/>
    <line x1="32" y1="22" x2="42" y2="22" stroke="#e9d5ff" stroke-width="1.6"/>
  </g>
`;

const ANIME_GLYPH = `
  <g transform="translate(14, 19)">
    <rect x="2" y="2" width="46" height="36" rx="8" fill="#2d174d" fill-opacity="0.8" stroke="#fbbf24" stroke-width="2"/>
    <polygon points="19,13 32,20 19,27" fill="#fbbf24"/>
    <path d="M38 12a6 6 0 0 1 0 16" fill="none" stroke="#e9d5ff" stroke-width="1.8" stroke-linecap="round"/>
  </g>
`;

const TICKETS_GLYPH = `
  <g transform="translate(15, 18)" stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 8a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v7a5 5 0 0 0 0 10v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-7a5 5 0 0 0 0-10Z" fill="#2d174d" fill-opacity="0.8"/>
    <line x1="16" y1="4" x2="16" y2="36" stroke="#522785" stroke-dasharray="2 3"/>
    <polygon points="28,14 30,19 35,19 31,22 33,27 28,24 23,27 25,22 21,19 26,19" fill="#fbbf24" stroke="none"/>
  </g>
`;

const SITE_GLYPH = `
  <g transform="translate(0, 0)" stroke="#c4b5fd" stroke-width="1.8" fill="none">
    <circle cx="28" cy="28" r="18" stroke="#fbbf24" fill="#2d174d" fill-opacity="0.7"/>
    <ellipse cx="28" cy="28" rx="8" ry="18"/>
    <line x1="10" y1="28" x2="46" y2="28"/>
  </g>
`;

const ABOUT_GLYPH = `
  <g transform="translate(26, 26)">
    <circle cx="0" cy="0" r="21" fill="none" stroke="#fbbf24" stroke-width="1.1" stroke-dasharray="7 5"/>
    <polygon points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4" fill="#fbbf24"/>
    <circle cx="0" cy="0" r="3" fill="#ffffff"/>
  </g>
`;

function buildCardSiteMangaDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="106" viewBox="0 0 846 106" role="img" aria-labelledby="siteTitle siteDesc">
  <title id="siteTitle">Project Nox · Leitor Web</title>
  <desc id="siteDesc">Leitor online e catálogo público da Project Nox para leitura de mangás diretamente no navegador.</desc>
  <defs>
    <linearGradient id="siteBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0816"/>
      <stop offset="100%" stop-color="#110b1d"/>
    </linearGradient>
    <radialGradient id="siteGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0b0816" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="siteBtn" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#231438"/>
      <stop offset="100%" stop-color="#160c26"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-site {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #a78bfa;
    }
    .site-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      fill: #f3e8ff;
    }
    .site-desc {
      font-size: 12px;
      fill: #9d94b0;
    }
    .site-sub {
      font-size: 10px;
      font-weight: 600;
      fill: #c4b5fd;
    }
    .btn-text-s {
      font-size: 11px;
      font-weight: 700;
      fill: #fbbf24;
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="105" rx="12" fill="url(#siteBg)" stroke="#301c4a" stroke-width="1"/>
  <path d="M14 1H90" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Icon Centered -->
  <g transform="translate(26, 17)">
    <circle cx="36" cy="36" r="32" fill="url(#siteGlow)"/>
    <rect x="8" y="8" width="56" height="56" rx="14" fill="#170e28" stroke="#482273" stroke-width="1"/>
    <g transform="translate(8, 8)">
      ${SITE_GLYPH}
    </g>
  </g>

  <!-- Details -->
  <g transform="translate(120, 22)">
    <text x="0" y="8" class="badge-site">✦ LEITOR ONLINE · PROJETO COMPLEMENTAR</text>
    <text x="0" y="30" class="site-title">Project Nox · Leitor Web</text>
    <text x="0" y="50" class="site-desc">Plataforma web de leitura e catálogo público mantida em SvelteKit &amp; Cloudflare Workers.</text>
    <text x="0" y="68" class="site-sub">Acesso direto: manga.project-nox-awerkori.workers.dev · Repositório: Awerkori/project-nox-manga</text>
  </g>

  <!-- Right Access Button -->
  <g transform="translate(686, 34)">
    <rect x="0" y="0" width="136" height="38" rx="8" fill="url(#siteBtn)" stroke="#482273" stroke-width="1"/>
    <text x="68" y="24" class="btn-text-s" text-anchor="middle">Acessar leitor →</text>
  </g>
</svg>
`;
}

function buildCardSiteMangaMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="136" viewBox="0 0 420 136" role="img" aria-labelledby="siteMobTitle">
  <title id="siteMobTitle">Project Nox · Leitor Web</title>
  <defs>
    <linearGradient id="siteBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0816"/>
      <stop offset="100%" stop-color="#110b1d"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-site-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      fill: #a78bfa;
    }
    .site-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 17px;
      font-weight: 700;
      fill: #f3e8ff;
    }
    .site-desc-m {
      font-size: 11px;
      fill: #9d94b0;
    }
    .btn-text-sm {
      font-size: 10.5px;
      font-weight: 700;
      fill: #fbbf24;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="135" rx="10" fill="url(#siteBgM)" stroke="#301c4a" stroke-width="1"/>

  <g transform="translate(18, 18)">
    <text x="0" y="6" class="badge-site-m">✦ LEITOR ONLINE · PROJETO COMPLEMENTAR</text>
    <text x="0" y="27" class="site-title-m">Project Nox · Leitor Web</text>
    <text x="0" y="46" class="site-desc-m">Leitura contínua e catálogo diretamente no navegador.</text>

    <g transform="translate(0, 66)">
      <rect x="0" y="0" width="384" height="34" rx="7" fill="#170e28" stroke="#482273" stroke-width="1"/>
      <text x="192" y="22" class="btn-text-sm" text-anchor="middle">Acessar manga.project-nox-awerkori.workers.dev ↗</text>
    </g>
  </g>
</svg>
`;
}

function buildCardAboutDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="114" viewBox="0 0 846 114" role="img" aria-labelledby="aboutTitle aboutDesc">
  <title id="aboutTitle">Mais sobre mim</title>
  <desc id="aboutDesc">Meu perfil pessoal com links, projetos autorais e canais de contato fora do GitHub.</desc>
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
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-about {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2px;
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
    @keyframes portalBreath {
      0% { opacity: 0.4; }
      100% { opacity: 0.9; }
    }
    @media (prefers-reduced-motion: reduce) {
      .portal-pulse { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="113" rx="13" fill="url(#aboutBg)" stroke="#3c205c" stroke-width="1"/>
  <path d="M14 1H140" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>

  <!-- Centered Compass Icon Frame -->
  <g transform="translate(26, 0)">
    <circle cx="48" cy="57" r="38" fill="url(#portalGlow)" class="portal-pulse"/>
    <rect x="22" y="31" width="52" height="52" rx="13" fill="#1b102e" stroke="#502582" stroke-width="1.2"/>
    <g transform="translate(22, 31)">
      ${ABOUT_GLYPH}
    </g>
  </g>

  <!-- Content -->
  <g transform="translate(124, 26)">
    <text x="0" y="8" class="badge-about">✦ PERFIL PESSOAL · ALÉM DO GITHUB</text>
    <text x="0" y="34" class="about-title">Mais sobre mim</text>
    <text x="0" y="56" class="about-desc">Meu perfil pessoal com links, projetos autorais e canais de contato fora do GitHub.</text>
  </g>

  <!-- Right Access Button -->
  <g transform="translate(818, 57)" text-anchor="end">
    <rect x="-186" y="-19" width="186" height="38" rx="9" fill="#1a112c" stroke="#502582" stroke-width="1"/>
    <text x="-28" y="5" class="portal-link">zyo.se/awerkori ↗</text>
  </g>
</svg>
`;
}

function buildCardAboutMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="130" viewBox="0 0 420 130" role="img" aria-labelledby="aboutMobTitle">
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

  <rect x="0.5" y="0.5" width="419" height="129" rx="11" fill="url(#aboutBgM)" stroke="#3c205c" stroke-width="1"/>

  <g transform="translate(18, 18)">
    <text x="0" y="6" class="badge-about-m">✦ PERFIL PESSOAL · ALÉM DO GITHUB</text>
    <text x="0" y="28" class="about-title-m">Mais sobre mim</text>
    <text x="0" y="47" class="about-desc-m">Links pessoais, projetos e formas de contato no Zyo.</text>

    <g transform="translate(0, 66)">
      <rect x="0" y="0" width="384" height="34" rx="7" fill="#1b112e" stroke="#502582" stroke-width="0.9"/>
      <text x="192" y="22" class="portal-link-m" text-anchor="middle">Acessar perfil pessoal em zyo.se/awerkori ↗</text>
    </g>
  </g>
</svg>
`;
}

function buildDivider() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="30" viewBox="0 0 846 30" role="img" aria-hidden="true">
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
      transform-origin: 423px 15px;
    }
    @keyframes divPulse {
      0% { transform: scale(0.85); opacity: 0.7; }
      100% { transform: scale(1.15); opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .star-breathe { animation: none !important; }
    }
  </style>
  <line x1="28" y1="15" x2="818" y2="15" stroke="url(#divLine)" stroke-width="1.2"/>
  <circle cx="423" cy="15" r="11" fill="url(#divStarGlow)" class="star-breathe"/>
  <text x="423" y="19" font-size="10" fill="#fef08a" text-anchor="middle" class="star-breathe">✦</text>
</svg>
`;
}

async function main() {
  console.log('[Art] Gerando assets refinados do Project Nox...');

  await fs.mkdir(profileDir, { recursive: true });

  // Hero
  await fs.writeFile(path.join(profileDir, 'hero.svg'), buildHeroDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'hero-mobile.svg'), buildHeroMobile(), 'utf8');
  console.log('  ✓ hero.svg & hero-mobile.svg');

  // Card 1: Project Nox · Mangá
  const mangaD = buildProjectCard({
    id: 'manga',
    title: 'Project Nox · Mangá',
    label: 'EXTENSÕES DE MANGÁ · MIHON E FORKS',
    desc1: 'Extensões compiladas para Mihon e forks, com foco em estabilidade e fontes em português.',
    desc2: 'Reúne o catálogo moderno de distribuição e o repositório de código-fonte.',
    reposText: 'Distribuição: Awerkori/extensoes · Código-fonte: Awerkori/fonte-extensoes',
    iconSvg: MANGA_GLYPH,
    buttonText: 'Ver Projeto'
  });
  const mangaM = buildProjectCardMobile({
    id: 'manga',
    title: 'Project Nox · Mangá',
    label: 'EXTENSÕES · MIHON E FORKS',
    desc: 'Extensões compiladas para Mihon e forks, com foco em fontes PT-BR.',
    reposText: 'Distribuição: Awerkori/extensoes · Fonte: fonte-extensoes',
    buttonText: 'Acessar Projeto'
  });
  await fs.writeFile(path.join(profileDir, 'card-manga.svg'), mangaD, 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-manga-mobile.svg'), mangaM, 'utf8');
  console.log('  ✓ card-manga.svg & mobile');

  // Card 2: Project Nox · Anime
  const animeD = buildProjectCard({
    id: 'anime',
    title: 'Project Nox · Anime',
    label: 'EXTENSÕES DE ANIME · ANIYOMI E FORKS',
    desc1: 'Extensões compiladas para Aniyomi e forks, com catálogo pronto para streaming contínuo.',
    desc2: 'Reúne o repositório oficial de distribuição e o código-fonte das extensões.',
    reposText: 'Distribuição: Awerkori/anime-extensoes · Código-fonte: Awerkori/anime-fonte-extensoes',
    iconSvg: ANIME_GLYPH,
    buttonText: 'Ver Projeto'
  });
  const animeM = buildProjectCardMobile({
    id: 'anime',
    title: 'Project Nox · Anime',
    label: 'EXTENSÕES · ANIYOMI E FORKS',
    desc: 'Extensões para Aniyomi e forks com catálogo compilado para streaming.',
    reposText: 'Distribuição: anime-extensoes · Fonte: anime-fonte-extensoes',
    buttonText: 'Acessar Projeto'
  });
  await fs.writeFile(path.join(profileDir, 'card-anime.svg'), animeD, 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-anime-mobile.svg'), animeM, 'utf8');
  console.log('  ✓ card-anime.svg & mobile');

  // Card 3: Project Nox · Tickets
  const ticketsD = buildProjectCard({
    id: 'tickets',
    title: 'Project Nox · Tickets',
    label: 'CENTRAL DE PEDIDOS · TRACKER & TICKETS',
    desc1: 'Central para sugerir novas extensões, avisar sobre fontes quebradas e relatar mudanças.',
    desc2: 'Acompanhe a demanda e os pedidos mais votados pela comunidade através do Tracker.',
    reposText: 'Abertura de Tickets: Awerkori/project-nox-requests · Painel: project-nox-tracker',
    iconSvg: TICKETS_GLYPH,
    buttonText: 'Ver Tickets'
  });
  const ticketsM = buildProjectCardMobile({
    id: 'tickets',
    title: 'Project Nox · Tickets',
    label: 'CENTRAL DE PEDIDOS · TRACKER',
    desc: 'Sugestões, reporte de fontes quebradas e votação comunitária no Tracker.',
    reposText: 'Pedidos: project-nox-requests · Painel: project-nox-tracker',
    buttonText: 'Acessar Tickets'
  });
  await fs.writeFile(path.join(profileDir, 'card-tickets.svg'), ticketsD, 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-tickets-mobile.svg'), ticketsM, 'utf8');
  console.log('  ✓ card-tickets.svg & mobile');

  // Secondary Project: Leitor Web
  await fs.writeFile(path.join(profileDir, 'card-site-manga.svg'), buildCardSiteMangaDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-site-manga-mobile.svg'), buildCardSiteMangaMobile(), 'utf8');
  console.log('  ✓ card-site-manga.svg & mobile');

  // Mais sobre mim
  await fs.writeFile(path.join(profileDir, 'card-about.svg'), buildCardAboutDesktop(), 'utf8');
  await fs.writeFile(path.join(profileDir, 'card-about-mobile.svg'), buildCardAboutMobile(), 'utf8');
  console.log('  ✓ card-about.svg & mobile');

  // Divider
  await fs.writeFile(path.join(profileDir, 'divider.svg'), buildDivider(), 'utf8');
  console.log('  ✓ divider.svg');

  console.log('[Art] Todos os assets foram construídos com sucesso!');
}

main().catch(err => {
  console.error('[Art] Erro:', err);
  process.exit(1);
});
