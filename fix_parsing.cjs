const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// We need to rewrite formatCommentToHtml to handle text that comes in without newlines
// by inserting newlines where logical markers exist before splitting.
const target = `      function formatCommentToHtml(rawContent) {
        if (!rawContent) return "";
        let textToProcess = rawContent;
        if (rawContent.includes('<div') || rawContent.includes('<p>') || rawContent.includes('<br>')) {
          const temp = document.createElement("div");
          temp.innerHTML = rawContent;
          textToProcess = temp.innerText || temp.textContent || "";
        }`;

const replace = `      function formatCommentToHtml(rawContent) {
        if (!rawContent) return "";
        let textToProcess = rawContent;
        
        // Se vier HTML, limpa mantendo as quebras lógicas
        if (rawContent.includes('<div') || rawContent.includes('<p>') || rawContent.includes('<br>')) {
          const temp = document.createElement("div");
          // Substitui divs e brs por quebras reais antes de extrair texto
          let preProcessed = rawContent.replace(/<br\\s*\\/?>/gi, "\\n");
          preProcessed = preProcessed.replace(/<\\/div>/gi, "\\n");
          preProcessed = preProcessed.replace(/<\\/p>/gi, "\\n");
          temp.innerHTML = preProcessed;
          textToProcess = temp.innerText || temp.textContent || "";
        }
        
        // FIX: Se o texto for colado como um único bloco maciço sem quebras de linha (ex: copiado do prompt sem formatação)
        // Precisamos injetar quebras de linha antes de cada colchete de abertura '[' que indique o início de uma análise,
        // E antes dos numerais de título como "7- Diagramador" ou "8- Análise"
        // E injetar quebra depois de ')' no final da análise, ou antes do próximo colchete.
        
        // 1. Quebra antes de títulos conhecidos (mesmo que estejam misturados)
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(\\d+-\\s*Diagramador B[íi]blico)/gi, "$1\\n$2");
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\\s*(\\d+-\\s*An[áa]lise de Fraseamento)/gi, "$1\\n$2");
        
        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\\n])\\s*\\[\\s*([^\\]]+)\\s*\\]\\s*(?:-|—|->|→|—>)/g, "$1\\n[ $2 ] →");
        
        // 3. Quebra depois de parênteses de fechamento que pareçam fim de uma explicação e antes do próximo colchete
        textToProcess = textToProcess.replace(/\\)\\s*\\[/g, ")\\n[");
        
        // 4. Quebra antes de textos que começam com aspas no fraseamento
        textToProcess = textToProcess.replace(/\\)\\s*"/g, ")\\n\\"");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix parsing");
