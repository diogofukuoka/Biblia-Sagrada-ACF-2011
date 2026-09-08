const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCSS = `    .mobile-notes-feed {
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
    }`;
const replaceCSS = `    .mobile-notes-feed {
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
      position: relative;
    }`;
code = code.replace(targetCSS, replaceCSS);

const targetScrollLogic = `                // Force parent container to not scroll down accidentally
                const parent = document.querySelector(".notes-content");
                if (parent) parent.scrollTop = 0;
                
                // Disable smooth scroll temporarily
                const originalBehavior = container.style.scrollBehavior || '';
                container.style.scrollBehavior = 'auto';
                
                // Força layout antes de calcular
                void container.offsetHeight; 
                
                // Use built-in scrollIntoView for perfect alignment
                target.scrollIntoView({ behavior: 'auto', block: 'start' });
                
                // Ajuste fino para não colar no topo (compensa padding superior)
                container.scrollTop = Math.max(0, container.scrollTop - 20);
                
                container.style.scrollBehavior = originalBehavior;`;

const replaceScrollLogic = `                // Força o contêiner pai a não rolar
                const parent = document.querySelector(".notes-content");
                if (parent) parent.scrollTop = 0;
                
                // Desativa rolagem suave temporariamente para salto instantâneo
                const originalBehavior = container.style.scrollBehavior || '';
                container.style.scrollBehavior = 'auto';
                
                // Calcula a distância usando offsetTop, que é imune a bugs de transição CSS (como scale/transform do sidebar)
                let current = target;
                let offsetTop = 0;
                while (current && current !== container) {
                   offsetTop += current.offsetTop || 0;
                   current = current.offsetParent;
                }
                
                // Ajusta scrollTop
                container.scrollTop = Math.max(0, offsetTop - 20);
                
                // Restaura o comportamento
                container.style.scrollBehavior = originalBehavior;`;

code = code.replace(targetScrollLogic, replaceScrollLogic);

fs.writeFileSync('index.html', code);
console.log("Success patch ipad scroll");
