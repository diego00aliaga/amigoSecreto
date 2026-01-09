import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginWithGoogle } from '../../../services/auth.service';
import { useAuth } from '../../../context/AuthContext';

interface Character {
  id: number;
  name: string;
  image: string;
}

export const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const character = location.state?.character as Character | undefined;
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const data = await loginWithGoogle();
      login(data.accessToken, data.refreshToken, data.user);
      console.log("Login exitoso con Google:", data.user);
      navigate("/private/events");

    } catch (error) {
      alert("Falló el inicio de sesión con Google: " + error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar login con email/password
    console.log("Login con email:", email, password);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#ed4242] flex flex-col items-center justify-center overflow-hidden px-4">
      <div className="flex flex-col items-center justify-center z-10 gap-6 p-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl max-w-lg">
        
        {/* Imagen del personaje */}
        {character && (
          <img 
            src={`/${character.image}`} 
            alt={character.name} 
            className="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-yellow-300"
          />
        )}

        {/* Saludo personalizado */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
          ¡Bienvenido, <br />
          <span className="text-yellow-300">{character?.name || "Amigo"}!</span>
        </h1>

        {/* Mensaje descriptivo */}
        <p className="text-lg md:text-xl text-white text-center font-bold drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
          Esta es tu primera vez aquí, <br />
          <span className="text-yellow-300">¡creemos tu cuenta!</span>
        </p>

        {/* Opciones de login */}
        {!showEmailForm ? (
          <div className="w-full flex flex-col gap-4 mt-4">
            {/* Botón Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-black text-lg px-6 py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[4px] transition-all duration-150 border-2 border-white flex items-center justify-center gap-3"
            >
              <i className="fa-brands fa-google text-red-600"></i>
              {isGoogleLoading ? "Conectando..." : "Iniciar con Google"}
            </button>

            {/* Botón Email */}
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-700 font-black text-lg px-6 py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[4px] transition-all duration-150 border-2 border-yellow-200 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-envelope"></i>
              Iniciar con Email
            </button>
          </div>
        ) : (
          /* Formulario de Email */
          <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4 mt-4">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-gray-800 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-gray-800 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-700 font-black text-lg px-6 py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[4px] transition-all duration-150 border-2 border-yellow-200"
            >
              Crear Cuenta
            </button>
            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="w-full text-white font-bold hover:text-yellow-300 transition-colors"
            >
              ← Volver
            </button>
          </form>
        )}
      </div>
    </div>
  )
}