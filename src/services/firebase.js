import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAy7l7bt1x1gElZV5ArtgNV-eXTYJlh2ig",
  authDomain: "mealstogo-eea47.firebaseapp.com",
  projectId: "mealstogo-eea47",
  storageBucket: "mealstogo-eea47.firebasestorage.app",
  messagingSenderId: "202996628505",
  appId: "1:202996628505:web:283f8cecdf7728ff757e88",
};

// Inizializza Firebase solo se non è già stato inizializzato
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Ottieni l'istanza di Firebase Auth
const auth = getAuth(app);

export { app, auth };
