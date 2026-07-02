/* Shared icons + small primitives used across web + mobile pages. */
const Icon = ({ children, size = 16, stroke = 2 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
/* I.* are component functions — use as <I.menu /> or <I.menu size={20} />. */
const _IRAW = {
  menu: <Icon><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></Icon>,
  bell: <Icon><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></Icon>,
  arrowUp: <Icon><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></Icon>,
  arrowRight: <Icon><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></Icon>,
  arrowDown: <Icon><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></Icon>,
  back: <Icon><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></Icon>,
  chev: <Icon><path d="M9 18l6-6-6-6" /></Icon>,
  chevDown: <Icon><path d="M6 9l6 6 6-6" /></Icon>,
  search: <Icon><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>,
  globe: <Icon><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 0 20" /><path d="M12 2a15 15 0 0 0 0 20" /></Icon>,
  clip: <Icon><path d="M21 11.5l-9.5 9.5a5 5 0 1 1-7-7l9-9a3 3 0 1 1 4 4L9 17a1.5 1.5 0 1 1-2-2l8-8" /></Icon>,
  mic: <Icon><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M12 19v3" /></Icon>,
  send: <Icon><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></Icon>,
  spark: <Icon><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></Icon>,
  star: <Icon fill="currentColor" stroke="none"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.9l-6.2 3.2 1.2-6.9-5-4.9 6.9-1z" /></Icon>,
  check: <Icon><path d="M20 6L9 17l-5-5" /></Icon>,
  checkCircle: <Icon><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></Icon>,
  x: <Icon><path d="M18 6L6 18M6 6l12 12" /></Icon>,
  plus: <Icon><path d="M12 5v14M5 12h14" /></Icon>,
  file: <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></Icon>,
  grad: <Icon><path d="M12 3l10 5-10 5L2 8z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></Icon>,
  bank: <Icon><path d="M3 21h18" /><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9 10v8M15 10v8M19 10v8" /></Icon>,
  house: <Icon><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2v-9z" /></Icon>,
  plane: <Icon><path d="M22 2L2 11l8 3 3 8 9-20z" /></Icon>,
  car: <Icon><path d="M5 17H3v-5l3-7h12l3 7v5h-2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></Icon>,
  bus: <Icon><rect x="3" y="3" width="18" height="14" rx="2" /><path d="M3 12h18M7 21v-2M17 21v-2" /></Icon>,
  mail: <Icon><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 7l10 7L22 7" /></Icon>,
  lock: <Icon><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>,
  heart: <Icon><path d="M21 8.5a5.5 5.5 0 0 0-9-4.2A5.5 5.5 0 0 0 3 8.5c0 6 9 12 9 12s9-6 9-12z" /></Icon>,
  chat: <Icon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>,
  book: <Icon><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 19.5V21h16" /></Icon>,
  user: <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>,
  users: <Icon><circle cx="9" cy="7" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><circle cx="17" cy="9" r="3" /><path d="M22 21a5 5 0 0 0-7-4.6" /></Icon>,
  shield: <Icon><path d="M12 2l8 3v7c0 5-4 9-8 10-4-1-8-5-8-10V5z" /></Icon>,
  health: <Icon><path d="M12 21s-7-4.5-7-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-7 11-7 11" /></Icon>,
  money: <Icon><circle cx="12" cy="12" r="9" /><path d="M14 9a3 3 0 1 0-3 3 3 3 0 1 1-3 3" /><path d="M12 6v12" /></Icon>,
  bolt: <Icon><path d="M13 2L4 14h7l-2 8 9-12h-7z" /></Icon>,
  bot: <Icon><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4M8 12v2M16 12v2" /><circle cx="9" cy="14" r="1" fill="currentColor" /><circle cx="15" cy="14" r="1" fill="currentColor" /></Icon>,
  trending: <Icon><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></Icon>,
  trendDown: <Icon><path d="M3 7l6 6 4-4 8 8" /><path d="M14 17h7v-7" /></Icon>,
  bell2: <Icon><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></Icon>,
  whatsapp: <Icon><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" /></Icon>,
  rupee: <Icon><path d="M7 5h10M7 9h10M7 5c5 0 8 2 8 5s-3 4-8 4l8 6" /></Icon>,
  euro: <Icon><path d="M18 5a8 8 0 1 0 0 14M3 9h12M3 14h12" /></Icon>,
  swap: <Icon><path d="M7 4l-3 3 3 3M4 7h13M17 14l3 3-3 3M20 17H7" /></Icon>,
  calendar: <Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></Icon>,
  clock: <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>,
  mapPin: <Icon><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>,
  play: <Icon fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></Icon>,
  download: <Icon><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></Icon>,
  edit: <Icon><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Icon>,
  copy: <Icon><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>,
  eye: <Icon><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Icon>
};

/* Wrap each raw JSX element in a function so callers can use <I.x size={N} /> */
const I = Object.fromEntries(
  Object.entries(_IRAW).map(([k, el]) => [k, (props) => React.cloneElement(el, props)])
);

const Logo = ({ height = 30 }) => (
  <div className="brand">
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#0f172a", lineHeight: 1 }}>
        Guid<span style={{ color: "#0369a1" }}>-</span>On
      </span>
      <span style={{ fontSize: 12, marginLeft: 2 }}>🍀</span>
    </div>
    <div className="tag">India → Ireland · We've got ya.</div>
  </div>
);

const Stars = ({ n = 5 }) => (
  <div style={{ color: "#f59e0b", fontSize: 14, letterSpacing: 2 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</div>
);

const Avatar = ({ name, bg = "linear-gradient(135deg,#bae6fd,#3b82f6)", color = "#fff", size = 36 }) => (
  <div style={{ width: size, height: size, borderRadius: 9999, background: bg, color, fontFamily: "var(--font-poppins)", fontWeight: 600, fontSize: size * 0.36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
  </div>
);

/* ============================================================
   Web NAV + FOOTER — shared across all 8 web pages
   ============================================================ */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "demo", label: "Demo" },
  { id: "chatbot", label: "AI Chatbot" },
  { id: "resources", label: "Resources" },
  { id: "forex", label: "Forex" },
  { id: "mentors", label: "Mentors" },
  { id: "docs", label: "Doc Builder" }
];

const WebNav = ({ active, onNav }) => (
  <nav className="top">
    <div className="container inner">
      <div className="left">
        <a onClick={() => onNav("home")} style={{ cursor: "pointer" }}><Logo /></a>
        <div className="links">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} className={active === n.id ? "active" : ""} onClick={() => onNav(n.id)}>{n.label}</a>
          ))}
        </div>
      </div>
      <div className="right">
        <a className="btn btn-ghost" onClick={() => onNav("register")}>Sign in</a>
        <a className="btn btn-primary" onClick={() => onNav("register")}>Get Started Free</a>
      </div>
    </div>
  </nav>
);

