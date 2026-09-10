const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// extract the formatCommentToHtml and formatCommentLine
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

fs.writeFileSync('test_funcs.js', functions + `
const input = \`7- Diagramador Bíblico / Analista de VersículosSalmos 22:22[ Então ] → A Consequência Lógica e Temporal da Vitória Divina[ declararei ] → A Ação Solene e Intencional de Proclamação[ o TEU nome ] → A Revelação da Essência e Autoridade de DEUS[ aos meus irmãos; ] → Os Beneficiários da Graça (A Família da Fé)[ louvar-te-ei ] → A Resposta Extrema de Adoração e Exaltação[ no meio ] → O Centro Exato da Comunhão[ da congregação. ] → A Assembleia Universal dos Remidos  8- Análise de Fraseamento (Phrasing) e Rótulos Semânticos"Então declararei o TEU nome aos meus irmãos;" (Oração coordenada sindética/temporal indicando Consequência / Resultado direto da intervenção e ressurreição divina sobre a morte, expressando a missão ativa de testificar).  "louvar-te-ei no meio da congregação." (Oração coordenada sindética por assindeto/paralelismo progressivo indicando Modo e Espaço da Adoração, demonstrando que o louvor gerado pela redenção é essencialmente comunitário e público).\`;
console.log(formatCommentToHtml(input).replace(/<\\/div>/g, "</div>\\n"));
`);
