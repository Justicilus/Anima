import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Manrope', sans-serif; }
`;

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen font-body px-5 py-10" style={{ backgroundColor: "#14172B" }}>
      <style>{FONT_STYLE}</style>
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 font-body text-sm" style={{ color: "#8D89B0" }}>
          <ArrowLeft size={16} /> Glenna'ya dön
        </Link>

        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "#F3F1FA" }}>Gizlilik Politikası</h1>
        <p className="font-body text-sm mb-8" style={{ color: "#6B6890" }}>Son güncelleme: Eylül 2026</p>

        <div className="flex flex-col gap-6 font-body text-sm leading-relaxed" style={{ color: "#C9C5E8" }}>
          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>1. Hangi verileri topluyoruz</h2>
            <p>
              Glenna'ya kayıt olduğunda e-posta adresini ve şifreni (şifreli olarak) alırız.
              Profilinde paylaştığın bilgiler (isim, bio, sınıf), oluşturduğun mesajlar,
              topluluklar ve kanallar da hesabınla ilişkilendirilerek saklanır.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>2. Verilerini nasıl kullanıyoruz</h2>
            <p>
              Verilerin yalnızca Glenna'nın temel işlevlerini (giriş yapma, profilini
              gösterme, mesajlaşma, topluluklara katılma) sağlamak için kullanılır.
              Verilerini üçüncü taraflara satmayız veya reklam amacıyla paylaşmayız.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>3. Veri saklama</h2>
            <p>
              Verilerin Supabase altyapısında güvenli şekilde saklanır. Hesabını
              sildiğinde, ilişkili verilerin de kalıcı olarak silinir.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>4. Haklarım</h2>
            <p>
              Verilerine her zaman erişme, düzeltme ve silinmesini talep etme hakkına
              sahipsin. Sorularınız için bize ulaşabilirsin.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg mb-2" style={{ color: "#F3F1FA" }}>5. Değişiklikler</h2>
            <p>
              Bu politika zaman zaman güncellenebilir. Önemli değişikliklerde seni
              bilgilendireceğiz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
