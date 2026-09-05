const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        // Padrão 2: Texto Bíblico (Rótulo) - colado diretamente de ferramentas de Phrasing
        // Ex: Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)
        const match2 = line.match(/^([^(]+?)\\s*(\\(.+?\\))\\.?$/);
        if (match2) {
          const bibleText = match2[1].trim();
          const boldText = match2[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;

const replace1 = `        // Padrão 2: Texto Bíblico (Rótulo) - colado diretamente de ferramentas de Phrasing
        // Ex: Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)
        const match2 = line.match(/^([^(]+?)\\s*(\\(.+?\\))\\.?$/);
        if (match2) {
          const bibleText = match2[1].trim();
          const boldText = match2[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }

        // Padrão 3: Rótulo: "Texto Bíblico"
        // Ex: Condição Negativa: "Todo aquele que prevarica"
        const match3 = line.match(/^([^:]+?):\\s*"(.+)"\\s*$/);
        if (match3) {
          const boldText = match3[1].trim();
          const bibleText = match3[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;

const target2 = `                prevIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(prev) ||
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);`;

const replace2 = `                prevIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(prev) ||
                                 /^([^:]+?):\\s*".+"\\s*$/.test(prev) ||
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);`;

const target3 = `                nextIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(next);`;

const replace3 = `                nextIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(next) ||
                                 /^([^:]+?):\\s*".+"\\s*$/.test(next);`;

if (code.includes(target1) && code.includes(target2) && code.includes(target3)) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    code = code.replace(target3, replace3);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(target1)) console.log("Target 1 missing");
    if (!code.includes(target2)) console.log("Target 2 missing");
    if (!code.includes(target3)) console.log("Target 3 missing");
}
