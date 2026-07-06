import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────
const C = {
  navy: "#0F2044", teal: "#0D9488", tealL: "#14B8A6",
  mint: "#CCFBF1", slate: "#334155", gray: "#64748B",
  light: "#F1F5F9", white: "#FFFFFF", gold: "#F59E0B",
  red: "#f61212", green: "#10B981", orange: "#F97316",
  bg: "#F8FAFC",
};

// ─── Tiny UI primitives ───────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", style = {} }) => {
  const base = { display: "block", width: "100%", padding: "11px 0",
    borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer",
    border: "none", textAlign: "center", transition: "opacity .15s", ...style };
  const variants = {
    primary: { background: C.teal, color: C.white },
    navy:    { background: C.navy, color: C.white },
    outline: { background: "transparent", color: C.teal, border: `1.5px solid ${C.teal}` },
    ghost:   { background: C.light, color: C.slate },
    danger:  { background: "#FEF2F2", color: C.red, border: `1px solid #FECACA` },
    green:   { background: C.green, color: C.white },
  };
  return <button style={{ ...base, ...variants[variant] }} onClick={onClick}>{children}</button>;
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.white, borderRadius: 12, border: `1px solid #E2E8F0`,
    padding: "12px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,.06)", ...style }}>
    {children}
  </div>
);

const Badge = ({ children, color = C.teal }) => (
  <span style={{ background: color + "22", color, fontSize: 10, fontWeight: 700,
    padding: "2px 7px", borderRadius: 20, display: "inline-block" }}>{children}</span>
);

const Stars = ({ n = 5 }) => (
  <span style={{ color: C.gold, fontSize: 12 }}>
    {"★".repeat(n)}{"☆".repeat(5 - n)}
  </span>
);

const Tag = ({ children }) => (
  <span style={{ background: C.light, color: C.slate, fontSize: 10,
    padding: "3px 8px", borderRadius: 6, display: "inline-block", margin: "2px 2px 2px 0" }}>
    {children}
  </span>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{ width: "100%", background: C.light, border: `1.5px solid #E2E8F0`,
      borderRadius: 8, padding: "9px 12px", fontSize: 12, color: C.slate,
      outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 9, fontWeight: 700, color: C.gray, letterSpacing: 1.5,
    textTransform: "uppercase", marginBottom: 8, marginTop: 4 }}>{children}</div>
);

