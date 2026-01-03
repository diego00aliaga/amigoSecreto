import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase-config' // Tu inicialización de firebase
// src/services/auth.service.js
import { v4 as uuidv4 } from 'uuid'; // Si no quieres instalar esto, ver nota abajo*


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginWithGoogle = async () => {
  try {
    // --- PASO 1: Login con Firebase (Popup) ---
    console.log('%c[AuthService] Iniciando Popup...', "color: #007acc;");
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // --- PASO 2: Obtener el Token JWT ---
    // IMPORTANTE: Este es el token que valida que eres tú ante tu backend
    const token = await firebaseUser.getIdToken(); 

    // --- PASO 3: Preparar Headers (Igual que en tu Angular) ---
    // Generamos el UUID para la sesión
    const codeSesion = uuidv4(); 

    const headers = {
      "Content-Type": "application/json",
      "iss": "amigo-secreto-api",
      "sub": "amigo-secreto-web",
      "aud": "sign-in",
      "codigosesion": codeSesion,
      "Authorization": `Bearer ${token}`, // Aquí va el token de Firebase
    };

    // --- PASO 4: Petición al Backend ---
    // Usamos 'fetch' que es nativo (o puedes usar axios si prefieres)
    console.log('%c[AuthService] Enviando a Backend...', "color: #007acc;");
    
    // NOTA: Mantengo el método GET porque así estaba en tu Angular, 
    // pero para login lo estándar es POST.
    const response = await fetch(`${BACKEND_URL}/v1/auth/sign-google`, {
      method: 'GET', 
      headers: headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el backend");
    }

    const data = await response.json();

    console.log("%c[AuthService] Respuesta Backend", "color: #007acc;", data);

    // Retornamos el payload para que el Componente o Contexto lo guarde
    return {
      user: data.payload.user,
      accessToken: data.payload.accessToken,
      refreshToken: data.payload.refreshToken
    };

  } catch (error) {
    console.error("%c[AuthService] Error", "color: red;", error);
    throw error;
  }
};