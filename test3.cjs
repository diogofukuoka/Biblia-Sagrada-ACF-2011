const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCall = `            if (target) {
              safeScrollTo(target, true, '#mobile-notes-feed');
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }`;

const replaceCall = `            if (target) {
              const container = document.getElementById("mobile-notes-feed");
              if (container) {
                const cRect = container.getBoundingClientRect();
                const tRect = target.getBoundingClientRect();
                const offset = tRect.top - cRect.top + container.scrollTop;
                container.scrollTo({ top: Math.max(0, offset - 40), behavior: 'auto' });
              }
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }`;

code = code.replace(targetCall, replaceCall);
fs.writeFileSync('index.html', code);
