const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const scriptMatch = code.match(/function formatCommentLine\(rawLine\) \{[\s\S]*?function formatCommentToHtml\(rawContent\) \{[\s\S]*?return result\.join\(""\);\s*\}/);
let funcs = scriptMatch[0];
funcs = funcs.replace('function formatCommentLine(rawLine) {', 'function formatCommentLine(rawLine) { console.log("INPUT TO LINE:", JSON.stringify(rawLine)); ');

funcs = `const escapeHtml = (str) => { return str; };\n` + funcs;

fs.writeFileSync('test_funcs_out2.cjs', funcs + `
const input = \`"Mas para mim," → Contraste / Identificação: Isola o autor da multidão perversa citada no contexto anterior.\`;
console.log(formatCommentToHtml(input));
`);
