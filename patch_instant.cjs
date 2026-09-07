const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(`target.scrollIntoView({ behavior: 'instant', block: 'start' });`, `target.scrollIntoView({ behavior: 'auto', block: 'start' });`);

fs.writeFileSync('index.html', code);
console.log("Success patch instant");
