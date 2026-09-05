import React, { useState } from "react";
import { User, MessageCircle, Users, ChevronRight } from "lucide-react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Manrope', sans-serif; }
`;

const SLAYTLAR = [
  {
    icon: User,
    baslik: "Profilini kendine göre yap",
    aciklama: "Renkleri, fontu, avatar çerçeveni ve kazandığın ünvanları seç — burası tamamen sana özel.",
  },
  {
    icon: MessageCircle,
    baslik: "Arkadaşlarınla sohbet et",
    aciklama: "Birebir mesajlaş, kim çevrimiçi gör, sohbetlerin hep elinin altında olsun.",
  },
  {
    icon: Users,
    baslik: "Topluluklar kur, birlikte çalış",
    aciklama: "Kendi topluluğunu oluştur, kanallar aç, aynı hedefteki insanlarla bir araya gel.",
  },
];

const STORAGE_KEY = "glenna_onboarding_gorundu";

export function onboardingGorulduMu() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Onboarding({ onBitir }) {
  const [adim, setAdim] = useState(0);
  const slayt = SLAYTLAR[adim];
  const Icon = slayt.icon;
  const sonSlayt = adim === SLAYTLAR.length - 1;

  const bitir = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    onBitir();
  };

  const ileri = () => {
    if (sonSlayt) bitir();
    else setAdim((a) => a + 1);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between font-body px-6 py-10" style={{ backgroundColor: "#14172B" }}>
      <style>{FONT_STYLE}</style>

      <div className="w-full flex justify-between items-center max-w-sm">
        <p className="font-display font-bold text-lg" style={{ color: "#F3F1FA" }}>Glenna</p>
        {!sonSlayt && (
          <button onClick={bitir} className="font-body text-sm" style={{ color: "#6B6890" }}>
            Geç
          </button>
        )}
      </div>

      <div className="flex flex-col items-center text-center max-w-sm">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #7CB893 0%, #A8D8B9 100%)" }}
        >
          <Icon size={34} color="#14172B" />
        </div>
        <h1 className="font-display font-bold text-2xl mb-3" style={{ color: "#F3F1FA" }}>{slayt.baslik}</h1>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#8D89B0" }}>{slayt.aciklama}</p>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {SLAYTLAR.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === adim ? "24px" : "8px", backgroundColor: i === adim ? "#7CB893" : "#2A2F55" }}
            />
          ))}
        </div>
        <button
          onClick={ileri}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-body text-sm font-semibold"
          style={{ backgroundColor: "#7CB893", color: "#14172B" }}
        >
          {sonSlayt ? "Başlayalım" : "İleri"}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
