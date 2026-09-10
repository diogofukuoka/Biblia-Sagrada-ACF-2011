const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const scriptMatch = code.match(/function formatCommentLine\(rawLine\) \{[\s\S]*?function formatCommentToHtml\(rawContent\) \{[\s\S]*?return result\.join\(""\);\s*\}/);
let functions = scriptMatch[0];
functions = `const escapeHtml = (str) => {
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
};\n` + functions;

fs.writeFileSync('test_funcs6.js', functions + `
const input = \`"Mas para mim," → Contraste / Identificação: Isola o autor da multidão perversa citada no contexto anterior.
"bom é aproximar-me de Deus;" → Declaração de Valor: Estabelece a tese central (a premissa teológica) do versículo.
[ "pus a minha confiança no Senhor DEUS," → Meio / Agência: Demonstra como a aproximação se materializa na prática, que é pelo exercício da fé ] → (refúgio)
"para anunciar todas as Tuas obras." → Propósito / Resultado: Apresenta a finalidade evangelística e doxológica da confiança prévia.\`;

console.log(formatCommentToHtml(input).replace(/<\\/div>/g, "</div>\\n"));
`);
