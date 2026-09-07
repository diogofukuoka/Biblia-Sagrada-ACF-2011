const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScrollDef = `      function safeScrollTo(targetEl, smooth = false) {
        if (!targetEl) return;
        const container = document.querySelector('main.reader-container');`;
const replaceScrollDef = `      function safeScrollTo(targetEl, smooth = false, containerSelector = 'main.reader-container') {
        if (!targetEl) return;
        const container = document.querySelector(containerSelector);`;

code = code.replace(targetScrollDef, replaceScrollDef);

const targetSidebarCall = `            if (target) {
              safeScrollTo(target, false);
              const ed = target.querySelector('.mobile-feed-editor');`;
const replaceSidebarCall = `            if (target) {
              safeScrollTo(target, true, '#mobile-notes-feed');
              const ed = target.querySelector('.mobile-feed-editor');`;

code = code.replace(targetSidebarCall, replaceSidebarCall);

fs.writeFileSync('index.html', code);
console.log("Success scroll fix");
