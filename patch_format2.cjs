const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
        // Suporta travessão simples também: [texto] — Rótulo
        // Suporta formatação do tipo: [ [texto] — Rótulo ] (Rótulo 2)
        const match = line.match(/^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/);
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
        }`;

const replace1 = `        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
        // Suporta formatação do tipo: [ [texto] — Rótulo ] (Rótulo 2)
        const match = line.match(/^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/);
        if (match) {
          // Limpa colchetes residuais caso o regex não tenha pegado direito
          let bibleText = match[1].replace(/^\\[|\\]$/g, '').trim(); 
          let rest = match[2].replace(/^\\]\\s*/, '').trim();

          // Verifica se há parênteses ou colchetes extras na explicação final
          // Exemplo 1: Contraste Negativo
          // Exemplo 2: Afirmação ] (Causa da Exortação)
          let boldText = rest;
          let parenText = "";
          
          // Se o "rest" terminar com (Texto) ou tiver " ] (Texto)"
          const parenMatch = rest.match(/^(.*?)(?:\\s*\\]?\\s*(\\(.*\\)))?\\s*\\]?$/);
          if (parenMatch && parenMatch[2]) {
             boldText = parenMatch[1].replace(/\\]\\s*$/, '').trim();
             parenText = parenMatch[2].trim();
          }

          // Adicionamos a setinha padrão no lugar do travessão
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong>\${parenText ? \` <span class="note-paren">\${escapeHtml(parenText)}</span>\` : ""}</div>\`;
        }`;

if (code.includes(target1)) {
    code = code.replace(target1, replace1);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
