const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `const parenMatch = rest.match(/^(.*?)(?:\\s*\\]?\\s*(\\(.*\\)))?\\s*\\]?$/);`;
const replace1 = `const parenMatch = rest.match(/^(.*?)(?:\\s*\\]?\\s*(\\(.*?\\))\\.?)?\\s*\\]?\\.?$/);`;

const target2 = `        if (match2 && match2[1].length < 350) {
          const bibleText = match2[1].trim();
          const boldText = match2[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;
const replace2 = `        if (match2 && match2[1].length < 350) {
          const bibleText = match2[1].trim();
          const parenText = match2[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;
        }`;

const target4 = `        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const boldText = match4[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;
const replace4 = `        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const parenText = match4[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>&quot;\${escapeHtml(bibleText)}&quot;</em> ] <span class="note-arrow">→</span> <span class="note-paren">\${escapeHtml(parenText)}</span></div>\`;
        }`;

code = code.replace(target1, replace1).replace(target2, replace2).replace(target4, replace4);

fs.writeFileSync('index.html', code);
console.log("Success fix bold parens");
