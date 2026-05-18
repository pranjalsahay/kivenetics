import { useState, useEffect } from "react";

/* ── DESIGN TOKENS ── */
const C = {
  bg: "#F5F2EC",
  bgDark: "#EAE5DA",
  card: "#FDFCF9",
  cardBorder: "#DDD8CC",
  accent: "#C0392B",
  accentHov: "#A93226",
  accentLight: "#FDF0EE",
  dark: "#1A1815",
  text: "#2C2820",
  muted: "#6E6458",
  mutedL: "#A89E8C",
  gold: "#8B6914",
  goldLight: "#FBF5E6",
  green: "#1E7A45",
  greenLight: "#E8F5EE",
  blue: "#1A4F8A",
  blueLight: "#E8F0FA",
  border: "#DDD8CC",
  white: "#FDFCF9",
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.10)",
};

const font = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

/* ── GLOBAL STYLES injected once ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${font.sans}; background: ${C.bg}; color: ${C.text}; }
  a { text-decoration: none; color: inherit; }
  button { font-family: ${font.sans}; cursor: pointer; }
  input, textarea { font-family: ${font.sans}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: .45; }
  }
  .fadeUp  { animation: fadeUp .55s cubic-bezier(.22,.68,0,1.2) both; }
  .fadeUp2 { animation: fadeUp .55s .1s cubic-bezier(.22,.68,0,1.2) both; }
  .fadeUp3 { animation: fadeUp .55s .2s cubic-bezier(.22,.68,0,1.2) both; }
  .fadeIn  { animation: fadeIn .4s ease both; }

  .feat-card:hover { border-color: ${C.accent} !important; transform: translateY(-4px); box-shadow: ${C.shadowMd}; }
  .feat-card { transition: all .22s ease; }
  .nav-link:hover { color: ${C.text} !important; }
  .side-btn:hover { background: ${C.bgDark} !important; color: ${C.dark} !important; }
  .btn-primary:hover { background: ${C.accentHov} !important; }
  .btn-outline:hover { background: ${C.accentLight} !important; }
  .live-dot { animation: pulse 1.6s infinite; }
  .appt-card:hover { box-shadow: ${C.shadowMd}; }
  .appt-card { transition: box-shadow .2s; }
`;

function InjectCSS() {
  useEffect(() => {
    // Block browser back so the iframe never closes
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);

    if (!document.getElementById("kiv-global")) {
      const s = document.createElement("style");
      s.id = "kiv-global";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }

    return () => window.removeEventListener("popstate", blockBack);
  }, []);
  return null;
}

/* ── SHARED ATOMS ── */
const inp = {
  width: "100%", background: C.white, border: `1.5px solid ${C.border}`,
  borderRadius: 10, padding: "12px 15px", color: C.text, fontSize: 14,
  boxSizing: "border-box", outline: "none", transition: "border-color .2s",
  fontFamily: font.sans,
};
const lbl = {
  display: "block", fontSize: 11, color: C.muted, marginBottom: 6,
  fontWeight: 600, letterSpacing: .8, textTransform: "uppercase",
};
const primaryBtn = {
  background: C.accent, color: C.white, border: "none", borderRadius: 10,
  padding: "13px", fontSize: 14, cursor: "pointer", fontWeight: 600,
  letterSpacing: .3, width: "100%", transition: "background .2s",
};
const outlineBtn = {
  background: "transparent", border: `1.5px solid ${C.accent}`,
  color: C.accent, padding: "10px 22px", borderRadius: 10, cursor: "pointer",
  fontSize: 14, fontWeight: 600, transition: "background .18s",
};

/* ── LOGO ── */
const Logo = ({ sm }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: "100%",
    }}
  >
    <img
      src="/Group 93.png"
      alt="Kivenetics Logo"
      style={{
        height: sm ? 28 : 42, // reduced size
        width: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  </div>
);

/* ── BADGE ── */
const Badge = ({ label, color, bg }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 700, letterSpacing: .5,
    padding: "4px 12px", borderRadius: 100,
    background: bg, color,
  }}>{label}</span>
);

