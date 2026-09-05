const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `    .reading-active-verse {
      background-color: var(--accent-soft) !important;
      border-radius: var(--radius-sm);
      transition: background-color 0.5s ease;
    }`;

const replace1 = `    .reading-active-verse {
      background-color: var(--accent-soft) !important;
      border-radius: var(--radius-sm);
      transition: background-color 0.5s ease;
    }
    .active-note-verse {
      background-color: var(--accent-soft) !important;
      border-left: 3px solid var(--accent) !important;
      padding-left: 10px !important;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      transition: all 0.3s ease;
    }`;

const target2 = `        // Destaque visual sutil no versículo selecionado (mantendo a posição de leitura intacta sem rolagem)
        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                    document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);
        if (vEl) {
          vEl.classList.add("reading-active-verse");
          setTimeout(() => vEl.classList.remove("reading-active-verse"), 1800);
        }`;

const replace2 = `        // Destaque visual do versículo selecionado
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                    document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);
        if (vEl) {
          vEl.classList.add("active-note-verse");
        }`;

const target3 = `      function closeNotesSidebar() {
        elNotesSidebar.classList.remove("open");
        elNotesSidebar.setAttribute("aria-hidden", "true");`;

const replace3 = `      function closeNotesSidebar() {
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        elNotesSidebar.classList.remove("open");
        elNotesSidebar.setAttribute("aria-hidden", "true");`;

if (code.includes(target1) && code.includes(target2) && code.includes(target3)) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    code = code.replace(target3, replace3);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(target1)) console.log("Target 1 missing");
    if (!code.includes(target2)) console.log("Target 2 missing");
    if (!code.includes(target3)) console.log("Target 3 missing");
}
