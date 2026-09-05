const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `            let prevIsPhrasing = false;
            for (let j = i - 1; j >= 0; j--) {
              if (lines[j].trim()) {
                const prev = lines[j].trim();
                prevIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(prev) || 
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);
                break;
              }
            }
            let nextIsPhrasing = false;
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].trim()) {
                const next = lines[j].trim();
                nextIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(next);
                break;
              }
            }`;

const replace = `            let prevIsPhrasing = false;
            for (let j = i - 1; j >= 0; j--) {
              if (lines[j].trim()) {
                const prev = lines[j].trim();
                prevIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(prev) ||
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);
                break;
              }
            }
            let nextIsPhrasing = false;
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].trim()) {
                const next = lines[j].trim();
                nextIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\\s*(\\(.+?\\))\\.?$/.test(next);
                break;
              }
            }`;

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
