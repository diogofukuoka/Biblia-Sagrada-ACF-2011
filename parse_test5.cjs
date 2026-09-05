const { JSDOM } = require("jsdom");

function escapeHtml(unsafe) {
  return (unsafe || "").toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCommentLine(rawLine) {
  const line = rawLine.trim();
  if (!line) return '<div class="note-spacer"><br></div>';

  if (line.includes('note-verse-analysis') || (line.includes('<em>') && line.includes('<strong>'))) {
    return line.startsWith('<div') ? line : `<div class="note-line note-verse-analysis">${line}</div>`;
  }

  if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
    return `<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>`;
  }
  if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
    return `<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>`;
  }

  const match = line.match(/^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->)\s*(.+)$/);
  if (match) {
    const bibleText = match[1].trim();
    const rest = match[2].trim();
    const parenMatch = rest.match(/^([^(]+?)(?:\s*(\(.*\)))?$/);
    let boldText = rest;
    let parenText = "";
    if (parenMatch) {
      boldText = parenMatch[1].trim();
      parenText = parenMatch[2] ? parenMatch[2].trim() : "";
    }
    return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}</strong>${parenText ? ` <span class="note-paren">${escapeHtml(parenText)}</span>` : ""}</div>`;
  }
  return `<div class="note-line">${escapeHtml(line)}</div>`;
}

function formatCommentToHtml(rawContent) {
  if (!rawContent) return "";
  let textToProcess = rawContent;
  if (rawContent.includes('<div') || rawContent.includes('<p>') || rawContent.includes('<br>')) {
    const dom = new JSDOM(`<!DOCTYPE html><body>${rawContent}</body>`);
    const temp = dom.window.document.body;
    textToProcess = temp.textContent || "";
  }
  const lines = textToProcess.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  return lines.map(l => formatCommentLine(l)).join("");
}

const input = `7. Diagramador Bíblico / Analista de Versículos
2 João 1:1
[ O ancião ] → A Autoridade Apostólica e Maturidade
[ à senhora eleita, ] → O Alvo da Graça (A Igreja / Corpo de CRISTO)`;

const firstPass = formatCommentToHtml(input);
console.log("FIRST PASS:");
console.log(firstPass);

const secondPass = formatCommentToHtml(firstPass);
console.log("\nSECOND PASS:");
console.log(secondPass);
