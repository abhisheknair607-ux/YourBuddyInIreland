/* ============================================================
   Guid-On — Mobile screens 1–4: Home, Demo, Chatbot, Register
   ============================================================ */

const mobileCSS1 = `
/* Phone shell (re-used across all 8) */
.iphone-shell{width:390px;height:780px;border-radius:54px;background:#0a0a0a;padding:14px;box-shadow:0 24px 70px rgba(15,23,42,.25);position:relative;flex-shrink:0;overflow:hidden}
.iphone-screen{width:100%;height:100%;border-radius:42px;overflow:hidden;background:#fff;position:relative}
.iphone-island{position:absolute;top:14px;left:50%;transform:translateX(-50%);width:118px;height:34px;background:#000;border-radius:20px;z-index:50;pointer-events:none}
.iphone-home-bar{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:130px;height:5px;border-radius:3px;background:rgba(255,255,255,.7);z-index:40}
.m-app{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;background:radial-gradient(circle at top,rgba(255,255,255,.85),transparent 35%),linear-gradient(180deg,#fdfefe 0%,#f5f9ff 45%,#eef5ff 100%);-webkit-overflow-scrolling:touch}
.m-app::-webkit-scrollbar{display:none}
.m-app{scrollbar-width:none}
.m-blob{position:absolute;border-radius:9999px;filter:blur(60px);pointer-events:none;z-index:0}
.m-blob.b1{left:-20%;top:-2%;width:80%;height:24%;background:rgba(125,211,252,.5)}
.m-blob.b2{right:-30%;top:30%;width:90%;height:24%;background:rgba(199,210,254,.5)}
.m-blob.b3{left:10%;bottom:-15%;width:90%;height:30%;background:rgba(165,243,252,.35)}

.m-top{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:10px;padding:54px 14px 10px;border-bottom:1px solid rgba(226,232,240,.7);background:rgba(255,255,255,.78);backdrop-filter:blur(14px)}
.m-top .iconbtn{width:36px;height:36px;border-radius:12px;border:1px solid #e2e8f0;background:#fff;display:flex;align-items:center;justify-content:center;color:#475569;flex-shrink:0}
.m-top .brand-blk{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1}
.m-top .brand-blk .name{font-family:var(--font-poppins);font-weight:700;font-size:15px;color:#0f172a;letter-spacing:-0.01em}
.m-top .brand-blk .tag{font-size:9.5px;color:#64748b;margin-top:2px}
.m-pillbtn{font-size:11px;font-weight:600;color:#fff;background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);border:0;border-radius:9999px;padding:7px 12px;box-shadow:0 6px 14px rgba(59,130,246,.28);display:inline-flex;align-items:center;gap:3px;cursor:pointer}
.m-pillbtn.ghost{background:#fff;border:1px solid #e2e8f0;color:#334155;box-shadow:none}

.m-section{position:relative;z-index:2;padding:22px 18px}
.m-eyebrow{font-size:10px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:.22em;display:block;margin-bottom:6px}
.m-h2{font-family:var(--font-poppins);font-size:20px;margin:0 0 6px;font-weight:600;color:#020617;letter-spacing:-0.01em;line-height:1.18}
.m-section p.lede{font-size:12.5px;color:#475569;line-height:1.55;margin:0}

/* HOMEPAGE */
.m-hero{position:relative;z-index:2;padding:22px 18px 8px}
.m-hero-eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:9999px;padding:5px 10px;font-size:10px;font-weight:600;color:#0369a1;text-transform:uppercase;letter-spacing:.16em;margin-bottom:14px}
.m-h1{font-family:var(--font-poppins);font-size:28px;font-weight:600;letter-spacing:-0.02em;line-height:1.08;margin:0 0 10px;color:#020617}
.m-h1 em{font-style:normal;background:linear-gradient(135deg,#0ea5e9,#2563eb,#4f46e5);-webkit-background-clip:text;background-clip:text;color:transparent}
.m-lead{font-size:13.5px;color:#475569;line-height:1.55;margin:0 0 14px}
.m-hero-actions{display:flex;gap:8px;margin-bottom:16px}
.m-btn-primary{flex:1;font:inherit;font-weight:600;font-size:12.5px;background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);color:#fff;border:0;border-radius:9999px;padding:11px;box-shadow:0 8px 20px rgba(59,130,246,.28);cursor:pointer}
.m-btn-secondary{flex:1;font:inherit;font-weight:600;font-size:12.5px;background:#fff;color:#334155;border:1px solid #e2e8f0;border-radius:9999px;padding:11px;cursor:pointer}
.m-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:12px;background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);border-radius:18px;backdrop-filter:blur(12px);margin-bottom:18px}
.m-trust>div{text-align:center}
.m-trust b{font-family:var(--font-poppins);font-size:15px;color:#020617;display:block;line-height:1;background:linear-gradient(135deg,#0ea5e9,#2563eb);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:700}
.m-trust span{font-size:9px;color:#64748b;display:block;margin-top:4px;line-height:1.3}

.m-feat-stack{display:flex;flex-direction:column;gap:10px}
.m-feat-card{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:flex-start;background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:14px;box-shadow:0 6px 18px rgba(15,23,42,.05)}
.m-feat-card .ico{width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.m-feat-card h3{font-family:var(--font-poppins);font-size:13.5px;margin:0 0 3px;font-weight:600;color:#020617}
.m-feat-card p{font-size:11px;color:#64748b;line-height:1.5;margin:0}
.ico-sky{background:#e0f2fe;color:#0369a1}
.ico-emerald{background:#d1fae5;color:#047857}
.ico-amber{background:#fef3c7;color:#b45309}
.ico-violet{background:#ede9fe;color:#6d28d9}
.ico-rose{background:#ffe4e6;color:#be123c}
.ico-indigo{background:#e0e7ff;color:#4338ca}

.m-journey-mini{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:16px 14px;backdrop-filter:blur(20px);box-shadow:0 6px 18px rgba(15,23,42,.05)}
.m-journey-mini ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;position:relative}
.m-journey-mini ol::before{content:"";position:absolute;left:18px;top:6px;bottom:6px;width:2px;background:linear-gradient(180deg,#bae6fd,#c7d2fe);z-index:0}
.m-journey-mini li{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:flex-start;position:relative;z-index:1}
.m-journey-mini .num{width:38px;height:38px;border-radius:9999px;background:#fff;border:2px solid #bae6fd;color:#0369a1;font-family:var(--font-poppins);font-weight:600;display:flex;align-items:center;justify-content:center;font-size:12.5px;box-shadow:0 4px 10px rgba(15,23,42,.06)}
.m-journey-mini li.done .num{background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border-color:transparent}
.m-journey-mini .ttl{font-family:var(--font-poppins);font-size:12.5px;font-weight:600;color:#0f172a}
.m-journey-mini .sub{font-size:10.5px;color:#64748b;margin-top:1px;line-height:1.4}

.m-cta-band{margin:0 18px;background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);border-radius:22px;padding:20px;color:#fff;box-shadow:0 18px 40px rgba(56,132,255,.28);position:relative;overflow:hidden}
.m-cta-band::before{content:"";position:absolute;right:-30%;top:-50%;width:120%;height:200%;background:radial-gradient(ellipse at center,rgba(255,255,255,.18),transparent 60%);pointer-events:none}
.m-cta-band h3{font-family:var(--font-poppins);font-size:18px;font-weight:600;margin:0 0 6px;letter-spacing:-0.01em;line-height:1.18;position:relative}
.m-cta-band p{font-size:12px;color:rgba(255,255,255,.85);margin:0 0 12px;line-height:1.5;position:relative}
.m-cta-band .m-btn-primary{background:#fff;color:#0369a1;box-shadow:none}

.m-tabbar{position:sticky;bottom:0;z-index:25;display:flex;justify-content:space-around;align-items:center;padding:8px 8px 26px;background:rgba(255,255,255,.95);border-top:1px solid rgba(226,232,240,.7);backdrop-filter:blur(14px)}
.m-tab{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:9px;color:#94a3b8;font-weight:500;padding:4px 6px;border-radius:10px;cursor:pointer}
.m-tab .tic{width:20px;height:20px;display:flex;align-items:center;justify-content:center}
.m-tab.active{color:#0369a1}
.m-tab.active .tic{color:#0369a1}

/* DEMO */
.m-demo-tabs{display:flex;gap:6px;overflow-x:auto;padding:0 0 10px;scrollbar-width:none}
.m-demo-tabs::-webkit-scrollbar{display:none}
.m-demo-step{flex-shrink:0;padding:7px 12px;font-size:11px;font-weight:600;border-radius:9999px;background:#fff;border:1px solid #e2e8f0;color:#475569}
.m-demo-step.on{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent}
.m-demo-stage{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:16px;box-shadow:0 6px 18px rgba(15,23,42,.05)}
.m-demo-stage h3{font-family:var(--font-poppins);font-size:16px;font-weight:600;color:#020617;margin:0 0 6px;letter-spacing:-0.01em}
.m-demo-stage .body{font-size:12px;color:#475569;line-height:1.55;margin-bottom:12px}
.m-demo-mock{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:12px;font-size:11px;color:#334155;display:flex;flex-direction:column;gap:8px}
.m-scen-card{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px;margin-bottom:10px;box-shadow:0 6px 18px rgba(15,23,42,.04)}
.m-scen-card .head{display:flex;gap:10px;align-items:flex-start}
.m-scen-card .head .ico{width:34px;height:34px;border-radius:11px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.m-scen-card h4{font-family:var(--font-poppins);font-size:13px;font-weight:600;margin:0;color:#020617;line-height:1.3}
.m-scen-card .who{font-size:10.5px;color:#64748b;margin-top:2px}
.m-scen-card .steps{font-size:12px;color:#334155;line-height:1.55;display:flex;flex-direction:column;gap:6px;padding-top:6px;border-top:1px dashed #e2e8f0}
.m-scen-card .steps .ln{display:flex;gap:8px;align-items:flex-start}
.m-scen-card .steps .ln span{font-family:var(--font-poppins);font-weight:600;color:#0369a1;flex-shrink:0;font-size:11px}
.m-plans{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 6px 18px rgba(15,23,42,.04)}
.m-plans .row{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:8px;align-items:center;font-size:11.5px;color:#334155;padding:6px 8px;border-radius:8px}
.m-plans .row.hd{font-family:var(--font-poppins);font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#475569;background:#f8fafc}
.m-plans .row .pro-cell{font-weight:600;color:#0369a1}

/* CHATBOT */
.m-chat-shell{display:flex;flex-direction:column;height:100%}
.m-chat-bar{display:flex;align-items:center;gap:10px;padding:54px 14px 12px;border-bottom:1px solid rgba(226,232,240,.7);background:rgba(255,255,255,.85);backdrop-filter:blur(14px);position:relative;z-index:5}
.m-chat-bar .av{width:36px;height:36px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb,#4f46e5);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:15px}
.m-chat-bar .info{flex:1;min-width:0}
.m-chat-bar .info h2{font-family:var(--font-poppins);font-size:13.5px;margin:0;font-weight:600;color:#020617}
.m-chat-bar .info .st{font-size:9.5px;color:#10b981;font-weight:600;display:flex;align-items:center;gap:4px;margin-top:2px}
.m-chat-bar .info .st::before{content:"";width:5px;height:5px;border-radius:9999px;background:#10b981}
.m-chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;position:relative;z-index:3}
.m-msg{display:flex;gap:8px;align-items:flex-end}
.m-msg.user{justify-content:flex-end}
.m-bubble{max-width:80%;padding:10px 13px;border-radius:18px;font-size:12.5px;line-height:1.5;box-shadow:0 6px 18px rgba(15,23,42,.06)}
.m-bubble.assistant{background:#fff;border:1px solid #e2e8f0;color:#334155;border-bottom-left-radius:5px}
.m-bubble.user{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border-bottom-right-radius:5px}
.m-bubble .src{display:inline-block;font-size:8px;font-weight:600;letter-spacing:.16em;color:#0369a1;text-transform:uppercase;background:#e0f2fe;border:1px solid #bae6fd;padding:2px 6px;border-radius:9999px;margin-bottom:5px}
.m-bubble .chk{margin-top:8px;background:linear-gradient(135deg,#f8fafc,#f0f9ff);border:1px solid #e2e8f0;border-radius:10px;padding:8px 10px}
.m-bubble .chk .lbl{font-size:9px;font-weight:600;color:#0369a1;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}
.m-bubble .chk ul{margin:0;padding-left:14px;font-size:11.5px;color:#334155;line-height:1.6}
.m-bubble .meta{font-size:9px;color:#94a3b8;margin-top:4px}
.m-suggest{padding:0 14px 8px;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
.m-suggest::-webkit-scrollbar{display:none}
.m-suggest .chip{flex-shrink:0;font-size:10.5px;color:#0369a1;background:#fff;border:1px solid #bae6fd;border-radius:9999px;padding:6px 11px;font-weight:500;white-space:nowrap}
.m-composer{padding:8px 14px 14px;border-top:1px solid rgba(226,232,240,.7);background:rgba(255,255,255,.85);backdrop-filter:blur(12px);position:relative;z-index:5}
.m-composer .box{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:8px 8px 8px 14px;display:flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(15,23,42,.05)}
.m-composer .box input{flex:1;border:0;outline:0;font:inherit;font-size:12.5px;background:transparent;color:#0f172a}
.m-composer .ic-btn{width:32px;height:32px;border-radius:9999px;background:transparent;border:0;color:#64748b;display:flex;align-items:center;justify-content:center}
.m-composer .send{width:36px;height:36px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border:0;display:flex;align-items:center;justify-content:center}
.m-msg-counter{font-size:10px;color:#64748b;text-align:center;margin-top:6px}
.m-msg-counter b{color:#0369a1}

/* REGISTER */
.m-reg-shell{display:flex;flex-direction:column;height:100%}
.m-reg-hero{padding:64px 18px 18px;background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);color:#fff;position:relative;overflow:hidden}
.m-reg-hero::before{content:"";position:absolute;right:-30%;top:-30%;width:80%;height:80%;background:radial-gradient(circle,rgba(255,255,255,.2),transparent 60%);pointer-events:none}
.m-reg-hero .crumb{font-size:10px;font-weight:600;color:rgba(255,255,255,.8);text-transform:uppercase;letter-spacing:.2em;margin-bottom:6px;position:relative}
.m-reg-hero h1{font-family:var(--font-poppins);font-size:24px;font-weight:600;margin:0 0 8px;letter-spacing:-0.01em;line-height:1.15;position:relative}
.m-reg-hero p{font-size:12.5px;color:rgba(255,255,255,.8);margin:0;line-height:1.55;position:relative}
.m-reg-body{flex:1;overflow-y:auto;padding:20px 18px 90px;background:linear-gradient(180deg,#fdfefe 0%,#f5f9ff 100%)}
.m-reg-steps{display:flex;gap:6px;margin-bottom:16px}
.m-reg-steps i{flex:1;height:4px;border-radius:9999px;background:#e2e8f0}
.m-reg-steps i.active{background:linear-gradient(90deg,#0ea5e9,#2563eb)}
.m-reg-body h2{font-family:var(--font-poppins);font-size:18px;font-weight:600;margin:0 0 6px;color:#020617;letter-spacing:-0.01em}
.m-reg-body .sub{font-size:12px;color:#64748b;margin:0 0 18px}
.m-reg-body label{font-size:10px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:.14em;display:block;margin:14px 0 6px}
.m-reg-body .input{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:11px 14px;display:flex;align-items:center;gap:10px;font-size:13px;color:#0f172a}
.m-reg-body .input input,.m-reg-body .input select{flex:1;border:0;outline:0;font:inherit;font-size:13px;background:transparent}
.m-reg-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.m-reg-tile{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:12px;text-align:center;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:11.5px}
.m-reg-tile.on{border-color:#0369a1;background:#e0f2fe}
.m-reg-tile .ic{font-size:20px}
.m-reg-tile b{font-family:var(--font-poppins);font-size:11.5px;color:#0f172a;line-height:1.2}
.m-reg-chips{display:flex;flex-wrap:wrap;gap:6px}
.m-reg-chips .chip{background:#fff;border:1.5px solid #e2e8f0;border-radius:9999px;padding:7px 12px;font-size:11px;color:#475569;font-weight:500;cursor:pointer}
.m-reg-chips .chip.on{background:#0369a1;color:#fff;border-color:#0369a1}
.m-reg-cta{position:absolute;left:0;right:0;bottom:0;padding:12px 18px 30px;background:linear-gradient(180deg,transparent,#fff 30%);display:flex;gap:8px;z-index:20}
`;

