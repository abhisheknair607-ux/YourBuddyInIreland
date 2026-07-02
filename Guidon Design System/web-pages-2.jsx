/* ============================================================
   Guid-On — Web pages: Demo, Chatbot, Register
   ============================================================ */

/* ============================================================
   PAGE 2 — DEMO & WALKTHROUGH
   ============================================================ */
const DEMO_STEPS = [
  { n: 1, t: "Your Dashboard", body: "When you sign up and tell us your situation — just landed, arriving soon, still applying — Guid-On builds a personalised priority checklist. The right tasks, in the right order, for exactly where you are in your journey.", screen: "dashboard" },
  { n: 2, t: "AI Chatbot", body: "Unlike generic AI, Guid-On's chatbot is trained specifically on Irish government sources — inis.gov.ie, welfare.ie, revenue.ie. Ask about banking without an address and get the specific, correct answer: Revolut first, then AIB.", screen: "chat" },
  { n: 3, t: "Document Builder", body: "The SOP builder walks you through 5 sections: Background, Motivation, Why This Programme, Career Goals, Why Ireland. Each section has an AI tip, a recommended word count, and a real-time strength score.", screen: "doc" },
  { n: 4, t: "Resource Hub", body: "Every link you'll ever need — tagged Required, Important, or Helpful, linked directly to the official source, with a last-verified date. Switch between tabs: Visa & IRP, Banking, Health, Housing, College.", screen: "resources" },
  { n: 5, t: "Forex Notifier", body: "Set your target rate and get notified by email, WhatsApp, or push notification the moment it's hit. We compare Wise, Revolut, and Remitly live so you always get the best rate.", screen: "forex" },
  { n: 6, t: "Mentor Connect", body: "Filter mentors by university, home state, or topic. Every mentor is a verified Indian student in Ireland with real session reviews. Messages go through the Guid-On platform — no sharing personal contact details.", screen: "ment" }
];

