/* Satu-satunya pintu panggilan jaringan. Modul halaman tidak boleh fetch langsung.
   Saat CONFIG.DUMMY = true, permintaan dijawab dari MOCK di bawah (tanpa backend).
   Bagian MOCK dan endpoint '/login', '/logout', '/dashboard', '/guru/beranda' adalah ASUMSI sementara;
   cocokkan dengan docs/05-kontrak-api.md begitu backend siap. */
(function () {
  function ApiError(status, message, errors) {
    this.name = 'ApiError';
    this.status = status;
    this.message = message || 'Terjadi kesalahan.';
    this.errors = errors || {};
  }
  ApiError.prototype = Object.create(Error.prototype);
  window.ApiError = ApiError;

  /* ---------- DATA DUMMY ---------- */
  var AKUN = [
    { username: 'admin', password: 'admin123', user: { id: 1, nama: 'Admin Sekolah', peran: 'admin' } },
    { username: '198204152008011007', password: 'guru12345', user: { id: 2, nama: 'Sari Wulandari, S.Pd', peran: 'guru', guru: { mapel: ['Matematika'], kelas_ajar: ['X-1', 'XI-1', 'XII-1'], wali: 'X-1' } } },
    { username: '0012345678', password: 'siswa12345', user: { id: 3, nama: 'Cahyo Nugroho', peran: 'siswa' } }
  ];

  var DASHBOARD = {
    tahun_ajaran: '2025/2026',
    ringkasan: { siswa_aktif: 9, guru: 4, alumni: 3, sampah: 0, laki_laki: 5, perempuan: 4, pindah_keluar: 0, kelengkapan: 93 },
    kelas: [
      { kelas: 'X-1', l: 2, p: 1, total: 3, kelengkapan: 93 },
      { kelas: 'XI-1', l: 1, p: 2, total: 3, kelengkapan: 93 },
      { kelas: 'XII-1', l: 2, p: 1, total: 3, kelengkapan: 93 }
    ],
    perlu_dilengkapi: [
      { id: 1, nama: 'Cahyo Nugroho', kelas: 'XII-1', kurang: 'foto' },
      { id: 2, nama: 'Dewi Anggraini', kelas: 'XII-1', kurang: 'foto' },
      { id: 3, nama: 'Eko Saputra', kelas: 'XII-1', kurang: 'foto' },
      { id: 4, nama: 'Fitri Handayani', kelas: 'XI-1', kurang: 'foto' },
      { id: 5, nama: 'Galih Prakoso', kelas: 'XI-1', kurang: 'foto' },
      { id: 6, nama: 'Hana Safitri', kelas: 'XI-1', kurang: 'foto' }
    ],
    angkatan: { X: 3, XI: 3, XII: 3 },
    alumni_per_tahun: [{ tahun: 2026, jumlah: 1 }, { tahun: 2025, jumlah: 2 }],
    aktivitas: []
  };

  var MOCK = {
    'POST /login': function (b) {
      var galat = {};
      if (!b.username) galat.username = ['NISN, NIP, atau email wajib diisi.'];
      if (!b.password) galat.password = ['Kata sandi wajib diisi.'];
      if (Object.keys(galat).length) throw new ApiError(422, 'Data belum lengkap.', galat);
      var u = AKUN.filter(function (a) {
        return a.username.toLowerCase() === String(b.username).trim().toLowerCase() && a.password === b.password;
      })[0];
      if (!u) throw new ApiError(401, 'NISN/NIP/email atau kata sandi salah.');
      return { data: { token: 'dummy-token-' + u.user.peran, user: u.user } };
    },
    'POST /logout': function () { return { message: 'Berhasil keluar.' }; },
    'GET /dashboard': function () { return { data: DASHBOARD }; },
    'GET /guru/beranda': function () {
      return { data: { tahun_ajaran: '2026/2027', semester: 'Ganjil', kurikulum: 'Merdeka', siswa_aktif_wali: 3 } };
    }
  };

  function mock(method, path, opsi) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var butuhLogin = path !== '/login';
        if (butuhLogin && !Auth.token()) return reject(new ApiError(401, 'Sesi berakhir. Silakan masuk lagi.'));
        var fn = MOCK[method + ' ' + path];
        if (!fn) return reject(new ApiError(501, 'Endpoint ' + method + ' ' + path + ' belum tersedia (dummy).'));
        try { resolve(fn(opsi.body || {})); } catch (e) { reject(e); }
      }, 450);
    });
  }

  /* ---------- PANGGILAN NYATA ---------- */
  function qs(query) {
    var p = Object.keys(query || {}).filter(function (k) { return query[k] != null && query[k] !== ''; })
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(query[k]); });
    return p.length ? '?' + p.join('&') : '';
  }

  async function nyata(method, path, opsi) {
    var headers = { 'Accept': 'application/json' };
    var token = Auth.token();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    var init = { method: method, headers: headers };
    if (opsi.form) { init.body = opsi.form; }
    else if (opsi.body !== undefined) { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opsi.body); }

    var res;
    try { res = await fetch(CONFIG.API_BASE + path + qs(opsi.query), init); }
    catch (e) { throw new ApiError(0, 'Tidak dapat terhubung ke server.'); }

    if (opsi.blob && res.ok) return res.blob();
    var json = null;
    try { json = await res.json(); } catch (e) { /* bukan JSON */ }
    if (!res.ok) throw new ApiError(res.status, (json && json.message) || res.statusText, json && json.errors);
    return json;
  }

  async function kirim(method, path, opsi) {
    opsi = opsi || {};
    try {
      return await (CONFIG.DUMMY ? mock(method, path, opsi) : nyata(method, path, opsi));
    } catch (e) {
      if (e.status === 401 && !opsi.tanpaRedirect401) { Auth.hapus(); Auth.keLogin(); }
      if (e.status === 403 && window.UI) UI.toast(e.message, 'error');
      throw e;
    }
  }

  window.api = {
    get: function (path, query, opsi) { return kirim('GET', path, Object.assign({ query: query }, opsi)); },
    post: function (path, body, opsi) { return kirim('POST', path, Object.assign({ body: body }, opsi)); },
    put: function (path, body, opsi) { return kirim('PUT', path, Object.assign({ body: body }, opsi)); },
    hapus: function (path, opsi) { return kirim('DELETE', path, opsi); },
    kirimForm: function (path, formData, opsi) { return kirim('POST', path, Object.assign({ form: formData }, opsi)); },
    unduh: function (path, query) { return kirim('GET', path, { query: query, blob: true }); }
  };
})();
