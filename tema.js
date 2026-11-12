(function tema() {
    const CLAVE = "biblioweb-tema";
    function temaInicial() {
        try {
            const guardado = localStorage.getItem(CLAVE);
            if (guardado === "light" || guardado === "dark") return guardado;
        } catch (e) { / localStorage bloqueado: seguimos sin guardar */ }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function aplicar(tema) {
        document.documentElement.setAttribute("data-bs-theme", tema);
        const boton = document.getElementById("btn-tema");
        if (boton) {
            const oscuro = tema === "dark";
            boton.textContent = oscuro ? "☀️ Claro" : "🌙 Oscuro";
            boton.setAttribute("aria-label", oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
        }
    }
    function alternar() {
        const nuevo = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        aplicar(nuevo);
        try { localStorage.setItem(CLAVE, nuevo); } catch (e) { }
    }
    aplicar(temaInicial());
    document.addEventListener("DOMContentLoaded", function () {
        aplicar(temaInicial());
        const boton = document.getElementById("btn-tema");
        if (boton) boton.addEventListener("click", alternar);
    });
})();