const ramos = [
  // Formato: [nombre, prerrequisito, créditos, semestre]
  ["Introducción a las Ciencias Económicas y Administrativas", null, 2, 1],
  ["Pensamiento Administrativo", null, 3, 1],
  ["Fundamentos de Contabilidad", null, 3, 1],
  ["Fundamentos de Economía", null, 3, 1],
  ["Herramientas Tecnológicas I", null, 2, 1],
  ["Comprensión y Producción de Textos I", null, 3, 1],
  ["Pensamiento Matemático", null, 2, 1],

  ["Proceso Administrativo", "Pensamiento Administrativo", 2, 2],
  ["Costos", "Fundamentos de Contabilidad", 3, 2],
  ["Microeconomía", "Fundamentos de Economía", 3, 2],
  ["Precálculo", null, 2, 2],
  ["Derecho Laboral", null, 3, 2],
  ["Comprensión y Producción de Textos II", "Comprensión y Producción de Textos I", 3, 2],
  ["Cátedra de la Orinoquía", null, 2, 2],

  ["Teoría Organizacional", "Proceso Administrativo", 2, 3],
  ["Gestión Presupuestal", "Costos", 3, 3],
  ["Macroeconomía", "Microeconomía", 3, 3],
  ["Herramientas Tecnológicas II", "Herramientas Tecnológicas I", 2, 3],
  ["Cálculo Diferencial e Integral", "Precálculo", 2, 3],
  ["Derecho Comercial y Tributario", "Derecho Laboral", 3, 3],
  ["Innovación y Creatividad", null, 2, 3],

  ["Matemática Financiera", "Gestión Presupuestal", 3, 4],
  ["Estadística Descriptiva", "Cálculo Diferencial e Integral", 3, 4],
  ["Fundamentos de Mercados", null, 2, 4],
  ["Gestión Humana", null, 3, 4],
  ["Introducción a la Investigación", null, 2, 4],
  ["Constitución Política y Ciudadanía", "Comprensión y Producción de Textos II", 2, 4],
  ["Electiva I", null, 3, 4],

  ["Análisis Financiero", "Matemática Financiera", 3, 5],
  ["Estadística Inferencial", "Estadística Descriptiva", 3, 5],
  ["Fundamentos de Emprenderismo", "Innovación y Creatividad", 2, 5],
  ["Investigación de Mercados", "Fundamentos de Mercados", 2, 5],
  ["Moneda y Banca", null, 2, 5],
  ["Gestión Pública", null, 2, 5],
  ["Metodologías en la Investigación", "Introducción a la Investigación", 2, 5],
  ["Optativa de Identidad Institucional I", "Cátedra de la Orinoquía", 2, 5],

  ["Marketing Digital", "Investigación de Mercados", 2, 6],
  ["Formulación de Proyectos", "Moneda y Banca", 3, 6],
  ["Habilidades Gerenciales", null, 3, 6],
  ["Gestión de la Organización y Producción", "Gestión Humana", 3, 6],
  ["Optativa de Competencias Genéricas", "Constitución Política y Ciudadanía", 2, 6],
  ["Optativa de Identidad Institucional II", "Optativa de Identidad Institucional I", 2, 6],
  ["Electiva II", "Electiva I", 3, 6],

  ["Plan de Negocios", "Fundamentos de Emprenderismo", 2, 7],
  ["Gerencia Financiera y Valor Agregado", "Habilidades Gerenciales", 2, 7],
  ["Gestión de Empresas Turísticas", "Gestión Pública", 3, 7],
  ["Optativa I", null, 2, 7],
  ["Formulación de Proyectos de Investigación", "Metodologías en la Investigación", 2, 7],
  ["Práctica I", null, 4, 7],

  ["International Business", "Marketing Digital", 2, 8],
  ["Gerencia Estratégica", "Gerencia Financiera y Valor Agregado", 2, 8],
  ["Ética y Responsabilidad Social", "Gestión de la Organización y Producción", 2, 8],
  ["Gestión del Servicio", "Gestión de Empresas Turísticas", 2, 8],
  ["Optativa II", "Optativa I", 2, 8],
  ["Optativa III", null, 2, 8],
  ["Seminario", "Práctica I", 2, 8],
  ["Electiva III", "Electiva II", 3, 8],

  ["Simulación Gerencial", "Gerencia Estratégica", 3, 9],
  ["Optativa IV", "Optativa III", 2, 9],
  ["Práctica II", "Seminario", 6, 9],
  ["Electiva de Contexto", "Electiva III", 4, 9]
];

