const TOTAL_CREDITOS = 154;

// Estructura base: puedes completarla con los demás semestres
const malla = [
  {
    nombre: "Semestre I",
    ramos: [
      { nombre: "Introducción a las Ciencias Económicas y Administrativas", prerrequisitos: [], creditos: 2 },
      { nombre: "Pensamiento Administrativo", prerrequisitos: [], creditos: 3 },
      { nombre: "Fundamentos de Contabilidad", prerrequisitos: [], creditos: 3 },
      { nombre: "Fundamentos de Economía", prerrequisitos: [], creditos: 3 },
      { nombre: "Herramientas Tecnológicas I", prerrequisitos: [], creditos: 2 },
      { nombre: "Comprensión y Producción de Textos I", prerrequisitos: [], creditos: 3 },
      { nombre: "Pensamiento Matemático", prerrequisitos: [], creditos: 2 },
    ],
  },
  {
    nombre: "Semestre II",
    ramos: [
      { nombre: "Proceso Administrativo", prerrequisitos: ["Pensamiento Administrativo"], creditos: 2 },
      { nombre: "Costos", prerrequisitos: ["Fundamentos de Contabilidad"], creditos: 3 },
      { nombre: "Microeconomía", prerrequisitos: ["Fundamentos de Economía"], creditos: 3 },
      { nombre: "Precálculo", prerrequisitos: [], creditos: 2 },
      { nombre: "Derecho Laboral", prerrequisitos: [], creditos: 3 },
      { nombre: "Comprensión y Producción de Textos II", prerrequisitos: ["Comprensión y Producción de Textos I"], creditos: 3 },
      { nombre: "Cátedra de la Orinoquía", prerrequisitos: [], creditos: 2 },
    ],
  },
  // Puedes continuar con Semestre III, IV... hasta IX aquí
];

// LocalStorage
let seleccionadas = JSON.parse(localStorage.getItem("seleccionadas")) || [];

const container = document.getElementById("mallaContainer");
const spanSeleccionados = document.getElementById("creditosSeleccionados");
const spanFaltantes = document.getElementById("creditosFaltantes");
const btnReiniciar = document.getElementById("reiniciar");

function renderMalla() {
  container.innerHTML = "";
  let totalCreditos = 0;

  malla.forEach(semestre => {
    const divSemestre = document.createElement("div");
    divSemestre.classList.add("semestre");

    const h3 = document.createElement("h3");
    h3.textContent = semestre.nombre;
    divSemestre.appendChild(h3);

    let creditosSemestre = 0;

    semestre.ramos.forEach(ramo => {
      const cumple = ramo.prerrequisitos.every(p => seleccionadas.includes(p));
      const seleccionado = seleccionadas.includes(ramo.nombre);

      const divRamo = document.createElement("div");
      divRamo.classList.add("ramo");
      if (!cumple && !seleccionado) divRamo.classList.add("inactivo");
      if (seleccionado) {
        divRamo.classList.add("seleccionado");
        creditosSemestre += ramo.creditos;
        totalCreditos += ramo.creditos;
      }

      divRamo.textContent = `${ramo.nombre} – ${ramo.creditos} créditos`;

      divRamo.addEventListener("click", () => {
        if (!cumple && !seleccionado) return;

        if (seleccionado) {
          seleccionadas = seleccionadas.filter(n => n !== ramo.nombre);
        } else {
          seleccionadas.push(ramo.nombre);
        }

        localStorage.setItem("seleccionadas", JSON.stringify(seleccionadas));
        renderMalla();
      });

      divSemestre.appendChild(divRamo);
    });

    const divCreditosSem = document.createElement("div");
    divCreditosSem.classList.add("creditos-semestre");
    divCreditosSem.textContent = `Créditos en este semestre: ${creditosSemestre}`;
    divSemestre.appendChild(divCreditosSem);

    container.appendChild(divSemestre);
  });

  spanSeleccionados.textContent = totalCreditos;
  spanFaltantes.textContent = TOTAL_CREDITOS - totalCreditos;
}

btnReiniciar.addEventListener("click", () => {
  if (confirm("¿Quieres borrar todo tu progreso?")) {
    seleccionadas = [];
    localStorage.removeItem("seleccionadas");
    renderMalla();
  }
});

renderMalla();
