const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetEditor = `            <div id="note-editor"
                 class="notes-editor"
                 contenteditable="true"`;
const replaceEditor = `            <div id="note-editor"
                 class="notes-editor"
                 contenteditable="false"`;

code = code.replace(targetEditor, replaceEditor);
fs.writeFileSync('index.html', code);
console.log("Success patch editor");
