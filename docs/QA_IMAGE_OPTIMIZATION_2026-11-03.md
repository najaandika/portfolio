# Addendum Final QA — Optimasi Aset Proyek

**Tanggal:** 3 November 2026\
**Workspace:** `D:\projects\portfolio\portfolio-react`\
**Status:** Pengujian lokal selesai; belum di-commit, di-push, atau di-deploy.

## Optimasi WebP

Empat gambar mockup PNG dikonversi menjadi WebP berkualitas 94. PNG asli tidak dihapus, dan path pada `src/data/projectMeta.js` diarahkan ke aset baru.

| Aset | PNG awal | WebP baru | Penghematan |
| --- | ---: | ---: | ---: |
| Fashion App | 1.059.306 B | 54.036 B | 94,9% |
| BHD Hero | 799.147 B | 84.578 B | 89,4% |
| Parcel App | 397.327 B | 52.118 B | 86,9% |
| POS | 336.757 B | 74.372 B | 77,9% |
| **Total** | **2.592.537 B** | **265.104 B** | **89,8% (2.327.433 B)** |

Perbandingan pixel setelah decoding menunjukkan rerata perubahan RGB di bawah satu tingkat dari 255, dan alpha tidak berubah.

## Verifikasi

- `npm run build`: lolos, Vite v8.3.5.
- `npm run lint`: 0 error, 0 warning.
- Chromium headless pada lebar 1280, 390 dan 320 piksel: semua empat WebP dikirim dengan HTTP 200, `image/webp`, ukuran benar, label alternatif tetap ada, enam kartu tetap muncul, tidak ada overflow atau error konsol.
- Pemeriksaan axe-core setelah koreksi accessible name EN/ID, GitHub dan WhatsApp: 0 pelanggaran otomatis WCAG 2.1 AA/best-practice pada desktop dan mobile EN/ID serta menu terbuka.
- Lighthouse di server statis `dist/` pada satu pengujian dengan simulasi mobile: **Performance 68, Accessibility 100, Best Practices 100, SEO 100**. Hasil ini adalah simulasi laboratorium dan dapat berbeda dari run lain. LCP sekitar 5,2 dtk pada run tersebut; optimasi mobile lanjutan perlu diukur berulang secara konsisten sebelum mengubah animasi atau desain.
- Eksperimen mempersingkat animasi foto hero **dikembalikan ke semula** karena tidak menghasilkan peningkatan performa yang konsisten.

## Batas audit dan langkah rilis

Pengujian axe otomatis bukan pengganti pengujian screen reader nyata. Lighthouse lokal bukan data pengalaman pengguna sebenarnya (CrUX/INP). Setelah siap rilis, tinjau keseluruhan diff, commit/push, audit ulang domain Vercel dan validasi tautan pihak ketiga secara manual. Jangan menganggap perubahan ini sudah online.