if (typeof document !== "undefined" && !document.getElementById("mobile-pages-1-css")) {
  const st = document.createElement("style");
  st.id = "mobile-pages-1-css";
  st.textContent = mobileCSS1;
  document.head.appendChild(st);
}

/* iPhone shell wrapper */
const Phone = ({ children }) => (
  <div className="iphone-shell">
    <div className="iphone-island" />
    <div className="iphone-screen">
      <div className="m-app">
        <div className="m-blob b1" />
        <div className="m-blob b2" />
        <div className="m-blob b3" />
        {children}
      </div>
    </div>
    <div className="iphone-home-bar" />
  </div>
);

const MTopBar = ({ title, sub, light }) => (
  <div className="m-top" style={light ? { background: "transparent", borderBottom: "0" } : {}}>
    <button className="iconbtn"><I.menu /></button>
    <div className="brand-blk">
      <div className="name">{title || "Guid-On 🍀"}</div>
      <div className="tag">{sub || "India → Ireland · We've got ya."}</div>
    </div>
    <button className="m-pillbtn">Sign up</button>
  </div>
);

const MTabBar = ({ active }) => (
  <div className="m-tabbar">
    {[
      { id: "home", t: "Home", ic: I.house },
      { id: "resources", t: "Hub", ic: I.book },
      { id: "chatbot", t: "Chat", ic: I.bot },
      { id: "forex", t: "Forex", ic: I.trending },
      { id: "mentors", t: "Mentors", ic: I.users }
    ].map((tb) => (
      <div key={tb.id} className={"m-tab" + (active === tb.id ? " active" : "")}>
        <div className="tic"><tb.ic size={20} /></div>
        {tb.t}
      </div>
    ))}
  </div>
);

