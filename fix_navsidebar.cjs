const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/el\.navSidebar/g, 'el.sidebar');

fs.writeFileSync('index.html', code);
console.log("Success fix navSidebar");
