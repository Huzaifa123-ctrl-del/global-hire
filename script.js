/* ===== COUNTRIES (ISO code : name) ===== */
const RAW = "AF:Afghanistan,AL:Albania,DZ:Algeria,AD:Andorra,AO:Angola,AG:Antigua & Barbuda,AR:Argentina,AM:Armenia,AU:Australia,AT:Austria,AZ:Azerbaijan,BS:Bahamas,BH:Bahrain,BD:Bangladesh,BB:Barbados,BY:Belarus,BE:Belgium,BZ:Belize,BJ:Benin,BT:Bhutan,BO:Bolivia,BA:Bosnia & Herzegovina,BW:Botswana,BR:Brazil,BN:Brunei,BG:Bulgaria,BF:Burkina Faso,BI:Burundi,KH:Cambodia,CM:Cameroon,CA:Canada,CV:Cape Verde,CF:Central African Rep.,TD:Chad,CL:Chile,CN:China,CO:Colombia,KM:Comoros,CG:Congo,CD:DR Congo,CR:Costa Rica,CI:Côte d'Ivoire,HR:Croatia,CU:Cuba,CY:Cyprus,CZ:Czechia,DK:Denmark,DJ:Djibouti,DM:Dominica,DO:Dominican Rep.,EC:Ecuador,EG:Egypt,SV:El Salvador,GQ:Equatorial Guinea,ER:Eritrea,EE:Estonia,SZ:Eswatini,ET:Ethiopia,FJ:Fiji,FI:Finland,FR:France,GA:Gabon,GM:Gambia,GE:Georgia,DE:Germany,GH:Ghana,GR:Greece,GD:Grenada,GT:Guatemala,GN:Guinea,GW:Guinea-Bissau,GY:Guyana,HT:Haiti,HN:Honduras,HU:Hungary,IS:Iceland,IN:India,ID:Indonesia,IQ:Iraq,IE:Ireland,IT:Italy,JM:Jamaica,JP:Japan,JO:Jordan,KZ:Kazakhstan,KE:Kenya,KI:Kiribati,KW:Kuwait,KG:Kyrgyzstan,LA:Laos,LV:Latvia,LB:Lebanon,LS:Lesotho,LR:Liberia,LY:Libya,LI:Liechtenstein,LT:Lithuania,LU:Luxembourg,MG:Madagascar,MW:Malawi,MY:Malaysia,MV:Maldives,ML:Mali,MT:Malta,MH:Marshall Islands,MR:Mauritania,MU:Mauritius,MX:Mexico,FM:Micronesia,MD:Moldova,MC:Monaco,MN:Mongolia,ME:Montenegro,MA:Morocco,MZ:Mozambique,MM:Myanmar,NA:Namibia,NR:Nauru,NP:Nepal,NL:Netherlands,NZ:New Zealand,NI:Nicaragua,NE:Niger,NG:Nigeria,MK:North Macedonia,NO:Norway,OM:Oman,PK:Pakistan,PW:Palau,PS:Palestine,PA:Panama,PG:Papua New Guinea,PY:Paraguay,PE:Peru,PH:Philippines,PL:Poland,PT:Portugal,QA:Qatar,RO:Romania,RU:Russia,RW:Rwanda,KN:Saint Kitts & Nevis,LC:Saint Lucia,VC:Saint Vincent,WS:Samoa,SM:San Marino,ST:São Tomé & Príncipe,SA:Saudi Arabia,SN:Senegal,RS:Serbia,SC:Seychelles,SL:Sierra Leone,SG:Singapore,SK:Slovakia,SI:Slovenia,SB:Solomon Islands,SO:Somalia,ZA:South Africa,KR:South Korea,SS:South Sudan,ES:Spain,LK:Sri Lanka,SD:Sudan,SR:Suriname,SE:Sweden,CH:Switzerland,SY:Syria,TW:Taiwan,TJ:Tajikistan,TZ:Tanzania,TH:Thailand,TL:Timor-Leste,TG:Togo,TO:Tonga,TT:Trinidad & Tobago,TN:Tunisia,TR:Türkiye,TM:Turkmenistan,TV:Tuvalu,UG:Uganda,UA:Ukraine,AE:United Arab Emirates,GB:United Kingdom,US:United States,UY:Uruguay,UZ:Uzbekistan,VU:Vanuatu,VA:Vatican City,VE:Venezuela,VN:Vietnam,YE:Yemen,ZM:Zambia,ZW:Zimbabwe";

const C = RAW.split(",").map(s => { const i = s.indexOf(":"); return { c: s.slice(0, i), n: s.slice(i + 1) }; });
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

/* ===== FLAG IMAGE (flagcdn.com API) ===== */
const FLAG_API = "https://flagcdn.com";
const flagImg = (code, w = 80, alt = "") =>
  `<img src="${FLAG_API}/w${w}/${code.toLowerCase()}.png" srcset="${FLAG_API}/w${w * 2}/${code.toLowerCase()}.png 2x" alt="${alt} flag" loading="lazy" onerror="this.style.visibility='hidden'">`;

/* ===== FLAG MARQUEE ===== */
const strip = C.slice(0, 40).map(x => `<span>${flagImg(x.c, 40, x.n)}${x.n}</span>`).join("");
$("#mt").innerHTML = strip + strip;

