const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `      .top-picker-body {
        flex: 1;
      }
      .picker-books-grid {
        grid-template-columns: repeat(6, 1fr);
      }`;

const replaceCss = `      .top-picker-body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .picker-books-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
      }
      .picker-verse-grid {
        grid-template-columns: repeat(6, 1fr);
        flex: 1;
      }`;

if (code.includes(targetCss)) {
    code = code.replace(targetCss, replaceCss);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
