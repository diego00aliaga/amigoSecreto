// Importa tu URL base (idealmente de variables de entorno)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const userService = {
    
  async getProfile() {

    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No hay sesión activa (Falta el token)");
    }

    try {
      const response = await fetch(`${BACKEND_URL}/v1/user`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      // 3. Manejo de Errores HTTP (ej: 401 si el token expiró)
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Sesión expirada");
        }
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      return data.payload || data;

    } catch (error) {
      console.error("[UserService] Error obteniendo perfil:", error);
      throw error;
    }
  }
};