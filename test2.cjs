const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScrollDef = `      function safeScrollTo(targetEl, smooth = false, containerSelector = 'main.reader-container') {
        if (!targetEl) return;
        const container = document.querySelector(containerSelector);
        if (!container) {
           targetEl.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
           return;
        }
        const cRect = container.getBoundingClientRect();
        const tRect = targetEl.getBoundingClientRect();
        const offset = tRect.top - cRect.top + container.scrollTop;
        container.scrollTo({
          top: Math.max(0, offset - 24),
          behavior: smooth ? "smooth" : "auto"
        });
      }`;
      
const replaceScrollDef = `      function safeScrollTo(targetEl, smooth = false, containerSelector = 'main.reader-container', offsetAdjust = 24) {
        if (!targetEl) return;
        const container = document.querySelector(containerSelector);
        if (!container) {
           targetEl.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
           return;
        }
        const cRect = container.getBoundingClientRect();
        const tRect = targetEl.getBoundingClientRect();
        const offset = tRect.top - cRect.top + container.scrollTop;
        container.scrollTo({
          top: Math.max(0, offset - offsetAdjust),
          behavior: smooth ? "smooth" : "auto"
        });
      }`;

code = code.replace(targetScrollDef, replaceScrollDef);
fs.writeFileSync('index.html', code);
