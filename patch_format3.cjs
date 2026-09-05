const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
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

const replace1 = `        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
        // Suporta formatação do tipo: [ [texto] — Rótulo ] (Rótulo 2)
        // Divide pela PRIMEIRA ocorrência do separador (→|->|—>|-->|→|—) que estiver fora de colchetes, ou assume o separador mais evidente
        const match = line.match(/^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—)\\s*(.+)$/);
        if (match) {
          // No match, group 1 é o texto antes do traço/seta, group 2 é o texto depois.
          // Mas se o texto bíblico tinha hífen (ex: "rogo-te"), o regex simples falha.
          // Vamos usar um split mais inteligente abaixo caso esse regex engula hífens internos.
        }

        // Nova lógica de Parse mais robusta
        let parsed = false;
        let bibleText = "";
        let boldText = "";
        let parenText = "";
        
        // Vamos procurar os delimitadores principais: " — " ou " -> " ou " → " ou " --> "
        const delimiterRegex = /\\s+(?:—|->|→|-->|—>)\\s+/;
        const parts = line.split(delimiterRegex);
        
        if (parts.length >= 2) {
           // O que vem antes do delimitador é a Bíblia. O que vem depois é a explicação.
           bibleText = parts[0];
           let rest = parts.slice(1).join(" - "); // Junta de volta se houver mais de um delimitador
           
           // Limpeza da Bíblia: remove todos os colchetes do início e do final
           bibleText = bibleText.replace(/^\\[\\s*\\[?\\s*/, '').replace(/\\s*\\]?\\s*\\]?$/, '').trim();
           
           // Limpeza do Resto:
           // O "rest" pode terminar com algo como "] (Exortação)"
           const parenMatch = rest.match(/^(.*?)(?:\\s*\\]?\\s*(\\(.*\\)))?\\s*\\]?$/);
           if (parenMatch && parenMatch[2]) {
              boldText = parenMatch[1].replace(/\\]\\s*$/, '').trim();
              parenText = parenMatch[2].trim();
           } else {
              boldText = rest.replace(/\\]\\s*$/, '').trim();
           }
           
           return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong>\${parenText ? \` <span class="note-paren">\${escapeHtml(parenText)}</span>\` : ""}</div>\`;
        }`;

if (code.includes(target1)) {
    code = code.replace(target1, replace1);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
