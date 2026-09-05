const lines = [
  "[E agora, senhora, rogo-te] — Apelo Direto / Transição de Pensamento.",
  "[não como escrevendo-te um novo mandamento] — Contraste Negativo / Negação de Inovação Doutrinária.",
  "[ [mas aquele mesmo que desde o princípio tivemos] — Contraste Positivo / Afirmação de Continuidade Histórica ] (Causa da Exortação)",
  "[ [que nos amemos uns aos outros] — Propósito / Conteúdo Essencial do Mandamento ] (O Objetivo da Vida Eclesial)"
];

for (const line of lines) {
  const match = line.match(/^\s*\[?\s*\[?\s*(.+?)\s*\]?\s*(?:→|->|—>|-->|→|—|-)\s*(.+)$/);
  if (match) {
    let bibleText = match[1].replace(/^\[|\]$/g, '').trim(); 
    let rest = match[2].replace(/^\]\s*/, '').trim();

    let boldText = rest;
    let parenText = "";
    
    const parenMatch = rest.match(/^(.*?)(?:\s*\]?\s*(\(.*\)))?\s*\]?$/);
    if (parenMatch && parenMatch[2]) {
       boldText = parenMatch[1].replace(/\]\s*$/, '').trim();
       parenText = parenMatch[2].trim();
    }
    
    console.log("FINAL:", "[ *" + bibleText + "* ] -> **" + boldText + "** " + parenText);
  }
}