/* ── STAT CARD ── */
const Stat = ({ label, value, unit, color, sub }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.cardBorder}`,
    borderRadius: 16, padding: "20px 24px", flex: 1, minWidth: 130,
    boxShadow: C.shadow,
  }}>
    <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12, fontWeight: 600 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
      <span style={{ fontSize: 32, fontWeight: 700, color: color || C.dark, fontFamily: font.serif, lineHeight: 1 }}>{value}</span>
      {unit && <span style={{ fontSize: 13, color: C.muted }}>{unit}</span>}
    </div>
    {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontWeight: 500 }}>{sub}</div>}
  </div>
);

/* ── DASH NAV ── */
const DashNav = ({ user, onLogout }) => (
  <div style={{
    background: C.dark, padding: "0 32px", height: 60,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 200,
    borderBottom: "1px solid #2C2820",
    boxShadow: "0 2px 12px rgba(0,0,0,.25)",
  }}>
    <Logo sm dark />
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#242220", border: "1px solid #3A3830",
        borderRadius: 10, padding: "7px 14px",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.accent}, #8B1A1A)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: C.white,
        }}>
          {user.name.split(" ").map(x => x[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div style={{ fontSize: 13, color: C.white, fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "#6A6050", textTransform: "capitalize" }}>{user.role}</div>
        </div>
      </div>
      <button onClick={onLogout} className="side-btn" style={{
        background: "transparent", border: "1px solid #3A3830",
        color: "#7A7060", padding: "8px 16px", borderRadius: 9,
        cursor: "pointer", fontSize: 13, fontWeight: 500,
      }}>Sign out</button>
    </div>
  </div>
);

/* ── SIDE NAV BUTTON ── */
const SideBtn = ({ icon, label, active, onClick, accentColor }) => (
  <button onClick={onClick} className={active ? "" : "side-btn"} style={{
    display: "flex", alignItems: "center", gap: 11,
    padding: "10px 13px", width: "100%", borderRadius: 10,
    border: "none", cursor: "pointer",
    background: active ? C.bgDark : "transparent",
    color: active ? C.dark : C.muted,
    fontSize: 13.5, marginBottom: 3,
    borderLeft: active ? `3px solid ${accentColor || C.accent}` : "3px solid transparent",
    fontWeight: active ? 700 : 400, textAlign: "left",
    transition: "all .15s",
  }}>
    <span style={{ fontSize: 16 }}>{icon}</span>
    <span>{label}</span>
  </button>
);

/* ══════════════════════════════════════
   LANDING
══════════════════════════════════════ */
function Landing({ onLogin, onSignup }) {
  const [hov, setHov] = useState(null);
  const feats = [
    
    { icon: "🦽", t: "Advanced Wheelchair", d: "AI-assisted smart wheelchair for mobility, comfort, and intelligent navigation." },
    { icon: "💀", t: "3D Skull Analyzer", d: "Advanced 3D skull imaging and AI-based analysis for precision diagnosis." },
    { icon: "🔒", t: "Secure & Compliant", d: "HIPAA-grade encryption — your data stays yours." },
    { icon: "📊", t: "Analytics Dashboard", d: "Deep insights into patient outcomes and trends." },
    { icon: "🤖", t: "AI Assistance", d: "Smart suggestions and automated follow-up reminders." },
  ];
  const team = [
    { n: "Anshuman Singh", r: "CEO & Founder", i: "AS" },
    { n: "Kaustav", r: "CTO", i: "KA" },
   
    
    { n: "Nidhi P Setty", r: "Head of Research", i: "NS" },
   
    { n: "John Poly", r: "Head of Engineering", i: "JP" },
  ];
  const navLinks = ["About", "Product", "Team", "Contact"];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
height: 72, borderBottom: `1px solid ${C.border}`,
        background: "rgba(245,242,236,.92)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 0 rgba(0,0,0,.06)",
      }}>
        <Logo />
        <div style={{ display: "flex", gap: 36, fontSize: 14 }}>
          {navLinks.map(l => (
            <button key={l} type="button" onClick={e => { e.preventDefault(); const el = document.getElementById(l.toLowerCase()); if(el) el.scrollIntoView({behavior:"smooth"}); }} className="nav-link" style={{ background:"none", border:"none", color: C.muted, fontWeight: 500, transition: "color .15s", cursor:"pointer", fontSize:14, fontFamily:"inherit" }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onLogin} className="btn-outline" style={{ ...outlineBtn, padding: "9px 22px" }}>Login</button>
          <button onClick={onSignup} className="btn-primary" style={{ ...outlineBtn, background: C.accent, color: C.white, border: "none", padding: "9px 22px" }}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "96px 64px 80px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <div className="fadeUp">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: C.goldLight, border: `1px solid #D4B86A`,
            borderRadius: 100, padding: "5px 16px", marginBottom: 30,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>Future-Ready Healthcare</span>
          </div>
          <h1 style={{ fontFamily: font.serif, fontSize: "clamp(48px,5vw,70px)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: C.dark }}>
            UPGRADE<br />
            <span>YOUR </span><span style={{ color: C.accent }}>HEALTH</span><br />
            WITH <span style={{ color: C.accent }}>SMART</span><br />TECH
          </h1>
          <p style={{ fontSize: 16, color: C.muted, maxWidth: 460, lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>
            Redefining healthcare with next-generation smart systems that monitor, track, and enhance your health journey — every step of the way.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={onSignup} className="btn-primary" style={{
              background: C.accent, color: C.white, border: "none",
              padding: "14px 34px", borderRadius: 10, fontSize: 15,
              cursor: "pointer", fontWeight: 700, letterSpacing: .3,
              boxShadow: `0 4px 14px rgba(192,57,43,.3)`,
            }}>Get Started Free</button>
            <button onClick={onLogin} className="btn-outline" style={{ ...outlineBtn, padding: "14px 34px" }}>Login →</button>
          </div>
        </div>

        {/* Hero cards */}
        <div className="fadeUp2" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18,
            padding: 26, borderLeft: `4px solid ${C.accent}`, boxShadow: C.shadow,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>24/7 Monitoring</span>
              <span className="live-dot" style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>● Live</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[["Heart Rate", "72 bpm", C.accent], ["SpO₂", "98%", C.green], ["BP", "118/76", C.blue]].map(([l, v, cl]) => (
                <div key={l} style={{ flex: 1, background: C.bg, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: .8, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 19, fontWeight: 700, color: cl, fontFamily: font.serif }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     

      {/* FEATURES */}
      <div id="product" style={{ padding: "88px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Our Product</div>
          <h2 style={{ fontFamily: font.serif, fontSize: 38, color: C.dark, marginBottom: 48 }}>Built for real healthcare</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 20 }}>
            {feats.map((f, i) => (
              <div key={f.t} className="feat-card" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                style={{
                  background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 30,
                  boxShadow: hov === i ? C.shadowMd : C.shadow,
                }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14, background: C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 18,
                }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 8 }}>{f.t}</div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" style={{ padding: "88px 64px", background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>About Us</div>
            <h2 style={{ fontFamily: font.serif, fontSize: 36, color: C.dark, marginBottom: 20 }}>Reforming healthcare one system at a time</h2>
            <p style={{ color: C.muted, lineHeight: 1.9, fontSize: 15, fontWeight: 300 }}>Kivenetics develops innovative solutions at the intersection of engineering, artificial intelligence, automation, robotics, and healthcare technology. We design high-precision, customised systems that solve real-world challenges, improve efficiency, and enhance human capability.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["🎯 Our Mission", "To turn bold engineering and AI ideas into dependable healthcare solutions that reduce stress, improve outcomes, and support professionals with practical, precise, human-centred tools."],
              ["🔭 Our Vision", "To build a future where intelligent medical technology is accessible, adaptive, and meaningful in everyday care — helping people live better and teams work smarter."]
            ].map(([t, d]) => (
              <div key={t} style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 24, boxShadow: C.shadow }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 10, fontSize: 15 }}>{t}</div>
                <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* INSTITUTIONS */}
<div style={{ padding: "80px 64px" }}>
  <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
    <div style={{
      fontSize: 11,
      color: C.muted,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 36,
      fontWeight: 600
    }}>
      Institutes who trust us
    </div>

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 18,
      flexWrap: "wrap"
    }}>
      {[
        ["VIT", "Vellore Institute of Technology", "Trusted academic innovation partner"],
        ["CMC", "Christian Medical College Vellore", "Clinical collaboration support"],
        ["IIC", "Institution's Innovation Council", "Innovation and ecosystem enablement"],
      ].map(([a, n, s]) => (
        <div
          key={a}
          style={{
            background: C.white,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 18,
            padding: "26px 30px",
            minWidth: 210,
            textAlign: "center",
            boxShadow: C.shadow,
          }}
        >
          <div style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: C.bgDark,
            border: `2px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
            fontWeight: 700,
            color: C.dark,
            fontSize: 14,
            fontFamily: font.serif,
          }}>
            {a}
          </div>

          <div style={{
            fontWeight: 700,
            color: C.dark,
            fontSize: 13,
            marginBottom: 5
          }}>
            {n}
          </div>

          <div style={{
            fontSize: 12,
            color: C.muted
          }}>
            {s}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* TEAM */}
      <div id="team" style={{ padding: "88px 64px", background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Meet Our Team</div>
          <h2 style={{ fontFamily: font.serif, fontSize: 36, color: C.dark, marginBottom: 40 }}>The people behind Kivenetics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
            {team.map(p => (
              <div key={p.n} style={{
                background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18,
                padding: 28, textAlign: "center", boxShadow: C.shadow,
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, #8B1A1A)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontWeight: 700, color: C.white, fontSize: 17,
                  fontFamily: font.serif, boxShadow: "0 3px 10px rgba(192,57,43,.25)",
                }}>{p.i}</div>
                <div style={{ fontWeight: 700, color: C.dark, fontSize: 14, marginBottom: 5 }}>{p.n}</div>
                <div style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>{p.r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION + VISION */}
      <div style={{ padding: "88px 64px", background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Mission */}
            <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: 40, boxShadow: C.shadow }}>
              <h3 style={{ fontFamily: font.serif, fontSize: 28, color: C.gold, marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>Our Mission</h3>
              <p style={{ color: C.muted, lineHeight: 1.9, fontSize: 15, fontWeight: 300 }}>To turn bold engineering and AI ideas into dependable healthcare solutions that reduce stress, improve outcomes, and support professionals with tools that are practical, precise, and human-centered.</p>
            </div>
            {/* Vision */}
            <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 20, padding: 40, boxShadow: C.shadow }}>
              <h3 style={{ fontFamily: font.serif, fontSize: 28, color: C.gold, marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>Our Vision</h3>
              <p style={{ color: C.muted, lineHeight: 1.9, fontSize: 15, fontWeight: 300 }}>To build a future where intelligent medical technology is accessible, adaptive, and meaningful in everyday care, helping people live better and enabling healthcare teams to work smarter.</p>
            </div>
          </div>
        </div>
      </div>

      {/* OUR BLOGS */}
      <div style={{ padding: "88px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: font.serif, fontSize: 40, color: C.dark, marginBottom: 12, textTransform: "uppercase" }}>Our Blogs</h2>
          <div style={{ width: 60, height: 3, background: C.accent, borderRadius: 2, marginBottom: 48 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {[
              { tag: "AI in Healthcare", title: "How AI is Reshaping Patient Diagnostics in 2026", date: "May 10, 2026", read: "5 min read" },
              { tag: "Smart Devices", title: "The Future of Wheelchair Technology and Intelligent Mobility", date: "Apr 28, 2026", read: "4 min read" },
              { tag: "Innovation", title: "3D Skull Analysis: Breakthrough in Precision Medicine", date: "Apr 15, 2026", read: "6 min read" },
            ].map(b => (
              <div key={b.title} className="feat-card" style={{
                background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18,
                overflow: "hidden", boxShadow: C.shadow, cursor: "pointer",
              }}>
                <div style={{
                  height: 160, background: `linear-gradient(135deg, ${C.bgDark} 0%, ${C.border} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderBottom: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 48 }}>
                    {b.tag === "AI in Healthcare" ? "🧠" : b.tag === "Smart Devices" ? "🦽" : "💀"}
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                    color: C.accent, background: C.accentLight, padding: "4px 10px", borderRadius: 100,
                  }}>{b.tag}</span>
                  <div style={{ fontFamily: font.serif, fontSize: 17, color: C.dark, fontWeight: 700, margin: "14px 0 10px", lineHeight: 1.4 }}>{b.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted }}>
                    <span>{b.date}</span>
                    <span>{b.read}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "88px 64px", background: C.bgDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Get in Touch</div>
          <h2 style={{ fontFamily: font.serif, fontSize: 40, color: C.dark, marginBottom: 8 }}>Contact Us</h2>
          <p style={{ color: C.muted, marginBottom: 48, fontSize: 15, fontWeight: 300 }}>Need assistance? We're always here for you and your patients' health!</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 44 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.dark, fontSize: 15, marginBottom: 24 }}>Reach us out</div>
              {[["📞", "Call us", "+91 98765 43210"], ["✉️", "Email us", "team@Kivenetics.com"], ["🏢", "Head Office", "VIT Vellore, Catpadi, Tamil Nadu – 632014"]].map(([ic, lb, val]) => (
                <div key={lb} style={{ display: "flex", gap: 14, marginBottom: 22, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", background: C.accentLight,
                    border: `1px solid #EECCCA`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0,
                  }}>{ic}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.dark }}>{lb}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 32, boxShadow: C.shadow }}>
              <div style={{ fontWeight: 700, color: C.dark, marginBottom: 22, fontSize: 16 }}>Send us a message</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div><label style={lbl}>First Name</label><input style={inp} placeholder="First name" /></div>
                <div><label style={lbl}>Last Name</label><input style={inp} placeholder="Last name" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div><label style={lbl}>Email</label><input style={inp} placeholder="you@email.com" /></div>
                <div><label style={lbl}>Phone</label><input style={inp} placeholder="+91 ..." /></div>
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={lbl}>Message</label>
                <textarea style={{ ...inp, height: 100, resize: "vertical" }} placeholder="How can we help?" />
              </div>
              <button className="btn-primary" style={{ ...primaryBtn, width: "auto", padding: "12px 32px" }}>Send Message</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "28px 64px", borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16, background: C.bg,
      }}>
        <Logo sm />
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: C.muted }}>
          {["Company", "Quick Links", "Support", "Privacy"].map(l => (
            <span key={l} style={{ cursor: "pointer", transition: "color .15s" }}>{l}</span>
          ))}
        </div>
        <div style={{ color: C.muted, fontSize: 13 }}>© 2026 Kivenetics. All rights reserved.</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SIGNUP
