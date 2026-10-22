const CAT=[
{id:"wiki-en-top",n:"Wikipedia English: Top 50k articles",l:"en",t:["general","history","geography","science"],mb:1200,core:1,d:"Most-read articles, a great all-round starter."},
{id:"wiki-en-mini",n:"Wikipedia English: Intros only",l:"en",t:["general","science","history","geography"],mb:350,d:"First paragraph of every article. Tiny and fast."},
{id:"wiki-en-sci",n:"Wikipedia English: Science",l:"en",t:["science","math"],mb:2000,d:"Physics, chemistry, biology, astronomy."},
{id:"phet-en",n:"PhET Interactive Simulations",l:"en",t:["science","math"],mb:90,d:"Hands-on physics and maths simulations."},
{id:"khan-en",n:"Khan Academy Lite",l:"en",t:["math","science"],mb:5000,d:"Video lessons for school maths and science."},
{id:"wikibooks-en",n:"Wikibooks Textbooks",l:"en",t:["math","science","programming"],mb:3000,d:"Free open textbooks."},
{id:"wikem-en",n:"WikEM Emergency Medicine",l:"en",t:["medicine","emergency"],mb:150,core:1,d:"Clinical emergency reference."},
{id:"med-en",n:"Wikipedia English: Medicine",l:"en",t:["medicine"],mb:1800,d:"Diseases, anatomy and treatments."},
{id:"aid-en",n:"First Aid and Disaster Essentials",l:"en",t:["emergency","medicine"],mb:120,core:1,d:"Survival and first-aid guides."},
{id:"mdn-en",n:"MDN Web Docs",l:"en",t:["programming"],mb:120,d:"HTML, CSS and JavaScript reference."},
{id:"py-en",n:"Python Documentation",l:"en",t:["programming"],mb:50,d:"Official Python docs and tutorial."},
{id:"so-en",n:"Stack Overflow: Top questions",l:"en",t:["programming"],mb:2500,d:"Most-voted programming Q&A."},
{id:"gut-en",n:"Project Gutenberg: Top 100 books",l:"en",t:["literature"],mb:2800,d:"Classic public-domain literature."},
{id:"wv-en",n:"Wikivoyage English",l:"en",t:["geography"],mb:800,d:"Travel guides worldwide."},
{id:"wiki-hi-top",n:"विकिपीडिया हिन्दी: चुनिंदा लेख",l:"hi",t:["general","history","geography","science"],mb:250,core:1,d:"Popular Hindi Wikipedia articles."},
{id:"wiki-hi-all",n:"विकिपीडिया हिन्दी: मिनी",l:"hi",t:["general","science","history","geography"],mb:600,d:"Intros of all Hindi articles."},
{id:"wiki-hi-sci",n:"विज्ञान (Hindi Science)",l:"hi",t:["science","math"],mb:180,d:"Science articles in Hindi."},
{id:"khan-hi",n:"Khan Academy हिन्दी",l:"hi",t:["math","science"],mb:3000,d:"School lessons in Hindi."},
{id:"aid-hi",n:"प्राथमिक चिकित्सा और आपदा",l:"hi",t:["emergency","medicine"],mb:110,core:1,d:"First aid and disaster guides in Hindi."},
{id:"gut-hi",n:"हिन्दी साहित्य संग्रह",l:"hi",t:["literature"],mb:400,d:"Classic Hindi literature."}];
const T={science:["🔬 Science","physics chemistry biology space"],math:["➗ Maths","algebra geometry numbers"],medicine:["🩺 Medicine","health doctor disease"],emergency:["🚨 Emergency","first aid disaster survival"],history:["🏛️ History","ancient world war"],geography:["🌍 Geography","maps travel countries"],programming:["💻 Programming","code python web"],literature:["📖 Literature","books novels poems"],general:["🌐 General","wikipedia encyclopedia"]};
const A={science:["How photosynthesis works","Plants capture sunlight in chloroplasts and use it to turn water and carbon dioxide into sugar and oxygen. This process feeds almost every food chain on Earth."],
math:["The Pythagorean theorem","In a right triangle, the square of the longest side equals the sum of the squares of the other two: a² + b² = c². It is used in building, navigation and computer graphics."],
medicine:["Oral rehydration therapy","A simple mix of clean water, salt and sugar replaces fluids lost to diarrhoea. It has saved millions of lives, especially among children."],
emergency:["First aid for severe bleeding","Press firmly on the wound with a clean cloth, keep the pressure on, raise the limb if possible, and call emergency services immediately."],
history:["The Indus Valley Civilisation","One of the world’s earliest urban cultures, with planned cities such as Harappa and Mohenjo-daro, flourished around 2600 BCE."],
geography:["How monsoons work","Seasonal wind reversals bring moist ocean air over land, delivering most of South Asia’s yearly rain between June and September."],
programming:["What is a variable?","A variable is a named place to store a value. In Python, x = 5 stores the number 5 under the name x."],
literature:["Premchand and the Indian short story","Premchand wrote about village life and social change, and is widely regarded as a pioneer of modern Hindi and Urdu fiction."],
general:["What is Wikipedia?","A free, community-written encyclopedia launched in 2001. Kiwix packs it into a ZIM file so it can be read offline."]};
const GB=[0.25,0.5,1,2,4,8,16,32,64],SPEEDS=[1,2,5,10,25,50],DEMO=30,KEY="kiwix-onb-v2",ORDER=["welcome","choose","setup","stats","reader"];
let S={v:"welcome",topics:[],lang:"en",gi:3,speed:5,speedTested:false,selected:null,dl:null,lib:[],open:null,art:0,showLib:false,q:"",m:{clicks:0,t0:Date.now(),first:null,cf:null},log:[]};
try{const x=JSON.parse(localStorage.getItem(KEY)||"null");if(x&&x.v)S={...S,...x};if(!Array.isArray(S.selected)&&S.selected!==null)S.selected=null}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const $=q=>document.querySelector(q);
const fs=mb=>mb>=1000?(mb/1000).toFixed(1)+" GB":Math.round(mb)+" MB";
const ft=s=>s<60?Math.max(1,Math.round(s))+" sec":s<3600?Math.round(s/60)+" min":(s/3600).toFixed(1)+" h";
document.addEventListener("click",()=>{S.m.clicks++},true);
const art=k=>({
hero:'<svg viewBox="0 0 240 200"><circle cx="120" cy="100" r="86" class="fa" opacity=".12"/><circle cx="120" cy="96" r="56" class="n sb" stroke-width="4"/><ellipse cx="120" cy="96" rx="24" ry="56" class="n sb" stroke-width="3"/><path d="M64 96h112M72 70h96M72 122h96" class="n sb" stroke-width="3"/><g transform="rotate(-10 176 140)"><rect x="140" y="118" width="64" height="46" rx="7" class="fc"/><path d="M172 124v34" stroke="#fff" stroke-width="3"/></g><g class="n sa" stroke-width="5"><path d="M52 44a40 40 0 0 1 56-10M64 58a24 24 0 0 1 32-5"/><circle cx="80" cy="70" r="3" class="fa"/><path d="M48 80 112 26" class="sc"/></g></svg>',
read:'<svg viewBox="0 0 160 130"><path d="M80 30c-16-10-40-12-60-6v76c20-6 44-4 60 6 16-10 40-12 60-6V24c-20-6-44-4-60 6z" class="fa" opacity=".2"/><path d="M80 30c-16-10-40-12-60-6v76c20-6 44-4 60 6 16-10 40-12 60-6V24c-20-6-44-4-60 6zM80 30v76" class="n sa" stroke-width="5"/><path d="M34 46c12-2 26-1 36 4M34 62c12-2 26-1 36 4M90 50c10-5 24-6 36-4M90 66c10-5 24-6 36-4" class="n sb" stroke-width="4"/></svg>',
cloud:'<svg viewBox="0 0 160 130"><path d="M44 88a24 24 0 0 1 4-48 34 34 0 0 1 64 8 20 20 0 0 1-2 40z" class="fb" opacity=".25"/><path d="M44 88a24 24 0 0 1 4-48 34 34 0 0 1 64 8 20 20 0 0 1-2 40z" class="n sb" stroke-width="5"/><path d="M80 56v44m-16-14 16 16 16-16" class="n sc" stroke-width="6"/></svg>',
find:'<svg viewBox="0 0 160 130"><circle cx="68" cy="56" r="34" class="fa" opacity=".18"/><circle cx="68" cy="56" r="34" class="n sa" stroke-width="6"/><path d="m94 82 36 34" class="n sc" stroke-width="9"/><path d="M52 50h32M52 64h20" class="n sb" stroke-width="5"/></svg>',
stats:'<svg viewBox="0 0 160 130"><rect x="22" y="70" width="26" height="40" rx="6" class="fb"/><rect x="62" y="46" width="26" height="64" rx="6" class="fa"/><rect x="102" y="22" width="26" height="88" rx="6" class="fc"/><path d="M14 116h132" class="n sa" stroke-width="4"/></svg>'}[k]);
const rec=()=>{const budget=GB[S.gi]*900,have=S.lib.map(x=>x.id);
  const c=CAT.filter(x=>x.l===S.lang&&!have.includes(x.id)).map(x=>({x,hit:x.t.filter(t=>S.topics.includes(t))})).map(o=>({...o,s:o.hit.length*10+(o.x.core?3:0)})).filter(o=>o.hit.length).sort((a,b)=>b.s-a.s||a.x.mb-b.x.mb);
  const pick=[],skip=[];let used=0;for(const o of c){if(pick.length<5&&used+o.x.mb<=budget){pick.push(o);used+=o.x.mb}else skip.push(o)}return{pick,skip,used,budget}};
