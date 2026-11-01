/* Penjaga halaman. INGAT: ini hanya untuk pengalaman pengguna (menyembunyikan menu, mengarahkan).
   Keamanan sebenarnya ada di backend (middleware role + Policy). */
(function () {
  window.Guard = {
    // peranBoleh: ['admin'], ['admin','guru'], dst. Mengembalikan data pengguna segar dari /saya.
    async wajib(peranBoleh) {
      if (!Auth.token()) { Auth.keLogin(); return new Promise(function () {}); }
      var user = Auth.user();
      if (user && peranBoleh && peranBoleh.indexOf(user.peran) < 0) {
        location.href = Auth.halamanAwal(user.peran); return new Promise(function () {});
      }
      var segar = (await api.get('/saya')).data;         // 401 -> api.js otomatis ke login
      Auth.perbaruiUser(segar);
      if (peranBoleh && peranBoleh.indexOf(segar.peran) < 0) {
        location.href = Auth.halamanAwal(segar.peran); return new Promise(function () {});
      }
      var diGanti = /ganti-password\.html$/.test(location.pathname);
      if (segar.wajib_ganti && !diGanti) {
        location.href = JOSBOOK.ROOT + 'pages/shared/ganti-password.html'; return new Promise(function () {});
      }
      return segar;
    },
  };
})();
