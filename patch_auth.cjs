const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetAdminEmail = `const ADMIN_EMAIL = 'diogofukuoka85@gmail.com';`;
const replaceAdminEmail = `const ADMIN_EMAIL = 'diogofukuoka@hotmail.com';`;

const targetAuth = `          onAuthStateChanged((user) => {
            currentUser = user;
            if (user) {`;

const replaceAuth = `          function updateEditorsPermission() {
            document.querySelectorAll(".mobile-feed-editor").forEach(el => {
              el.setAttribute("contenteditable", isAdmin ? "true" : "false");
              if (isAdmin) {
                el.setAttribute("data-placeholder", "Escreva seu comentário ou cole sua análise...");
              } else {
                el.removeAttribute("data-placeholder");
              }
            });
          }
          onAuthStateChanged((user) => {
            currentUser = user;
            if (user) {`;

const targetAdmin1 = `                showToast("Autenticado como Admin");
              }`;
const replaceAdmin1 = `                showToast("Autenticado como Admin");
                updateEditorsPermission();
              }`;

const targetAdmin2 = `                showToast("Autenticado como Visitante: " + user.email);
              }`;
const replaceAdmin2 = `                showToast("Autenticado como Visitante: " + user.email);
                updateEditorsPermission();
              }`;

const targetAdmin3 = `              elBtnAdminLogin.title = "Login de Administrador (Firebase)";
            }
          });`;
const replaceAdmin3 = `              elBtnAdminLogin.title = "Login de Administrador (Firebase)";
              updateEditorsPermission();
            }
          });`;

code = code.replace(targetAdminEmail, replaceAdminEmail);
code = code.replace(targetAuth, replaceAuth);
code = code.replace(targetAdmin1, replaceAdmin1);
code = code.replace(targetAdmin2, replaceAdmin2);
code = code.replace(targetAdmin3, replaceAdmin3);

const targetRender = `              <div class="mobile-feed-editor" contenteditable="true" data-chapter="\${chapter}" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>`;
const replaceRender = `              <div class="mobile-feed-editor" contenteditable="\${isAdmin ? 'true' : 'false'}" data-chapter="\${chapter}" data-verse="\${vNum}" \${isAdmin ? 'data-placeholder="Escreva seu comentário ou cole sua análise..."' : ''}>\${vNote}</div>`;
code = code.replace(targetRender, replaceRender);

fs.writeFileSync('index.html', code);
console.log("Success patch auth");
