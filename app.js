const bookingTrigger = document.querySelector("#booking-trigger");
const bookingPanel = document.querySelector("#booking-panel");
const dateInput = document.querySelector("#meeting-date");
const timeInput = document.querySelector("#meeting-time");
const bookingHint = document.querySelector("#booking-hint");
const whatsappSend = document.querySelector("#whatsapp-send");

const today = new Date();
const localToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
dateInput.min = localToday;

bookingTrigger.addEventListener("click", () => {
  const isOpen = bookingTrigger.getAttribute("aria-expanded") === "true";
  bookingTrigger.setAttribute("aria-expanded", String(!isOpen));
  bookingPanel.hidden = isOpen;
});

const updateBooking = () => {
  const serviceInput = document.querySelector('input[name="service"]:checked');
  const planInput = document.querySelector('input[name="plan"]:checked');
  const modelInput = document.querySelector('input[name="model"]:checked');
  const service = serviceInput ? serviceInput.value : "";
  const plan = planInput ? planInput.value : "";
  const model = modelInput ? modelInput.value : "";
  const date = dateInput.value;
  const time = timeInput.value;
  const missing = [];

  if (!service) missing.push("perfil");
  if (!plan) missing.push("pack");
  if (!model) missing.push("modelo de contratación");
  if (!date) missing.push("día");
  if (!time) missing.push("hora");

  const ready = missing.length === 0;
  whatsappSend.hidden = !ready;
  if (!ready) {
    bookingHint.textContent = "Para habilitar el envío, selecciona: " + missing.join(", ") + ".";
    return;
  }

  const formattedDate = new Intl.DateTimeFormat("es-AR", { dateStyle: "full", timeZone: "UTC" }).format(new Date(date + "T12:00:00Z"));
  const message = [
    "Hola, Vendoor. Quiero agendar una reunión.",
    "",
    "Perfil o especialidad: " + service,
    "Pack de servicio: " + plan,
    "Modelo de contratación: " + model,
    "Día preferido: " + formattedDate,
    "Hora preferida: " + time
  ].join("\n");

  whatsappSend.href = "https://wa.me/5492216964069?text=" + encodeURIComponent(message);
  bookingHint.textContent = "Listo. El mensaje incluirá tus tres selecciones y la fecha y hora elegidas.";
};

document.querySelectorAll('input[name="service"], input[name="plan"], input[name="model"]').forEach((input) => input.addEventListener("change", updateBooking));
dateInput.addEventListener("change", updateBooking);
timeInput.addEventListener("change", updateBooking);
updateBooking();

const closerTeaser = document.querySelector("#closer-teaser");
const closerExpand = document.querySelector("#closer-expand");
const closerDetails = document.querySelector("#closer-details");
const closerDetailsClose = document.querySelector("#closer-details-close");
const closerVideo = document.querySelector("#closer-video-player");

const openCloserDetails = (showVideo = false) => {
  closerDetails.hidden = false;
  closerExpand.setAttribute("aria-expanded", "true");
  const target = showVideo ? closerVideo : closerDetails;
  requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: showVideo ? "center" : "start" }));
};

closerExpand.addEventListener("click", () => openCloserDetails());
document.querySelector("#closer-continue").addEventListener("click", () => openCloserDetails());
document.querySelector("#closer-video").addEventListener("click", () => openCloserDetails(true));

closerDetailsClose.addEventListener("click", () => {
  closerDetails.hidden = true;
  closerExpand.setAttribute("aria-expanded", "false");
  closerTeaser.scrollIntoView({ behavior: "smooth", block: "center" });
});