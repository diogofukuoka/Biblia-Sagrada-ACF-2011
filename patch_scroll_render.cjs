const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `              // block: "start" garante que o versículo apareça perfeitamente no topo da área de leitura
              targetEl.scrollIntoView({ behavior: "smooth", block: "start" });`;

const replaceJs = `              // block: "start" pode esconder atrás do header, usar cálculo relativo ao container
              const readerContainer = document.getElementById('bible-reader');
              if (readerContainer) {
                 const containerRect = readerContainer.getBoundingClientRect();
                 const elementRect = targetEl.getBoundingClientRect();
                 const scrollPos = readerContainer.scrollTop + elementRect.top - containerRect.top - 20; 
                 readerContainer.scrollTo({ top: scrollPos, behavior: "smooth" });
              } else {
                 targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
              }`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
