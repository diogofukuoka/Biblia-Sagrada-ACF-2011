const rawContent = `[ Por amor da verdade ] → A Motivação

[ que está em nós ] → A Habitação

[ e para sempre ] → A Duração`;
const lines = rawContent.split("\n");

let result = [];
for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) {
        let prevIsPhrasing = false;
        for (let j = i - 1; j >= 0; j--) {
        if (lines[j].trim()) {
            prevIsPhrasing = /^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->|→)\s*(.+)$/.test(lines[j].trim()) || /an[áa]lise de fraseamento/i.test(lines[j].trim()) || /r[óo]tulos sem[âa]nticos/i.test(lines[j].trim());
            break;
        }
        }
        let nextIsPhrasing = false;
        for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim()) {
            nextIsPhrasing = /^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->|→)\s*(.+)$/.test(lines[j].trim());
            break;
        }
        }
        
        if (prevIsPhrasing && nextIsPhrasing) {
            continue; // Pula essa linha em branco!
        }
    }
    result.push(l);
}
console.log(result.join("\n"));
