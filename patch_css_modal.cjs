const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCSS = `    /* ==========================================================================
       GLOBAL TOOLTIPS
       ========================================================================== */`;

const replaceCSS = `    /* Mobile Note Drawer Modal */
    @media (max-width: 768px) {
      .mobile-note-dialog {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: drawerIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        max-height: 85vh; /* space for keyboard */
        display: flex;
        flex-direction: column;
      }
      .mobile-note-dialog .modal-body {
        flex: 1;
        overflow-y: auto;
      }
      @keyframes drawerIn {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .mobile-feed-editor[contenteditable="true"]:empty:before {
        content: attr(placeholder);
        color: var(--text-tertiary);
        pointer-events: none;
        display: block; /* For Firefox */
      }
    }

    /* ==========================================================================
       GLOBAL TOOLTIPS
       ========================================================================== */`;

code = code.replace(targetCSS, replaceCSS);
fs.writeFileSync('index.html', code);
console.log("Success patch css modal");
