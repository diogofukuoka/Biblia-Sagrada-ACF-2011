const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /setTimeout\(\(\) => \{\s*if \(window\.firebaseApp\) \{/,
  `const initFirebase = () => {\n        if (window.firebaseApp) {`
);

html = html.replace(
  /(\s*\}\n\s*\} \/\/\s*\}\n\s*\},\s*500\);)/,
  `\n        } else {\n          setTimeout(initFirebase, 100);\n        }\n      };\n      initFirebase();`
);

fs.writeFileSync('index.html', html, 'utf8');
