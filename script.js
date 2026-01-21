// 🔗 ENDPOINT DE FORMSPREE (CAMBIA ESTO)
const FORM_ENDPOINT = "https://formspree.io/f/mreeobwq";

// CONTROL DE PREGUNTAS
let currentQuestion = 0;
let selectedAnswers = [];

// PREGUNTAS
const questions = [
  {
    text: "¿Plan ideal?",
    options: ["Salir al cine", "Caminar y hablar","Pegar stcikers","Pasar tiempo juntos"]
  },
  {
    text: "¿Qué no puede faltar?",
    options: ["Música", "Risas", "Comida rica", "Buena compañía"]
  },
  {
    text: "El plan perfecto es:",
    options: ["Espontáneo", "Planeado con cariño", "Sorpresivo"]
  }
];

// LOGIN
function login() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.toLowerCase();
  const hint = document.getElementById("hint");

  if (user && (pass === "mango" || pass === "elian" || pass === "rosa pastel")) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("content").classList.remove("hidden");
    loadQuestion();
  } else {
    hint.textContent = "Pista: nombre de tus sobrinos o color favorito";
  }
}

// CARGAR PREGUNTA
function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("qText").textContent = q.text;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      // GUARDAR RESPUESTA
      selectedAnswers.push(opt);

      // FEEDBACK VISUAL (ELLA SOLO VE ESTO)
      btn.innerHTML = opt;
      btn.style.background =
        "linear-gradient(135deg, #e07a9b, #f497b6)";

      setTimeout(nextQuestion, 500);
    };

    answersDiv.appendChild(btn);
  });
}

// SIGUIENTE PREGUNTA O FINAL
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    enviarRespuestasSilencioso();

    document.getElementById("content").classList.add("hidden");
    document.getElementById("final").classList.remove("hidden");
  }
}

// 🔒 ENVÍO SILENCIOSO (ELLA NO SE ENTERA)
function enviarRespuestasSilencioso() {
  const nombre = document.getElementById("user").value;

  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      respuestas: selectedAnswers.join(" | ")
    })
  }).catch(() => {
    // si falla, no pasa nada (ella no ve error)
  });
}

// BOTÓN NO (TROLL 😈)
const noBtn = document.getElementById("noBtn");

if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 1000 - 500;
    const y = Math.random() * 500 - 250;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
}
