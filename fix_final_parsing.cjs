const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*([^\\]]+)\\s*\\]\\s*(?:-|—|->|→|—>)/g, "$1\\n[ $2 ] →");`;

const replace1 = `        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*(.*?)\\s*\\]\\s*(?:-->|—>|->|→|—|-)/g, "$1\\n[ $2 ] → ");`;

const target2 = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        textToProcess = textToProcess.replace(/(\\)\\.)\\s*"/g, "$1\\n\\""); // Depois de um ponto final que fecha um parenteses
        textToProcess = textToProcess.replace(/([a-zA-Z0-9)])\\s+("/g, "$1\\n$2"); // Depois de espacos e antes de aspas duplas, se houver um texto antes
        
        // Separação de versículo colado no título: VersículosSalmos 22:22
        textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)([A-Z][a-z]+ \\d+:\\d+)/gi, "$1\\n$2\\n");`;

const replace2 = `        // 4. Quebra antes de textos que começam com aspas no fraseamento
        textToProcess = textToProcess.replace(/(\\)\\.)\\s*"/g, "$1\\n\\""); // Depois de um ponto final que fecha um parenteses
        textToProcess = textToProcess.replace(/([a-zA-Z0-9)])\\s*("/g, "$1\\n$2"); // Depois de caracteres alfa e antes de aspas duplas
        
        // Separação de versículo colado no título: VersículosSalmos 22:22
        textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)\\s*([1-3]?\\s*[A-Z][a-zãéíóú]+\\s+\\d+:\\d+(?:-\\d+)?)/gi, "$1\\n$2\\n");`;

code = code.replace(target1, replace1).replace(target2, replace2);

fs.writeFileSync('index.html', code);
console.log("Success fix final parsing");