/* ============================================================
   1 — HOME (mobile)
   ============================================================ */
const MHome = () => (
  <Phone>
    <MTopBar />
    <section className="m-hero">
      <span className="m-hero-eyebrow"><I.spark size={10} /> 🇮🇳 → 🇮🇪 Student platform</span>
      <h1 className="m-h1">Good on ya for coming to <em>Ireland</em> 🍀</h1>
      <p className="m-lead">Your AI-powered companion for every step of the India → Ireland student journey. Visa to GP, in your pocket.</p>
      <div className="m-hero-actions">
        <button className="m-btn-primary">Get Started Free</button>
        <button className="m-btn-secondary"><I.play size={10} /> Demo</button>
      </div>
      <div className="m-trust">
        <div><b>12K+</b><span>students/yr</span></div>
        <div><b>48hr</b><span>stress window</span></div>
        <div><b>97%</b><span>IRP accuracy</span></div>
        <div><b>€0</b><span>to start</span></div>
      </div>
    </section>

    <section className="m-section">
      <span className="m-eyebrow">Everything in one place</span>
      <h2 className="m-h2">Six tools, one Ireland journey</h2>
      <p className="lede" style={{ marginBottom: 14 }}>From your first SOP to your first day in Dublin.</p>
      <div className="m-feat-stack">
        {[
          { ic: I.bot, k: "sky", t: "AI Chatbot", d: "IRP, PPS, banking — verified Ireland-specific answers." },
          { ic: I.book, k: "emerald", t: "Resource Hub", d: "76 verified links, deadlines, and forms in one place." },
          { ic: I.trending, k: "amber", t: "Forex Notifier", d: "Live INR/EUR rates and smart alerts. Never lose to a bad rate." },
          { ic: I.users, k: "rose", t: "Mentor Connect", d: "Talk to a verified Indian student already in Ireland." },
          { ic: I.file, k: "indigo", t: "Doc Builder", d: "SOP, visa letters, references — first one's free." }
        ].map((f, i) => (
          <div className="m-feat-card" key={i}>
            <div className={"ico ico-" + f.k}><f.ic size={18} /></div>
            <div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="m-section">
      <span className="m-eyebrow">Your journey</span>
      <h2 className="m-h2">We're with you every step</h2>
      <div className="m-journey-mini" style={{ marginTop: 12 }}>
        <ol>
          {[
            { n: 1, t: "Planning", s: "12 months out · SOP & shortlist", done: true },
            { n: 2, t: "Application", s: "3 months out · visa & docs", done: true },
            { n: 3, t: "Just landed", s: "Week 1 · IRP, SIM, bank", done: false, on: true },
            { n: 4, t: "Settling in", s: "Month 1 · PPS, GP, campus", done: false },
            { n: 5, t: "Thriving", s: "Ongoing · community & career", done: false }
          ].map((s) => (
            <li key={s.n} className={s.done ? "done" : ""}>
              <div className="num">{s.done ? <I.check size={16} /> : s.n}</div>
              <div>
                <div className="ttl">{s.t}</div>
                <div className="sub">{s.s}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="m-section">
      <div className="m-cta-band">
        <h3>Make your move easier.<br />Free for the first three weeks.</h3>
        <p>Join students from Mumbai, Chennai, Delhi, Hyderabad — all making Ireland home with Guid-On.</p>
        <button className="m-btn-primary" style={{ width: "100%" }}>Create My Free Account →</button>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.7)", margin: "8px 0 0", position: "relative" }}>No credit card. No commitment.</p>
      </div>
    </section>

    <div style={{ height: 24 }} />
    <MTabBar active="home" />
  </Phone>
);

/* ============================================================
   2 — DEMO (mobile)
   ============================================================ */
const MDemo = () => {
  const [step, setStep] = React.useState(2);
  const steps = [
    { t: "Personalised dashboard", d: "Tell us where you are — we build the right checklist for right now." },
    { t: "AI chatbot", d: "Trained on Irish gov sources — gives Ireland-specific verified answers, not generic ones." },
    { t: "Doc builder", d: "Five-step SOP wizard with AI tips and a live strength score. First doc free." },
    { t: "Resource hub", d: "Every important link, tagged Required / Important / Helpful." },
    { t: "Forex notifier", d: "Set a target rate. Get notified when it hits. Save €40 per transfer." },
    { t: "Mentor connect", d: "Talk to a verified Indian student who did this exact thing 8 months ago." }
  ];

  return (
    <Phone>
      <div className="m-top">
        <button className="iconbtn"><I.back /></button>
        <div className="brand-blk">
          <div className="name" style={{ fontSize: 13 }}>Walkthrough</div>
          <div className="tag">3 min · no signup</div>
        </div>
        <button className="m-pillbtn ghost">Skip</button>
      </div>

      <section className="m-section">
        <span className="m-hero-eyebrow"><I.play size={10} /> Interactive Tour</span>
        <h1 className="m-h1" style={{ fontSize: 22 }}>See Guid-On in <em>action</em></h1>
        <p className="m-lead">A guided tour of everything the platform does — from your first SOP to your first month settled.</p>

        <div className="m-demo-tabs" style={{ marginTop: 14 }}>
          {steps.map((s, i) => (
            <div key={i} className={"m-demo-step" + (i === step ? " on" : "")} onClick={() => setStep(i)}>Step {i + 1}</div>
          ))}
        </div>
        <div className="m-demo-stage">
          <div style={{ fontSize: 10, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 6 }}>Step {step + 1} of 6</div>
          <h3>{steps[step].t}</h3>
          <div className="body">{steps[step].d}</div>
          <div className="m-demo-mock">
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 600, color: "#020617" }}>Just landed</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>6 tasks · 3 days into your stay</div>
            {["Book IRP appointment · 🛂", "Get Irish SIM card · ✓ Done", "Open Revolut account · ✓ Done", "Buy health insurance · in progress"].map((t, i) => (
              <div key={i} style={{ fontSize: 11, padding: "6px 8px", background: i < 2 ? "#fff" : "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 8, color: "#334155" }}>{t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="m-btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} style={{ padding: 9, fontSize: 11.5 }}>← Back</button>
            <button className="m-btn-primary" onClick={() => setStep(Math.min(5, step + 1))} style={{ padding: 9, fontSize: 11.5 }}>Next →</button>
          </div>
        </div>
      </section>

      <section className="m-section" style={{ paddingTop: 0 }}>
        <span className="m-eyebrow">Three real journeys</span>
        <h2 className="m-h2" style={{ marginBottom: 14 }}>Day-by-day, real students</h2>
        {[
          { ic: I.plane, t: "I just landed at Dublin Airport", who: "Riya, 23 · UCD MSc Computer Science · Kochi → Dublin", lines: [["1", "Opens chatbot, asks what to do first"], ["2", "Books IRP appointment in 20 min"], ["3", "Connects with Priya from Kerala"]] },
          { ic: I.file, t: "I'm writing my SOP in Mumbai", who: "Arjun, 25 · TCD MSc Finance · 3-week deadline", lines: [["1", "Starts wizard — score 58"], ["2", "Names TCD module — score 79"], ["3", "Submits & gets offer in 3 weeks"]] }
        ].map((s, i) => (
          <div className="m-scen-card" key={i}>
            <div className="head">
              <div className="ico"><s.ic size={16} /></div>
              <div>
                <h4>{s.t}</h4>
                <div className="who">{s.who}</div>
              </div>
            </div>
            <div className="steps">
              {s.lines.map(([n, t], j) => <div key={j} className="ln"><span>{n}</span>{t}</div>)}
            </div>
          </div>
        ))}
      </section>

      <section className="m-section" style={{ paddingTop: 0 }}>
        <span className="m-eyebrow">Free vs Pro</span>
        <h2 className="m-h2" style={{ marginBottom: 12 }}>Free covers the first week.</h2>
        <div className="m-plans">
          <div className="row hd"><span>Feature</span><span>Free</span><span style={{ color: "#0369a1" }}>Pro €9.99</span></div>
          {[
            ["AI Chatbot", "10/day", "Unlimited"],
            ["Doc Builder", "SOP only", "All 14 docs"],
            ["Forex alerts", "1", "5"],
            ["Mentor messages", "Browse", "3/week"],
            ["PDF + Word", "—", "Both"]
          ].map((r, i) => (
            <div key={i} className="row">
              <span style={{ color: "#0f172a", fontWeight: 500 }}>{r[0]}</span>
              <span>{r[1]}</span>
              <span className="pro-cell">{r[2]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="m-section" style={{ paddingTop: 6 }}>
        <div className="m-cta-band">
          <h3>Ready to make your move easier?</h3>
          <p>No credit card. No commitment. Just clarity.</p>
          <button className="m-btn-primary" style={{ width: "100%" }}>Create My Free Account →</button>
        </div>
      </section>
      <div style={{ height: 30 }} />
    </Phone>
  );
};

/* ============================================================
   3 — CHATBOT (mobile)
   ============================================================ */
const MChatbot = () => (
  <Phone>
    <div className="m-chat-shell">
      <div className="m-chat-bar">
        <button style={{ width: 32, height: 32, border: 0, background: "transparent", color: "#475569" }}><I.back /></button>
        <div className="av">🤖</div>
        <div className="info">
          <h2>Guid-On Assistant</h2>
          <div className="st">Online · trained on Irish gov sources</div>
        </div>
        <button style={{ width: 32, height: 32, border: 0, background: "transparent", color: "#475569" }}><I.menu /></button>
      </div>

      <div className="m-chat-msgs">
        <div className="m-msg">
          <div className="m-bubble assistant">
            <span className="src">Welcome</span><br />
            <b>Vanakkam!</b> 👋 I'm trained for Indian students coming to Ireland. Ask me anything about IRP, PPS, banking, health insurance, accommodation — or anything else you need to settle in.
          </div>
        </div>
        <div className="m-msg user">
          <div className="m-bubble user">How do I book my IRP appointment?</div>
        </div>
        <div className="m-msg">
          <div className="m-bubble assistant">
            <span className="src">Verified · 4 sources · inis.gov.ie</span><br />
            <b>IRP is your most urgent task after landing.</b> Book at <b>inis.gov.ie</b> — Dublin Registration Office. Slots open at 9am daily and fill within minutes.
            <div className="chk">
              <div className="lbl">What to bring</div>
              <ul>
                <li>Valid passport</li>
                <li>Original offer letter</li>
                <li>Proof of Irish address</li>
                <li>Private health insurance</li>
                <li><b>€300 by card only</b></li>
              </ul>
            </div>
            <div className="meta">⏱ Must register within 90 days of arrival</div>
          </div>
        </div>
        <div className="m-msg user">
          <div className="m-bubble user">Can I open a bank account without an Irish address?</div>
        </div>
        <div className="m-msg">
          <div className="m-bubble assistant">
            <span className="src">Verified · 2 sources</span><br />
            Open <b>Revolut</b> first — passport only, no Irish address. Once you have a college letter as address proof, open <b>AIB</b> or <b>BOI</b> for a local IBAN.
          </div>
        </div>
      </div>

      <div className="m-suggest">
        {["How do I get a PPS number?", "Stamp 2 work rights?", "Indian groceries in Dublin?", "Best SIM for students?"].map((c, i) => (
          <span key={i} className="chip">{c}</span>
        ))}
      </div>

      <div className="m-composer">
        <div className="box">
          <button className="ic-btn"><I.clip /></button>
          <input placeholder="Ask anything about Ireland…" />
          <button className="ic-btn"><I.mic /></button>
          <button className="send"><I.send size={16} /></button>
        </div>
        <div className="m-msg-counter"><b>7</b> of 10 free messages remaining · <span style={{ color: "#0369a1", fontWeight: 600 }}>Upgrade for unlimited</span></div>
      </div>
    </div>
  </Phone>
);

/* ============================================================
   4 — REGISTER (mobile)
   ============================================================ */
const MRegister = () => {
  const [step, setStep] = React.useState(1);
  const [situation, setSituation] = React.useState("arriving");
  const [worries, setWorries] = React.useState(["irp", "accom"]);
  const toggle = (id) => setWorries(worries.includes(id) ? worries.filter((x) => x !== id) : [...worries, id]);

  return (
    <Phone>
      <div className="m-reg-shell">
        <div className="m-reg-hero">
          <div className="crumb">Step {step + 1} of 3 · onboarding</div>
          <h1>Your journey starts here.</h1>
          <p>Join thousands of Indian students who made their move smoother with Guid-On.</p>
        </div>

        <div className="m-reg-body">
          <div className="m-reg-steps">
            <i className={step >= 0 ? "active" : ""} />
            <i className={step >= 1 ? "active" : ""} />
            <i className={step >= 2 ? "active" : ""} />
          </div>

          {step === 0 && (
            <>
              <h2>Tell us who you are</h2>
              <p className="sub">We'll set up your account in 30 seconds.</p>
              <label>First name</label>
              <div className="input"><I.user size={14} /><input defaultValue="Aarav" /></div>
              <label>Last name</label>
              <div className="input"><I.user size={14} /><input defaultValue="Sharma" /></div>
              <label>Email</label>
              <div className="input"><I.mail size={14} /><input defaultValue="aarav.sharma@gmail.com" /></div>
              <label>Password</label>
              <div className="input"><I.lock size={14} /><input type="password" defaultValue="••••••••" /></div>
            </>
          )}

          {step === 1 && (
            <>
              <h2>Where are you right now?</h2>
              <p className="sub">We'll personalise your checklist accordingly.</p>
              <label>University in Ireland</label>
              <div className="input">
                <I.grad size={14} />
                <select defaultValue="UCD"><option>UCD · University College Dublin</option><option>TCD · Trinity College Dublin</option><option>UL · University of Limerick</option><option>NUI Galway</option></select>
              </div>
              <label>Course / programme</label>
              <div className="input"><I.book size={14} /><input defaultValue="MSc Data Analytics" /></div>
              <label>Your situation</label>
              <div className="m-reg-tiles">
                {[
                  { id: "landed", ic: "✈️", t: "Just landed" },
                  { id: "arriving", ic: "📅", t: "Arriving in <3 months" },
                  { id: "applying", ic: "📝", t: "Still applying" },
                  { id: "settled", ic: "🎓", t: "Already settled" }
                ].map((t) => (
                  <div key={t.id} className={"m-reg-tile" + (situation === t.id ? " on" : "")} onClick={() => setSituation(t.id)}>
                    <span className="ic">{t.ic}</span>
                    <b>{t.t}</b>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>What worries you most?</h2>
              <p className="sub">Pick anything that matches — we'll surface the right resources first.</p>
              <label>Top worries</label>
              <div className="m-reg-chips">
                {[
                  { id: "irp", t: "IRP Registration" },
                  { id: "accom", t: "Accommodation" },
                  { id: "bank", t: "Banking" },
                  { id: "health", t: "Health insurance" },
                  { id: "work", t: "Finding work" },
                  { id: "friends", t: "Making friends" },
                  { id: "food", t: "Indian food" },
                  { id: "money", t: "Sending money home" }
                ].map((w) => (
                  <span key={w.id} className={"chip" + (worries.includes(w.id) ? " on" : "")} onClick={() => toggle(w.id)}>{w.t}</span>
                ))}
              </div>
              <label>Home state in India · optional</label>
              <div className="input"><I.mapPin size={14} /><input defaultValue="Maharashtra" /></div>
              <label>Heard about us from</label>
              <div className="input">
                <I.users size={14} />
                <select><option>Instagram</option><option>A friend</option><option>Reddit</option><option>YouTube</option></select>
              </div>
            </>
          )}
        </div>

        <div className="m-reg-cta">
          <button className="m-btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} style={{ flex: 0, padding: "11px 16px" }}>←</button>
          <button className="m-btn-primary" onClick={() => setStep(Math.min(2, step + 1))} style={{ flex: 1 }}>
            {step === 2 ? "Create my account →" : "Continue →"}
          </button>
        </div>
      </div>
    </Phone>
  );
};

Object.assign(window, { Phone, MTopBar, MTabBar, MHome, MDemo, MChatbot, MRegister });
