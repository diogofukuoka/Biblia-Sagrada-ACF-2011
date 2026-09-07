const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScroll = `        setTimeout(() => {
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
        
const replaceScroll = `        setTimeout(() => {
          if (mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${chapter}-\${verse}\`);
            if (target) {
              const container = document.getElementById("mobile-notes-feed");
              if (container) {
                // Disable smooth scroll temporarily
                const originalBehavior = container.style.scrollBehavior;
                container.style.scrollBehavior = 'auto'; // CSS overrides 'auto' sometimes, let's just remove the class or apply inline auto
                
                // Also force parent not to scroll
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                
                // Use behavior: 'instant' if supported, otherwise 'auto'
                container.scrollTo({ top: Math.max(0, offset - 20), behavior: 'instant' });
                if (container.scrollTop < offset - 25 || container.scrollTop > offset - 15) {
                   container.scrollTop = Math.max(0, offset - 20); // direct assignment for compatibility
                }
                
                container.style.scrollBehavior = originalBehavior;
              }
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed && ed.getAttribute("contenteditable") === "true") {
                // small delay to ensure focus doesn't trigger scrollIntoView bugs
                setTimeout(() => {
                   ed.focus({preventScroll: true});
                }, 50);
              }
            }
          }
        }, 350);`;

code = code.replace(targetScroll, replaceScroll);
fs.writeFileSync('index.html', code);
console.log("Success patch instant scroll");
