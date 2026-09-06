const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetMedia = `    @media (max-width: 768px) {
      .top-picker-dropdown {`;
const replaceMedia = `    @media (max-width: 768px) {
      header.app-header {
        padding: 0 0.5rem;
      }
      .version-badge {
        display: none;
      }
      .header-title-group h1 {
        font-size: 1rem;
      }
      .header-actions {
        gap: 0.25rem;
      }
      .btn-icon {
        width: 32px;
        height: 32px;
      }
      .top-bible-selector {
        margin: 0 0.5rem;
      }
      .btn-top-bible-trigger {
        padding: 0 0.5rem;
        gap: 0.25rem;
      }
      .trigger-primary-ref {
        font-size: 0.85rem;
      }
      .trigger-icon-wrap {
        display: none;
      }
      .top-picker-dropdown {`;

if (code.includes(targetMedia)) {
    code = code.replace(targetMedia, replaceMedia);
    fs.writeFileSync('index.html', code);
    console.log("Success media patch");
} else {
    console.log("Target not found");
}
