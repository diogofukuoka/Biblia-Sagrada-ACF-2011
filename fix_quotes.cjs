const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong> <span class="note-paren">\${escapeHtml(explText)} \${escapeHtml(extraParen)}</span></div>\`;`;
const replace1 = `return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong> <span class="note-paren">\${escapeHtml(explText)} \${escapeHtml(extraParen)}</span></div>\`;`;

const target2 = `return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;`;
const replace2 = `return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;`;

const target3 = `// Limpeza da Bíblia: remove todos os colchetes do início e do final
           bibleText = bibleText.replace(/^\\[\\s*\\[?\\s*/, '').replace(/\\s*\\]?\\s*\\]?$/, '').trim();`;
const replace3 = `// Limpeza da Bíblia: remove todos os colchetes do início e do final
           bibleText = bibleText.replace(/^\\[\\s*\\[?\\s*/, '').replace(/\\s*\\]?\\s*\\]?$/, '').trim();
           // Remove aspas que possam ter sobrado
           bibleText = bibleText.replace(/^["']|["']$/g, '').trim();`;

code = code.replace(target1, replace1).replace(target2, replace2).replace(target3, replace3);

fs.writeFileSync('index.html', code);
console.log("Success fix quotes");
