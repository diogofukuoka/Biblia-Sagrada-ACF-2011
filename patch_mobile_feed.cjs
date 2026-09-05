const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCss = `    .notes-editor-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      position: relative;
    }`;

const replaceCss = `    .notes-editor-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      position: relative;
    }
    .mobile-notes-feed {
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      scroll-behavior: smooth;
    }
    .mobile-feed-item {
      margin-bottom: 24px;
      background: var(--ui-bg);
      border-radius: var(--radius-md);
      padding: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      border: 1px solid var(--border);
    }
    .mobile-feed-header {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .mobile-feed-text {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin-bottom: 12px;
      font-style: italic;
      border-left: 2px solid var(--accent-soft);
      padding-left: 8px;
    }
    .mobile-feed-editor {
      min-height: 80px;
      outline: none;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-primary);
      padding: 8px;
      background: var(--bg);
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: border-color 0.2s;
    }
    .mobile-feed-editor:focus {
      border-color: var(--accent);
    }
    .mobile-feed-editor[data-placeholder]:empty:before {
      content: attr(data-placeholder);
      color: var(--text-muted);
      pointer-events: none;
      display: block;
    }`;

const targetHtml = `          <div class="notes-editor-wrapper">
            <div id="note-editor" 
                 class="notes-editor" 
                 contenteditable="true" 
                 role="textbox" 
                 aria-multiline="true" 
                 data-placeholder="Cole aqui seu comentário ou estudo, ex:&#10;[ Vinde ] → O Maior Convite (Ação de Fé)&#10;Ele será formatado automaticamente com itálico e negrito." 
                 spellcheck="false"></div>
            <textarea id="note-textarea" class="notes-textarea" placeholder="Escreva seu comentário ou estudo sobre este versículo..."></textarea>
          </div>`;

const replaceHtml = `          <div class="notes-editor-wrapper">
            <div id="note-editor" 
                 class="notes-editor" 
                 contenteditable="true" 
                 role="textbox" 
                 aria-multiline="true" 
                 data-placeholder="Cole aqui seu comentário ou estudo, ex:&#10;[ Vinde ] → O Maior Convite (Ação de Fé)&#10;Ele será formatado automaticamente com itálico e negrito." 
                 spellcheck="false"></div>
            <textarea id="note-textarea" class="notes-textarea" placeholder="Escreva seu comentário ou estudo sobre este versículo..."></textarea>
            <div id="mobile-notes-feed" class="mobile-notes-feed"></div>
          </div>`;

if (code.includes(targetCss) && code.includes(targetHtml)) {
    code = code.replace(targetCss, replaceCss);
    code = code.replace(targetHtml, replaceHtml);
    fs.writeFileSync('index.html', code);
    console.log("Success phase 1");
} else {
    console.log("Targets not found");
}
