const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  "const ADMIN_EMAIL = 'diogofukuoka@hotmail.com';",
  "const ADMIN_EMAIL = 'diogofukuoka85@gmail.com';"
);

fs.writeFileSync('index.html', code);
console.log("Success patch ADMIN_EMAIL");