// ─── Phone shell ──────────────────────────────────────────────────
const PhoneShell = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#E2E8F0", display: "flex",
    alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
    <div style={{ width: 375, minHeight: 700, background: C.white, borderRadius: 0,
      position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
      {/* status bar */}
      <div style={{ background: C.navy, display: "flex", justifyContent: "space-between",
        padding: "6px 16px", fontSize: 10, color: "#94A3B8" }}>
        <span>9:41</span><span>📶 🔋</span>
      </div>
      <div style={{ height: "calc(100vh - 52px)", overflowY: "auto" }}>{children}</div>
    </div>
  </div>
);

// ─── App header bar ───────────────────────────────────────────────
const AppBar = ({ title, sub, onBack, right }) => (
  <div style={{ background: C.navy, padding: "10px 16px", display: "flex",
    alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10 }}>
    {onBack && <span onClick={onBack} style={{ color: C.white, fontSize: 20, cursor: "pointer", lineHeight: 1 }}>←</span>}
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{title}</div>
      {sub && <div style={{ fontSize: 9, color: C.tealL }}>{sub}</div>}
    </div>
    {right}
  </div>
);

// ─── Bottom nav ───────────────────────────────────────────────────
const NavBar = ({ active, onNav, mode = "customer" }) => {
  const custItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "bookings", icon: "📋", label: "Bookings" },
    { id: "chat", icon: "💬", label: "Chat" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  const proItems = [
    { id: "pro_home", icon: "🏠", label: "Home" },
    { id: "pro_jobs", icon: "📋", label: "Jobs" },
    { id: "pro_earn", icon: "💰", label: "Earnings" },
    { id: "pro_profile", icon: "👤", label: "Profile" },
  ];
  const items = mode === "pro" ? proItems : custItems;
  return (
    <div style={{ display: "flex", borderTop: `1px solid #E2E8F0`,
      background: C.white, position: "sticky", bottom: 0, zIndex: 10 }}>
      {items.map(i => (
        <div key={i.id} onClick={() => onNav(i.id)}
          style={{ flex: 1, textAlign: "center", padding: "8px 0", cursor: "pointer",
            color: active === i.id ? C.teal : C.gray }}>
          <div style={{ fontSize: 20 }}>{i.icon}</div>
          <div style={{ fontSize: 9, fontWeight: active === i.id ? 700 : 400 }}>{i.label}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Progress stepper ─────────────────────────────────────────────
const Stepper = ({ steps, current }) => (
  <div style={{ display: "flex", alignItems: "center", padding: "10px 16px 6px" }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: i < current ? C.teal : i === current ? C.navy : "#E2E8F0",
            border: i === current ? `2px solid ${C.teal}` : "none",
            fontSize: 10, color: i <= current ? C.white : C.gray, fontWeight: 700 }}>
            {i < current ? "✓" : i + 1}
          </div>
          <div style={{ fontSize: 8, color: i <= current ? C.teal : C.gray, marginTop: 2, whiteSpace: "nowrap" }}>{s}</div>
        </div>
        {i < steps.length - 1 && (
          <div style={{ flex: 1, height: 2, background: i < current ? C.teal : "#E2E8F0", margin: "0 4px", marginBottom: 14 }} />
        )}
      </div>
    ))}
  </div>
);

// ─── DATA ─────────────────────────────────────────────────────────
const PROS = [
  { id: 1, name: "Ramu Verma", role: "Electrician", rating: 4.9, reviews: 87, price: 299, dist: "1.2 km", avail: "Available now", verified: true, badge: "Top Pro", exp: "12 yrs", tags: ["Wiring","Fan Install","MCB","Short Circuit","AC Wiring"], jobs: 143, city: "Alambagh, Lucknow", color: C.teal,
    reviewList: [
      { name: "Anita S.", stars: 5, text: "Came on time. Fixed the issue in 40 mins. Exact quote, no surprises.", date: "Jun 12, 2026" },
      { name: "Priya K.", stars: 5, text: "MCB and fan done in 1 hour. No mess left behind.", date: "Jun 8, 2026" },
      { name: "Rohit M.", stars: 4, text: "Good work but came 20 mins late. Quality was great.", date: "May 29, 2026" },
    ],
    services: [{ name: "Fan installation", price: 249 }, { name: "MCB replacement", price: 399 }, { name: "Wiring (1BHK)", price: 1999 }, { name: "Hourly rate", price: "299/hr" }]
  },
  { id: 2, name: "Suresh Kumar", role: "Electrician", rating: 4.8, reviews: 62, price: 350, dist: "2.1 km", avail: "Available today", verified: true, badge: "Gold", exp: "9 yrs", tags: ["Industrial","Wiring","Panel Box","Inverter"], jobs: 98, city: "Hazratganj, Lucknow", color: "#F59E0B",
    reviewList: [{ name: "Deepak R.", stars: 5, text: "Fixed complex panel issue. Professional and quick.", date: "Jun 10, 2026" }],
    services: [{ name: "Fan installation", price: 299 }, { name: "Panel check", price: 499 }]
  },
  { id: 3, name: "Manoj Singh", role: "Electrician", rating: 4.3, reviews: 31, price: 249, dist: "3.4 km", avail: "Available tomorrow", verified: false, badge: null, exp: "5 yrs", tags: ["Fan","Wiring","Light Fitting"], jobs: 47, city: "Indira Nagar, Lucknow", color: "#6366F1",
    reviewList: [{ name: "Seema P.", stars: 4, text: "Good work. Minor delay but quality fine.", date: "Jun 5, 2026" }],
    services: [{ name: "Fan installation", price: 199 }, { name: "Light fitting", price: 149 }]
  },
  { id: 4, name: "Kavita Rani", role: "House Cleaner", rating: 4.7, reviews: 55, price: 199, dist: "0.8 km", avail: "Available now", verified: true, badge: "Top Pro", exp: "7 yrs", tags: ["Deep Clean","Kitchen","Bathroom","Post-construction"], jobs: 112, city: "Gomti Nagar, Lucknow", color: "#EC4899",
    reviewList: [{ name: "Nisha T.", stars: 5, text: "Excellent work. House spotless after deep clean.", date: "Jun 14, 2026" }],
    services: [{ name: "Full home clean (2BHK)", price: 599 }, { name: "Kitchen deep clean", price: 299 }, { name: "Bathroom clean", price: 149 }]
  },
];

const CATEGORIES = [
  { icon: "⚡", name: "Electrician" },
  { icon: "🔧", name: "Plumber" },
  { icon: "🧹", name: "Cleaning" },
  { icon: "❄️", name: "AC Repair" },
  { icon: "🪚", name: "Carpenter" },
  { icon: "🎨", name: "Painter" },
  { icon: "🔩", name: "Appliance" },
  { icon: "➕", name: "More" },
];

// ─── SCREENS ──────────────────────────────────────────────────────

// SPLASH
const SplashScreen = ({ onCustomer, onPro }) => (
  <div style={{ padding: "0 24px", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", minHeight: 580, textAlign: "center" }}>
    <div style={{ fontSize: 72, marginBottom: 12 }}>🛡️</div>
    <div style={{ fontSize: 36, fontWeight: 800, color: C.navy, letterSpacing: -1 }}>TrustFix</div>
    <div style={{ fontSize: 14, color: C.teal, fontStyle: "italic", marginBottom: 8 }}>Home services, trusted.</div>
    <div style={{ fontSize: 12, color: C.gray, maxWidth: 260, lineHeight: 1.7, marginBottom: 48 }}>
      Book verified plumbers, electricians, cleaners & more. Transparent pricing. Guaranteed work.
    </div>
    <Btn onClick={onCustomer} style={{ marginBottom: 10 }}>Book a Service (Customer)</Btn>
    <Btn onClick={onPro} variant="outline">I'm a Service Professional</Btn>
    <div style={{ fontSize: 10, color: C.gray, marginTop: 24 }}>TrustFix v1.0 · Lucknow Beta</div>
  </div>
);

// OTP LOGIN
const LoginScreen = ({ onDone, role }) => {
  const [step, setStep] = useState(0); // 0=phone, 1=otp, 2=name
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [name, setName] = useState("");

  const handleOtp = (val, i) => {
    const arr = [...otp]; arr[i] = val.slice(-1); setOtp(arr);
  };
  const filled = otp.join("").length === 6;

  return (
    <div style={{ padding: "24px 20px" }}>
      {step === 0 && (
        <>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Enter your number</div>
          <div style={{ fontSize: 12, color: C.gray, marginBottom: 24 }}>We'll send a 6-digit OTP via SMS</div>
          <SectionLabel>Mobile Number</SectionLabel>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: C.light, border: `1.5px solid #E2E8F0`, borderRadius: 8,
              padding: "9px 12px", fontWeight: 700, fontSize: 13, color: C.navy }}>+91</div>
            <input placeholder="98XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)}
              style={{ flex: 1, background: C.light, border: `1.5px solid ${phone.length >= 10 ? C.teal : "#E2E8F0"}`,
                borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none", color: C.slate }} />
          </div>
          <div style={{ fontSize: 10, color: C.gray, margin: "10px 0 24px" }}>By continuing you agree to our Terms of Service</div>
          <Btn onClick={() => phone.length >= 5 && setStep(1)} variant={phone.length >= 5 ? "primary" : "ghost"}>
            Send OTP →
          </Btn>
          {role === "customer" && (
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.gray }}>
              Are you a professional? <span style={{ color: C.teal, fontWeight: 700 }}>Register here</span>
            </div>
          )}
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 40 }}>📱</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginTop: 8 }}>Verify your number</div>
            <div style={{ fontSize: 12, color: C.gray }}>Code sent to +91 {phone || "98XXXXXXXX"}</div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            {otp.map((v, i) => (
              <input key={i} maxLength={1} value={v} onChange={e => handleOtp(e.target.value, i)}
                style={{ width: 40, height: 48, textAlign: "center", fontSize: 20, fontWeight: 700,
                  border: `1.5px solid ${v ? C.teal : "#E2E8F0"}`, borderRadius: 8,
                  outline: "none", color: C.navy, background: C.light }} />
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: C.gray, marginBottom: 24 }}>Resend OTP in 0:45</div>
          <Btn onClick={() => filled && setStep(2)} variant={filled ? "primary" : "ghost"}>Verify & Continue</Btn>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Set up your profile</div>
          <div style={{ fontSize: 12, color: C.gray, marginBottom: 20 }}>Takes 30 seconds</div>
          <SectionLabel>Your Name</SectionLabel>
          <Input placeholder={role === "pro" ? "Ramu Verma" : "Priya Sharma"} value={name} onChange={e => setName(e.target.value)} />
          <SectionLabel>City</SectionLabel>
          <Input placeholder="Lucknow, UP" value="Lucknow, UP" onChange={() => {}} />
          {role === "pro" && (
            <>
              <SectionLabel>Primary Service</SectionLabel>
              <Input placeholder="e.g. Electrician" value="" onChange={() => {}} />
            </>
          )}
          <Btn onClick={() => name.length >= 2 && onDone(name || (role === "pro" ? "Ramu Verma" : "Priya Sharma"))}
            variant={name.length >= 2 ? "primary" : "ghost"} style={{ marginTop: 8 }}>
            Let's go! →
          </Btn>
        </>
      )}
    </div>
  );
};

