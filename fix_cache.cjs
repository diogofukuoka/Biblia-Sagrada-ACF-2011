const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        if (cached && Array.isArray(cached) && cached.length > 0) {
          if (cached.length === 1 && expectedVerses > 1) {
            console.warn("Cache incompleto detectado, buscando novamente na API.");
          } else {
            return cached;
          }
        }`;

const replace = `        if (cached && Array.isArray(cached) && cached.length > 0) {
          // Invalida cache se tiver menos versículos que o esperado (margem de tolerância de 1 versículo por causa de diferença de traduções, mas se for muito menor é erro)
          if (cached.length < expectedVerses - 2) {
            console.warn("Cache incompleto detectado (" + cached.length + " vs " + expectedVerses + "), buscando novamente.");
          } else if (cached.length <= 2 && expectedVerses > 2) {
             console.warn("Cache corrompido detectado, buscando novamente.");
          } else {
            return cached;
          }
        }`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix cache logic");
