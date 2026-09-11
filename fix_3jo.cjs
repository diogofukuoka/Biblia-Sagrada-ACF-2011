const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `"3jo": [14],`;
const replace = `"3jo": [15],`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix 3jo");
