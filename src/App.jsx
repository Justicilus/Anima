import React, { useState, createContext, useContext, useId } from "react";
import {
  User,
  MessageCircle,
  Users,
  Settings,
  Search,
  Bell,
  Flame,
  Trophy,
  Clock,
  Pencil,
  Check,
  X,
  Hash,
  Volume2,
  Send,
  Plus,
  Shield,
  ChevronDown,
  BookOpen,
  Lock,
} from "lucide-react";

/* ---------- ortak yardımcılar ---------- */

const initials = (isim) =>
  isim.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

const slug = (isim) =>
  "@" + isim.trim().toLowerCase().replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c").replace(/\s+/g, "");

const avatarGradient = (accent) => {
  const diger = accent === "#FF8F6B" ? "#9C8FFF" : "#FF8F6B";
  return `linear-gradient(135deg, ${accent} 0%, ${diger} 100%)`;
};

const SELF = "__SELF__";

/* ---------- uygulama simgesi ---------- */

function AnimaLogo({ startColor = "#9C8FFF", endColor = "#FF8F6B", size = 40 }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradientId = `animaGrad_${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
      <path
        d="M50 20C33.4 20 20 33.4 20 50C20 66.6 33.4 80 50 80C59.5 80 67.8 75.6 73.2 68.8V78H82V50C82 33.4 68.6 20 50 20ZM50 68C40.1 68 32 59.9 32 50C32 40.1 40.1 32 50 32C59.9 32 68 40.1 68 50V52C68 60.8 60 68 50 68Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/* ---------- kişiselleştirme (accent) ---------- */

const AccentContext = createContext({ accent: "#9C8FFF", setAccent: () => {} });
const FrameContext = createContext({ cerceve: "kozmik", setCerceve: () => {} });
const TitleContext = createContext({ unvan: "mat", setUnvan: () => {} });
const ThemeContext = createContext({
  bgRenk: "#14172B", setBgRenk: () => {},
  panelRenk: "#1E2242", setPanelRenk: () => {},
  metinRengi: "#F3F1FA", setMetinRengi: () => {},
  isimRengi: "#F3F1FA", setIsimRengi: () => {},
  isimGradyan: false, setIsimGradyan: () => {},
  isimBitis: "#FF8F6B", setIsimBitis: () => {},
  fontId: "modern", setFontId: () => {},
  logoBaslangic: "#9C8FFF", setLogoBaslangic: () => {},
  logoBitis: "#FF8F6B", setLogoBitis: () => {},
});

const koyulastir = (hex, oran = 0.22) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - oran)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - oran)));
  const b = Math.max(0, Math.round((n & 255) * (1 - oran)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const FONT_SECENEKLERI = [
  { id: "modern", ad: "Modern", display: "Space Grotesk", body: "Manrope" },
  { id: "klasik", ad: "Klasik", display: "Fraunces", body: "Inter" },
  { id: "yuvarlak", ad: "Yuvarlak", display: "Poppins", body: "Poppins" },
  { id: "teknik", ad: "Teknik", display: "JetBrains Mono", body: "Inter" },
];

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap');`;

function fontStyleCss(fontId) {
  const f = FONT_SECENEKLERI.find((x) => x.id === fontId) || FONT_SECENEKLERI[0];
  return `
    ${FONT_IMPORT}
    .font-display { font-family: '${f.display}', sans-serif; }
    .font-body { font-family: '${f.body}', sans-serif; }
  `;
}

const ACCENT_SECENEKLERI = [
  { hex: "#9C8FFF", ad: "Menekşe" },
  { hex: "#FF8F6B", ad: "Mercan" },
  { hex: "#6FD3C7", ad: "Nane" },
  { hex: "#FF6FA5", ad: "Gül" },
  { hex: "#F2C94C", ad: "Amber" },
];

/* ---------- statik demo verisi ---------- */

const NAV_ITEMS = [
  { id: "profil", label: "Profil", icon: User },
  { id: "mesajlar", label: "Mesajlar", icon: MessageCircle },
  { id: "topluluklar", label: "Topluluklar", icon: Users },
  { id: "liderlik", label: "Liderlik Tablosu", icon: Trophy },
  { id: "ayarlar", label: "Ayarlar", icon: Settings },
];

/* ---------- oyunlaştırma (XP / seviye / liderlik / envanter) ---------- */

const LIDERLIK_TABLOSU = [
  { sira: 1, ad: "KozmikYildiz", unvan: "Zirve Koltuğu · Lvl 28", xp: 12450, renk: "#FBBF24" },
  { sira: 2, ad: "NeonSakura", unvan: "Siber Kodlayıcı · Lvl 22", xp: 9820, renk: "#94A3B8" },
  { sira: 3, ad: "GeceAvcisi", unvan: "Pomodoro Kralı · Lvl 19", xp: 8100, renk: "#F97316" },
  { sira: 7, ad: "Elif Arslan", unvan: "Deneme Ustası · Lvl 17", xp: 6210, renk: "#8D89B0" },
  { sira: 9, ad: "Ali Kaya", unvan: "Erken Kalkan · Lvl 16", xp: 5480, renk: "#8D89B0" },
];

const CERCEVELER = [
  { id: "kozmik", ad: "Kozmik Yörünge", kilitli: false },
  { id: "siber", ad: "Siber Nabız", kilitli: false },
  { id: "alev", ad: "Alevli Gece", kilitli: false },
  { id: "rune", ad: "Rün Kalkanı", kilitli: false },
  { id: "piksel", ad: "Piksel Çerçeve", kilitli: false },
  { id: "sakura", ad: "Neon Sakura", kilitli: true },
  { id: "koyu", ad: "Koyu Madde", kilitli: true },
  { id: "prizma", ad: "Prizma", kilitli: true },
  { id: "galaksi", ad: "Galaksi", kilitli: true },
  { id: "altin", ad: "Altın Şampiyon", kilitli: true },
];

const UNVANLAR = [
  { id: "mat", ad: "Mat Büyücüsü" },
  { id: "fizik", ad: "Fizik Üstadı" },
  { id: "kimya", ad: "Kimya Simyacısı" },
  { id: "biyoloji", ad: "Biyoloji Kâşifi" },
  { id: "tarih", ad: "Tarih Mimarı" },
  { id: "dil", ad: "Dil Ustası" },
  { id: "pomodoro", ad: "Pomodoro Kralı" },
  { id: "erkenkus", ad: "Erken Kuş" },
  { id: "haftasonu", ad: "Hafta Sonu Modu" },
  { id: "sessiz", ad: "Sessiz Odak" },
  { id: "100saat", ad: "100 Saat Kulübü" },
  { id: "500saat", ad: "500 Saat Efsanesi" },
  { id: "lobi", ad: "Lobi Ustası" },
  { id: "komite", ad: "Komite Başkanı" },
  { id: "yasa", ad: "Yasa Mimarı" },
];

function TitleBadge({ id }) {
  const gövde = {
    mat: { renk: "#8B5CF6", metin: "#DDD6FE", metinX: 38, icon: <text x="21" y="22" fill="#8B5CF6" fontFamily="sans-serif" fontWeight="900" fontSize="14">∑</text> },
    fizik: { renk: "#00D2FF", metin: "#A5F3FC", metinX: 38, icon: (
      <>
        <ellipse cx="22" cy="18" rx="6" ry="2" stroke="#00D2FF" strokeWidth="1" transform="rotate(30 22 18)" />
        <ellipse cx="22" cy="18" rx="6" ry="2" stroke="#00D2FF" strokeWidth="1" transform="rotate(-30 22 18)" />
        <circle cx="22" cy="18" r="1.5" fill="#00D2FF" />
      </>
    ) },
    kimya: { renk: "#10B981", metin: "#A7F3D0", metinX: 38, icon: <path d="M21 12H23M22 12V15L25 21C25.5 22 24.8 23 23.7 23H20.3C19.2 23 18.5 22 19 21L22 15" stroke="#10B981" strokeWidth="1.2" /> },
    biyoloji: { renk: "#84CC16", metin: "#ECFCCB", metinX: 38, icon: (
      <>
        <path d="M18 22C18 22 21 21 23 18C25 15 25 12 25 12C25 12 22 12 20 15C18 18 18 22 18 22Z" stroke="#84CC16" strokeWidth="1.2" />
        <path d="M19 21L23 17" stroke="#84CC16" strokeWidth="1" />
      </>
    ) },
    tarih: { renk: "#F59E0B", metin: "#FDE68A", metinX: 38, icon: <path d="M17 13H27M18 13V22M22 13V22M26 13V22M16 22H28" stroke="#F59E0B" strokeWidth="1.2" /> },
    dil: { renk: "#EC4899", metin: "#FBCFE8", metinX: 38, icon: <path d="M17 14H25M17 18H23M17 22H27" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" /> },
    pomodoro: { renk: "#EF4444", metin: "#FCA5A5", metinX: 38, icon: (
      <>
        <circle cx="22" cy="18" r="6" stroke="#EF4444" strokeWidth="1.2" />
        <path d="M22 15V18L24 19" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ) },
    erkenkus: { renk: "#FBBF24", metin: "#FEF08A", metinX: 38, icon: (
      <>
        <path d="M16 21H28M22 13V15M18 16L19 17M26 16L25 17" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="22" cy="21" r="4" fill="#FBBF24" />
      </>
    ) },
    haftasonu: { renk: "#F97316", metin: "#FFEDD5", metinX: 38, icon: <path d="M18 13L22 22L26 13" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
    sessiz: { renk: "#6366F1", metin: "#C7D2FE", metinX: 38, icon: (
      <>
        <path d="M18 18C18 15.8 19.8 14 22 14C24.2 14 26 15.8 26 18V21H18V18Z" stroke="#6366F1" strokeWidth="1.2" />
        <path d="M16 21H28" stroke="#6366F1" strokeWidth="1.2" />
      </>
    ) },
    "100saat": { renk: "#14B8A6", metin: "#99F6E4", metinX: 38, icon: <path d="M18 13H26L22 18L26 23H18L22 18L18 13Z" stroke="#14B8A6" strokeWidth="1.2" /> },
    "500saat": { renk: "#EAB308", metin: "#FEF08A", metinX: 36, icon: <path d="M22 12L24.5 16.5L29.5 17.5L26 21L26.8 26L22 23.5L17.2 26L18 21L14.5 17.5L19.5 16.5L22 12Z" fill="#EAB308" /> },
    lobi: { renk: "#3B82F6", metin: "#BFDBFE", metinX: 38, icon: (
      <>
        <circle cx="19" cy="16" r="2.5" stroke="#3B82F6" strokeWidth="1" />
        <circle cx="25" cy="16" r="2.5" stroke="#3B82F6" strokeWidth="1" />
        <path d="M16 22C16 20 17.5 19 19 19C20.5 19 21 20 21 22M21 22C21 20 22.5 19 24 19C25.5 19 27 20 27 22" stroke="#3B82F6" strokeWidth="1" />
      </>
    ) },
    komite: { renk: "#A855F7", metin: "#F3E8FF", metinX: 38, icon: <path d="M17 14L23 14M20 14V22M18 22H22" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" /> },
    yasa: { renk: "#0284C7", metin: "#BAE6FD", metinX: 38, icon: (
      <>
        <path d="M18 13H24C25.1 13 26 13.9 26 15V21C26 22.1 25.1 23 24 23H18" stroke="#0284C7" strokeWidth="1.2" />
        <path d="M20 16H24M20 19H23" stroke="#0284C7" strokeWidth="1" />
      </>
    ) },
  }[id] || {};

  return (
    <svg viewBox="0 0 160 36" style={{ width: "100%", height: "100%" }}>
      <rect width="160" height="36" rx="18" fill="var(--anima-panel)" stroke={gövde.renk} strokeWidth="1.5" />
      {gövde.icon}
      <text x={gövde.metinX} y="23" fill={gövde.metin} fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="0.5">
        {(UNVANLAR.find((u) => u.id === id)?.ad || "").toLocaleUpperCase("tr-TR")}
      </text>
    </svg>
  );
}

function FrameRing({ id }) {
  const ring = {
    kozmik: (
      <>
        <defs>
          <linearGradient id="cosmicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C8FFF" /><stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          <filter id="cosmicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#cosmicGrad)" strokeWidth="4" filter="url(#cosmicGlow)" />
        <circle cx="60" cy="12" r="4" fill="#FF8F6B" filter="url(#cosmicGlow)" />
        <circle cx="102" cy="75" r="3" fill="#6FD3C7" />
      </>
    ),
    siber: (
      <>
        <defs>
          <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" /><stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#cyberGrad)" strokeWidth="3.5" strokeDasharray="18 6" filter="url(#cyberGlow)" />
        <circle cx="60" cy="60" r="53" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.3" />
      </>
    ),
    alev: (
      <>
        <defs>
          <linearGradient id="fireGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8F6B" /><stop offset="50%" stopColor="#FF0055" /><stop offset="100%" stopColor="#9C8FFF" />
          </linearGradient>
          <filter id="fireGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#fireGrad)" strokeWidth="4.5" filter="url(#fireGlow)" />
        <path d="M55 8L60 2L65 8L60 14Z" fill="#FF8F6B" filter="url(#fireGlow)" />
        <path d="M106 55L112 60L106 65L100 60Z" fill="#FF0055" />
      </>
    ),
    rune: (
      <>
        <defs>
          <linearGradient id="runeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="runeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#runeGrad)" strokeWidth="4" filter="url(#runeGlow)" />
        <circle cx="60" cy="12" r="3" fill="#34D399" /><circle cx="108" cy="60" r="3" fill="#34D399" />
        <circle cx="60" cy="108" r="3" fill="#34D399" /><circle cx="12" cy="60" r="3" fill="#34D399" />
        <polygon points="60,6 63,12 57,12" fill="#A7F3D0" />
      </>
    ),
    piksel: (
      <>
        <defs>
          <filter id="pixelGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="12" y="12" width="96" height="96" rx="16" stroke="#00E5FF" strokeWidth="3" strokeDasharray="12 6" filter="url(#pixelGlow)" fill="none" />
        <rect x="18" y="18" width="6" height="6" fill="#FBBF24" /><rect x="96" y="18" width="6" height="6" fill="#FBBF24" />
        <rect x="18" y="96" width="6" height="6" fill="#FBBF24" /><rect x="96" y="96" width="6" height="6" fill="#FBBF24" />
      </>
    ),
    sakura: (
      <>
        <defs>
          <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" /><stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <filter id="sakuraGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#sakuraGrad)" strokeWidth="3.5" filter="url(#sakuraGlow)" />
        <path d="M60 8C58 12 62 12 60 16C58 12 62 12 60 8Z" fill="#F472B6" filter="url(#sakuraGlow)" />
        <path d="M60 104C58 108 62 108 60 112C58 108 62 108 60 104Z" fill="#F472B6" filter="url(#sakuraGlow)" />
        <path d="M8 60C12 58 12 62 16 60C12 58 12 62 8 60Z" fill="#EC4899" />
        <path d="M104 60C108 58 108 62 112 60C108 58 108 62 104 60Z" fill="#EC4899" />
      </>
    ),
    koyu: (
      <>
        <defs>
          <linearGradient id="darkMatterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" /><stop offset="50%" stopColor="#4C1D95" /><stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="darkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#darkMatterGrad)" strokeWidth="4" strokeDasharray="10 4 2 4" filter="url(#darkGlow)" />
        <circle cx="60" cy="60" r="53" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="20" cy="40" r="3" fill="#06B6D4" filter="url(#darkGlow)" /><circle cx="100" cy="80" r="2.5" fill="#8B5CF6" filter="url(#darkGlow)" />
      </>
    ),
    prizma: (
      <>
        <defs>
          <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#A855F7" /><stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="prismGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <polygon points="60,10 104,35 104,85 60,110 16,85 16,35" stroke="url(#prismGrad)" strokeWidth="3.5" fill="none" filter="url(#prismGlow)" />
        <circle cx="60" cy="10" r="3" fill="#EC4899" /><circle cx="60" cy="110" r="3" fill="#6366F1" />
      </>
    ),
    galaksi: (
      <>
        <defs>
          <linearGradient id="galaxyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" /><stop offset="50%" stopColor="#818CF8" /><stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          <filter id="galaxyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="47" stroke="url(#galaxyGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="80 30" filter="url(#galaxyGlow)" />
        <circle cx="60" cy="60" r="53" stroke="url(#galaxyGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="40 50" filter="url(#galaxyGlow)" />
      </>
    ),
    altin: (
      <>
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" /><stop offset="50%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="48" stroke="url(#goldGrad)" strokeWidth="4" filter="url(#goldGlow)" />
        <rect x="46" y="98" width="28" height="16" rx="8" fill="#F59E0B" filter="url(#goldGlow)" />
        <text x="60" y="110" textAnchor="middle" fill="#131628" fontFamily="sans-serif" fontWeight="900" fontSize="10">★ 1</text>
      </>
    ),
  };
  return (
    <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full pointer-events-none">
      {ring[id] || ring.kozmik}
    </svg>
  );
}

const WEEK = [
  { gun: "Pzt", saat: 2.5 },
  { gun: "Sal", saat: 1.5 },
  { gun: "Çar", saat: 3 },
  { gun: "Per", saat: 2 },
  { gun: "Cum", saat: 0.5 },
  { gun: "Cmt", saat: 4 },
  { gun: "Paz", saat: 3.5 },
];

const ROZETLER = [
  { icon: Flame, label: "7 gün seri" },
  { icon: Trophy, label: "İlk topluluk" },
  { icon: Clock, label: "100 saat çalışma" },
];

const DERS_ODALARI = [
  { ad: "Fizik – Elektrik ve Manyetizma", katilimci: 4, canli: true },
  { ad: "Türkçe – Paragraf Çalışması", katilimci: 2, canli: true },
  { ad: "Kimya – Mol Kavramı", katilimci: 0, canli: false },
];

const SUNUCULAR = [
  { id: "yks", ad: "YKS Matematik", kisa: "YM", renk: "#9C8FFF", uye: 342 },
  { id: "ing", ad: "İngilizce Kulübü", kisa: "İK", renk: "#FF8F6B", uye: 128 },
  { id: "kod", ad: "Kodlama Atölyesi", kisa: "KA", renk: "#6FD3C7", uye: 96 },
];

const KANAL_YAPISI = {
  yks: {
    metin: [
      { id: "genel", ad: "genel-sohbet", aciklama: "YKS Matematik topluluğunun genel sohbet alanı" },
      { id: "soru-cevap", ad: "soru-cevap", aciklama: "Takıldığın soruları paylaş, birlikte çözelim" },
      { id: "duyurular", ad: "duyurular", aciklama: "Sınav tarihleri ve etkinlik duyuruları" },
    ],
    ses: [{ id: "calisma-odasi", ad: "çalışma odası", kisi: 4 }],
  },
  ing: {
    metin: [
      { id: "genel", ad: "genel-sohbet", aciklama: "İngilizce Kulübü genel sohbet" },
      { id: "kelime", ad: "günün-kelimesi", aciklama: "Her gün yeni bir kelime ve örnek cümle" },
    ],
    ses: [{ id: "konusma-kulubu", ad: "konuşma kulübü", kisi: 2 }],
  },
  kod: {
    metin: [
      { id: "genel", ad: "genel-sohbet", aciklama: "Kodlama Atölyesi genel sohbet" },
      { id: "proje", ad: "proje-paylaşımı", aciklama: "Bitirdiğin projeleri paylaş" },
    ],
    ses: [{ id: "pair-programming", ad: "pair programming", kisi: 0 }],
  },
};

const UYELER = {
  yks: [
    { ad: SELF, durum: "cevrimici", rol: "moderator" },
    { ad: "Ali Kaya", durum: "cevrimici" },
    { ad: "Zeynep Demir", durum: "cevrimici" },
    { ad: "Mert Şahin", durum: "bosta" },
    { ad: "Elif Arslan", durum: "cevrimdisi" },
  ],
  ing: [
    { ad: SELF, durum: "cevrimici" },
    { ad: "Cem Öztürk", durum: "cevrimici", rol: "moderator" },
  ],
  kod: [
    { ad: SELF, durum: "cevrimici" },
    { ad: "Buse Yıldız", durum: "bosta" },
  ],
};

const TOPLULUK_SOHBET_BASLANGIC = {
  genel: [
    { kim: "Zeynep Demir", renk: "#FF8F6B", saat: "20:14", icerik: "yarınki deneme kaçta başlıyor?" },
    { kim: "Ali Kaya", renk: "#6FD3C7", saat: "20:16", icerik: "09:00'da, 3 saat sürüyor" },
    { kim: "Mert Şahin", renk: "#9C8FFF", saat: "20:20", icerik: "türev sorularını tekrar edeyim biraz" },
  ],
  "soru-cevap": [
    { kim: "Elif Arslan", renk: "#FF8F6B", saat: "19:02", icerik: "integral alma kuralında takıldım, bakabilir misiniz?" },
  ],
  duyurular: [
    { kim: SELF, renk: "#9C8FFF", saat: "18:00", icerik: "cumartesi deneme sınavı var, katılım zorunlu" },
  ],
  kelime: [
    { kim: "Cem Öztürk", renk: "#6FD3C7", saat: "09:00", icerik: "bugünün kelimesi: 'resilience' — zorluklara dayanma gücü" },
  ],
  proje: [
    { kim: "Buse Yıldız", renk: "#FF8F6B", saat: "14:30", icerik: "hesap makinesi projemi bitirdim, repo linkini atıyorum" },
  ],
};

const KISI_LISTESI = [
  { id: "ali", ad: "Ali Kaya", durum: "cevrimici", renk: "#6FD3C7", okunmadi: 2 },
  { id: "zeynep", ad: "Zeynep Demir", durum: "cevrimici", renk: "#FF8F6B", okunmadi: 0 },
  { id: "cem", ad: "Cem Öztürk", durum: "bosta", renk: "#9C8FFF", okunmadi: 0 },
  { id: "buse", ad: "Buse Yıldız", durum: "cevrimdisi", renk: "#FF6FA5", okunmadi: 1 },
];

const DM_BASLANGIC = {
  ali: [
    { kim: "ali", saat: "19:40", icerik: "yarın kaçta buluşuyoruz?" },
    { kim: SELF, saat: "19:42", icerik: "10 gibi kütüphanede olalım mı?" },
    { kim: "ali", saat: "19:43", icerik: "olur, görüşürüz" },
  ],
  zeynep: [
    { kim: "zeynep", saat: "18:05", icerik: "matematik notlarını atabilir misin?" },
    { kim: SELF, saat: "18:07", icerik: "tabii, akşama atarım" },
    { kim: "zeynep", saat: "18:08", icerik: "tamamdır, notlarımı atarım" },
  ],
  cem: [{ kim: "cem", saat: "09:15", icerik: "kelime listesini kontrol et" }],
  buse: [{ kim: "buse", saat: "21:00", icerik: "proje harika olmuş 🎉" }],
};

const DURUM_RENK = { cevrimici: "#6FD3C7", bosta: "#FF8F6B", cevrimdisi: "#3A3F63" };
const DURUM_ETIKET = { cevrimici: "Çevrimiçi", bosta: "Boşta", cevrimdisi: "Çevrimdışı" };

/* ---------- sol menü ---------- */

function Sidebar({ aktif, setAktif }) {
  const { accent } = useContext(AccentContext);
  const { logoBaslangic, logoBitis } = useContext(ThemeContext);
  return (
    <>
      <aside
        className="hidden md:flex flex-col items-center w-20 py-6 gap-2 border-r shrink-0"
        style={{ borderColor: "#2A2F55", backgroundColor: "var(--anima-panel2)" }}
      >
        <div className="mb-6">
          <AnimaLogo startColor={logoBaslangic} endColor={logoBitis} size={36} />
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const secili = aktif === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAktif(item.id)}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: secili ? "#262B52" : "transparent", color: secili ? accent : "#8D89B0" }}
              title={item.label}
            >
              <Icon size={20} strokeWidth={2} />
            </button>
          );
        })}
      </aside>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 border-t z-20"
        style={{ borderColor: "#2A2F55", backgroundColor: "var(--anima-panel2)" }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const secili = aktif === item.id;
          return (
            <button key={item.id} onClick={() => setAktif(item.id)} className="flex flex-col items-center justify-center px-2" style={{ color: secili ? accent : "#6B6890" }}>
              <Icon size={19} />
            </button>
          );
        })}
      </nav>
    </>
  );
}

