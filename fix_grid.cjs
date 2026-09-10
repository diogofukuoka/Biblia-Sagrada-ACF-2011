const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace both grid-template-columns in the mobile view
const targetMobile = `.picker-chapter-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
      }
      .picker-verse-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
      }`;
const replaceMobile = `.picker-chapter-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: max-content;
        align-content: start;
        flex: 1;
      }
      .picker-verse-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: max-content;
        align-content: start;
        flex: 1;
      }`;
code = code.replace(targetMobile, replaceMobile);

const targetDesktop1 = `.picker-chapter-grid {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 1px;`;
const replaceDesktop1 = `.picker-chapter-grid {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      grid-auto-rows: max-content;
      align-content: start;
      gap: 1px;`;
code = code.replace(targetDesktop1, replaceDesktop1);

const targetDesktop2 = `.picker-verse-grid {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 1px;`;
const replaceDesktop2 = `.picker-verse-grid {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      grid-auto-rows: max-content;
      align-content: start;
      gap: 1px;`;
code = code.replace(targetDesktop2, replaceDesktop2);

fs.writeFileSync('index.html', code);
console.log("Success fix grid");
