const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetInit = `          const { auth, db, onAuthStateChanged, signIn, signOut, collection, onSnapshot } = window.firebaseApp;`;
const replaceInit = `          const { auth, db, onAuthStateChanged, signIn, signInRedirect, signOut, collection, onSnapshot } = window.firebaseApp;`;

const targetLogin = `            } else {
              showToast("Iniciando login...");
              signIn().catch(e => {`;

const replaceLogin = `            } else {
              showToast("Iniciando login...");
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              if (isMobile && typeof signInRedirect === 'function') {
                signInRedirect().catch(e => {
                  console.error("Redirect login error", e);
                  alert("Erro no login: " + e.message);
                });
                return;
              }
              signIn().catch(e => {`;

code = code.replace(targetInit, replaceInit);
code = code.replace(targetLogin, replaceLogin);
fs.writeFileSync('index.html', code);
console.log("Success patch login tablet");