function TopBar({ baslik }) {
  return (
    <div className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0">
      <h1 className="font-display font-semibold text-lg tracking-tight" style={{ color: "var(--anima-text)" }}>
        {baslik}
      </h1>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
          <Search size={15} color="#8D89B0" />
          <input placeholder="Ara..." className="bg-transparent outline-none text-sm font-body w-32" style={{ color: "var(--anima-text)" }} />
        </div>
        <button className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
          <Bell size={16} color="#8D89B0" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF8F6B" }} />
        </button>
      </div>
    </div>
  );
}

/* ---------- profil ---------- */

function XPBar({ oyun }) {
  const { accent } = useContext(AccentContext);
  const yuzde = Math.min(100, (oyun.xp / oyun.sonrakiSeviyeXP) * 100);
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-body text-xs font-semibold" style={{ color: "#C084FC" }}>{oyun.unvan.toUpperCase()} · LVL {oyun.seviye}</span>
        <span className="font-body text-xs" style={{ color: "#6B6890" }}>#{oyun.sira} sırada</span>
      </div>
      <div className="w-full h-3 rounded-full mt-2" style={{ backgroundColor: "var(--anima-panel2)", border: "1px solid #2A2F55" }}>
        <div className="h-full rounded-full" style={{ width: `${yuzde}%`, background: `linear-gradient(90deg, ${accent}, #FF8F6B)` }} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>
          {oyun.xp.toLocaleString("tr-TR")} <span className="font-body font-normal text-xs" style={{ color: "#6B6890" }}>/ {oyun.sonrakiSeviyeXP.toLocaleString("tr-TR")} XP</span>
        </span>
        <span className="font-body text-xs font-medium" style={{ color: "#6FD3C7" }}>⌛ 2x XP Bonusu</span>
      </div>
    </div>
  );
}

