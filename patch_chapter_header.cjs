const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetHeaderLogic = `        wrap.style.borderTop = isFirst ? "none" : "1px solid var(--border)";

        if (!isFirst) {
          const chTitle = document.createElement("h3");
          chTitle.className = "reading-chapter-title";
          chTitle.style.fontSize = "1.5rem";
          chTitle.style.marginBottom = "2rem";
          chTitle.textContent = \`Capítulo \${chapterNum}\`;
          wrap.appendChild(chTitle);
        }`;

const replaceHeaderLogic = `        wrap.style.borderTop = isFirst ? "none" : "1px solid var(--border)";

        // Sempre injetar cabeçalho H2 estruturado
        const chTitle = document.createElement("h2");
        chTitle.className = "reading-chapter-title";
        chTitle.style.fontSize = isFirst ? "2rem" : "1.5rem";
        chTitle.style.marginBottom = "2rem";
        chTitle.style.fontWeight = "600";
        chTitle.textContent = \`Capítulo \${chapterNum}\`;
        wrap.appendChild(chTitle);`;

code = code.replace(targetHeaderLogic, replaceHeaderLogic);
fs.writeFileSync('index.html', code);
console.log("Success patch chapter header");
