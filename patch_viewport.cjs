const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `    html, body {
      height: 100%;
      font-family: var(--font-ui);`;
const replace1 = `    html, body {
      height: 100%;
      width: 100%;
      position: fixed; /* Previne scroll no iOS */
      top: 0;
      left: 0;
      font-family: var(--font-ui);`;

const target2 = `    #app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }`;
const replace2 = `    #app-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }`;

const target3 = `    header.app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 1.5rem;`;
const replace3 = `    header.app-header {
      flex-shrink: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      min-height: 64px;
      padding: 0 1.5rem;`;

if (code.includes(target1)) code = code.replace(target1, replace1);
if (code.includes(target2)) code = code.replace(target2, replace2);
if (code.includes(target3)) code = code.replace(target3, replace3);

fs.writeFileSync('index.html', code);
console.log("Success viewport patch");
