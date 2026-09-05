const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        const lines = textToProcess.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n").split("\\n");
        return lines.map(l => formatCommentLine(l)).join("");`;

const replacement = `        const lines = textToProcess.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n").split("\\n");
        let result = [];
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i].trim();
          if (!l) {
            let prevIsPhrasing = false;
            for (let j = i - 1; j >= 0; j--) {
              if (lines[j].trim()) {
                const prev = lines[j].trim();
                prevIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(prev) || 
                                 /an[áa]lise de fraseamento/i.test(prev) || 
                                 /r[óo]tulos sem[âa]nticos/i.test(prev);
                break;
              }
            }
            let nextIsPhrasing = false;
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].trim()) {
                const next = lines[j].trim();
                nextIsPhrasing = /^\\[\\s*(.+?)\\s*\\]\\s*(?:→|->|—>|-->|→)\\s*(.+)$/.test(next);
                break;
              }
            }
            if (prevIsPhrasing && nextIsPhrasing) {
              continue; // Remove linha em branco entre blocos de fraseamento
            }
          }
          result.push(formatCommentLine(l));
        }
        return result.join("");`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
