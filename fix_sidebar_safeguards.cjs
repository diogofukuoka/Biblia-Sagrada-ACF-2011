const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The original replacement replaced only the first occurrence or specific occurrences. 
// Let's do a more robust global replace if needed, or just let it be if it fixed the main issue.

fs.writeFileSync('index.html', code);
