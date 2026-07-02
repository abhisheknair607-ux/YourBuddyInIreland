/* ============================================================
   Guid-On — Mobile screens 5–8: Resources, Forex, Mentors, Doc Builder
   ============================================================ */

const mobileCSS2 = `
/* RESOURCES */
.m-res-hero{padding:54px 18px 12px;background:rgba(255,255,255,.78);backdrop-filter:blur(14px);border-bottom:1px solid rgba(226,232,240,.7);position:sticky;top:0;z-index:30}
.m-res-hero .crumb{font-size:10px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:.18em}
.m-res-hero h1{font-family:var(--font-poppins);font-size:22px;margin:4px 0 8px;color:#020617;font-weight:600;letter-spacing:-0.01em;line-height:1.18}
.m-res-search{margin:8px 0 0;height:38px;border-radius:9999px;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;gap:8px;padding:0 14px}
.m-res-search input{flex:1;border:0;outline:0;font:inherit;font-size:12px;background:transparent;color:#0f172a}
.m-res-tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 14px;scrollbar-width:none;background:rgba(255,255,255,.5);border-bottom:1px solid rgba(226,232,240,.7);position:sticky;top:124px;z-index:25}
.m-res-tabs::-webkit-scrollbar{display:none}
.m-res-tab{flex-shrink:0;display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:9999px;font-size:11px;font-weight:500;background:#fff;border:1px solid #e2e8f0;color:#475569}
.m-res-tab.on{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent}
.m-res-list{padding:14px;display:flex;flex-direction:column;gap:10px;position:relative;z-index:2}
.m-res-card{background:rgba(255,255,255,.92);border:1px solid #f1f5f9;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 6px 18px rgba(15,23,42,.05)}
.m-res-card .head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.m-res-card .ico{width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.m-res-card h3{font-family:var(--font-poppins);font-size:13px;font-weight:600;color:#020617;margin:0 0 2px;line-height:1.3}
.m-res-card p{font-size:11.5px;color:#475569;line-height:1.5;margin:0}
.m-res-card .foot{display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px dashed #e2e8f0;font-size:10.5px;color:#94a3b8}
.m-res-card .foot a{color:#0369a1;font-weight:600;font-size:11.5px;display:inline-flex;align-items:center;gap:3px}
.m-res-pill{font-size:9px;font-weight:600;padding:3px 8px;border-radius:9999px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}

/* FOREX */
.m-fx-hero{padding:54px 18px 0;position:relative;z-index:2}
.m-fx-hero .crumb{font-size:10px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:.18em}
.m-fx-hero h1{font-family:var(--font-poppins);font-size:22px;margin:4px 0 6px;color:#020617;font-weight:600;letter-spacing:-0.01em;line-height:1.18}
.m-fx-hero p{font-size:12px;color:#475569;line-height:1.55;margin:0 0 14px}
.m-fx-rate-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.m-fx-rate{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:14px;box-shadow:0 6px 18px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:6px}
.m-fx-rate.brand{background:linear-gradient(135deg,#0369a1,#2563eb 60%,#4338ca);border-color:transparent;color:#fff}
.m-fx-rate .lbl{font-size:9.5px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.14em}
.m-fx-rate.brand .lbl{color:rgba(255,255,255,.7)}
.m-fx-rate .big{font-family:var(--font-poppins);font-size:24px;font-weight:600;color:#020617;letter-spacing:-0.02em;line-height:1}
.m-fx-rate.brand .big{color:#fff}
.m-fx-rate .delta{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600;padding:3px 8px;border-radius:9999px;align-self:flex-start}
.m-fx-rate .delta.up{background:#d1fae5;color:#047857}
.m-fx-rate .delta.down{background:#fee2e2;color:#b91c1c}
.m-fx-rate.brand .save{font-size:11px;color:rgba(255,255,255,.85)}
.m-fx-conv{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px;margin:14px 18px;box-shadow:0 6px 18px rgba(15,23,42,.05);position:relative;z-index:2}
.m-fx-conv h3{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#020617;margin:0 0 12px;letter-spacing:-0.01em}
.m-fx-conv .blk{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:10px 14px;margin-bottom:8px}
.m-fx-conv .blk .lbl{font-size:9.5px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.14em}
.m-fx-conv .blk .val{font-family:var(--font-poppins);font-size:18px;font-weight:600;color:#020617;display:flex;align-items:center;gap:6px}
.m-fx-conv .blk .val input{font:inherit;border:0;outline:0;background:transparent;flex:1;width:100%;letter-spacing:-0.01em}
.m-fx-swap{width:32px;height:32px;border-radius:9999px;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:#fff;border:0;display:flex;align-items:center;justify-content:center;margin:-4px auto;position:relative;z-index:5}
.m-fx-save-row{background:#ecfdf5;border:1px solid #bbf7d0;border-radius:10px;padding:10px 12px;font-size:11.5px;color:#065f46;display:flex;flex-direction:column;gap:3px;margin-top:6px}
.m-fx-save-row b{font-weight:700;color:#15803d}
.m-fx-alert{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px;margin:0 18px 14px;box-shadow:0 6px 18px rgba(15,23,42,.05);position:relative;z-index:2}
.m-fx-alert h3{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#020617;margin:0 0 10px;letter-spacing:-0.01em}
.m-fx-alert label{font-size:9.5px;color:#475569;font-weight:600;text-transform:uppercase;letter-spacing:.14em;margin:6px 0 4px;display:block}
.m-fx-alert .field{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:9px 12px;display:flex;align-items:center;gap:6px;font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#020617}
.m-fx-alert .field input{flex:1;border:0;outline:0;background:transparent;font:inherit}
.m-fx-alert .methods{display:flex;gap:5px}
.m-fx-alert .methods .m{flex:1;padding:7px;border-radius:8px;border:1.5px solid #e2e8f0;background:#fff;font-size:10.5px;color:#334155;font-weight:500;text-align:center;display:flex;align-items:center;justify-content:center;gap:4px}
.m-fx-alert .methods .m.on{border-color:#0369a1;background:#e0f2fe;color:#0369a1;font-weight:600}
.m-fx-history{background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:14px;margin:0 18px 14px;box-shadow:0 6px 18px rgba(15,23,42,.05);position:relative;z-index:2}
.m-fx-history h3{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#020617;margin:0 0 10px;letter-spacing:-0.01em}
.m-fx-history .hd{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:6px 8px;background:#f8fafc;border-radius:8px;font-size:9.5px;color:#475569;font-weight:600;text-transform:uppercase;letter-spacing:.12em}
.m-fx-history .row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:8px;font-size:11px;color:#334155;border-bottom:1px solid #f1f5f9;align-items:center}
.m-fx-history .row:last-child{border:0}
.m-fx-history .row b{font-family:var(--font-poppins);color:#020617}

/* MENTORS */
.m-ment-hero{padding:54px 18px 12px;position:sticky;top:0;z-index:30;background:rgba(255,255,255,.85);backdrop-filter:blur(14px);border-bottom:1px solid rgba(226,232,240,.7)}
.m-ment-hero h1{font-family:var(--font-poppins);font-size:22px;margin:4px 0 6px;color:#020617;font-weight:600;letter-spacing:-0.01em}
.m-ment-hero p{font-size:11.5px;color:#475569;line-height:1.5;margin:0}
.m-ment-filter{display:flex;gap:6px;overflow-x:auto;padding:10px 14px;scrollbar-width:none;background:rgba(255,255,255,.6);border-bottom:1px solid rgba(226,232,240,.7)}
.m-ment-filter::-webkit-scrollbar{display:none}
.m-ment-filter .chip{flex-shrink:0;padding:6px 12px;border-radius:9999px;font-size:11px;font-weight:500;background:#fff;border:1px solid #e2e8f0;color:#475569}
.m-ment-filter .chip.on{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent}
.m-ment-list{padding:14px;display:flex;flex-direction:column;gap:10px;position:relative;z-index:2}
.m-ment-card{background:rgba(255,255,255,.92);border:1px solid #f1f5f9;border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:0 6px 18px rgba(15,23,42,.05)}
.m-ment-card .head{display:flex;gap:10px;align-items:flex-start}
.m-ment-card .ava-w{position:relative;flex-shrink:0}
.m-ment-card h3{font-family:var(--font-poppins);font-size:14px;font-weight:600;color:#020617;margin:0;letter-spacing:-0.01em;line-height:1.2}
.m-ment-card .meta{font-size:11px;color:#64748b;margin-top:2px;line-height:1.4}
.m-ment-card .loc{font-size:10px;color:#0369a1;font-weight:600;margin-top:3px}
.m-ment-card .on-dot{position:absolute;bottom:0;right:0;width:12px;height:12px;border-radius:9999px;background:#10b981;border:2px solid #fff}
.m-ment-card .stats{display:flex;justify-content:space-between;font-size:10.5px;color:#475569;padding:8px 0;border-top:1px dashed #e2e8f0;border-bottom:1px dashed #e2e8f0}
.m-ment-card .stats b{font-family:var(--font-poppins);color:#020617}
.m-ment-card .tags{display:flex;flex-wrap:wrap;gap:4px}
.m-ment-card .tag{font-size:10px;background:#f0f9ff;color:#0369a1;border-radius:9999px;padding:3px 8px;font-weight:500}
.m-ment-card .bio{font-size:11.5px;color:#475569;line-height:1.5;margin:0;font-style:italic}
.m-ment-card .cta{background:linear-gradient(135deg,#0ea5e9,#2563eb 60%,#4f46e5);color:#fff;border:0;border-radius:9999px;padding:9px;font-weight:600;font-size:12px;cursor:pointer;box-shadow:0 6px 14px rgba(59,130,246,.22);display:flex;align-items:center;justify-content:center;gap:4px}

/* DOCS */
.m-docs-shell{display:flex;flex-direction:column;height:100%}
.m-docs-top{padding:54px 14px 10px;background:rgba(255,255,255,.85);backdrop-filter:blur(14px);border-bottom:1px solid rgba(226,232,240,.7);display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:25}
.m-docs-top .info{flex:1;min-width:0}
.m-docs-top .crumb{font-size:9.5px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:.18em}
.m-docs-top h1{font-family:var(--font-poppins);font-size:15px;margin:1px 0 0;color:#020617;font-weight:600;letter-spacing:-0.01em}
.m-docs-score-pill{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #bbf7d0;border-radius:9999px;padding:5px 11px;display:flex;align-items:center;gap:5px;font-size:10.5px;color:#047857;font-weight:600}
.m-docs-score-pill b{font-family:var(--font-poppins);font-size:13px;color:#15803d}
.m-docs-steps{display:flex;gap:6px;overflow-x:auto;padding:10px 14px;background:rgba(255,255,255,.5);border-bottom:1px solid rgba(226,232,240,.7);scrollbar-width:none}
.m-docs-steps::-webkit-scrollbar{display:none}
.m-docs-step{flex-shrink:0;padding:6px 10px;font-size:10.5px;font-weight:500;border-radius:9999px;background:#fff;border:1px solid #e2e8f0;color:#475569;display:inline-flex;align-items:center;gap:5px}
.m-docs-step .stnum{width:18px;height:18px;border-radius:9999px;background:#e0f2fe;color:#0369a1;font-family:var(--font-poppins);font-weight:600;font-size:10px;display:flex;align-items:center;justify-content:center}
.m-docs-step.on{background:linear-gradient(135deg,#0369a1,#2563eb);color:#fff;border-color:transparent}
.m-docs-step.on .stnum{background:rgba(255,255,255,.25);color:#fff}
.m-docs-body{flex:1;overflow-y:auto;padding:14px 18px;position:relative;z-index:2}
.m-docs-body label{font-size:9.5px;color:#475569;font-weight:600;text-transform:uppercase;letter-spacing:.14em;display:block;margin:14px 0 6px}
.m-docs-body textarea{width:100%;font:inherit;font-size:12.5px;color:#0f172a;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px 12px;outline:0;line-height:1.55;resize:vertical;min-height:80px}
.m-docs-tip{background:rgba(224,242,254,.6);border:1px solid #bae6fd;border-radius:12px;padding:10px 12px;display:flex;gap:8px;margin-top:8px}
.m-docs-tip .ic{width:22px;height:22px;border-radius:9999px;background:#0369a1;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:600;font-size:11px;font-family:var(--font-poppins)}
.m-docs-tip p{margin:0;font-size:11px;color:#0c4a6e;line-height:1.55}
.m-docs-tip b{font-family:var(--font-poppins);color:#0369a1}
.m-docs-prev{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-top:14px;font-size:11.5px;line-height:1.7;color:#334155;box-shadow:0 4px 12px rgba(15,23,42,.04)}
.m-docs-prev h4{font-family:var(--font-poppins);font-size:13px;color:#020617;margin:10px 0 6px;font-weight:600}
.m-docs-prev p{margin:0 0 8px}
.m-docs-foot{padding:10px 14px 28px;background:rgba(255,255,255,.95);border-top:1px solid rgba(226,232,240,.7);display:flex;gap:8px;position:sticky;bottom:0;z-index:20}
`;

