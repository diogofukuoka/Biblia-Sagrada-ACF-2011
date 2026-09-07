const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
code = code.replace("safeScrollTo(target, true, '.notes-content');", "safeScrollTo(target, true, '#mobile-notes-feed');");
fs.writeFileSync('index.html', code);
