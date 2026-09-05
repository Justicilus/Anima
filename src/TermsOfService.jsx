import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Manrope', sans-serif; }
`;

export default function TermsOfService() {
  return (
    <div className="min-h-screen font-body px-5 py-10" style={{ backgroundColor: "#14172B" }}>
      <style>{FONT_STYLE}</style>
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 font-body text-sm" style={{ color: "#8D89B0" }}>
          <ArrowLeft size={16} /> Glenna'ya dön
        </Link>

        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "#F3F1FA" }}>Kullanım Şartları</h1>
        <p className="font-body text-sm mb-8" style={{ color: "#6B6890" }}>Son güncelleme: Eylül 2026</p>

        <div className="flex flex-col gap-6 font-body text-sm leading-relaxed" style={{ color: "#C9C5E8" }}>
          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>1. Kabul</h2>
            <p>
              Glenna'yı kullanarak bu şartları kabul etmiş olursun. Kabul etmiyorsan
              lütfen uygulamayı kullanma.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>2. Hesap sorumluluğu</h2>
            <p>
              Hesabının güvenliğinden sen sorumlusun. Şifreni kimseyle paylaşma.
              Hesabınla yapılan tüm işlemlerden sen sorumlu tutulursun.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>3. Kabul edilebilir kullanım</h2>
            <p>
              Glenna'yı başkalarını taciz etmek, yanıltıcı bilgi yaymak, yasa dışı
              içerik paylaşmak veya başkalarının haklarını ihlal etmek için
              kullanamazsın. Bu kurallara uymayan hesaplar askıya alınabilir.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>4. İçerik</h2>
            <p>
              Paylaştığın mesaj ve içeriklerin sorumluluğu sana aittir. Topluluk
              kurallarına aykırı içerikler kaldırılabilir.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>5. Hizmetin değişmesi</h2>
            <p>
              Glenna gelişmeye devam eden bir uygulamadır; özellikler zaman içinde
              değişebilir, eklenebilir veya kaldırılabilir.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>6. İletişim</h2>
            <p>Sorularınız için bize ulaşabilirsin.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
