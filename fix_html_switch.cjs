const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetHtml = `<div class="notes-editor-wrapper">`;
const replaceHtml = `<div class="sync-toggle-container">
            <label class="switch">
              <input type="checkbox" id="sync-scroll-toggle" checked>
              <span class="slider"></span>
            </label>
            <span>Sincronizar Rolagem</span>
          </div>
          <div class="notes-editor-wrapper">`;

code = code.replace(targetHtml, replaceHtml);
fs.writeFileSync('index.html', code);
console.log("Success fix HTML switch");
