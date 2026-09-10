const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        if (parts.length >= 2) {
           // O que vem antes do delimitador é a Bíblia. O que vem depois é a explicação.
           bibleText = parts[0];`;

const replace = `        if (parts.length >= 2 && parts[0].length < 350) {
           // O que vem antes do delimitador é a Bíblia. O que vem depois é a explicação.
           bibleText = parts[0];`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix phrasing length");
