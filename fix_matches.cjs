const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target2 = `        const match2 = line.match(/^([^(]+?)\\s*(\\((.+?)\\))\\.?$/);
        if (match2) {`;
const replace2 = `        const match2 = line.match(/^([^(]+?)\\s*(\\((.+?)\\))\\.?$/);
        if (match2 && match2[1].length < 350) {`;
// Wait, I should just use string replacement on what's actually there.