const DemoScreen = ({ kind }) => {
  if (kind === "dashboard") return (
    <div className="demo-screen">
      <div style={{ fontFamily: "var(--font-poppins)", fontSize: 14, fontWeight: 600, color: "#020617" }}>Welcome back, Riya 👋</div>
      <div style={{ fontSize: 11, color: "#64748b" }}>You're in your <b>Just landed</b> phase · 6 tasks remaining</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
        {[
          { t: "Book IRP appointment", k: "Required", c: "#fef3c7", cc: "#92400e", done: false, ic: "🛂" },
          { t: "Get an Irish SIM card", k: "Done", c: "#d1fae5", cc: "#047857", done: true, ic: "📱" },
          { t: "Open a Revolut account", k: "Done", c: "#d1fae5", cc: "#047857", done: true, ic: "💳" },
          { t: "Buy private health insurance", k: "In progress", c: "#dbeafe", cc: "#1d4ed8", done: false, ic: "🏥" },
          { t: "Apply for PPS number", k: "Up next", c: "#f1f5f9", cc: "#475569", done: false, ic: "🆔" }
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 10, padding: "8px 12px" }}>
            <span style={{ fontSize: 16 }}>{t.ic}</span>
            <div style={{ flex: 1, fontSize: 12, color: "#0f172a", fontWeight: 500, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.5 : 1 }}>{t.t}</div>
            <span style={{ fontSize: 9, fontWeight: 600, background: t.c, color: t.cc, padding: "3px 8px", borderRadius: 9999 }}>{t.k}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (kind === "chat") return (
    <div className="demo-screen" style={{ background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ width: 28, height: 28, borderRadius: 9999, background: "linear-gradient(135deg,#0ea5e9,#2563eb)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div>
        <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#020617" }}>Guid-On Assistant</div>
      </div>
      <div style={{ alignSelf: "flex-end", maxWidth: "85%", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", padding: "10px 13px", borderRadius: 16, borderBottomRightRadius: 4, fontSize: 12, lineHeight: 1.5 }}>Can I open a bank account without an Irish address?</div>
      <div style={{ alignSelf: "flex-start", maxWidth: "92%", background: "#fff", border: "1px solid #e2e8f0", padding: "10px 13px", borderRadius: 16, borderBottomLeftRadius: 4, fontSize: 12, lineHeight: 1.55, color: "#334155" }}>
        <span style={{ fontSize: 9, fontWeight: 600, background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd", padding: "2px 7px", borderRadius: 9999, marginBottom: 6, display: "inline-block" }}>Verified · 3 sources</span><br />
        Open <b>Revolut</b> today — just your passport, no address needed. Once you have a college letter, open an <b>AIB</b> or <b>BOI</b> student account for a local IBAN.
      </div>
    </div>
  );
  if (kind === "doc") return (
    <div className="demo-screen">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#020617" }}>Statement of Purpose</div>
        <div style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>Saved · just now</div>
      </div>
      <div style={{ fontSize: 11, color: "#64748b" }}>Step 3 of 5 · Why this programme?</div>
      <textarea rows="4" defaultValue="I am drawn to TCD's MSc Finance specifically because of the Financial Derivatives and Risk Management module. Building on my HDFC Bank internship where I reduced false positives by 23%…" style={{ resize: "none", border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: "#334155", lineHeight: 1.55, fontFamily: "inherit", outline: 0 }} />
      <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 12px", fontSize: 11, color: "#0c4a6e", lineHeight: 1.55 }}><b style={{ color: "#0369a1" }}>AI tip:</b> Naming a specific module proves you've done your research. +11 points.</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "1px solid #bbf7d0", borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-poppins)", fontSize: 22, color: "#047857", fontWeight: 600 }}>89</div>
        <div style={{ fontSize: 11, color: "#065f46" }}><b>Strength score</b><br /><span style={{ color: "#10b981" }}>↑ +31 from start</span></div>
      </div>
    </div>
  );
  if (kind === "resources") return (
    <div className="demo-screen">
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["Visa & IRP", "Banking", "Health", "Housing"].map((t, i) => (
          <span key={i} style={{ padding: "5px 10px", fontSize: 10, borderRadius: 9999, background: i === 0 ? "linear-gradient(135deg,#0369a1,#2563eb)" : "#fff", color: i === 0 ? "#fff" : "#475569", border: i === 0 ? "0" : "1px solid #e2e8f0", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      {[
        { t: "IRP Registration — Dublin", k: "Required", c: "#fef3c7", cc: "#92400e", url: "inis.gov.ie" },
        { t: "Stamp 2 Permissions Explained", k: "Important", c: "#dbeafe", cc: "#1d4ed8", url: "irishimmigration.ie" },
        { t: "Private Health Insurance", k: "Required", c: "#fef3c7", cc: "#92400e", url: "irishlifehealth.ie" }
      ].map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#e0f2fe", color: "#0369a1", display: "flex", alignItems: "center", justifyContent: "center" }}><I.file /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 600, color: "#020617", lineHeight: 1.3 }}>{r.t}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>{r.url} · verified 28 Apr 2026</div>
          </div>
          <span style={{ fontSize: 9, fontWeight: 600, background: r.c, color: r.cc, padding: "3px 8px", borderRadius: 9999 }}>{r.k}</span>
        </div>
      ))}
    </div>
  );
  if (kind === "forex") return (
    <div className="demo-screen">
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 9, color: "#64748b", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>EUR → INR</div>
          <div style={{ fontFamily: "var(--font-poppins)", fontSize: 20, color: "#020617", fontWeight: 600 }}>₹90.82</div>
          <div style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>▲ +0.12% today</div>
        </div>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#0369a1,#2563eb)", borderRadius: 10, padding: 10, color: "#fff" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Best service</div>
          <div style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600 }}>Wise ⭐</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.85)" }}>Save ≈ €12 vs bank</div>
        </div>
      </div>
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Alert me when 1 EUR =</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 9999, padding: "8px 14px" }}>
          <span style={{ fontFamily: "var(--font-poppins)", fontSize: 16, fontWeight: 600, color: "#020617" }}>₹ 93.00</span>
          <button style={{ marginLeft: "auto", background: "linear-gradient(135deg,#0ea5e9,#2563eb)", color: "#fff", border: 0, borderRadius: 9999, padding: "6px 14px", fontSize: 11, fontWeight: 600 }}>Set alert</button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: 10, fontSize: 11, color: "#065f46" }}>
        <span style={{ fontSize: 18 }}>📈</span><span>Hit ₹92.90 two days ago · saved ₹3,600</span>
      </div>
    </div>
  );
  if (kind === "ment") return (
    <div className="demo-screen">
      <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#020617" }}>Mentors from your home state</div>
      {[
        { n: "Priya Nair", u: "MSc Data Analytics · UCD", h: "Kerala · 24 sessions", c: "linear-gradient(135deg,#fde68a,#fb923c)", col: "#7c2d12" },
        { n: "Ananya Krishnan", u: "PhD CS · DCU", h: "Chennai · 41 sessions", c: "linear-gradient(135deg,#bae6fd,#3b82f6)", col: "#fff" }
      ].map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 10 }}>
          <Avatar name={m.n} bg={m.c} color={m.col} size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 12, fontWeight: 600, color: "#020617" }}>{m.n}</div>
            <div style={{ fontSize: 10.5, color: "#64748b" }}>{m.u}</div>
            <div style={{ fontSize: 10, color: "#0369a1", fontWeight: 600, marginTop: 2 }}>{m.h}</div>
          </div>
          <button style={{ background: "linear-gradient(135deg,#0ea5e9,#2563eb)", color: "#fff", border: 0, borderRadius: 9999, padding: "6px 12px", fontSize: 10.5, fontWeight: 600 }}>Connect</button>
        </div>
      ))}
    </div>
  );
  return <div className="demo-screen" />;
};

