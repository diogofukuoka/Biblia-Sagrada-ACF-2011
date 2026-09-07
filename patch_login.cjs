const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetLogin = `              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
              if (isMobile && typeof signInRedirect === 'function') {
                signInRedirect().catch(e => {
                  console.error("Redirect login error", e);
                  alert("Erro no login: " + e.message);
                });
                return;
              }`;

code = code.replace(targetLogin, "");

const targetCatch = `                 if (e.code === 'auth/unauthorized-domain') {
                   showToast("Erro: Domínio não autorizado.");
                   window.prompt("DOMÍNIO NÃO AUTORIZADO NO FIREBASE! Copie o link abaixo e adicione na aba 'Domínios autorizados' do Firebase Console (Authentication > Settings):", window.location.hostname);
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Abra em Nova Guia para fazer o login.");
                   alert("O navegador bloqueou o pop-up de login.\\n\\nPara fazer login, você PRECISA clicar no botão 'Abrir em Nova Guia' (ícone de quadrado com setinha) no canto superior direito da tela do AI Studio e fazer o login na nova janela.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                   alert("Erro ao fazer login:\\n" + e.message);
                 }`;

const replaceCatch = `                 if (e.code === 'auth/unauthorized-domain') {
                   showToast("Erro: Domínio não autorizado.");
                   alert("SEGURANÇA DO FIREBASE:\\n\\nEste domínio (" + window.location.hostname + ") ainda não foi autorizado no seu painel do Firebase.\\n\\nPor favor, copie o endereço na próxima tela e cole na seção Authentication > Configurações > Domínios Autorizados.");
                   window.prompt("Copie este endereço e adicione no Firebase:", window.location.hostname);
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Login cancelado ou bloqueado.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                   alert("Erro de autenticação:\\n" + e.message);
                 }`;

code = code.replace(targetCatch, replaceCatch);

fs.writeFileSync('index.html', code);
console.log("Success patch login");
