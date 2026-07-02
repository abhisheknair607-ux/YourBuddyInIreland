/* ============================================================
   Guid-On — Web pages: Resources Hub, Forex Notifier
   ============================================================ */

/* ============================================================
   PAGE 5 — RESOURCES HUB
   ============================================================ */
const RES_TABS = [
  { id: "visa", t: "Visa & IRP", ic: "🛂", k: "sky" },
  { id: "bank", t: "Banking & Money", ic: "🏦", k: "emerald" },
  { id: "health", t: "Health", ic: "🏥", k: "rose" },
  { id: "housing", t: "Housing", ic: "🏠", k: "amber" },
  { id: "college", t: "College & Admin", ic: "🎓", k: "violet" },
  { id: "transport", t: "Transport", ic: "🚌", k: "indigo" },
  { id: "comm", t: "Community", ic: "🪔", k: "rose" },
  { id: "work", t: "Work & Tax", ic: "💼", k: "emerald" }
];

const RES_DATA = {
  visa: [
    { ic: "🛂", k: "sky", t: "IRP Registration — Dublin", p: "Required", pc: "amber", d: "Book your Irish Residence Permit appointment at the Dublin Registration Office. Must complete within 90 days of arrival.", u: "inis.gov.ie", v: "28 Apr 2026" },
    { ic: "📍", k: "sky", t: "IRP Registration — Outside Dublin", p: "Required", pc: "amber", d: "If based in Limerick, Galway, Cork — registration is handled at your local Garda station. Check the GNIB office list.", u: "inis.gov.ie/gnib-offices", v: "28 Apr 2026" },
    { ic: "🌐", k: "sky", t: "Irish Study Visa — AVATS Portal", p: "Required", pc: "amber", d: "The official online portal for applying for your student visa before you travel. Start here before anything else.", u: "visas.inis.gov.ie", v: "12 Apr 2026" },
    { ic: "📜", k: "sky", t: "Stamp 2 Permissions Explained", p: "Important", pc: "blue", d: "What you can and cannot do on a Stamp 2 visa — including your right to work 20 hours per week during term.", u: "inis.gov.ie/permissions", v: "21 Apr 2026" },
    { ic: "🔄", k: "sky", t: "Visa Renewal Process", p: "Important", pc: "blue", d: "Your IRP card needs renewal before expiry. Find out when, how, and what documents you need to bring.", u: "inis.gov.ie/renewal", v: "06 Apr 2026" },
    { ic: "ℹ️", k: "sky", t: "GNIB Card & Stamp Guide", p: "Helpful", pc: "slate", d: "Plain-English explanation of what your IRP card means, what stamp you'll receive, and what it allows.", u: "citizensinformation.ie", v: "16 Mar 2026" }
  ],
  bank: [
    { ic: "💳", k: "emerald", t: "Revolut Student Account", p: "Required", pc: "amber", d: "Open online in under 5 minutes with no Irish address needed — perfect for your first days.", u: "revolut.com", v: "02 May 2026" },
    { ic: "🏦", k: "emerald", t: "AIB Student Account", p: "Important", pc: "blue", d: "No monthly fees for students. Requires proof of address and student status. Widely accepted across Ireland.", u: "aib.ie/students", v: "30 Apr 2026" },
    { ic: "🏛️", k: "emerald", t: "Bank of Ireland Student", p: "Important", pc: "blue", d: "Widely accepted with a dedicated student package. Requires in-branch visit with ID and address proof.", u: "bankofireland.com", v: "30 Apr 2026" },
    { ic: "💸", k: "emerald", t: "Wise — INR ↔ EUR Transfers", p: "Important", pc: "blue", d: "Consistently the lowest fees for sending money between India and Ireland. Compare every transfer.", u: "wise.com", v: "01 May 2026" }
  ],
  health: [
    { ic: "🏥", k: "rose", t: "Irish Life Health — Student Plans", p: "Required", pc: "amber", d: "One of three main health insurers in Ireland. Required for your IRP appointment. From €500/year.", u: "irishlifehealth.ie", v: "20 Apr 2026" },
    { ic: "🩺", k: "rose", t: "Laya Healthcare — Student Plans", p: "Important", pc: "blue", d: "Laya's Essential Plus plan is popular among international students. Compare before committing.", u: "layahealthcare.ie", v: "20 Apr 2026" },
    { ic: "💊", k: "rose", t: "How to Register with a GP", p: "Required", pc: "amber", d: "You need a GP for minor illness, prescriptions, and referrals. Find one near your campus.", u: "hse.ie/gp-registration", v: "18 Apr 2026" }
  ],
  housing: [
    { ic: "🏠", k: "amber", t: "Daft.ie — Property Listings", p: "Required", pc: "amber", d: "Ireland's main rental site. Set up alerts for your target area and budget — good listings go in hours.", u: "daft.ie", v: "03 May 2026" },
    { ic: "🏘️", k: "amber", t: "University Accommodation Portals", p: "Required", pc: "amber", d: "On-campus housing is heavily oversubscribed. Apply the day you receive your offer letter.", u: "various.ucd.ie/tcd.ie", v: "01 May 2026" },
    { ic: "⚖️", k: "amber", t: "Threshold — Tenant Rights", p: "Important", pc: "blue", d: "Free tenant support organisation. Know your rights before you sign anything.", u: "threshold.ie", v: "22 Apr 2026" }
  ],
  college: [
    { ic: "🎓", k: "violet", t: "Student Card & Timetable", p: "Required", pc: "amber", d: "Your first week involves student ID, college email, and timetable access. Guide per university.", u: "varies by university", v: "12 Apr 2026" },
    { ic: "📚", k: "violet", t: "College Library Access", p: "Helpful", pc: "slate", d: "Full library access including digital resources and databases from anywhere in the world.", u: "varies by university", v: "08 Apr 2026" }
  ],
  transport: [
    { ic: "🚍", k: "indigo", t: "Leap Card — Get & Top Up", p: "Required", pc: "amber", d: "Ireland's public transport card — buses, trains, Luas. Get one at any newsagent or the airport.", u: "leapcard.ie", v: "29 Apr 2026" },
    { ic: "🚇", k: "indigo", t: "Dublin Bus Route Planner", p: "Required", pc: "amber", d: "Plan any journey in Dublin by bus. Real-time arrival times and route maps.", u: "dublinbus.ie", v: "16 Apr 2026" }
  ],
  comm: [
    { ic: "🪔", k: "rose", t: "Indian Community Centres", p: "Important", pc: "blue", d: "Indian cultural centres across Dublin where you'll find events, religious services, and connections.", u: "Guid-On curated", v: "12 Apr 2026" },
    { ic: "🛕", k: "rose", t: "Hindu Temples — Dublin & Cork", p: "Helpful", pc: "slate", d: "Locations and visiting hours for Hindu temples across Dublin, Cork, Limerick, and Galway.", u: "Guid-On curated", v: "01 Apr 2026" },
    { ic: "🛒", k: "rose", t: "Indian Grocery Stores by City", p: "Important", pc: "blue", d: "Curated list — including which stock specific regional ingredients (South Indian, Bengali, Gujarati).", u: "Guid-On curated", v: "02 May 2026" }
  ],
  work: [
    { ic: "💼", k: "emerald", t: "Working on Stamp 2 — Your Rights", p: "Required", pc: "amber", d: "20 hours per week during term, 40 hours during holidays. What's permitted and how to find work.", u: "inis.gov.ie/stamp2-work", v: "24 Apr 2026" },
    { ic: "🆔", k: "emerald", t: "Getting a PPS Number", p: "Required", pc: "amber", d: "Needed to work, pay tax, claim tax credits. Apply at your nearest Intreo centre after your IRP card.", u: "welfare.ie/pps", v: "26 Apr 2026" },
    { ic: "💸", k: "emerald", t: "Revenue — Student Tax Credits", p: "Important", pc: "blue", d: "As a student worker, you may be entitled to claim back tax you've overpaid. Many students miss this.", u: "revenue.ie", v: "10 Apr 2026" }
  ]
};

