const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `    .mobile-feed-editor[data-placeholder]:empty:before {
      content: attr(data-placeholder);
      color: var(--text-muted);
      pointer-events: none;
      display: block;
    }`;

const replaceCss = `    .mobile-feed-editor[data-placeholder]:empty:before {
      content: attr(data-placeholder);
      color: var(--text-muted);
      pointer-events: none;
      display: block;
    }
    .mobile-feed-editor:not([data-placeholder]):empty {
      display: none;
    }
    .mobile-feed-editor[contenteditable="false"] {
      min-height: auto;
      padding: 0;
      background: transparent;
    }`;

code = code.replace(targetCss, replaceCss);
fs.writeFileSync('index.html', code);
console.log("Success CSS patch");
