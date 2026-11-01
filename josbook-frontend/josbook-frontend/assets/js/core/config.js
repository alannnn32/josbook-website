/* Konfigurasi global JosBook (frontend).
   DUMMY = true  -> api.js membalas dari data dummy, backend tidak diperlukan.
   DUMMY = false -> api.js memanggil API Laravel di API_BASE (Bearer token). */
(function () {
  var src = (document.currentScript && document.currentScript.src) || '';
  var root = src.replace(/assets\/js\/core\/config\.js.*$/, '');

  window.CONFIG = {
    API_BASE: 'http://127.0.0.1:8000/api',
    DUMMY: true,
    ROOT: root,
    KUNCI_TOKEN: 'josbook_token',
    KUNCI_USER: 'josbook_user',
    HALAMAN_AWAL: {
      admin: 'pages/admin/dashboard.html',
      guru: 'pages/guru/beranda.html',
      siswa: 'pages/portal/beranda.html'
    },
    url: function (path) { return root + path; }
  };
})();
