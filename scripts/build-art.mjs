// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Awerkori & Project Nox Contributors

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
// 1. HERO DESKTOP (846 x 276) — PRESERVED INTACT
// ==========================================
function buildHeroDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="276" viewBox="0 0 846 276" role="img" aria-labelledby="heroTitle heroDesc">
  <title id="heroTitle">Awerkori · Project Nox — Identidade Oficial</title>
  <desc id="heroDesc">Identidade visual oficial de Awerkori, fundador e desenvolvedor principal do Project Nox, com emblema oficial, animação orbital e atmosfera cósmica em roxo e dourado.</desc>

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
      <rect x="0.5" y="0.5" width="845" height="275" rx="14" fill="#ffffff"/>
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
      font-size: 17.5px;
      font-weight: 400;
      fill: #d4c6f7;
      letter-spacing: 0.1px;
    }
    .pill-label {
      font-size: 12px;
      font-weight: 600;
      fill: #fef08a;
      letter-spacing: 0.3px;
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
      transform-origin: 110px 138px;
    }
    .orbit-cw {
      animation: spinCW 32s linear infinite;
      transform-origin: 110px 138px;
    }
    .orbit-ccw {
      animation: spinCCW 24s linear infinite;
      transform-origin: 110px 138px;
    }
    .satellite {
      animation: spinCW 18s linear infinite;
      transform-origin: 110px 138px;
    }
    .satellite-sub {
      animation: spinCCW 28s linear infinite;
      transform-origin: 110px 138px;
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
  <rect x="0.5" y="0.5" width="845" height="275" rx="14" fill="url(#heroBg)" stroke="#382156" stroke-width="1"/>
  <rect x="1" y="1" width="844" height="274" rx="13" fill="url(#ambientRight)"/>

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
    <circle cx="110" cy="138" r="95" fill="url(#symbolNebula)" class="aurora-pulse"/>
    <circle cx="110" cy="138" r="65" fill="url(#goldCoreGlow)" class="aurora-pulse"/>

    <!-- Outer Orbit Ring -->
    <circle cx="110" cy="138" r="74" fill="none" stroke="url(#orbitStroke)" stroke-width="1.2" stroke-dasharray="14 10 3 10" class="orbit-cw"/>
    <!-- Inner Orbit Ring -->
    <circle cx="110" cy="138" r="62" fill="none" stroke="#a855f7" stroke-width="0.8" stroke-dasharray="6 8" opacity="0.6" class="orbit-ccw"/>

    <!-- Orbital Satellite Node 1 (Golden Planet) -->
    <g class="satellite">
      <circle cx="110" cy="64" r="3.2" fill="#fef08a" filter="url(#goldGlow)"/>
      <circle cx="110" cy="64" r="1.4" fill="#ffffff"/>
    </g>
    <!-- Orbital Satellite Node 2 (Violet Planet) -->
    <g class="satellite-sub">
      <circle cx="110" cy="200" r="2.4" fill="#d946ef" filter="url(#softGlow)"/>
    </g>

    <!-- Official Emblem WebP (Golden Omega with Alpha inside) -->
    <image href="${officialDataUri}" x="52" y="80" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Center and Right: Typography and Brand -->
  <g transform="translate(216, 0)">
    <!-- Top Monogram and Tracker -->
    <g transform="translate(0, 50)">
      <text x="0" y="0" class="badge-tracker"><tspan fill="#fbbf24" filter="url(#softGlow)">✦</tspan><tspan dx="8">AWERKORI</tspan><tspan fill="#8b859e" dx="8">·</tspan><tspan fill="#fbbf24" dx="8">FUNDADOR DO PROJECT NOX</tspan></text>
    </g>

    <!-- Main Title -->
    <text x="0" y="104" class="hero-title">Awerkori</text>

    <!-- Refined Portuguese Tagline -->
    <text x="0" y="138" class="hero-tagline">Desenvolvedor de software, automação e ecossistemas abertos.</text>

    <!-- Refined Feature Badges (596px flush with left axis and right monogram) -->
    <g transform="translate(0, 164)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="170" height="34" rx="8" fill="#1b122c" stroke="#4c277a" stroke-width="1"/>
        <text x="85" y="21.5" class="pill-label" text-anchor="middle"><tspan fill="#fbbf24">✦</tspan><tspan dx="6">Sistemas &amp; Web</tspan></text>
      </g>
      <g transform="translate(184, 0)">
        <rect x="0" y="0" width="236" height="34" rx="8" fill="#1b122c" stroke="#4c277a" stroke-width="1"/>
        <text x="118" y="21.5" class="pill-label" text-anchor="middle"><tspan fill="#fbbf24">✦</tspan><tspan dx="6">Ferramentas &amp; Automação</tspan></text>
      </g>
      <g transform="translate(434, 0)">
        <rect x="0" y="0" width="162" height="34" rx="8" fill="#1b122c" stroke="#4c277a" stroke-width="1"/>
        <text x="81" y="21.5" class="pill-label" text-anchor="middle"><tspan fill="#fbbf24">✦</tspan><tspan dx="6">Código Aberto</tspan></text>
      </g>
    </g>

    <!-- Bottom Decorative Horizon Line -->
    <line x1="0" y1="224" x2="600" y2="224" stroke="#2a1c40" stroke-width="1"/>
    <line x1="0" y1="224" x2="160" y2="224" stroke="url(#goldMetal)" stroke-width="1.2"/>
    <text x="0" y="245" class="meta-edge">✦ ARQUITETURA · FERRAMENTAS · PRODUTOS DIGITAIS ✦</text>
    <text x="596" y="245" class="monogram" text-anchor="end">✦ NOX ✦</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMask)">
    <rect x="0" y="0" width="160" height="276" fill="url(#sweepBeam)" class="sweep-move"/>
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
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="346" viewBox="0 0 420 346" role="img" aria-labelledby="heroMobTitle heroMobDesc">
  <title id="heroMobTitle">Awerkori · Project Nox</title>
  <desc id="heroMobDesc">Awerkori, fundador e desenvolvedor principal do Project Nox — software, automação e ecossistemas abertos.</desc>
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
      <rect x="0.5" y="0.5" width="419" height="345" rx="14" fill="#ffffff"/>
    </mask>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-tracker-m {
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 2.3px;
      fill: #e9d5ff;
    }
    .hero-title-m {
      font-family: "Cinzel", Georgia, serif;
      font-size: 38px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#titleCosmicM);
    }
    .hero-tagline-m {
      font-size: 13.8px;
      font-weight: 400;
      fill: #d4c6f7;
    }
    .pill-label-m {
      font-size: 11px;
      font-weight: 600;
      fill: #fef08a;
      letter-spacing: 0.2px;
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

  <rect x="0.5" y="0.5" width="419" height="345" rx="14" fill="url(#heroBgM)" stroke="#382156" stroke-width="1"/>

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
    <text x="0" y="0" class="badge-tracker-m">✦ FUNDADOR · PROJECT NOX ✦</text>
    <text x="0" y="36" class="hero-title-m">Awerkori</text>
    <text x="0" y="61" class="hero-tagline-m">Software, automação e ecossistemas abertos.</text>

    <!-- Badges Row (Centered 350px group) -->
    <g transform="translate(0, 79)">
      <rect x="-175" y="0" width="168" height="30" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
      <text x="-91" y="19" class="pill-label-m" text-anchor="middle">Sistemas &amp; Web</text>

      <rect x="7" y="0" width="168" height="30" rx="7" fill="#1b122c" stroke="#4c277a" stroke-width="0.9"/>
      <text x="91" y="19" class="pill-label-m" text-anchor="middle">Ferramentas &amp; Automação</text>
    </g>

    <!-- Bottom Line -->
    <line x1="-150" y1="128" x2="150" y2="128" stroke="#2a1c40" stroke-width="1"/>
    <line x1="-35" y1="128" x2="35" y2="128" stroke="url(#goldMetalM)" stroke-width="1.2"/>
    <text x="0" y="150" font-size="10.5" fill="#fbbf24" letter-spacing="3px">✦ NOX ✦</text>
  </g>

  <!-- Masked Light Sweep Beam -->
  <g mask="url(#heroMaskM)">
    <rect x="0" y="0" width="120" height="346" fill="url(#sweepBeamM)" class="sweep-move-m"/>
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
    <text x="0" y="49" class="about-desc">Trajetória, projetos autorais e canais fora do GitHub.</text>
  </g>

  <!-- Right Pill -->
  <g transform="translate(595, 27)">
    <rect x="0" y="0" width="225" height="34" rx="8" fill="#1c1130" stroke="#582a8c" stroke-width="1"/>
    <text x="112.5" y="21.5" class="btn-about-text" text-anchor="middle">Acessar zyo.se/awerkori ↗</text>
  </g>
</svg>
`;
}

function buildAboutMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="108" viewBox="0 0 420 108" role="img" aria-labelledby="aboutMobTitle">
  <title id="aboutMobTitle">Mais sobre mim — Perfil Pessoal</title>
  <defs>
    <linearGradient id="aboutBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a19"/>
      <stop offset="50%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="aboutBorderM" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#3e2063" stop-opacity="0.4"/>
    </linearGradient>
  </defs>

  <style>
    ${COMMON_FONTS}
    .badge-label-m {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: #fbbf24;
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
    .btn-callout-m {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.3px;
      fill: #fef08a;
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="107" rx="12" fill="url(#aboutBgM)" stroke="url(#aboutBorderM)" stroke-width="1"/>
  <path d="M165 1H255" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round"/>

  <g transform="translate(210, 18)" text-anchor="middle">
    <text x="0" y="6" class="badge-label-m" text-anchor="middle">✦ PERFIL PESSOAL ✦</text>
    <text x="0" y="27" class="card-title-m" text-anchor="middle">Mais sobre mim</text>
    <text x="0" y="47" class="card-desc-m" text-anchor="middle">Trajetória, projetos autorais e canais fora do GitHub.</text>

    <g transform="translate(-115, 58)">
      <rect x="0" y="0" width="230" height="24" rx="6" fill="#1b122c" stroke="#5b2d91" stroke-width="0.9"/>
      <text x="115" y="16" class="btn-callout-m" text-anchor="middle">Acessar zyo.se/awerkori ↗</text>
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
    <linearGradient id="divGrad" gradientUnits="userSpaceOnUse" x1="20" y1="5" x2="826" y2="5">
      <stop offset="0%" stop-color="#6b21a8" stop-opacity="0"/>
      <stop offset="25%" stop-color="#7c3aed" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#d97706" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#7c3aed" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#6b21a8" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="20" y="4.5" width="806" height="1" rx="0.5" fill="url(#divGrad)"/>
  <circle cx="423" cy="5" r="2.2" fill="#fbbf24"/>
</svg>
`;
}