// HOME SCREEN
const HomeScreen = ({ onCategory, onPro, userName }) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div style={{ background: C.navy, padding: "12px 16px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.white }}>
              Trust<span style={{ color: C.tealL }}>Fix</span>
            </div>
            <div style={{ fontSize: 10, color: C.tealL }}>📍 Gomti Nagar, Lucknow</div>
          </div>
          <div style={{ fontSize: 11, color: C.mint }}>Hi, {userName?.split(" ")[0] || "Priya"} 👋</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,.12)",
          borderRadius: 10, padding: "9px 12px", marginTop: 12, gap: 8 }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input placeholder="Search electrician, plumber..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none",
              color: C.white, fontSize: 12, flex: 1 }} />
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <SectionLabel>CATEGORIES</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {CATEGORIES.map(c => (
            <div key={c.name} onClick={() => onCategory(c.name)}
              style={{ textAlign: "center", cursor: "pointer", padding: "8px 4px",
                background: C.white, borderRadius: 10, border: `1px solid #E2E8F0`,
                boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div style={{ fontSize: 9, color: C.slate, marginTop: 4, fontWeight: 600 }}>{c.name}</div>
            </div>
          ))}
        </div>

        <SectionLabel>⭐ TOP RATED NEAR YOU</SectionLabel>
        {PROS.slice(0, 3).map(p => (
          <Card key={p.id} style={{ cursor: "pointer" }} >
            <div onClick={() => onPro(p)} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700, color: C.white, flexShrink: 0 }}>
                {p.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{p.name}</span>
                  {p.verified && <Badge color={C.teal}>✓ KYC</Badge>}
                </div>
                <div style={{ fontSize: 11, color: C.gray }}>{p.role} · {p.dist}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <Stars n={Math.round(p.rating)} />
                  <span style={{ fontSize: 10, color: C.gray }}>{p.rating} ({p.reviews})</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: C.teal }}>₹{p.price}/hr</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// SEARCH RESULTS
const SearchScreen = ({ category, onPro, onBack }) => {
  const [filter, setFilter] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const filters = ["All", "⭐ Top Rated", "📍 Nearest", "💰 Low Price"];
  let results = PROS.filter(p => !category || category === "All" ||
    p.role.toLowerCase().includes(category.toLowerCase()) ||
    category === "More");
  if (verifiedOnly) results = results.filter(p => p.verified);

  return (
    <div>
      <AppBar title={category || "All Services"}
        sub={`${results.length} professionals found`} onBack={onBack}
        right={<span style={{ fontSize: 18, color: C.white }}>⚙️</span>} />
      <div style={{ padding: "10px 16px 0" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setFilter(f)}
              style={{ whiteSpace: "nowrap", padding: "5px 10px", borderRadius: 20, fontSize: 10,
                background: filter === f ? C.teal : C.light,
                color: filter === f ? C.white : C.slate, cursor: "pointer", fontWeight: 600 }}>
              {f}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 0", fontSize: 11, color: C.slate }}>
          <span>Show KYC verified only</span>
          <div onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{ width: 36, height: 20, borderRadius: 10, position: "relative", cursor: "pointer",
              background: verifiedOnly ? C.teal : "#E2E8F0", transition: "background .2s" }}>
            <div style={{ width: 16, height: 16, background: C.white, borderRadius: "50%",
              position: "absolute", top: 2, left: verifiedOnly ? 18 : 2, transition: "left .2s" }} />
          </div>
        </div>
      </div>
      <div style={{ padding: "0 16px 16px" }}>
        {results.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: C.gray, fontSize: 13 }}>
            No verified professionals in this category yet.<br />
            <span style={{ fontSize: 11, color: C.teal }}>Try turning off the verified filter.</span>
          </div>
        )}
        {results.map(p => (
          <Card key={p.id} style={{ cursor: "pointer" }} >
            <div onClick={() => onPro(p)} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700, color: C.white, flexShrink: 0 }}>
                {p.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{p.name}</span>
                  {p.verified && <Badge color={C.teal}>✓ KYC</Badge>}
                  {p.badge && <Badge color={C.gold}>{p.badge === "Gold" ? "⭐" : "🏆"} {p.badge}</Badge>}
                </div>
                <div style={{ fontSize: 11, color: C.gray }}>{p.role} · {p.dist} · {p.avail}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <Stars n={Math.round(p.rating)} />
                  <span style={{ fontSize: 10, color: C.gray }}>{p.rating}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: C.teal }}>₹{p.price}/hr</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// PRO PROFILE
const ProProfile = ({ pro, onBook, onBack }) => {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "reviews", "pricing"];

  return (
    <div>
      <AppBar title={pro.name} sub={`${pro.role} · ${pro.dist}`} onBack={onBack} />
      {/* Hero */}
      <div style={{ padding: "16px 16px 12px", background: C.white, borderBottom: `1px solid #E2E8F0` }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: pro.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 700, color: C.white, flexShrink: 0 }}>
            {pro.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            {pro.verified && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4,
                background: "#ECFDF5", color: "#059669", fontSize: 10, fontWeight: 700,
                padding: "3px 8px", borderRadius: 20, marginBottom: 4 }}>
                ✅ KYC Verified
              </div>
            )}
            <div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>{pro.name}</div>
            <div style={{ fontSize: 12, color: C.gray }}>{pro.role} · {pro.exp} experience</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <Stars n={Math.round(pro.rating)} />
              <span style={{ fontSize: 11, color: C.gray }}>{pro.rating} ({pro.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          {pro.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid #E2E8F0` }}>
        {tabs.map(t => (
          <div key={t} onClick={() => setTab(t)}
            style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 11, fontWeight: 700,
              color: tab === t ? C.teal : C.gray,
              borderBottom: `2px solid ${tab === t ? C.teal : "transparent"}`,
              cursor: "pointer", textTransform: "capitalize" }}>
            {t}
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 16px" }}>
        {tab === "overview" && (
          <>
            <Card>
              {[["📍 Location", pro.city], ["⏱ Avg response", "Under 30 mins"],
                ["✅ Jobs done", `${pro.jobs} completed`], ["💰 Base rate", `₹${pro.price}/hr`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "5px 0", borderBottom: `1px solid #F1F5F9` }}>
                  <span style={{ fontSize: 11, color: C.gray }}>{l}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>{v}</span>
                </div>
              ))}
            </Card>
            <Btn onClick={onBook}>Book Now</Btn>
            <Btn variant="outline" style={{ marginTop: 8 }}>💬 Chat First</Btn>
          </>
        )}
        {tab === "reviews" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: C.navy }}>{pro.rating}</div>
              <div>
                <Stars n={5} />
                <div style={{ fontSize: 10, color: C.gray }}>{pro.reviews} verified reviews</div>
              </div>
            </div>
            {pro.reviewList.map((r, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{r.name}</span>
                  <Stars n={r.stars} />
                </div>
                <div style={{ fontSize: 11, color: C.slate, lineHeight: 1.5 }}>{r.text}</div>
                <div style={{ fontSize: 9, color: C.gray, marginTop: 4 }}>{r.date} · ✅ Verified booking</div>
              </Card>
            ))}
            <Btn onClick={onBook} style={{ marginTop: 8 }}>Book {pro.name.split(" ")[0]}</Btn>
          </>
        )}
        {tab === "pricing" && (
          <>
            <SectionLabel>SERVICES OFFERED</SectionLabel>
            <Card>
              {pro.services.map((sv, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between",
                  padding: "8px 0", borderBottom: i < pro.services.length - 1 ? `1px solid #F1F5F9` : "none" }}>
                  <span style={{ fontSize: 12, color: C.slate }}>{sv.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>₹{sv.price}</span>
                </div>
              ))}
            </Card>
            <SectionLabel>AVAILABLE TODAY</SectionLabel>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {["10:00 AM","11:30 AM","2:00 PM","4:30 PM"].map((t, i) => (
                <div key={t} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 11,
                  background: i === 1 ? C.teal : C.light,
                  color: i === 1 ? C.white : C.slate, fontWeight: i === 1 ? 700 : 400,
                  border: `1px solid ${i === 1 ? C.teal : "#E2E8F0"}` }}>
                  {t}
                </div>
              ))}
            </div>
            <Btn onClick={onBook}>Book {pro.name.split(" ")[0]}</Btn>
          </>
        )}
      </div>
    </div>
  );
};