══════════════════════════════════════ */
function Signup({ onBack, onSignup, onSuccess }) {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.password) return setErr("Please fill all fields.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");
    if (form.password.length < 6) return setErr("Password must be at least 6 characters.");
    onSuccess({ name: form.name, email: form.email, role });
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 480 }} className="fadeIn">
        <button type="button" onClick={e => { e.preventDefault(); step === "form" ? setStep("role") : onBack(); }} style={{
          background: "transparent", border: "none", color: C.muted, cursor: "pointer",
          fontSize: 14, marginBottom: 32, display: "flex", alignItems: "center", gap: 8, fontFamily: font.sans,
        }}>← Back</button>
        <div style={{ textAlign: "center", marginBottom: 36 }}><Logo /></div>

        {step === "role" && (
          <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 22, padding: 44, boxShadow: C.shadowMd }}>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 8px", fontSize: 24, textAlign: "center" }}>Let's Get You Started</h2>
            <p style={{ color: C.muted, fontSize: 14, textAlign: "center", marginBottom: 34, fontWeight: 300 }}>Select your account type</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { r: "doctor", l: "DOCTOR", s: "Access your patients & clinical data", filled: false },
                { r: "patient", l: "PATIENT", s: "View your records, vitals & health data", filled: true },
              ].map(({ r, l, s, filled }) => (
                <button key={r} onClick={() => { setRole(r); setStep("form"); }} style={{
                  background: filled ? C.accent : "transparent",
                  border: `1.5px solid ${filled ? C.accent : C.border}`,
                  color: filled ? C.white : C.text,
                  padding: "20px 24px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                  transition: "all .18s", fontFamily: font.sans,
                  boxShadow: filled ? "0 4px 14px rgba(192,57,43,.25)" : "none",
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 1.5 }}>{l}</div>
                  <div style={{ fontSize: 13, marginTop: 5, opacity: .8 }}>{s}</div>
                </button>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.muted }}>Already have an account? <span onClick={onSignup} style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}>Login instead</span></p>
          </div>
        )}

        {step === "form" && (
          <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 22, padding: 44, boxShadow: C.shadowMd }}>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 4px", fontSize: 24 }}>Create Account</h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 30, fontWeight: 300 }}>Signing up as <strong style={{ fontWeight: 700, color: C.dark }}>{role === "doctor" ? "DOCTOR" : "PATIENT"}</strong></p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div><label style={lbl}>Full Name</label><input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><label style={lbl}>Email Address</label><input style={inp} placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><label style={lbl}>Password</label><input type="password" style={inp} placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
              <div><label style={lbl}>Confirm Password</label><input type="password" style={inp} placeholder="Confirm password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} /></div>
            </div>
            {err && <div style={{ color: C.accent, fontSize: 13, marginTop: 14, fontWeight: 500 }}>{err}</div>}
            <button onClick={submit} className="btn-primary" style={{ ...primaryBtn, marginTop: 26, boxShadow: "0 4px 14px rgba(192,57,43,.25)" }}>Create Account →</button>
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.muted }}>Already have an account? <span onClick={onSignup} style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}>Login</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   LOGIN
══════════════════════════════════════ */
function Login({ onBack, onSuccess, onSignup }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const DEMO = [
    { email: "doctor@Kivenetics.com", password: "demo123", name: "Dr. Sarah Chen", role: "doctor" },
    { email: "patient@Kivenetics.com", password: "demo123", name: "Alex Johnson", role: "patient" },
  ];
  const submit = () => {
    const m = DEMO.find(a => a.email === email && a.password === pw);
    m ? onSuccess({ name: m.name, role: m.role, email: m.email }) : setErr("Invalid credentials. Use demo accounts below.");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 460 }} className="fadeIn">
        <button type="button" onClick={e => { e.preventDefault(); onBack(); }} style={{
          background: "transparent", border: "none", color: C.muted, cursor: "pointer",
          fontSize: 14, marginBottom: 32, display: "flex", alignItems: "center", gap: 8, fontFamily: font.sans,
        }}>← Back to home</button>
        <div style={{ textAlign: "center", marginBottom: 36 }}><Logo /></div>
        <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 22, padding: 44, boxShadow: C.shadowMd }}>
          <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 30px", fontSize: 24 }}>Welcome back</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 20 }}>
            <div><label style={lbl}>Email Address</label><input style={inp} placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><label style={lbl}>Password</label><input type="password" style={inp} placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} /></div>
          </div>
          {err && <div style={{ color: C.accent, fontSize: 13, marginBottom: 16, fontWeight: 500 }}>{err}</div>}
          <button onClick={submit} className="btn-primary" style={{ ...primaryBtn, boxShadow: "0 4px 14px rgba(192,57,43,.25)" }}>Login →</button>
          <div style={{ marginTop: 24, padding: "16px", background: C.bg, borderRadius: 12, border: `1px dashed ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Demo Credentials — click to fill</div>
            {DEMO.map(a => (
              <div key={a.role} onClick={() => { setEmail(a.email); setPw(a.password); }} style={{
                cursor: "pointer", marginBottom: 8, padding: "10px 14px", borderRadius: 10,
                background: C.white, border: `1px solid ${C.cardBorder}`, transition: "border-color .15s",
              }}>
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{a.role === "doctor" ? "👨‍⚕️ Doctor" : "🧑 Patient"}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{a.email} / demo123</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.muted }}>Don't have an account? <span onClick={onSignup} style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DOCTOR DASHBOARD
══════════════════════════════════════ */
function DoctorDash({ user, onLogout }) {
  const [tab, setTab] = useState("overview");
  const patients = [
    { n: "Alex Johnson", age: 34, cond: "Hypertension", st: "Stable", next: "Today 2:30 PM", id: "KYB-00418" },
    { n: "Maria Garcia", age: 52, cond: "Diabetes T2", st: "Review", next: "Today 4:00 PM", id: "KYB-00217" },
    { n: "James Wu", age: 28, cond: "Asthma", st: "Stable", next: "Tomorrow 10 AM", id: "KYB-00356" },
    { n: "Priya Sharma", age: 45, cond: "Arthritis", st: "Critical", next: "Today 3:15 PM", id: "KYB-00591" },
    { n: "Robert Lee", age: 61, cond: "Heart Disease", st: "Stable", next: "Thu 11 AM", id: "KYB-00104" },
    { n: "Aisha Patel", age: 38, cond: "Migraine", st: "Review", next: "Fri 9 AM", id: "KYB-00722" },
    { n: "Chen Wei", age: 55, cond: "Liver Cirrhosis", st: "Critical", next: "Today 5 PM", id: "KYB-00843" },
  ];
  const slots = [
    { time: "9:00 AM", pat: "Emily Chen", type: "Follow-up", st: "Confirmed" },
    { time: "10:30 AM", pat: "David Kim", type: "New Patient", st: "Confirmed" },
    { time: "12:00 PM", pat: "—", type: "Break", st: "Blocked" },
    { time: "2:30 PM", pat: "Alex Johnson", type: "Check-up", st: "Confirmed" },
    { time: "3:15 PM", pat: "Priya Sharma", type: "Urgent Review", st: "Confirmed" },
    { time: "4:00 PM", pat: "Maria Garcia", type: "Review", st: "Pending" },
    { time: "5:00 PM", pat: "Chen Wei", type: "Follow-up", st: "Confirmed" },
  ];
  const stColor = s => ({ Stable: C.green, Critical: C.accent, Review: C.gold })[s] || C.muted;
  const stBg = s => ({ Stable: C.greenLight, Critical: C.accentLight, Review: C.goldLight })[s] || C.bgDark;
  const stBadge = s => ({
    Confirmed: { bg: C.greenLight, c: C.green },
    Pending: { bg: C.goldLight, c: C.gold },
    Blocked: { bg: C.bgDark, c: C.muted },
  })[s] || {};
  const sides = [
    { id: "overview", ic: "📊", l: "Overview" },
    { id: "patients", ic: "👥", l: "Patients" },
    { id: "slots", ic: "📅", l: "Appointments" },
    { id: "profile", ic: "👤", l: "My Profile" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <DashNav user={user} onLogout={onLogout} />
      <div style={{ display: "flex", maxWidth: 1280, margin: "0 auto", padding: "28px 24px", gap: 24 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16,
            padding: 20, marginBottom: 14, textAlign: "center", boxShadow: C.shadow,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.accent}, #8B1A1A)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px", fontWeight: 700, color: C.white, fontSize: 20,
              fontFamily: font.serif, boxShadow: "0 3px 10px rgba(192,57,43,.25)",
            }}>SC</div>
            <div style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{user.name}</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>Cardiologist</div>
            <div style={{ color: C.green, fontSize: 12, marginTop: 8, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />Available
            </div>
          </div>
          {sides.map(s => <SideBtn key={s.id} icon={s.ic} label={s.l} active={tab === s.id} onClick={() => setTab(s.id)} />)}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === "overview" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>Good morning, {user.name.split(" ")[0]} 👋</h2>
            <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
              <Stat label="Patients Today" value="8" color={C.blue} sub="↑ 2 from yesterday" />
              <Stat label="Total Patients" value="142" color={C.dark} />
              <Stat label="Pending Reviews" value="3" color={C.gold} />
              <Stat label="Critical Cases" value="2" color={C.accent} />
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 26, boxShadow: C.shadow }}>
              <div style={{ fontWeight: 700, color: C.dark, marginBottom: 20, fontSize: 15 }}>Today's Schedule</div>
              {slots.map(s => (
                <div key={s.time} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: C.muted, minWidth: 78, fontWeight: 600 }}>{s.time}</span>
                    <div>
                      <div style={{ color: C.dark, fontSize: 14, fontWeight: 600 }}>{s.pat}</div>
                      <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{s.type}</div>
                    </div>
                  </div>
                  <Badge label={s.st} bg={stBadge(s.st).bg} color={stBadge(s.st).c} />
                </div>
              ))}
            </div>
          </>}

          {tab === "patients" && <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: font.serif, color: C.dark, margin: 0, fontSize: 28 }}>Patients</h2>
              <button className="btn-primary" style={{ ...primaryBtn, width: "auto", padding: "10px 22px" }}>+ Add Patient</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {patients.map(p => (
                <div key={p.n} className="appt-card" style={{
                  background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 14,
                  padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  boxShadow: C.shadow,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", background: C.bgDark,
                      border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.dark, fontWeight: 700, fontSize: 13, fontFamily: font.serif,
                    }}>{p.n.split(" ").map(x => x[0]).join("")}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{p.n}</div>
                      <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>Age {p.age} · {p.cond} · {p.id}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: stColor(p.st), fontWeight: 700, background: stBg(p.st), padding: "4px 12px", borderRadius: 100 }}>
                      ● {p.st}
                    </div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>{p.next}</div>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {tab === "slots" && <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: font.serif, color: C.dark, margin: 0, fontSize: 28 }}>Appointment Slots</h2>
              <button className="btn-outline" style={{ ...outlineBtn, padding: "9px 20px" }}>+ Add Slot</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
              {slots.map(s => (
                <div key={s.time} style={{
                  background: C.white, border: `1px solid ${s.st === "Blocked" ? C.border : C.cardBorder}`,
                  borderRadius: 16, padding: 22, opacity: s.st === "Blocked" ? .55 : 1,
                  boxShadow: C.shadow,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.dark, fontFamily: font.serif, marginBottom: 10 }}>{s.time}</div>
                  <div style={{ color: C.dark, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.pat}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginBottom: 14 }}>{s.type}</div>
                  <Badge label={s.st} bg={stBadge(s.st).bg} color={stBadge(s.st).c} />
                </div>
              ))}
              <div style={{
                background: "transparent", border: `2px dashed ${C.border}`, borderRadius: 16,
                padding: 22, display: "flex", alignItems: "center", justifyContent: "center",
                color: C.muted, cursor: "pointer", fontSize: 14, minHeight: 130,
              }}>+ Add slot</div>
            </div>
          </>}

          {tab === "profile" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>My Profile</h2>
            <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 36, boxShadow: C.shadow }}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 30 }}>
                <div style={{
                  width: 76, height: 76, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, #8B1A1A)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, color: C.white, fontSize: 26, fontFamily: font.serif,
                  boxShadow: "0 4px 14px rgba(192,57,43,.28)",
                }}>SC</div>
                <div>
                  <div style={{ fontFamily: font.serif, fontSize: 24, color: C.dark }}>{user.name}</div>
                  <div style={{ color: C.muted, marginTop: 5, fontSize: 14 }}>Cardiologist · MBBS, MD</div>
                  <div style={{ color: C.green, fontSize: 13, marginTop: 8, fontWeight: 600 }}>● Verified Doctor</div>
                </div>
              </div>
              {[["Specialisation", "Cardiology"], ["Experience", "12 years"], ["Hospital", "Kivenetics Medical Centre"], ["Consultation Fee", "₹800"], ["Languages", "English, Hindi, Tamil"], ["Email", user.email || "doctor@Kivenetics.com"], ["License No.", "MCI-2014-CRD-44821"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.muted, fontSize: 14 }}>{k}</span>
                  <span style={{ color: C.dark, fontSize: 14, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PATIENT DASHBOARD
══════════════════════════════════════ */
function PatientDash({ user, onLogout }) {
  const [tab, setTab] = useState("overview");
  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", color: C.accent },
    { label: "Blood Pressure", value: "118/76", unit: "mmHg", color: C.blue },
    { label: "SpO₂", value: "98", unit: "%", color: C.green },
    { label: "Temperature", value: "36.6", unit: "°C", color: C.gold },
  ];
  const history = [
    { date: "May 14, 2026", doc: "Dr. Sarah Chen", diag: "Hypertension Check", notes: "Blood pressure slightly elevated. Continue Amlodipine 5mg. Return in 4 weeks." },
    { date: "Apr 28, 2026", doc: "Dr. Rajiv Patel", diag: "General Check-up", notes: "All vitals within normal range. No medication changes. Next check in 6 weeks." },
    { date: "Mar 15, 2026", doc: "Dr. Sarah Chen", diag: "Cardiology Follow-up", notes: "Significant improvement noted. Dosage adjusted to 5mg from 10mg. ECG normal." },
    { date: "Feb 2, 2026", doc: "Dr. Meena Rao", diag: "Blood Panel Review", notes: "Cholesterol slightly high. Dietary changes recommended. Statin therapy discussed." },
  ];
  const appts = [
    { date: "May 20, 2026", time: "2:30 PM", doc: "Dr. Sarah Chen", type: "Cardiology Follow-up", st: "Confirmed" },
    { date: "Jun 5, 2026", time: "11:00 AM", doc: "Dr. Meena Rao", type: "Routine Blood Test", st: "Pending" },
    { date: "Jun 22, 2026", time: "10:00 AM", doc: "Dr. Sarah Chen", type: "3-month Review", st: "Scheduled" },
  ];
  const meds = [
    { name: "Amlodipine", dose: "5mg", freq: "Once daily", refill: "Jun 10, 2026" },
    { name: "Atorvastatin", dose: "10mg", freq: "Once nightly", refill: "Jul 1, 2026" },
    { name: "Aspirin", dose: "75mg", freq: "Once daily", refill: "Jun 25, 2026" },
  ];
  const stBadge = s => ({
    Confirmed: { bg: C.greenLight, c: C.green },
    Pending: { bg: C.goldLight, c: C.gold },
    Scheduled: { bg: C.blueLight, c: C.blue },
  })[s] || {};
  const sides = [
    { id: "overview", ic: "🏠", l: "Overview" },
    { id: "vitals", ic: "💓", l: "Vitals" },
    { id: "history", ic: "📋", l: "Medical History" },
    { id: "appointments", ic: "📅", l: "Appointments" },
    { id: "medications", ic: "💊", l: "Medications" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <DashNav user={user} onLogout={onLogout} />
      <div style={{ display: "flex", maxWidth: 1280, margin: "0 auto", padding: "28px 24px", gap: 24 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16,
            padding: 20, marginBottom: 14, textAlign: "center", boxShadow: C.shadow,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.blue}, #0D3266)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px", fontWeight: 700, color: C.white, fontSize: 20,
              fontFamily: font.serif, boxShadow: "0 3px 10px rgba(26,79,138,.25)",
            }}>AJ</div>
            <div style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{user.name}</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>Patient ID: KYB-00418</div>
            <div style={{ color: C.green, fontSize: 12, marginTop: 8, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />Active
            </div>
          </div>
          {sides.map(s => <SideBtn key={s.id} icon={s.ic} label={s.l} active={tab === s.id} onClick={() => setTab(s.id)} accentColor={C.blue} />)}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === "overview" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>Hello, {user.name.split(" ")[0]} 👋</h2>
            <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
              {vitals.map(v => <Stat key={v.label} label={v.label} value={v.value} unit={v.unit} color={v.color} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 24, boxShadow: C.shadow }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 16, fontSize: 15 }}>Upcoming Appointments</div>
                {appts.map(a => (
                  <div key={a.date} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ color: C.dark, fontSize: 14, fontWeight: 600 }}>{a.type}</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>{a.date} · {a.time}</div>
                    <div style={{ color: C.blue, fontSize: 12, marginTop: 3 }}>{a.doc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 24, boxShadow: C.shadow }}>
                <div style={{ fontWeight: 700, color: C.dark, marginBottom: 16, fontSize: 15 }}>Health Summary</div>
                {[["Blood Group", "B+"], ["Allergies", "Penicillin"], ["Primary Condition", "Hypertension"], ["Current Meds", "3 active"], ["Last Visit", "May 14, 2026"], ["Next Visit", "May 20, 2026"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.muted, fontSize: 13 }}>{k}</span>
                    <span style={{ color: C.dark, fontSize: 13, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {tab === "vitals" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 6px", fontSize: 28 }}>Vitals</h2>
            <div style={{ color: C.muted, fontSize: 13, marginBottom: 26, fontWeight: 400 }}>Last updated: Today, 9:45 AM</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
              {vitals.map(v => (
                <div key={v.label} style={{ background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 28, boxShadow: C.shadow }}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12, fontWeight: 600 }}>{v.label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 46, fontWeight: 700, color: v.color, fontFamily: font.serif, lineHeight: 1 }}>{v.value}</span>
                    <span style={{ fontSize: 15, color: C.muted }}>{v.unit}</span>
                  </div>
                  <Badge label="● Normal" bg={C.greenLight} color={C.green} />
                  <div style={{ display: "flex", gap: 4, marginTop: 20, alignItems: "flex-end", height: 48 }}>
                    {[.55, .7, .65, .8, .72, .88, 1].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: 5, background: i === 6 ? v.color : v.color + "44", transition: "height .3s" }} />
                    ))}
                  </div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 8, textAlign: "right" }}>Last 7 days</div>
                </div>
              ))}
            </div>
          </>}

          {tab === "history" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>Medical History</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {history.map(h => (
                <div key={h.date} className="appt-card" style={{
                  background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16,
                  padding: 24, borderLeft: `4px solid ${C.blue}`, boxShadow: C.shadow,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: C.dark, fontSize: 14 }}>{h.diag}</div>
                    <div style={{ color: C.muted, fontSize: 13 }}>{h.date}</div>
                  </div>
                  <div style={{ color: C.blue, fontSize: 13, marginBottom: 10, fontWeight: 600 }}>{h.doc}</div>
                  <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{h.notes}</div>
                </div>
              ))}
            </div>
          </>}

          {tab === "appointments" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>Appointments</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {appts.map(a => (
                <div key={a.date} className="appt-card" style={{
                  background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16,
                  padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
                  boxShadow: C.shadow,
                }}>
                  <div>
                    <div style={{ fontWeight: 700, color: C.dark, marginBottom: 5, fontSize: 15 }}>{a.type}</div>
                    <div style={{ color: C.blue, fontSize: 13, marginBottom: 4 }}>{a.doc}</div>
                    <div style={{ color: C.muted, fontSize: 13 }}>{a.date} · {a.time}</div>
                    <div style={{ marginTop: 10 }}>
                      <Badge label={a.st} bg={stBadge(a.st).bg} color={stBadge(a.st).c} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-outline" style={{ ...outlineBtn, padding: "8px 16px", fontSize: 13 }}>Reschedule</button>
                    <button className="btn-primary" style={{
                      background: C.blue, border: "none", color: C.white,
                      padding: "8px 18px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600,
                    }}>Join</button>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {tab === "medications" && <>
            <h2 style={{ fontFamily: font.serif, color: C.dark, margin: "0 0 24px", fontSize: 28 }}>Medications</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {meds.map(m => (
                <div key={m.name} className="appt-card" style={{
                  background: C.white, border: `1px solid ${C.cardBorder}`, borderRadius: 16,
                  padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
                  boxShadow: C.shadow,
                }}>
                  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, background: C.accentLight,
                      border: `1px solid #EECCCA`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                    }}>💊</div>
                    <div>
                      <div style={{ fontWeight: 700, color: C.dark, fontSize: 15 }}>
                        {m.name} <span style={{ color: C.muted, fontWeight: 400, fontSize: 13 }}>{m.dose}</span>
                      </div>
                      <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{m.freq}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: C.muted }}>Refill by</div>
                    <div style={{ fontSize: 13, color: C.dark, fontWeight: 700, marginTop: 3 }}>{m.refill}</div>
                    <button className="btn-outline" style={{ marginTop: 10, ...outlineBtn, padding: "6px 14px", fontSize: 12 }}>Refill</button>
                  </div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
