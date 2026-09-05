const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `          const verseEls = document.querySelectorAll(".verse-paragraph");
          if (verseEls.length > 0) {
            verseEls.forEach(vEl => {
              const vNum = vEl.dataset.verse;
              let vText = "";
              const textSpan = vEl.querySelector(".verse-text");
              if (textSpan) vText = textSpan.textContent;
              
              const vKey = \`\${book}_\${chapter}_\${vNum}\`;`;

const replaceJs = `          const verseEls = document.querySelectorAll(\`.verse-paragraph[data-chapter="\${chapter}"]\`);
          if (verseEls.length > 0) {
            verseEls.forEach(vEl => {
              const vNum = vEl.dataset.verse;
              let vText = "";
              const textSpan = vEl.querySelector(".verse-text");
              if (textSpan) vText = textSpan.textContent;
              
              const vKey = \`\${book}_\${chapter}_\${vNum}\`;`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
