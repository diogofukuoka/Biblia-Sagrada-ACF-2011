const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCatch = `                 if (e.code === 'auth/unauthorized-domain') {
                   showToast("Erro: Adicione " + window.location.hostname + " nos domínios autorizados do Firebase.");
                   alert("Domínio não autorizado!\\nAdicione '" + window.location.hostname + "' na aba 'Domínios autorizados' do Firebase Console (Authentication > Configurações).");
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Abra em Nova Guia para fazer o login.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                 }`;

const replaceCatch = `                 if (e.code === 'auth/unauthorized-domain') {
                   showToast("Erro: Domínio não autorizado.");
                   window.prompt("DOMÍNIO NÃO AUTORIZADO NO FIREBASE! Copie o link abaixo e adicione na aba 'Domínios autorizados' do Firebase Console (Authentication > Settings):", window.location.hostname);
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Abra em Nova Guia para fazer o login.");
                   alert("O navegador bloqueou o pop-up de login.\\n\\nPara fazer login, você PRECISA clicar no botão 'Abrir em Nova Guia' (ícone de quadrado com setinha) no canto superior direito da tela do AI Studio e fazer o login na nova janela.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                   alert("Erro ao fazer login:\\n" + e.message);
                 }`;

code = code.replace(targetCatch, replaceCatch);
fs.writeFileSync('index.html', code);
console.log("Success patch login msg");
