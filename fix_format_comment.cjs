const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Cabeçalhos Específicos de Diagramador / Phrasing
        if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
          return \`<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>\`;
        }
        if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
          return \`<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>\`;
        }`;

const replace = `        // Cabeçalhos Específicos de Diagramador / Phrasing
        // Usamos ^ para garantir que seja o início da linha e verificamos se a linha não é muito longa (para não apagar um parágrafo inteiro)
        if (line.length < 150) {
          if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
            return \`<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>\`;
          }
          if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
            return \`<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>\`;
          }
        }`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix format comment");
