# Peta halaman -> endpoint

| Berkas | Peran | Endpoint (nama rute) |
|---|---|---|
| `index.html` (Login) | publik | `POST /login` |
| `pages/admin/dashboard.html` (Dashboard) | admin | `GET /dashboard`, `GET /pencarian` |
| `pages/admin/guru.html` (Data Guru) | admin | `GET /guru`, `GET /guru/{guru}`, `POST /guru`, `PUT /guru/{guru}`, `DELETE /guru/{guru}` |
| `pages/admin/master.html` (Master Kelas & Mapel) | admin | `GET /master/kelas`, `POST /master/kelas`, `DELETE /master/kelas/{kelas}`, `GET /master/mapel`, `POST /master/mapel`, `DELETE /master/mapel/{mapel}` |
| `pages/admin/pengaturan.html` (Setting & Cadangan) | admin | `GET /pengaturan`, `PUT /pengaturan/sekolah`, `POST /pengaturan/tahun-ajaran`, `PUT /pengaturan/berjalan`, `GET /cadangan`, `POST /cadangan/pulihkan`, `POST /cadangan/reset` |
| `pages/admin/log.html` (Log Aktivitas) | admin | `GET /log`, `GET /log/export` |
| `pages/admin/sampah.html` (Tempat Sampah) | admin | `GET /sampah`, `POST /sampah/{tipe}/{id}/pulihkan`, `DELETE /sampah/{tipe}/{id}` |
| `pages/admin/cek-data.html` (Cek Kualitas Data) | admin | `GET /cek-data`, `GET /cek-data/export`, `POST /cek-data/perbaiki` |
| `pages/admin/laporan.html` (Laporan & Statistik) | admin | `GET /laporan`, `GET /laporan/cetak` |
| `pages/admin/mutasi.html` (Mutasi Siswa) | admin | `GET /mutasi`, `POST /mutasi` |
| `pages/admin/alumni.html` (Alumni & Kontrol Induk) | admin | `GET /alumni`, `GET /alumni-export` |
| `pages/admin/pelacakan.html` (Pelacakan Alumni) | admin | `GET /pelacakan`, `POST /pelacakan/{siswa}`, `DELETE /pelacakan/{pelacakan}` |
| `pages/guru/beranda.html` (Beranda Guru) | guru | `GET /dashboard`, `GET /pencarian` |
| `pages/guru/input-nilai.html` (Input Nilai Mapel) | guru | `GET /nilai/input`, `POST /nilai/input` |
| `pages/shared/siswa.html` (Data Siswa) | admin, guru | `POST /siswa/pindah-kelas`, `GET /siswa-export`, `GET /siswa` |
| `pages/shared/siswa-detail.html` (Detail & Editor Siswa) | admin, guru | `PUT /siswa/{siswa}`, `DELETE /siswa/{siswa}`, `POST /siswa/{siswa}/foto`, `DELETE /siswa/{siswa}/foto`, `GET /siswa/{siswa}`, `POST /siswa/{siswa}/nilai`, `PUT /nilai/{nilai}`, `DELETE /nilai/{nilai}`, `POST /siswa/{siswa}/kehadiran`, `PUT /kehadiran/{kehadiran}`, `DELETE /kehadiran/{kehadiran}`, `POST /siswa/{siswa}/ekskul`, `PUT /ekskul/{ekskul}`, `DELETE /ekskul/{ekskul}` |
| `pages/shared/siswa-baru.html` (Form Pendataan Siswa Baru) | admin | `POST /siswa` |
| `pages/shared/import.html` (Import Data) | admin, guru | `POST /import/{jenis}/preview`, `POST /import/{jenis}/commit`, `GET /import/{jenis}/template`, `GET /import/{jenis}/laporan-masalah`, `DELETE /import/{jenis}/batch` |
| `pages/shared/kenaikan-kelas.html` (Kenaikan Kelas) | admin, guru | `GET /kenaikan-kelas`, `POST /kenaikan-kelas/preview`, `POST /kenaikan-kelas/proses`, `POST /kenaikan-kelas/batalkan` |
| `pages/shared/cetak.html` (Cetak Dokumen) | admin, guru | `GET /cetak`, `GET /cetak/siswa/{siswa}`, `GET /cetak/sampul/{kelas}` |
| `pages/shared/ganti-password.html` (Ganti Password) | admin, guru, siswa | `PUT /saya/password` |
| `pages/portal/beranda.html` (Beranda Siswa) | siswa | `GET /portal` |
| `pages/portal/biodata.html` (Biodata Saya) | siswa | `GET /portal/biodata` |
| `pages/portal/nilai.html` (Nilai Saya) | siswa | `GET /portal/nilai` |
| `pages/portal/unduh.html` (Unduh Dokumen) | siswa | `GET /portal/unduh` |