// BOOKING FLOW
const BookingFlow = ({ pro, onConfirm, onBack }) => {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(1);
  const [time, setTime] = useState(1);
  const [service, setService] = useState(0);
  const [address, setAddress] = useState("Flat 4B, Sunrise Apartments");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("UPI");

  const dates = [{ d: "27", wd: "Sat" },{ d: "28", wd: "Sun" },{ d: "29", wd: "Mon" },{ d: "30", wd: "Tue" }];
  const times = ["9:00 AM","11:30 AM","2:00 PM","4:30 PM"];
  const payMethods = ["UPI","Card","Cash"];
  const svcPrice = pro.services[service]?.price || pro.price;
  const fee = Math.round(Number(String(svcPrice).replace("/hr","")) * 0.1);
  const tax = Math.round((Number(String(svcPrice).replace("/hr","")) + fee) * 0.18);
  const total = Number(String(svcPrice).replace("/hr","")) + fee + tax;

  return (
    <div>
      <AppBar title="Book Service" sub={`with ${pro.name}`} onBack={step > 0 ? () => setStep(s => s - 1) : onBack} />
      <Stepper steps={["Date","Address","Pay"]} current={step} />
      <div style={{ padding: "10px 16px 80px" }}>

        {step === 0 && (
          <>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 10 }}>📅 Select Date</div>
              <div style={{ display: "flex", gap: 8 }}>
                {dates.map((d, i) => (
                  <div key={i} onClick={() => setDate(i)}
                    style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, cursor: "pointer",
                      background: date === i ? C.navy : C.light,
                      border: `1.5px solid ${date === i ? C.teal : "#E2E8F0"}` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: date === i ? C.white : C.navy }}>{d.d}</div>
                    <div style={{ fontSize: 9, color: date === i ? "#94A3B8" : C.gray }}>{d.wd}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 10 }}>⏰ Select Time</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {times.map((t, i) => (
                  <div key={t} onClick={() => setTime(i)}
                    style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                      background: time === i ? C.teal : C.light,
                      color: time === i ? C.white : C.slate, fontWeight: time === i ? 700 : 400,
                      border: `1px solid ${time === i ? C.teal : "#E2E8F0"}` }}>
                    {t}
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>📝 Describe your issue</div>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Fan not working in bedroom..."
                style={{ width: "100%", background: C.light, border: `1.5px solid #E2E8F0`, borderRadius: 8,
                  padding: "8px 10px", fontSize: 11, color: C.slate, outline: "none", resize: "none",
                  minHeight: 60, boxSizing: "border-box", fontFamily: "inherit" }} />
            </Card>
            <Btn onClick={() => setStep(1)}>Next: Address →</Btn>
          </>
        )}

        {step === 1 && (
          <>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>📍 Service Address</div>
              <input value={address} onChange={e => setAddress(e.target.value)}
                style={{ width: "100%", background: C.light, border: `1.5px solid #E2E8F0`, borderRadius: 8,
                  padding: "9px 12px", fontSize: 12, outline: "none", color: C.slate,
                  boxSizing: "border-box", marginBottom: 6 }} />
              <input defaultValue="Gomti Nagar, Lucknow - 226010"
                style={{ width: "100%", background: C.light, border: `1.5px solid #E2E8F0`, borderRadius: 8,
                  padding: "9px 12px", fontSize: 12, outline: "none", color: C.slate,
                  boxSizing: "border-box" }} />
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>🔧 Service Type</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {pro.services.map((sv, i) => (
                  <div key={i} onClick={() => setService(i)}
                    style={{ padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                      background: service === i ? C.teal : C.light,
                      color: service === i ? C.white : C.slate, fontWeight: service === i ? 700 : 400 }}>
                    {sv.name}
                  </div>
                ))}
              </div>
            </Card>
            <Btn onClick={() => setStep(2)}>Next: Payment →</Btn>
          </>
        )}

        {step === 2 && (
          <>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Order Summary</div>
              {[
                ["Service", `${pro.services[service]?.name}`, `₹${svcPrice}`],
                ["Platform fee (10%)", "", `₹${fee}`],
                ["GST (18%)", "", `₹${tax}`],
              ].map(([l, s, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between",
                  padding: "5px 0", borderBottom: `1px solid #F1F5F9`, fontSize: 11, color: C.gray }}>
                  <span>{l}{s && <span style={{ color: C.gray }}> · {s}</span>}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0 0", fontSize: 14, fontWeight: 800, color: C.navy }}>
                <span>Total</span><span>₹{total}</span>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>💳 Payment Method</div>
              <div style={{ display: "flex", gap: 8 }}>
                {payMethods.map(m => (
                  <div key={m} onClick={() => setPayment(m)}
                    style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 8, cursor: "pointer",
                      background: payment === m ? C.teal : C.light,
                      color: payment === m ? C.white : C.slate, fontSize: 12, fontWeight: 700,
                      border: `1.5px solid ${payment === m ? C.teal : "#E2E8F0"}` }}>
                    {m}
                  </div>
                ))}
              </div>
            </Card>
            <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 10,
              padding: "10px 12px", marginBottom: 12, fontSize: 11, color: "#065F46" }}>
              🛡️ 7-day work guarantee included · KYC-verified professional
            </div>
            <Btn variant="green" onClick={() => onConfirm({ pro, date: dates[date], time: times[time], service: pro.services[service], total, payment })}>
              ✅ Confirm & Pay ₹{total}
            </Btn>
          </>
        )}
      </div>
    </div>
  );
};

