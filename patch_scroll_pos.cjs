const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Atualiza o realce visual permanente`;

const replaceJs = `              if (targetVEl) {
                // Ao invés de usar scrollIntoView (que tem bugs com sticky headers ou position absolute),
                // Vamos calcular a posição exata e rolar o container apropriado (window ou main)
                const headerOffset = 64 + 16; // 64px header height + 16px padding
                const elementPosition = targetVEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
                
                // Atualiza o realce visual permanente`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success JS");
} else {
    console.log("Target JS not found");
}

const targetCss = `      scroll-margin-top: 80px;`;
const replaceCss = `      scroll-margin-top: 100px;`;

if (code.includes(targetCss)) {
    code = code.replace(targetCss, replaceCss);
    fs.writeFileSync('index.html', code);
    console.log("Success CSS");
} else {
    console.log("Target CSS not found");
}
