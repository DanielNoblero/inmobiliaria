import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuración existente
const firebaseConfig = {
    apiKey: "AIzaSyCWCV3CrpYsWf4GZ4Cl7G1-eHhZHR7EOG0",
    authDomain: "inmobiliaria-vallarino-3a251.firebaseapp.com",
    projectId: "inmobiliaria-vallarino-3a251",
    storageBucket: "inmobiliaria-vallarino-3a251.firebasestorage.app",
    messagingSenderId: "123077189179",
    appId: "1:123077189179:web:efb7bf7e40f7f19c8f461e",
    measurementId: "G-PN2KJSBW0Z"
};

// Inicialización
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Servicios de Firebase
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
