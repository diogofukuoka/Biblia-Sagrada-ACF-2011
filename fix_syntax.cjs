const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);
        } else {`;

const replace = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);
          });
        } else {`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success fix syntax");
