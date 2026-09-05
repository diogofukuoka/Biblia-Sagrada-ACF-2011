const lines = [
  "Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)",
  "da parte de DEUS PAI (Origem / Agência Primária)",
  "e da do SENHOR JESUS CRISTO, (Origem Coordenada / Agência Mediadora)",
  "o FILHO do PAI, (Aposição / Identificação Doutrinária)",
  "sejam convosco (Verbo de Ligação / Resultado e Promessa Futura)",
  "na verdade e amor. (Esfera de Ação / Condição de Manifestação)",
  "[ Por amor da verdade ] -> A Motivação e o Fundamento Absoluto"
];

for (const line of lines) {
  let match = line.match(/^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->)\s*(.+)$/);
  if (match) {
    console.log("OLD MATCH:", match[1], "|||", match[2]);
    continue;
  }
  
  match = line.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    console.log("NEW MATCH:", match[1], "|||", match[2]);
  }
}
