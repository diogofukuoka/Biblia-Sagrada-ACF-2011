const escapeHtml = (str) => {
  return (str || "").replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
};

function formatCommentLine(rawLine) {
  const line = rawLine.trim();
  if (!line) return '<div class="note-spacer"><br></div>';

  if (line.length < 350) {
    if (/diagramador b[íi]blico/i.test(line) || /analista de vers[íi]culos/i.test(line)) {
      return '<div class="note-line"><strong>I. DIAGRAMADOR BÍBLICO / ANALISTA DE VERSÍCULOS</strong></div>';
    }
    if (/an[áa]lise de fraseamento/i.test(line) || /r[óo]tulos sem[âa]nticos/i.test(line)) {
      return '<div class="note-spacer"><br></div><div class="note-line"><strong>II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS</strong></div>';
    }
  }

  // Padrão 1
  let bibleText = "";
  let boldText = "";
  let parenText = "";
  const delimiterRegex = /\s*(?:—|->|→|-->|—>|-)\s+/;
  const parts = line.split(delimiterRegex);
  
  if (parts.length >= 2 && parts[0].length < 350 && line.includes('[')) {
     bibleText = parts[0];
     let rest = parts.slice(1).join(" - ");
     bibleText = bibleText.replace(/^\[\s*\[?\s*/, '').replace(/\s*\]?\s*\]?$/, '').trim();
     const parenMatch = rest.match(/^(.*?)(?:\s*\]?\s*(\([^)]*\)))?\s*\]?$/);
     if (parenMatch && parenMatch[2]) {
        boldText = parenMatch[1].replace(/\]\s*$/, '').trim();
        parenText = parenMatch[2].trim();
     } else {
        boldText = rest.replace(/\]\s*$/, '').trim();
     }
     return '<div class="note-line note-verse-analysis">[ <em>' + escapeHtml(bibleText) + '</em> ] <span class="note-arrow">→</span> <strong>' + escapeHtml(boldText) + '</strong>' + (parenText ? ' <span class="note-paren">' + escapeHtml(parenText) + '</span>' : '') + '</div>';
  }
  
  // Padrão 2: "Texto Bíblico" (Rótulo)
  const match2 = line.match(/^"([^"]+?)"\s*(\([^)]+\))\.?$/);
  if (match2) {
    bibleText = match2[1].trim();
    boldText = match2[2].trim();
    return '<div class="note-line note-verse-analysis">[ <em>&quot;' + escapeHtml(bibleText) + '&quot;</em> ] <span class="note-arrow">→</span> <strong>' + escapeHtml(boldText) + '</strong></div>';
  }
  
  return '<div class="note-line">' + escapeHtml(line) + '</div>';
}

function formatCommentToHtml(rawContent) {
  if (!rawContent) return "";
  let textToProcess = rawContent;
  
  // Break before "7- Diagramador" or "8- Análise"
  textToProcess = textToProcess.replace(/\d+-\s*Diagramador B[íi]blico/gi, "\n$&");
  textToProcess = textToProcess.replace(/\d+-\s*An[áa]lise de Fraseamento/gi, "\n$&");
  
  // Extract trailing book reference from "VersículosSalmos 22:22"
  textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)([A-Z][a-z]+ \d+:\d+)/gi, "$1\n$2\n");
  
  // Break before "[" 
  textToProcess = textToProcess.replace(/([^\n])\[/g, "$1\n[");
  
  // Break before '"' if it's the start of a phrasing line
  textToProcess = textToProcess.replace(/(\)\.)\s*"/g, "$1\n\"");
  textToProcess = textToProcess.replace(/(\s+)("/g, "\n$2");
  
  const lines = textToProcess.split("\n");
  let result = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    result.push(formatCommentLine(l));
  }
  return result.join("");
}

const input = `7- Diagramador Bíblico / Analista de VersículosSalmos 22:22[ Então ] → A Consequência Lógica e Temporal da Vitória Divina[ declararei ] → A Ação Solene e Intencional de Proclamação[ o TEU nome ] → A Revelação da Essência e Autoridade de DEUS[ aos meus irmãos; ] → Os Beneficiários da Graça (A Família da Fé)[ louvar-te-ei ] → A Resposta Extrema de Adoração e Exaltação[ no meio ] → O Centro Exato da Comunhão[ da congregação. ] → A Assembleia Universal dos Remidos  8- Análise de Fraseamento (Phrasing) e Rótulos Semânticos"Então declararei o TEU nome aos meus irmãos;" (Oração coordenada sindética/temporal indicando Consequência / Resultado direto da intervenção e ressurreição divina sobre a morte, expressando a missão ativa de testificar).  "louvar-te-ei no meio da congregação." (Oração coordenada sindética por assindeto/paralelismo progressivo indicando Modo e Espaço da Adoração, demonstrando que o louvor gerado pela redenção é essencialmente comunitário e público).`;

console.log(formatCommentToHtml(input).replace(/<\/div>/g, "</div>\n"));
