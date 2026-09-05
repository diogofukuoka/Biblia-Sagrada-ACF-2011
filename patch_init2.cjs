const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /setTimeout\(\(\) => \{[\s\S]*?\}, 500\);/;

const match = html.match(regex);
if (match) {
  let content = match[0];
  content = content.replace(/setTimeout\(\(\) => \{/, 'const initFirebase = () => {');
  content = content.replace(/\}, 500\);$/, '} else { setTimeout(initFirebase, 200); }\n      };\n      initFirebase();');
  html = html.replace(regex, content);
  fs.writeFileSync('index.html', html, 'utf8');
}
