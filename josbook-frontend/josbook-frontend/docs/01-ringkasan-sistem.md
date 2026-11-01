> Salinan dari repo backend. Bagian "Peta menu" menunjuk halaman di repo ini.

# Ringkasan sistem (dari prototype)

## Peran
| Peran | Cakupan |
|---|---|
| Admin | Semua menu. Satu-satunya yang boleh mengubah biodata dan Kontrol Induk, menambah siswa, mutasi, hapus/pulihkan, kelola guru, setting. |
| Guru mapel | Lihat semua siswa. Input/impor nilai hanya mapel dan kelas yang diampu. |
| Wali kelas | Kehadiran, kokurikuler, ekskul, dan kenaikan kelas untuk kelasnya. Satu guru boleh merangkap mapel dan wali. |
| Siswa | Lihat dan unduh data diri sendiri (portal HP). Semester yang belum berjalan terkunci. |

## Hak akses
| Fitur | Admin | Guru mapel | Wali kelas | Siswa |
|---|---|---|---|---|
| Lihat daftar & biodata siswa | semua | semua | semua | diri sendiri |
| Tambah siswa / edit biodata + Kontrol Induk | ✔ | ✘ | ✘ | ✘ |
| Edit nilai | semua | kelas ajar, kolom mapelnya | ✘ | ✘ |
| Edit kehadiran, kokurikuler, ekskul | semua | ✘ | kelasnya | ✘ |
| Import siswa | ✔ | ✘ | ✘ | ✘ |
| Import nilai | ✔ | kelas ajar | ✘ | ✘ |
| Import kehadiran / ekskul | ✔ | ✘ | kelasnya | ✘ |
| Kenaikan kelas + batalkan terakhir | semua kelas | ✘ | kelasnya | ✘ |
| Mutasi, Alumni, Hapus/pulihkan, Guru, Laporan, Log, Setting, Master, Pelacakan, Cek data | ✔ | ✘ | ✘ | ✘ |
| Unduh PDF | ✔ | ✔ | ✔ | diri sendiri |

## Alur utama
1. Admin mengatur Setting, Master Kelas/Mapel, Data Guru.
2. Data siswa masuk lewat Form Pendataan atau Import Excel.
3. Guru mapel mengisi nilai; wali kelas mengisi kehadiran, kokurikuler, ekskul.
4. Akhir tahun: Kenaikan Kelas (X -> XI -> XII -> Lulus), bisa dibatalkan.
5. Lulusan masuk Alumni & Kontrol Induk, lalu Pelacakan Alumni.
6. Cetak register A-I, laporan capaian, dan sampul kelas kapan saja.

## Aturan bisnis yang paling sering terlupa
- **NISN** kunci unik satu orang (10 digit). **Nomor induk** juga unik. Ganti NISN harus ikut memindahkan nilai, kehadiran, ekskul.
- **Seumur hidup vs per tahun.** Biodata, registrasi, kelulusan berlaku di semua tahun ajaran (tabel `siswa`). Hanya kelas, status, kelas tujuan, keputusan naik, tanggal naik, dan wali kelas yang per tahun (tabel `riwayat_kelas`).
- **Nilai kosong = "X"** (tidak diajarkan), bukan 0, dan tidak masuk rata-rata. Rentang 0-100. Mapel yang tampil mengikuti kurikulum tiap tingkat.
- **Satu baris per tahun ajaran** untuk siswa; nilai unik per (siswa, tahun, semester, mapel); kehadiran unik per (siswa, tahun, semester); ekskul unik per (siswa, tahun, semester, kegiatan).
- **Kenaikan kelas:** hanya XII yang bisa Lulus; siswa yang sudah ada di tahun tujuan dilewati; pembatalan hanya mengembalikan perubahan dari proses itu dan ditolak bila sudah ada nilai/kehadiran/ekskul di tahun baru.
- **Hapus = soft delete** ke tempat sampah, bisa dipulihkan.
- **Kontrol Induk bukan tabel terpisah**, melainkan tampilan dari data siswa (filter Lulus / Pindah-Keluar / Semua).
- **Validasi:** error harus diperbaiki, peringatan boleh "simpan tetap".

## Peta menu -> endpoint -> controller -> halaman frontend

Tampilan ada di repo **frontend** (HTML/CSS/JS native). Daftar lengkap URL ada di `05-kontrak-api.md`.

