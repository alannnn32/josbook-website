/* Penjaga halaman. Cek peran di sini hanya untuk UX; keamanan sebenarnya di backend.
   Pemakaian:
     Halaman.mulai({ peran: ['admin'] }, async function (user) { ... });
     Halaman.mulai({ publik: true }, function () { ... });   // halaman login */
(function () {
  window.Halaman = {
    mulai: function (opsi, fn) {
      var jalan = function () {
        var user = Auth.user();
        if (!opsi.publik) {
          if (!Auth.token() || !user) return Auth.keLogin();
          if (opsi.peran && opsi.peran.indexOf(user.peran) === -1) {
            window.location.href = Auth.halamanAwal(user.peran);
            return;
          }
        }
        return fn(user);
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', jalan);
      else jalan();
    },

    keluar: async function () {
      try { await api.post('/logout', {}, { tanpaRedirect401: true }); } catch (e) { /* abaikan */ }
      Auth.hapus();
      Auth.keLogin();
    }
  };
})();
