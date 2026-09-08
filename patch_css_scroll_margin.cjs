const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCSS = `    .verse-paragraph {
      position: relative;
      margin-bottom: 1.5rem;
      line-height: var(--line-height-base);
      display: flex;
      gap: 14px;`;

const replaceCSS = `    .verse-paragraph {
      position: relative;
      margin-bottom: 1.5rem;
      line-height: var(--line-height-base);
      display: flex;
      gap: 14px;
      scroll-margin-top: 80px;`;

code = code.replace(targetCSS, replaceCSS);
fs.writeFileSync('index.html', code);
console.log("Success patch scroll margin");
