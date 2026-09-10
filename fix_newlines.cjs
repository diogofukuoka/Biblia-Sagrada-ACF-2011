const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        textToProcess = textToProcess.replace(/(\\)\\.)\\s*"/g, "$1\\n\\""); // Depois de um ponto final que fecha um parenteses
        textToProcess = textToProcess.replace(/([a-zA-Z0-9)])\\s*(")/g, "$1\\n$2"); // Depois de caracteres alfa e antes de aspas duplas`;

const replace = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        // (depois de ponto final, parenteses ou colchete de fechamento)
        textToProcess = textToProcess.replace(/([.)\\]])\\s*"/g, "$1\\n\\"");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix newlines");
