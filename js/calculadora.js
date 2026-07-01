document.addEventListener("DOMContentLoaded", function () {
  const tarifas = getTarifas();

  const form = document.getElementById("formPresupuesto");
  const selectCamion = document.getElementById("pCamion");
  const resultBox = document.getElementById("resultBox");
  const resultAmount = document.getElementById("resultAmount");
  const resultDetalle = document.getElementById("resultDetalle");

  tarifas.camiones.forEach(function (camion) {
    const option = document.createElement("option");
    option.value = camion.id;
    option.textContent = camion.nombre;
    selectCamion.appendChild(option);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const camionId = selectCamion.value;
    const camion = tarifas.camiones.find(function (c) { return c.id === camionId; });

    const km = parseFloat(document.getElementById("pKm").value) || 0;
    const peones = parseInt(document.getElementById("pPeones").value, 10) || 0;
    const horas = parseFloat(document.getElementById("pHoras").value) || 0;
    const sinAscensor = document.getElementById("pAscensor").value === "no";

    const costoCamion = camion.costoBase + (km * camion.costoKm);
    const costoPeones = peones * tarifas.costoPeon;

    const horasExtra = Math.max(0, horas - tarifas.horasIncluidas);
    const costoTiempoExtra = horasExtra * tarifas.costoHoraExtra;

    const recargo = sinAscensor ? tarifas.recargoSinAscensor : 0;

    const total = costoCamion + costoPeones + costoTiempoExtra + recargo;

    resultAmount.textContent = "$" + Math.round(total).toLocaleString("es-AR");
    resultDetalle.innerHTML =
      "Camión (" + camion.nombre + " · " + km + " km): $" + costoCamion.toLocaleString("es-AR") + "<br>" +
      "Peones (" + peones + "): $" + costoPeones.toLocaleString("es-AR") + "<br>" +
      "Tiempo extra (" + horasExtra + " hs sobre las " + tarifas.horasIncluidas + " incluidas): $" + costoTiempoExtra.toLocaleString("es-AR") +
      (recargo ? "<br>Recargo sin ascensor: $" + recargo.toLocaleString("es-AR") : "");

    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
