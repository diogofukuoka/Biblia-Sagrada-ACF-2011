const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        if (line.length < 150) {
          if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
            return \`<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>\`;
          }
          if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
            return \`<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>\`;
          }
        }`;

const replace1 = `        if (line.length < 350) {
          if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
            return \`<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>\`;
          }
          if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
            return \`<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>\`;
          }
        }`;

code = code.replace(target1, replace1);

const target2 = `        const delimiterRegex = /\\s+(?:—|->|→|-->|—>)\\s+/;
        const parts = line.split(delimiterRegex);
        
        if (parts.length >= 2 && parts[0].length < 350) {`;

const replace2 = `        // Aprimorado para capturar delimitadores colados no colchete ex: "[ texto ]- explicação"
        const delimiterRegex = /\\s*(?:—|->|→|-->|—>|-)\\s+/;
        const parts = line.split(delimiterRegex);
        
        // Verifica se a primeira parte possui a estrutura básica de um texto bíblico antes de aplicar
        if (parts.length >= 2 && parts[0].length < 350 && line.includes('[')) {`;

code = code.replace(target2, replace2);

fs.writeFileSync('index.html', code);
console.log("Success fix parsing headers");
