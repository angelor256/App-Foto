/* Grain & Silver — comportamiento mínimo. El sitio funciona sin JS; esto solo mejora. */
(function () {
  var KEY = "gs-cart";

  function read() {
    try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; }
  }
  function write(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) { /* storage no disponible */ }
  }
  function render(n) {
    document.querySelectorAll("[data-cart-count]").forEach(function (el) { el.textContent = n; });
    document.querySelectorAll("[data-cart-link]").forEach(function (el) {
      el.setAttribute("aria-label", "Cart, " + n + (n === 1 ? " item" : " items"));
    });
  }

  var count = read();
  render(count);

  // Añadir al carrito (anuncia el cambio a lectores de pantalla)
  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      count += 1; write(count); render(count);
      var live = document.getElementById("cart-status");
      if (live) live.textContent = btn.getAttribute("data-add") + " added to cart. " + count + (count === 1 ? " item" : " items") + " in cart.";
    });
  });

  // Marcador (botón de alternancia)
  document.querySelectorAll("[data-bookmark]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!on));
    });
  });

  // Formulario de contacto (demo: no envía datos a ningún servidor)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("contact-status");
      if (status) status.textContent = "Message sent. Thank you — Lucas will reply by email.";
      form.reset();
    });
  }
})();
