/* Import Data
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   POST   /import/{jenis}/preview  (import.preview, JSON) Unggah Excel, deteksi sheet/kolom, validasi baris. BELUM menyimpan. Hasil disimpan sementara di server (cache) dan diberi `token_pratinjau`. jenis: siswa|nilai|kehadiran|ekskul.
   POST   /import/{jenis}/commit  (import.commit, JSON) Simpan baris valid dari pratinjau, lewati yang error.
   GET    /import/{jenis}/template  (import.template, unduhan) Unduh template Excel.
   GET    /import/{jenis}/laporan-masalah  (import.laporan-masalah, unduhan) Unduh baris error/peringatan dari satu pratinjau.
   DELETE /import/{jenis}/batch  (import.batch.hapus, JSON) Hapus hasil impor per kelas + semester (admin).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Import Data</b> belum dikerjakan.</div>';
});
