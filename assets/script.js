const regions = {
  cervical: {
    title: "Coluna Cervical",
    description:
      "Responsável pela mobilidade do pescoço e pela proteção das raízes nervosas que controlam braços e ombros.",
    symptoms: [
      "Rigidez ou dor na base do crânio e ombros",
      "Formigamento que irradia para braços e mãos",
      "Dores de cabeça tensionais frequentes"
    ],
    care: [
      "Alongamentos guiados e fortalecimento da musculatura profunda",
      "Avaliação postural e ajustes ergonômicos para home office",
      "Sessões combinadas de fisioterapia manual e liberação miofascial"
    ],
    callout:
      "Agende uma avaliação neurológica para descartar compressões nervosas e definir o tratamento ideal."
  },
  toracica: {
    title: "Coluna Torácica",
    description:
      "Garante estabilidade à parte média das costas e protege estruturas vitais como pulmões e coração.",
    symptoms: [
      "Sensação de peso ou queimação entre as escápulas",
      "Dificuldade para manter postura ereta por longos períodos",
      "Desconforto ao respirar profundamente"
    ],
    care: [
      "Treino respiratório e mobilidade costovertebral",
      "Fortalecimento de core e estabilizadores escapulares",
      "Protocolos de fisioterapia combinados com pilates clínico"
    ],
    callout:
      "Inclua pausas ativas ao longo do dia e utilize suporte lombar em cadeiras para reduzir sobrecarga torácica."
  },
  lombar: {
    title: "Coluna Lombar",
    description:
      "Suporta grande parte do peso corporal e influencia diretamente no alinhamento da pelve e quadris.",
    symptoms: [
      "Dor que irradia para glúteos ou pernas (ciatalgia)",
      "Dificuldade para levantar objetos ou permanecer sentado",
      "Sensação de rigidez ao acordar"
    ],
    care: [
      "Fortalecimento progressivo de glúteos e abdômen",
      "Educação em mecânica de levantamento de cargas",
      "Terapia manual aliada à liberação de pontos gatilho"
    ],
    callout:
      "Agende uma aula experimental de pilates terapêutico para recuperar estabilidade e mobilidade lombar."
  }
};

const detailsContainer = document.querySelector("#details");
const regionButtons = document.querySelectorAll(".spine-region");

const createCard = ({ title, description, symptoms, care, callout }) => {
  const symptomsItems = symptoms.map((item) => `<li>${item}</li>`).join("");
  const careItems = care.map((item) => `<li>${item}</li>`).join("");

  return `
    <article class="details-card">
      <div class="details-card__title">
        <span aria-hidden="true"></span>
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      </div>
      <div>
        <h3>Sintomas comuns</h3>
        <ul class="symptom-list">${symptomsItems}</ul>
      </div>
      <div>
        <h3>Cuidados recomendados</h3>
        <ul class="care-list">${careItems}</ul>
      </div>
      <div class="callout">
        <strong>Próximo passo</strong>
        <p>${callout}</p>
      </div>
    </article>
  `;
};

const selectRegion = (regionKey) => {
  const region = regions[regionKey];
  if (!region) return;

  detailsContainer.innerHTML = createCard(region);
  regionButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.region === regionKey);
  });
};

regionButtons.forEach((button) => {
  button.addEventListener("click", () => selectRegion(button.dataset.region));
  button.addEventListener("mouseenter", () => button.classList.add("hover"));
  button.addEventListener("mouseleave", () => button.classList.remove("hover"));
});

selectRegion("cervical");
