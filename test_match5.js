const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const scriptMatch = code.match(/function formatCommentLine\(rawLine\) \{[\s\S]*?function formatCommentToHtml\(rawContent\) \{[\s\S]*?return result\.join\(""\);\s*\}/);

let functions = scriptMatch[0];
// Need escapeHtml
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

fs.writeFileSync('test_funcs5.js', functions + `
const input = \`[ E também ]: Relação de Adição/Transição. Une a experiência biográfica de Paulo no versículo anterior a um princípio teológico geral.  [ todos os que... querem viver em CRISTO JESUS ]: Relação de Condição Restritiva (Sujeito). Define o grupo exato a quem a promessa do texto se aplica.\`;
console.log(formatCommentToHtml(input).replace(/<\\/div>/g, "</div>\\n"));
`);
