const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(`    .notes-content {
      flex: 1;
      padding: 44px 12px 14px;
      overflow-y: auto;
      overscroll-behavior: contain;`,
`    .notes-content {
      flex: 1;
      padding: 44px 12px 14px;
      overflow: hidden; /* Prevent nested double scrollbars */
      overscroll-behavior: contain;`);

fs.writeFileSync('index.html', code);
console.log("Success patch css");
