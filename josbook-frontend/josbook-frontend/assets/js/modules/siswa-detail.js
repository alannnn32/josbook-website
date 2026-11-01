/* Detail & Editor Siswa
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   PUT    /siswa/{siswa}  (siswa.update, JSON) Edit biodata + Kontrol Induk. Data seumur hidup berlaku ke semua tahun.
   DELETE /siswa/{siswa}  (siswa.destroy, JSON) Hapus lunak ke tempat sampah.
   POST   /siswa/{siswa}/foto  (siswa.foto.store, JSON) Unggah pas foto 3x4 (multipart, field `foto`).
   DELETE /siswa/{siswa}/foto  (siswa.foto.destroy, JSON) Hapus pas foto.
   GET    /siswa/{siswa}  (siswa.show, JSON) Biodata, nilai, kehadiran, ekskul, riwayat kelas. Sertakan `izin` (apa saja yang boleh diubah peran ini).
   POST   /siswa/{siswa}/nilai  (nilai.store, JSON) Tambah nilai satu mapel (Policy).
   PUT    /nilai/{nilai}  (nilai.update, JSON) Ubah nilai (0-100, kosong=X).
   DELETE /nilai/{nilai}  (nilai.destroy, JSON) Hapus nilai.
   POST   /siswa/{siswa}/kehadiran  (kehadiran.store, JSON) Tambah kehadiran + kokurikuler.
   PUT    /kehadiran/{kehadiran}  (kehadiran.update, JSON) Ubah kehadiran.
   DELETE /kehadiran/{kehadiran}  (kehadiran.destroy, JSON) Hapus kehadiran.
   POST   /siswa/{siswa}/ekskul  (ekskul.store, JSON) Tambah ekskul.
   PUT    /ekskul/{ekskul}  (ekskul.update, JSON) Ubah ekskul.
   DELETE /ekskul/{ekskul}  (ekskul.destroy, JSON) Hapus ekskul.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Detail & Editor Siswa</b> belum dikerjakan.</div>';
});
