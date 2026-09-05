const lines = [
  "Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)",
  "[ Por amor da verdade ] -> A Motivação e o Fundamento Absoluto"
];

function format(line) {
  // Padrão 1: [ bíblia ] → ou -> frase (comentário)
  const match1 = line.match(/^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->)\s*(.+)$/);
  if (match1) {
    const bibleText = match1[1].trim();
    const rest = match1[2].trim();
    const parenMatch = rest.match(/^([^(]+?)(?:\s*(\(.*\)))?$/);
    let boldText = rest;
    let parenText = "";
    if (parenMatch) {
      boldText = parenMatch[1].trim();
      parenText = parenMatch[2] ? parenMatch[2].trim() : "";
    }
    return `[ <em>${bibleText}</em> ] <span class="note-arrow">→</span> <strong>${boldText}</strong>${parenText ? ` <span class="note-paren">${parenText}</span>` : ""}`;
  }

  // Padrão 2: texto bíblico (comentário)
  const match2 = line.match(/^([^(]+?)\s*\((.+?)\)$/);
  if (match2) {
    const bibleText = match2[1].trim();
    const boldText = match2[2].trim();
    return `[ <em>${bibleText}</em> ] <strong>(${boldText})</strong>`;
  }
}

for (const line of lines) {
  console.log(format(line));
}
