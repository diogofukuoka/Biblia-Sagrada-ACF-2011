const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetCatch = `              signIn().catch(e => {
                 console.error("Firebase Login Error:", e);
                 if (e.code === 'auth/unauthorized-domain') {
                   alert("Domínio não autorizado!\\nAdicione '" + window.location.hostname + "' na aba 'Domínios autorizados' do Firebase Console (Authentication > Configurações).");
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   alert("O popup foi bloqueado ou fechado.\\nTente clicar no ícone de abrir em 'Nova Guia' (canto superior direito) e faça o login lá.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                 }
              });`;
const replaceCatch = `              signIn().catch(e => {
                 console.error("Firebase Login Error:", e);
                 if (e.code === 'auth/unauthorized-domain') {
                   showToast("Erro: Adicione " + window.location.hostname + " nos domínios autorizados do Firebase.");
                   alert("Domínio não autorizado!\\nAdicione '" + window.location.hostname + "' na aba 'Domínios autorizados' do Firebase Console (Authentication > Configurações).");
                 } else if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                   showToast("Abra em Nova Guia para fazer o login.");
                 } else {
                   showToast("Erro: " + (e.message || e.code));
                 }
              });`;

if (code.includes('signIn().catch')) {
    code = code.replace(targetCatch, replaceCatch);
    fs.writeFileSync('index.html', code);
    console.log("Success alert patch");
} else {
    console.log("Not found targetCatch");
}
