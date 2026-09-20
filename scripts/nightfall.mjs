import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../assets/branding/', import.meta.url);
const logo = (await readFile(new URL('nox-official.webp', root))).toString('base64');
for (const [name, mobile] of [
  ['nightfall.svg', false],
  ['nightfall-mobile.svg', true],
  ['nightfall-still.svg', false],
  ['nightfall-mobile-still.svg', true],
]) {
  const still = name.includes('-still');
  const bitmap = (await readFile(new URL(mobile ? 'nightfall-mobile.webp' : 'nightfall.webp', root))).toString('base64');
  const width = mobile ? 1000 : 1774;
  const height = mobile ? 1000 : 887;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
<title id="title">Awerkori — Project Nox · NΩΛ</title>
<desc id="description">Vale noturno em grafite, montanhas gravadas e um rio refletindo o horizonte violeta. A luz do horizonte respira lentamente.</desc>
<defs><radialGradient id="horizon"><stop stop-color="#c3a1e4" stop-opacity=".8"/><stop offset=".6" stop-color="#a987cc" stop-opacity=".24"/><stop offset="1" stop-color="#a987cc" stop-opacity="0"/></radialGradient></defs>
<image width="${width}" height="${height}" href="data:image/webp;base64,${bitmap}"/>
<image x="${mobile ? 430 : 817}" y="${mobile ? 42 : 40}" width="140" height="140" href="data:image/webp;base64,${logo}"/>
<g class="light" opacity=".08"><ellipse cx="${mobile ? 660 : 1130}" cy="${mobile ? 355 : 325}" rx="${mobile ? 230 : 295}" ry="90" fill="url(#horizon)"/></g>
${still ? '' : '<style>.light{animation:night 24s ease-in-out infinite}@keyframes night{0%,100%{opacity:.04}50%{opacity:.22}}@media(prefers-reduced-motion:reduce){.light{animation:none;opacity:.08}}</style>'}
</svg>\n`;
  const output = new URL(name, root);
  await writeFile(output, svg);
  console.log(fileURLToPath(output));
}