const WebDemo = ({ onNav }) => {
  const [step, setStep] = React.useState(0);
  const [scen, setScen] = React.useState(0);
  const [faq, setFaq] = React.useState(0);

  const scenarios = [
    {
      title: "I just landed at Dublin Airport",
      who: "Riya, 23 · MSc Computer Science, UCD · Landed 3 days ago",
      ic: I.plane,
      steps: [
        { t: "Opens chatbot at the airport", p: "Types 'I just landed, what do I do first?' Gets an ordered checklist: SIM, accommodation, IRP within 90 days.", q: "First stop — Three Ireland and Vodafone shops are in the airport. Get a SIM with data — you'll need it for everything." },
        { t: "Asks about a bank account", p: "No Irish address yet, banks need address. What now?", q: "Open Revolut today — passport only, no address needed. Once you have a college letter, open AIB or BOI for a local IBAN." },
        { t: "Finds the IRP resource", p: "Goes to Resource Hub. Finds the IRP card with the inis.gov.ie link, document list, and the tip that slots open at 9am.", q: null },
        { t: "Books a mentor call", p: "Filters by UCD and Kerala. Finds Priya, who did the same process 8 months ago. One message, one call the next day.", q: null }
      ]
    },
    {
      title: "I'm applying and need my SOP",
      who: "Arjun, 25 · Applying for MSc Finance, TCD · 3-week deadline",
      ic: I.file,
      steps: [
        { t: "Starts the SOP wizard", p: "Fills academic background — BITS Pilani, 7.8 CGPA, HDFC internship. Strength score: 58.", q: "AI tip: Add a measurable outcome from your internship — e.g. reduced false positives by 23%." },
        { t: "Adds measurable result", p: "Score jumps from 58 → 66.", q: null },
        { t: "Names a TCD module", p: "Opens TCD website, finds 'Financial Derivatives and Risk Management.' Score: 79.", q: "AI feedback: Naming a specific module proves research. Add one faculty member's research area to break 85." },
        { t: "Final score 89", p: "Downloads PDF. Submits to TCD. Gets an offer 3 weeks later.", q: null }
      ]
    },
    {
      title: "I'm arriving in 6 weeks, panicking",
      who: "Meena, 22 · MSc Business Analytics, UCD · Hyderabad",
      ic: I.spark,
      steps: [
        { t: "Sets a forex alert", p: "Target: 1 EUR = ₹93. Two days later, hits ₹92.90. Transfers ₹80,000. Saves €45.", q: null },
        { t: "Buys health insurance", p: "Compares Irish Life Health, Laya, VHI. Picks Irish Life Hospital Cover at €520/year. Buys from India.", q: null },
        { t: "Pre-arrival checklist", p: "Chatbot lists Type G adapters, warm layers, printed admission letter, passport photos, 6 months of prescription medication.", q: "Power adapter is Type G — your Indian C-type plugs won't fit." },
        { t: "Calls a Hyderabad mentor", p: "30 minutes covers Dublin accommodation, Daft.ie traps, Indian grocery shops near UCD, and the Leap card.", q: null }
      ]
    }
  ];

  const faqs = [
    { q: "Is Guid-On only for students going to Dublin?", a: "No — Guid-On covers all of Ireland. Dublin, Limerick, Galway, Cork, Maynooth. The chatbot and resource hub are city-aware; just tell us where you're based when you sign up." },
    { q: "Is the AI chatbot information accurate?", a: "Guid-On's AI is trained on verified Irish government sources — inis.gov.ie, welfare.ie, revenue.ie — and updated when policies change. For critical decisions, we always link to the official source so you can verify yourself." },
    { q: "Do I need to pay to use the document builder?", a: "Your first document — the Statement of Purpose — is completely free, no credit card needed. The full library of 14 documents across 5 phases is available on the Pro plan." },
    { q: "Who are the mentors and are they verified?", a: "Every mentor is a current or recent Indian student in Ireland. We verify student status and they complete a short onboarding before being listed. All session reviews are visible on their profile." },
    { q: "Is my data safe?", a: "Guid-On is fully GDPR compliant. We do not sell your data. Your personal documents are stored encrypted and never shared with third parties. You can delete your account and all data at any time." },
    { q: "I'm not from India — can I use Guid-On?", a: "The platform is currently built for Indian students because the cultural, financial, and admin context is very specific. We plan to expand to other South Asian student communities in Phase 2, late 2026." }
  ];

  return (
    <div className="page" data-screen-label="Web · Demo">
      <div className="blob b1" /><div className="blob b2" />
      <WebNav active="demo" onNav={onNav} />

      <header className="container hero-wrap" style={{ gridTemplateColumns: "1fr", textAlign: "center", paddingTop: 64 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="pill-eyebrow">3 MIN — No signup required</span>
          <h1 style={{ marginTop: 14 }}>See <em>Guid-On</em> in action</h1>
          <p className="lede" style={{ margin: "0 auto 26px" }}>A guided walkthrough of everything the platform does — from your first SOP to your first month settled in Ireland.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary"><I.play /> Start Interactive Tour</a>
            <a className="btn btn-secondary" onClick={() => onNav("register")}>Skip → Sign Up Free</a>
          </div>
        </div>
      </header>

      {/* Tour */}
      <section className="container" style={{ padding: "40px 28px" }}>
        <div className="sec-head">
          <span className="eyebrow">Section 1 — Interactive product tour</span>
          <h2>Six features, six clicks</h2>
        </div>
        <div className="demo-step-strip">
          {DEMO_STEPS.map((s, i) => (
            <button key={i} className={"demo-step-btn" + (i === step ? " active" : "")} onClick={() => setStep(i)}>
              <span className="n">Step {s.n}</span><span className="t">{s.t}</span>
            </button>
          ))}
        </div>
        <div className="demo-stage">
          <div>
            <span style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em" }}>Step {DEMO_STEPS[step].n} of 6</span>
            <h3 style={{ marginTop: 6 }}>{DEMO_STEPS[step].t}</h3>
            <p>{DEMO_STEPS[step].body}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn btn-secondary" style={{ minHeight: 38, padding: "8px 16px" }} onClick={() => setStep(Math.max(0, step - 1))}>← Back</button>
              <button className="btn btn-primary" style={{ minHeight: 38, padding: "8px 16px" }} onClick={() => setStep(Math.min(5, step + 1))}>Next →</button>
            </div>
          </div>
          <DemoScreen kind={DEMO_STEPS[step].screen} />
        </div>
      </section>

      {/* Scenarios */}
      <section className="container" style={{ padding: "40px 28px" }}>
        <div className="sec-head">
          <span className="eyebrow">Section 2 — Scenario walkthroughs</span>
          <h2>Three students. Three real journeys.</h2>
          <p>Click any persona to see how they used Guid-On day by day.</p>
        </div>
        <div className="scen-tabs">
          {scenarios.map((s, i) => (
            <div key={i} className={"scen-tab" + (i === scen ? " active" : "")} onClick={() => setScen(i)}>
              <div className="ico"><s.ic /></div>
              <div>
                <div className="ttl">{s.title}</div>
                <div className="who">{s.who}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="scen-board">
          <div className="scen-step-list">
            {scenarios[scen].steps.map((st, i) => (
              <div key={i} className="scen-step">
                <div className="num">{i + 1}</div>
                <div>
                  <h5>{st.t}</h5>
                  <p>{st.p}</p>
                  {st.q && <div className="bubble"><b style={{ color: "#0369a1", fontFamily: "var(--font-poppins)" }}>Chatbot:</b> {st.q}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container" style={{ padding: "40px 28px" }}>
        <div className="sec-head">
          <span className="eyebrow">Section 3 — Free vs Pro</span>
          <h2>Free covers the first week. Pro covers the year.</h2>
          <p>Most students get everything they need from the free plan in their first week. Upgrade when you're ready — no pressure.</p>
        </div>
        <table className="plans-table">
          <thead><tr><th>Feature</th><th>Free</th><th>Pro · €9.99/month</th></tr></thead>
          <tbody>
            <tr><td>AI Chatbot</td><td>10 messages/day</td><td><b>Unlimited</b></td></tr>
            <tr><td>Document Builder</td><td>SOP only</td><td><b>All 14 documents</b></td></tr>
            <tr><td>Resource Hub</td><td>Full access</td><td>Full access</td></tr>
            <tr><td>Forex Alerts</td><td>1 active alert</td><td><b>5 active alerts</b></td></tr>
            <tr><td>Mentor Connect</td><td>Browse only</td><td><b>3 messages/week</b></td></tr>
            <tr><td>Download Documents</td><td>—</td><td><b>PDF + Word</b></td></tr>
            <tr><td>Personalised Dashboard</td><td>Basic checklist</td><td><b>Full personalisation</b></td></tr>
            <tr><td>Priority Support</td><td>—</td><td><b>✓</b></td></tr>
          </tbody>
        </table>
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: "40px 28px" }}>
        <div className="sec-head">
          <span className="eyebrow">Section 4 — FAQ</span>
          <h2>The questions every Indian student asks</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={"faq-card" + (i === faq ? " open" : "")} onClick={() => setFaq(faq === i ? -1 : i)}>
              <div className="q">{f.q} <span style={{ color: "#94a3b8" }}>{i === faq ? "−" : "+"}</span></div>
              <div className="a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container cta-band">
        <div className="cta-card">
          <div>
            <h2>Ready to make your move easier?</h2>
            <p>Join students from Mumbai, Chennai, Delhi, Hyderabad, Bangalore, and beyond — all making Ireland home with Guid-On.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn-primary" onClick={() => onNav("register")}>Create My Free Account <I.arrowRight /></a>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.7)", margin: "12px 0 0" }}>No credit card. No commitment. Just clarity.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
            {["IRP card sorted in 20 min", "SOP score 58 → 89", "Saved €45 on first forex transfer"].map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 14, padding: "12px 16px", fontFamily: "var(--font-poppins)", fontSize: 14, fontWeight: 600 }}>
                <span style={{ color: "#86efac" }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WebFooter onNav={onNav} />
    </div>
  );
};

/* ============================================================
   PAGE 3 — AI CHATBOT
   ============================================================ */
const WebChatbot = ({ onNav }) => {
  const topics = ["IRP Registration", "PPS Number", "Banking", "Health Insurance", "Accommodation", "College Admin", "Transport", "Indian Groceries", "Phone & SIM", "Part-time Work", "Tax & Revenue", "Arriving Tips", "Women Students"];
  const chips = [
    "How do I book my IRP appointment?",
    "Can I open a bank account without an Irish address?",
    "What health insurance do I need for my visa?",
    "How do I get a PPS number?",
    "Can I work part-time on a Stamp 2 visa?",
    "Where do I find Indian grocery shops in Dublin?"
  ];
  return (
    <div className="page" style={{ height: "100vh", overflow: "hidden" }} data-screen-label="Web · Chatbot">
      <div className="blob b1" /><div className="blob b2" />
      <WebNav active="chatbot" onNav={onNav} />

      <div className="chat-page">
        <aside className="chat-side">
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9999, background: "linear-gradient(135deg,#0ea5e9,#2563eb,#4f46e5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            <div>
              <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#020617" }}>Topics</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Jump to a category</div>
            </div>
          </div>
          {topics.map((t, i) => (
            <div key={i} className={"chat-side-item" + (i === 0 ? " active" : "")}>
              <span>{i === 0 ? "🛂" : i === 1 ? "🆔" : i === 2 ? "🏦" : i === 3 ? "🏥" : i === 4 ? "🏠" : i === 5 ? "🎓" : i === 6 ? "🚌" : i === 7 ? "🛒" : i === 8 ? "📱" : i === 9 ? "💼" : i === 10 ? "💸" : i === 11 ? "✈️" : "👩"}</span> {t}
            </div>
          ))}
        </aside>

        <div className="chat-main">
          <div className="chat-bar">
            <div>
              <h2>Guid-On Assistant</h2>
              <div className="status">Online · Powered by Gemini · trained on Irish gov sources</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: "#64748b" }}><b style={{ color: "#020617" }}>7</b> free messages remaining</span>
              <a className="btn btn-primary" style={{ minHeight: 34, fontSize: 12 }}>Upgrade</a>
            </div>
          </div>

          <div className="chat-msgs">
            <div className="msg">
              <div className="av-b">🤖</div>
              <div className="bubble assistant">
                <span className="src">Welcome</span><br />
                <b>Vanakkam!</b> 👋 I'm your Guid-On assistant — trained specifically for Indian students coming to Ireland. Ask me about IRP registration, PPS numbers, bank accounts, health insurance, accommodation, part-time work rights, or anything else you need to settle in. <b>What's on your mind?</b>
              </div>
            </div>

            <div className="msg user">
              <div className="bubble user">How do I book my IRP appointment?</div>
            </div>

            <div className="msg">
              <div className="av-b">🤖</div>
              <div className="bubble assistant">
                <span className="src">Verified · 4 sources · inis.gov.ie</span><br />
                <b>IRP registration is your most urgent task after landing.</b> Book at <b>inis.gov.ie</b> — Dublin Registration Office. Slots open at 9am daily and fill within minutes, so check every morning early.
                <div style={{ marginTop: 12, background: "linear-gradient(135deg,#f8fafc,#f0f9ff)", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#0369a1", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>What to bring</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
                    <li>Valid passport</li>
                    <li>Original college acceptance letter</li>
                    <li>Proof of Irish address</li>
                    <li>Private health insurance certificate</li>
                    <li><b>€300 in card payment only</b> — no cash accepted</li>
                  </ul>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#94a3b8" }}>⏱ Must register within 90 days of arrival.</div>
              </div>
            </div>

            <div className="msg user">
              <div className="bubble user">Can I open a bank account without an Irish address?</div>
            </div>

            <div className="msg">
              <div className="av-b">🤖</div>
              <div className="bubble assistant">
                <span className="src">Verified · 2 sources</span><br />
                Open <b>Revolut</b> first — it works with just your passport, no Irish address needed. It's fully functional for spending, receiving money, and international transfers. Once you have a college confirmation letter as proof of address, open an <b>AIB</b> or <b>Bank of Ireland</b> student account for a local IBAN.
              </div>
            </div>
          </div>

          <div className="chips-row">
            {chips.map((c, i) => <span key={i} className="chip-prompt">{c}</span>)}
          </div>

          <div className="composer-row">
            <div className="composer-box">
              <button className="ic-btn"><I.clip /></button>
              <input placeholder="Ask anything about settling in Ireland…" />
              <button className="ic-btn"><I.mic /></button>
              <button className="send"><I.send /></button>
            </div>
            <div className="composer-foot">Guid-On AI uses verified Irish government sources. Always confirm critical decisions at official sites.</div>
          </div>
        </div>

        <aside className="chat-right">
          <h5>Free plan</h5>
          <div className="meter">
            <b>3 / 10 messages</b>
            <div className="bar"><i style={{ width: "30%" }} /></div>
            <span>Resets at midnight Dublin time</span>
          </div>
          <h5>Upgrade for unlimited</h5>
          <div className="upgrade-card">
            <b>Guid-On Pro</b>
            <div className="price">€9.99<span style={{ fontSize: 12, opacity: 0.7 }}>/month</span></div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11.5, lineHeight: 1.7 }}>
              <li>Unlimited chatbot</li>
              <li>All 14 documents</li>
              <li>5 forex alerts</li>
              <li>Mentor messages</li>
            </ul>
            <button>Unlock unlimited →</button>
          </div>
          <h5>Recent answers</h5>
          {["IRP appointment slots", "Revolut vs AIB", "Stamp 2 work hours", "Indian grocery in Dublin"].map((t, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 10, padding: "8px 10px", fontSize: 11.5, color: "#334155", fontWeight: 500, cursor: "pointer" }}>{t}</div>
          ))}
        </aside>
      </div>
    </div>
  );
};

/* ============================================================
   PAGE 4 — REGISTRATION
   ============================================================ */
const WebRegister = ({ onNav }) => {
  const [step, setStep] = React.useState(2);
  const [situation, setSituation] = React.useState("Arriving in under 3 months");
  const [worries, setWorries] = React.useState(["IRP Registration", "Accommodation", "Sending money home"]);

  const toggleWorry = (w) => setWorries(worries.includes(w) ? worries.filter((x) => x !== w) : [...worries, w]);

  return (
    <div className="page" style={{ minHeight: "100vh", overflow: "hidden" }} data-screen-label="Web · Register">
      <WebNav active="register" onNav={onNav} />

      <div className="reg-wrap">
        <div className="reg-brand">
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--font-poppins)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>Guid-On 🍀</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", letterSpacing: ".02em", marginBottom: 24 }}>India to Ireland. We've got ya.</div>
          </div>
          <h1>Your journey<br />starts here.</h1>
          <p>Join thousands of Indian students who made their move to Ireland smoother with Guid-On.</p>
          <div className="benefits">
            {[
              { ic: "🤖", t: "AI Chatbot Access", d: "Instant answers, day or night — trained on Irish gov sources." },
              { ic: "📄", t: "Free SOP Builder", d: "Your first document, completely free. No credit card." },
              { ic: "💱", t: "Forex Alerts", d: "Never miss a good INR/EUR rate. Save on every transfer." },
              { ic: "🎓", t: "Mentor Matching", d: "Talk to someone who made the same journey 8 months ago." }
            ].map((b, i) => (
              <div key={i} className="ben">
                <div className="ic">{b.ic}</div>
                <div><b>{b.t}</b><span>{b.d}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="reg-form">
          <div className="steps">
            <i className={step >= 1 ? "active" : ""} />
            <i className={step >= 2 ? "active" : ""} />
            <i className={step >= 3 ? "active" : ""} />
          </div>
          <div style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Step {step} of 3 · Your situation</div>
          <h2>Where are you in your Ireland journey?</h2>
          <p className="sub">We'll personalise your checklist and dashboard accordingly.</p>

          <label>University in Ireland</label>
          <div className="input">
            <I.grad />
            <select defaultValue="UCD"><option>UCD · University College Dublin</option><option>TCD · Trinity College Dublin</option><option>DCU · Dublin City University</option><option>UL · University of Limerick</option><option>NUI Galway</option><option>Maynooth University</option><option>MTU · Cork IT</option><option>Other</option></select>
          </div>

          <div className="field-row">
            <div>
              <label>Course / programme</label>
              <div className="input"><I.book /><input defaultValue="MSc Data Analytics" /></div>
            </div>
            <div>
              <label>Expected start</label>
              <div className="input"><I.calendar /><input defaultValue="September 2026" /></div>
            </div>
          </div>

          <label>Where are you right now?</label>
          <div className="tiles-row">
            {[
              { ic: "✈️", t: "Just Landed" },
              { ic: "📅", t: "Arriving in under 3 months" },
              { ic: "📝", t: "Still Applying" },
              { ic: "🎓", t: "Already Settled" }
            ].map((t, i) => (
              <div key={i} className={"tile" + (situation === t.t ? " active" : "")} onClick={() => setSituation(t.t)}>
                <span className="ic">{t.ic}</span>
                <b>{t.t}</b>
              </div>
            ))}
          </div>

          <label>What are you most worried about?</label>
          <div className="chips-multi">
            {["IRP Registration", "Accommodation", "Banking", "Health Insurance", "Finding work", "Making friends", "Sending money home", "Transport"].map((w) => (
              <span key={w} className={"chip" + (worries.includes(w) ? " on" : "")} onClick={() => toggleWorry(w)}>{w}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button className="btn btn-secondary" onClick={() => setStep(Math.max(1, step - 1))}>← Back</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(Math.min(3, step + 1))}>Continue → <I.arrowRight /></button>
          </div>

          <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "16px 0 0" }}>By continuing you agree to our <a style={{ color: "#0369a1" }}>Terms</a> and <a style={{ color: "#0369a1" }}>Privacy Policy</a>. Your data is GDPR-protected.</p>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WebDemo, WebChatbot, WebRegister });
