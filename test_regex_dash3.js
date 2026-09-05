const lines = [
  "[E agora, senhora, rogo-te] — Apelo Direto / Transição de Pensamento.",
  "[não como escrevendo-te um novo mandamento] — Contraste Negativo / Negação de Inovação Doutrinária.",
  "[ [mas aquele mesmo que desde o princípio tivemos] — Contraste Positivo / Afirmação de Continuidade Histórica ] (Causa da Exortação)",
  "[ [que nos amemos uns aos outros] — Propósito / Conteúdo Essencial do Mandamento ] (O Objetivo da Vida Eclesial)"
];

for (const line of lines) {
  const delimiterRegex = /\s+(?:—|->|→|-->|—>)\s+/;
  const parts = line.split(delimiterRegex);
  
  if (parts.length >= 2) {
     let bibleText = parts[0];
     let rest = parts.slice(1).join(" - "); 
     
     bibleText = bibleText.replace(/^\[\s*\[?\s*/, '').replace(/\s*\]?\s*\]?$/, '').trim();
     
     let boldText = "";
     let parenText = "";
     
     const parenMatch = rest.match(/^(.*?)(?:\s*\]?\s*(\(.*\)))?\s*\]?$/);
     if (parenMatch && parenMatch[2]) {
        boldText = parenMatch[1].replace(/\]\s*$/, '').trim();
        parenText = parenMatch[2].trim();
     } else {
        boldText = rest.replace(/\]\s*$/, '').trim();
     }
     
     console.log("FINAL:", "[ *" + bibleText + "* ] -> **" + boldText + "** " + parenText);
  }
}