const go=(v,lib)=>{S.v=v;if(lib!==undefined)S.showLib=lib;save();render();scrollTo(0,0)};
function render(){
  $("#dots").innerHTML=ORDER.map((_,i)=>`<i class="${i<=ORDER.indexOf(S.v)?"on":""}"></i>`).join("");
  const a=$("#app");V[S.v](a);
  if(S.v==="stats"&&S.showLib)setTimeout(()=>{const e=$("#lib");e&&e.scrollIntoView({behavior:"smooth"})},60);
}
const V={
welcome(a){a.innerHTML=`<section class="center"><div class="art float">${art("hero")}</div><span class="pill">👋 Welcome · नमस्ते · Bienvenue</span><h1>Knowledge that works <em>without internet</em></h1>
<p class="mu">Thanks for visiting! Let’s set up your offline library in under a minute: Wikipedia, textbooks, first-aid guides and more, all on your own device.</p>
<div class="feat"><div>🌐 <b>Offline-first</b><br><span class="mu">Read anywhere, any time</span></div><div>🗣️ <b>Hindi + English</b><br><span class="mu">Pick your language</span></div><div>🔁 <b>Resumable</b><br><span class="mu">Lost signal? Pick up again</span></div></div>
<button class="p big" id="go">Get started →</button></section>`;$("#go").onclick=()=>go("choose")},
choose(a){a.innerHTML=`<section class="center"><h2>What would you like to do?</h2><p class="mu">Choose one to continue.</p><div class="grid">
<button class="opt" id="o1"><div class="art sm float">${art("read")}</div><b>View downloaded files</b><span>Open your offline library · ${S.lib.length} file(s) on this device</span></button>
<button class="opt" id="o2"><div class="art sm float">${art("cloud")}</div><b>Explore recommendations</b><span>Try the onboarding demo and topic preferences</span></button>
<button class="opt" id="o3"><div class="art sm float">${art("find")}</div><b>Real ZIM library</b><span>Download genuine Kiwix archives and read them here</span></button></div></section>`;
  $("#o1").onclick=()=>go("stats",true);$("#o2").onclick=()=>go("setup");$("#o3").onclick=()=>go("realLibrary")},
setup(a){a.innerHTML=`<section><div class="center"><div class="art sm float">${art("find")}</div><h2>Make it yours</h2><p class="mu">Language, topics and space. Recommendations update live.</p></div>
<div class="card"><span class="lbl" style="margin-top:0">1 · Language</span><div class="chips" id="lg"></div>
<span class="lbl">2 · Search preferred topics</span><input type="text" id="sq" placeholder="Try “first aid”, “python”, “maths”…" value="${S.q}"><div class="chips" id="ch"></div>
<span class="lbl">3 · Storage you can spare: <b id="gb"></b></span><input type="range" id="sl" min="0" max="${GB.length-1}" value="${S.gi}">
<div class="row" style="margin-top:8px"><button class="s" id="det">Detect free space</button><span class="mu" id="dm" style="font-size:.85rem">Manual choice always works.</span></div>
<span class="lbl">4 · Your internet speed</span><div class="row" style="margin-top:8px;justify-content:flex-start"><button class="s" id="testSpeed">📶 Test internet speed</button><b id="speedValue">${S.speedTested?S.speed.toFixed(1)+" Mbps measured":S.speed+" Mbps estimate"}</b></div><div class="tag" id="speedMsg">${S.speedTested?"Speed test result saved on this device.":"Run a speed test for a better download-time estimate, or use the manual estimate below."}</div><div class="row" style="margin-top:8px;justify-content:flex-start"><label for="sp" class="tag">Manual speed:</label><select id="sp">${SPEEDS.map(s=>`<option value="${s}" ${Math.round(S.speed)===s?"selected":""}>${s} Mbps</option>`).join("")}</select></div></div>
<div class="card"><h2>Recommended for you</h2><div id="list"></div></div>
<div class="row"><button class="s" id="bk">Back</button><span><button class="s" id="qk">⚡ Quick setup</button> <button class="p" id="dlb">Download all →</button></span></div></section>`;
  const lg=()=>$("#lg").innerHTML=Object.entries({en:"English",hi:"हिन्दी"}).map(([k,v])=>`<button class="chip ${S.lang===k?"on":""}" data-l="${k}">${v}</button>`).join("");
  const ch=()=>{const q=S.q.trim().toLowerCase(),f=Object.entries(T).filter(([k,[l,w]])=>!q||(l+" "+w).toLowerCase().includes(q));
    $("#ch").innerHTML=f.length?f.map(([k,[l]])=>`<button class="chip ${S.topics.includes(k)?"on":""}" data-t="${k}">${l}</button>`).join(""):'<span class="mu">No topic matches “'+S.q.replace(/</g,"")+'”.</span>'};
  const list=()=>{$("#gb").textContent=GB[S.gi]+" GB";const r=rec();let h="";
    if(!S.topics.length)h='<div class="note">Pick at least one topic to see recommendations.</div>';
    else if(!r.pick.length)h='<div class="note">Nothing new fits. Increase storage or add topics. (Files already in your library are skipped.)</div>';
    if(S.selected===null)S.selected=r.pick.map(o=>o.x.id);
    r.pick.forEach(o=>{const chosen=S.selected.includes(o.x.id);h+=`<button type="button" class="item pick-item ${chosen?"picked":""}" data-pick="${o.x.id}" aria-pressed="${chosen}"><span class="pick-mark">${chosen?"✓":"＋"}</span><b>${T[o.hit[0]][0].split(" ")[0]} ${o.x.n}</b><div class="tag">${fs(o.x.mb)} · estimated ${ft(o.x.mb*8/Math.max(.1,S.speed))} at ${S.speed.toFixed(1)} Mbps · matches ${o.hit.join(", ")}</div><div class="tag">${o.x.d}</div></button>`});
    const selectedFiles=r.pick.filter(o=>S.selected.includes(o.x.id)),selectedMb=selectedFiles.reduce((n,o)=>n+o.x.mb,0);
    if(r.pick.length)h+=`<div class="note"><b>${selectedFiles.length} selected · ${fs(selectedMb)}</b> of ${fs(r.budget)} storage budget · estimated ${ft(selectedMb*8/Math.max(.1,S.speed))} at ${S.speed.toFixed(1)} Mbps. Click a card to select or deselect it.</div>`;
    h+=r.skip.filter(o=>r.used+o.x.mb>r.budget).slice(0,4).map(o=>{const n=GB.find(g=>g*900>=r.used+o.x.mb);return`<div class="item" style="border-color:var(--er)"><b>⚠️ ${o.x.n}</b><div class="tag er">Needs more storage: this ${fs(o.x.mb)} file doesn’t fit in ${GB[S.gi]} GB. Choose at least ${n?n+" GB":"64+ GB"} to include it.</div></div>`}).join("");
    $("#list").innerHTML=h;$("#dlb").textContent=`Download selected (${(S.selected||[]).filter(id=>r.pick.some(o=>o.x.id===id)).length}) →`;$("#dlb").disabled=!r.pick.length||!(S.selected||[]).some(id=>r.pick.some(o=>o.x.id===id))};
  lg();ch();list();
  a.onclick=e=>{const pick=e.target.closest("[data-pick]");if(pick){const id=pick.dataset.pick;S.selected=S.selected||[];S.selected=S.selected.includes(id)?S.selected.filter(x=>x!==id):[...S.selected,id];save();list();return}const b=e.target.closest("[data-l],[data-t]");if(!b)return;if(b.dataset.l){S.lang=b.dataset.l;S.selected=null;lg()}else{const t=b.dataset.t,i=S.topics.indexOf(t);i<0?S.topics.push(t):S.topics.splice(i,1);S.selected=null;ch()}save();list()};
  $("#sq").oninput=e=>{S.q=e.target.value;ch()};
  $("#testSpeed").onclick=async()=>{const btn=$("#testSpeed"),value=$("#speedValue"),msg=$("#speedMsg");btn.disabled=true;btn.textContent="Testing…";msg.textContent="Measuring download throughput. This uses a small test file and may consume a few MB.";try{const bytes=8000000,url="https://speed.cloudflare.com/__down?bytes="+bytes+"&cache="+Date.now(),start=performance.now(),res=await fetch(url,{cache:"no-store"});if(!res.ok)throw new Error("Speed test server unavailable");await res.arrayBuffer();const elapsed=(performance.now()-start)/1000,mbps=(bytes*8/1e6)/elapsed;if(!Number.isFinite(mbps)||mbps<=0)throw new Error("Invalid measurement");S.speed=Math.max(.1,Math.min(1000,mbps));S.speedTested=true;$("#sp").value=SPEEDS.reduce((best,v)=>Math.abs(v-S.speed)<Math.abs(best-S.speed)?v:best,SPEEDS[0]);value.textContent=S.speed.toFixed(1)+" Mbps measured";msg.textContent="Measured in this browser just now. Real ZIM downloads can be slower due to server speed, Wi-Fi, and other traffic.";save();list()}catch(err){const down=navigator.connection&&navigator.connection.downlink;if(down){S.speed=down;S.speedTested=false;value.textContent=down.toFixed(1)+" Mbps (browser estimate)";msg.textContent="Direct test failed; using the browser’s connection estimate instead.";save();list()}else msg.textContent="Speed test could not run (network/CORS restriction). Choose a manual speed below."}finally{btn.disabled=false;btn.textContent="📶 Test internet speed"}};
  $("#sl").oninput=e=>{S.gi=+e.target.value;save();list()};$("#sp").onchange=e=>{S.speed=+e.target.value;S.speedTested=false;$("#speedValue").textContent=S.speed+" Mbps manual estimate";$("#speedMsg").textContent="Using your manual estimate.";save();list()};
  $("#det").onclick=async()=>{try{const e=await navigator.storage.estimate(),f=(e.quota-e.usage)/1e9;let i=0;GB.forEach((g,k)=>{if(g<=f)i=k});S.gi=i;$("#sl").value=i;$("#dm").textContent="Browser estimate: ~"+f.toFixed(1)+" GB (may differ from real device space).";save();list()}catch(x){$("#dm").textContent="Not available here. Please choose manually."}};
  $("#bk").onclick=()=>go("choose");$("#dlb").onclick=begin;
  $("#qk").onclick=()=>{S.topics=["general","science","emergency"];S.lang="en";S.gi=3;S.selected=null;save();go("setup")}},
stats(a){const d=S.dl;
  a.innerHTML=`<section><div class="center"><div class="art sm float">${art("stats")}</div><h2>${d&&d.status==="done"?"✅ You’re offline-ready":d?"Downloading your library":"Your downloads"}</h2><p class="mu">This prototype simulates file progress. Time estimates use ${S.speed.toFixed(1)} Mbps ${S.speedTested?"measured by your browser":"as an estimate"}; real downloads may vary by server and network conditions.</p></div>
  <div class="card"><div class="ring"><svg width="170" height="170" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke-width="10" style="stroke:var(--bd)"/><circle id="rg" cx="60" cy="60" r="50" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="314" transform="rotate(-90 60 60)" style="stroke:var(--b);transition:stroke-dashoffset .2s"/></svg><b id="pc">0%</b></div>
  <div class="stats" id="st"></div><div id="fl"></div>
  <div class="row"><button class="s" id="ir">📴 Simulate network drop</button><button class="s" id="rm">▶ Resume</button></div><div class="log" id="lgg"></div></div>
  <div class="row" style="justify-content:center"><button class="s" id="more">⬇️ Download more</button><button class="p big" id="olb">📚 Open my downloaded library</button></div>
  ${S.showLib?`<div id="lib"><h2 style="margin-top:28px">📚 Your offline library</h2><div class="lib" id="lc"></div></div>`:""}</section>`;
  $("#ir").onclick=()=>{if(!d||d.status!=="running")return;d.status="interrupted";S.log.push("✖ Connection lost at "+fs(sum(d))+" total. Partial files kept.");clearInterval(timer);save();paint()};
  $("#rm").onclick=()=>{if(!d||d.status!=="interrupted")return;const i=d.got.findIndex((g,k)=>g<d.files[k].mb);S.log.push("↻ Resuming with HTTP header Range: bytes="+Math.round(d.got[i]*1e6)+"- (no restart from zero)");d.status="running";save();paint();start()};
  $("#olb").onclick=()=>{S.showLib=true;save();render()};$("#more").onclick=()=>go("setup");paint()},
realLibrary(a){
  const archives=[
    {id:"en100mini",title:"Wikipedia English · Mini",desc:"A lightweight starter archive with introductory article content.",size:"4.4 MB",topic:"General knowledge",url:"https://download.kiwix.org/zim/wikipedia/wikipedia_en_100_mini_2026-07.zim",badge:"Best for a quick test"},
    {id:"en100nopic",title:"Wikipedia English · No pictures",desc:"A broader set of popular English Wikipedia articles without images.",size:"15 MB",topic:"General knowledge",url:"https://download.kiwix.org/zim/wikipedia/wikipedia_en_100_nopic_2026-07.zim",badge:"More text, still small"},
    {id:"en100",title:"Wikipedia English · With pictures",desc:"Popular English Wikipedia articles with images included.",size:"317 MB",topic:"General knowledge",url:"https://download.kiwix.org/zim/wikipedia/wikipedia_en_100_2026-07.zim",badge:"Richer reading"},
    {id:"astronomy",title:"Wikipedia · Astronomy (English)",desc:"A focused archive for astronomy and space topics.",size:"~1.6 GB",topic:"Science & space",url:"https://download.kiwix.org/zim/wikipedia/wikipedia_en_astronomy_maxi_2026-08.zim",badge:"Topic-specific"}
  ];
  const q=(S.realQ||"").toLowerCase();const shown=archives.filter(x=>(x.title+" "+x.desc+" "+x.topic).toLowerCase().includes(q));
  a.innerHTML=`<section><div class="center"><span class="pill">✓ Genuine OpenZIM files</span><h2>Choose content you actually want</h2><p class="mu">These are real ZIM archives hosted by Kiwix, not simulated files. Download one, then open that saved .zim file in the reader below.</p></div>
  <div class="row"><input id="realSearch" type="text" placeholder="Search Wikipedia, science, space…" value="${S.realQ||""}" style="max-width:440px"><button class="s" id="fullCatalog">Browse full Kiwix catalogue ↗</button></div>
  <div class="grid" id="realCards">${shown.map(x=>`<article class="card real-card"><span class="pill">${x.badge}</span><h3>${x.title}</h3><p class="mu">${x.desc}</p><div class="tag">${x.topic} · ${x.size}</div><div class="row"><a class="p" href="${x.url}" target="_blank" rel="noopener" download>⬇ Download .zim</a><button class="s" data-open-reader="${x.id}">Open reader here →</button></div></article>`).join("")||'<div class="note">No matching archives. Try a different search.</div>'}</div>
  <div class="card"><h3>📚 Read a downloaded ZIM in this website</h3><p class="mu">The reader is embedded below. After downloading, click <b>Open reader</b>, then use the reader’s file picker to select the .zim file from your Downloads folder. Browsers do not let this website silently access downloaded files, so you must choose the file once.</p><div class="row"><button class="p" id="openReader">Launch embedded Kiwix reader →</button><a class="s" href="https://pwa.kiwix.org/" target="_blank" rel="noopener">Open reader in a new tab ↗</a></div></div>
  <div class="row"><button class="s" id="backChoose">← Back</button></div></section>`;
  $("#realSearch").oninput=e=>{S.realQ=e.target.value;const pos=e.target.selectionStart;save();V.realLibrary(a);const n=$("#realSearch");n.focus();n.setSelectionRange(pos,pos)};
  $("#fullCatalog").onclick=()=>window.open("https://library.kiwix.org/","_blank","noopener");
  $("#openReader").onclick=()=>go("zimReader");
  $("#backChoose").onclick=()=>go("choose");
  a.querySelectorAll("[data-open-reader]").forEach(b=>b.onclick=()=>{S.chosenArchive=b.dataset.openReader;go("zimReader")});
},
zimReader(a){
  a.innerHTML=`<section><div class="center"><span class="pill">📖 Kiwix JS · Real ZIM reader</span><h2>Read your archive without leaving this website</h2><p class="mu">Use the embedded official Kiwix reader to open the .zim file you downloaded. Choose the file from your device inside the reader.</p></div>
  <div class="note"><b>How to open it:</b> 1) Download a .zim archive from the library. 2) In the reader below, open its menu/configuration and choose the option to select/open a ZIM file (or use the file picker shown by the reader). 3) Select the file from your Downloads folder. Large archives may take a little while to load.</div>
  <div class="reader-frame"><iframe title="Kiwix JS ZIM reader" src="https://pwa.kiwix.org/" loading="lazy" allow="fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
  <p class="tag">The reader is the official Kiwix JS PWA embedded in this page. Your browser may block file selection or embedded third-party pages in some configurations; if so, use “Open reader in a new tab”.</p>
  <div class="row"><button class="s" id="backReal">← Back to real ZIM library</button><a class="p" href="https://pwa.kiwix.org/" target="_blank" rel="noopener">Open reader in new tab ↗</a></div></section>`;
  $("#backReal").onclick=()=>go("realLibrary");
},
reader(a){const it=S.lib.find(x=>x.id===S.open)||S.lib[0];if(!it){go("stats",true);return}
  const ids=it.t.filter(t=>A[t]),q=S.q2||"";
  a.innerHTML=`<section class="rd"><div class="card"><div class="row" style="margin:0"><div><span class="pill">✈️ Offline · served from your device</span><h2>${it.n}</h2><div class="mu">${it.id}.zim · ${fs(it.mb)}</div></div><div class="art sm float" style="margin:0">${art("read")}</div></div>
  <input type="text" id="rq" placeholder="Search inside this ZIM…" value="${q}" style="margin-top:12px"><div class="chips" id="rc"></div></div><div class="card art-body" id="rb"></div></section>
  <button class="fab" id="fab">📚 Library</button>`;
  const draw=()=>{const f=ids.filter(t=>A[t][0].toLowerCase().includes((S.q2||"").toLowerCase()));if(f.length&&!f.includes(ids[S.art]))S.art=ids.indexOf(f[0]);
    $("#rc").innerHTML=f.map(t=>`<button class="chip ${ids[S.art]===t?"on":""}" data-a="${ids.indexOf(t)}">${A[t][0]}</button>`).join("")||'<span class="mu">No article found.</span>';
    const t=ids[S.art];$("#rb").innerHTML=f.length?`<span class="pill">${T[t][0]}</span><h2>${A[t][0]}</h2><p>${A[t][1]}</p><p class="mu">Article from ${it.n}. No internet connection was used to load this page.</p>`:"<p class=\"mu\">Try a different search term.</p>"};
  draw();$("#rq").oninput=e=>{S.q2=e.target.value;draw()};$("#rc").onclick=e=>{const b=e.target.closest("[data-a]");if(b){S.art=+b.dataset.a;draw()}};
  $("#fab").onclick=()=>go("stats",true)}};