// ==========================================
// 10. EDITORIAL INTRO PANEL (DESKTOP: 846 x 140, MOBILE: 420 x 184)
// ==========================================
function buildIntroDesktop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="140" viewBox="0 0 846 140" role="img" aria-labelledby="introTitle introDesc">
  <title id="introTitle">O que construo no Project Nox</title>
  <desc id="introDesc">À frente do Project Nox, desenvolvo um ecossistema independente de software, plataformas e ferramentas digitais, com foco em soluções úteis, código aberto e evolução contínua.</desc>
  <defs>
    <linearGradient id="introBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0818"/>
      <stop offset="55%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="introAccent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <style>
    ${COMMON_FONTS}
    .intro-kicker {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 2.4px;
      fill: #fbbf24;
    }
    .intro-lead {
      font-size: 18px;
      font-weight: 600;
      fill: #ffffff;
      letter-spacing: -0.15px;
    }
    .intro-sub {
      font-size: 14.5px;
      font-weight: 400;
      fill: #d4c6f7;
    }
    .intro-meta {
      font-size: 12px;
      font-weight: 500;
      fill: #9b93b3;
      letter-spacing: 0.2px;
    }
  </style>
  <rect x="0.5" y="0.5" width="845" height="139" rx="12" fill="url(#introBg)" stroke="#331d52" stroke-width="1"/>
  <rect x="24" y="24" width="3" height="92" rx="1.5" fill="url(#introAccent)"/>

  <g transform="translate(44, 38)">
    <text x="0" y="0" class="intro-kicker">✦ EM CONSTRUÇÃO · ECOSSISTEMA</text>
    <text x="0" y="27" class="intro-lead">À frente do Project Nox, desenvolvo um ecossistema independente</text>
    <text x="0" y="51" class="intro-sub">de software, plataformas e ferramentas digitais, com foco em soluções úteis e evolução contínua.</text>
    <text x="0" y="79" class="intro-meta">Código aberto, documentação e lançamentos centralizados em <tspan fill="#fef08a" font-weight="600">github.com/ProjectNox-org</tspan></text>
  </g>
