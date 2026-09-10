const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const t5 = `        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(\\d+-\\s*Diagramador B[íi]blico)/gi, "$1\\n$2");
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(\\d+-\\s*An[áa]lise de Fraseamento)/gi, "$1\\n$2");`;

const r5 = `        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(?:\\d+-)?\\s*(Diagramador B[íi]blico)/gi, "$1\\nI. $2");
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(?:\\d+-)?\\s*(An[áa]lise de Fraseamento)/gi, "$1\\nII. $2");
        
        // Remove numeração indesejada colada em títulos (como 7- Diagramador ou 8- Análise) no inicio da linha
        textToProcess = textToProcess.replace(/^\\s*\\d+-\\s*(Diagramador B[íi]blico)/gim, "I. $1");
        textToProcess = textToProcess.replace(/^\\s*\\d+-\\s*(An[áa]lise de Fraseamento)/gim, "II. $1");`;
        
code = code.replace(t5, r5);
fs.writeFileSync('index.html', code);
console.log("Success fix replace all");
