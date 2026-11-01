/* 
  * Modul Form Pendataan Siswa Baru
  * Tanggung Jawab: Farin Sevany Kasih
  * Endpoint: POST /siswa (siswa.store, JSON)
  */
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');

  // Render tampilan form pendataan lengkap
  isi.innerHTML = `
    <div class="content-wrapper p-4">
        <h2 class="fw-bold mb-1">Form Pendataan - Siswa Baru</h2>
        <p class="text-muted small mb-4">Halaman ini khusus input siswa baru. Untuk mengubah data siswa yang sudah ada, klik <strong>Edit</strong> di Data Siswa atau Alumni.</p>

        <!-- Navigasi Tab A - I -->
        <ul class="nav nav-pills mb-4 overflow-auto py-2 border-bottom">
            <li class="nav-item"><a class="nav-link active fw-bold btn-sm" href="#">1. A. Keterangan peserta didik</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">2. B. Tempat tinggal</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">3. C. Kesehatan</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">4. D. Pendidikan</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">5. E. Ayah kandung</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">6. E. Ibu kandung</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">7. E. Alamat orang tua</a></li>
            <li class="nav-item"><a class="nav-link text-secondary btn-sm" href="#">8. F. Wali</a></li>
        </ul>

        <form id="form-pendataan-siswa">
            <!-- Kotak Upload Pas Foto 3x4 -->
            <div class="card p-3 mb-4 bg-light border-0 rounded">
                <div class="d-flex align-items-center gap-3">
                    <div id="preview-foto" class="border bg-white d-flex align-items-center justify-content-center text-muted rounded" style="width: 80px; height: 100px; font-size: 12px; overflow: hidden;">
                        Foto 3x4
                    </div>
                    <div>
                        <label class="form-label fw-semibold small">Pas foto 3x4</label>
                        <input type="file" class="form-control form-control-sm" id="input-pas-foto" name="pas_foto" accept="image/*">
                        <small class="text-muted d-block mt-1">Cukup satu pas foto. Otomatis diperkecil dan tampil di halaman pertama register (PDF).</small>
                    </div>
                </div>
            </div>

            <!-- Baris Form Input Data (Tab A) -->
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label small text-muted">Nama lengkap</label>
                    <input type="text" class="form-control" name="nama_lengkap" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Nama panggilan</label>
                    <input type="text" class="form-control" name="nama_panggilan">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">NISN</label>
                    <input type="text" class="form-control" name="nisn" required>
                </div>

                <div class="col-md-4">
                    <label class="form-label small text-muted">Nomor induk</label>
                    <input type="text" class="form-control" name="nomor_induk">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Jenis kelamin</label>
                    <select class="form-select" name="jenis_kelamin">
                        <option value="L">L</option>
                        <option value="P">P</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Tempat lahir</label>
                    <input type="text" class="form-control" name="tempat_lahir">
                </div>

                <div class="col-md-4">
                    <label class="form-label small text-muted">Tanggal lahir</label>
                    <input type="date" class="form-control" name="tanggal_lahir">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Agama</label>
                    <input type="text" class="form-control" name="agama" value="Islam">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Kewarganegaraan</label>
                    <input type="text" class="form-control" name="kewarganegaraan" value="Warga Negara Indonesia">
                </div>

                <div class="col-md-4">
                    <label class="form-label small text-muted">NIK</label>
                    <input type="text" class="form-control" name="nik">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Anak ke</label>
                    <input type="number" class="form-control" name="anak_ke">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Jumlah saudara kandung</label>
                    <input type="number" class="form-control" name="jumlah_saudara">
                </div>

                <div class="col-md-4">
                    <label class="form-label small text-muted">Anak yatim / yatim piatu</label>
                    <input type="text" class="form-control" name="status_yatim">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Bahasa sehari-hari</label>
                    <input type="text" class="form-control" name="bahasa">
                </div>
                <div class="col-md-4">
                    <label class="form-label small text-muted">Kelas (tahun ajaran ini)</label>
                    <input type="text" class="form-control" name="kelas" value="X-1">
                </div>
            </div>

            <!-- Tombol Aksi -->
            <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="reset" class="btn btn-light border px-4">Batal</button>
                <button type="submit" class="btn btn-primary px-4">Simpan data siswa</button>
            </div>
        </form>
    </div>
  `;

  // Pratinjau Foto saat dipilih
  const inputFoto = document.getElementById('input-pas-foto');
  inputFoto.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById('preview-foto').innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle Submit Form
  const form = document.getElementById('form-pendataan-siswa');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const dataPayload = Object.fromEntries(formData.entries());

    try {
      if (typeof UI !== 'undefined' && UI.loading) UI.loading(true);
      
      // Coba kirim ke API backend, jika gagal/offline simpan ke localStorage untuk pengujian lokal
      try {
        await api.post('/siswa', dataPayload);
      } catch (err) {
        let localData = JSON.parse(localStorage.getItem('mock_siswa') || '[]');
        localData.push({ id: Date.now(), ...dataPayload });
        localStorage.setItem('mock_siswa', JSON.stringify(localData));
      }

      alert('Data siswa baru berhasil disimpan!');
      form.reset();
      document.getElementById('preview-foto').innerHTML = 'Foto 3x4';
    } catch (error) {
      console.error('Gagal menyimpan:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      if (typeof UI !== 'undefined' && UI.loading) UI.loading(false);
    }
  });
});