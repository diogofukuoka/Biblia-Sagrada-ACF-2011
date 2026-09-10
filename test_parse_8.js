      function formatCommentToHtml(rawContent) {
        if (!rawContent) return "";
        let textToProcess = rawContent;
        
        // Se vier HTML, limpa mantendo as quebras lógicas
        if (rawContent.includes('<div') || rawContent.includes('<p>') || rawContent.includes('<br>')) {
          const temp = document.createElement("div");
          // Substitui divs e brs por quebras reais antes de extrair texto
          let preProcessed = rawContent.replace(/<br\s*\/?>/gi, "\n");
          preProcessed = preProcessed.replace(/<\/div>/gi, "\n");
          preProcessed = preProcessed.replace(/<\/p>/gi, "\n");
          temp.innerHTML = preProcessed;
          textToProcess = temp.innerText || temp.textContent || "";
        }
        
        // FIX: Se o texto for colado como um único bloco maciço sem quebras de linha (ex: copiado do prompt sem formatação)
        // Precisamos injetar quebras de linha antes de cada colchete de abertura '[' que indique o início de uma análise,
        // E antes dos numerais de título como "7- Diagramador" ou "8- Análise"
        // E injetar quebra depois de ')' no final da análise, ou antes do próximo colchete.
        
        // 1. Quebra antes de títulos conhecidos (mesmo que estejam misturados)
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\s*(?:\d+-)?\s*(Diagramador B[íi]blico)/gi, "$1\nI. $2");
        textToProcess = textToProcess.replace(/([A-Za-z0-9)])\s*(?:\d+-)?\s*(An[áa]lise de Fraseamento)/gi, "$1\nII. $2");
        
        // Remove numeração indesejada colada em títulos (como 7- Diagramador ou 8- Análise) no inicio da linha
        textToProcess = textToProcess.replace(/^\s*\d+-\s*(Diagramador B[íi]blico)/gim, "I. $1");
        textToProcess = textToProcess.replace(/^\s*\d+-\s*(An[áa]lise de Fraseamento)/gim, "II. $1");
        
        // 2. Quebra antes de qualquer bloco de colchete que pareça uma análise
        // Ex: "Congregação.[ declararei ]" -> "Congregação.\n[ declararei ]"
        textToProcess = textToProcess.replace(/([^\n])\s*\[\s*([^\]]+)\s*\]\s*(?:-|—|->|→|—>)/g, "$1\n[ $2 ] →");
        
        // 3. Quebra depois de parênteses de fechamento que pareçam fim de uma explicação e antes do próximo colchete
        textToProcess = textToProcess.replace(/\)\s*\[/g, ")\n[");
        
        // 4. Quebra antes de textos que começam com aspas no fraseamento
        textToProcess = textToProcess.replace(/(\)\.)\s*"/g, "$1\n\""); // Depois de um ponto final que fecha um parenteses
        textToProcess = textToProcess.replace(/([a-zA-Z0-9)])\s+("/g, "$1\n$2"); // Depois de espacos e antes de aspas duplas, se houver um texto antes
        
        // Separação de versículo colado no título: VersículosSalmos 22:22
        textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)([A-Z][a-z]+ \d+:\d+)/gi, "$1\n$2\n");
        const lines = textToProcess.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        let result = [];
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i].trim();
          if (!l) {
            let prevIsPhrasing = false;
            for (let j = i - 1; j >= 0; j--) {
              if (lines[j].trim()) {
                const prev = lines[j].trim();
                prevIsPhrasing = /^\s*\[?\s*\[?\s*(.+?)\s*\]?\s*(?:→|->|—>|-->|→|—|-)\s*(.+)$/.test(prev) || 
                                 /^([^(]+?)\s*(\(.+?\))\.?$/.test(prev) ||
                                 /^([^:]+?):\s*".+"\s*$/.test(prev) ||
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);
                break;
              }
            }
            let nextIsPhrasing = false;
