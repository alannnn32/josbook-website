/* Cetak Dokumen
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /cetak  (cetak.index, JSON) Pilihan cetak: tahun ajaran, semester, jenis isi, kertas.
   GET    /cetak/siswa/{siswa}  (cetak.siswa, JSON) Data dokumen register / laporan capaian satu siswa. Dokumen dibentuk di frontend.
   GET    /cetak/sampul/{kelas}  (cetak.sampul, JSON) Data sampul buku induk satu kelas.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Cetak Dokumen</b> belum dikerjakan.</div>';
});
