/* ==========================================================
   TARIFAS.JS
   ----------------------------------------------------------
   Esta es tu "hoja de cálculo" de costos. Editá los números
   de acá abajo para cambiar los precios de TODO el sitio
   (la calculadora de presupuesto los lee de este archivo).

   Más adelante, si querés editar estos valores sin tocar
   código, usá la página pages/admin.html: los cambios que
   hagas ahí se guardan en el navegador (localStorage) y
   pisan estos valores por defecto.
   ========================================================== */

const TARIFAS_DEFAULT = {
  camiones: [
    { id: "chico",   nombre: "Camioneta chica (hasta 500kg)",   costoBase: 5000,  costoKm: 1500, capacidadKg: 500  },
    { id: "mediano", nombre: "Camión mediano (hasta 1500kg)",   costoBase: 9000,  costoKm: 2200, capacidadKg: 1500 },
    { id: "grande",  nombre: "Camión grande (hasta 4000kg)",    costoBase: 15000, costoKm: 3000, capacidadKg: 4000 }
  ],
  costoPeon: 4000,
  horasIncluidas: 1,
  costoHoraExtra: 5000,
  recargoSinAscensor: 3000,

  actualizado: "2026-07-01"
};

const TARIFAS_STORAGE_KEY = "fletesya_tarifas";

function getTarifas() {
  const guardadas = localStorage.getItem(TARIFAS_STORAGE_KEY);
  if (guardadas) {
    try {
      return JSON.parse(guardadas);
    } catch (e) {
      console.warn("No se pudieron leer las tarifas guardadas, se usan las de fábrica.", e);
    }
  }
  return TARIFAS_DEFAULT;
}

function saveTarifas(tarifas) {
  localStorage.setItem(TARIFAS_STORAGE_KEY, JSON.stringify(tarifas));
}

function resetTarifas() {
  localStorage.removeItem(TARIFAS_STORAGE_KEY);
}