const WebFooter = ({ onNav }) => (
  <footer className="foot">
    <div className="container">
      <div className="foot-grid">
        <div className="brand-blk">
          <Logo />
          <p>Built by students, for students. The only platform built specifically for Indian students moving to Ireland. Made with <span style={{ color: "#e11d48" }}>♥</span> in Dublin.</p>
        </div>
        <div>
          <h5>Platform</h5>
          <a onClick={() => onNav("chatbot")}>AI Chatbot</a>
          <a onClick={() => onNav("resources")}>Resource Hub</a>
          <a onClick={() => onNav("forex")}>Forex Notifier</a>
          <a onClick={() => onNav("docs")}>Document Builder</a>
        </div>
        <div>
          <h5>Community</h5>
          <a onClick={() => onNav("mentors")}>Find a Mentor</a>
          <a>Become a Mentor</a>
          <a>WhatsApp Community</a>
          <a>Blog</a>
        </div>
        <div>
          <h5>Company</h5>
          <a>About</a>
          <a>Privacy Policy</a>
          <a>Terms of Use</a>
          <a>Contact</a>
        </div>
      </div>
      <div className="legal">
        <span>© 2026 Guid-On · "Good on ya for coming to Ireland" 🍀</span>
        <span style={{ maxWidth: 460, textAlign: "right" }}>Guid-On is not affiliated with any Irish government body. Always verify critical information at official sources.</span>
      </div>
    </div>
  </footer>
);

/* ============================================================
   Mobile NAV + FOOTER + TABBAR
   ============================================================ */
const MobileNav = ({ onNav, title }) => (
  <div className="m-nav">
    <button className="iconbtn"><I.menu /></button>
    <div className="brand">
      <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em", color: "#0f172a" }}>Guid-On 🍀</span>
    </div>
    <button className="m-pillbtn" onClick={() => onNav && onNav("register")}>Sign up</button>
  </div>
);

const MobileTabBar = ({ active, onNav }) => (
  <div className="m-tabbar">
    <div className={"m-tab" + (active === "home" ? " active" : "")} onClick={() => onNav("home")}>
      <div style={{ width: 22, height: 22 }}><I.house /></div>Home
    </div>
    <div className={"m-tab" + (active === "resources" ? " active" : "")} onClick={() => onNav("resources")}>
      <div style={{ width: 22, height: 22 }}><I.book /></div>Resources
    </div>
    <div className={"m-tab" + (active === "chatbot" ? " active" : "")} onClick={() => onNav("chatbot")}>
      <div style={{ width: 22, height: 22 }}><I.bot /></div>Chat
    </div>
    <div className={"m-tab" + (active === "forex" ? " active" : "")} onClick={() => onNav("forex")}>
      <div style={{ width: 22, height: 22 }}><I.trending /></div>Forex
    </div>
    <div className={"m-tab" + (active === "mentors" ? " active" : "")} onClick={() => onNav("mentors")}>
      <div style={{ width: 22, height: 22 }}><I.users /></div>Mentors
    </div>
  </div>
);

const MobileFooter = () => (
  <footer className="m-foot">
    <div style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 6 }}>Guid-On 🍀</div>
    <p>Built by students, for students. Made with ♥ in Dublin.</p>
    <div className="m-foot-cols">
      <div><h5>Platform</h5><a>AI Chatbot</a><a>Resources</a><a>Forex</a><a>Doc Builder</a></div>
      <div><h5>Community</h5><a>Mentors</a><a>Blog</a><a>WhatsApp</a><a>Instagram</a></div>
      <div><h5>Company</h5><a>About</a><a>Privacy</a><a>Terms</a><a>Contact</a></div>
      <div><h5>Trust</h5><a>GDPR</a><a>Verified sources</a><a>Help</a><a>Status</a></div>
    </div>
    <div className="legal">
      <span>© 2026 Guid-On · India → Ireland</span>
      <span>Not affiliated with any Irish gov body.</span>
    </div>
  </footer>
);

Object.assign(window, { I, Icon, Logo, Stars, Avatar, NAV_ITEMS, WebNav, WebFooter, MobileNav, MobileTabBar, MobileFooter });
