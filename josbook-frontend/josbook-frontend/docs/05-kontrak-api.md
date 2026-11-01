# Kontrak API Buku Induk JosBook

> **SALINAN. Jangan diubah di sini.** Sumber utama ada di repo backend (`docs/05-kontrak-api.md`). Frontend memegang salinan.
> Kalau ada perubahan, ubah di backend dulu, lalu salin ke frontend, lalu beri tahu satu sama lain.

## Aturan umum

| Hal | Aturan |
|---|---|
| Alamat dasar | `http://127.0.0.1:8000/api` (dev). Diatur frontend di `assets/js/core/config.js`. |
| Header wajib | `Accept: application/json` (tanpa ini validasi gagal menjadi redirect, bukan 422). Untuk JSON: `Content-Type: application/json`. |
| Autentikasi | `Authorization: Bearer <token>` dari `POST /api/login`. Tidak ada cookie/CSRF. |
| Sukses | JSON `{ "data": ... }`. Daftar berpaginasi memakai format bawaan Laravel: `{ data, links, meta }` (`meta.current_page`, `per_page`, `total`, `last_page`). |
| Pesan sukses tanpa data | `{ "message": "..." }` |
| Error validasi | `422 { "message": "...", "errors": { "field": ["pesan"] } }`. Peringatan (boleh simpan tetap) dikirim di `peringatan: []` pada respons sukses, atau 422 dengan `errors` bila ada error. |
| Tidak login / token salah | `401 { "message": "Unauthenticated." }` -> frontend kembali ke halaman login. |
| Peran/Policy menolak | `403 { "message": "..." }` |
| Tidak ditemukan | `404 { "message": "..." }` |
| Terlalu banyak percobaan (login) | `429` |
| Belum dikerjakan | `501 { "message": "Belum diimplementasikan." }` (stub; frontend boleh menampilkannya apa adanya) |
| Unduhan berkas | Tipe **d** di tabel. Karena token ada di header, frontend mengunduh dengan `fetch` lalu blob, bukan `<a href>`. Nama berkas dari header `Content-Disposition` (sudah di-expose CORS). |
| Unggah berkas | `multipart/form-data`. Jangan set `Content-Type` manual dari JS. |
| Tanggal | `YYYY-MM-DD` di JSON. Tampilan Indonesia dibuat frontend. |
| Nilai kosong | `null` = X (tidak diajarkan), bukan 0. Rentang 0-100. |
| Kode kunci | NISN (string 10 digit, nol di depan dipertahankan). `kelas.nama`, `mapel.kode`, `tahun_ajaran.kode` berupa string. |
| Pratinjau import | API tanpa sesi: `import/{jenis}/preview` mengembalikan `token_pratinjau`; `commit` dan `laporan-masalah` mengirim token itu kembali. |

## Peran

`admin`, `guru`, `siswa`. Guru mapel / wali kelas bukan peran terpisah: bedanya ada di `user.guru` (`mapel`, `kelas_ajar`, `wali`) dan dicek Policy di server. Frontend hanya memakainya untuk menyembunyikan menu.

## Daftar endpoint

### PUBLIK

Tanpa token.

| Metode | URL | Controller@aksi | Keterangan |
|---|---|---|---|
| POST | `/api/login` | `LoginController@login` | Login 3 peran. Siswa: username=NISN, password=ddmmyyyy. |

### SEMUA PERAN (login)

Middleware: `auth:sanctum`

| Metode | URL | Controller@aksi | Keterangan |
|---|---|---|---|
| POST | `/api/logout` | `LoginController@logout` | Cabut token yang sedang dipakai. |
| GET | `/api/saya` | `LoginController@saya` | Data akun yang sedang login. Guru: ikut mapel, kelas ajar, kelas wali. |
| PUT | `/api/saya/password` | `LoginController@gantiPassword` | Ganti password (wajib untuk siswa saat login pertama). |

### ADMIN SAJA

Middleware: `role:admin`