/* ===== COUNTRIES PAGE ===== */
function drawCountries(filter = "") {
  const list = C.filter(x => x.n.toLowerCase().includes(filter.toLowerCase()));
  $("#cg").innerHTML = list.map((x, i) =>
    `<div class="co" style="animation-delay:${Math.min(i, 30) * 25}ms">${flagImg(x.c, 80, x.n)}<b>${x.n}</b><small>Jobs available</small></div>`
  ).join("");
  $("#empty").style.display = list.length ? "none" : "block";
}
drawCountries();
$("#q").oninput = e => drawCountries(e.target.value);

/* ===== JOBS ===== */
const JOBS = [
  ["💻", "IT", "Full Stack Developer", "AE", "Dubai", "AED 15–22k"],
  ["🩺", "Healthcare", "Registered Nurse", "CA", "Toronto", "CAD 5.5–7k"],
  ["🏗️", "Construction", "Site Engineer", "SA", "Riyadh", "SAR 9–14k"],
  ["🍽️", "Hospitality", "Hotel Manager", "GB", "London", "GBP 3.5–5k"],
  ["⚙️", "Engineering", "Mechanical Engineer", "DE", "Berlin", "EUR 4–5.5k"],
  ["🚚", "Logistics", "Supply Chain Lead", "QA", "Doha", "QAR 12–18k"],
  ["📊", "IT", "Data Analyst", "AU", "Sydney", "AUD 6–8k"],
  ["🧑‍🍳", "Hospitality", "Head Chef", "JP", "Tokyo", "JPY 450–600k"]
];
const cats = ["All", ...new Set(JOBS.map(j => j[1]))];
$("#chips").innerHTML = cats.map((c, i) => `<button class="chip${i ? "" : " on"}">${c}</button>`).join("");

function drawJobs(cat) {
  $("#jg").innerHTML = JOBS.filter(j => cat === "All" || j[1] === cat).map((j, i) =>
    `<div class="cd job tilt" style="animation-delay:${i * 70}ms">
       <div class="jt">${flagImg(j[3], 80, j[4])}<span class="pill">${j[1]}</span></div>
       <h3>${j[0]} ${j[2]}</h3><p>📍 ${j[4]}</p><div class="sal">${j[5]} / month</div>
     </div>`).join("");
  bindTilt();
}
$("#chips").onclick = e => {
  if (!e.target.classList.contains("chip")) return;
  $$(".chip").forEach(c => c.classList.remove("on"));
  e.target.classList.add("on");
  drawJobs(e.target.textContent);
};

/* ===== 3D TILT ===== */
function bindTilt() {
  $$(".tilt").forEach(el => {
    el.onmousemove = e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    };
    el.onmouseleave = () => el.style.transform = "";
  });
}
drawJobs("All");

/* ===== TYPING EFFECT ===== */
const words = ["in Dubai.", "in Canada.", "in Germany.", "in the UK.", "in Australia."];
let wi = 0, ci = 0, del = false;
(function type() {
  const w = words[wi];
  $("#ty").textContent = w.slice(0, ci);
  if (!del && ci === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 45 : 95);
})();

/* ===== COUNTERS + SCROLL REVEAL ===== */
function count(el) {
  const t = +el.dataset.n, p = el.dataset.p || "", s = performance.now();
  (function f(n) {
    const k = Math.min((n - s) / 1800, 1), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.floor(t * e).toLocaleString() + (k === 1 ? p : "");
    if (k < 1) requestAnimationFrame(f);
  })(s);
}
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-n]").forEach(count);
    io.unobserve(e.target);
  }
}), { threshold: .15 });
$$(".rv").forEach(el => io.observe(el));

/* ===== PAGE ROUTING (Home / Countries) ===== */
function route() {
  const h = location.hash.slice(1) || "home", isC = h === "countries";
  $("#v-home").classList.toggle("on", !isC);
  $("#v-countries").classList.toggle("on", isC);
  $$(".links a").forEach(a => a.classList.toggle("on", a.dataset.r === h));
  $("#links").classList.remove("open");
  if (isC) {
    window.scrollTo(0, 0);
    const total = C.length, s = performance.now();
    (function f(x) {
      const k = Math.min((x - s) / 1600, 1);
      $("#cc").textContent = Math.floor(total * k);
      if (k < 1) requestAnimationFrame(f);
    })(s);
  } else {
    const el = document.getElementById(h);
    setTimeout(() => el && el.scrollIntoView({ behavior: "smooth" }), 50);
  }
}
addEventListener("hashchange", route);
route();

/* ===== UI HELPERS ===== */
$("#burger").onclick = () => $("#links").classList.toggle("open");
$("#tg").onclick = () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
};
$("#form").onsubmit = e => { e.preventDefault(); e.target.querySelector("button").textContent = "✓ Request Sent!"; };
addEventListener("scroll", () => {
  const s = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  $("#bar").style.width = (s / h * 100) + "%";
  $("#nav").classList.toggle("sc", s > 20);
}, { passive: true });
addEventListener("mousemove", e => { const g = $("#glow"); g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px"; });
