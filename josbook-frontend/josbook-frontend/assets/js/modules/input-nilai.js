/* Input Nilai Mapel
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /nilai/input  (nilai.input, JSON) Grid nilai per kelas + semester. Guru hanya kolom mapel yang diampu.
   POST   /nilai/input  (nilai.input.simpan, JSON) Simpan grid. Kosong = X, bukan 0.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Input Nilai Mapel</b> belum dikerjakan.</div>';
});