const sum=d=>d.got.reduce((a,b)=>a+b,0);
function begin(){const r=rec(),chosen=r.pick.filter(o=>(S.selected||[]).includes(o.x.id));if(!chosen.length)return;S.dl={files:chosen.map(o=>({id:o.x.id,n:o.x.n,mb:o.x.mb,t:o.x.t,d:o.x.d})),got:chosen.map(()=>0),status:"running"};
  if(S.m.first==null){S.m.first=Math.round((Date.now()-S.m.t0)/1000);S.m.cf=S.m.clicks}
  S.log=["Started. Requesting "+r.pick.length+" file(s)."];go("stats",false);start()}
let timer=null;
function paint(){const d=S.dl;if(S.v!=="stats")return;
  if(d){const tot=d.files.reduce((a,f)=>a+f.mb,0),g=sum(d),p=g/tot*100,dn=d.got.filter((x,i)=>x>=d.files[i].mb).length;
    $("#rg").style.strokeDashoffset=314-314*p/100;$("#pc").textContent=Math.floor(p)+"%";
    $("#st").innerHTML=`<div class="stat"><b>${dn}/${d.files.length}</b><small>files done</small></div><div class="stat"><b>${fs(g)}</b><small>of ${fs(tot)}</small></div><div class="stat"><b>${d.status==="done"?"Done":ft((tot-g)*8/S.speed)}</b><small>est. left at ${S.speed} Mbps</small></div><div class="stat"><b>${S.m.first==null?"–":S.m.first+"s"}</b><small>to first download · ${S.m.cf==null?0:S.m.cf} clicks</small></div>`;
    $("#fl").innerHTML=d.files.map((f,i)=>{const q=d.got[i]/f.mb*100;return`<div class="item"><b>${f.n}</b><div class="tag">${q>=100?"Complete · "+fs(f.mb):fs(d.got[i])+" of "+fs(f.mb)+" · "+Math.floor(q)+"%"}</div><div class="bar ${q>=100?"done":""}"><div style="width:${q}%"></div></div></div>`}).join("");
    $("#ir").disabled=d.status!=="running";$("#rm").disabled=d.status!=="interrupted"}
  else{$("#st").innerHTML='<div class="note">No downloads in progress. Start a new download to see live stats.</div>';$("#ir").disabled=$("#rm").disabled=true}
  const lg=$("#lgg");lg.innerHTML=S.log.map(l=>`<div class="${l[0]==="✖"?"er":l[0]==="✔"?"ok":""}">${l}</div>`).join("");lg.scrollTop=1e9;
  $("#olb").disabled=!S.lib.length&&!S.showLib&&false;
  const lc=$("#lc");if(lc){lc.innerHTML=S.lib.length?S.lib.map(x=>`<button class="opt" data-o="${x.id}"><div class="emo">${T[x.t[0]][0].split(" ")[0]}</div><b>${x.n}</b><span>${fs(x.mb)} · tap to read offline</span></button>`).join(""):'<div class="note">Your library is empty. Download something first!</div>';
    lc.onclick=e=>{const b=e.target.closest("[data-o]");if(b){S.open=b.dataset.o;S.art=0;S.q2="";go("reader")}}}}
function start(){clearInterval(timer);const d=S.dl;if(!d||d.status!=="running")return;
  timer=setInterval(()=>{const i=d.got.findIndex((g,k)=>g<d.files[k].mb);
    if(i<0){clearInterval(timer);d.status="done";S.log.push("✔ All downloads complete. Library ready.");save();paint();return}
    d.got[i]=Math.min(d.files[i].mb,d.got[i]+S.speed/8*DEMO*0.1);
    if(d.got[i]>=d.files[i].mb){const f=d.files[i];S.log.push("✔ "+f.n+" saved.");if(!S.lib.some(x=>x.id===f.id))S.lib.push(f)}
    save();paint()},100)}
render();if(S.v==="stats"&&S.dl&&S.dl.status==="running"){S.log.push("↻ Page reloaded, resuming from saved progress.");start()}