function App() {
  const [history, setHistory] = useState(["landing"]);
  const [user, setUser] = useState(null);

  const view = history[history.length - 1];

  const navigate = (next) => setHistory(h => [...h, next]);

  // Never pop below 1 — prevents the browser from taking over and closing the tab
  const goBack = () => setHistory(h => h.length > 1 ? h.slice(0, -1) : ["landing"]);

  return (
    <>
      <InjectCSS />
      {view === "landing" && (
        <Landing
          onLogin={() => navigate("login")}
          onSignup={() => navigate("signup")}
        />
      )}
      {view === "signup" && (
        <Signup
          onBack={goBack}
          onSignup={() => setHistory(h => [...h.slice(0, -1), "login"])}
          onSuccess={u => { setUser(u); navigate("dashboard"); }}
        />
      )}
      {view === "login" && (
        <Login
          onBack={goBack}
          onSignup={() => setHistory(h => [...h.slice(0, -1), "signup"])}
          onSuccess={u => { setUser(u); navigate("dashboard"); }}
        />
      )}
      {view === "dashboard" && user && (
        user.role === "doctor"
          ? <DoctorDash user={user} onLogout={() => { setUser(null); setHistory(["landing"]); }} />
          : <PatientDash user={user} onLogout={() => { setUser(null); setHistory(["landing"]); }} />
      )}
    </>
  );
}

export default App;