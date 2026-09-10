const escapeHtml = (str) => str;
function formatCommentLine(rawLine) {
        let line = rawLine.trim();
        if (!line) return '<div class="note-spacer"><br></div>';

        // Remove marcações Markdown de negrito e itálico para não sujar os regex de formatação visual
        line = line.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

        // Cabeçalhos Específicos de Diagramador / Phrasing
        // Usamos ^ para garantir que seja o início da linha e verificamos se a linha não é muito longa (para não apagar um parágrafo inteiro)
        if (line.length < 350) {
          if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
            return `<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>`;
          }
          if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
            return `<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>`;
          }
        }

        // Se já contém marcação HTML de versículo analisado
        if (line.includes('note-verse-analysis') || (line.includes('<em>') && line.includes('<strong>'))) {
          return line.startsWith('<div') ? line : `<div class="note-line note-verse-analysis">${line}</div>`;
        }

        // Padrão 1: [ bíblia ] → ou -> ou — frase (comentário)
        // Suporta formatação do tipo: [ [texto] — Rótulo ] (Rótulo 2)
        // Divide pela PRIMEIRA ocorrência do separador (→|->|—>|-->|→|—) que estiver fora de colchetes, ou assume o separador mais evidente
        const match = line.match(/^\s*\[?\s*\[?\s*(.+?)\s*\]?\s*(?:→|->|—>|-->|→|—)\s*(.+)$/);
        if (match) {
          // No match, group 1 é o texto antes do traço/seta, group 2 é o texto depois.
          // Mas se o texto bíblico tinha hífen (ex: "rogo-te"), o regex simples falha.
          // Vamos usar um split mais inteligente abaixo caso esse regex engula hífens internos.
        }

        // Padrão 9: [ Texto Bíblico ] -> [ Rótulo ]
        const match9 = line.match(/^\[?\s*([^\]]+?)\s*\]\s*(?:-->|—>|->|→|-)\s*\[\s*(.+?)\s*\]$/);
        if (match9 && match9[1].length < 350) {
          const bibleText = match9[1].trim();
          const boldText = match9[2].trim();
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}</strong></div>`;
        }

        // Padrão 10: [ [ Rótulo ] : "Texto Bíblico" ] -> (Explicação)
        const match10 = line.match(/^\[\s*\[\s*(.+?)\s*\]\s*:\s*"([^"]+)"\s*\]\s*(?:-->|—>|->|→|-)\s*\((.+)\)$/);
        if (match10 && match10[2].length < 350) {
          const boldText = match10[1].trim();
          const bibleText = match10[2].trim();
          let explText = match10[3].trim();
          if (explText && !explText.endsWith('.')) explText += ".";
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}.</strong> <span class="note-paren">${escapeHtml(explText)}</span></div>`;
        }

        // Padrão 11: [ Rótulo ] -> Extra ] : "Texto Bíblico" (Explicação)
        const match11 = line.match(/^\[\s*(.+?)\s*\]\s*(?:-->|—>|->|→|-)\s*(.+?)\s*\]\s*:\s*"([^"]+)"\s*\((.+)\)$/);
        if (match11 && match11[3].length < 350) {
          const boldText = match11[1].trim() + " / " + match11[2].trim();
          const bibleText = match11[3].trim();
          let explText = match11[4].trim();
          if (explText && !explText.endsWith('.')) explText += ".";
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}.</strong> <span class="note-paren">${escapeHtml(explText)}</span></div>`;
        }

        // Padrão 8: [ • Texto ] -> (Rótulo: Explicação) ou [ • Texto ] -> (Rótulo)
        const match8 = line.match(/^\[?\s*(?:[•\-\*])?\s*([^\]]+?)\s*\]\s*(?:-->|—>|->|→|-)\s*\(([^:]+?)(?::\s*(.+?))?\)$/);
        if (match8 && match8[1].length < 350) {
          const bibleText = match8[1].trim();
          const boldText = match8[2].trim();
          const explText = match8[3] ? match8[3].trim() : "";
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}${explText ? "." : ""}</strong>${explText ? ` <span class="note-paren">${escapeHtml(explText)}</span>` : ""}</div>`;
        }

        // Padrão 7: "Texto" -> (Rótulo) - Explicação  (Padrão novo do LLM)
        const match7 = line.match(/^\[?\s*"([^"]+?)"\s*(?:-->|—>|->|→|-)\s*(?:\(([^)]+)\)|([^:-]+))\s*(?:[-:]\s*(.+))?$/);
        if (match7 && match7[1].length < 350) {
          const bibleText = match7[1].trim();
          const boldText = (match7[2] || match7[3]).trim();
          let explText = match7[4] ? match7[4].trim() : "";
          if (explText && !explText.endsWith('.')) {
             explText += ".";
          }
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}.</strong>${explText ? ` <span class="note-paren">${escapeHtml(explText)}</span>` : ""}</div>`;
        }

        // Padrão 6: ["Texto"] -> Rótulo: Explicação ] -> (Extra)
        const match6 = line.match(/^\[?\s*"([^"]+?)"\s*(?:-->|—>|->|→|-)\s*([^:]+?)\s*:\s*(.+?)\s*(?:\]\s*(?:-->|—>|->|→|-)\s*(.+))?$/);
        if (match6 && match6[1].length < 350) {
          const bibleText = match6[1].trim();
          const boldText = match6[2].trim();
          let explText = match6[3].trim();
          let extraParen = match6[4] ? match6[4].trim() : "";
          if (extraParen && !explText.endsWith('.')) {
             explText += ".";
          }
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}.</strong> <span class="note-paren">${escapeHtml(explText)} ${escapeHtml(extraParen)}</span></div>`;
        }

        // Nova lógica de Parse mais robusta
        let parsed = false;
        let bibleText = "";
        let boldText = "";
        let parenText = "";
        
        // Vamos procurar os delimitadores principais: " — " ou " -> " ou " → " ou " --> "
        // Aprimorado para capturar delimitadores colados no colchete ex: "[ texto ]- explicação"
        const delimiterRegex = /\s*(?:—|->|→|-->|—>|-)\s+/;
        const parts = line.split(delimiterRegex);
        
        // Verifica se a primeira parte possui a estrutura básica de um texto bíblico antes de aplicar
        if (parts.length >= 2 && parts[0].length < 350 && line.includes('[')) {
           // O que vem antes do delimitador é a Bíblia. O que vem depois é a explicação.
           bibleText = parts[0];
           let rest = parts.slice(1).join(" - "); // Junta de volta se houver mais de um delimitador
           
           // Limpeza da Bíblia: remove todos os colchetes do início e do final
           bibleText = bibleText.replace(/^\[\s*\[?\s*/, '').replace(/\s*\]?\s*\]?$/, '').trim();
           // Remove aspas que possam ter sobrado
           bibleText = bibleText.replace(/^["']|["']$/g, '').trim();
           
           // Limpeza do Resto:
           // O "rest" pode terminar com algo como "] (Exortação)"
           const parenMatch = rest.match(/^(.*?)(?:\s*\]?\s*(\(.*?\))\.?)?\s*\]?\.?$/);
           if (parenMatch && parenMatch[2]) {
              boldText = parenMatch[1].replace(/\]\s*$/, '').trim();
              parenText = parenMatch[2].trim();
           } else {
              boldText = rest.replace(/\]\s*$/, '').trim();
           }
           
           return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}</strong>${parenText ? ` <span class="note-paren">${escapeHtml(parenText)}</span>` : ""}</div>`;
        }
        
        // Padrão 2: Texto Bíblico (Rótulo) - colado diretamente de ferramentas de Phrasing
        // Ex: Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)
        const match2 = line.match(/^([^(]+?)\s*(\(.+?\))\.?$/);
        if (match2 && match2[1].length < 350) {
          const bibleText = match2[1].trim();
          const parenText = match2[2].trim();
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <span class="note-paren">${escapeHtml(parenText)}</span></div>`;
        }

        // Padrão 3: Rótulo: "Texto Bíblico" ou "Texto Bíblico" (Rótulo) com aspas
        const match3 = line.match(/^([^:]+?):\s*"(.+)"\s*$/);
        const match4 = line.match(/^"([^"]+?)"\s*(\([^)]+\))\.?$/);
        
        // Padrão 5: [ Texto ]: Rótulo. Explicação
        const match5 = line.match(/^\[\s*(.+?)\s*\]\s*:\s*(.*?)(?:\.\s+(.+))?$/);
        if (match3 && match3[2].length < 350) {
          const boldText = match3[1].trim();
          const bibleText = match3[2].trim();
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}</strong></div>`;
        }
        
        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const parenText = match4[2].trim();
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <span class="note-paren">${escapeHtml(parenText)}</span></div>`;
        }
        
        if (match5 && match5[1].length < 350) {
          const bibleText = match5[1].trim();
          const boldText = match5[2].trim();
          const explText = match5[3] ? match5[3].trim() : "";
          return `<div class="note-line note-verse-analysis">[ <em>${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>${escapeHtml(boldText)}.</strong>${explText ? ` <span class="note-paren">${escapeHtml(explText)}</span>` : ""}</div>`;
        }

        // Linha regular de comentário
        return `<div class="note-line">${escapeHtml(line)}</div>`;
      }

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
        textToProcess = textToProcess.replace(/([^\n\[\s])\s*\[\s*([^\[\]]+?)\s*\]\s*(-->|—>|->|→|—|-|:)/g, "$1\n[ $2 ] $3 ");
        
        // 3. Quebra depois de parênteses de fechamento que pareçam fim de uma explicação e antes do próximo colchete
        textToProcess = textToProcess.replace(/\)\s*\[/g, ")\n[");
        
        // 4. Quebra antes de textos que começam com aspas no fraseamento
        // (depois de ponto final, parenteses ou colchete de fechamento, e APENAS se for seguido de uma letra/numero - indicando início de frase)
        textToProcess = textToProcess.replace(/([.)\]])\s*"(?=[A-Za-z0-9Á-Úá-úÀ-Ùà-ùÂ-Ûâ-ûÃ-Õã-õÇç])/g, "$1\n\"");
        
        // Separação de versículo colado no título: VersículosSalmos 22:22
        textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)\s*([1-3]?\s*[A-Z][a-zãéíóú]+\s+\d+:\d+(?:-\d+)?)/gi, "$1\n$2\n");
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
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].trim()) {
                const next = lines[j].trim();
                nextIsPhrasing = /^\s*\[?\s*\[?\s*(.+?)\s*\]?\s*(?:→|->|—>|-->|→|—|-)\s*(.+)$/.test(next) ||
                                 /^([^(]+?)\s*(\(.+?\))\.?$/.test(next) ||
                                 /^([^:]+?):\s*".+"\s*$/.test(next);
                break;
              }
            }
            if (prevIsPhrasing && nextIsPhrasing) {
              continue; // Remove linha em branco entre blocos de fraseamento
            }
          }
          result.push(formatCommentLine(l));
        }
        return result.join("");
      }
const inputs = [
  "[ *Aquele que tem* ] → **A Apropriação Pessoal da Palavra**",
  "[ *e os guarda,* ] → **A Evidência Prática** (Obediência Contínua)",
  "[ *Aquele que tem os MEUS mandamentos* ] → **Cláusula Condicional Implícita / Sujeito Definido por Posse Espiritual** (Recepção cognitiva da verdade revelada)"
];

for (const input of inputs) {
  console.log("----");
  console.log("IN:", input);
  console.log("OUT:", formatCommentToHtml(input).replace(/<\/div>/g, "\n"));
}
