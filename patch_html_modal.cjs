const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetHTML = `  <div class="modal-backdrop" id="modal-search"`;

const insertHTML = `
  <!-- MOBILE NOTE MODAL -->
  <div class="modal-backdrop" id="modal-note-mobile" role="dialog" aria-modal="true" aria-labelledby="modal-note-title">
    <div class="modal-dialog mobile-note-dialog">
      <div class="modal-header">
        <h3 class="modal-title" id="modal-note-title"></h3>
        <button class="modal-close-btn" data-close="modal-note-mobile">&times;</button>
      </div>
      <div class="modal-body">
         <div class="mobile-feed-text" id="mobile-note-verse-text" style="font-style: italic; margin-bottom: 16px; color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem;"></div>
         <div class="mobile-feed-editor" id="mobile-note-editor" contenteditable="false" placeholder="Escreva seu comentário aqui..." style="min-height: 150px; outline: none; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px; background: var(--ui-bg);"></div>
      </div>
    </div>
  </div>

  <div class="modal-backdrop" id="modal-search"`;

code = code.replace(targetHTML, insertHTML);
fs.writeFileSync('index.html', code);
console.log("Success patch html modal");
