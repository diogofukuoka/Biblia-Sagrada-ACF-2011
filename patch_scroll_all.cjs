const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. In renderCurrentChapter
const targetRender1 = `              // block: "start" pode esconder atrás do header, usar cálculo relativo ao container
              const readerContainer = document.getElementById('bible-reader');
              if (readerContainer) { 
                 const containerRect = readerContainer.getBoundingClientRect();
                 const elementRect = targetEl.getBoundingClientRect();
                 const scrollPos = readerContainer.scrollTop + elementRect.top - containerRect.top - 20; 
                 readerContainer.scrollTo({ top: scrollPos, behavior: "auto" });
              } else {
                 targetEl.scrollIntoView({ behavior: "auto", block: "start" });
              }`;

const replaceRender1 = `              // Rola perfeitamente sem se esconder, pois o header está fora do readerContainer
              targetEl.scrollIntoView({ behavior: "auto", block: "start" });`;

// 2. In openNotesSidebar (click on feed header)
const targetRender2 = `                // O container com overflow-y: auto é o main.reader-container e não a window
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

const replaceRender2 = `                targetVEl.scrollIntoView({ behavior: 'smooth', block: 'start' });`;

// 3. In openNotesSidebar (auto scroll feed to target)
const targetRender3 = `        setTimeout(() => {
          if (isMobileFeed && mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${verse}\`);
            if (target) {
              mobileFeed.scrollTo({ top: target.offsetTop - 10, behavior: 'smooth' });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          }`;

const replaceRender3 = `        setTimeout(() => {
          if (isMobileFeed && mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${verse}\`);
            if (target) {
              target.scrollIntoView({ behavior: 'auto', block: 'start' });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          }`;
          
const targetTimeout = `setTimeout(() => {
            const targetEl = document.getElementById(\`v-\${state.currentChapter}-\${state.targetVerse}\`);`;
const replaceTimeout = `setTimeout(() => {
            const targetEl = document.getElementById(\`v-\${state.currentChapter}-\${state.targetVerse}\`);`;


if (code.includes(targetRender1) && code.includes(targetRender2) && code.includes(targetRender3)) {
    code = code.replace(targetRender1, replaceRender1);
    code = code.replace(targetRender2, replaceRender2);
    code = code.replace(targetRender3, replaceRender3);
    // Let's also replace the 200ms timeout with 400ms to guarantee DOM layout is ready for heavy chapters
    code = code.replace('setTimeout(() => {\n            const targetEl', 'setTimeout(() => {\n            const targetEl'); // Just checking, I'll replace it below
    code = code.replace('          }, 200);\n        } else {\n          const scrollContainer = document.getElementById(\'bible-reader\');', '          }, 400);\n        } else {\n          const scrollContainer = document.getElementById(\'bible-reader\');');
    
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(targetRender1)) console.log("Missing targetRender1");
    if (!code.includes(targetRender2)) console.log("Missing targetRender2");
    if (!code.includes(targetRender3)) console.log("Missing targetRender3");
}
