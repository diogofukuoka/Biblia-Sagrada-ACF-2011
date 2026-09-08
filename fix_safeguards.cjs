const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Safeguard el.sidebar in line 1135
code = code.replace(
  'if (window.innerWidth <= 768 && !el.sidebar.classList.contains("open")) {',
  'if (window.innerWidth <= 768 && el.sidebar && !el.sidebar.classList.contains("open")) {'
);

fs.writeFileSync('index.html', code);
console.log("Success fix safeguards");
