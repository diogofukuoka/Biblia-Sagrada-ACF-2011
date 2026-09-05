const lines = [
  "II. ANÁLISE DE FRASEAMENTO (PHRASING) E RÓTULOS SEMÂNTICOS",
  "Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)",
  "O apóstolo Paulo foi para Roma (ver Atos 28).",
  "João 3:16 (O versículo mais famoso)"
];

for (const line of lines) {
  const match = line.match(/^([^(]+?)\s*\((.+?)\)\.?$/);
  console.log(line, "=>", match ? match.slice(1) : null);
}