| Metode | URL | Controller@aksi | Keterangan |
|---|---|---|---|
| POST | `/api/siswa` | `SiswaController@store` | Form Pendataan: tambah siswa baru. |
| PUT | `/api/siswa/{siswa}` | `SiswaController@update` | Edit biodata + Kontrol Induk. Data seumur hidup berlaku ke semua tahun. |
| DELETE | `/api/siswa/{siswa}` | `SiswaController@destroy` | Hapus lunak ke tempat sampah. |
| POST | `/api/siswa/pindah-kelas` | `SiswaController@pindahKelas` | Pindah kelas massal dalam satu tahun ajaran. |
| POST | `/api/siswa/{siswa}/foto` | `SiswaFotoController@store` | Unggah pas foto 3x4 (multipart, field `foto`). |
| DELETE | `/api/siswa/{siswa}/foto` | `SiswaFotoController@destroy` | Hapus pas foto. |
| GET | `/api/siswa-export` | `SiswaController@export` | Ekspor daftar siswa (xlsx). Query sama dengan siswa.index. |
| GET | `/api/mutasi` | `MutasiController@index` | Riwayat mutasi + siswa aktif yang bisa dimutasi. |
| POST | `/api/mutasi` | `MutasiController@store` | Catat pindah keluar / keluar. |
| GET | `/api/alumni` | `AlumniController@index` | Alumni & Kontrol Induk (lulus, pindah/keluar, semua). |
| GET | `/api/alumni-export` | `AlumniController@export` | Ekspor Kontrol Induk (xlsx). |
| GET | `/api/pelacakan` | `PelacakanAlumniController@index` | Daftar alumni + riwayat pelacakan + ringkasan. |
| POST | `/api/pelacakan/{siswa}` | `PelacakanAlumniController@store` | Tambah catatan kegiatan setelah lulus. |
| DELETE | `/api/pelacakan/{pelacakan}` | `PelacakanAlumniController@destroy` | Hapus catatan pelacakan. |
| GET | `/api/guru` | `GuruController@index` | Daftar guru. |
| GET | `/api/guru/{guru}` | `GuruController@show` | Satu guru (untuk form edit). |
| POST | `/api/guru` | `GuruController@store` | Tambah guru (akun login dibuat dari NIP). |
| PUT | `/api/guru/{guru}` | `GuruController@update` | Ubah guru. |
| DELETE | `/api/guru/{guru}` | `GuruController@destroy` | Hapus guru. |
| GET | `/api/master/kelas` | `MasterKelasController@index` | Master kelas. |
| POST | `/api/master/kelas` | `MasterKelasController@store` | Tambah/ubah kelas (format X-n, XI-n, XII-n). |
| DELETE | `/api/master/kelas/{kelas}` | `MasterKelasController@destroy` | Hapus kelas (ditolak bila masih dipakai). |
| GET | `/api/master/mapel` | `MasterMapelController@index` | Master mapel + kurikulum per tingkat. |
| POST | `/api/master/mapel` | `MasterMapelController@store` | Tambah/ubah mapel. |
| DELETE | `/api/master/mapel/{mapel}` | `MasterMapelController@destroy` | Hapus mapel (ditolak bila sudah dipakai nilai). |
| GET | `/api/laporan` | `LaporanController@index` | Rekap per kelas: jumlah siswa, rata-rata, ketidakhadiran. |
| GET | `/api/laporan/cetak` | `LaporanController@cetak` | Data rekap untuk dicetak frontend. |
| GET | `/api/log` | `LogAktivitasController@index` | Log aktivitas. |
| GET | `/api/log/export` | `LogAktivitasController@export` | Ekspor log (csv). |
| GET | `/api/cek-data` | `CekDataController@index` | Hasil cek kualitas data. |
| GET | `/api/cek-data/export` | `CekDataController@export` | Ekspor hasil cek (csv). |
| POST | `/api/cek-data/perbaiki` | `CekDataController@perbaiki` | Perbaikan otomatis untuk temuan yang aman. |
| GET | `/api/sampah` | `SampahController@index` | Isi tempat sampah. |
| POST | `/api/sampah/{tipe}/{id}/pulihkan` | `SampahController@pulihkan` | Pulihkan data. tipe: siswa|guru|nilai|kehadiran|ekskul. |
| DELETE | `/api/sampah/{tipe}/{id}` | `SampahController@hapusPermanen` | Hapus permanen. |
| GET | `/api/pengaturan` | `PengaturanController@index` | Identitas sekolah, tahun ajaran, semester berjalan, KKTP. |
| PUT | `/api/pengaturan/sekolah` | `PengaturanController@updateSekolah` | Ubah identitas sekolah. |
| POST | `/api/pengaturan/tahun-ajaran` | `PengaturanController@tambahTahunAjaran` | Tambah tahun ajaran (kode 2027/2028). |
| PUT | `/api/pengaturan/berjalan` | `PengaturanController@updateBerjalan` | Tetapkan tahun ajaran + semester berjalan. |
| GET | `/api/cadangan` | `CadanganController@unduh` | Unduh cadangan seluruh data (json). |
| POST | `/api/cadangan/pulihkan` | `CadanganController@pulihkan` | Pulihkan dari berkas cadangan (multipart). |
| POST | `/api/cadangan/reset` | `CadanganController@reset` | Reset ke data contoh (hanya lingkungan demo). |

