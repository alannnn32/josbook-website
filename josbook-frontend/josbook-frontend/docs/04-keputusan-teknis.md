# Keputusan teknis frontend

| Hal | Keputusan | Alasan |
|---|---|---|
| Teknologi | HTML + CSS + JavaScript native, tanpa framework dan tanpa langkah build | Sama dengan prototype; mudah dijalankan kelompok. |
| Struktur | Banyak halaman (multi-page), bukan SPA | Satu halaman = satu berkas; mudah dibagi antar anggota. |
| Menjalankan | Live Server (VS Code) di `http://127.0.0.1:5500` | Harus sama dengan `FRONTEND_URL` di backend (CORS). Jangan buka lewat `file://`. |
| Token | `sessionStorage`; `localStorage` bila "Ingat saya" | Frontend native tanpa cookie/CSRF. Risiko XSS: **selalu `UI.esc()` sebelum memasukkan data ke innerHTML.** |
| Alamat API | `assets/js/core/config.js` -> `API_BASE` | Satu tempat untuk diubah. |
| Header | `Accept: application/json` selalu dikirim oleh `api.js` | Tanpa itu Laravel membalas redirect HTML, bukan 422/401. |
| Error | `ApiError{status,message,errors}`; 401 -> login, 403 -> toast, 422 -> `UI.tampilkanError(form, e.errors)` | Seragam di semua halaman. |
| Unduhan | `api.unduh()` (fetch + blob) | Token tidak bisa dikirim lewat `<a href>`. |
| Cetak | Dokumen dibentuk di frontend dari data JSON; `window.print()` + `cetak.css` | Hasil sama dengan prototype. |
| Menu | Disusun `ui.js` dari peran dan `user.guru.{mapel, wali}` | Satu guru bisa merangkap mapel dan wali. |
| Font | Plus Jakarta Sans bila tersedia, fallback `system-ui` | Seperti prototype; tanpa unduhan tambahan. |
