const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        // (depois de ponto final, parenteses ou colchete de fechamento)
        textToProcess = textToProcess.replace(/([.)\\]])\\s*"/g, "$1\\n\\"");`;

const replace = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        // (depois de ponto final, parenteses ou colchete de fechamento, e APENAS se for seguido de uma letra/numero - indicando início de frase)
        textToProcess = textToProcess.replace(/([.)\\]])\\s*"(?=[a-zA-Z0-9\\s])/g, "$1\\n\\"");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix newline regex");
