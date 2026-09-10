const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*(.*?)\\s*\\]\\s*(-->|—>|->|→|—|-|:)/g, "$1\\n[ $2 ] $3 ");`;

const replace = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n\\[\\s])\\s*\\[\\s*([^\\[\\]]+?)\\s*\\]\\s*(-->|—>|->|→|—|-|:)/g, "$1\\n[ $2 ] $3 ");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix rule 2");
