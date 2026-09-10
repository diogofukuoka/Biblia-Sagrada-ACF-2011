const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `      function formatCommentLine(rawLine) {
        if (!rawLine.trim()) return "";
        let line = rawLine.trim();

        // 1. Ignorar numerações no início da linha de forma segura
        const numberMatch = line.match(/^\\d+\\.\\s+(.+)/);
        if (numberMatch) {
          line = numberMatch[1]; // Exclui a numeração "1. ", "2. ", mantendo o resto da linha
          // Vamos usar um split mais inteligente abaixo caso esse regex engula hífens internos.
        }

        // Nova lógica de Parse mais robusta
        let parsed = false;
        let bibleText = "";
        let boldText = "";
        let parenText = "";`;

const replace = `      function formatCommentLine(rawLine) {
        if (!rawLine.trim()) return "";
        let line = rawLine.trim();

        // 1. Ignorar numerações no início da linha de forma segura
        const numberMatch = line.match(/^\\d+\\.\\s+(.+)/);
        if (numberMatch) {
          line = numberMatch[1]; // Exclui a numeração "1. ", "2. ", mantendo o resto da linha
        }
        
        // Padrão 6: ["Texto"] -> Rótulo: Explicação ] -> (Extra)
        const match6 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*([^:]+?)\\s*:\\s*(.+?)\\s*(?:\\]\\s*(?:-->|—>|->|→|-)\\s*(.+))?$/);
        if (match6 && match6[1].length < 350) {
          const bibleText = match6[1].trim();
          const boldText = match6[2].trim();
          let explText = match6[3].trim();
          let extraParen = match6[4] ? match6[4].trim() : "";
          if (extraParen && !explText.endsWith('.')) {
             explText += ".";
          }
          return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong> <span class="note-paren">\${escapeHtml(explText)} \${escapeHtml(extraParen)}</span></div>\`;
        }

        // Nova lógica de Parse mais robusta
        let parsed = false;
        let bibleText = "";
        let boldText = "";
        let parenText = "";`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix match6");
