# Urutan pengerjaan frontend

Mengikuti fase di `docs/prototype` (Spesifikasi > Rencana eksekusi). Backend mengerjakan endpoint; frontend menyambungnya.
Selama endpoint belum jadi, API mengembalikan **501**; `api.js` meneruskannya sebagai `ApiError` dan halaman menampilkan pesannya.

| Fase | Isi frontend | Berkas utama | Butuh endpoint |
|---|---|---|---|
| 0 Fondasi | Layout, login, penjaga halaman, toast, helper API (**sudah ada**) | `assets/js/core/*`, `index.html` | `auth.login`, `auth.saya` |
| 1 Master | Data Guru, Master Kelas/Mapel, Setting | `modules/guru.js`, `master.js`, `pengaturan.js` | `guru.*`, `master.*`, `pengaturan.*` |
| 2 Siswa | Daftar + cari + paginasi, Form Pendataan, editor tab A-I, foto, sampah | `modules/siswa.js`, `siswa-detail.js`, `siswa-baru.js`, `sampah.js` | `siswa.*`, `sampah.*` |
| 3 Akademik | Grid nilai guru, import dengan pratinjau | `modules/input-nilai.js`, `import.js` | `nilai.*`, `kehadiran.*`, `ekskul.*`, `import.*` |
| 4 Akhir tahun | Kenaikan kelas (pratinjau, proses, batalkan), mutasi, alumni, pelacakan | `modules/kenaikan-kelas.js`, `mutasi.js`, `alumni.js`, `pelacakan.js` | `kenaikan.*`, `mutasi.*`, `alumni.*`, `pelacakan.*` |
| 5 Cetak + portal | Register A-I, laporan capaian, sampul (F4/A4); portal siswa HP | `modules/cetak.js`, `portal-*.js`, `assets/css/cetak.css` | `cetak.*`, `portal.*` |
| 6 Uji | Uji tiap peran dengan data nyata, perapian | semua | semua |

Usulan jalur (4 orang), sejajar dengan jalur backend: A fondasi + master, B siswa, C akademik + import, D akhir tahun + cetak + portal.

## Prinsip
- Satu halaman = satu berkas HTML + satu modul JS dengan nama sama.
- Semua panggilan jaringan lewat `api.js`. Jangan `fetch` langsung di modul.
- Cek peran di frontend hanya menyembunyikan menu. Jangan anggap itu pengamanan.
- Kode cetak di prototype (`pdfShow`, `reg`, `lap`, `cover`) bisa dipindah ke `modules/cetak.js`; datanya kini dari `GET /cetak/siswa/{id}`.
