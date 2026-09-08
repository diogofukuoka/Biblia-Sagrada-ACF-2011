const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Remove from sidebar
const targetRemove = `          <div class="sync-toggle-container">
            <label class="switch">
              <input type="checkbox" id="sync-scroll-toggle" checked>
              <span class="slider"></span>
            </label>
            <span>Sincronizar Rolagem</span>
          </div>
          <div class="notes-editor-wrapper">`;
const replaceRemove = `          <div class="notes-editor-wrapper">`;
code = code.replace(targetRemove, replaceRemove);

// 2. Add to header-actions
const targetAdd = `      <div class="header-actions">
        <!-- Mantido oculto para compatibilidade com seletores JS existentes -->`;
const replaceAdd = `      <div class="header-actions">
        <!-- Toggle Sync Scroll -->
        <div class="sync-toggle-container" title="Sincronizar Rolagem">
          <label class="switch">
            <input type="checkbox" id="sync-scroll-toggle" checked>
            <span class="slider"></span>
          </label>
          <span class="sync-toggle-label">Sync</span>
        </div>
        
        <!-- Mantido oculto para compatibilidade com seletores JS existentes -->`;
code = code.replace(targetAdd, replaceAdd);

// 3. Update CSS
const targetCss = `    .sync-toggle-container {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 10px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
    }`;
const replaceCss = `    .sync-toggle-container {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-right: 4px;
    }
    @media (max-width: 640px) {
      .sync-toggle-label {
        display: none;
      }
    }`;
code = code.replace(targetCss, replaceCss);

fs.writeFileSync('index.html', code);
console.log("Success move switch");
