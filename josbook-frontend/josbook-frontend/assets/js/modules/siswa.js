/* Data Siswa
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   POST   /siswa/pindah-kelas  (siswa.pindah-kelas, JSON) Pindah kelas massal dalam satu tahun ajaran.
   GET    /siswa-export  (siswa.export, unduhan) Ekspor daftar siswa (xlsx). Query sama dengan siswa.index.
   GET    /siswa  (siswa.index, JSON) Daftar siswa. Pilih kelas dulu.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Data Siswa</b> belum dikerjakan.</div>';
});
