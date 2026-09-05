const fs = require('fs');
let lines = fs.readFileSync('index.html', 'utf8').split('\n');

// 1. renderCurrentChapter
const start1 = lines.findIndex(l => l.includes('// block: "start" pode esconder atrás do header, usar cálculo relativo ao container'));
const end1 = lines.findIndex((l, i) => i > start1 && l.includes('targetEl.classList.add("highlight-target");'));

if (start1 > -1 && end1 > -1) {
    lines.splice(start1, end1 - start1, '              targetEl.scrollIntoView({ behavior: "auto", block: "start" });');
} else {
    console.log("Could not find block 1");
}

// 2. openNotesSidebar (click on feed header)
const start2 = lines.findIndex(l => l.includes('// Ao invés de usar scrollIntoView (que tem bugs com sticky headers ou position absolute),'));
const end2 = lines.findIndex((l, i) => i > start2 && l.includes('// Atualiza o realce visual permanente'));

if (start2 > -1 && end2 > -1) {
    lines.splice(start2, end2 - start2, '                targetVEl.scrollIntoView({ behavior: "smooth", block: "start" });');
} else {
    console.log("Could not find block 2");
}

// 3. openNotesSidebar (auto scroll feed to target)
const start3 = lines.findIndex(l => l.includes('mobileFeed.scrollTo({ top: target.offsetTop - 10, behavior: \'smooth\' });'));
if (start3 > -1) {
    lines[start3] = '              target.scrollIntoView({ behavior: "auto", block: "start" });';
} else {
    console.log("Could not find block 3");
}

for(let i=0; i<lines.length; i++) {
   if (lines[i].includes('}, 200);')) {
      if (lines[i-1] && lines[i-1].includes('updateTopVisibleVerseReference')) {
         lines[i] = lines[i].replace('200', '400');
      }
   }
}

fs.writeFileSync('index.html', lines.join('\n'));
console.log("Success patching");
