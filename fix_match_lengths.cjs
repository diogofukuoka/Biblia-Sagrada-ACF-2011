const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const t2 = `        if (match2) {
          const bibleText = match2[1].trim();`;
const r2 = `        if (match2 && match2[1].length < 350) {
          const bibleText = match2[1].trim();`;

const t3 = `        if (match3) {
          const boldText = match3[1].trim();`;
const r3 = `        if (match3 && match3[2].length < 350) {
          const boldText = match3[1].trim();`;

code = code.replace(t2, r2).replace(t3, r3);
fs.writeFileSync('index.html', code);
console.log("Success fix matches lengths");
