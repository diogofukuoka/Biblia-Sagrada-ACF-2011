const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCatch = `                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Login cancelado ou bloqueado.");
                 } else {`;
                 
const replaceCatch = `                 } else if (e.code === 'auth/popup-blocked') {
                   // Se o navegador bloquear o popup, forçamos o redirecionamento
                   if (typeof signInRedirect === 'function') {
                      signInRedirect();
                   } else {
                      showToast("Popup bloqueado pelo navegador.");
                   }
                 } else if (e.code === 'auth/popup-closed-by-user') {
                   showToast("Login cancelado pelo usuário.");
                 } else {`;

code = code.replace(targetCatch, replaceCatch);
fs.writeFileSync('index.html', code);
console.log("Success patch fallback");