// BOOKING CONFIRMED + TRACKING
const BookingConfirmed = ({ booking, onTrack, onHome }) => {
  const [tracked, setTracked] = useState(false);
  const [jobDone, setJobDone] = useState(false);

  if (jobDone) {
    return <RatingScreen booking={booking} onHome={onHome} />;
  }

  if (tracked) {
    return (
      <div>
        <AppBar title="Track Booking" sub={`#TF-8847`} />
        <div style={{ padding: "14px 16px" }}>
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, #1e3a6e)`, borderRadius: 12,
            padding: "14px 16px", marginBottom: 12, color: C.white }}>
            <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>Status</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.tealL }}>🚗 {booking.pro.name} is on the way</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", marginTop: 4 }}>ETA: ~15 minutes · 1.2 km away</div>
            {/* Fake map */}
            <div style={{ background: "#E2E8F0", borderRadius: 10, height: 90, marginTop: 10,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: "55%", height: 2, background: C.teal, opacity: .8, left: "20%", top: "50%" }} />
              <div style={{ position: "absolute", left: "15%", fontSize: 22 }}>📍</div>
              <div style={{ position: "absolute", right: "12%", fontSize: 22 }}>🏠</div>
              <div style={{ position: "absolute", left: "42%", fontSize: 18 }}>🚗</div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ background: C.white, border: `1px solid #E2E8F0`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Progress</div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {["Booked","Accepted","En Route","Arrived","Done"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 4 ? 1 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%",
                      background: i < 3 ? C.teal : i === 3 ? C.navy : "#E2E8F0",
                      border: i === 3 ? `2px solid ${C.teal}` : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 8, color: C.white, fontWeight: 700 }}>
                      {i < 3 ? "✓" : ""}
                    </div>
                    <div style={{ fontSize: 8, color: i <= 3 ? C.teal : C.gray, marginTop: 3, textAlign: "center" }}>{s}</div>
                  </div>
                  {i < 4 && <div style={{ flex: 1, height: 2, background: i < 3 ? C.teal : "#E2E8F0", margin: "0 3px", marginBottom: 16 }} />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            {[["📞","Call","Call "+booking.pro.name.split(" ")[0], C.teal],["🆘","Help","Get Help", C.red]].map(([icon, lbl, sub, color]) => (
              <div key={lbl} style={{ flex: 1, background: C.white, borderRadius: 10,
                border: `1px solid #E2E8F0`, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color, marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>

          <Btn onClick={() => setJobDone(true)} variant="ghost">Simulate: Job Completed ✓</Btn>
          <Btn onClick={onHome} variant="outline" style={{ marginTop: 8 }}>Back to Home</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.green, marginTop: 12 }}>Booking Confirmed!</div>
      <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>
        {booking.pro.name} is confirmed for {booking.date.wd} {booking.date.d} at {booking.time}
      </div>
      <Card style={{ marginTop: 20, textAlign: "left" }}>
        {[
          ["📅 Date", `${booking.date.wd}, Jun ${booking.date.d}`],
          ["⏰ Time", booking.time],
          ["🔧 Service", booking.service?.name || "Service"],
          ["💰 Paid", `₹${booking.total} via ${booking.payment}`],
          ["🆔 Booking", "#TF-8847"],
        ].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between",
            padding: "6px 0", borderBottom: `1px solid #F1F5F9`, fontSize: 12 }}>
            <span style={{ color: C.gray }}>{l}</span>
            <span style={{ fontWeight: 700, color: C.navy }}>{v}</span>
          </div>
        ))}
      </Card>
      <Btn onClick={() => setTracked(true)} style={{ marginTop: 4 }}>📍 Track Booking</Btn>
      <Btn variant="outline" onClick={onHome} style={{ marginTop: 8 }}>Back to Home</Btn>
    </div>
  );
};

