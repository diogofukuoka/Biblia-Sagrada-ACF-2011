const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `      function formatCommentLine(rawLine) {
        const line = rawLine.trim();
        if (!line) return '<div class="note-spacer"><br></div>';`;

const replace = `      function formatCommentLine(rawLine) {
        let line = rawLine.trim();
        if (!line) return '<div class="note-spacer"><br></div>';

        // Remove marcações Markdown de negrito e itálico para não sujar os regex de formatação visual
        line = line.replace(/\\*\\*([^*]+)\\*\\*/g, "$1").replace(/\\*([^*]+)\\*/g, "$1");`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success inject clean");
