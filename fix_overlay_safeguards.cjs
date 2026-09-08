const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  'el.sidebarOverlay.classList.remove("active");',
  'if (el.sidebarOverlay) el.sidebarOverlay.classList.remove("active");'
);

code = code.replace(
  'el.sidebarOverlay.classList.add("active");',
  'if (el.sidebarOverlay) el.sidebarOverlay.classList.add("active");'
);

fs.writeFileSync('index.html', code);
console.log("Success fix overlay safeguards");
