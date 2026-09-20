import fs from 'node:fs/promises';
import path from 'node:path';

const out = process.argv[2] || '/tmp/nox-concepts';
await fs.mkdir(out, { recursive: true });
const ink = '#e4e1e9';
const text = (x,y,size,value,extra='') => `<text x="${x}" y="${y}" ${extra.includes('font-family=')?'':'font-family="Arial,Helvetica,sans-serif"'} font-size="${size}" ${extra.includes('fill=')?'':`fill="${ink}"`} ${extra}>${value}</text>`;
const line = (x,y,w) => `<path d="M${x} ${y}h${w}" stroke="#303039" stroke-width=".7"/>`;
const mark = 'M0 120V0L88 120V0 M121 120h35v-15C97 75 119 0 180 0S263 75 204 105v15h35 M270 120 320 0l50 120';
function shell(w,h,body,name,staticMode=false){
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">Awerkori × Project Nox — ${name}</title><desc id="desc">Identidade autoral NΩΛ. Grafite, prata e um fio violeta de movimento lento.</desc>
 <defs>
 <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#777381"/><stop offset=".3" stop-color="#ebe7f0"/><stop offset=".53" stop-color="#686372"/><stop offset=".77" stop-color="#b5afc0"/><stop offset="1" stop-color="#39343f"/></linearGradient>
 <linearGradient id="edge"><stop stop-color="#35313f"/><stop offset=".52" stop-color="#9c75d8"/><stop offset="1" stop-color="#332b40"/></linearGradient>
 <linearGradient id="fall"><stop stop-color="#0d1117" stop-opacity="0"/><stop offset="1" stop-color="#0d1117"/></linearGradient>
 <radialGradient id="shade"><stop stop-color="#17171f"/><stop offset="1" stop-color="#0d1117"/></radialGradient>
 <linearGradient id="light"><stop stop-color="white" stop-opacity="0"/><stop offset=".48" stop-color="white" stop-opacity=".75"/><stop offset=".52" stop-color="white" stop-opacity=".75"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
 <mask id="sweep"><rect class="sweep" x="-420" y="-300" width="520" height="1200" fill="url(#light)"/></mask>
 </defs>
 <style>.sweep{animation:pass 22s ease-in-out infinite}.breath{animation:breathe 18s ease-in-out infinite}@keyframes pass{0%,12%{transform:translateX(0)}65%,100%{transform:translateX(1400px)}}@keyframes breathe{0%,100%{opacity:.3}50%{opacity:.85}}@media(prefers-reduced-motion:reduce){.sweep,.breath{animation:none}.sweep{transform:translateX(750px)}}${staticMode?'.sweep,.breath{animation:none}.sweep{transform:translateX(750px)}':''}</style>
 <rect width="${w}" height="${h}" fill="#0d1117"/>${body}</svg>`;
}
function relief(m){
 const w=m?460:900,h=m?470:380;
 let layers='';for(let i=35;i>=0;i--)layers+=`<path d="${mark}" transform="translate(${i*.9},${i*1.35})" fill="none" stroke="${i===0?'url(#silver)':i%6===0?'#3d3649':'#221f2b'}" stroke-width="${i===0?1.2:.6}"/>`;
 const body=`<rect width="${w}" height="${h}" fill="url(#shade)"/>${text(28,36,11,'AWERKORI','letter-spacing="3"')}${text(w-28,36,11,'PROJECT NOX','text-anchor="end" letter-spacing="2"')}<g transform="translate(${m?45:215},${m?154:104}) scale(${m?.9:1.25})">${layers}<path d="${mark}" fill="none" stroke="#ab88e2" stroke-width="2" mask="url(#sweep)"/></g>${line(28,h-48,w-56)}${text(28,h-22,11,'NΩΛ','letter-spacing="4"')}${text(w-28,h-22,10,'código &amp; outras ideias','text-anchor="end" fill="#9a95a4"')}`;
 return shell(w,h,body,'Relevo');
}
function ribbon(cx,cy,scale=1){
 let paths='';
 // A continuous folded strip: a family of curves, not an imported illustration.
 for(let j=0;j<62;j++){
  const s=(j-30.5)/30.5;let d='';
  for(let i=0;i<=190;i++){
   const t=-2.66+i/190*5.32;
   const x=116*Math.sin(t)+s*24*Math.cos(t*1.7);
   const y=-100*Math.cos(t)+s*29*Math.sin(t*1.4)+19*Math.sin(t*2);
   const z=44*Math.sin(t*2.3)+s*12*Math.cos(t);
   const px=cx+scale*(x*.97+z*.57),py=cy+scale*(y*.88-z*.3);
   d+=(i?'L':'M')+px.toFixed(2)+' '+py.toFixed(2);
  }
  paths+=`<path d="${d}" fill="none" stroke="url(#silver)" stroke-width="${j%5===0?.8:.5}" opacity="${j%5===0?.82:.5}"/>`;
 }
 return paths;
}
function filament(m,final=false,staticMode=false){
 const w=m?460:900,h=m?490:380;
 const art=ribbon(m?244:645,m?258:191,m?1.2:1.3);
 const body=`<rect width="${w}" height="${h}" fill="url(#shade)"/>
 ${text(28,37,11,'AWERKORI','letter-spacing="3" fill="#b5afbd"')}
 ${final?'':text(w-28,37,10,'NΩΛ','text-anchor="end" letter-spacing="3"')}
 <g>${art}<g mask="url(#sweep)" style="mix-blend-mode:screen">${art.replaceAll('url(#silver)','#ad82e0')}</g></g>
 ${m?text(28,84,30,'PROJECT NOX','letter-spacing="2"'):text(28,185,38,'PROJECT','letter-spacing="5"')+text(28,237,56,'NOX','letter-spacing="8"')}
 ${line(28,h-47,w-56)}${text(28,h-21,13,'NΩΛ','letter-spacing="5"')}${text(w-28,h-21,10,'por Awerkori','text-anchor="end" fill="#928c9e"')}
 <path d="M28 ${h-47}h30" stroke="#9471c4" stroke-width="1.4"/>`;
 return shell(w,h,body,final?'Fio da noite':'Filamento',staticMode);
}
function editorial(m){
 const w=m?460:900,h=m?470:380;
 const body=`${text(28,36,11,'AWERKORI × PROJECT NOX','letter-spacing="2.5"')}${line(28,60,w-56)}
 ${text(m?20:22,m?248:259,m?144:226,'NOX','font-family="Georgia,serif" font-weight="700" letter-spacing="-13"')}
 <path d="M${m?340:623} 91v${m?260:209}" stroke="url(#edge)" stroke-width="1" class="breath"/>
 ${text(m?30:654,m?337:143,26,'NΩΛ','letter-spacing="4"')}
 ${text(m?30:654,m?369:177,11,'feito por Awerkori','fill="#9d96a8"')}
 ${text(28,h-24,11,'Entre código e imaginação.','fill="#9d96a8"')}`;
 return shell(w,h,body,'Margem');
}
function finalArt(m,staticMode=false){
 const w=m?460:900,h=m?460:360;
 let layers='';
 for(let i=32;i>=0;i--) layers+=`<path d="${mark}" transform="translate(${i*.64},${i*.95})" fill="none" stroke="${i===0?'url(#silver)':i%4===0?'#514558':'#302a39'}" stroke-width="${i===0?1.35:.65}"/>`;
 const body=`<rect width="${w}" height="${h}" fill="url(#shade)"/>
 ${text(28,38,m?15:11,'AWERKORI','letter-spacing="3" fill="#b7b1bf"')}
 <path d="M${w-49} 29h20m-10-10v20" stroke="#9f7ac8" stroke-width=".8"/>
 <g transform="translate(${m?35:405},${m?124:103}) scale(${m?.97:1.13})">${layers}
 <path d="${mark}" fill="none" stroke="#bd99ed" stroke-width="1.4" class="reflex" pathLength="1000"/>
 </g>
 <style>.reflex{stroke-dasharray:90 910;stroke-dashoffset:1000;opacity:.8;animation:trace 24s linear infinite}@keyframes trace{to{stroke-dashoffset:0}}@media(prefers-reduced-motion:reduce){.reflex{animation:none;stroke-dashoffset:600;opacity:.45}}${staticMode?'.reflex{animation:none;stroke-dashoffset:600;opacity:.45}':''}</style>
 ${text(28,m?357:174,m?15:13,'PROJECT','letter-spacing="5" fill="#aaa3b4"')}
 ${text(24,m?418:244,m?67:78,'NOX','font-family="Georgia,Times New Roman,serif" letter-spacing="-3"')}
 ${line(m?192:28,m?412:314,m?w-220:w-56)}
 <path d="M${m?192:28} ${m?412:314}h24" stroke="#8e68b9" stroke-width="1.2"/>
 `;
 return shell(w,h,body,'Relevo noturno',staticMode);
}
for(const mobile of [false,true]){
 const suffix=mobile?'-mobile':'';
 if(!process.argv.includes('--final'))for(const [name,fn] of [['a',relief],['b',filament],['c',editorial]])await fs.writeFile(path.join(out,`${name}${suffix}.svg`),fn(mobile));
 await fs.writeFile(path.join(out,`nox${suffix}.svg`),finalArt(mobile));
 await fs.writeFile(path.join(out,`nox${suffix}-still.svg`),finalArt(mobile,true));
}
