const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetMobile = `      .picker-body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }`;
const replaceMobile = `      .picker-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        max-height: none;
      }`;
code = code.replace(targetMobile, replaceMobile);

fs.writeFileSync('index.html', code);
console.log("Success fix max height");
