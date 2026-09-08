const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCSS = `    .mobile-notes-feed {
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
    }`;
const replaceCSS = `    .mobile-notes-feed {
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
      position: relative;
    }`;
code = code.replace(targetCSS, replaceCSS);
fs.writeFileSync('index.html', code);
console.log("Success patch css 2");
