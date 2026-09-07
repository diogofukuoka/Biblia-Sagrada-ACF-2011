const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace("safeScrollTo(target, true, '#mobile-notes-feed');", "safeScrollTo(target, true, '.notes-content');");

fs.writeFileSync('index.html', code);
console.log("Success patch sidebar scroll");
