const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        if (state.targetVerse > 0) {
          setTimeout(() => {
            const formattedBook = state.currentBook.toLowerCase().replace(/\\s+/g, '-');`;

const replace = `        if (state.targetVerse > 0) {
          requestAnimationFrame(() => {
          setTimeout(() => {
            const formattedBook = state.currentBook.toLowerCase().replace(/\\s+/g, '-');`;

code = code.replace(target, replace);

const targetEnd = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);
        } else {`;

const replaceEnd = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);
          });
        } else {`;
code = code.replace(targetEnd, replaceEnd);

fs.writeFileSync('index.html', code);
console.log("Success patch raf");
