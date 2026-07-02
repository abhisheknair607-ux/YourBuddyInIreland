/* ============================================================
   Guid-On — All 8 web platform pages.
   Each page is a full-bleed surface; the showcase wraps with chrome.
   ============================================================ */

/* ---- Page-local styles injected once for the web pages ---- */
const webPageCSS = `
.hero-wrap{padding:64px 0 48px;display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
.hero-wrap h1{font-family:var(--font-poppins);font-size:54px;font-weight:600;letter-spacing:-0.02em;line-height:1.05;margin:14px 0 18px;color:#020617}
.hero-wrap h1 em{font-style:normal;background:linear-gradient(135deg,#0ea5e9,#2563eb,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero-wrap .lede{font-size:17px;color:#475569;line-height:1.6;margin:0 0 26px;max-width:540px}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.hero-actions .btn{padding:14px 22px;font-size:14px;min-height:48px}

/* stats strip */
.stats-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:28px;background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);border-radius:28px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);margin:24px 0 48px}
.stats-strip .stat{text-align:center;border-right:1px solid #e2e8f0;padding:6px 12px}
.stats-strip .stat:last-child{border-right:0}
.stats-strip .n{font-family:var(--font-poppins);font-size:34px;font-weight:600;color:#020617;letter-spacing:-0.02em;line-height:1;background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent}
.stats-strip .l{font-size:12px;color:#64748b;margin-top:6px;line-height:1.4}

/* hero map illustration */
.map-card{background:rgba(255,255,255,.72);border:1px solid rgba(255,255,255,.85);border-radius:32px;padding:24px;backdrop-filter:blur(24px);box-shadow:0 30px 80px rgba(15,23,42,.14);position:relative;overflow:hidden}
.map-card svg{width:100%;height:auto;display:block}
.map-flags{position:absolute;display:flex;gap:6px;align-items:center;font-size:11px;color:#64748b;font-weight:500}
.map-flags .pin{width:30px;height:30px;border-radius:9999px;background:#fff;border:2px solid #bae6fd;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 4px 10px rgba(15,23,42,.1)}

/* feature grid */
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.feat-card{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:24px;backdrop-filter:blur(20px);box-shadow:0 14px 40px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:10px;cursor:pointer}
.feat-card .ico{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center}
.feat-card h3{font-family:var(--font-poppins);font-size:18px;margin:4px 0 0;font-weight:600;color:#020617}
.feat-card p{font-size:13px;color:#64748b;line-height:1.55;margin:0}
.feat-card .arrow{margin-top:6px;font-size:12px;color:#0369a1;font-weight:600;display:inline-flex;gap:4px;align-items:center;text-transform:uppercase;letter-spacing:.12em}

/* journey timeline */
.journey-wrap{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:28px;padding:34px 28px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06)}
.journey-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px;position:relative}
.journey-grid::before{content:"";position:absolute;left:5%;right:5%;top:24px;height:2px;background:linear-gradient(90deg,#bae6fd,#c7d2fe);z-index:0}
.j-step{position:relative;z-index:2;display:flex;flex-direction:column;gap:8px;align-items:center;text-align:center}
.j-step .num{width:48px;height:48px;border-radius:9999px;background:#fff;border:2px solid #bae6fd;color:#0369a1;font-family:var(--font-poppins);font-weight:600;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(15,23,42,.06)}
.j-step .when{font-size:10px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:.16em;margin-top:4px}
.j-step h4{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#0f172a;margin:0;line-height:1.3}
.j-step p{font-size:12px;color:#64748b;margin:0;line-height:1.5}

/* testimonials */
.quotes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.quote-card{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:24px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:14px}
.quote-card .body{font-size:15px;line-height:1.6;color:#334155}
.quote-card .who{display:flex;align-items:center;gap:12px;border-top:1px solid #e2e8f0;padding-top:14px}
.quote-card .who b{font-size:13px;color:#0f172a;display:block;font-family:var(--font-poppins)}
.quote-card .who small{font-size:11px;color:#64748b}

/* CTA band */
.cta-band{padding:60px 0 80px}
.cta-card{background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);border-radius:32px;padding:52px;display:grid;grid-template-columns:1.4fr 1fr;gap:32px;align-items:center;color:#fff;box-shadow:0 30px 80px rgba(56,132,255,.3);position:relative;overflow:hidden}
.cta-card::before{content:"";position:absolute;right:-10%;top:-30%;width:60%;height:160%;background:radial-gradient(ellipse at center,rgba(255,255,255,.15),transparent 60%);pointer-events:none}
.cta-card h2{font-family:var(--font-poppins);font-size:34px;font-weight:600;margin:0 0 8px;letter-spacing:-0.01em;line-height:1.15}
.cta-card p{font-size:15px;color:rgba(255,255,255,.85);margin:0 0 18px;line-height:1.6;max-width:480px}
.cta-band .btn-primary{background:#fff;color:#0369a1;box-shadow:none}
.cta-band .btn-secondary{background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff}

/* DEMO page */
.demo-step-strip{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:24px}
.demo-step-btn{background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:12px;font:inherit;color:#475569;font-size:12px;font-weight:500;cursor:pointer;text-align:left;display:flex;flex-direction:column;gap:6px;min-height:80px}
.demo-step-btn.active{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent;box-shadow:0 14px 30px rgba(59,130,246,.3)}
.demo-step-btn .n{font-family:var(--font-poppins);font-weight:600;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.7}
.demo-step-btn .t{font-family:var(--font-poppins);font-size:13px;font-weight:600;line-height:1.25}
.demo-stage{display:grid;grid-template-columns:1.1fr 1fr;gap:32px;background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:28px;padding:36px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);align-items:center}
.demo-stage h3{font-family:var(--font-poppins);font-size:26px;font-weight:600;color:#020617;margin:0 0 12px;letter-spacing:-0.01em}
.demo-stage p{font-size:14px;line-height:1.65;color:#475569;margin:0 0 12px}
.demo-screen{background:#fff;border-radius:20px;border:1px solid #e2e8f0;padding:18px;min-height:300px;box-shadow:0 10px 24px rgba(15,23,42,.08);display:flex;flex-direction:column;gap:10px}

/* scenarios */
.scen-tabs{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
.scen-tab{background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px 18px;cursor:pointer;display:flex;gap:12px;align-items:flex-start;flex:1;min-width:240px}
.scen-tab.active{background:linear-gradient(135deg,#e0f2fe,#dbeafe);border-color:#bae6fd}
.scen-tab .ico{width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.scen-tab .ttl{font-family:var(--font-poppins);font-weight:600;font-size:13px;color:#0f172a;line-height:1.3}
.scen-tab .who{font-size:11px;color:#64748b;margin-top:2px}
.scen-board{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:28px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06)}
.scen-step-list{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.scen-step{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:flex-start}
.scen-step .num{width:36px;height:36px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;font-family:var(--font-poppins);font-weight:600;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.scen-step h5{font-family:var(--font-poppins);font-size:13px;font-weight:600;color:#0f172a;margin:0 0 4px}
.scen-step p{font-size:12.5px;color:#475569;margin:0 0 6px;line-height:1.55}
.scen-step .bubble{font-size:12px;color:#0c4a6e;background:rgba(224,242,254,.7);border:1px solid #bae6fd;border-radius:14px;padding:10px 12px;line-height:1.5}

/* plans table */
.plans-table{width:100%;border-collapse:separate;border-spacing:0;background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:24px;overflow:hidden;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06)}
.plans-table th,.plans-table td{padding:14px 22px;text-align:left;font-size:13.5px;border-bottom:1px solid #e2e8f0}
.plans-table thead th{background:#f8fafc;font-family:var(--font-poppins);font-size:13px;font-weight:600;color:#020617;text-transform:uppercase;letter-spacing:.1em}
.plans-table thead th:nth-child(2){background:#f8fafc}
.plans-table thead th:nth-child(3){background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff}
.plans-table tbody tr:last-child td{border-bottom:0}
.plans-table td:first-child{font-weight:500;color:#0f172a}
.plans-table td:nth-child(3){background:rgba(224,242,254,.4)}

/* faq */
.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.faq-card{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:18px 22px;cursor:pointer}
.faq-card .q{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#0f172a;display:flex;justify-content:space-between;gap:12px;align-items:center}
.faq-card .a{font-size:13px;color:#475569;line-height:1.6;margin-top:10px;display:none}
.faq-card.open .a{display:block}

/* ===== CHATBOT page ===== */
.chat-page{display:grid;grid-template-columns:220px 1fr 240px;gap:0;height:calc(100% - 60px)}
.chat-side{background:rgba(255,255,255,.7);border-right:1px solid rgba(226,232,240,.7);padding:20px 16px;display:flex;flex-direction:column;gap:8px;overflow-y:auto}
.chat-side h5{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.18em;margin:6px 0 4px;font-weight:600}
.chat-side-item{font-size:13px;color:#334155;padding:8px 10px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:8px;font-weight:500}
.chat-side-item.active{background:#e0f2fe;color:#0369a1;font-weight:600}
.chat-main{display:flex;flex-direction:column;height:100%}
.chat-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid rgba(226,232,240,.7);background:rgba(255,255,255,.65);backdrop-filter:blur(14px)}
.chat-bar h2{font-family:var(--font-poppins);font-size:16px;margin:0;font-weight:600;color:#020617}
.chat-bar .status{font-size:11px;color:#64748b;display:flex;align-items:center;gap:6px}
.chat-bar .status::before{content:"";width:6px;height:6px;border-radius:9999px;background:#10b981}
.chat-msgs{flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;background:radial-gradient(circle at top,rgba(255,255,255,.5),transparent 35%)}
.msg{display:flex;gap:10px;align-items:flex-end}
.msg.user{justify-content:flex-end}
.msg .av-b{width:36px;height:36px;border-radius:9999px;background:#fff;border:2px solid #bae6fd;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px}
.bubble{max-width:70%;padding:12px 16px;border-radius:20px;font-size:14px;line-height:1.6}
.bubble.assistant{background:rgba(255,255,255,.92);border:1px solid #e2e8f0;color:#334155;border-bottom-left-radius:6px;box-shadow:0 6px 18px rgba(15,23,42,.06)}
.bubble.user{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border-bottom-right-radius:6px;box-shadow:0 6px 18px rgba(59,130,246,.25)}
.bubble .src{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.16em;color:#0369a1;text-transform:uppercase;background:#e0f2fe;border:1px solid #bae6fd;padding:2px 8px;border-radius:9999px;margin-bottom:6px}
.chips-row{display:flex;flex-wrap:wrap;gap:8px;padding:0 24px 14px}
.chip-prompt{background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:8px 14px;font-size:12px;color:#334155;font-weight:500;cursor:pointer}
.chip-prompt:hover{background:#f0f9ff;border-color:#bae6fd;color:#0369a1}
.composer-row{padding:14px 24px 20px;border-top:1px solid rgba(226,232,240,.7);background:rgba(255,255,255,.7)}
.composer-box{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:8px 8px 8px 16px;display:flex;align-items:center;gap:8px;box-shadow:0 6px 18px rgba(15,23,42,.06)}
.composer-box input{flex:1;border:0;outline:0;font:inherit;font-size:14px;background:transparent;color:#0f172a}
.composer-box .ic-btn{width:36px;height:36px;border-radius:9999px;background:transparent;border:0;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer}
.composer-box .send{width:38px;height:38px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border:0;display:flex;align-items:center;justify-content:center}
.composer-foot{font-size:11px;color:#94a3b8;margin-top:8px;text-align:center}
.chat-right{background:rgba(255,255,255,.7);border-left:1px solid rgba(226,232,240,.7);padding:20px 16px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}
.chat-right h5{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.18em;margin:6px 0 4px;font-weight:600}
.meter{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px}
.meter .bar{height:8px;background:#e2e8f0;border-radius:9999px;overflow:hidden;margin:8px 0 6px}
.meter .bar i{display:block;height:100%;background:linear-gradient(90deg,#0ea5e9,#2563eb);border-radius:9999px;width:30%}
.meter b{font-family:var(--font-poppins);font-size:14px;color:#0f172a;display:block}
.meter span{font-size:11px;color:#64748b}
.upgrade-card{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 14px 30px rgba(59,130,246,.3)}
.upgrade-card b{font-family:var(--font-poppins);font-size:13px}
.upgrade-card .price{font-family:var(--font-poppins);font-size:22px;font-weight:600;letter-spacing:-0.01em}
.upgrade-card button{background:#fff;color:#0369a1;border:0;border-radius:9999px;padding:8px;font-weight:600;font-size:12px;cursor:pointer}

/* ===== REGISTER page ===== */
.reg-wrap{min-height:calc(100vh - 60px);display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch}
.reg-brand{background:linear-gradient(135deg,#0369a1,#2563eb 50%,#4338ca);color:#fff;padding:64px 48px;display:flex;flex-direction:column;gap:24px;position:relative;overflow:hidden;justify-content:center}
.reg-brand::before{content:"";position:absolute;right:-20%;top:-20%;width:80%;height:80%;background:radial-gradient(circle,rgba(255,255,255,.18),transparent 60%);pointer-events:none}
.reg-brand h1{font-family:var(--font-poppins);font-size:38px;font-weight:600;margin:0;letter-spacing:-0.02em;line-height:1.1;position:relative}
.reg-brand p{font-size:15px;line-height:1.65;color:rgba(255,255,255,.85);margin:0;max-width:380px;position:relative}
.reg-brand .benefits{display:flex;flex-direction:column;gap:14px;position:relative}
.reg-brand .ben{display:flex;gap:14px;align-items:flex-start}
.reg-brand .ben .ic{width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.reg-brand .ben b{font-family:var(--font-poppins);font-size:14px;font-weight:600;display:block}
.reg-brand .ben span{font-size:12px;color:rgba(255,255,255,.75);line-height:1.5}
.reg-form{padding:64px 48px;display:flex;flex-direction:column;justify-content:center;max-width:560px}
.reg-form .steps{display:flex;gap:8px;margin-bottom:18px}
.reg-form .steps i{flex:1;height:4px;border-radius:9999px;background:#e2e8f0}
.reg-form .steps i.active{background:linear-gradient(90deg,#0ea5e9,#2563eb)}
.reg-form h2{font-family:var(--font-poppins);font-size:26px;font-weight:600;margin:0 0 6px;color:#020617;letter-spacing:-0.01em}
.reg-form .sub{font-size:13px;color:#64748b;margin:0 0 22px}
.reg-form .field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.reg-form label{font-size:11px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;display:block}
.reg-form .input{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px;margin-bottom:14px}
.reg-form .input input,.reg-form .input select{flex:1;border:0;outline:0;font:inherit;font-size:14px;color:#0f172a;background:transparent}
.tiles-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.tile{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 10px;text-align:center;cursor:pointer;display:flex;flex-direction:column;gap:6px;align-items:center}
.tile.active{border-color:#0369a1;background:#e0f2fe}
.tile .ic{font-size:22px}
.tile b{font-family:var(--font-poppins);font-size:12px;color:#0f172a;line-height:1.3}
.chips-multi{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.chips-multi .chip{background:#fff;border:1.5px solid #e2e8f0;border-radius:9999px;padding:8px 14px;font-size:12px;color:#475569;cursor:pointer;font-weight:500}
.chips-multi .chip.on{background:#0369a1;color:#fff;border-color:#0369a1}

/* ===== RESOURCES page ===== */
.res-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;gap:24px}
.res-search{background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:10px 18px;display:flex;align-items:center;gap:10px;width:380px;box-shadow:0 6px 18px rgba(15,23,42,.06)}
.res-search input{flex:1;border:0;outline:0;font:inherit;font-size:14px;background:transparent;color:#0f172a}
.res-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px}
.res-tab{background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:10px 16px;font-size:13px;color:#475569;cursor:pointer;font-weight:500;display:inline-flex;align-items:center;gap:6px}
.res-tab.active{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent;box-shadow:0 8px 22px rgba(59,130,246,.3)}
.res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.res-card{background:rgba(255,255,255,.92);border:1px solid #f1f5f9;border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:14px;box-shadow:0 8px 22px rgba(15,23,42,.05)}
.res-card .head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.res-card .ico{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.res-card h3{font-family:var(--font-poppins);font-size:16px;font-weight:600;color:#020617;margin:0;line-height:1.3}
.res-card p{font-size:13px;color:#475569;line-height:1.55;margin:0;flex:1}
.res-card .foot{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px dashed #e2e8f0}
.res-card .foot .verified{font-size:10.5px;color:#94a3b8}
.res-card .foot a{font-size:13px;color:#0369a1;font-weight:600;display:inline-flex;align-items:center;gap:4px;cursor:pointer}

/* ===== FOREX page ===== */
.fx-hero{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:36px}
.fx-card{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:24px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:8px}
.fx-card .lbl{font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.12em}
.fx-card .big{font-family:var(--font-poppins);font-size:38px;font-weight:600;color:#020617;letter-spacing:-0.02em;line-height:1}
.fx-card .sub{font-size:13px;color:#475569}
.fx-card .delta{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;padding:4px 10px;border-radius:9999px}
.fx-card .delta.up{background:#d1fae5;color:#047857}
.fx-card .delta.down{background:#fee2e2;color:#b91c1c}
.fx-card.brand-card{background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);color:#fff;border-color:transparent}
.fx-card.brand-card .lbl{color:rgba(255,255,255,.7)}
.fx-card.brand-card .big{color:#fff}
.fx-card.brand-card .sub{color:rgba(255,255,255,.85)}
.fx-2col{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;margin-bottom:36px}
.fx-conv{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:28px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06)}
.fx-conv h3{font-family:var(--font-poppins);font-size:20px;font-weight:600;color:#020617;margin:0 0 14px;letter-spacing:-0.01em}
.fx-row{display:flex;align-items:center;gap:16px}
.fx-input-blk{flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:14px 18px}
.fx-input-blk .lbl{font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.12em;margin-bottom:4px}
.fx-input-blk .val{font-family:var(--font-poppins);font-size:26px;font-weight:600;color:#020617;letter-spacing:-0.01em;display:flex;align-items:center;gap:8px}
.fx-input-blk .val input{font:inherit;border:0;outline:0;background:transparent;color:#020617;width:100%;letter-spacing:-0.01em}
.fx-input-blk .val .flag{font-size:20px}
.fx-swap{width:42px;height:42px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border:0;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer}
.fx-save{background:#ecfdf5;border:1px solid #bbf7d0;color:#047857;border-radius:14px;padding:12px 16px;margin-top:14px;display:flex;justify-content:space-between;font-size:13px;font-weight:500}
.fx-alert{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:28px;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:14px}
.fx-alert h3{font-family:var(--font-poppins);font-size:20px;font-weight:600;color:#020617;margin:0;letter-spacing:-0.01em}
.fx-alert .field{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:8px}
.fx-alert .field input{flex:1;border:0;outline:0;font:inherit;font-size:14px;background:transparent;color:#0f172a;font-weight:600}
.fx-alert .radio-row{display:flex;gap:6px}
.fx-alert .radio{flex:1;padding:8px 10px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;text-align:center;font-size:12px;color:#334155;font-weight:500;display:flex;align-items:center;justify-content:center;gap:6px}
.fx-alert .radio.on{border-color:#0369a1;background:#e0f2fe;color:#0369a1;font-weight:600}
.fx-table{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:24px;overflow:hidden;backdrop-filter:blur(20px);box-shadow:0 14px 36px rgba(15,23,42,.06);margin-bottom:24px}
.fx-table table{width:100%;border-collapse:separate;border-spacing:0}
.fx-table th,.fx-table td{padding:12px 22px;text-align:left;font-size:13px}
.fx-table thead{background:#f8fafc}
.fx-table thead th{font-family:var(--font-poppins);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#475569;border-bottom:1px solid #e2e8f0}
.fx-table tbody tr td{border-bottom:1px solid #f1f5f9}
.fx-table tbody tr:last-child td{border-bottom:0}
.fx-table tbody tr:hover{background:#fafbfd}
.fx-table .star-row{background:linear-gradient(90deg,#ecfdf5,transparent)}

/* ===== MENTORS page ===== */
.ment-filter{display:flex;gap:18px;margin-bottom:24px;flex-wrap:wrap}
.ment-filter-group{flex:1;min-width:240px}
.ment-filter-group h5{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.16em;margin:0 0 8px;font-weight:600}
.ment-filter-chips{display:flex;gap:6px;flex-wrap:wrap}
.ment-chip{background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:6px 12px;font-size:12px;color:#475569;cursor:pointer;font-weight:500}
.ment-chip.on{background:#e0f2fe;border-color:#bae6fd;color:#0369a1;font-weight:600}
.ment-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.ment-card{background:rgba(255,255,255,.92);border:1px solid #f1f5f9;border-radius:24px;padding:22px;display:flex;flex-direction:column;gap:14px;box-shadow:0 8px 22px rgba(15,23,42,.05)}
.ment-card .head{display:flex;gap:14px;align-items:flex-start}
.ment-card h3{font-family:var(--font-poppins);font-size:16px;font-weight:600;color:#020617;margin:0;letter-spacing:-0.01em}
.ment-card .meta{font-size:11.5px;color:#64748b;line-height:1.4;margin-top:2px}
.ment-card .stats{display:flex;justify-content:space-between;font-size:11.5px;color:#475569;padding:10px 0;border-top:1px dashed #e2e8f0;border-bottom:1px dashed #e2e8f0}
.ment-card .stats b{font-family:var(--font-poppins);color:#020617}
.ment-card .tags{display:flex;flex-wrap:wrap;gap:5px}
.ment-card .tag{font-size:10.5px;background:#f0f9ff;color:#0369a1;border-radius:9999px;padding:3px 9px;font-weight:500}
.ment-card .bio{font-size:13px;color:#475569;line-height:1.55;margin:0}
.ment-card .cta{background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);color:#fff;border:0;border-radius:9999px;padding:10px;font-weight:600;font-size:13px;cursor:pointer;box-shadow:0 8px 20px rgba(59,130,246,.25);display:flex;align-items:center;justify-content:center;gap:6px}

.become-mentor{background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);color:#fff;border-radius:28px;padding:40px;margin-top:36px;display:grid;grid-template-columns:1.2fr 1fr;gap:36px;align-items:center;box-shadow:0 30px 80px rgba(56,132,255,.3);position:relative;overflow:hidden}
.become-mentor::before{content:"";position:absolute;right:-15%;top:-30%;width:55%;height:160%;background:radial-gradient(ellipse at center,rgba(255,255,255,.16),transparent 60%);pointer-events:none}
.become-mentor h2{font-family:var(--font-poppins);font-size:30px;font-weight:600;margin:0 0 8px;letter-spacing:-0.01em;line-height:1.15;position:relative}
.become-mentor p{font-size:14px;color:rgba(255,255,255,.85);margin:0 0 18px;line-height:1.65;position:relative}
.become-mentor .req{display:flex;flex-direction:column;gap:8px;position:relative}
.become-mentor .req li{display:flex;gap:8px;font-size:13px;color:#fff;align-items:center}
.become-mentor .req li svg{flex-shrink:0;color:#86efac}

/* ===== DOCS page ===== */
.docs-grid{display:grid;grid-template-columns:260px 1fr 280px;gap:24px;height:calc(100% - 60px);min-height:780px}
.docs-side{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:18px 16px;backdrop-filter:blur(14px);overflow-y:auto;height:100%}
.docs-side h5{font-size:10px;color:#0369a1;text-transform:uppercase;letter-spacing:.18em;margin:14px 4px 6px;font-weight:600}
.docs-side h5:first-child{margin-top:0}
.docs-item{display:flex;align-items:center;justify-content:space-between;padding:9px 10px;border-radius:10px;cursor:pointer;font-size:13px;color:#334155;font-weight:500}
.docs-item.active{background:#e0f2fe;color:#0369a1;font-weight:600}
.docs-item.locked{color:#94a3b8}
.docs-item .lock{font-size:11px}
.docs-item .free{font-size:9px;font-weight:600;background:#d1fae5;color:#047857;padding:2px 6px;border-radius:9999px;letter-spacing:.04em}
.docs-editor{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:0;backdrop-filter:blur(14px);overflow:hidden;display:flex;flex-direction:column;height:100%}
.docs-toolbar{padding:14px 22px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:#f8fafc}
.docs-toolbar h2{font-family:var(--font-poppins);font-size:18px;margin:0;font-weight:600;color:#020617}
.docs-toolbar .actions{display:flex;gap:8px}
.docs-toolbar .a-btn{background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:8px 14px;font-size:12px;font-weight:600;color:#334155;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.docs-toolbar .a-btn.primary{background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border-color:transparent}
.docs-steps{display:flex;padding:12px 22px 0;gap:6px;border-bottom:1px solid #e2e8f0}
.docs-step{padding:8px 14px;border-radius:10px 10px 0 0;font-size:12px;color:#64748b;font-weight:500;cursor:pointer;display:flex;gap:6px;align-items:center}
.docs-step.active{background:#fff;color:#0369a1;font-weight:600;border:1px solid #e2e8f0;border-bottom:1px solid #fff;margin-bottom:-1px}
.docs-step .stnum{width:22px;height:22px;border-radius:9999px;background:#e0f2fe;color:#0369a1;font-family:var(--font-poppins);font-weight:600;font-size:11px;display:flex;align-items:center;justify-content:center}
.docs-step.active .stnum{background:#0369a1;color:#fff}
.docs-body{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0;overflow:hidden}
.docs-form{padding:22px;overflow-y:auto;border-right:1px solid #e2e8f0}
.docs-form label{font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:.12em;font-weight:600;margin-bottom:6px;display:block}
.docs-form input,.docs-form textarea{width:100%;font:inherit;font-size:13px;color:#0f172a;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px 14px;margin-bottom:14px;outline:0}
.docs-form textarea{resize:vertical;min-height:90px;line-height:1.55}
.docs-aitip{background:rgba(224,242,254,.6);border:1px solid #bae6fd;border-radius:14px;padding:14px;display:flex;gap:10px;margin-bottom:14px}
.docs-aitip .ic{width:28px;height:28px;border-radius:9999px;background:#0369a1;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.docs-aitip p{font-size:12.5px;color:#0c4a6e;margin:0;line-height:1.6}
.docs-aitip b{font-family:var(--font-poppins);color:#0369a1}
.docs-preview{padding:22px;overflow-y:auto;background:#fafbfd}
.docs-preview .doc-paper{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;font-size:13px;line-height:1.7;color:#334155;min-height:380px;box-shadow:0 6px 14px rgba(15,23,42,.04)}
.docs-preview .doc-paper h4{font-family:var(--font-poppins);font-size:15px;color:#020617;margin:14px 0 8px;font-weight:600}
.docs-preview .doc-paper p{margin:0 0 10px}
.docs-right{display:flex;flex-direction:column;gap:14px;height:100%;overflow-y:auto}
.score-card{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:18px;backdrop-filter:blur(14px)}
.score-card h4{font-family:var(--font-poppins);font-size:13px;margin:0 0 4px;color:#0f172a;font-weight:600}
.score-card .big{font-family:var(--font-poppins);font-size:48px;font-weight:600;color:#020617;letter-spacing:-0.03em;line-height:1;background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent}
.score-card .small{font-size:11px;color:#64748b}
.score-bars{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.score-bar{display:grid;grid-template-columns:80px 1fr 24px;gap:8px;align-items:center;font-size:11px;color:#475569}
.score-bar .bar{height:6px;background:#e2e8f0;border-radius:9999px;overflow:hidden}
.score-bar .bar i{display:block;height:100%;background:linear-gradient(90deg,#0ea5e9,#2563eb);border-radius:9999px}
.score-bar b{font-family:var(--font-poppins);font-size:11px;color:#0369a1;text-align:right}
.tips-card{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:18px;backdrop-filter:blur(14px)}
.tips-card h4{font-family:var(--font-poppins);font-size:13px;margin:0 0 8px;color:#0f172a;font-weight:600}
.tips-card ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}
.tips-card li{font-size:11.5px;color:#475569;display:flex;gap:6px;line-height:1.5}
.tips-card li::before{content:"✓";color:#10b981;font-weight:600;flex-shrink:0}
`;

