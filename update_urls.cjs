const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/https:\/\/raw\.githubusercontent\.com\/marcossancal\/Biblias-em-JSON\/master\/json\/biblia-almeida-corrigida-fiel\.json/g, "/acf.json");

fs.writeFileSync('index.html', code);
console.log("Success update URLs");