const PILL_STYLES = {
  amber: { bg: "#fef3c7", c: "#92400e" },
  blue: { bg: "#dbeafe", c: "#1d4ed8" },
  slate: { bg: "#f1f5f9", c: "#475569" }
};

const WebResources = ({ onNav }) => {
  const [tab, setTab] = React.useState("visa");
  const items = RES_DATA[tab];

  return (
    <div className="page" data-screen-label="Web · Resources">
      <div className="blob b1" /><div className="blob b3" />
      <WebNav active="resources" onNav={onNav} />

      <header className="container" style={{ padding: "60px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <span className="pill-eyebrow"><I.book size={11} /> 76 verified links</span>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 44, fontWeight: 600, color: "#020617", letterSpacing: "-0.02em", margin: "14px 0 8px", lineHeight: 1.1 }}>Resource Hub</h1>
            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.6, margin: 0, maxWidth: 580 }}>Every important link, form, and guide for Indian students in Ireland — verified, organised by topic, and stamped with a last-checked date so you know it's current.</p>
          </div>
          <div className="res-search">
            <I.search size={16} />
            <input placeholder="Search visa, IRP, banking…" />
            <kbd style={{ fontFamily: "var(--font-mono)", fontSize: 10, background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "2px 6px", color: "#475569" }}>⌘K</kbd>
          </div>
        </div>
      </header>

      <section className="container" style={{ padding: "24px 28px 80px" }}>
        <div className="res-tabs">
          {RES_TABS.map((t) => (
            <button key={t.id} className={"res-tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
              <span>{t.ic}</span> {t.t}
            </button>
          ))}
        </div>

        <div className="res-grid">
          {items.map((r, i) => {
            const pill = PILL_STYLES[r.pc];
            return (
              <div className="res-card" key={i}>
                <div className="head">
                  <div className={"ico ico-" + r.k} style={{ fontSize: 22 }}>{r.ic}</div>
                  <span style={{ fontSize: 9.5, fontWeight: 600, background: pill.bg, color: pill.c, padding: "4px 10px", borderRadius: 9999, letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{r.p}</span>
                </div>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
                <div className="foot">
                  <span className="verified">Verified · {r.v}</span>
                  <a>Open link <I.arrowRight size={14} /></a>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "var(--font-mono)", marginTop: -8 }}>{r.u}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 48, background: "linear-gradient(135deg,#f0f9ff,#dbeafe)", border: "1px solid #bae6fd", borderRadius: 24, padding: 28, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 6 }}>Missing a link?</div>
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 20, color: "#020617", fontWeight: 600, marginBottom: 4 }}>Suggest a resource for the next batch.</div>
            <div style={{ fontSize: 13, color: "#475569" }}>Every approved link gets a credit to your name in the hub and one month of Guid-On Pro.</div>
          </div>
          <a className="btn btn-primary">Submit a link <I.arrowRight /></a>
        </div>
      </section>

      <WebFooter onNav={onNav} />
    </div>
  );
};

/* ============================================================
   PAGE 6 — FOREX NOTIFIER
   ============================================================ */
const WebForex = ({ onNav }) => {
  const [alertRate, setAlertRate] = React.useState("93.00");
  const [method, setMethod] = React.useState("email");

  return (
    <div className="page" data-screen-label="Web · Forex">
      <div className="blob b1" /><div className="blob b2" />
      <WebNav active="forex" onNav={onNav} />

      <header className="container" style={{ padding: "60px 28px 24px" }}>
        <span className="pill-eyebrow"><I.trending size={11} /> Live · updated every minute</span>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 44, fontWeight: 600, color: "#020617", letterSpacing: "-0.02em", margin: "14px 0 8px", lineHeight: 1.1 }}>Forex Notifier</h1>
        <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.6, margin: 0, maxWidth: 640 }}>Live INR ↔ EUR rates, smart alerts, and live transfer comparison across Wise, Revolut, Remitly, and your bank. Set your target rate, get notified the moment it hits.</p>
      </header>

      <section className="container" style={{ padding: "24px 28px 80px" }}>
        {/* Live rate cards */}
        <div className="fx-hero">
          <div className="fx-card">
            <div className="lbl">EUR → INR · live</div>
            <div className="big">₹90.82</div>
            <div className="sub">1 EUR = ₹90.82</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span className="delta up">▲ +0.12% today</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>7-day high ₹90.95</span>
            </div>
          </div>
          <div className="fx-card">
            <div className="lbl">INR → EUR · live</div>
            <div className="big">€0.0110</div>
            <div className="sub">₹1,000 ≈ €11.01</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span className="delta down">▼ −0.12% today</span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>7-day low €0.01099</span>
            </div>
          </div>
          <div className="fx-card brand-card">
            <div className="lbl">Best service right now</div>
            <div className="big" style={{ display: "flex", alignItems: "baseline", gap: 8 }}>Wise <span style={{ fontSize: 18 }}>★</span></div>
            <div className="sub">Saving ≈ €12.40 vs SBI on a ₹50,000 transfer</div>
            <div style={{ marginTop: 8, fontSize: 11, opacity: 0.85, display: "flex", gap: 10 }}>
              <span>Wise €X</span> <span>•</span> <span>Revolut €Y</span> <span>•</span> <span>Remitly €Z</span>
            </div>
          </div>
        </div>

        {/* Converter + alert */}
        <div className="fx-2col">
          <div className="fx-conv">
            <h3>Quick converter</h3>
            <div className="fx-row">
              <div className="fx-input-blk">
                <div className="lbl">You send</div>
                <div className="val"><span className="flag">🇮🇳</span><input defaultValue="50,000" /><span style={{ fontSize: 16, color: "#64748b" }}>INR</span></div>
              </div>
              <button className="fx-swap"><I.swap /></button>
              <div className="fx-input-blk">
                <div className="lbl">They get</div>
                <div className="val"><span className="flag">🇮🇪</span><span>551.00</span><span style={{ fontSize: 16, color: "#64748b" }}>EUR</span></div>
              </div>
            </div>
            <div className="fx-save">
              <div><b>Via Wise:</b> €551.00 (after €3.40 fee)</div>
              <div><b>Via SBI Wire:</b> €538.60 (after €15 fee)</div>
              <div style={{ color: "#15803d", fontWeight: 700 }}>You save: €12.40</div>
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 10 }}>Indicative — actual rate depends on time of transfer and provider. Always confirm at the provider before sending.</div>
          </div>

          <div className="fx-alert">
            <h3>Set a rate alert</h3>
            <div>
              <label style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600, marginBottom: 6, display: "block" }}>Alert me when 1 EUR =</label>
              <div className="field">
                <span style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 600, color: "#020617" }}>₹</span>
                <input value={alertRate} onChange={(e) => setAlertRate(e.target.value)} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>current: ₹90.82</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600, marginBottom: 6, display: "block" }}>Notify me via</label>
              <div className="radio-row">
                {[{ id: "email", t: "Email", ic: I.mail }, { id: "whatsapp", t: "WhatsApp", ic: I.whatsapp }, { id: "push", t: "Push", ic: I.bell2 }].map((r) => (
                  <div key={r.id} className={"radio" + (method === r.id ? " on" : "")} onClick={() => setMethod(r.id)}>
                    <r.ic /> {r.t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600, marginBottom: 6, display: "block" }}>Amount you plan to transfer</label>
              <div className="field"><span style={{ fontFamily: "var(--font-poppins)", fontSize: 16, color: "#64748b" }}>₹</span><input defaultValue="100,000" /></div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Set my alert <I.arrowRight /></button>
            <div style={{ fontSize: 11.5, color: "#94a3b8" }}>Free plan: 1 active alert. Pro: 5.</div>
          </div>
        </div>

        {/* History */}
        <div className="sec-head" style={{ textAlign: "left", marginBottom: 14 }}>
          <span className="eyebrow">Last 7 days</span>
          <h2 style={{ fontSize: 24 }}>Rate history</h2>
        </div>
        <div className="fx-table">
          <table>
            <thead><tr><th>Date</th><th>1 EUR = INR</th><th>Daily change</th><th>Best service</th><th>Action</th></tr></thead>
            <tbody>
              {[
                { d: "Today · 02 May", r: "90.82", c: "+0.08", cu: true, b: "Wise", st: true },
                { d: "Yesterday · 01 May", r: "90.74", c: "−0.21", cu: false, b: "Wise", st: false },
                { d: "30 Apr", r: "90.95", c: "+0.33", cu: true, b: "Revolut", st: true },
                { d: "29 Apr", r: "90.62", c: "−0.14", cu: false, b: "Wise", st: false },
                { d: "28 Apr", r: "90.76", c: "+0.52", cu: true, b: "Wise", st: true },
                { d: "27 Apr", r: "90.24", c: "−0.38", cu: false, b: "Remitly", st: false },
                { d: "26 Apr", r: "90.62", c: "+0.19", cu: true, b: "Wise", st: false }
              ].map((r, i) => (
                <tr key={i} className={r.st ? "star-row" : ""}>
                  <td>{r.d}</td>
                  <td style={{ fontFamily: "var(--font-poppins)", fontWeight: 600, color: "#020617" }}>₹{r.r}</td>
                  <td><span className={"delta " + (r.cu ? "up" : "down")}>{r.cu ? "▲" : "▼"} {r.c}%</span></td>
                  <td><b>{r.b}</b> {r.st && <span style={{ color: "#f59e0b" }}>★</span>}</td>
                  <td><a style={{ color: "#0369a1", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Transfer →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Service comparison */}
        <div className="sec-head" style={{ textAlign: "left", marginTop: 36, marginBottom: 14 }}>
          <span className="eyebrow">Transfer service comparison</span>
          <h2 style={{ fontSize: 24 }}>Wise vs Revolut vs Remitly vs your bank</h2>
        </div>
        <div className="fx-table">
          <table>
            <thead><tr><th>Service</th><th>Rate today</th><th>Fees on ₹50,000</th><th>Transfer time</th><th>Best for</th></tr></thead>
            <tbody>
              <tr className="star-row"><td><b>Wise</b> <span style={{ color: "#f59e0b" }}>★ Recommended</span></td><td>Mid-market</td><td>≈ €3–4</td><td>1–2 business days</td><td>Best overall rate</td></tr>
              <tr><td><b>Revolut</b></td><td>Mid-market</td><td>Free up to limit · then small fee</td><td>Instant to minutes</td><td>Speed & convenience</td></tr>
              <tr><td><b>Remitly</b></td><td>Slightly below mid-market</td><td>Varies by speed</td><td>Minutes to 1 day</td><td>Fast delivery options</td></tr>
              <tr><td><b>Western Union</b></td><td>Below mid-market</td><td>Higher fee</td><td>Minutes</td><td>Cash pickup option</td></tr>
              <tr><td><b>SBI Wire</b></td><td>Well below mid-market</td><td>₹500+ plus SWIFT fee</td><td>2–5 days</td><td>If required by family</td></tr>
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="sec-head" style={{ textAlign: "left", marginTop: 36, marginBottom: 14 }}>
          <span className="eyebrow">Money sense</span>
          <h2 style={{ fontSize: 24 }}>Three things we wish someone told us</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {[
            { t: "Best time to transfer", body: "Historically, rates are slightly better mid-week. Avoid Friday afternoons — Indian banks close for the weekend and fees creep up.", c: "linear-gradient(135deg,#f0f9ff,#dbeafe)", bc: "#bae6fd" },
            { t: "The hidden bank fee", body: "Your Indian bank charges a SWIFT fee before money even reaches Wise. SBI/HDFC takes ₹300–1,000 per transfer. Confirm upfront.", c: "linear-gradient(135deg,#fef3c7,#fde68a)", bc: "#fde047" },
            { t: "Don't go all-in at once", body: "Breaking a ₹3 lakh transfer into 2 or 3 over different days reduces your exposure to rate volatility. Set 2 alerts at different targets.", c: "linear-gradient(135deg,#d1fae5,#a7f3d0)", bc: "#86efac" }
          ].map((tip, i) => (
            <div key={i} style={{ background: tip.c, border: `1px solid ${tip.bc}`, borderRadius: 20, padding: 22 }}>
              <div style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600, color: "#020617", marginBottom: 6 }}>{tip.t}</div>
              <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      </section>

      <WebFooter onNav={onNav} />
    </div>
  );
};

Object.assign(window, { WebResources, WebForex });
