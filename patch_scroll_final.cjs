const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScroll = `                // Calculate absolute distance between target top and container top
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                
                // Scroll container exactly to the item
                container.scrollTop = Math.max(0, offset - 20);`;

const replaceScroll = `                // Força layout antes de calcular
                void container.offsetHeight; 
                
                // Use built-in scrollIntoView for perfect alignment
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
                
                // Ajuste fino para não colar no topo (compensa padding superior)
                container.scrollTop = Math.max(0, container.scrollTop - 20);`;

code = code.replace(targetScroll, replaceScroll);
fs.writeFileSync('index.html', code);
console.log("Success patch final scroll");