### ADMIN + GURU

Middleware: `role:admin,guru`

| Metode | URL | Controller@aksi | Keterangan |
|---|---|---|---|
| GET | `/api/dashboard` | `DashboardController@index` | Admin: statistik, komposisi kelas, kelengkapan data. Guru: peran + kelas ajar/wali. |
| GET | `/api/pencarian` | `PencarianController@index` | Pencarian global siswa/guru (bar atas). |
| GET | `/api/siswa` | `SiswaController@index` | Daftar siswa. Pilih kelas dulu. |
| GET | `/api/siswa/{siswa}` | `SiswaController@show` | Biodata, nilai, kehadiran, ekskul, riwayat kelas. Sertakan `izin` (apa saja yang boleh diubah peran ini). |
| POST | `/api/siswa/{siswa}/nilai` | `NilaiController@store` | Tambah nilai satu mapel (Policy). |
| PUT | `/api/nilai/{nilai}` | `NilaiController@update` | Ubah nilai (0-100, kosong=X). |
| DELETE | `/api/nilai/{nilai}` | `NilaiController@destroy` | Hapus nilai. |
| POST | `/api/siswa/{siswa}/kehadiran` | `KehadiranController@store` | Tambah kehadiran + kokurikuler. |
| PUT | `/api/kehadiran/{kehadiran}` | `KehadiranController@update` | Ubah kehadiran. |
| DELETE | `/api/kehadiran/{kehadiran}` | `KehadiranController@destroy` | Hapus kehadiran. |
| POST | `/api/siswa/{siswa}/ekskul` | `EkskulController@store` | Tambah ekskul. |
| PUT | `/api/ekskul/{ekskul}` | `EkskulController@update` | Ubah ekskul. |
| DELETE | `/api/ekskul/{ekskul}` | `EkskulController@destroy` | Hapus ekskul. |
| GET | `/api/nilai/input` | `NilaiController@inputKelas` | Grid nilai per kelas + semester. Guru hanya kolom mapel yang diampu. |
| POST | `/api/nilai/input` | `NilaiController@simpanKelas` | Simpan grid. Kosong = X, bukan 0. |
| POST | `/api/import/{jenis}/preview` | `ImportController@preview` | Unggah Excel, deteksi sheet/kolom, validasi baris. BELUM menyimpan. Hasil disimpan sementara di server (cache) dan diberi `token_pratinjau`. jenis: siswa|nilai|kehadiran|ekskul. |
| POST | `/api/import/{jenis}/commit` | `ImportController@commit` | Simpan baris valid dari pratinjau, lewati yang error. |
| GET | `/api/import/{jenis}/template` | `ImportController@template` | Unduh template Excel. |
| GET | `/api/import/{jenis}/laporan-masalah` | `ImportController@laporanMasalah` | Unduh baris error/peringatan dari satu pratinjau. |
| DELETE | `/api/import/{jenis}/batch` | `ImportController@hapusBatch` | Hapus hasil impor per kelas + semester (admin). |
| GET | `/api/kenaikan-kelas` | `KenaikanKelasController@index` | Kelas yang boleh diproses + riwayat proses terakhir. |
| POST | `/api/kenaikan-kelas/preview` | `KenaikanKelasController@preview` | Pratinjau hasil kenaikan, belum mengubah data. |
| POST | `/api/kenaikan-kelas/proses` | `KenaikanKelasController@proses` | Proses dalam satu transaksi. |
| POST | `/api/kenaikan-kelas/batalkan` | `KenaikanKelasController@batalkan` | Batalkan proses terakhir (ditolak bila sudah ada data di tahun baru). |
| GET | `/api/cetak` | `CetakController@index` | Pilihan cetak: tahun ajaran, semester, jenis isi, kertas. |
| GET | `/api/cetak/siswa/{siswa}` | `CetakController@siswa` | Data dokumen register / laporan capaian satu siswa. Dokumen dibentuk di frontend. |
| GET | `/api/cetak/sampul/{kelas}` | `CetakController@sampul` | Data sampul buku induk satu kelas. |

