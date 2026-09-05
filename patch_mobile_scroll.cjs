const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `                // Atualiza o realce visual permanente
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
              }`;

const replaceJs = `                // Atualiza o realce visual permanente
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
                
                // No celular/tablet, a barra de notas cobre 100% da tela,
                // então precisamos fechar a barra para o usuário conseguir ver o versículo
                if (window.innerWidth <= 768) {
                  closeNotesSidebar();
                }
              }`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