// RATING SCREEN
const RatingScreen = ({ booking, onHome }) => {
  const [stars, setStars] = useState(4);
  const [tags, setTags] = useState(["On time","Good quality"]);
  const [submitted, setSubmitted] = useState(false);
  const allTags = ["On time","Good quality","Clean workspace","Polite","Affordable","Expert"];

  if (submitted) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginTop: 12 }}>Thanks for your review!</div>
        <div style={{ fontSize: 12, color: C.gray, marginTop: 6, marginBottom: 24 }}>
          Your feedback helps build trust in the community.
        </div>
        <div style={{ background: C.mint, borderRadius: 12, padding: "14px 16px", marginBottom: 20, fontSize: 12, color: C.navy }}>
          🛡️ Your 7-day work guarantee is now active.<br/>If anything needs fixing, we've got you covered.
        </div>
        <Btn onClick={onHome}>Back to Home</Btn>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 40 }}>🎉</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>Job Complete!</div>
        <div style={{ fontSize: 12, color: C.gray }}>How was {booking.pro.name.split(" ")[0]}?</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} onClick={() => setStars(i)} style={{ fontSize: 36, cursor: "pointer",
            color: i <= stars ? C.gold : "#E2E8F0", transition: "color .15s" }}>★</div>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 16 }}>
        {["","Poor","Fair","Good","Very Good","Excellent!"][stars]}
      </div>
      <SectionLabel>QUICK FEEDBACK</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {allTags.map(t => (
          <div key={t} onClick={() => setTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev,t])}
            style={{ padding: "5px 10px", borderRadius: 20, fontSize: 11, cursor: "pointer",
              background: tags.includes(t) ? C.teal : C.light,
              color: tags.includes(t) ? C.white : C.slate, fontWeight: tags.includes(t) ? 700 : 400 }}>
            {tags.includes(t) ? "✓ " : ""}{t}
          </div>
        ))}
      </div>
      <textarea placeholder="Write a review (optional)..."
        style={{ width: "100%", background: C.light, border: `1.5px solid #E2E8F0`, borderRadius: 8,
          padding: "8px 10px", fontSize: 11, outline: "none", resize: "none", minHeight: 60,
          boxSizing: "border-box", fontFamily: "inherit", marginBottom: 8, color: C.slate }} />
      <Btn onClick={() => setSubmitted(true)}>Submit Review</Btn>
    </div>
  );
};

