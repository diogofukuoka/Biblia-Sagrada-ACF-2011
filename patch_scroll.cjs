const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScroll = `        setTimeout(() => {
          if (mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${chapter}-\${verse}\`);
            if (target) {
              const container = document.getElementById("mobile-notes-feed");
              if (container) {
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                container.scrollTo({ top: Math.max(0, offset - 40), behavior: 'auto' });
              }
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          }
        }, 350);`;
        
const replaceScroll = `        setTimeout(() => {
          if (mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${chapter}-\${verse}\`);
            if (target) {
              const container = document.getElementById("mobile-notes-feed");
              if (container) {
                // Ensure container layout is fully flushed
                container.scrollTop = container.scrollTop;
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                container.scrollTo({ top: Math.max(0, offset - 20), behavior: 'auto' });
              }
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed && ed.getAttribute("contenteditable") === "true") {
                ed.focus({preventScroll: true});
              }
            }
          }
        }, 350);`;

code = code.replace(targetScroll, replaceScroll);

// Also let's fix the other place: "safeScrollTo" for the active verse
const targetScrollDef = `      function safeScrollTo(targetEl, smooth = false, containerSelector = 'main.reader-container', offsetAdjust = 24) {`;
const replaceScrollDef = `      function safeScrollTo(targetEl, smooth = false, containerSelector = 'main.reader-container', offsetAdjust = 24) {`;

fs.writeFileSync('index.html', code);
console.log("Success scroll patch");
