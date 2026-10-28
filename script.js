// Menú móvil
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

// Cuenta regresiva: fecha y hora local de Bolivia (UTC-4).
// Cambia esta fecha si la organización modifica el evento.
const eventDate = new Date("2026-10-31T09:00:00-04:00");
const countdownMessage = document.querySelector("#countdownMessage");

function updateCountdown() {
  const now = Date.now();
  const difference = eventDate.getTime() - now;
  const ids = ["days", "hours", "minutes", "seconds"];

  if (difference <= 0) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.textContent = "00";
    });
    if (countdownMessage) {
      countdownMessage.textContent = difference > -7 * 60 * 60 * 1000
        ? "¡La feria está en marcha! Te esperamos."
        : "La fecha de la feria ya pasó. Gracias por tu interés.";
    }
    return;
  }

  const secondsTotal = Math.floor(difference / 1000);
  const values = [
    Math.floor(secondsTotal / 86400),
    Math.floor((secondsTotal % 86400) / 3600),
    Math.floor((secondsTotal % 3600) / 60),
    secondsTotal % 60
  ];

  ids.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(values[index]).padStart(2, "0");
  });
  if (countdownMessage) {
    countdownMessage.textContent = "Prepárate para descubrir lo que no se ve a simple vista.";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Año automático en el pie de página.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
