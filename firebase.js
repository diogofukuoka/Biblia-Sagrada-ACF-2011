import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0930791125",
  appId: "1:433344089026:web:2ce9aafa91ada815ae245b",
  apiKey: "AIzaSyDDU_kGqwVOnHBYbSteH2NjCYs-69fYaz8",
  authDomain: "gen-lang-client-0930791125.firebaseapp.com",
  storageBucket: "gen-lang-client-0930791125.firebasestorage.app",
  messagingSenderId: "433344089026"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-bbliasagradaacf2-305b9c4f-d2e1-493d-a009-f39449e28b7e");
const auth = getAuth(app);

window.firebaseApp = {
    db,
    auth,
    signIn: () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        // popup fallback, but often blocked in cross-origin iframes
        return signInWithPopup(auth, provider);
    },
    signInRedirect: () => {
        const provider = new GoogleAuthProvider();
        return signInWithRedirect(auth, provider);
    },
    signOut: () => signOut(auth),
    onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
    collection, doc, setDoc, getDoc, deleteDoc, getDocs, onSnapshot
};
