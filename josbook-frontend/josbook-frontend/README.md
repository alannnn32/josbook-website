# Buku Induk JosBook: Frontend (HTML/CSS/JS native)

Tampilan untuk sistem Buku Induk / e-raport SMA Negeri 1 Rejoso. **Tanpa framework dan tanpa build.**
Data diambil dari API Laravel di repo terpisah `josbook-backend`.

> **Status:** kerangka. Sudah berfungsi: layout (sidebar/topbar/portal HP), login, penjaga halaman per peran, ganti password,
> helper API (token, 401/403/422, unduhan berkas), toast. Isi tiap halaman masih `TODO` (lihat `assets/js/modules/`).

## Menjalankan
1. Jalankan backend: `php artisan serve` (default `http://127.0.0.1:8000`).
2. Buka folder ini di VS Code, pasang ekstensi **Live Server**, klik kanan `index.html` -> *Open with Live Server*.
   Alamat harus `http://127.0.0.1:5500` atau `http://localhost:5500` (sudah diizinkan backend lewat `FRONTEND_URL`).
3. Bila API ada di alamat lain, ubah `API_BASE` di `assets/js/core/config.js`.

Jangan membuka berkas dengan klik ganda (`file://`): browser akan memblokir permintaan ke API.

## Struktur
```
josbook-frontend/
├── index.html                    login
├── pages/
│   ├── admin/                    dashboard, guru, master, pengaturan, log, sampah, cek-data, laporan, mutasi, alumni, pelacakan
│   ├── guru/                     beranda, input-nilai
│   ├── portal/                   beranda, biodata, nilai, unduh   (siswa, tampilan HP)
│   └── shared/                   siswa, siswa-detail, siswa-baru, import, kenaikan-kelas, cetak, ganti-password
├── assets/
│   ├── css/                      app.css, cetak.css
│   ├── js/core/                  config, auth, api, guard, ui
│   ├── js/modules/               satu berkas per halaman
│   └── img/
└── docs/                         kontrak API (salinan), peta halaman, prototype
```

## Cara membuat sebuah halaman
Setiap halaman memuat 5 berkas `core` lalu satu modul. Modul diawali:
```js
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var hasil = await api.get('/guru', { page: 1 });
  document.getElementById('isi').innerHTML = UI.tabel(['Nama', 'NIP'], hasil.data.map(function (g) {
    return [UI.esc(g.nama), UI.esc(g.nip)];
  }));
});
```
`Halaman.mulai` memeriksa token dan peran, memasang menu, lalu menjalankan fungsi Anda. Error API otomatis ditampilkan.

## Aturan kerja bersama
- Satu fitur = satu branch, gabung lewat Pull Request.
- **Kontrak API** ada di `docs/05-kontrak-api.md` (salinan). Jangan mengubahnya di sini; minta backend mengubah sumbernya.
- Semua data dari server yang masuk ke `innerHTML` harus lewat `UI.esc()`.
- Semua panggilan jaringan lewat `api.js`.
- Pengecekan peran di frontend hanya untuk menyembunyikan menu; keamanan ada di backend.
