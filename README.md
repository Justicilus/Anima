# Anima — yerel kurulum

Bu klasör, Claude'da tasarladığımız Anima arayüzünün gerçek bir React projesine
dönüştürülmüş hali. Şu an hâlâ sahte (demo) veri kullanıyor; gerçek kullanıcı
girişi ve veritabanı yok — bir sonraki adım o.

## Çalıştırmak için

1. [Node.js](https://nodejs.org) kurulu olmalı (18 veya üzeri).
2. Bu klasörde bir terminal aç.
3. Bağımlılıkları kur:
   ```
   npm install
   ```
4. Geliştirme sunucusunu başlat:
   ```
   npm run dev
   ```
5. Terminalde çıkan adresi (genelde `http://localhost:5173`) tarayıcıda aç.

Kod değiştirdikçe sayfa otomatik yenilenir.

## Klasör yapısı

```
anima-proje/
├── index.html          giriş HTML dosyası
├── package.json        bağımlılıklar ve komutlar
├── tailwind.config.js  Tailwind ayarları
├── vite.config.js      Vite ayarları
└── src/
    ├── main.jsx         React'i başlatan dosya
    ├── App.jsx           ← Anima'nın tüm arayüzü burada
    └── index.css         Tailwind temel dosyası
```

## Sırada ne var

Bu proje şu an tamamen ön yüz (frontend). Gerçek bir uygulama olması için:

1. **Supabase hesabı aç** (ücretsiz) → [supabase.com](https://supabase.com)
   - Kullanıcı girişi (email/şifre veya Google ile giriş) buradan gelir.
   - Postgres veritabanı da otomatik kurulur.
2. `npm install @supabase/supabase-js` ile istemciyi projeye ekle.
3. `src/App.jsx` içindeki sabit veri dizilerini (SUNUCULAR, KANAL_YAPISI, DM_BASLANGIC vb.)
   Supabase'den çekilen gerçek verilerle değiştir.
4. Mesajlaşmanın anlık akması için Supabase Realtime kanallarına abone ol.
5. Hazır olunca [vercel.com](https://vercel.com) üzerinden bu klasörü GitHub'a
   bağlayıp tek tıkla yayına al.

Bu adımların her birinde Claude Code ile birlikte, dosya dosya ilerleyerek
devam edebiliriz.
