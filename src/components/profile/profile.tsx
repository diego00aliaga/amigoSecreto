import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/profile.service";
import { useAuth } from "../../context/AuthContext";
import { AddGiftButton } from "./addGiftButton";

// Tipo para los regalos
interface Gift {
  name: string;
  value?: string;
  _id?: string;
  id?: string;
}

// Tipo para el usuario de la base de datos
interface DbUser {
  name?: string;
  email?: string;
  photo?: string;
  wishlist?: Gift[];
}

export default function Profile() {
  const { user: firebaseUser, logout } = useAuth();
  const navigate = useNavigate();
  console.log("Usuario de AuthContext:", firebaseUser);
  // 2. Estados locales para manejar la data del Backend
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Gift[]>([]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Sesión cerrada exitosamente");
      // Redirigir a home después del logout
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError("Error al cerrar sesión. Intenta de nuevo.");
    }
  };

  const handleAddGift = async (giftName: string, giftPrice: string) => {
    try {
      // Llamar al backend para guardar el regalo
      const added = await userService.addGift(giftName, giftPrice);
      console.log("Regalo guardado exitosamente", added);

      const newGift: Gift = {
        name: (added?.payload?.gift?.name) ?? added?.gift?.name ?? giftName,
        value: (added?.payload?.gift?.value) ?? added?.gift?.value ?? giftPrice,
        _id: (added?.payload?.gift?._id) ?? added?.gift?._id,
        id: (added?.payload?.gift?.id) ?? added?.gift?.id,
      };
      // Actualizas el estado local para que se vea reflejado al instante
      setWishlist((prev) => [...prev, newGift]);
      setDbUser(prev => prev ? ({ 
        ...prev, 
        wishlist: [...(prev.wishlist || []), newGift] 
      }) : { 
        wishlist: [newGift] 
      });
    } catch (err) {
      console.error("Error agregando regalo:", err);
      setError("Error al agregar el regalo. Intenta de nuevo.");
    }
  };

  const handleDeleteGift = async (giftId: string) => {
    console.log("Eliminando regalo con ID:", giftId);
    try {
      await userService.deleteGift(giftId);
      setWishlist((prev) => prev.filter((g) => (g._id || g.id) !== giftId));
      setDbUser((prev) => prev ? ({
        ...prev,
        wishlist: (prev.wishlist || []).filter((g) => (g as any)._id !== giftId && (g as any).id !== giftId)
      }) : prev);
    } catch (err) {
      console.error("Error eliminando regalo:", err);
      setError("Error al eliminar el regalo. Intenta de nuevo.");
    }
  };
  // 3. El Efecto: Se ejecuta al entrar a la página
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        // Llamamos al backend usando el token que ya está en localStorage
        const data = await userService.getProfile();
        setDbUser(data); // Guardamos la respuesta de NestJS
        if (data?.wishlist) {
          setWishlist(data.wishlist as Gift[]);
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);

      } finally {
        setLoadingData(false);
      }
    };

    fetchMyProfile();
  }, []);

  // Si el usuario del contexto trae wishlist (firebaseUser), úsalo como fuente principal
  useEffect(() => {
    const userWishlist = (firebaseUser as any)?.wishlist as Gift[] | undefined;
    if (userWishlist && Array.isArray(userWishlist)) {
      setWishlist(userWishlist);
    }
  }, [firebaseUser]);

  // Validaciones de carga visuales
  if (!firebaseUser) return null; // Protección básica
  if (loadingData) return <div className="min-h-screen bg-[#ed4242] flex items-center justify-center text-white">Cargando perfil...</div>;

  return (
    <div className="min-h-screen w-full bg-[#ed4242] flex flex-col items-center  p-4 gap-6 text-center">
      
      {/* --- Avatar Flotante --- */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
        {/* Usamos la foto de Firebase porque suele ser la mejor fuente para la imagen */}
        <img 
            src={dbUser?.photo || ''} 
            alt={firebaseUser.displayName || ''} 
            className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl"
        />
        <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg text-xl cursor-default">
            🎅
        </div>
      </div>

      {/* --- Datos del Backend (NestJS + MongoDB) --- */}
      <div className="space-y-2 animate-fade-in-up">
        <h2 className="text-4xl font-black text-white drop-shadow-md tracking-tight">
            {/* Priorizamos el nombre de la BD, si no, usamos el de Google */}
            {dbUser?.name || firebaseUser.displayName}
        </h2>
        
        <p className="text-red-100 text-lg font-medium opacity-90">
            {dbUser?.email}
        </p>

        {/* --- Ejemplo de dato exclusivo de tu Backend --- */}
        {/* Si tuvieras un campo 'wishlist' en MongoDB, aquí podrías mostrar cuántos regalos hay */}
 {/* --- Sección de Wishlist --- */}
 <div className="w-full max-w-md mt-6 animate-fade-in">
            
            {/* Título pequeño con contador */}
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
              Mi Lista de Deseos ({wishlist.length})
            </h3>

            {/* Lógica: Si hay regalos, los mostramos. Si no, mensaje vacío. */}
{wishlist.length > 0 ? (
  <ul className="flex flex-col w-full gap-3">
    {wishlist.map((gift, index) => {
      const giftId = gift._id || gift.id || `${gift.name}-${index}`;
      return (
        <li
          key={giftId}
          // Añadimos 'group' para controlar los hijos al hacer hover
          className="
            group flex items-center justify-between gap-3
            bg-white/10 hover:bg-white/20 backdrop-blur-md 
            border border-white/20 
            text-white px-4 py-2 rounded-xl text-sm 
            shadow-sm transition-all duration-200 cursor-default
          "
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Contenedor del Icono con efecto Hover */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Emoji 🎁: se oculta cuando el padre (li) tiene hover */}
              <span className="">
                🎁
              </span>
              
              {/* Botón menos: aparece cuando el padre tiene hover */}

            </div>
            
            <span className="font-semibold truncate">{gift.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {gift.value && (
              <span className="text-xs text-white/80 whitespace-nowrap">
                {gift.value}
              </span>
            )}
            
            {/* Botón de Delete "Rojito" principal */}
            {(gift._id || gift.id) && (
              <button
                onClick={() => handleDeleteGift(giftId as string)}
                className="
                  flex items-center justify-center 
                  w-6 h-6 bg-red-500/80 hover:bg-red-600 
                  text-white rounded-full transition-colors 
                  font-bold text-lg shadow-sm
                "
                aria-label="Eliminar regalo"
              >
                -
              </button>
            )}
          </div>
        </li>
      );
    })}
  </ul>
) : (
  <p className="text-white/40 italic text-sm">
    Aún no has agregado deseos a tu lista.
  </p>
)}
          </div>

            <div className="flex justify-center">
            <AddGiftButton onAddGift={handleAddGift} />
            </div>
      </div>

      {error && <p className="text-yellow-300 bg-red-800/50 px-4 py-2 rounded">{error}</p>}

      {/* --- Botón Logout --- */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-white hover:bg-red-50 text-[#ed4242] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
      >
        <span>Cerrar Sesión</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      </button>

    </div>
  );
}