if (typeof document !== "undefined" && !document.getElementById("mobile-pages-2-css")) {
  const st = document.createElement("style");
  st.id = "mobile-pages-2-css";
  st.textContent = mobileCSS2;
  document.head.appendChild(st);
}

/* ============================================================
   5 — RESOURCES (mobile)
   ============================================================ */
const M_RES = {
  visa: [
    { ic: "🛂", k: "sky", t: "IRP Registration — Dublin", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "Book your IRP appointment at the Dublin Registration Office. Must complete within 90 days of arrival.", u: "inis.gov.ie", v: "28 Apr 2026" },
    { ic: "🌐", k: "sky", t: "AVATS Portal — Student Visa", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "Official online portal for applying for your Irish student visa before you travel.", u: "visas.inis.gov.ie", v: "12 Apr 2026" },
    { ic: "📜", k: "sky", t: "Stamp 2 Work Rights", p: "Important", pc: { bg: "#dbeafe", c: "#1d4ed8" }, d: "20 hours per week during term, 40 hours in holidays. What's permitted and what's not.", u: "inis.gov.ie/permissions", v: "21 Apr 2026" }
  ],
  bank: [
    { ic: "💳", k: "emerald", t: "Revolut Student Account", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "Open in 5 minutes with no Irish address. Perfect for your first days.", u: "revolut.com", v: "02 May 2026" },
    { ic: "🏦", k: "emerald", t: "AIB Student Account", p: "Important", pc: { bg: "#dbeafe", c: "#1d4ed8" }, d: "No monthly fees for students. Widely accepted across Ireland.", u: "aib.ie/students", v: "30 Apr 2026" },
    { ic: "💸", k: "emerald", t: "Wise — INR ↔ EUR", p: "Important", pc: { bg: "#dbeafe", c: "#1d4ed8" }, d: "Consistently lowest fees for INR/EUR transfers. Compare every time.", u: "wise.com", v: "01 May 2026" }
  ],
  health: [
    { ic: "🏥", k: "rose", t: "Irish Life — Student Plans", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "Required for your IRP appointment. From €500/year for students.", u: "irishlifehealth.ie", v: "20 Apr 2026" },
    { ic: "💊", k: "rose", t: "How to Register with a GP", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "You need a GP for minor illness, prescriptions, and referrals.", u: "hse.ie/gp-registration", v: "18 Apr 2026" }
  ],
  housing: [
    { ic: "🏠", k: "amber", t: "Daft.ie — Property Listings", p: "Required", pc: { bg: "#fef3c7", c: "#92400e" }, d: "Ireland's main rental site. Set up alerts and check daily — good listings go in hours.", u: "daft.ie", v: "03 May 2026" },
    { ic: "⚖️", k: "amber", t: "Threshold — Tenant Rights", p: "Important", pc: { bg: "#dbeafe", c: "#1d4ed8" }, d: "Free tenant support organisation. Know your rights before signing anything.", u: "threshold.ie", v: "22 Apr 2026" }
  ]
};
const M_RES_TABS = [
  { id: "visa", t: "Visa & IRP", ic: "🛂" },
  { id: "bank", t: "Banking", ic: "🏦" },
  { id: "health", t: "Health", ic: "🏥" },
  { id: "housing", t: "Housing", ic: "🏠" },
  { id: "college", t: "College", ic: "🎓" },
  { id: "transport", t: "Transport", ic: "🚌" },
  { id: "comm", t: "Community", ic: "🪔" },
  { id: "work", t: "Work & Tax", ic: "💼" }
];

