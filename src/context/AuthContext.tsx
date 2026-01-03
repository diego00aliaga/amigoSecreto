import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import { getAuth } from "firebase/auth";
import type { User } from "firebase/auth";
import { app } from "../firebase-config"; // Tu config de siempre
import { userService } from "../services/profile.service";
import { logout as logoutService } from "../services/auth.service";

// Definimos el tipo del contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string, userData: any) => void;
  logout: () => Promise<void>;
}

// 1. Creamos el contexto (la "caja" vacía) con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Creamos el Provider (el componente que "rellena" la caja)
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Importante para no redirigir antes de tiempo
  const auth = getAuth(app);


  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // ¡Aquí usamos tu nuevo servicio!
          const userData = await userService.getProfile(); 
          setUser(userData); // Guardamos el usuario completo de la BD en el contexto
        } catch (error) {
          console.log("Token inválido o expirado");
          localStorage.removeItem("accessToken"); // Limpieza
        }
      }
      setLoading(false);
    };
  
    initAuth();
  }, []);

  // Función para iniciar sesión y guardar en localStorage
  const login = (accessToken: string, refreshToken: string, userData: any) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Función extra para cerrar sesión fácilmente (usa el servicio centralizado)
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
    }
  };

  // Redirigir a home cuando user es null (después del logout)
  useEffect(() => {
    if (!loading && user === null && localStorage.getItem("accessToken") === null) {

    }
  }, [user, loading]);

  // Lo que expongas aquí será visible GLOBALMENTE
  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
      {/* El !loading evita que la app cargue antes de saber si hay usuario */}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usarlo rápido (Sugar Syntax)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};