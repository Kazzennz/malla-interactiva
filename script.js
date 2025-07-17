// script.js

const TOTAL_CREDITOS = 154;

// Datos de los semestres y materias con créditos
const malla = [
  {
    nombre: "1° Semestre",
    ramos: [
      { nombre: "Fundamentos de Administración", creditos: 3 },
      { nombre: "Matemáticas Básicas", creditos: 3 },
      { nombre: "Introducción a la Economía", creditos: 2 },
      { nombre: "Cátedra Unitrópico", creditos: 1 },
    ]
  },
  {
    nombre: "2° Semestre",
    ramos: [
      { nombre: "Contabilidad General", creditos: 3 },
      { nombre: "Matemáticas Financieras", creditos: 3 },
      { nombre: "Estadística I", creditos: 2 },
      { nombre: "Microeconomía", creditos: 3 },
    ]
  },
  {
    nombre: "3° Semestre",
    ramos: [
      { nombre: "Costos I", creditos: 3 },
      { nombre: "Contabilidad Financiera", creditos: 3 },
      { nombre: "Estadística II", creditos: 2 },
      { nombre: "Macroeconomía", creditos: 3 },
    ]
  },
  {
    nombre: "4° Semestre",
    ramos: [
      { nombre: "Presupuestos", creditos: 3 },
      { nombre: "Derecho Empresarial", creditos: 2 },
      { nombre: "Economía Colombiana", creditos: 2 },
      { nombre: "Costos II", creditos: 3 },
    ]
  },
  {
    nombre: "5° Semestre",
    ramos: [
      { nombre: "Gestión Humana", creditos: 3 },
      { nombre: "Administración Financiera I", creditos: 3 },
      { nombre: "Finanzas Públicas", creditos: 2 },
      { nombre: "Electiva Profesional I", creditos: 2 },
    ]
  },
  {
    nombre: "6° Semestre",
    ramos: [
      { nombre: "Investigación de Mercados", creditos: 3 },
      { nombre: "Administración Financiera II", creditos: 3 },
      { nombre: "Comercio Internacional", creditos: 2 },
      { nombre: "Electiva Profesional II", creditos: 2 },
    ]
  },
  {
    nombre: "7° Semestre",
    ramos: [
      { nombre: "Planeación Estratégica", creditos: 3 },
      { nombre: "Simulación Empresarial", creditos: 2 },
      { nombre: "Electiva Profesional III", creditos: 2 },
      { nombre: "Práctica Empresarial I", creditos: 3 },
    ]
  },
  {
    nombre: "8° Semestre",
    ramos: [
      { nombre: "Formulación de Proyectos", creditos: 3 },
      { nombre: "Evaluación de Proyectos", creditos: 3 },
      { nombre: "Responsabilidad Social", creditos: 2 },
      { nombre: "Práctica Empresarial II", creditos: 3 },
    ]
  },
  {
    nombre: "9° Semestre",
    ramos: [
      { nombre: "Seminario de Grado I", creditos: 3 },
      { nombre: "Seminario de Grado II", creditos: 3 },
      { nombre: "Electiva Libre", creditos: 2 },
    ]
  }
];

const grid = document.querySelector(".grid");
const creditosTotales = document.getElementById("creditos-totales");
const reiniciarBtn = document.getElementById("reiniciar");

let seleccionados = JSON.parse(localStorage.getItem("seleccionados")) || [];

// Construir la malla
malla.forEach((semestre, i) => {
  const div = document.createElement("div");
  div.classList.add("semestre");

  const titulo = document.createElement("h2");
  titulo.textContent = semestre.nombre;
  div.appendChild(titulo);

  let creditosSemestre = 0;

  semestre.ramos.forEach((ramo, j) => {
    creditosSemestre += ramo.creditos;

    const ramoDiv = document.createElement("div");
    ramoDiv.classList.add("ramo", "activo");
    ramoDiv.textContent = ramo.nombre;
    ramoDiv.dataset.creditos = ramo.creditos;
    ramoDiv.dataset.id = `${i}-${j}`;

    if (seleccionados.includes(ramoDiv.dataset.id)) {
      ramoDiv.classList.add("seleccionado");
    }

    ramoDiv.addEventListener("click", () => {
      if (!ramoDiv.classList.contains("activo")) return;

      ramoDiv.classList.toggle("seleccionado");
      const id = ramoDiv.dataset.id;

      if (ramoDiv.classList.contains("seleccionado")) {
        seleccionados.push(id);
      } else {
        seleccionados = seleccionados.filter((item) => item !== id);
      }

      localStorage.setItem("seleccionados", JSON.stringify(seleccionados));
      actualizarConteo();
    });

    div.appendChild(ramoDiv);
  });

  const creditosInfo = document.createElement("div");
  creditosInfo.classList.add("creditos-semestre");
  creditosInfo.textContent = `Créditos del semestre: ${creditosSemestre}`;
  div.appendChild(creditosInfo);

  grid.appendChild(div);
});

// Actualizar conteo total
function actualizarConteo() {
  const seleccionadosActuales = document.querySelectorAll(".ramo.seleccionado");
  let total = 0;

  seleccionadosActuales.forEach((el) => {
    total += parseInt(el.dataset.creditos);
  });

  const faltantes = TOTAL_CREDITOS - total;
  creditosTotales.innerHTML = `<p>Créditos restantes: ${faltantes}</p>`;
}

// Botón reiniciar
reiniciarBtn.addEventListener("click", () => {
  localStorage.removeItem("seleccionados");
  document.querySelectorAll(".ramo").forEach((el) => el.classList.remove("seleccionado"));
  actualizarConteo();
});

actualizarConteo();