const MResources = () => {
  const [tab, setTab] = React.useState("visa");
  const items = M_RES[tab] || [];

  return (
    <Phone>
      <div className="m-res-hero">
        <div className="crumb">76 verified links · updated weekly</div>
        <h1>Resource Hub</h1>
        <div className="m-res-search"><I.search size={14} /><input placeholder="Search visa, IRP, banking…" /></div>
      </div>
      <div className="m-res-tabs">
        {M_RES_TABS.map((t) => (
          <button key={t.id} className={"m-res-tab" + (tab === t.id ? " on" : "")} onClick={() => setTab(t.id)}>
            <span>{t.ic}</span> {t.t}
          </button>
        ))}
      </div>
      <div className="m-res-list">
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8", fontSize: 12 }}>This category is being curated — check back soon, or try Visa & IRP.</div>
        )}
        {items.map((r, i) => (
          <div className="m-res-card" key={i}>
            <div className="head">
              <div className={"ico ico-" + r.k}>{r.ic}</div>
              <span className="m-res-pill" style={{ background: r.pc.bg, color: r.pc.c }}>{r.p}</span>
            </div>
            <h3>{r.t}</h3>
            <p>{r.d}</p>
            <div className="foot">
              <span>Verified · {r.v}</span>
              <a>Open <I.arrowRight size={12} /></a>
            </div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "var(--font-mono)" }}>{r.u}</div>
          </div>
        ))}
      </div>
      <MTabBar active="resources" />
    </Phone>
  );
};