</svg>
`;
}

function buildIntroMobile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="184" viewBox="0 0 420 184" role="img" aria-labelledby="introMobTitle introMobDesc">
  <title id="introMobTitle">O que construo no Project Nox</title>
  <desc id="introMobDesc">À frente do Project Nox, desenvolvo um ecossistema independente de software, plataformas e ferramentas digitais.</desc>
  <defs>
    <linearGradient id="introBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0818"/>
      <stop offset="55%" stop-color="#140c24"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="introRuleM" gradientUnits="userSpaceOnUse" x1="50" y1="144" x2="370" y2="144">
      <stop offset="0%" stop-color="#4c277a" stop-opacity="0"/>
      <stop offset="50%" stop-color="#7c3aed" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#4c277a" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <style>
    ${COMMON_FONTS}
    .intro-kicker-m {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #fbbf24;
    }
    .intro-lead-m {
      font-size: 16px;
      font-weight: 600;
      fill: #ffffff;
      letter-spacing: -0.15px;
    }
    .intro-sub-m {
      font-size: 13px;
      font-weight: 400;
      fill: #d4c6f7;
    }
    .intro-meta-m {
      font-size: 11px;
      font-weight: 500;
      fill: #9b93b3;
    }
  </style>
  <rect x="0.5" y="0.5" width="419" height="183" rx="12" fill="url(#introBgM)" stroke="#331d52" stroke-width="1"/>
  <path d="M165 1H255" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>

  <g transform="translate(210, 31)" text-anchor="middle">
    <text x="0" y="0" class="intro-kicker-m">✦ EM CONSTRUÇÃO · ECOSSISTEMA ✦</text>
    <text x="0" y="27" class="intro-lead-m">À frente do Project Nox, construo</text>
    <text x="0" y="47" class="intro-lead-m">plataformas e ferramentas digitais.</text>
    <text x="0" y="76" class="intro-sub-m">Ecossistema independente de software</text>
    <text x="0" y="95" class="intro-sub-m">útil, código aberto e evolução contínua.</text>
    <rect x="-150" y="112" width="300" height="1" fill="url(#introRuleM)"/>
    <text x="0" y="133" class="intro-meta-m">Repositórios em <tspan fill="#fef08a" font-weight="600">github.com/ProjectNox-org</tspan></text>
  </g>
</svg>
`;
}

