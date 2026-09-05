const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Padrão: [ bíblia ] → ou -> frase (comentário)
        const match = line.match(/^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->)\\s*(.+)$/);
        if (match) {
          const bibleText = match[1].trim();
          const rest = match[2].trim();

          // Verifica se há parênteses na explicação: e.g. "O Maior Convite (Ação de Fé)"
          const parenMatch = rest.match(/^([^(]+?)(?:\\s*(\\(.*\\)))?$/);
          let boldText = rest;
          let parenText = "";

          if (parenMatch) {
            boldText = parenMatch[1].trim();
            parenText = parenMatch[2] ? parenMatch[2].trim() : "";
          }

          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong>\${parenText ? \` <span class="note-paren">\${escapeHtml(parenText)}</span>\` : ""}</div>\`;
        }

        // Linha regular de comentário
        return \`<div class="note-line">\${escapeHtml(line)}</div>\`;`;

const replace = `        // Padrão 1: [ bíblia ] → ou -> frase (comentário)
        const match = line.match(/^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->)\\s*(.+)$/);
        if (match) {
          const bibleText = match[1].trim();
          const rest = match[2].trim();

          // Verifica se há parênteses na explicação: e.g. "O Maior Convite (Ação de Fé)"
          const parenMatch = rest.match(/^([^(]+?)(?:\\s*(\\(.*\\)))?$/);
          let boldText = rest;
          let parenText = "";

          if (parenMatch) {
            boldText = parenMatch[1].trim();
            parenText = parenMatch[2] ? parenMatch[2].trim() : "";
          }

          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong>\${parenText ? \` <span class="note-paren">\${escapeHtml(parenText)}</span>\` : ""}</div>\`;
        }
        
        // Padrão 2: Texto Bíblico (Rótulo) - colado diretamente de ferramentas de Phrasing
        // Ex: Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)
        const match2 = line.match(/^([^(]+?)\\s*(\\(.+?\\))\\.?$/);
        if (match2) {
          const bibleText = match2[1].trim();
          const boldText = match2[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }

        // Linha regular de comentário
        return \`<div class="note-line">\${escapeHtml(line)}</div>\`;`;

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
