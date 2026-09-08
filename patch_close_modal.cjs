const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCloseModal = `      function closeModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) m.classList.remove("active");
      }`;

const replaceCloseModal = `      function closeModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) {
          m.classList.remove("active");
          if (modalId === "modal-note-mobile") {
             const editor = document.getElementById("mobile-note-editor");
             if (editor) editor.blur();
          }
        }
      }`;

code = code.replace(targetCloseModal, replaceCloseModal);
fs.writeFileSync('index.html', code);
console.log("Success patch close modal");
