const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

if (code.includes('DB_NAME_v2')) {
  console.log("DB_NAME_v2 is present");
} else if (code.includes('BibliaACF_DB_v2')) {
  console.log("BibliaACF_DB_v2 is present");
}
