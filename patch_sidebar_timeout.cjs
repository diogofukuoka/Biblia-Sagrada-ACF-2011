const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetSidebarTimeout = `        setTimeout(() => {
          if (isMobileFeed && mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${verse}\`);
            if (target) {
              target.scrollIntoView({ behavior: "auto", block: "start" });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          } else if (elNoteEditor) {
            elNoteEditor.focus({ preventScroll: true });
          }
        }, 200);`;

const replaceSidebarTimeout = `        setTimeout(() => {
          if (isMobileFeed && mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${verse}\`);
            if (target) {
              target.scrollIntoView({ behavior: "auto", block: "start" });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          } else if (elNoteEditor) {
            elNoteEditor.focus({ preventScroll: true });
          }
        }, 350);`;

if (code.includes(targetSidebarTimeout)) {
    code = code.replace(targetSidebarTimeout, replaceSidebarTimeout);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
