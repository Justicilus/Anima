import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Manrope', sans-serif; }
`;

export default function Auth({ children }) {
  const [session, setSession] = useState(undefined); // undefined = yükleniyor, null = giriş yok
  const [mod, setMod] = useState("giris"); // 'giris' | 'kayit'
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [bilgi, setBilgi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: dinleyici } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => dinleyici.subscription.unsubscribe();
  }, []);

  const gonder = async (e) => {
    e.preventDefault();
    setHata("");
    setBilgi("");
    setYukleniyor(true);

    if (mod === "kayit") {
      const { error } = await supabase.auth.signUp({ email, password: sifre });
      if (error) setHata(error.message);
      else setBilgi("Kayıt oldu! E-postana gelen onay linkine tıkla, sonra giriş yap.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: sifre });
      if (error) setHata(error.message);
    }
    setYukleniyor(false);
  };

  const cikisYap = async () => {
    await supabase.auth.signOut();
  };

  if (session === undefined) {
    return (
      <div className="w-full h-screen flex items-center justify-center font-body" style={{ backgroundColor: "#14172B" }}>
        <style>{FONT_STYLE}</style>
        <p style={{ color: "#8D89B0" }}>Yükleniyor…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full h-screen flex items-center justify-center font-body px-4" style={{ backgroundColor: "#14172B" }}>
        <style>{FONT_STYLE}</style>
        <div className="w-full max-w-sm rounded-2xl p-6" style={{ backgroundColor: "#1E2242", border: "1px solid #2A2F55" }}>
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: "#F3F1FA" }}>Glenna</h1>
          <p className="font-body text-sm mb-6" style={{ color: "#8D89B0" }}>
            {mod === "giris" ? "Hesabına giriş yap" : "Yeni hesap oluştur"}
          </p>

          <form onSubmit={gonder} className="flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta"
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none"
              style={{ backgroundColor: "#171B36", color: "#F3F1FA", border: "1px solid #2A2F55" }}
            />
            <input
              type="password"
              required
              minLength={6}
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              placeholder="Şifre (en az 6 karakter)"
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none"
              style={{ backgroundColor: "#171B36", color: "#F3F1FA", border: "1px solid #2A2F55" }}
            />

            {hata && <p className="font-body text-xs" style={{ color: "#FF8F6B" }}>{hata}</p>}
            {bilgi && <p className="font-body text-xs" style={{ color: "#6FD3C7" }}>{bilgi}</p>}

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-2.5 rounded-lg font-body text-sm font-semibold mt-1"
              style={{ backgroundColor: "#9C8FFF", color: "#14172B", opacity: yukleniyor ? 0.6 : 1 }}
            >
              {yukleniyor ? "Bekle…" : mod === "giris" ? "Giriş yap" : "Kayıt ol"}
            </button>
          </form>

          <button
            onClick={() => { setMod(mod === "giris" ? "kayit" : "giris"); setHata(""); setBilgi(""); }}
            className="w-full text-center mt-4 font-body text-xs"
            style={{ color: "#8D89B0" }}
          >
            {mod === "giris" ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
          </button>
        </div>
      </div>
    );
  }

  // Giriş yapılmış: uygulamayı göster, session bilgisini çocuğa iletebilelim
  return children(session, cikisYap);
}