/* ============================================================
   6 — FOREX (mobile)
   ============================================================ */
const MForexM = () => {
  const [alertRate, setAlertRate] = React.useState("93.00");
  const [method, setMethod] = React.useState("email");

  return (
    <Phone>
      <MTopBar title="Forex Notifier" sub="Live INR ↔ EUR · updated" light />
      <div className="m-fx-hero">
        <div className="crumb">📈 Live · updated every minute</div>
        <h1>Best rate, every time.</h1>
        <p>Live INR ↔ EUR rates, target alerts, and live transfer comparison.</p>
      </div>
      <section className="m-section" style={{ paddingTop: 0 }}>
        <div className="m-fx-rate-row">
          <div className="m-fx-rate">
            <div className="lbl">EUR → INR</div>
            <div className="big">₹90.82</div>
            <span className="delta up">▲ +0.12% today</span>
          </div>
          <div className="m-fx-rate brand">
            <div className="lbl">Best service now</div>
            <div className="big">Wise ★</div>
            <div className="save">Save €12.40 vs SBI on ₹50,000</div>
          </div>
        </div>
      </section>

      <div className="m-fx-conv">
        <h3>Quick converter</h3>
        <div className="blk">
          <div className="lbl">You send</div>
          <div className="val"><span>🇮🇳</span><input defaultValue="50,000" /><span style={{ fontSize: 12, color: "#64748b" }}>INR</span></div>
        </div>
        <button className="m-fx-swap"><I.swap size={14} /></button>
        <div className="blk">
          <div className="lbl">They get</div>
          <div className="val"><span>🇮🇪</span><span>551.00</span><span style={{ fontSize: 12, color: "#64748b" }}>EUR</span></div>
        </div>
        <div className="m-fx-save-row">
          <div><b>Via Wise:</b> €551.00 (after €3.40 fee)</div>
          <div><b>Via SBI Wire:</b> €538.60 (after €15 fee)</div>
          <div style={{ color: "#15803d", fontWeight: 700, fontSize: 12 }}>You save: €12.40</div>
        </div>
      </div>

      <div className="m-fx-alert">
        <h3>Set a rate alert</h3>
        <label>Alert me when 1 EUR =</label>
        <div className="field"><span>₹</span><input value={alertRate} onChange={(e) => setAlertRate(e.target.value)} /></div>
        <label>Notify via</label>
        <div className="methods">
          {[{ id: "email", t: "Email" }, { id: "whatsapp", t: "WhatsApp" }, { id: "push", t: "Push" }].map((m) => (
            <div key={m.id} className={"m" + (method === m.id ? " on" : "")} onClick={() => setMethod(m.id)}>{m.t}</div>
          ))}
        </div>
        <label>Amount you plan to send</label>
        <div className="field"><span>₹</span><input defaultValue="100,000" /></div>
        <button className="m-btn-primary" style={{ width: "100%", marginTop: 10 }}>Set my alert →</button>
      </div>

      <div className="m-fx-history">
        <h3>Last 7 days</h3>
        <div className="hd"><span>Date</span><span>Rate</span><span>Best</span></div>
        {[
          { d: "Today", r: "90.82", c: "+0.08%", b: "Wise ★", u: true },
          { d: "1 May", r: "90.74", c: "−0.21%", b: "Wise", u: false },
          { d: "30 Apr", r: "90.95", c: "+0.33%", b: "Revolut", u: true },
          { d: "29 Apr", r: "90.62", c: "−0.14%", b: "Wise", u: false },
          { d: "28 Apr", r: "90.76", c: "+0.52%", b: "Wise", u: true },
          { d: "27 Apr", r: "90.24", c: "−0.38%", b: "Remitly", u: false }
        ].map((r, i) => (
          <div key={i} className="row">
            <span>{r.d}</span>
            <b>₹{r.r} <span style={{ fontSize: 9, color: r.u ? "#10b981" : "#ef4444", fontWeight: 500 }}>{r.c}</span></b>
            <span>{r.b}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 18px 18px" }}>
        <div style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)", border: "1px solid #fde047", borderRadius: 14, padding: 14 }}>
          <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#020617", marginBottom: 4 }}>💡 The hidden bank fee</div>
          <div style={{ fontSize: 11.5, color: "#7c2d12", lineHeight: 1.55 }}>Your Indian bank charges a SWIFT fee before money even reaches Wise. SBI/HDFC takes ₹300–1,000 per transfer. Confirm upfront.</div>
        </div>
      </div>

      <MTabBar active="forex" />
    </Phone>
  );
};

/* ============================================================
   7 — MENTORS (mobile)
   ============================================================ */
const M_MENTORS = [
  { n: "Priya Nair", c: "MSc DA · UCD · Year 2", h: "Kerala", r: 5, s: 24, rt: "2h", tags: ["IRP", "UCD", "Accom"], bio: "I went through the whole IRP process — I can walk you through every step including slot timing.", bg: "linear-gradient(135deg,#fde68a,#fb923c)", col: "#7c2d12", on: true },
  { n: "Ananya Krishnan", c: "PhD CS · DCU · Year 3", h: "Chennai", r: 5, s: 41, rt: "1h", tags: ["PhD", "Community", "Groceries"], bio: "Ask me about Indian grocery shops across Dublin, Tamil community groups, and PhD life.", bg: "linear-gradient(135deg,#a7f3d0,#10b981)", col: "#fff", on: true },
  { n: "Sneha Iyer", c: "LLM Law · TCD · Year 1", h: "Bangalore", r: 5, s: 8, rt: "2h", tags: ["Legal", "Women's safety", "Visa"], bio: "I help women students navigate safety, accommodation, and your rights as an international student.", bg: "linear-gradient(135deg,#fbcfe8,#ec4899)", col: "#fff", on: true },
  { n: "Vikram Patel", c: "MSc SE · UL · Year 2", h: "Gujarat", r: 4, s: 16, rt: "3h", tags: ["Limerick", "Transport", "Health"], bio: "Based in Limerick — happy to advise on health insurance and Leap card system.", bg: "linear-gradient(135deg,#ddd6fe,#8b5cf6)", col: "#fff", on: false }
];

const MMentors = () => (
  <Phone>
    <div className="m-ment-hero">
      <div className="m-eyebrow">47 verified mentors</div>
      <h1>Mentor Connect</h1>
      <p>Verified Indian students already in Ireland — same journey, same fears.</p>
    </div>
    <div className="m-ment-filter">
      {["All", "UCD", "TCD", "DCU", "UL", "Galway"].map((u, i) => (
        <span key={u} className={"chip" + (i === 0 ? " on" : "")}>{u}</span>
      ))}
    </div>
    <div className="m-ment-list">
      {M_MENTORS.map((m, i) => (
        <div className="m-ment-card" key={i}>
          <div className="head">
            <div className="ava-w">
              <Avatar name={m.n} bg={m.bg} color={m.col} size={44} />
              {m.on && <span className="on-dot" />}
            </div>
            <div style={{ flex: 1 }}>
              <h3>{m.n}</h3>
              <div className="meta">{m.c}</div>
              <div className="loc">📍 {m.h}</div>
            </div>
          </div>
          <div className="stats">
            <span><Stars n={m.r} /></span>
            <span><b>{m.s}</b> sessions</span>
            <span>~{m.rt} reply</span>
          </div>
          <div className="tags">
            {m.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
          </div>
          <p className="bio">"{m.bio}"</p>
          <button className="cta">Connect with {m.n.split(" ")[0]} <I.arrowRight size={12} /></button>
        </div>
      ))}
    </div>
    <MTabBar active="mentors" />
  </Phone>
);

/* ============================================================
   8 — DOC BUILDER (mobile)
   ============================================================ */
const MDocs = () => {
  const [step, setStep] = React.useState(3);
  const steps = ["Background", "Motivation", "Goals", "Why Ireland", "Review"];

  return (
    <Phone>
      <div className="m-docs-shell">
        <div className="m-docs-top">
          <button style={{ width: 30, height: 30, border: 0, background: "transparent", color: "#475569" }}><I.back /></button>
          <div className="info">
            <div className="crumb">Document builder · MSc Finance, TCD</div>
            <h1>Statement of Purpose</h1>
          </div>
          <div className="m-docs-score-pill"><b>89</b>/100</div>
        </div>

        <div className="m-docs-steps">
          {steps.map((s, i) => (
            <div key={i} className={"m-docs-step" + (i === step ? " on" : "")} onClick={() => setStep(i)}>
              <span className="stnum">{i + 1}</span> {s}
            </div>
          ))}
        </div>

        <div className="m-docs-body">
          {step < 4 && (
            <>
              <div style={{ fontSize: 10, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 6 }}>Step {step + 1} of 5</div>
              <div style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600, color: "#020617", marginBottom: 8 }}>{steps[step]}</div>

              {step === 0 && (
                <>
                  <label>Your academic background</label>
                  <textarea rows="5" defaultValue="BITS Pilani · Computer Science · CGPA 8.2 · 2021. Final-year thesis on credit-risk model interpretability supervised by Dr. R. Iyer." />
                  <div className="m-docs-tip">
                    <div className="ic">i</div>
                    <p><b>AI Tip:</b> Mention CGPA only if above 7.5/10. Irish unis focus more on experience than grades.</p>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <label>What sparked your interest?</label>
                  <textarea rows="5" defaultValue="At HDFC Bank as a Risk Analyst, I built a fraud-detection ensemble that reduced false positives by 23%. The under-banked customers I worked with pushed me toward one question I couldn't shake…" />
                  <div className="m-docs-tip">
                    <div className="ic">i</div>
                    <p><b>AI Tip:</b> A specific anecdote beats general passion. Admissions read 200+ SOPs.</p>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <label>Short-term goal (0–2 years)</label>
                  <textarea rows="3" placeholder="What role/company are you targeting after graduation?" />
                  <div className="m-docs-tip">
                    <div className="ic">i</div>
                    <p><b>AI Tip:</b> Name one Irish company. Shows you've researched the market.</p>
                  </div>
                  <label>Long-term vision (5+ years)</label>
                  <textarea rows="3" placeholder="Leadership? Entrepreneurship? Returning to India?" />
                </>
              )}
              {step === 3 && (
                <>
                  <label>Why this programme + Ireland?</label>
                  <textarea rows="6" defaultValue="TCD's MSc Finance is the only programme that pairs the Financial Derivatives module with Prof. O'Sullivan's responsible quantitative finance research — the exact intersection my thesis pointed toward. Ireland's Third Level Graduate Scheme gives me 24 months to contribute." />
                  <div className="m-docs-tip">
                    <div className="ic">i</div>
                    <p><b>AI Tip:</b> Naming the specific module added <b>+11 points</b> to your score.</p>
                  </div>
                </>
              )}

              <div className="m-docs-prev">
                <div style={{ textAlign: "right", fontSize: 10, color: "#94a3b8" }}>Aarav Sharma · 02 May 2026</div>
                <h4>Preview</h4>
                <p>{step === 0 && "BITS Pilani · Computer Science · CGPA 8.2 · 2021. Final-year thesis on credit-risk model interpretability supervised by Dr. R. Iyer."}{step === 1 && "At HDFC Bank as a Risk Analyst, I built a fraud-detection ensemble that reduced false positives by 23%…"}{step === 2 && "I'm targeting risk analytics roles at Stripe Ireland or Revolut after graduation, with the goal of leading a credit-risk team at a European fintech within 5 years…"}{step === 3 && "TCD's MSc Finance is the only programme that pairs the Financial Derivatives module with Prof. O'Sullivan's research…"}</p>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "1px solid #bbf7d0", borderRadius: 14, padding: 14, display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "var(--font-poppins)", fontSize: 32, fontWeight: 700, color: "#047857" }}>89</div>
                <div>
                  <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#065f46" }}>Strong · ready to submit</div>
                  <div style={{ fontSize: 11, color: "#10b981", marginTop: 2 }}>↑ +31 from draft 1</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { sec: "Background", s: 17, top: 20 },
                  { sec: "Motivation", s: 19, top: 20 },
                  { sec: "Goals", s: 13, top: 20, hint: "Name a Irish company you'd target" },
                  { sec: "Why Ireland", s: 22, top: 20 },
                  { sec: "Uniqueness", s: 18, top: 20 }
                ].map((s, i) => (
                  <div key={i} style={{ background: s.hint ? "#fef3c7" : "#fff", border: `1px solid ${s.hint ? "#fde047" : "#e2e8f0"}`, borderRadius: 10, padding: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{s.sec}</span>
                      <span style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 600, color: s.hint ? "#92400e" : "#0369a1" }}>{s.s}/{s.top}</span>
                    </div>
                    {s.hint && <div style={{ fontSize: 10.5, color: "#92400e", marginTop: 3 }}>↑ {s.hint}</div>}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                <button className="m-btn-secondary" style={{ fontSize: 11.5, padding: 9 }}><I.copy size={12} /> Copy</button>
                <button className="m-btn-primary" style={{ fontSize: 11.5, padding: 9 }}><I.download size={12} /> PDF</button>
              </div>
            </>
          )}
        </div>

        <div className="m-docs-foot">
          <button className="m-btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} style={{ flex: 0, padding: "10px 14px", fontSize: 12 }}>←</button>
          <button className="m-btn-primary" onClick={() => setStep(Math.min(4, step + 1))} style={{ flex: 1, fontSize: 12 }}>
            {step === 4 ? "Finish →" : "Next →"}
          </button>
        </div>
      </div>
    </Phone>
  );
};

Object.assign(window, { MResources, MForexM, MMentors, MDocs });
