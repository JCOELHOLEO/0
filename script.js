const previewFrame = document.getElementById("previewFrame");
const actions = document.querySelectorAll(".actions button[data-template]");
const printButton = document.getElementById("printDocument");

const fields = [
  "patientName",
  "patientDocument",
  "patientBirth",
  "patientPhone",
  "diagnosis",
  "notes",
  "prescriptionText",
  "sadtProcedures",
  "sadtJustification",
];

const templates = {
  prescription: document.getElementById("template-prescription"),
  report: document.getElementById("template-report"),
  sadt: document.getElementById("template-sadt"),
};

let currentTemplate = "prescription";
let documentStyles = "";

fetch("styles.css")
  .then((response) => response.text())
  .then((text) => {
    documentStyles = text;
    buildDocument(currentTemplate);
  })
  .catch(() => {
    documentStyles = getFallbackStyles();
    buildDocument(currentTemplate);
  });

function getFallbackStyles() {
  const inline = document.querySelector("style[data-inline-document]");
  if (inline) return inline.textContent;
  return `@page { size: A4 portrait; margin: 15mm; }
  body { font-family: 'Times New Roman', Georgia, serif; }
  .document { width: 210mm; min-height: 297mm; padding: 20mm 18mm 25mm; }
  .document-body { display: flex; flex-direction: column; gap: 1rem; }
  .info-line { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .content-block { border: 1px solid #e4e4e7; border-radius: 12px; padding: 0.85rem 1rem; background: #fbfbfc; }
  .document-header, .document-footer { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }`;
}

function getFieldValue(field) {
  const element = document.getElementById(field);
  if (!element) return "";
  if (element.type === "date" && element.value) {
    const [year, month, day] = element.value.split("-");
    return `${day}/${month}/${year}`;
  }
  return element.value.trim();
}

function buildDocument(templateId) {
  currentTemplate = templateId;
  const template = templates[templateId];
  if (!template) return;

  const doc = template.content.cloneNode(true);
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  doc.querySelectorAll("[data-field]").forEach((node) => {
    const fieldName = node.getAttribute("data-field");
    if (fieldName === "currentDate") {
      node.textContent = formattedDate;
      return;
    }
    node.textContent = getFieldValue(fieldName);
  });

  renderOnFrame(doc);
}

function renderOnFrame(fragment) {
  const doc = previewFrame.contentDocument;
  if (!doc) return;

  const styles = documentStyles || getFallbackStyles();
  doc.open();
  doc.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" />
    <style>${styles}</style></head><body class="print-container"></body></html>`);
  doc.close();
  doc.body.appendChild(fragment);
}

function printDocument() {
  if (!previewFrame.contentWindow) return;
  previewFrame.contentWindow.focus();
  previewFrame.contentWindow.print();
}

actions.forEach((button) => {
  button.addEventListener("click", () => buildDocument(button.dataset.template));
});

fields.forEach((fieldId) => {
  const element = document.getElementById(fieldId);
  if (!element) return;
  element.addEventListener("input", () => buildDocument(currentTemplate));
  if (element.type === "date") {
    element.addEventListener("change", () => buildDocument(currentTemplate));
  }
});

printButton.addEventListener("click", printDocument);

// Render inicial em caso de falha no carregamento do CSS
setTimeout(() => {
  if (!previewFrame.contentDocument?.body?.children.length) {
    buildDocument(currentTemplate);
  }
}, 300);
