const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `textToProcess = textToProcess.replace(/([.)\\]])\\s*"(?=[a-zA-Z0-9\\s])/g, "$1\\n\\"");`;
const replace = `textToProcess = textToProcess.replace(/([.)\\]])\\s*"(?=[A-Za-z0-9Á-Úá-úÀ-Ùà-ùÂ-Ûâ-ûÃ-Õã-õÇç])/g, "$1\\n\\"");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix newline regex 2");