const grid = document.getElementById("grid");
const creditosRestantes = document.getElementById("creditos-restantes");
let creditosTotales = 122;
let completados = new Set();

function renderMalla() {
  const semestres = {};

  // Agrupar por semestre
  ramos.forEach(([nombre, prereq, creditos, semestre]) => {
    if (!semestres[semestre]) semestres[semestre] = [];
    semestres[semestre].push({ nombre, prereq, creditos });
  });

  // Render por semestre
  for (let semestre in semestres) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("semestre");
    contenedor.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    semestres[semestre].forEach(({ nombre, prereq, creditos }) => {
      const btn = document.createElement("button");
      btn.classList.add("ramo");
      btn.textContent = `${nombre} (${creditos} cr.)`;
      btn.dataset.nombre = nombre;
      btn.dataset.prereq = prereq;
      btn.dataset.creditos = creditos;

      if (!prereq) {
        btn.classList.add("activo");
      }

      btn.addEventListener("click", () => {
        if (!btn.classList.contains("activo") || btn.classList.contains("seleccionado")) return;

        btn.classList.add("seleccionado");
        completados.add(nombre);
        creditosTotales -= parseInt(creditos);
        creditosRestantes.textContent = creditosTotales;

        // Activar materias que dependan de esta
        document.querySelectorAll(".ramo").forEach(b => {
          if (b.dataset.prereq === nombre) {
            b.classList.add("activo");
          }

          // Si ya se han aprobado todos los prerrequisitos, activar
          const prereq = b.dataset.prereq;
          if (prereq && completados.has(prereq)) {
            b.classList.add("activo");
          }
        });
      });

      contenedor.appendChild(btn);
    });

    grid.appendChild(contenedor);
  }
}
// Suponiendo que tienes ya definido el array "ramos" como antes y que cada uno tiene [nombre, prereq, creditos, semestre]
const grid = document.getElementById("grid");
const creditosAcumulados = document.getElementById("creditos-acumulados");
const creditosRestantes = document.getElementById("creditos-restantes");

let totalCreditos = 154;
let completados = new Set(JSON.parse(localStorage.getItem("materiasCompletadas") || "[]"));
let creditosPorMateria = {};

function guardarProgreso() {
  localStorage.setItem("materiasCompletadas", JSON.stringify([...completados]));
}

function renderMalla() {
  const semestres = {};

  ramos.forEach(([nombre, prereq, creditos, semestre]) => {
    if (!semestres[semestre]) semestres[semestre] = [];
    semestres[semestre].push({ nombre, prereq, creditos });
    creditosPorMateria[nombre] = creditos;
  });

  let acumuladosTotales = 0;

  for (let semestre in semestres) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("semestre");
    const encabezado = document.createElement("h2");
    encabezado.textContent = `📘 Semestre ${semestre}`;
    contenedor.appendChild(encabezado);

    let acumuladosSemestre = 0;

    semestres[semestre].forEach(({ nombre, prereq, creditos }) => {
      const btn = document.createElement("button");
      btn.classList.add("ramo");
      btn.textContent = nombre;
      btn.dataset.nombre = nombre;
      btn.dataset.prereq = prereq;
      btn.dataset.creditos = creditos;

      if (!prereq || completados.has(prereq)) {
        btn.classList.add("activo");
      }

      if (completados.has(nombre)) {
        btn.classList.add("seleccionado");
        acumuladosSemestre += parseInt(creditos);
        acumuladosTotales += parseInt(creditos);
      }

      btn.addEventListener("click", () => {
        if (!btn.classList.contains("activo") || btn.classList.contains("seleccionado")) return;

        btn.classList.add("seleccionado");
        completados.add(nombre);
        guardarProgreso();
        renderMallaDesdeCero();
      });

      contenedor.appendChild(btn);
    });

    const creditosDiv = document.createElement("div");
    creditosDiv.classList.add("creditos-semestre");
    creditosDiv.textContent = `Créditos cursados en este semestre: ${acumuladosSemestre}`;
    contenedor.appendChild(creditosDiv);
    grid.appendChild(contenedor);
  }

  creditosAcumulados.textContent = acumuladosTotales;
  creditosRestantes.textContent = totalCreditos - acumuladosTotales;
}

function renderMallaDesdeCero() {
  grid.innerHTML = "";
  renderMalla();
}

renderMallaDesdeCero();

renderMalla();

