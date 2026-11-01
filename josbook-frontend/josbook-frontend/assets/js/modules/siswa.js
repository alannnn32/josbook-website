/* 
  * Modul Data Siswa, Filter, Pencarian & Detail Biodata
  * Tanggung Jawab: Farin Sevany Kasih
  */
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');

  isi.innerHTML = `
    <div class="content-wrapper p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-1">Data Siswa</h2>
                <p class="text-muted small mb-0">Kelola data siswa, lakukan pencarian, filter kelas, dan lihat detail biodata.</p>
            </div>
            <div class="d-flex gap-2">
                <input type="text" id="search-siswa" class="form-control form-control-sm" placeholder="Cari nama / NISN..." style="width: 250px;">
                <select id="filter-kelas" class="form-select form-select-sm" style="width: 140px;">
                    <option value="">Semua Kelas</option>
                    <option value="X-1">X-1</option>
                    <option value="X-2">X-2</option>
                    <option value="XI-1">XI-1</option>
                    <option value="XII-1">XII-1</option>
                </select>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-body p-0" id="tabel-siswa-container">
                <!-- Tabel akan dimuat di sini -->
            </div>
        </div>
    </div>

    <!-- Modal Detail Biodata -->
    <div class="modal fade" id="modalDetailSiswa" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Detail Biodata Siswa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-detail-body">
            <!-- Isi detail -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Data Mock / Dummy lokal untuk pengujian instan tanpa backend
  const defaultMockSiswa = [
    { id: 1, nama_lengkap: "Farin Sevany Kasih", nisn: "E41251508", kelas: "X-1", jenis_kelamin: "P", tempat_lahir: "Nganjuk", tanggal_lahir: "2006-05-12", agama: "Islam", nik: "3514000000000001", nomor_induk: "101", nama_panggilan: "Farin" },
    { id: 2, nama_lengkap: "Achmad Hilmy Firdaus", nisn: "0087654321", kelas: "X-2", jenis_kelamin: "L", tempat_lahir: "Jember", tanggal_lahir: "2005-08-20", agama: "Islam", nik: "3509000000000002", nomor_induk: "102", nama_panggilan: "Hilmy" }
  ];

  async function loadData(query = '', kelasFilter = '') {
    try {
      if (typeof UI !== 'undefined' && UI.loading) UI.loading(true);
      
      let siswaList = [];
      try {
        const res = await api.get('/siswa', { search: query, kelas: kelasFilter });
        siswaList = res.data;
      } catch (e) {
        // Fallback ambil dari localStorage atau default mock jika API belum aktif
        let local = JSON.parse(localStorage.getItem('mock_siswa') || '[]');
        siswaList = [...defaultMockSisi = defaultMockSiswa, ...local];
      }

      // Filter pencarian dan kelas secara lokal untuk simulasi
      const filtered = siswaList.filter(s => {
        const matchQuery = (s.nama_lengkap || '').toLowerCase().includes(query.toLowerCase()) || (s.nisn || '').includes(query);
        const matchKelas = kelasFilter ? s.kelas === kelasFilter : true;
        return matchQuery && matchKelas;
      });

      const container = document.getElementById('tabel-siswa-container');
      
      let htmlTabel = `
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-3">No</th>
              <th>Nama Lengkap</th>
              <th>NISN</th>
              <th>Kelas</th>
              <th>JK</th>
              <th class="text-end pe-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
      `;

      if (filtered.length === 0) {
        htmlTabel += `<tr><td colspan="6" class="text-center py-4 text-muted">Tidak ada data siswa ditemukan.</td></tr>`;
      } else {
        filtered.forEach((s, idx) => {
          htmlTabel += `
            <tr>
              <td class="ps-3">${idx + 1}</td>
              <td class="fw-semibold">${s.nama_lengkap}</td>
              <td>${s.nisn || '-'}</td>
              <td><span class="badge bg-secondary">${s.kelas || '-'}</span></td>
              <td>${s.jenis_kelamin || '-'}</td>
              <td class="text-end pe-3">
                <button class="btn btn-sm btn-outline-primary btn-detail px-3" data-id="${s.id}" data-json='${JSON.stringify(s)}'>Detail</button>
              </td>
            </tr>
          `;
        });
      }

      htmlTabel += `</tbody></table>`;
      container.innerHTML = htmlTabel;

      // Event listener tombol detail
      document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', function() {
          const dataSiswa = JSON.parse(this.getAttribute('data-json'));
          tampilkanDetail(dataSiswa);
        });
      });

    } catch (err) {
      console.error('Gagal render tabel:', err);
    } finally {
      if (typeof UI !== 'undefined' && UI.loading) UI.loading(false);
    }
  }

  function tampilkanDetail(s) {
    const body = document.getElementById('modal-detail-body');
    body.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-4 text-center border-end">
          <div class="bg-light border rounded mx-auto d-flex align-items-center justify-content-center text-muted mb-3" style="width: 100px; height: 130px;">
            Foto 3x4
          </div>
          <h5 class="fw-bold mb-0">${s.nama_lengkap}</h5>
          <p class="text-muted small">NISN: ${s.nisn || '-'}</p>
        </div>
        <div class="col-md-8">
          <table class="table table-sm table-borderless">
            <tr><td class="fw-semibold text-secondary" width="38%">Nama Panggilan</td><td>: ${s.nama_panggilan || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">Nomor Induk</td><td>: ${s.nomor_induk || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">Jenis Kelamin</td><td>: ${s.jenis_kelamin || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">Tempat, Tgl Lahir</td><td>: ${s.tempat_lahir || '-' }, ${s.tanggal_lahir || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">Agama</td><td>: ${s.agama || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">Kelas</td><td>: ${s.kelas || '-'}</td></tr>
            <tr><td class="fw-semibold text-secondary">NIK</td><td>: ${s.nik || '-'}</td></tr>
          </table>
        </div>
      </div>
    `;

    const modalEl = document.getElementById('modalDetailSiswa');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  // Filter & Search Listener
  const searchInput = document.getElementById('search-siswa');
  const filterKelas = document.getElementById('filter-kelas');

  searchInput.addEventListener('input', () => loadData(searchInput.value, filterKelas.value));
  filterKelas.addEventListener('change', () => loadData(searchInput.value, filterKelas.value));

  // Load awal
  loadData();
});