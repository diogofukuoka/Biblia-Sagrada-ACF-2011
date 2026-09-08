const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `            feedItem.querySelector(".mobile-feed-header").addEventListener("click", () => {
              const targetVEl = document.getElementById(\`v-\${chapter}-\${vNum}\`);`;

const replace = `            feedItem.querySelector(".mobile-feed-header").addEventListener("click", () => {
              const formattedBook = book.toLowerCase().replace(/\\s+/g, '-');
              const targetVEl = document.getElementById(\`verse-\${formattedBook}-\${chapter}-\${vNum}\`);`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success patch v sidebar");
