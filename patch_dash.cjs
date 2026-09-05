const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Patching formatCommentLine regex
const target1 = `        // Padrão 1: [ bíblia ] → ou -> frase (comentário)
        const match = line.match(/^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->)\\s*(.+)$/);`;
        
const replace1 = `        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
        // Suporta travessão simples também: [texto] — Rótulo
        // Suporta formatação do tipo: [ [texto] — Rótulo ] (Rótulo 2)
        const match = line.match(/^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/);`;

// Patching formatCommentToHtml regexes for blank lines
const target2 = `                prevIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(prev) ||`;
const replace2 = `                prevIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(prev) ||`;

const target3 = `                nextIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(next);`;
const replace3 = `                nextIsPhrasing = /^\\s*\\[?\\s*\\[?\\s*(.+?)\\s*\\]?\\s*(?:→|->|—>|-->|→|—|-)\\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(next);`;


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
