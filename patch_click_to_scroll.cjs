const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetHtml = `              feedItem.innerHTML = \`
                <div class="mobile-feed-header">\${book} \${chapter}:\${vNum}</div>
                <div class="mobile-feed-text">\${escapeHtml(vText)}</div>
                <div class="mobile-feed-editor" contenteditable="true" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>
              \`;`;

const replaceHtml = `              feedItem.innerHTML = \`
                <div class="mobile-feed-header" data-scroll-to="\${vNum}" title="Rolar texto bíblico até este versículo">\${book} \${chapter}:\${vNum}</div>
                <div class="mobile-feed-text">\${escapeHtml(vText)}</div>
                <div class="mobile-feed-editor" contenteditable="true" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>
              \`;`;

const targetCss = `    .mobile-feed-header {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }`;

const replaceCss = `    .mobile-feed-header {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .mobile-feed-header:hover {
      color: var(--accent);
    }`;

const targetEvent = `          // Adiciona lógica de paste e save para o feed mobile`;

const replaceEvent = `          // Adiciona evento de clique no header para rolar a Bíblia
          mobileFeed.querySelectorAll(".mobile-feed-header").forEach(header => {
            header.addEventListener("click", () => {
              const targetVNum = header.getAttribute("data-scroll-to");
              const targetVEl = document.getElementById(\`v-\${chapter}-\${targetVNum}\`) || 
                                document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${targetVNum}"]\`);
              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Atualiza o realce visual
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
                setTimeout(() => targetVEl.classList.remove("active-note-verse"), 2000);
              }
            });
          });
          
          // Adiciona lógica de paste e save para o feed mobile`;

if (code.includes(targetHtml) && code.includes(targetCss) && code.includes(targetEvent)) {
    code = code.replace(targetHtml, replaceHtml);
    code = code.replace(targetCss, replaceCss);
    code = code.replace(targetEvent, replaceEvent);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