/* Inject CSS once */
if (typeof document !== "undefined" && !document.getElementById("webpages-css")) {
  const style = document.createElement("style");
  style.id = "webpages-css";
  style.textContent = webPageCSS;
  document.head.appendChild(style);
}

/* ============================================================
   PAGE 1 — HOME
   ============================================================ */
const WebHome = ({ onNav }) => (
  <div className="page" data-screen-label="Web · Home">
    <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
    <WebNav active="home" onNav={onNav} />

    <header className="container hero-wrap">
      <div>
        <span className="pill-eyebrow"><I.spark size={11} /> NEW — India to Ireland, simplified</span>
        <h1>Good on ya for coming to <em>Ireland</em> 🍀</h1>
        <p className="lede">Guid-On is the only platform built specifically for Indian students moving to Ireland — from your SOP to your IRP, your first day to your first year.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" onClick={() => onNav("register")}>Get Started Free <I.arrowRight /></a>
          <a className="btn btn-secondary" onClick={() => onNav("demo")}><I.play /> Watch the Demo</a>
        </div>
      </div>
      <div className="map-card">
        <svg viewBox="0 0 400 240" style={{ width: "100%" }}>
          <defs>
            <linearGradient id="oc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#dbeafe" /><stop offset="100%" stopColor="#bfdbfe" /></linearGradient>
            <linearGradient id="ind" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fed7aa" /><stop offset="100%" stopColor="#fb923c" /></linearGradient>
            <linearGradient id="ire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#bbf7d0" /><stop offset="100%" stopColor="#22c55e" /></linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#oc)" opacity="0.4" />
          {/* India blob */}
          <path d="M275 90 Q300 70 320 90 Q335 115 325 145 Q310 175 285 175 Q260 170 255 145 Q250 115 275 90 Z" fill="url(#ind)" opacity="0.85" />
          {/* Ireland blob */}
          <path d="M85 65 Q105 55 125 70 Q135 85 130 110 Q120 130 100 130 Q80 125 75 105 Q72 85 85 65 Z" fill="url(#ire)" opacity="0.85" />
          {/* dotted path */}
          <path d="M295 125 Q200 30 105 95" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5,5" fill="none" />
          {/* plane */}
          <g transform="translate(195,55) rotate(-25)">
            <path d="M0 0 L20 -3 L24 -8 L28 -3 L48 0 L28 4 L24 9 L20 4 Z" fill="#0369a1" />
          </g>
          {/* shamrock */}
          <text x="100" y="100" fontSize="22" textAnchor="middle">🍀</text>
          <text x="289" y="135" fontSize="16" textAnchor="middle">🇮🇳</text>
        </svg>
        <div className="map-flags" style={{ left: 24, bottom: 24 }}><span className="pin">🇮🇳</span> India · Delhi → Mumbai → Bengaluru</div>
        <div className="map-flags" style={{ right: 24, top: 24 }}>Ireland · Dublin → Cork → Galway <span className="pin">🇮🇪</span></div>
      </div>
    </header>

    <section className="container">
      <div className="stats-strip">
        <div className="stat"><div className="n">12,000+</div><div className="l">Indian students arrive in Ireland annually</div></div>
        <div className="stat"><div className="n">48 hrs</div><div className="l">Average first-week stress window after landing</div></div>
        <div className="stat"><div className="n">97%</div><div className="l">IRP questions answered correctly by our AI</div></div>
        <div className="stat"><div className="n">€0</div><div className="l">Cost to get started</div></div>
      </div>
    </section>

    <section className="container" style={{ padding: "40px 28px" }}>
      <div className="sec-head">
        <span className="eyebrow">Everything in one place</span>
        <h2>Six tools, one Ireland journey</h2>
        <p>From your first SOP at the kitchen table in Hyderabad to your first day registering for an IRP card in Dublin.</p>
      </div>
      <div className="feat-grid">
        {[
          { ic: I.bot, k: "sky", t: "AI Chatbot", d: "Ask anything — IRP, PPS, banking, health insurance, accommodation. Get verified, Ireland-specific answers instantly. Not generic. Not Google. Guid-On." },
          { ic: I.play, k: "violet", t: "Demo & Walkthrough", d: "New here? Take a 3-minute guided tour of every feature before you even sign up. Three real student scenarios, zero friction." },
          { ic: I.book, k: "emerald", t: "Resource Hub", d: "Every important link, deadline, and government form — verified, curated, and tagged Required / Important / Helpful." },
          { ic: I.trending, k: "amber", t: "Forex Notifier", d: "Track INR/EUR live, set custom rate alerts, and compare Wise vs Revolut vs Remitly in real time." },
          { ic: I.users, k: "rose", t: "Mentor Connect", d: "Get paired with verified Indian students already in Ireland — same journey, same fears, same WhatsApp groups." },
          { ic: I.file, k: "indigo", t: "Document Builder", d: "AI-powered SOP, visa cover letter, reference letters, and 10 more documents. Your first SOP is completely free." }
        ].map((f, i) => (
          <div className="feat-card" key={i} onClick={() => onNav({ "AI Chatbot": "chatbot", "Demo & Walkthrough": "demo", "Resource Hub": "resources", "Forex Notifier": "forex", "Mentor Connect": "mentors", "Document Builder": "docs" }[f.t])}>
            <div className={"ico ico-" + f.k}><f.ic /></div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
            <span className="arrow">Explore →</span>
          </div>
        ))}
      </div>
    </section>

    <section className="container" style={{ padding: "40px 28px" }}>
      <div className="sec-head">
        <span className="eyebrow">Journey timeline</span>
        <h2>We're with you every step</h2>
        <p>From 12 months out to fully thriving in Ireland — Guid-On knows what comes next.</p>
      </div>
      <div className="journey-wrap">
        <div className="journey-grid">
          {[
            { n: 1, when: "12 months out", t: "Planning", d: "SOP builder, university shortlisting, visa checklist, early forex tracking" },
            { n: 2, when: "3 months out", t: "Application", d: "Visa cover letter, financial affidavit, health insurance research" },
            { n: 3, when: "Week 1", t: "Just landed", d: "IRP booking, SIM card, accommodation, Leap card, bank account" },
            { n: 4, when: "Month 1", t: "Settling in", d: "PPS number, GP registration, campus, mentor match, part-time work" },
            { n: 5, when: "Ongoing", t: "Thriving", d: "Forex alerts, internship hunt, community, career in Ireland" }
          ].map((s) => (
            <div className="j-step" key={s.n}>
              <div className="num">{s.n}</div>
              <div className="when">{s.when}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container" style={{ padding: "40px 28px" }}>
      <div className="sec-head">
        <span className="eyebrow">Real students. Real Ireland.</span>
        <h2>From overwhelmed to settled</h2>
      </div>
      <div className="quotes-grid">
        {[
          { stars: 5, body: "I booked my IRP appointment in 20 minutes using the chatbot. I had no idea where to start before Guid-On. It even reminded me to bring my health insurance letter.", n: "Priya N.", w: "MSc Data Analytics · UCD · Kerala", bg: "linear-gradient(135deg,#fde68a,#fb923c)", col: "#7c2d12" },
          { stars: 5, body: "The SOP builder took my score from 58 to 89 after I named a specific TCD module. Got into my first choice. Guid-On literally changed my life before I even landed.", n: "Arjun M.", w: "MSc Finance · TCD · Mumbai", bg: "linear-gradient(135deg,#bae6fd,#3b82f6)", col: "#fff" },
          { stars: 5, body: "The forex alert saved me €45 on a single transfer. Set the target, got the notification two days later. It genuinely pays for itself in one use.", n: "Meena R.", w: "MSc Business Analytics · UCD · Hyderabad", bg: "linear-gradient(135deg,#a7f3d0,#10b981)", col: "#fff" }
        ].map((q, i) => (
          <div className="quote-card" key={i}>
            <Stars n={q.stars} />
            <div className="body">"{q.body}"</div>
            <div className="who">
              <Avatar name={q.n} bg={q.bg} color={q.col} />
              <div><b>{q.n}</b><small>{q.w}</small></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="container cta-band">
      <div className="cta-card">
        <div>
          <h2>Make your move to Ireland easier.<br />Free for the first three weeks.</h2>
          <p>Join students from Mumbai, Chennai, Delhi, Hyderabad, Bangalore, and beyond — all making Ireland home with Guid-On.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn-primary" onClick={() => onNav("register")}>Create My Free Account <I.arrowRight /></a>
            <a className="btn btn-secondary" onClick={() => onNav("demo")}>See the demo</a>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 20, padding: 22, position: "relative", backdropFilter: "blur(12px)" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".18em", color: "rgba(255,255,255,.75)", fontWeight: 600, marginBottom: 6 }}>The first-week starter pack</div>
          <div style={{ fontFamily: "var(--font-poppins)", fontSize: 18, marginBottom: 12, lineHeight: 1.3 }}>12-step IRP checklist · Bank account guide · Indian grocery map</div>
          <div style={{ height: 46, borderRadius: 9999, background: "rgba(255,255,255,.95)", display: "flex", alignItems: "center", padding: "0 6px 0 16px", gap: 8 }}>
            <input placeholder="you@email.com" style={{ flex: 1, border: 0, outline: 0, font: "inherit", fontSize: 14, background: "transparent", color: "#0f172a" }} />
            <button style={{ height: 36, border: 0, borderRadius: 9999, padding: "0 16px", fontWeight: 600, fontSize: 13, background: "linear-gradient(135deg,#0ea5e9,#2563eb)", color: "#fff", cursor: "pointer" }}>Send</button>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", margin: "8px 0 0" }}>No credit card. No commitment. Just clarity.</p>
        </div>
      </div>
    </section>

    <WebFooter onNav={onNav} />
  </div>
);

Object.assign(window, { WebHome });
