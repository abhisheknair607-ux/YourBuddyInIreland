/* ============================================================
   Guid-On — Web pages: Mentor Connect, Document Builder
   ============================================================ */

const MENTORS = [
  { n: "Priya Nair", c: "MSc Data Analytics · UCD · Year 2", h: "Kerala", r: 5, s: 24, rt: "2 hours", tags: ["IRP Process", "UCD Campus", "Accommodation"], bio: "From Kerala, now thriving in Dublin. I went through the whole IRP process — I can walk you through every step including documents to bring and how to grab a slot at 9am.", bg: "linear-gradient(135deg,#fde68a,#fb923c)", col: "#7c2d12", on: true },
  { n: "Rahul Mehta", c: "MSc Finance · TCD · Year 1", h: "Mumbai", r: 4, s: 11, rt: "4 hours", tags: ["Banking", "Part-time Work", "TCD Admin"], bio: "Moved from Mumbai last September. Happy to help with opening a bank account without an address, finding part-time work on Stamp 2, and TCD-specific admin paperwork.", bg: "linear-gradient(135deg,#bae6fd,#3b82f6)", col: "#fff", on: false },
  { n: "Ananya Krishnan", c: "PhD Computer Science · DCU · Year 3", h: "Chennai", r: 5, s: 41, rt: "1 hour", tags: ["PhD Journey", "Indian Community", "Groceries"], bio: "Chennai girl now leading a DCU research group. Ask me about Indian grocery shops across Dublin, Tamil and Telugu community groups, and what PhD life in Ireland is really like.", bg: "linear-gradient(135deg,#a7f3d0,#10b981)", col: "#fff", on: true },
  { n: "Vikram Patel", c: "MSc Software Engineering · UL · Year 2", h: "Gujarat", r: 4, s: 16, rt: "3 hours", tags: ["Limerick Life", "Transport", "Health Insurance"], bio: "Based in Limerick — the city everyone overlooks but has a great student vibe. Can advise on choosing health insurance, the Leap card system, and getting around without a car.", bg: "linear-gradient(135deg,#ddd6fe,#8b5cf6)", col: "#fff", on: false },
  { n: "Sneha Iyer", c: "LLM Law · TCD · Year 1", h: "Bangalore", r: 5, s: 8, rt: "2 hours", tags: ["Legal Rights", "Women's Safety", "Visa Issues"], bio: "Law student and former legal researcher in India. I specifically help women students navigate safety, accommodation choices, and understanding your rights as an international student in Ireland.", bg: "linear-gradient(135deg,#fbcfe8,#ec4899)", col: "#fff", on: true },
  { n: "Karthik Sundaram", c: "MSc Business Analytics · UCD Smurfit · Year 1", h: "Chennai", r: 4, s: 19, rt: "3 hours", tags: ["Business School", "Internships", "Networking"], bio: "Smurfit Business School student from Chennai. I can guide you on internship hunting, networking in Irish tech/fintech, and making the most of Smurfit's career resources.", bg: "linear-gradient(135deg,#fed7aa,#f97316)", col: "#fff", on: false }
];