function ProfileHero({ profile, setProfile }) {
  const { accent } = useContext(AccentContext);
  const { cerceve } = useContext(FrameContext);
  const { unvan } = useContext(TitleContext);
  const { isimRengi, isimGradyan, isimBitis } = useContext(ThemeContext);
  const isimStili = isimGradyan
    ? { backgroundImage: `linear-gradient(90deg, ${isimRengi}, ${isimBitis})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : { color: isimRengi };
  const [duzenle, setDuzenle] = useState(false);
  const [taslak, setTaslak] = useState(profile);

  const kaydet = () => {
    setProfile(taslak);
    setDuzenle(false);
  };
  const iptal = () => {
    setTaslak(profile);
    setDuzenle(false);
  };

  if (duzenle) {
    return (
      <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-xl shrink-0"
            style={{ background: avatarGradient(accent), color: "#14172B" }}
          >
            {initials(taslak.isim || "?")}
          </div>
          <div className="flex-1">
            <label className="font-body text-xs" style={{ color: "#8D89B0" }}>İsim</label>
            <input
              value={taslak.isim}
              onChange={(e) => setTaslak({ ...taslak, isim: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg font-body text-sm outline-none"
              style={{ backgroundColor: "var(--anima-panel2)", color: "var(--anima-text)", border: "1px solid #2A2F55" }}
            />
          </div>
        </div>
        <div>
          <label className="font-body text-xs" style={{ color: "#8D89B0" }}>Sınıf</label>
          <input
            value={taslak.sinif}
            onChange={(e) => setTaslak({ ...taslak, sinif: e.target.value })}
            className="w-full mt-1 px-3 py-2 rounded-lg font-body text-sm outline-none"
            style={{ backgroundColor: "var(--anima-panel2)", color: "var(--anima-text)", border: "1px solid #2A2F55" }}
          />
        </div>
        <div>
          <label className="font-body text-xs" style={{ color: "#8D89B0" }}>Bio</label>
          <textarea
            value={taslak.bio}
            onChange={(e) => setTaslak({ ...taslak, bio: e.target.value })}
            rows={2}
            className="w-full mt-1 px-3 py-2 rounded-lg font-body text-sm outline-none resize-none"
            style={{ backgroundColor: "var(--anima-panel2)", color: "var(--anima-text)", border: "1px solid #2A2F55" }}
          />
        </div>
        <div className="flex gap-2 mt-1">
          <button onClick={kaydet} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body font-medium" style={{ backgroundColor: accent, color: "#14172B" }}>
            <Check size={13} /> Kaydet
          </button>
          <button onClick={iptal} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body font-medium" style={{ backgroundColor: "#262B52", color: "#C9C5E8" }}>
            <X size={13} /> Vazgeç
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
      <div className="relative shrink-0" style={{ width: 112, height: 112 }}>
        <FrameRing id={cerceve} />
        <div
          className="absolute flex items-center justify-center font-display font-bold text-3xl"
          style={{ top: 16, left: 16, width: 80, height: 80, borderRadius: "50%", background: avatarGradient(accent), color: "#14172B" }}
        >
          {initials(profile.isim)}
        </div>
        <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 z-10" style={{ backgroundColor: "#6FD3C7", borderColor: "#14172B" }} />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="font-display font-semibold text-2xl" style={isimStili}>{profile.isim}</h2>
          <button
            onClick={() => { setTaslak(profile); setDuzenle(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium"
            style={{ backgroundColor: "#262B52", color: "#C9C5E8" }}
          >
            <Pencil size={12} /> Profili düzenle
          </button>
        </div>
        <p className="font-body text-sm mt-1" style={{ color: "#8D89B0" }}>{slug(profile.isim)} · {profile.sinif}</p>
        <div className="mt-2" style={{ width: 150, height: 32 }}>
          <TitleBadge id={unvan} />
        </div>
        <p className="font-body text-sm mt-3 max-w-md" style={{ color: "#C9C5E8" }}>{profile.bio}</p>

        <div className="flex gap-6 mt-5">
          <div><p className="font-display font-semibold text-lg" style={{ color: "var(--anima-text)" }}>128</p><p className="font-body text-xs" style={{ color: "#6B6890" }}>arkadaş</p></div>
          <div><p className="font-display font-semibold text-lg" style={{ color: "var(--anima-text)" }}>6</p><p className="font-body text-xs" style={{ color: "#6B6890" }}>topluluk</p></div>
          <div><p className="font-display font-semibold text-lg" style={{ color: "var(--anima-text)" }}>17.5</p><p className="font-body text-xs" style={{ color: "#6B6890" }}>saat / hafta</p></div>
        </div>
      </div>
    </div>
  );
}

function WeeklyChart() {
  const { accent } = useContext(AccentContext);
  const max = Math.max(...WEEK.map((d) => d.saat));
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>Bu haftaki çalışma</h3>
        <span className="font-body text-xs" style={{ color: "#8D89B0" }}>Toplam {WEEK.reduce((s, d) => s + d.saat, 0)} sa</span>
      </div>
      <div className="flex items-end justify-between gap-2 h-28">
        {WEEK.map((d) => (
          <div key={d.gun} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full rounded-t-md" style={{ height: `${(d.saat / max) * 88 + 4}px`, backgroundColor: accent }} />
            <span className="font-body text-[11px]" style={{ color: "#6B6890" }}>{d.gun}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Rozetler() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {ROZETLER.map((r) => {
        const Icon = r.icon;
        return (
          <div key={r.label} className="flex items-center gap-2 px-3.5 py-2 rounded-full" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
            <Icon size={14} color="#FF8F6B" />
            <span className="font-body text-xs font-medium" style={{ color: "#C9C5E8" }}>{r.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Topluluklarim({ setAna, setAktifSunucu }) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <h3 className="font-display font-semibold text-sm mb-4" style={{ color: "var(--anima-text)" }}>Topluluklarım</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SUNUCULAR.map((t) => (
          <button
            key={t.id}
            onClick={() => { setAktifSunucu(t.id); setAna("topluluklar"); }}
            className="p-3 rounded-xl text-left transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "var(--anima-panel2)" }}
          >
            <div className="w-8 h-1.5 rounded-full mb-3" style={{ backgroundColor: t.renk }} />
            <p className="font-body text-sm font-medium" style={{ color: "var(--anima-text)" }}>{t.ad}</p>
            <p className="font-body text-xs mt-1" style={{ color: "#6B6890" }}>{t.uye} üye</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function DersOdalarim() {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>Ders Odalarım</h3>
        <span className="text-[10px] font-body font-medium px-2 py-1 rounded-full" style={{ backgroundColor: "#262B52", color: "#8D89B0" }}>yakında</span>
      </div>
      <div className="flex flex-col gap-2">
        {DERS_ODALARI.map((o) => (
          <div key={o.ad} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "var(--anima-panel2)" }}>
            <div className="flex items-center gap-2.5">
              <BookOpen size={14} color={o.canli ? "#6FD3C7" : "#3A3F63"} />
              <span className="font-body text-sm" style={{ color: "var(--anima-text)" }}>{o.ad}</span>
            </div>
            <span className="font-body text-xs" style={{ color: "#6B6890" }}>{o.katilimci > 0 ? `${o.katilimci} kişi` : "boş"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilView({ profile, setProfile, setAna, setAktifSunucu, oyun }) {
  return (
    <main className="flex-1 overflow-y-auto px-5 md:px-8 pb-10 flex flex-col gap-6 max-w-3xl">
      <ProfileHero profile={profile} setProfile={setProfile} />
      <XPBar oyun={oyun} />
      <Rozetler />
      <WeeklyChart />
      <Topluluklarim setAna={setAna} setAktifSunucu={setAktifSunucu} />
      <DersOdalarim />
    </main>
  );
}

/* ---------- mesajlar (DM) ---------- */

function ContactList({ aktifKisi, setAktifKisi, gorunum, setGorunum }) {
  return (
    <div className={`${gorunum === "liste" ? "flex" : "hidden"} sm:flex w-full sm:w-64 shrink-0 flex-col border-r`} style={{ borderColor: "#2A2F55", backgroundColor: "var(--anima-panel2)" }}>
      <div className="px-4 py-4 border-b" style={{ borderColor: "#2A2F55" }}>
        <h2 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>Sohbetler</h2>
      </div>
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {KISI_LISTESI.map((k) => {
          const secili = aktifKisi === k.id;
          return (
            <button
              key={k.id}
              onClick={() => { setAktifKisi(k.id); setGorunum("sohbet"); }}
              className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl mb-1 text-left"
              style={{ backgroundColor: secili ? "#262B52" : "transparent" }}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-xs" style={{ backgroundColor: k.renk, color: "#14172B" }}>
                  {initials(k.ad)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ backgroundColor: DURUM_RENK[k.durum], borderColor: "var(--anima-panel2)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium truncate" style={{ color: "var(--anima-text)" }}>{k.ad}</p>
                <p className="font-body text-xs truncate" style={{ color: "#6B6890" }}>{(DM_BASLANGIC[k.id] || []).slice(-1)[0]?.icerik || "Henüz mesaj yok"}</p>
              </div>
              {k.okunmadi > 0 && (
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-body text-[10px] font-semibold" style={{ backgroundColor: "#FF8F6B", color: "#14172B" }}>
                  {k.okunmadi}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DMChat({ kisi, mesajlar, setMesajlar, profile, gorunum, setGorunum }) {
  const { accent } = useContext(AccentContext);
  const [taslak, setTaslak] = useState("");

  const gonder = () => {
    if (!taslak.trim()) return;
    const yeni = { kim: SELF, saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), icerik: taslak.trim() };
    setMesajlar((onceki) => ({ ...onceki, [kisi.id]: [...(onceki[kisi.id] || []), yeni] }));
    setTaslak("");
  };

  const liste = mesajlar[kisi.id] || [];

  return (
    <div className={`${gorunum === "sohbet" ? "flex" : "hidden"} sm:flex flex-1 flex-col min-w-0`}>
      <div className="px-5 py-3.5 border-b flex items-center gap-3" style={{ borderColor: "#2A2F55" }}>
        <button onClick={() => setGorunum("liste")} className="sm:hidden" aria-label="Geri">
          <ChevronDown size={18} color="#8D89B0" style={{ transform: "rotate(90deg)" }} />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold text-xs" style={{ backgroundColor: kisi.renk, color: "#14172B" }}>
          {initials(kisi.ad)}
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm leading-tight" style={{ color: "var(--anima-text)" }}>{kisi.ad}</h3>
          <p className="font-body text-[11px]" style={{ color: DURUM_RENK[kisi.durum] }}>{DURUM_ETIKET[kisi.durum]}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
        {liste.map((m, i) => {
          const ben = m.kim === SELF;
          return (
            <div key={i} className={`flex ${ben ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl"
                style={{
                  backgroundColor: ben ? accent : "var(--anima-panel)",
                  color: ben ? "#14172B" : "var(--anima-text)",
                  border: ben ? "none" : "1px solid #2A2F55",
                }}
              >
                <p className="font-body text-sm">{m.icerik}</p>
                <p className="font-body text-[10px] mt-1 opacity-70">{m.saat}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-5 pt-2">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
          <input
            value={taslak}
            onChange={(e) => setTaslak(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && gonder()}
            placeholder={`${kisi.ad}'a mesaj yaz`}
            className="flex-1 bg-transparent outline-none font-body text-sm"
            style={{ color: "var(--anima-text)" }}
          />
          <button onClick={gonder} aria-label="Gönder"><Send size={17} color={accent} /></button>
        </div>
      </div>
    </div>
  );
}

function MesajlarView({ aktifKisi, setAktifKisi, dmMessages, setDmMessages, profile }) {
  const [gorunum, setGorunum] = useState("liste");
  const kisi = KISI_LISTESI.find((k) => k.id === aktifKisi);
  return (
    <div className="flex-1 flex min-h-0">
      <ContactList aktifKisi={aktifKisi} setAktifKisi={setAktifKisi} gorunum={gorunum} setGorunum={setGorunum} />
      <DMChat kisi={kisi} mesajlar={dmMessages} setMesajlar={setDmMessages} profile={profile} gorunum={gorunum} setGorunum={setGorunum} />
    </div>
  );
}

/* ---------- topluluklar (sunucular) ---------- */

function ServerRail({ aktifSunucu, sunucuSec }) {
  return (
    <div className="flex flex-col items-center gap-3 w-16 py-4 shrink-0" style={{ backgroundColor: "#0F1226" }}>
      {SUNUCULAR.map((s) => {
        const aktif = aktifSunucu === s.id;
        return (
          <button
            key={s.id}
            onClick={() => sunucuSec(s.id)}
            className="relative w-11 h-11 flex items-center justify-center font-display font-semibold text-sm transition-all"
            style={{ backgroundColor: aktif ? s.renk : "var(--anima-panel)", color: aktif ? "#14172B" : "#8D89B0", borderRadius: aktif ? "16px" : "50%" }}
            title={s.ad}
          >
            {s.kisa}
          </button>
        );
      })}
      <button className="w-11 h-11 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: "var(--anima-panel)", color: "#6FD3C7" }} title="Topluluk keşfet">
        <Plus size={18} />
      </button>
    </div>
  );
}

function ChannelList({ sunucu, kanallar, aktifKanalId, setAktifKanalId, profile }) {
  const { accent } = useContext(AccentContext);
  return (
    <div className="w-56 shrink-0 flex flex-col" style={{ backgroundColor: "var(--anima-panel2)", borderRight: "1px solid #2A2F55" }}>
      <div className="px-4 py-4 border-b flex items-center justify-between" style={{ borderColor: "#2A2F55" }}>
        <h2 className="font-display font-semibold text-sm truncate" style={{ color: "var(--anima-text)" }}>{sunucu.ad}</h2>
        <ChevronDown size={15} color="#8D89B0" />
      </div>
      <div className="flex-1 overflow-y-auto py-3 px-2">
        <p className="font-body text-[11px] font-medium px-2 mb-1.5" style={{ color: "#6B6890" }}>Metin kanalları</p>
        {kanallar.metin.map((k) => {
          const aktif = aktifKanalId === k.id;
          return (
            <button key={k.id} onClick={() => setAktifKanalId(k.id)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 text-left" style={{ backgroundColor: aktif ? "#262B52" : "transparent" }}>
              <Hash size={15} color={aktif ? "#C9C5E8" : "#6B6890"} />
              <span className="font-body text-sm truncate" style={{ color: aktif ? "var(--anima-text)" : "#8D89B0" }}>{k.ad}</span>
            </button>
          );
        })}
        <p className="font-body text-[11px] font-medium px-2 mt-4 mb-1.5" style={{ color: "#6B6890" }}>Ses kanalları</p>
        {kanallar.ses.map((k) => (
          <div key={k.id} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5">
            <Volume2 size={15} color="#6B6890" />
            <span className="font-body text-sm" style={{ color: "#8D89B0" }}>{k.ad}</span>
            {k.kisi > 0 && <span className="font-body text-[11px] ml-auto" style={{ color: "#6FD3C7" }}>{k.kisi}</span>}
          </div>
        ))}
      </div>
      <div className="p-3 flex items-center gap-2.5 border-t" style={{ borderColor: "#2A2F55" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold text-xs shrink-0" style={{ background: avatarGradient(accent), color: "#14172B" }}>
          {initials(profile.isim)}
        </div>
        <div className="min-w-0">
          <p className="font-body text-xs font-medium truncate" style={{ color: "var(--anima-text)" }}>{profile.isim}</p>
          <p className="font-body text-[11px]" style={{ color: "#6FD3C7" }}>Çevrimiçi</p>
        </div>
      </div>
    </div>
  );
}

function ToplulukChat({ kanal, mesajlar, setMesajlar, profile }) {
  const { accent } = useContext(AccentContext);
  const [taslak, setTaslak] = useState("");

  const gonder = () => {
    if (!taslak.trim()) return;
    const yeni = { kim: SELF, renk: accent, saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), icerik: taslak.trim() };
    setMesajlar((onceki) => ({ ...onceki, [kanal.id]: [...(onceki[kanal.id] || []), yeni] }));
    setTaslak("");
  };

  const liste = mesajlar[kanal.id] || [];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: "#2A2F55" }}>
        <Hash size={17} color="#6B6890" />
        <h3 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>{kanal.ad}</h3>
        <span className="font-body text-xs ml-2 hidden sm:inline" style={{ color: "#6B6890" }}>{kanal.aciklama}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {liste.length === 0 && <p className="font-body text-sm text-center mt-10" style={{ color: "#6B6890" }}>Bu kanalda henüz mesaj yok. İlk mesajı sen yaz.</p>}
        {liste.map((m, i) => {
          const ben = m.kim === SELF;
          const gosterilenAd = ben ? profile.isim : m.kim;
          return (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-xs shrink-0" style={{ backgroundColor: m.renk, color: "#14172B" }}>
                {initials(gosterilenAd)}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-sm font-semibold" style={{ color: "var(--anima-text)" }}>{gosterilenAd}</span>
                  <span className="font-body text-[11px]" style={{ color: "#6B6890" }}>{m.saat}</span>
                </div>
                <p className="font-body text-sm mt-0.5" style={{ color: "#C9C5E8" }}>{m.icerik}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
          <input
            value={taslak}
            onChange={(e) => setTaslak(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && gonder()}
            placeholder={`#${kanal.ad} kanalına mesaj yaz`}
            className="flex-1 bg-transparent outline-none font-body text-sm"
            style={{ color: "var(--anima-text)" }}
          />
          <button onClick={gonder} aria-label="Gönder"><Send size={17} color={accent} /></button>
        </div>
      </div>
    </div>
  );
}

function MemberList({ uyeler, profile }) {
  const { accent } = useContext(AccentContext);
  const gruplar = [
    { baslik: "Çevrimiçi", filtre: (u) => u.durum === "cevrimici" },
    { baslik: "Boşta", filtre: (u) => u.durum === "bosta" },
    { baslik: "Çevrimdışı", filtre: (u) => u.durum === "cevrimdisi" },
  ];
  return (
    <div className="w-56 shrink-0 hidden lg:flex flex-col py-4 px-3" style={{ backgroundColor: "var(--anima-panel2)", borderLeft: "1px solid #2A2F55" }}>
      {gruplar.map((g) => {
        const liste = uyeler.filter(g.filtre);
        if (liste.length === 0) return null;
        return (
          <div key={g.baslik} className="mb-4">
            <p className="font-body text-[11px] font-medium px-2 mb-1.5" style={{ color: "#6B6890" }}>{g.baslik} — {liste.length}</p>
            {liste.map((u, i) => {
              const gosterilenAd = u.ad === SELF ? profile.isim : u.ad;
              return (
                <div key={i} className="flex items-center gap-2.5 px-2 py-1.5">
                  <div className="relative shrink-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-display font-semibold text-[10px]"
                      style={u.ad === SELF ? { background: avatarGradient(accent), color: "#14172B" } : { backgroundColor: "#262B52", color: "#C9C5E8" }}
                    >
                      {initials(gosterilenAd)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: DURUM_RENK[u.durum], borderColor: "var(--anima-panel2)" }} />
                  </div>
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="font-body text-sm truncate" style={{ color: u.durum === "cevrimdisi" ? "#6B6890" : "#C9C5E8" }}>{gosterilenAd}</span>
                    {u.rol === "moderator" && <Shield size={11} color="#FF8F6B" />}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function TopluluklarView({ aktifSunucu, sunucuSec, aktifKanalId, setAktifKanalId, communityMessages, setCommunityMessages, profile }) {
  const sunucu = SUNUCULAR.find((s) => s.id === aktifSunucu);
  const kanallar = KANAL_YAPISI[aktifSunucu];
  const uyeler = UYELER[aktifSunucu];
  const aktifKanal = kanallar.metin.find((k) => k.id === aktifKanalId) || kanallar.metin[0];

  return (
    <div className="flex-1 flex min-h-0">
      <ServerRail aktifSunucu={aktifSunucu} sunucuSec={sunucuSec} />
      <ChannelList sunucu={sunucu} kanallar={kanallar} aktifKanalId={aktifKanal.id} setAktifKanalId={setAktifKanalId} profile={profile} />
      <ToplulukChat kanal={aktifKanal} mesajlar={communityMessages} setMesajlar={setCommunityMessages} profile={profile} />
      <MemberList uyeler={uyeler} profile={profile} />
    </div>
  );
}

/* ---------- liderlik tablosu ---------- */

function LiderlikView({ profile, oyun }) {
  const madalya = { 1: "#FBBF24", 2: "#94A3B8", 3: "#F97316" };
  return (
    <main className="flex-1 overflow-y-auto px-5 md:px-8 pb-10 max-w-2xl">
      <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base" style={{ color: "var(--anima-text)" }}>Haftalık Liderlik Tablosu</h3>
          <span className="font-body text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "var(--anima-panel2)", color: "#6FD3C7", border: "1px solid #2A2F55" }}>⏳ Sıfırlanma: 2g 14s</span>
        </div>

        <div className="flex flex-col gap-2">
          {LIDERLIK_TABLOSU.filter((k) => k.sira <= 3).map((k) => (
            <div key={k.sira} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--anima-panel2)", border: `1px solid ${madalya[k.sira]}55` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0" style={{ backgroundColor: madalya[k.sira], color: "#14172B" }}>{k.sira}</div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-xs shrink-0" style={{ backgroundColor: "#0F1226", border: `1.5px solid ${madalya[k.sira]}`, color: madalya[k.sira] }}>{initials(k.ad)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold truncate" style={{ color: "var(--anima-text)" }}>{k.ad}</p>
                <p className="font-body text-[11px] truncate" style={{ color: madalya[k.sira] }}>{k.unvan}</p>
              </div>
              <span className="font-display font-semibold text-sm shrink-0" style={{ color: madalya[k.sira] }}>{k.xp.toLocaleString("tr-TR")} XP</span>
            </div>
          ))}
        </div>

        <div className="my-4 border-t border-dashed" style={{ borderColor: "#2A2F55" }} />

        <div className="flex flex-col gap-2">
          {LIDERLIK_TABLOSU.filter((k) => k.sira > 3).map((k) => (
            <div key={k.sira} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--anima-panel2)" }}>
              <span className="font-body text-xs font-semibold w-7 shrink-0" style={{ color: "#6B6890" }}>#{k.sira}</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold text-[11px] shrink-0" style={{ backgroundColor: "#262B52", color: "#C9C5E8" }}>{initials(k.ad)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm truncate" style={{ color: "#C9C5E8" }}>{k.ad}</p>
              </div>
              <span className="font-body text-xs font-medium shrink-0" style={{ color: "#8D89B0" }}>{k.xp.toLocaleString("tr-TR")} XP</span>
            </div>
          ))}

          <div className="flex items-center gap-3 p-3 rounded-xl mt-1" style={{ backgroundColor: "#262B52", border: "2px solid #9C8FFF" }}>
            <span className="font-body text-xs font-bold w-7 shrink-0" style={{ color: "#9C8FFF" }}>#{oyun.sira}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold text-[11px] shrink-0" style={{ backgroundColor: "#0F1226", border: "1.5px solid #9C8FFF", color: "#9C8FFF" }}>{initials(profile.isim)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold truncate" style={{ color: "var(--anima-text)" }}>{profile.isim} (Sen)</p>
            </div>
            <span className="font-display font-semibold text-sm shrink-0" style={{ color: "#9C8FFF" }}>{oyun.xp.toLocaleString("tr-TR")} XP</span>
          </div>
        </div>

        <p className="font-body text-xs text-center mt-4" style={{ color: "#8D89B0" }}>
          İlk 3'e girmek için <span style={{ color: "#FF8F6B", fontWeight: 700 }}>{(LIDERLIK_TABLOSU[2].xp - oyun.xp).toLocaleString("tr-TR")} XP</span> daha kazan!
        </p>
      </div>
    </main>
  );
}

/* ---------- ayarlar ---------- */

function Toggle({ acik, setAcik }) {
  const { accent } = useContext(AccentContext);
  return (
    <button
      onClick={() => setAcik(!acik)}
      className="w-11 h-6 rounded-full relative transition-colors shrink-0"
      style={{ backgroundColor: acik ? accent : "#2A2F55" }}
    >
      <span className="absolute top-0.5 w-5 h-5 rounded-full transition-all" style={{ left: acik ? "22px" : "2px", backgroundColor: "#14172B" }} />
    </button>
  );
}

function UnvanKarti() {
  const { unvan, setUnvan } = useContext(TitleContext);
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <h3 className="font-display font-semibold text-sm mb-1" style={{ color: "var(--anima-text)" }}>Envanter · Ünvan</h3>
      <p className="font-body text-xs mb-4" style={{ color: "#8D89B0" }}>Kazandığın ünvanlardan birini profilinde göster.</p>
      <div className="flex flex-wrap gap-2.5">
        {UNVANLAR.map((u) => {
          const secili = unvan === u.id;
          return (
            <button
              key={u.id}
              onClick={() => setUnvan(u.id)}
              className="rounded-full transition-transform"
              style={{ width: 150, height: 32, outline: secili ? "2px solid #F3F1FA" : "none", outlineOffset: 2, borderRadius: 999 }}
            >
              <TitleBadge id={u.id} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EnvanterKarti() {
  const { cerceve, setCerceve } = useContext(FrameContext);
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
      <h3 className="font-display font-semibold text-sm mb-1" style={{ color: "var(--anima-text)" }}>Envanter · Avatar çerçevesi</h3>
      <p className="font-body text-xs mb-4" style={{ color: "#8D89B0" }}>Kazandığın çerçevelerden birini profilinde kuşan.</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {CERCEVELER.map((c) => {
          const kusanildi = cerceve === c.id;
          return (
            <button
              key={c.id}
              disabled={c.kilitli}
              onClick={() => !c.kilitli && setCerceve(c.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-opacity"
              style={{ backgroundColor: "var(--anima-panel2)", border: kusanildi ? "2px solid #9C8FFF" : "1px solid #2A2F55", opacity: c.kilitli ? 0.45 : 1 }}
            >
              <div className="relative" style={{ width: 44, height: 44 }}>
                <FrameRing id={c.id} />
                <div className="absolute rounded-full" style={{ top: 8, left: 8, width: 28, height: 28, backgroundColor: "#0F1226" }} />
                {c.kilitli && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={13} color="#8D89B0" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-body text-[11px] font-medium truncate" style={{ color: "var(--anima-text)" }}>{c.ad}</p>
                <p className="font-body text-[10px]" style={{ color: c.kilitli ? "#6B6890" : kusanildi ? "#9C8FFF" : "#6FD3C7" }}>{c.kilitli ? "Kilitli" : kusanildi ? "Kuşanıldı" : "Seç"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RenkSecici({ etiket, renk, setRenk }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm" style={{ color: "#C9C5E8" }}>{etiket}</span>
      <div className="flex items-center gap-2">
        <span className="font-body text-xs" style={{ color: "#6B6890" }}>{renk.toUpperCase()}</span>
        <input
          type="color"
          value={renk}
          onChange={(e) => setRenk(e.target.value)}
          className="w-9 h-9 rounded-full cursor-pointer border-2"
          style={{ borderColor: "#2A2F55", backgroundColor: "transparent", padding: 0 }}
        />
      </div>
    </div>
  );
}

function AyarlarView({ profile }) {
  const { accent, setAccent } = useContext(AccentContext);
  const {
    bgRenk, setBgRenk,
    panelRenk, setPanelRenk,
    metinRengi, setMetinRengi,
    isimRengi, setIsimRengi,
    isimGradyan, setIsimGradyan,
    isimBitis, setIsimBitis,
    fontId, setFontId,
    logoBaslangic, setLogoBaslangic,
    logoBitis, setLogoBitis,
  } = useContext(ThemeContext);
  const [bildirimler, setBildirimler] = useState(true);
  const [sesliBildirim, setSesliBildirim] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto px-5 md:px-8 pb-10 flex flex-col gap-6 max-w-2xl">
      <EnvanterKarti />
      <UnvanKarti />

      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <div>
          <h3 className="font-display font-semibold text-sm mb-1" style={{ color: "var(--anima-text)" }}>Arayüz ve renkler</h3>
          <p className="font-body text-xs" style={{ color: "#8D89B0" }}>Arka planı, kutu rengini, yazı rengini ve fontunu tamamen kendine göre ayarla.</p>
        </div>

        <RenkSecici etiket="Arka plan rengi" renk={bgRenk} setRenk={setBgRenk} />
        <RenkSecici etiket="Kutu / kart rengi" renk={panelRenk} setRenk={setPanelRenk} />
        <RenkSecici etiket="Genel yazı rengi" renk={metinRengi} setRenk={setMetinRengi} />

        <div className="border-t pt-4" style={{ borderColor: "#2A2F55" }}>
          <p className="font-body text-sm mb-3" style={{ color: "#C9C5E8" }}>Vurgu rengi</p>
          <div className="flex gap-3 flex-wrap mb-3">
            {ACCENT_SECENEKLERI.map((s) => (
              <button key={s.hex} onClick={() => setAccent(s.hex)} className="flex flex-col items-center gap-1.5">
                <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: s.hex, border: accent === s.hex ? "2px solid #F3F1FA" : "2px solid transparent" }}>
                  {accent === s.hex && <Check size={15} color="#14172B" />}
                </span>
                <span className="font-body text-[11px]" style={{ color: "#8D89B0" }}>{s.ad}</span>
              </button>
            ))}
          </div>
          <RenkSecici etiket="Özel renk (RGB seçici)" renk={accent} setRenk={setAccent} />
        </div>

        <div className="border-t pt-4" style={{ borderColor: "#2A2F55" }}>
          <p className="font-body text-sm mb-3" style={{ color: "#C9C5E8" }}>İsim rengi</p>
          <RenkSecici etiket="İsim rengi" renk={isimRengi} setRenk={setIsimRengi} />
          <div className="flex items-center justify-between mt-3">
            <span className="font-body text-sm" style={{ color: "#C9C5E8" }}>Gradyan kullan</span>
            <Toggle acik={isimGradyan} setAcik={setIsimGradyan} />
          </div>
          {isimGradyan && (
            <div className="mt-3">
              <RenkSecici etiket="Gradyan bitiş rengi" renk={isimBitis} setRenk={setIsimBitis} />
              <p
                className="font-display font-semibold text-xl mt-3"
                style={{ backgroundImage: `linear-gradient(90deg, ${isimRengi}, ${isimBitis})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              >
                Önizleme: {profile.isim}
              </p>
            </div>
          )}
        </div>

        <div className="border-t pt-4" style={{ borderColor: "#2A2F55" }}>
          <p className="font-body text-sm mb-3" style={{ color: "#C9C5E8" }}>Font</p>
          <div className="flex gap-2 flex-wrap">
            {FONT_SECENEKLERI.map((f) => (
              <button
                key={f.id}
                onClick={() => setFontId(f.id)}
                className="px-3.5 py-2 rounded-xl text-left"
                style={{ backgroundColor: fontId === f.id ? "#262B52" : "var(--anima-panel2)", border: fontId === f.id ? "1.5px solid #9C8FFF" : "1px solid #2A2F55" }}
              >
                <p className="text-sm" style={{ color: "var(--anima-text)", fontFamily: f.display }}>{f.ad}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <h3 className="font-display font-semibold text-sm mb-1" style={{ color: "var(--anima-text)" }}>Uygulama simgesi</h3>
        <p className="font-body text-xs mb-4" style={{ color: "#8D89B0" }}>Anima logosunun gradyan renklerini seç, sol menüdeki simge de güncellensin.</p>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--anima-panel2)", border: "1px solid #2A2F55" }}>
            <AnimaLogo startColor={logoBaslangic} endColor={logoBitis} size={40} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <RenkSecici etiket="Başlangıç rengi" renk={logoBaslangic} setRenk={setLogoBaslangic} />
            <RenkSecici etiket="Bitiş rengi" renk={logoBitis} setRenk={setLogoBitis} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <h3 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>Bildirimler</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-sm" style={{ color: "var(--anima-text)" }}>Mesaj bildirimleri</p>
            <p className="font-body text-xs" style={{ color: "#6B6890" }}>Yeni mesaj geldiğinde bildirim al</p>
          </div>
          <Toggle acik={bildirimler} setAcik={setBildirimler} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-sm" style={{ color: "var(--anima-text)" }}>Sesli uyarı</p>
            <p className="font-body text-xs" style={{ color: "#6B6890" }}>Bildirimlerde ses çal</p>
          </div>
          <Toggle acik={sesliBildirim} setAcik={setSesliBildirim} />
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--anima-panel)", border: "1px solid #2A2F55" }}>
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-sm" style={{ color: "var(--anima-text)" }}>Yapay zeka desteği</h3>
          <span className="text-[10px] font-body font-medium px-2 py-1 rounded-full" style={{ backgroundColor: "#262B52", color: "#8D89B0" }}>yakında</span>
        </div>
        <p className="font-body text-xs mt-2" style={{ color: "#8D89B0" }}>Ders sorularına yardım ve sohbet özetleme burada açılacak.</p>
      </div>
    </main>
  );
}

/* ---------- kök uygulama ---------- */

export default function AnimaApp() {
  const [ana, setAna] = useState("profil");
  const [accent, setAccent] = useState("#9C8FFF");
  const [cerceve, setCerceve] = useState("kozmik");
  const [unvan, setUnvan] = useState("mat");

  const [bgRenk, setBgRenk] = useState("#14172B");
  const [panelRenk, setPanelRenk] = useState("#1E2242");
  const [metinRengi, setMetinRengi] = useState("#F3F1FA");
  const [isimRengi, setIsimRengi] = useState("#F3F1FA");
  const [isimGradyan, setIsimGradyan] = useState(false);
  const [isimBitis, setIsimBitis] = useState("#FF8F6B");
  const [fontId, setFontId] = useState("modern");
  const [logoBaslangic, setLogoBaslangic] = useState("#9C8FFF");
  const [logoBitis, setLogoBitis] = useState("#FF8F6B");

  const [oyun] = useState({
    seviye: 14,
    xp: 3850,
    sonrakiSeviyeXP: 5000,
    unvan: "Gece Mesaisi",
    sira: 14,
  });

  const [profile, setProfile] = useState({
    isim: "Ece Yılmaz",
    sinif: "12. sınıf · YKS 2027",
    bio: "Matematik ve fizik çalışıyorum, akşamları topluluk sohbetlerinde takılıyorum.",
  });

  const [aktifKisi, setAktifKisi] = useState("ali");
  const [dmMessages, setDmMessages] = useState(DM_BASLANGIC);

  const [aktifSunucu, setAktifSunucu] = useState("yks");
  const [aktifKanalId, setAktifKanalId] = useState("genel");
  const [communityMessages, setCommunityMessages] = useState(TOPLULUK_SOHBET_BASLANGIC);

  const sunucuSec = (id) => {
    setAktifSunucu(id);
    setAktifKanalId(KANAL_YAPISI[id].metin[0].id);
  };

  const basliklar = { profil: "Anima", mesajlar: "Mesajlar", topluluklar: "Topluluklar", liderlik: "Liderlik Tablosu", ayarlar: "Ayarlar" };

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      <FrameContext.Provider value={{ cerceve, setCerceve }}>
        <TitleContext.Provider value={{ unvan, setUnvan }}>
        <ThemeContext.Provider
          value={{
            bgRenk, setBgRenk,
            panelRenk, setPanelRenk,
            metinRengi, setMetinRengi,
            isimRengi, setIsimRengi,
            isimGradyan, setIsimGradyan,
            isimBitis, setIsimBitis,
            fontId, setFontId,
            logoBaslangic, setLogoBaslangic,
            logoBitis, setLogoBitis,
          }}
        >
        <div
          className="w-full h-screen flex font-body"
          style={{ backgroundColor: bgRenk, "--anima-panel": panelRenk, "--anima-panel2": koyulastir(panelRenk), "--anima-text": metinRengi }}
        >
          <style>{fontStyleCss(fontId)}</style>
          <Sidebar aktif={ana} setAktif={setAna} />
          <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
            {ana !== "mesajlar" && <TopBar baslik={basliklar[ana]} />}

            {ana === "profil" && <ProfilView profile={profile} setProfile={setProfile} setAna={setAna} setAktifSunucu={sunucuSec} oyun={oyun} />}
            {ana === "mesajlar" && (
              <MesajlarView aktifKisi={aktifKisi} setAktifKisi={setAktifKisi} dmMessages={dmMessages} setDmMessages={setDmMessages} profile={profile} />
            )}
            {ana === "topluluklar" && (
              <TopluluklarView
                aktifSunucu={aktifSunucu}
                sunucuSec={sunucuSec}
                aktifKanalId={aktifKanalId}
                setAktifKanalId={setAktifKanalId}
                communityMessages={communityMessages}
                setCommunityMessages={setCommunityMessages}
                profile={profile}
              />
            )}
            {ana === "liderlik" && <LiderlikView profile={profile} oyun={oyun} />}
            {ana === "ayarlar" && <AyarlarView profile={profile} />}
          </div>
        </div>
        </ThemeContext.Provider>
        </TitleContext.Provider>
      </FrameContext.Provider>
    </AccentContext.Provider>
  );
}