### SISWA (portal)

Middleware: `role:siswa`

| Metode | URL | Controller@aksi | Keterangan |
|---|---|---|---|
| GET | `/api/portal` | `PortalSiswaController@beranda` | Beranda siswa. |
| GET | `/api/portal/biodata` | `PortalSiswaController@biodata` | Biodata diri sendiri. |
| GET | `/api/portal/nilai` | `PortalSiswaController@nilai` | Nilai; hanya tahun/semester yang sudah berjalan. |
| GET | `/api/portal/unduh` | `PortalSiswaController@unduh` | Data dokumen diri sendiri untuk dicetak frontend. |

## Detail request dan respons

Nama field final mengikuti `app/Http/Resources` dan `app/Http/Requests`. Ringkasan di bawah adalah kesepakatan awal; kalau berubah, perbarui tabel ini.

| Nama rute | Request | Respons |
|---|---|---|
| `auth.login` | {peran:'admin\|guru\|siswa', username, password} | {data:{token, user:{id,nama,username,peran,wajib_ganti,guru?,siswa_id?}}} |
| `auth.logout` | - | {message} |
| `auth.saya` | - | {data:user} |
| `auth.password` | {password_lama, password, password_confirmation} | {message} |
| `siswa.store` | {...biodata A-I} | 201 {data:siswa, peringatan:[]} |
| `siswa.update` | {...biodata, simpan_tetap?:bool} | {data:siswa, peringatan:[]} |
| `siswa.destroy` | - | {message} |
| `siswa.pindah-kelas` | {siswa_ids:[], kelas_tujuan} | {message, jumlah} |
| `siswa.foto.store` | multipart: foto | {data:{foto_url}} |
| `siswa.foto.destroy` | - | {message} |
| `siswa.export` | query: kelas, q, status | berkas xlsx |
| `mutasi.index` | - | {data:{aktif:[], riwayat:[]}} |
| `mutasi.store` | {siswa_id, jenis, tujuan, tanggal} | 201 {data:siswa} |
| `alumni.index` | query: jenis, tahun, q, page | paginasi {data, links, meta} |
| `alumni.export` | query: jenis, tahun | berkas xlsx |
| `pelacakan.index` | query: tahun, page | paginasi + {ringkasan} |
| `pelacakan.store` | {jenis, keterangan, tahun} | 201 {data} |
| `pelacakan.destroy` | - | {message} |
| `guru.index` | query: q, page | paginasi |
| `guru.show` | - | {data:guru} |
| `guru.store` | {nama, nip, ..., mapel:[], kelas_ajar:[], wali?} | 201 {data:guru} |
| `guru.update` | sama dengan store | {data:guru} |
| `guru.destroy` | - | {message} |
| `master.kelas.index` | - | {data:[kelas]} |
| `master.kelas.store` | {nama, wali?} | 201 {data:kelas} |
| `master.kelas.destroy` | - | {message} |
| `master.mapel.index` | - | {data:[mapel]} |
| `master.mapel.store` | {kode, nama, kelompok, tingkat:[]} | 201 {data:mapel} |
| `master.mapel.destroy` | - | {message} |
| `laporan.index` | query: tahun_ajaran | {data:[baris]} |
| `laporan.cetak` | query: tahun_ajaran | {data:{...}} |
| `log.index` | query: peran, q, page | paginasi |
| `log.export` | query: peran, q | berkas csv |
| `cek-data.index` | query: jenis, page | paginasi + {ringkasan} |
| `cek-data.export` | query: jenis | berkas csv |
| `cek-data.perbaiki` | {jenis, ids?:[]} | {message, jumlah} |
| `sampah.index` | - | {data:[{tipe,id,label,dihapus}]} |
| `sampah.pulihkan` | - | {message} |
| `sampah.hapus` | - | {message} |
| `pengaturan.index` | - | {data:{sekolah, tahun_ajaran:[], berjalan}} |
| `pengaturan.sekolah` | {nama, npsn, alamat, kepsek, ...} | {data:sekolah} |
| `pengaturan.tahun-ajaran` | {kode} | 201 {data} |
| `pengaturan.berjalan` | {tahun_ajaran, semester} | {data} |
| `cadangan.unduh` | - | berkas json |
| `cadangan.pulihkan` | multipart: berkas | {message} |
| `cadangan.reset` | {konfirmasi:'RESET'} | {message} |
| `dashboard` | - | {data:{...}} |
| `pencarian` | query: q | {data:{siswa:[], guru:[]}} |
| `siswa.index` | query: kelas, q, status, per_page, page | paginasi |
| `siswa.show` | - | {data:siswa+izin} |
| `nilai.store` | {tahun_ajaran, semester, mapel, nilai\|null} | 201 {data} |
| `nilai.update` | {nilai\|null} | {data} |
| `nilai.destroy` | - | {message} |
| `kehadiran.store` | {tahun_ajaran, semester, sakit, izin, alpa, kokurikuler?} | 201 {data} |
| `kehadiran.update` | sama dengan store | {data} |
| `kehadiran.destroy` | - | {message} |
| `ekskul.store` | {tahun_ajaran, semester, kegiatan, predikat} | 201 {data} |
| `ekskul.update` | sama dengan store | {data} |
| `ekskul.destroy` | - | {message} |
| `nilai.input` | query: kelas, semester | {data:{mapel:[], siswa:[{id,nama,nisn,nilai:{kode:angka\|null}}]}} |
| `nilai.input.simpan` | {kelas, semester, baris:[{siswa_id, nilai:{kode:angka\|null}}]} | {message, jumlah} |
| `import.preview` | multipart: berkas, mode(kelas\|semua), kelas?, semester?, duplikat?(lewati\|timpa) | {data:{token_pratinjau, deteksi, ringkasan, baris:[], kelas_baru:[], mapel_baru:[]}} |
| `import.commit` | {token_pratinjau} | {message, berhasil, dilewati} |
| `import.template` | - | berkas xlsx |
| `import.laporan-masalah` | query: token_pratinjau | berkas csv |
| `import.batch.hapus` | {kelas, semester} | {message} |
| `kenaikan.index` | - | {data:{kelas:[], terakhir:{...}\|null}} |
| `kenaikan.preview` | {kelas_asal, keputusan?:{siswa_id:'naik\|tinggal\|lulus'}} | {data:{tahun_tujuan, baris:[]}} |
| `kenaikan.proses` | {kelas_asal, keputusan:{}, kelas_tujuan:{}} | {message, log_id} |
| `kenaikan.batalkan` | {log_id} | {message} |
| `cetak.index` | - | {data:{tahun_ajaran:[], semester:[], isi:[], kertas:[]}} |
| `cetak.siswa` | query: isi, tahun_ajaran, semester | {data:{sekolah, siswa, bagian:{...}}} |
| `cetak.sampul` | query: tahun_ajaran | {data:{sekolah, kelas, siswa:[]}} |
| `portal.beranda` | - | {data:{siswa, berjalan}} |
| `portal.biodata` | - | {data:siswa} |
| `portal.nilai` | query: tahun_ajaran, semester | {data:{...}} |
| `portal.unduh` | query: isi | {data:{sekolah, siswa, bagian}} |

## Contoh

```http
POST /api/login
Accept: application/json
Content-Type: application/json

{"peran":"admin","username":"admin","password":"..."}
```

```json
{ "data": { "token": "1|abc...", "user": { "id": 1, "nama": "Admin Sekolah", "username": "admin", "peran": "admin", "wajib_ganti": false } } }
```

```json
// 422
{ "message": "NISN harus 10 digit.", "errors": { "nisn": ["NISN harus 10 digit."] } }
```