// BOOKINGS LIST
const BookingsList = ({ onNav }) => (
  <div>
    <AppBar title="My Bookings" />
    <div style={{ padding: "14px 16px" }}>
      <Card style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>Fan Installation</div>
            <div style={{ fontSize: 11, color: C.gray }}>Today · 11:30 AM · Ramu Verma</div>
            <Badge color={C.gold}>🚗 En Route</Badge>
          </div>
          <div style={{ background: C.teal, color: C.white, borderRadius: 8, padding: "5px 10px",
            fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Track</div>
        </div>
      </Card>
      <SectionLabel>PAST BOOKINGS</SectionLabel>
      {[
        { s: "Full Wiring (1BHK)", pro: "Ramu Verma", date: "Jun 20", rating: 5, paid: "₹2,499" },
        { s: "Deep House Clean", pro: "Kavita Rani", date: "Jun 10", rating: 5, paid: "₹599" },
      ].map((b, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{b.s}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{b.date} · {b.pro}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Stars n={b.rating} />
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>{b.paid}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
    <NavBar active="bookings" onNav={onNav} />
  </div>
);

// ══════════════════════════════════════════════════════════════════
// PRO SIDE SCREENS
// ══════════════════════════════════════════════════════════════════

// PRO HOME
const ProHome = ({ proName, onNav, onAccept }) => {
  const [available, setAvailable] = useState(true);
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <div style={{ background: C.navy, padding: "12px 16px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.white }}>
              Trust<span style={{ color: C.tealL }}>Fix</span> Pro
            </div>
            <div style={{ fontSize: 10, color: C.tealL }}>Good morning, {proName?.split(" ")[0] || "Ramu"} 👋</div>
          </div>
          <div onClick={() => setAvailable(!available)}
            style={{ background: available ? "#059669" : "#64748B", color: C.white,
              fontSize: 10, padding: "5px 10px", borderRadius: 20, fontWeight: 700, cursor: "pointer" }}>
            {available ? "🟢 Available" : "🔴 Offline"}
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          {[["₹4,200","This Week"],["12","Jobs Done"],["4.9★","My Rating"]].map(([v, l]) => (
            <div key={l} style={{ background: C.white, borderRadius: 10, padding: "10px 6px",
              textAlign: "center", border: `1px solid #E2E8F0`, boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>{v}</div>
              <div style={{ fontSize: 9, color: C.gray, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Booking request */}
        {!accepted && available && (
          <>
            <SectionLabel>🔔 NEW BOOKING REQUEST</SectionLabel>
            <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 12, padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Fan Installation</div>
                  <div style={{ fontSize: 11, color: C.gray }}>Today · 11:30 AM · 2.1 km away</div>
                  <div style={{ fontSize: 12, color: "#059669", fontWeight: 700, marginTop: 3 }}>₹249 confirmed</div>
                </div>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700 }}>⏳ 4:32 left</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Btn onClick={() => { setAccepted(true); onAccept?.(); }} variant="green" style={{ flex: 1, padding: "8px 0" }}>✅ Accept</Btn>
                <Btn variant="danger" style={{ flex: 1, padding: "8px 0" }}>✗ Decline</Btn>
              </div>
            </div>
          </>
        )}
        {accepted && (
          <div style={{ background: C.mint, border: `1px solid ${C.teal}`, borderRadius: 12,
            padding: 12, marginBottom: 12, fontSize: 12, color: C.navy, fontWeight: 600 }}>
            ✅ Job accepted! Navigate to Gomti Nagar by 11:30 AM.
          </div>
        )}

        {/* Upcoming */}
        <SectionLabel>UPCOMING JOBS</SectionLabel>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>MCB Check & Replace</div>
          <div style={{ fontSize: 11, color: C.gray }}>Tomorrow · 2:00 PM · Rohit Mehta</div>
          <div style={{ fontSize: 11, color: C.teal, fontWeight: 700 }}>₹399 confirmed</div>
        </Card>
      </div>
      <NavBar active="pro_home" onNav={onNav} mode="pro" />
    </div>
  );
};

// PRO JOBS
const ProJobs = ({ onNav }) => (
  <div>
    <AppBar title="My Jobs" />
    <div style={{ padding: "10px 16px" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["Upcoming (2)","Completed (143)","Cancelled (3)"].map((f, i) => (
          <div key={f} style={{ padding: "5px 10px", borderRadius: 20, fontSize: 10,
            background: i === 0 ? C.teal : C.light, color: i === 0 ? C.white : C.slate,
            fontWeight: 600, whiteSpace: "nowrap" }}>{f}</div>
        ))}
      </div>
      {[
        { title: "Fan Installation", sub: "Today · 11:30 AM · Priya Sharma", price: "₹249", action: "Navigate", color: C.teal },
        { title: "MCB Check", sub: "Tomorrow · 2:00 PM · Rohit Mehta", price: "₹399", action: "Details", color: C.navy },
      ].map((j, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{j.title}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{j.sub}</div>
              <div style={{ fontSize: 11, color: C.teal, fontWeight: 700 }}>{j.price}</div>
            </div>
            <div style={{ background: j.color, color: C.white, borderRadius: 8,
              padding: "5px 10px", fontSize: 10, fontWeight: 700 }}>{j.action}</div>
          </div>
        </Card>
      ))}
      <SectionLabel>RECENTLY COMPLETED</SectionLabel>
      {[
        { title: "Full Wiring (1BHK)", sub: "Jun 26 · Anita Singh", paid: "₹1,999", rating: 5 },
        { title: "Fan Install + Wiring", sub: "Jun 24 · Kavita Sharma", paid: "₹548", rating: 5 },
        { title: "MCB Replacement", sub: "Jun 22 · Deepak R.", paid: "₹399", rating: 4 },
      ].map((j, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{j.title}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{j.sub}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Stars n={j.rating} />
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>{j.paid}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
    <NavBar active="pro_jobs" onNav={onNav} mode="pro" />
  </div>
);

// PRO EARNINGS
const ProEarnings = ({ onNav }) => (
  <div>
    <AppBar title="My Earnings" />
    <div style={{ padding: "14px 16px" }}>
      <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.navy})`, borderRadius: 14,
        padding: "18px 16px", marginBottom: 14, color: C.white, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#CCFBF1", letterSpacing: 1 }}>JUNE 2026 TOTAL</div>
        <div style={{ fontSize: 36, fontWeight: 800 }}>₹18,420</div>
        <div style={{ fontSize: 11, color: "#A7F3D0" }}>↑ 23% vs last month</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[["47","Jobs in June"],["₹391","Avg per Job"]].map(([v,l]) => (
          <div key={l} style={{ background: C.white, borderRadius: 10, padding: 12,
            textAlign: "center", border: `1px solid #E2E8F0` }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.teal }}>{v}</div>
            <div style={{ fontSize: 10, color: C.gray }}>{l}</div>
          </div>
        ))}
      </div>
      <SectionLabel>WITHDRAW EARNINGS</SectionLabel>
      <Card>
        {[["Available balance","₹4,200","#059669"],["Pending clearance","₹2,150",C.gray],["Bank / UPI","SBI ****4321",C.navy]].map(([l,v,c]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between",
            padding: "7px 0", borderBottom: `1px solid #F1F5F9`, fontSize: 12 }}>
            <span style={{ color: C.gray }}>{l}</span>
            <span style={{ fontWeight: 700, color: c }}>{v}</span>
          </div>
        ))}
      </Card>
      <Btn>Withdraw ₹4,200 to Bank</Btn>
    </div>
    <NavBar active="pro_earn" onNav={onNav} mode="pro" />
  </div>
);

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [mode, setMode] = useState("customer"); // customer | pro
  const [selectedPro, setSelectedPro] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [booking, setBooking] = useState(null);
  const [userName, setUserName] = useState("");

  const go = (s) => setScreen(s);

  const screens = {
    splash: (
      <SplashScreen
        onCustomer={() => { setMode("customer"); go("login"); }}
        onPro={() => { setMode("pro"); go("login"); }}
      />
    ),
    login: (
      <LoginScreen role={mode}
        onDone={(name) => { setUserName(name); go(mode === "pro" ? "pro_home" : "home"); }} />
    ),
    home: (
      <div>
        <HomeScreen userName={userName}
          onCategory={(cat) => { setSelectedCategory(cat); go("search"); }}
          onPro={(p) => { setSelectedPro(p); go("pro_profile"); }} />
        <NavBar active="home" onNav={(id) => {
          if (id === "bookings") go("bookings");
          else if (id === "home") go("home");
        }} mode="customer" />
      </div>
    ),
    search: (
      <SearchScreen category={selectedCategory}
        onPro={(p) => { setSelectedPro(p); go("pro_profile"); }}
        onBack={() => go("home")} />
    ),
    pro_profile: (
      <ProProfile pro={selectedPro}
        onBook={() => go("booking")}
        onBack={() => go(screen === "pro_profile" && selectedCategory ? "search" : "home")} />
    ),
    booking: (
      <BookingFlow pro={selectedPro}
        onConfirm={(b) => { setBooking(b); go("confirmed"); }}
        onBack={() => go("pro_profile")} />
    ),
    confirmed: (
      <BookingConfirmed booking={booking}
        onTrack={() => {}}
        onHome={() => go("home")} />
    ),
    bookings: <BookingsList onNav={(id) => { if (id === "home") go("home"); else go(id); }} />,

    // PRO
    pro_home: (
      <ProHome proName={userName}
        onAccept={() => {}}
        onNav={(id) => {
          if (id === "pro_jobs") go("pro_jobs");
          else if (id === "pro_earn") go("pro_earn");
          else go("pro_home");
        }} />
    ),
    pro_jobs: <ProJobs onNav={(id) => {
      if (id === "pro_home") go("pro_home");
      else if (id === "pro_earn") go("pro_earn");
      else go(id);
    }} />,
    pro_earn: <ProEarnings onNav={(id) => {
      if (id === "pro_home") go("pro_home");
      else if (id === "pro_jobs") go("pro_jobs");
      else go(id);
    }} />,
  };

  return (
    <PhoneShell>
      {/* Mode switcher pill (for demo) */}
      {screen !== "splash" && screen !== "login" && (
        <div style={{ position: "fixed", top: 8, right: 8, zIndex: 100, display: "flex", gap: 4 }}>
          <div onClick={() => { setMode("customer"); go("home"); }}
            style={{ background: mode === "customer" ? C.teal : "rgba(255,255,255,.2)",
              color: C.white, fontSize: 9, padding: "4px 8px", borderRadius: 20, cursor: "pointer", fontWeight: 700 }}>
            Customer
          </div>
          <div onClick={() => { setMode("pro"); go("pro_home"); }}
            style={{ background: mode === "pro" ? C.navy : "rgba(255,255,255,.2)",
              color: C.white, fontSize: 9, padding: "4px 8px", borderRadius: 20, cursor: "pointer", fontWeight: 700 }}>
            Pro
          </div>
          <div onClick={() => go("splash")}
            style={{ background: "rgba(255,255,255,.15)", color: C.white, fontSize: 9,
              padding: "4px 8px", borderRadius: 20, cursor: "pointer" }}>
            🏠
          </div>
        </div>
      )}
      {screens[screen] || screens.splash}
    </PhoneShell>
  );
}
