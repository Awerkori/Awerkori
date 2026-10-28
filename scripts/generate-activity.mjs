import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const USERNAME = 'Awerkori';
const TIMEZONE = 'America/Sao_Paulo';

function getToken() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    const out = execSync('gh auth token', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return out.trim();
  } catch {
    return null;
  }
}

function getTodayInBrasilia() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date());
}

async function fetchContributions(token) {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }`;

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Awerkori-Profile-Activity-Generator'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: { login: USERNAME } })
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${json.errors.map(e => e.message).join('; ')}`);
  }

  return json.data.user.contributionsCollection.contributionCalendar;
}

const PT_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function formatDateShort(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} ${PT_MONTHS[m - 1]} ${y}`;
}

function formatDateISO(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function getBarColor(count) {
  if (count === 0) return '#201833';
  if (count < 10) return 'url(#violetLow)';
  if (count < 35) return 'url(#violetMid)';
  if (count < 85) return 'url(#violetHigh)';
  return 'url(#goldPeak)';
}

function alignDaysToToday(calendar) {
  const allDays = calendar.weeks.flatMap(w => w.contributionDays);
  const todayBR = getTodayInBrasilia();

  // Ensure the list includes todayBR
  const hasToday = allDays.some(d => d.date === todayBR);
  if (!hasToday && allDays.length > 0) {
    const lastDate = allDays[allDays.length - 1].date;
    if (todayBR > lastDate) {
      // Midnight just crossed in Brasilia; add today with 0 pending API refresh
      const lastWeekday = allDays[allDays.length - 1].weekday;
      allDays.push({
        date: todayBR,
        contributionCount: 0,
        weekday: (lastWeekday + 1) % 7
      });
    }
  }

  return { allDays, todayBR };
}

function renderDesktopSvg(calendar, trailingDays) {
  const { allDays, todayBR } = alignDaysToToday(calendar);
  const slice = allDays.slice(-trailingDays);
  const totalYear = calendar.totalContributions;
  const maxDay = slice.reduce((max, d) => (d.contributionCount > max.contributionCount ? d : max), slice[0]);
  const sliceTotal = slice.reduce((sum, d) => sum + d.contributionCount, 0);

  const startDate = formatDateShort(slice[0].date);
  const endDate = formatDateShort(slice[slice.length - 1].date);

  const chartX = 28;
  const chartW = 790;
  const barCount = slice.length;
  const slotW = chartW / barCount;
  const barW = Math.max(4, slotW - 3.8);
  const baseY = 168;
  const maxBarH = 78;
  const peakVal = Math.max(1, maxDay.contributionCount);

  const barsMarkup = slice.map((day, i) => {
    const x = (chartX + i * slotW).toFixed(2);
    const count = day.contributionCount;
    let h = 3.5;
    if (count > 0) {
      const norm = Math.pow(count / peakVal, 0.6);
      h = Math.min(maxBarH, Math.max(8, 8 + norm * (maxBarH - 8)));
    }
    const y = (baseY - h).toFixed(2);
    const color = getBarColor(count);
    const isToday = day.date === todayBR;
    const isPeak = count === peakVal && count > 0;

    let marker = '';
    if (isToday) {
      marker = `
        <circle cx="${(Number(x) + barW / 2).toFixed(2)}" cy="${(baseY - h - 7).toFixed(2)}" r="2.8" fill="#fef08a" class="pulse-dot"/>
        <circle cx="${(Number(x) + barW / 2).toFixed(2)}" cy="${(baseY - h - 7).toFixed(2)}" r="6" fill="none" stroke="#fbbf24" stroke-width="1.2" class="pulse-ring"/>
      `;
    }

    return `
      <g>
        <title>${formatDateISO(day.date)}: ${count} contribuiç${count === 1 ? 'ão' : 'ões'}${isToday ? ' (Hoje)' : ''}${isPeak ? ' · Pico do período' : ''}</title>
        <rect x="${x}" y="${y}" width="${barW.toFixed(2)}" height="${h.toFixed(2)}" rx="2" fill="${color}" ${count >= 85 ? 'filter="url(#glowGold)"' : ''}/>
        ${marker}
      </g>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="846" height="228" viewBox="0 0 846 228" role="img" aria-labelledby="actTitle actDesc">
  <title id="actTitle">Atividade no GitHub — ${totalYear.toLocaleString('pt-BR')} contribuições</title>
  <desc id="actDesc">${sliceTotal.toLocaleString('pt-BR')} contribuições nas últimas ${Math.round(barCount / 7)} semanas (${startDate} a ${endDate}). Atualização periódica automática.</desc>
  <defs>
    <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a17"/>
      <stop offset="50%" stop-color="#140d22"/>
      <stop offset="100%" stop-color="#0a0712"/>
    </linearGradient>
    <radialGradient id="nebulaAura" cx="80%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.22"/>
      <stop offset="50%" stop-color="#4c1d95" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0e0a17" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="goldAmbient" cx="20%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0e0a17" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="violetLow" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="violetMid" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#6b21a8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="violetHigh" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <linearGradient id="goldPeak" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>

    <linearGradient id="goldText" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>

    <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .label-badge {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      fill: #c4b5fd;
    }
    .big-num {
      font-family: "Cinzel", Georgia, "Times New Roman", serif;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: url(#goldText);
    }
    .stat-sub {
      font-size: 13px;
      font-weight: 500;
      fill: #a78bfa;
    }
    .meta-text {
      font-size: 11px;
      fill: #8b859e;
    }
    .gold-highlight {
      fill: #fbbf24;
      font-weight: 600;
    }
    .pulse-dot {
      animation: liveDot 2.4s ease-in-out infinite;
      transform-origin: center;
    }
    .pulse-ring {
      animation: liveRing 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
      transform-origin: center;
    }
    .nebula-breath {
      animation: nebulaPulse 12s ease-in-out infinite alternate;
    }
    .shimmer-axis {
      animation: axisSweep 8s linear infinite;
    }
    @keyframes liveDot {
      0%, 100% { transform: scale(1); opacity: 0.95; }
      50% { transform: scale(1.3); opacity: 0.6; }
    }
    @keyframes liveRing {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes nebulaPulse {
      0% { opacity: 0.25; }
      100% { opacity: 0.65; }
    }
    @keyframes axisSweep {
      0% { stroke-dashoffset: 800; }
      100% { stroke-dashoffset: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .pulse-dot, .pulse-ring, .nebula-breath, .shimmer-axis {
        animation: none !important;
      }
    }
  </style>

  <rect x="0.5" y="0.5" width="845" height="227" rx="14" fill="url(#cardBg)" stroke="#372353" stroke-width="1"/>
  <rect x="1" y="1" width="844" height="226" rx="13" fill="url(#nebulaAura)" class="nebula-breath"/>
  <rect x="1" y="1" width="844" height="226" rx="13" fill="url(#goldAmbient)"/>

  <!-- Card Header -->
  <g transform="translate(28, 26)">
    <circle cx="4" cy="4" r="3" fill="#fbbf24"/>
    <text x="14" y="8" class="label-badge">ATIVIDADE NO GITHUB · ATUALIZAÇÃO AUTOMÁTICA</text>
    
    <text x="0" y="44" class="big-num">${totalYear.toLocaleString('pt-BR')}</text>
    <text x="${(totalYear.toString().length * 20 + 26)}" y="40" class="stat-sub">contribuições no último ano</text>

    <!-- Right Header Meta -->
    <text x="790" y="14" class="meta-text" text-anchor="end">${Math.round(barCount / 7)} semanas recentes (${startDate} – ${endDate})</text>
    <text x="790" y="38" class="meta-text" text-anchor="end">Pico do período: <tspan class="gold-highlight">${maxDay.contributionCount} contribuições</tspan> (${formatDateISO(maxDay.date)})</text>
  </g>

  <!-- Guides & Baseline -->
  <line x1="28" y1="92" x2="818" y2="92" stroke="#251c38" stroke-width="0.8" stroke-dasharray="3 4"/>
  <line x1="28" y1="130" x2="818" y2="130" stroke="#251c38" stroke-width="0.8" stroke-dasharray="3 4"/>
  <line x1="28" y1="${baseY + 1}" x2="818" y2="${baseY + 1}" stroke="#34254f" stroke-width="1"/>
  <line x1="28" y1="${baseY + 1}" x2="818" y2="${baseY + 1}" stroke="url(#goldText)" stroke-width="1" stroke-dasharray="60 740" class="shimmer-axis" opacity="0.6"/>

  <!-- Contribution Bars -->
  ${barsMarkup}

  <!-- Footer / Legend -->
  <g transform="translate(28, 204)">
    <text x="0" y="0" class="meta-text">${startDate}</text>
    <text x="790" y="0" class="meta-text gold-highlight" text-anchor="end">Hoje · ${endDate}</text>

    <!-- Legend -->
    <g transform="translate(320, -8)">
      <text x="-8" y="7" class="meta-text" text-anchor="end" font-size="10">Menos</text>
      <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#201833"/>
      <rect x="12" y="0" width="8" height="8" rx="1.5" fill="url(#violetLow)"/>
      <rect x="24" y="0" width="8" height="8" rx="1.5" fill="url(#violetMid)"/>
      <rect x="36" y="0" width="8" height="8" rx="1.5" fill="url(#violetHigh)"/>
      <rect x="48" y="0" width="8" height="8" rx="1.5" fill="url(#goldPeak)"/>
      <text x="64" y="7" class="meta-text gold-highlight" font-size="10">Mais</text>
    </g>
  </g>
</svg>
`;
}

function renderMobileSvg(calendar, trailingDays) {
  const { allDays, todayBR } = alignDaysToToday(calendar);
  const slice = allDays.slice(-trailingDays);
  const totalYear = calendar.totalContributions;
  const maxDay = slice.reduce((max, d) => (d.contributionCount > max.contributionCount ? d : max), slice[0]);

  const startDate = formatDateShort(slice[0].date);
  const endDate = formatDateShort(slice[slice.length - 1].date);

  const chartX = 18;
  const chartW = 384;
  const barCount = slice.length;
  const slotW = chartW / barCount;
  const barW = Math.max(3.8, slotW - 3);
  const baseY = 160;
  const maxBarH = 68;
  const peakVal = Math.max(1, maxDay.contributionCount);

  const barsMarkup = slice.map((day, i) => {
    const x = (chartX + i * slotW).toFixed(2);
    const count = day.contributionCount;
    let h = 3.5;
    if (count > 0) {
      const norm = Math.pow(count / peakVal, 0.6);
      h = Math.min(maxBarH, Math.max(7, 7 + norm * (maxBarH - 7)));
    }
    const y = (baseY - h).toFixed(2);
    const color = getBarColor(count);
    const isToday = day.date === todayBR;

    let marker = '';
    if (isToday) {
      marker = `
        <circle cx="${(Number(x) + barW / 2).toFixed(2)}" cy="${(baseY - h - 6).toFixed(2)}" r="2.4" fill="#fef08a" class="pulse-dot"/>
        <circle cx="${(Number(x) + barW / 2).toFixed(2)}" cy="${(baseY - h - 6).toFixed(2)}" r="5" fill="none" stroke="#fbbf24" stroke-width="1.2" class="pulse-ring"/>
      `;
    }

    return `
      <g>
        <title>${formatDateISO(day.date)}: ${count} contribuições</title>
        <rect x="${x}" y="${y}" width="${barW.toFixed(2)}" height="${h.toFixed(2)}" rx="1.8" fill="${color}" ${count >= 85 ? 'filter="url(#glowGoldM)"' : ''}/>
        ${marker}
      </g>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="220" viewBox="0 0 420 220" role="img" aria-labelledby="actMobileTitle">
  <title id="actMobileTitle">Atividade no GitHub — ${totalYear.toLocaleString('pt-BR')} contribuições</title>
  <defs>
    <linearGradient id="cardBgM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e0a17"/>
      <stop offset="50%" stop-color="#140d22"/>
      <stop offset="100%" stop-color="#0a0712"/>
    </linearGradient>
    <radialGradient id="nebulaAuraM" cx="80%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0e0a17" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="violetLow" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="violetMid" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#6b21a8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="violetHigh" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <linearGradient id="goldPeak" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <linearGradient id="goldTextM" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="glowGoldM" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    text {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .label-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.8px;
      fill: #c4b5fd;
    }
    .big-num {
      font-family: "Cinzel", Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      fill: url(#goldTextM);
    }
    .stat-sub {
      font-size: 11px;
      fill: #a78bfa;
    }
    .meta-text {
      font-size: 9.5px;
      fill: #8b859e;
    }
    .gold-highlight {
      fill: #fbbf24;
      font-weight: 600;
    }
    .pulse-dot {
      animation: liveDot 2.4s ease-in-out infinite;
      transform-origin: center;
    }
    .pulse-ring {
      animation: liveRing 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
      transform-origin: center;
    }
    @keyframes liveDot {
      0%, 100% { transform: scale(1); opacity: 0.95; }
      50% { transform: scale(1.3); opacity: 0.6; }
    }
    @keyframes liveRing {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .pulse-dot, .pulse-ring { animation: none !important; }
    }
  </style>

  <rect x="0.5" y="0.5" width="419" height="219" rx="12" fill="url(#cardBgM)" stroke="#372353" stroke-width="1"/>
  <rect x="1" y="1" width="418" height="218" rx="11" fill="url(#nebulaAuraM)"/>

  <g transform="translate(18, 22)">
    <circle cx="3" cy="3" r="2.5" fill="#fbbf24"/>
    <text x="11" y="6" class="label-badge">ATIVIDADE NO GITHUB</text>
    
    <text x="0" y="36" class="big-num">${totalYear.toLocaleString('pt-BR')}</text>
    <text x="${(totalYear.toString().length * 17 + 16)}" y="32" class="stat-sub">no último ano</text>

    <text x="384" y="6" class="meta-text" text-anchor="end">${Math.round(barCount / 7)} semanas</text>
    <text x="384" y="32" class="meta-text" text-anchor="end">Pico: <tspan class="gold-highlight">${maxDay.contributionCount}</tspan></text>
  </g>

  <line x1="18" y1="${baseY + 1}" x2="402" y2="${baseY + 1}" stroke="#34254f" stroke-width="1"/>

  ${barsMarkup}

  <g transform="translate(18, 196)">
    <text x="0" y="0" class="meta-text">${startDate}</text>
    <text x="384" y="0" class="meta-text gold-highlight" text-anchor="end">Hoje · ${endDate}</text>
  </g>
</svg>
`;
}

async function main() {
  const token = getToken();
  console.log(`[Activity] Buscando contribuições para ${USERNAME} (Fuso: ${TIMEZONE})...`);
  const calendar = await fetchContributions(token);
  console.log(`[Activity] Total de contribuições no ano móvel: ${calendar.totalContributions}`);

  const profileDir = path.join(rootDir, 'assets', 'profile');
  await fs.mkdir(profileDir, { recursive: true });

  const desktopSvg = renderDesktopSvg(calendar, 63);
  await fs.writeFile(path.join(profileDir, 'activity.svg'), desktopSvg, 'utf8');
  console.log('[Activity] Gerado assets/profile/activity.svg (Desktop 846px)');

  const mobileSvg = renderMobileSvg(calendar, 35);
  await fs.writeFile(path.join(profileDir, 'activity-mobile.svg'), mobileSvg, 'utf8');
  console.log('[Activity] Gerado assets/profile/activity-mobile.svg (Mobile 420px)');

  const { allDays, todayBR } = alignDaysToToday(calendar);
  const dataPayload = {
    updatedAt: new Date().toISOString(),
    todayBrasilia: todayBR,
    timezone: TIMEZONE,
    user: USERNAME,
    totalYear: calendar.totalContributions,
    recentTotal63: allDays.slice(-63).reduce((sum, d) => sum + d.contributionCount, 0),
    days: allDays
  };
  await fs.writeFile(path.join(profileDir, 'activity.json'), JSON.stringify(dataPayload, null, 2) + '\n', 'utf8');
  console.log('[Activity] Gerado assets/profile/activity.json');

  console.log('[Activity] Concluído com sucesso.');
}

main().catch(err => {
  console.error('[Activity] Erro:', err);
  process.exit(1);
});
