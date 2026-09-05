const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `                // Vamos calcular a posição exata e rolar o container apropriado (window ou main)
                const headerOffset = 64 + 16; // 64px header height + 16px padding
                const elementPosition = targetVEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });`;

const replaceJs = `                // O container com overflow-y: auto é o main.reader-container e não a window
                const readerContainer = document.getElementById('bible-reader');
                if (readerContainer) {
                   const headerOffset = 64; // 64px header height 
                   // Pega a posição relativa ao container scrollável
                   const containerRect = readerContainer.getBoundingClientRect();
                   const elementRect = targetVEl.getBoundingClientRect();
                   
                   // Calcula o quanto precisamos rolar: scroll atual + posição do elemento na tela - topo do container - offset do header
                   const scrollPos = readerContainer.scrollTop + elementRect.top - containerRect.top - 20; 
                   
                   readerContainer.scrollTo({
                        top: scrollPos,
                        behavior: "smooth"
                   });
                } else {
                   targetVEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
