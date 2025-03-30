import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Importa l'istanza di auth da firebase.js

export const loginRequest = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};
