const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const helper = `      // ------------------------------------------------------------------------
      // FUNÇÃO SEGURA DE ROLAGEM
      // ------------------------------------------------------------------------
      function safeScrollTo(targetEl, smooth = false) {
        if (!targetEl) return;
        const container = document.querySelector('main.reader-container');
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
      }

      function showToast(message) {`;

code = code.replace('      function showToast(message) {', helper);

code = code.replace('targetVEl.scrollIntoView({ behavior: "smooth", block: "start" });', 'safeScrollTo(targetVEl, true);');
code = code.replace('target.scrollIntoView({ behavior: "auto", block: "start" });', 'safeScrollTo(target, false);');
code = code.replace('targetEl.scrollIntoView({ behavior: "auto", block: "start" });', 'safeScrollTo(targetEl, false);');
code = code.replace('targetEl.scrollIntoView({ behavior: "auto", block: "start" });', 'safeScrollTo(targetEl, false);');

fs.writeFileSync('index.html', code);
console.log("Success scroll patch");
