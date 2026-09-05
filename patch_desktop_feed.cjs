const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `const isMobileFeed = window.innerWidth <= 1024;`;
const replace1 = `const isMobileFeed = true; // Forçado para todas as resoluções`;

if (code.includes(target1)) {
    code = code.replace(target1, replace1);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
