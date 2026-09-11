const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetMobile = `      .picker-books-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
      }
      .picker-chapter-grid {
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
const replaceMobile = `      .picker-books-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
        max-height: none;
      }
      .picker-chapter-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: max-content;
        align-content: start;
        flex: 1;
        max-height: none;
      }
      .picker-verse-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: max-content;
        align-content: start;
        flex: 1;
        max-height: none;
      }`;
code = code.replace(targetMobile, replaceMobile);
fs.writeFileSync('index.html', code);
console.log("Success fix max height 2");
