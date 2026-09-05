const lines = [
  "[E agora, senhora, rogo-te] — Apelo Direto / Transição de Pensamento.",
  "[não como escrevendo-te um novo mandamento] — Contraste Negativo / Negação de Inovação Doutrinária.",
  "[mas aquele mesmo que desde o princípio tivemos] — Contraste Positivo / Afirmação de Continuidade Histórica",
  "[que nos amemos uns aos outros] — Propósito / Conteúdo Essencial do Mandamento"
];

for (const line of lines) {
  // O formato da imagem parece ser:
  // [texto bíblico] — Rótulo.
  // Note the em dash (—)
  const match = line.match(/^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->|→|—|-)\s*(.+)$/);
  console.log(line, "=>", match ? match.slice(1) : null);
}