// ==========================================
// 11. NAVIGATION TILES (404 x 64 — 2 balanced tiles side-by-side)
// ==========================================
function buildNavTile({ id, title, subtitle, iconSvg, isPrimary = false }) {
  const width = 404;
  const height = 64;
  const bgGrad = isPrimary
    ? `<linearGradient id="${id}Bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1b0f33"/>
        <stop offset="55%" stop-color="#241342"/>
        <stop offset="100%" stop-color="#130a26"/>
      </linearGradient>`
    : `<linearGradient id="${id}Bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#150b29"/>
        <stop offset="55%" stop-color="#1d0f38"/>
        <stop offset="100%" stop-color="#100820"/>
      </linearGradient>`;

  const borderGrad = isPrimary
    ? `<linearGradient id="${id}Border" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#6b21a8" stop-opacity="0.6"/>
      </linearGradient>`
    : `<linearGradient id="${id}Border" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#6b21a8" stop-opacity="0.6"/>
      </linearGradient>`;

  const iconBoxStroke = '#fbbf24';
  const arrowColor = '#fbbf24';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)} — ${escapeXml(subtitle)}">
  <defs>
    ${bgGrad}
    ${borderGrad}
  </defs>
  <style>
    ${COMMON_FONTS}
    .tile-title {
      font-size: 13.5px;
      font-weight: 700;
      fill: #ffffff;
      letter-spacing: 0.15px;
    }
    .tile-sub {
      font-size: 11.5px;
      font-weight: 400;
      fill: #c4b5fd;
    }
  </style>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="10" fill="url(#${id}Bg)" stroke="url(#${id}Border)" stroke-width="1"/>
  <path d="M12 1.5H${width - 12}" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1" stroke-linecap="round"/>

  <!-- Icon Container -->
  <rect x="14" y="14" width="36" height="36" rx="8" fill="#1b1030" stroke="${iconBoxStroke}" stroke-opacity="0.6" stroke-width="0.9"/>
  <g transform="translate(23, 23)">
    ${iconSvg}
  </g>

  <!-- Text -->
  <text x="62" y="29" class="tile-title">${escapeXml(title)}</text>
  <text x="62" y="46" class="tile-sub">${escapeXml(subtitle)}</text>

  <!-- Right Arrow -->
  <g transform="translate(${width - 24}, 27.5)">
    <path d="M0 0l4 4.5-4 4.5" fill="none" stroke="${arrowColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;
}

