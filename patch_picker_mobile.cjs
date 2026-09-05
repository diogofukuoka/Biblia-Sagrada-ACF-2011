const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `    @media (max-width: 768px) {
      .notes-sidebar {`;

const replaceCss = `    @media (max-width: 768px) {
      .top-picker-dropdown {
        position: fixed;
        top: 64px; /* Logo abaixo do header */
        left: 0;
        transform: translateY(-8px);
        width: 100vw;
        max-width: 100vw;
        height: calc(100vh - 64px);
        border-radius: 0;
        border: none;
        border-top: 1px solid var(--border);
      }
      .top-picker-dropdown.open {
        transform: translateY(0);
      }
      .top-picker-body {
        flex: 1;
      }
      
      .notes-sidebar {`;

if (code.includes(targetCss)) {
    code = code.replace(targetCss, replaceCss);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
