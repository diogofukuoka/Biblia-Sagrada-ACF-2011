const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `    .verse-paragraph {
      position: relative;
      margin-bottom: 1.5rem;
      line-height: var(--line-height-base);
      display: flex;
      gap: 14px;
      align-items: baseline;
      padding: 4px 8px;
      border-radius: var(--radius-md);
      transition: background-color 0.15s ease;
      cursor: pointer;
    }`;

const replaceCss = `    .verse-paragraph {
      position: relative;
      margin-bottom: 1.5rem;
      line-height: var(--line-height-base);
      display: flex;
      gap: 14px;
      align-items: baseline;
      padding: 4px 8px;
      border-radius: var(--radius-md);
      transition: background-color 0.15s ease;
      cursor: pointer;
      scroll-margin-top: 80px;
    }`;

const targetJs = `              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Atualiza o realce visual
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
                setTimeout(() => targetVEl.classList.remove("active-note-verse"), 2000);
              }`;

const replaceJs = `              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Atualiza o realce visual permanente
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
              }`;

if (code.includes(targetCss) && code.includes(targetJs)) {
    code = code.replace(targetCss, replaceCss);
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(targetCss)) console.log("Missing target CSS");
    if (!code.includes(targetJs)) console.log("Missing target JS");
}
