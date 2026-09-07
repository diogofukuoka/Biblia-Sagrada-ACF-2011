const fs = require('fs');
let code = fs.readFileSync('firebase.js', 'utf8');

const target1 = `import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';`;
const replace1 = `import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';`;

const target2 = `    signIn: () => signInWithPopup(auth, new GoogleAuthProvider()),`;
const replace2 = `    signIn: () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        // popup fallback, but often blocked in cross-origin iframes
        return signInWithPopup(auth, provider);
    },
    signInRedirect: () => {
        const provider = new GoogleAuthProvider();
        return signInWithRedirect(auth, provider);
    },`;

if (code.includes('signInWithPopup')) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    fs.writeFileSync('firebase.js', code);
    console.log("Success auth patch");
}
