const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        // Padrão 3: Rótulo: "Texto Bíblico" ou "Texto Bíblico" (Rótulo) com aspas
        const match3 = line.match(/^([^:]+?):\\s*"(.+)"\\s*$/);
        const match4 = line.match(/^"([^"]+?)"\\s*(\\([^)]+\\))\\.?$/);`;

const replace1 = `        // Padrão 3: Rótulo: "Texto Bíblico" ou "Texto Bíblico" (Rótulo) com aspas
        const match3 = line.match(/^([^:]+?):\\s*"(.+)"\\s*$/);
        const match4 = line.match(/^"([^"]+?)"\\s*(\\([^)]+\\))\\.?$/);
        
        // Padrão 5: [ Texto ]: Rótulo. Explicação
        const match5 = line.match(/^\\[\\s*(.+?)\\s*\\]\\s*:\\s*(.*?)(?:\\.\\s+(.+))?$/);`;

const target2 = `        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const parenText = match4[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;
        }`;

const replace2 = `        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const parenText = match4[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;
        }
        
        if (match5 && match5[1].length < 350) {
          const bibleText = match5[1].trim();
          const boldText = match5[2].trim();
          const explText = match5[3] ? match5[3].trim() : "";
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong>\${explText ? \` <span class="note-paren">\${escapeHtml(explText)}</span>\` : ""}</div>\`;
        }`;

const target3 = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*(.*?)\\s*\\]\\s*(?:-->|—>|->|→|—|-)/g, "$1\\n[ $2 ] → ");`;

const replace3 = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*(.*?)\\s*\\]\\s*(-->|—>|->|→|—|-|:)/g, "$1\\n[ $2 ] $3 ");`;

code = code.replace(target1, replace1).replace(target2, replace2).replace(target3, replace3);

fs.writeFileSync('index.html', code);
console.log("Success fix match5");
