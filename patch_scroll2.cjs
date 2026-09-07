const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScroll = `        setTimeout(() => {
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

const replaceScroll = `        // Aumentar o timeout para garantir que as animações de layout (margin/transform) terminem no mobile.
        setTimeout(() => {
          if (mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${chapter}-\${verse}\`);
            if (target) {
              const container = document.getElementById("mobile-notes-feed");
              if (container) {
                // Force parent container to not scroll down accidentally
                const parent = document.querySelector(".notes-content");
                if (parent) parent.scrollTop = 0;
                
                // Disable smooth scroll temporarily
                const originalBehavior = container.style.scrollBehavior || '';
                container.style.scrollBehavior = 'auto';
                
                // Calculate absolute distance between target top and container top
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                
                // Scroll container exactly to the item
                container.scrollTop = Math.max(0, offset - 20);
                
                container.style.scrollBehavior = originalBehavior;
              }
              
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed && ed.getAttribute("contenteditable") === "true") {
                setTimeout(() => {
                   ed.focus({preventScroll: true});
                }, 50);
              }
            }
          }
        }, 400);`;

code = code.replace(targetScroll, replaceScroll);
fs.writeFileSync('index.html', code);
console.log("Success patch scroll2");