| Halaman frontend | Nama rute API | Controller |
|---|---|---|
| Login (`index.html`) | `auth.login` | `LoginController` |
| Dashboard (`pages/admin/dashboard.html`) | `dashboard`, `pencarian` | `DashboardController`, `PencarianController` |
| Data Guru (`pages/admin/guru.html`) | `guru.index`, `guru.show`, `guru.store`, `guru.update`, `guru.destroy` | `GuruController` |
| Master Kelas & Mapel (`pages/admin/master.html`) | `master.kelas.index`, `master.kelas.store`, `master.kelas.destroy`, `master.mapel.index`, `master.mapel.store`, `master.mapel.destroy` | `MasterKelasController`, `MasterMapelController` |
| Setting & Cadangan (`pages/admin/pengaturan.html`) | `pengaturan.index`, `pengaturan.sekolah`, `pengaturan.tahun-ajaran`, `pengaturan.berjalan`, `cadangan.unduh`, `cadangan.pulihkan` ... | `CadanganController`, `PengaturanController` |
| Log Aktivitas (`pages/admin/log.html`) | `log.index`, `log.export` | `LogAktivitasController` |
| Tempat Sampah (`pages/admin/sampah.html`) | `sampah.index`, `sampah.pulihkan`, `sampah.hapus` | `SampahController` |
| Cek Kualitas Data (`pages/admin/cek-data.html`) | `cek-data.index`, `cek-data.export`, `cek-data.perbaiki` | `CekDataController` |
| Laporan & Statistik (`pages/admin/laporan.html`) | `laporan.index`, `laporan.cetak` | `LaporanController` |
| Mutasi Siswa (`pages/admin/mutasi.html`) | `mutasi.index`, `mutasi.store` | `MutasiController` |
| Alumni & Kontrol Induk (`pages/admin/alumni.html`) | `alumni.index`, `alumni.export` | `AlumniController` |
| Pelacakan Alumni (`pages/admin/pelacakan.html`) | `pelacakan.index`, `pelacakan.store`, `pelacakan.destroy` | `PelacakanAlumniController` |
| Beranda Guru (`pages/guru/beranda.html`) | `dashboard`, `pencarian` | `DashboardController`, `PencarianController` |
| Input Nilai Mapel (`pages/guru/input-nilai.html`) | `nilai.input`, `nilai.input.simpan` | `NilaiController` |
| Data Siswa (`pages/shared/siswa.html`) | `siswa.pindah-kelas`, `siswa.export`, `siswa.index` | `SiswaController` |
| Detail & Editor Siswa (`pages/shared/siswa-detail.html`) | `siswa.update`, `siswa.destroy`, `siswa.foto.store`, `siswa.foto.destroy`, `siswa.show`, `nilai.store` ... | `EkskulController`, `KehadiranController`, `NilaiController`, `SiswaController`, `SiswaFotoController` |
| Form Pendataan Siswa Baru (`pages/shared/siswa-baru.html`) | `siswa.store` | `SiswaController` |
| Import Data (`pages/shared/import.html`) | `import.preview`, `import.commit`, `import.template`, `import.laporan-masalah`, `import.batch.hapus` | `ImportController` |
| Kenaikan Kelas (`pages/shared/kenaikan-kelas.html`) | `kenaikan.index`, `kenaikan.preview`, `kenaikan.proses`, `kenaikan.batalkan` | `KenaikanKelasController` |
| Cetak Dokumen (`pages/shared/cetak.html`) | `cetak.index`, `cetak.siswa`, `cetak.sampul` | `CetakController` |
| Ganti Password (`pages/shared/ganti-password.html`) | `auth.password` | `LoginController` |
| Beranda Siswa (`pages/portal/beranda.html`) | `portal.beranda` | `PortalSiswaController` |
| Biodata Saya (`pages/portal/biodata.html`) | `portal.biodata` | `PortalSiswaController` |
| Nilai Saya (`pages/portal/nilai.html`) | `portal.nilai` | `PortalSiswaController` |
| Unduh Dokumen (`pages/portal/unduh.html`) | `portal.unduh` | `PortalSiswaController` |

Halaman "Spesifikasi" di prototype sengaja tidak dijadikan fitur aplikasi; isinya sudah menjadi dokumen ini dan skema migrasi.