const WebMentors = ({ onNav }) => {
  const [uniFilter, setUniFilter] = React.useState("All");
  const [topicFilter, setTopicFilter] = React.useState("All");

  return (
    <div className="page" data-screen-label="Web · Mentors">
      <div className="blob b1" /><div className="blob b2" />
      <WebNav active="mentors" onNav={onNav} />

      <header className="container" style={{ padding: "60px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <span className="pill-eyebrow"><I.users size={11} /> 47 verified mentors in Ireland</span>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 44, fontWeight: 600, color: "#020617", letterSpacing: "-0.02em", margin: "14px 0 8px", lineHeight: 1.1 }}>Mentor Connect</h1>
            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.6, margin: 0, maxWidth: 580 }}>Talk to a verified Indian student who's already done what you're about to do. Same journey, same fears, same WhatsApp groups. Two clicks to book.</p>
          </div>
          <a className="btn btn-secondary"><I.plus /> Become a mentor</a>
        </div>
      </header>

      <section className="container" style={{ padding: "24px 28px 36px" }}>
        <div className="ment-filter">
          <div className="ment-filter-group">
            <h5>By university</h5>
            <div className="ment-filter-chips">
              {["All", "UCD", "TCD", "DCU", "UL", "NUIG", "Maynooth"].map((u) => (
                <span key={u} className={"ment-chip" + (uniFilter === u ? " on" : "")} onClick={() => setUniFilter(u)}>{u}</span>
              ))}
            </div>
          </div>
          <div className="ment-filter-group">
            <h5>By topic</h5>
            <div className="ment-filter-chips">
              {["All", "IRP Process", "Banking", "Accommodation", "Part-time Work", "Women's Safety", "PhD Life"].map((t) => (
                <span key={t} className={"ment-chip" + (topicFilter === t ? " on" : "")} onClick={() => setTopicFilter(t)}>{t}</span>
              ))}
            </div>
          </div>
          <div className="ment-filter-group" style={{ flex: "0 0 auto" }}>
            <h5>Availability</h5>
            <div className="ment-filter-chips">
              <span className="ment-chip on">Now</span>
              <span className="ment-chip">This week</span>
              <span className="ment-chip">Anytime</span>
            </div>
          </div>
        </div>

        <div className="ment-grid">
          {MENTORS.map((m, i) => (
            <div className="ment-card" key={i}>
              <div className="head">
                <div style={{ position: "relative" }}>
                  <Avatar name={m.n} bg={m.bg} color={m.col} size={52} />
                  {m.on && <span style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: 9999, background: "#10b981", border: "2px solid #fff" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h3>{m.n}</h3>
                  <div className="meta">{m.c}</div>
                  <div style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, marginTop: 2 }}>📍 {m.h}</div>
                </div>
              </div>
              <div className="stats">
                <span><Stars n={m.r} /></span>
                <span><b>{m.s}</b> sessions</span>
                <span>Replies in <b>~{m.rt}</b></span>
              </div>
              <div className="tags">
                {m.tags.map((tg, j) => <span key={j} className="tag">{tg}</span>)}
              </div>
              <p className="bio">"{m.bio}"</p>
              <button className="cta">Connect with {m.n.split(" ")[0]} <I.arrowRight size={14} /></button>
            </div>
          ))}
        </div>

        <div className="become-mentor">
          <div style={{ position: "relative" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", padding: "5px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>Pay it forward</span>
            <h2>Help the next batch the way someone helped you</h2>
            <p>Every mentor on Guid-On is a current or recent Indian student in Ireland. Apply if you've completed at least one semester — we'll verify your student ID and you'll be matched with students from your home state and university.</p>
            <ul className="req" style={{ margin: 0, padding: 0, listStyle: "none" }}>
              <li><I.check /> Guid-On Pro free for your remaining study duration</li>
              <li><I.check /> Verified mentor credential for your LinkedIn profile</li>
              <li><I.check /> Community recognition badge in the app</li>
              <li><I.check /> Optional paid sessions after your first 10 verified ratings</li>
            </ul>
          </div>
          <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 20, padding: 22, position: "relative", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".18em", color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Mentor application</div>
            <div style={{ height: 44, borderRadius: 12, background: "rgba(255,255,255,.95)", padding: "0 14px", display: "flex", alignItems: "center", fontSize: 13, color: "#0f172a", fontWeight: 500 }}>Full name</div>
            <div style={{ height: 44, borderRadius: 12, background: "rgba(255,255,255,.95)", padding: "0 14px", display: "flex", alignItems: "center", fontSize: 13, color: "#0f172a", fontWeight: 500 }}>University &amp; programme</div>
            <div style={{ height: 44, borderRadius: 12, background: "rgba(255,255,255,.95)", padding: "0 14px", display: "flex", alignItems: "center", fontSize: 13, color: "#0f172a", fontWeight: 500 }}>Areas you can help with</div>
            <button style={{ height: 44, borderRadius: 12, background: "#fff", color: "#0369a1", border: 0, fontWeight: 600, fontSize: 13, cursor: "pointer", marginTop: 4 }}>Apply to become a mentor →</button>
          </div>
        </div>
      </section>

      <WebFooter onNav={onNav} />
    </div>
  );
};

/* ============================================================
   PAGE 8 — DOCUMENT BUILDER
   ============================================================ */
const DOC_LIBRARY = [
  { phase: "Phase 1 · Application", items: [
    { t: "Statement of Purpose", free: true, active: true },
    { t: "Visa Cover Letter", free: false, locked: true },
    { t: "Personal Statement", free: false, locked: true },
    { t: "Reference Letter Request Email", free: false, locked: true }
  ] },
  { phase: "Phase 2 · Visa Submission", items: [
    { t: "Financial Affidavit Cover Letter", free: false, locked: true },
    { t: "Bank Sponsorship Letter", free: false, locked: true },
    { t: "Gap Year Explanation Letter", free: false, locked: true }
  ] },
  { phase: "Phase 3 · Pre-Arrival", items: [
    { t: "Accommodation Confirmation", free: false, locked: true },
    { t: "Health Insurance Confirmation", free: false, locked: true },
    { t: "Travel Itinerary Summary", free: false, locked: true }
  ] },
  { phase: "Phase 4 · On Arrival", items: [
    { t: "IRP Supporting Letter", free: false, locked: true },
    { t: "PPS Application Cover Note", free: false, locked: true }
  ] },
  { phase: "Phase 5 · Settled", items: [
    { t: "Part-time Job Cover Letter", free: false, locked: true },
    { t: "Bank Reference Request", free: false, locked: true }
  ] }
];

const DOC_STEPS = ["Background", "Motivation", "Goals", "Why Ireland", "Review"];

const WebDocs = ({ onNav }) => {
  const [step, setStep] = React.useState(3);
  const [bg, setBg] = React.useState("BITS Pilani · Computer Science · CGPA 8.2 · 2021. Strong coursework in econometrics, financial modelling, and statistical inference. Final-year thesis on credit-risk model interpretability supervised by Dr. R. Iyer.");
  const [motivation, setMotivation] = React.useState("During my 11-month tenure at HDFC Bank as a Risk Analyst, I built a fraud-detection ensemble that reduced false positives by 23% across the credit-card line. Working with under-banked customers in Tier-3 cities pushed me toward a question I couldn't shake: how do financial institutions design risk frameworks that don't quietly exclude the very people they should serve?");
  const [whyTcd, setWhyTcd] = React.useState("TCD's MSc Finance is the only programme in Europe that pairs the Financial Derivatives and Risk Management module with Prof. O'Sullivan's research stream on responsible quantitative finance — the exact intersection my thesis pointed toward. The 12-month structure with a January industry placement matches my goal of joining an Irish fintech before completing my dissertation.");

  return (
    <div className="page" style={{ minHeight: "100vh", overflow: "hidden" }} data-screen-label="Web · Doc Builder">
      <WebNav active="docs" onNav={onNav} />

      <div className="container" style={{ padding: "24px 28px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div>
          <span style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em" }}>Document Builder</span>
          <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 28, margin: "4px 0 0", color: "#020617", fontWeight: 600, letterSpacing: "-0.01em" }}>Statement of Purpose</h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#64748b" }}>Last saved · just now</span>
          <button className="btn btn-secondary" style={{ minHeight: 36, fontSize: 12 }}><I.eye /> Preview</button>
          <button className="btn btn-secondary" style={{ minHeight: 36, fontSize: 12 }}><I.spark /> AI improve</button>
          <button className="btn btn-primary" style={{ minHeight: 36, fontSize: 12 }}><I.download /> Download PDF</button>
        </div>
      </div>

      <div className="container" style={{ padding: "0 28px 60px" }}>
        <div className="docs-grid">
          {/* LEFT — library */}
          <aside className="docs-side">
            {DOC_LIBRARY.map((p, i) => (
              <div key={i}>
                <h5>{p.phase}</h5>
                {p.items.map((d, j) => (
                  <div key={j} className={"docs-item" + (d.active ? " active" : "") + (d.locked ? " locked" : "")}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      {d.locked && <span className="lock">🔒</span>}
                      <span>{d.t}</span>
                    </span>
                    {d.free && <span className="free">FREE</span>}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 14, background: "linear-gradient(135deg,#0369a1,#2563eb)", borderRadius: 14, color: "#fff" }}>
              <div style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Unlock all 14 documents</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.85)", marginBottom: 10 }}>Pro · €9.99/mo. PDF + Word exports.</div>
              <button style={{ background: "#fff", color: "#0369a1", border: 0, borderRadius: 9999, padding: "8px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer", width: "100%" }}>Upgrade to Pro</button>
            </div>
          </aside>

          {/* CENTER — editor */}
          <div className="docs-editor">
            <div className="docs-steps">
              {DOC_STEPS.map((s, i) => (
                <div key={i} className={"docs-step" + (i === step ? " active" : "")} onClick={() => setStep(i)}>
                  <span className="stnum">{i + 1}</span> {s}
                </div>
              ))}
            </div>

            <div className="docs-body">
              <div className="docs-form">
                {step === 0 && (
                  <>
                    <label>Your academic background</label>
                    <textarea rows="6" value={bg} onChange={(e) => setBg(e.target.value)} />
                    <div className="docs-aitip">
                      <div className="ic">i</div>
                      <p><b>AI Tip:</b> Mention your CGPA only if it's above 7.5/10. Irish universities focus far more on experience and motivation than grades alone.</p>
                    </div>
                    <label>Work or internship experience</label>
                    <textarea rows="4" placeholder="List roles, companies, duration, and what you specifically did — not just job titles." />
                    <div className="docs-aitip">
                      <div className="ic">i</div>
                      <p><b>AI Tip:</b> One specific project with a named outcome beats three vague role descriptions. "Built a fraud model that reduced false positives by 23%" beats "worked in analytics".</p>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <label>What sparked your interest in this field?</label>
                    <textarea rows="6" value={motivation} onChange={(e) => setMotivation(e.target.value)} />
                    <div className="docs-aitip">
                      <div className="ic">i</div>
                      <p><b>AI Tip:</b> Be specific. Admissions committees read 200+ SOPs. A real anecdote — even a small one — stands out far more than "I have always been passionate about finance".</p>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <label>Short-term goal — 0 to 2 years after graduation</label>
                    <textarea rows="4" placeholder="What role, company type, or sector are you targeting immediately after finishing your degree?" />
                    <div className="docs-aitip">
                      <div className="ic">i</div>
                      <p><b>AI Tip:</b> Irish universities love candidates who've researched Ireland's job market. Mention one Irish company or sector that's relevant — it shows you're serious about contributing.</p>
                    </div>
                    <label>Long-term vision — 5+ years</label>
                    <textarea rows="3" placeholder="Where do you see yourself in the longer term? Leadership, entrepreneurship, returning to India, a specific problem you want to solve?" />
                  </>
                )}
                {step === 3 && (
                  <>
                    <label>Why this specific programme?</label>
                    <textarea rows="6" value={whyTcd} onChange={(e) => setWhyTcd(e.target.value)} />
                    <div className="docs-aitip">
                      <div className="ic">i</div>
                      <p><b>AI Tip:</b> Naming a specific module proves you've researched the programme. <b>+11 points</b> applied to your score for naming "Financial Derivatives and Risk Management".</p>
                    </div>
                    <label>Why Ireland — over UK, US, Canada?</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                      {["EU access after graduation", "Third Level Graduate Scheme", "English-speaking environment", "Lower cost than London", "Growing fintech scene"].map((c, i) => (
                        <span key={i} style={{ fontSize: 11.5, background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd", borderRadius: 9999, padding: "5px 11px", cursor: "pointer", fontWeight: 500 }}>+ {c}</span>
                      ))}
                    </div>
                    <textarea rows="4" defaultValue="Ireland's Third Level Graduate Scheme gives me 24 months of post-study work rights — long enough to deliver impact at a fintech, not just an internship. Dublin's IFSC has anchored every major European fintech in the past five years; the proximity to Stripe, Revolut, and Mastercard's regional HQs is the kind of compounding advantage that doesn't exist at the same scale in London or Toronto." />
                  </>
                )}
                {step === 4 && (
                  <>
                    <div style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "1px solid #bbf7d0", borderRadius: 14, padding: 18, marginBottom: 14, display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ fontFamily: "var(--font-poppins)", fontSize: 38, fontWeight: 700, color: "#047857" }}>89</div>
                      <div>
                        <div style={{ fontFamily: "var(--font-poppins)", fontSize: 14, fontWeight: 600, color: "#065f46" }}>Strong · ready to submit</div>
                        <div style={{ fontSize: 12, color: "#10b981", marginTop: 2 }}>↑ +31 from your first draft</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { sec: "Background", s: 17, top: 20, hint: null },
                        { sec: "Motivation", s: 19, top: 20, hint: null },
                        { sec: "Goals", s: 13, top: 20, hint: "Add a named Irish company you'd target post-grad" },
                        { sec: "Why Ireland", s: 22, top: 20, hint: null },
                        { sec: "Uniqueness", s: 18, top: 20, hint: null }
                      ].map((s, i) => (
                        <div key={i} style={{ background: s.hint ? "#fef3c7" : "#fff", border: `1px solid ${s.hint ? "#fde047" : "#e2e8f0"}`, borderRadius: 12, padding: 12 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.sec}</span>
                            <span style={{ fontFamily: "var(--font-poppins)", fontSize: 13, fontWeight: 600, color: s.hint ? "#92400e" : "#0369a1" }}>{s.s}/{s.top}</span>
                          </div>
                          {s.hint && <div style={{ fontSize: 11.5, color: "#92400e", marginTop: 4 }}>↑ {s.hint}</div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
                      <button className="btn btn-secondary" style={{ fontSize: 12 }}><I.copy /> Copy text</button>
                      <button className="btn btn-primary" style={{ fontSize: 12 }}><I.download /> Download PDF</button>
                      <button className="btn btn-secondary" style={{ fontSize: 12, opacity: 0.7 }}>🔒 Download .docx (Pro)</button>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
                  <button className="btn btn-secondary" style={{ minHeight: 38, fontSize: 12 }} onClick={() => setStep(Math.max(0, step - 1))}>← Back</button>
                  <button className="btn btn-primary" style={{ minHeight: 38, fontSize: 12 }} onClick={() => setStep(Math.min(4, step + 1))}>{step === 4 ? "Finish →" : "Next →"}</button>
                </div>
              </div>

              {/* RIGHT preview pane (inside editor) */}
              <div className="docs-preview">
                <div className="doc-paper">
                  <div style={{ textAlign: "right", fontSize: 11, color: "#94a3b8" }}>Aarav Sharma · 02 May 2026</div>
                  <div style={{ fontFamily: "var(--font-poppins)", fontSize: 17, color: "#020617", fontWeight: 600, margin: "14px 0 14px", textAlign: "center" }}>Statement of Purpose</div>
                  <div style={{ fontSize: 11, color: "#0369a1", fontWeight: 600, textAlign: "center", letterSpacing: ".18em", textTransform: "uppercase" }}>MSc Finance · Trinity College Dublin</div>
                  <h4>Background</h4>
                  <p>{bg}</p>
                  <h4>Motivation</h4>
                  <p>{motivation}</p>
                  <h4>Why TCD &amp; Ireland</h4>
                  <p>{whyTcd}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — score column */}
          <div className="docs-right">
            <div className="score-card">
              <h4>Strength score</h4>
              <div className="big">89<span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>/100</span></div>
              <div className="small" style={{ color: "#10b981", fontWeight: 600, marginTop: 4 }}>↑ +31 from draft 1</div>
              <div className="score-bars">
                {[
                  { l: "Specificity", v: 90 },
                  { l: "Structure", v: 95 },
                  { l: "Length", v: 82 },
                  { l: "Tone", v: 88 },
                  { l: "Uniqueness", v: 91 }
                ].map((s, i) => (
                  <div key={i} className="score-bar">
                    <span>{s.l}</span>
                    <div className="bar"><i style={{ width: s.v + "%" }} /></div>
                    <b>{s.v}</b>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 10, marginTop: 14, display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "#475569" }}>
                <span>Word count</span><b style={{ color: "#0f172a" }}>812 / 750–900</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "#475569", marginTop: 4 }}>
                <span>Estimated read</span><b style={{ color: "#0f172a" }}>3.5 min</b>
              </div>
            </div>

            <div className="tips-card">
              <h4>Top suggestions</h4>
              <ul>
                <li>Add one named Irish company you'd target post-grad</li>
                <li>Lead Section 2 with a specific date or moment</li>
                <li>Cut adjectives in Para 4 — verbs are stronger</li>
                <li>Confirm CGPA format matches TCD's transcript expectations</li>
              </ul>
            </div>

            <div className="tips-card">
              <h4>What admissions look for</h4>
              <ul>
                <li>Named modules &amp; faculty research</li>
                <li>Measurable outcomes, not job titles</li>
                <li>Why <i>this</i> programme — not a category</li>
                <li>A coherent story across sections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WebMentors, WebDocs });
