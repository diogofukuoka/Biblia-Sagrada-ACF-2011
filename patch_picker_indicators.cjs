const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `    .top-book-item-btn.has-notes-indicator::after {
      content: "";
      position: absolute;
      top: 6px;
      right: 6px;
      width: 6px;
      height: 6px;
      background-color: var(--accent);
      border-radius: 50%;
    }`;

const replaceCss = `    .top-book-item-btn.has-notes-indicator::after,
    .top-number-btn.has-notes-indicator::after {
      content: "";
      position: absolute;
      top: 6px;
      right: 6px;
      width: 6px;
      height: 6px;
      background-color: var(--accent);
      border-radius: 50%;
    }
    .top-number-btn.has-notes-indicator {
      position: relative;
    }`;

const targetChapters = `      function renderTopChaptersGrid(bookObj) {
        if (!el.topChaptersGrid) return;
        if (el.currentChosenBookName) {
          el.currentChosenBookName.textContent = bookObj.name;
        }

        el.topChaptersGrid.innerHTML = "";
        const frag = document.createDocumentFragment();

        for (let i = 1; i <= bookObj.chapters; i++) {
          const btn = document.createElement("button");
          const isSelected = (i === pickerState.selectedChapter);
          btn.className = \`top-number-btn \${isSelected ? "selected" : ""}\`;`;

const replaceChapters = `      function renderTopChaptersGrid(bookObj) {
        if (!el.topChaptersGrid) return;
        if (el.currentChosenBookName) {
          el.currentChosenBookName.textContent = bookObj.name;
        }

        el.topChaptersGrid.innerHTML = "";
        const frag = document.createDocumentFragment();
        
        // Descobre quais capítulos deste livro têm notas
        const chaptersWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
            if (match && match[1] === bookObj.name) {
              chaptersWithNotes.add(parseInt(match[2], 10));
            }
          });
        }

        for (let i = 1; i <= bookObj.chapters; i++) {
          const btn = document.createElement("button");
          const isSelected = (i === pickerState.selectedChapter);
          btn.className = \`top-number-btn \${isSelected ? "selected" : ""} \${chaptersWithNotes.has(i) ? "has-notes-indicator" : ""}\`.trim();`;

const targetVerses = `      function renderTopVersesGrid(bookObj, chapterNum) {
        if (!el.topVersesGrid) return;
        if (el.currentChosenBookChapName) {
          el.currentChosenBookChapName.textContent = \`\${bookObj.name} \${chapterNum}\`;
        }

        const totalVerses = getVerseCountForChapter(bookObj, chapterNum);

        if (el.directVerseInput) {
          el.directVerseInput.max = totalVerses;
          el.directVerseInput.placeholder = \`1 a \${totalVerses}\`;
        }

        el.topVersesGrid.innerHTML = "";
        const frag = document.createDocumentFragment();

        for (let v = 1; v <= totalVerses; v++) {
          const btn = document.createElement("button");
          const isSelected = (v === pickerState.selectedVerse);
          btn.className = \`top-number-btn \${isSelected ? "selected" : ""}\`;`;

const replaceVerses = `      function renderTopVersesGrid(bookObj, chapterNum) {
        if (!el.topVersesGrid) return;
        if (el.currentChosenBookChapName) {
          el.currentChosenBookChapName.textContent = \`\${bookObj.name} \${chapterNum}\`;
        }

        const totalVerses = getVerseCountForChapter(bookObj, chapterNum);

        if (el.directVerseInput) {
          el.directVerseInput.max = totalVerses;
          el.directVerseInput.placeholder = \`1 a \${totalVerses}\`;
        }

        el.topVersesGrid.innerHTML = "";
        const frag = document.createDocumentFragment();
        
        // Descobre quais versículos deste capítulo têm notas
        const versesWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
            if (match && match[1] === bookObj.name && parseInt(match[2], 10) === chapterNum) {
              versesWithNotes.add(parseInt(match[3], 10));
            }
          });
        }

        for (let v = 1; v <= totalVerses; v++) {
          const btn = document.createElement("button");
          const isSelected = (v === pickerState.selectedVerse);
          btn.className = \`top-number-btn \${isSelected ? "selected" : ""} \${versesWithNotes.has(v) ? "has-notes-indicator" : ""}\`.trim();`;


if (code.includes(targetCss) && code.includes(targetChapters) && code.includes(targetVerses)) {
    code = code.replace(targetCss, replaceCss);
    code = code.replace(targetChapters, replaceChapters);
    code = code.replace(targetVerses, replaceVerses);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(targetCss)) console.log("Missing targetCss");
    if (!code.includes(targetChapters)) console.log("Missing targetChapters");
    if (!code.includes(targetVerses)) console.log("Missing targetVerses");
}
