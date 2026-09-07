const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetMobile = `const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);`;
const replaceMobile = `const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);`;

code = code.replace(targetMobile, replaceMobile);
fs.writeFileSync('index.html', code);
console.log("Success patch ipad");