async function writeNavTiles() {
  await fs.writeFile(path.join(profileDir, 'tile-central.svg'), buildNavTile({
    id: 'tileCentral',
    title: 'Central Oficial',
    subtitle: 'Portal, projetos e visão geral.',
    iconSvg: `<circle cx="9" cy="9" r="7.5" fill="none" stroke="#fbbf24" stroke-width="1.4"/><path d="M9 1.5v15M1.5 9h15M3.5 5.2c1.8 1 3.6 1.4 5.5 1.4s3.7-.4 5.5-1.4M3.5 12.8c1.8-1 3.6-1.4 5.5-1.4s3.7.4 5.5 1.4" fill="none" stroke="#fbbf24" stroke-width="1.1"/>`,
    isPrimary: true
  }));

  await fs.writeFile(path.join(profileDir, 'tile-org.svg'), buildNavTile({
    id: 'tileOrg',
    title: 'Organização GitHub',
    subtitle: 'Repositórios e código-fonte.',
    iconSvg: `<g transform="scale(1.125)"><path fill="#fbbf24" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></g>`,
    isPrimary: false
  }));
}

// ==========================================
// BUILD ALL ASSETS
// ==========================================
async function main() {
  const heroOnly = process.argv.includes('--hero-only');
  const introHeroOnly = process.argv.includes('--intro-hero');
  const tilesOnly = process.argv.includes('--tiles-only');
  const profileOnly = process.argv.includes('--profile-only');
  console.log('Generating Project Nox compact assets...');

  if (tilesOnly) {
    await writeNavTiles();
    console.log('  ✓ 2 nav tiles (tile-central, tile-org)');
    console.log('Done (--tiles-only).');
    return;
  }

  // 1. Hero (Preserved approved)
  await fs.writeFile(path.join(profileDir, 'hero.svg'), buildHeroDesktop());
  await fs.writeFile(path.join(profileDir, 'hero-mobile.svg'), buildHeroMobile());
  console.log('  ✓ hero.svg & hero-mobile.svg');

  if (heroOnly) {
    console.log('Done (--hero-only).');
    return;
  }

  if (introHeroOnly) {
    await fs.writeFile(path.join(profileDir, 'card-intro.svg'), buildIntroDesktop());
    await fs.writeFile(path.join(profileDir, 'card-intro-mobile.svg'), buildIntroMobile());
    console.log('  ✓ card-intro.svg & card-intro-mobile.svg');
    console.log('Done (--intro-hero).');
    return;
  }

  if (profileOnly) {
    await fs.writeFile(path.join(profileDir, 'card-intro.svg'), buildIntroDesktop());
    await fs.writeFile(path.join(profileDir, 'card-intro-mobile.svg'), buildIntroMobile());
    await fs.writeFile(path.join(profileDir, 'card-about.svg'), buildAboutDesktop());
    await fs.writeFile(path.join(profileDir, 'card-about-mobile.svg'), buildAboutMobile());
    await fs.writeFile(path.join(profileDir, 'divider.svg'), buildDivider());
    await writeNavTiles();

    console.log('  ✓ card-intro*, card-about*, divider & 2 nav tiles (tile-central, tile-org)');
    console.log('Done (--profile-only).');
    return;
  }

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
