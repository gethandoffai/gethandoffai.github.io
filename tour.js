// Guided steps and buy buttons for the demo pages.
// A demo sets window.HANDOFF_DEMO = { id, bar, bands, steps } and loads this file.
// Step: { el, title, body, wait, enter }. el is highlighted, wait is what they should tap, enter runs on arrival.
(() => {
const D = window.HANDOFF_DEMO;
if (!D) return;
const GET = `/get/?from=${D.id}`;
const BOOK = 'https://calendar.app.google/x9bPju4vi61FBud66';
const SEEN = `handoff-tour-${D.id}`;
const remember = () => { try { localStorage.setItem(SEEN, '1'); } catch (e) {} };
const seen = () => { try { return localStorage.getItem(SEEN) === '1'; } catch (e) { return false; } };

document.head.insertAdjacentHTML('beforeend', `<style>
#hx-spot{position:fixed;z-index:50;pointer-events:none;border-radius:16px;box-shadow:0 0 0 3px #4f7bff,0 0 0 100vmax rgba(14,17,26,.42)}
#hx-coach{position:fixed;z-index:60;right:24px;bottom:24px;width:340px;background:#1b1b1b;color:#fff;border-radius:18px;padding:16px 18px;box-shadow:0 18px 50px #0006;font:14px/1.45 'IBM Plex Sans',system-ui,sans-serif}
#hx-coach .hx-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}
#hx-coach .hx-n{font:600 11px 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#a9c0ff}
#hx-coach .hx-x{margin-left:auto;background:none;border:0;color:#9aa1ad;font-size:20px;line-height:1;padding:2px 4px;cursor:pointer}
#hx-coach .hx-bar{height:3px;background:#ffffff22;border-radius:3px;overflow:hidden;margin-bottom:12px}
#hx-coach .hx-bar i{display:block;height:100%;background:#4f7bff;transition:width .25s}
#hx-coach h3{margin:0 0 4px;font:700 18px/1.2 'Outfit',system-ui,sans-serif}
#hx-coach p{margin:0;color:#d5d8df}
#hx-coach .hx-act{display:flex;align-items:center;gap:8px;margin-top:14px}
#hx-coach button,#hx-coach a.hx-go{font:600 14px 'IBM Plex Sans',system-ui,sans-serif;border-radius:10px;padding:10px 14px;border:0;cursor:pointer;text-decoration:none}
#hx-coach .hx-back{background:none;color:#c9cdd6;padding-left:0}
#hx-coach .hx-go{margin-left:auto;background:#4f7bff;color:#fff}
#hx-coach .hx-more{display:block;background:none;color:#c9cdd6;font-weight:500;font-size:13px;padding:10px 0 0;margin:0 auto}
.hx-pulse{animation:hxp 1.3s ease-in-out infinite;position:relative;z-index:51}
@keyframes hxp{0%,100%{box-shadow:0 0 0 0 #4f7bffaa}50%{box-shadow:0 0 0 9px #4f7bff00}}
body.hx-on .toast{z-index:70;top:16px;bottom:auto}
#hx-bar{position:fixed;z-index:40;right:24px;bottom:24px;display:flex;align-items:center;gap:8px;background:#1b1b1b;color:#fff;border-radius:16px;padding:10px 10px 10px 16px;box-shadow:0 14px 40px #0005;font:600 14px 'IBM Plex Sans',system-ui,sans-serif}
#hx-bar a,#hx-bar button{font:600 13px 'IBM Plex Sans',system-ui,sans-serif;border-radius:10px;padding:9px 12px;text-decoration:none;white-space:nowrap;border:0;cursor:pointer}
.hx-get{background:#4f7bff;color:#fff!important}
.hx-book{background:#ffffff1c;color:#fff!important}
#hx-bar .hx-re{background:none;color:#9aa1ad;padding:9px 4px}
.hx-band{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:#eef2ff;border:1px solid #d6e0ff;border-radius:16px;padding:14px 18px;font-weight:500}
.hx-band span{flex:1 1 240px;min-width:0}
.hx-band a{background:#4f7bff;color:#fff;text-decoration:none;font-weight:600;border-radius:10px;padding:9px 13px;white-space:nowrap}
nav a.hx-navget{justify-content:center;background:#4f7bff;color:#fff;font-weight:600;margin-top:14px}
.cta .hx-acts{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.cta .hx-acts a{margin-left:0}
.cta .hx-acts a.hx-book{background:#ffffff1c}
@media (max-width:900px){
  #hx-coach{left:max(12px,env(safe-area-inset-left,0px));right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));width:auto;padding:14px 16px}
  #hx-coach h3{font-size:17px}
  #hx-coach p{font-size:13.5px}
  #hx-bar{left:max(12px,env(safe-area-inset-left,0px));right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));padding:8px}
  #hx-bar>span{display:none}
  #hx-bar .hx-get{flex:1;text-align:center}
  nav a.hx-navget{display:none}
  body{padding-bottom:84px}
}
</style>`);

// Buy buttons that are always on the page
const nav = document.querySelector('nav .me');
if (nav) nav.insertAdjacentHTML('beforebegin', `<a class="hx-navget" href="${GET}">Get one built</a>`);
(D.bands || []).forEach(([after, text]) => {
  const el = document.querySelector(after);
  if (el) el.insertAdjacentHTML('afterend', `<div class="hx-band"><span>${text}</span><a href="${GET}">Get one built</a></div>`);
});

const bar = document.createElement('div');
bar.id = 'hx-bar';
bar.hidden = true;
bar.innerHTML = `<span>${D.bar || 'Want this for your business?'}</span><a class="hx-get" href="${GET}">Get one built</a><a class="hx-book" href="${BOOK}" target="_blank" rel="noopener">Book a call</a><button class="hx-re" aria-label="Show the steps again">↺ Steps</button>`;
document.body.append(bar);

// The guided steps
const spot = document.createElement('div');
spot.id = 'hx-spot';
spot.hidden = true;
const coach = document.createElement('div');
coach.id = 'hx-coach';
coach.hidden = true;
document.body.append(spot, coach);

let at = -1, loop = 0, waitT = 0;
const step = () => D.steps[at];
const clearPulse = () => document.querySelectorAll('.hx-pulse').forEach(el => el.classList.remove('hx-pulse'));

function place(){
  const s = step();
  if (!s) return;
  const el = document.querySelector(s.el);
  if (el) {
    const r = el.getBoundingClientRect(), pad = 6;
    spot.style.top = r.top - pad + 'px';
    spot.style.left = Math.max(2, r.left - pad) + 'px';
    spot.style.width = Math.min(innerWidth - 4, r.width + pad * 2) + 'px';
    spot.style.height = r.height + pad * 2 + 'px';
  }
  if (s.wait) { const w = document.querySelector(s.wait); if (w && !w.classList.contains('hx-pulse') && !w.classList.contains('ok')) w.classList.add('hx-pulse'); }
  loop = requestAnimationFrame(place);
}

// Puts the highlighted part where the coach card isn't covering it
function bringIntoView(el, s){
  const r = el.getBoundingClientRect(), covered = innerWidth <= 900 ? coach.offsetHeight + 24 : 0;
  const room = innerHeight - covered - 24;
  let top = r.top + scrollY - 16;
  if (r.height < room) top = r.top + scrollY - (room - r.height) / 2 - 8;
  else if (s.wait) top = r.bottom + scrollY - room - 8;
  scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function show(i){
  clearTimeout(waitT);
  clearPulse();
  at = i;
  const s = step(), last = i === D.steps.length - 1;
  if (s.enter) s.enter();
  coach.innerHTML = `<div class="hx-top"><span class="hx-n">Step ${i + 1} of ${D.steps.length}</span><button class="hx-x" aria-label="Close the steps">×</button></div>
    <div class="hx-bar"><i style="width:${(i + 1) / D.steps.length * 100}%"></i></div>
    <h3>${s.title}</h3><p>${s.body}</p>
    <div class="hx-act">${i ? '<button class="hx-back">Back</button>' : ''}${last ? `<a class="hx-go" href="${GET}">Get one built →</a>` : `<button class="hx-go hx-next">${i ? 'Next' : 'Show me'} →</button>`}</div>
    ${last ? '<button class="hx-more">Keep clicking around</button>' : ''}`;
  coach.hidden = spot.hidden = false;
  bar.hidden = true;
  document.body.classList.add('hx-on');
  const el = document.querySelector(s.el);
  if (el) bringIntoView(el, s);
  cancelAnimationFrame(loop);
  place();
}

function end(){
  clearTimeout(waitT);
  clearPulse();
  cancelAnimationFrame(loop);
  at = -1;
  coach.hidden = spot.hidden = true;
  bar.hidden = false;
  document.body.classList.remove('hx-on');
  remember();
}

document.addEventListener('click', e => {
  if (e.target.closest('.hx-re')) return show(0);
  if (e.target.closest('.hx-x') || e.target.closest('.hx-more')) return end();
  if (e.target.closest('.hx-next')) return show(at + 1);
  if (e.target.closest('.hx-back')) return show(at - 1);
  if (e.target.closest('#hx-coach a.hx-go')) return remember();
  const s = step();
  if (s && s.wait && e.target.closest(s.wait)) { clearPulse(); waitT = setTimeout(() => show(at + 1), s.waitMs || 500); }
});

if (seen()) bar.hidden = false;
else setTimeout(() => show(0), 500);
})();
