// components/layout/NavbarPrivate.tsx
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const NavbarPrivate = () => {

  const { user, logout } = useAuth(); // <--- ¡Magia! Acceso directo
    const HomeIcon = () => (
    <img 
    src="../../assests/icons/home-icon.png" 
    alt="Home Icon"
    // 'object-contain' asegura que la imagen no se deforme
    className="w-8 h-8 object-contain" 
  />
    );
    const ProfileIcon = () => (
  <img 
    // Pon aquí la URL de tu imagen de internet
    src="https://img.freepik.com/free-vector/smiley-santa-claus-cartoon-face-illustration_1308-158577.jpg?semt=ais_hybrid&w=740&q=80" 
    alt="Home Icon"
    // 'object-contain' asegura que la imagen no se deforme
    className="w-8 h-8 object-contain" 
  />
)
  const navItems = [
    { to: "/private/events", label: "Inicio", icon: <HomeIcon /> },
    { to: "/private/profile", label: <h1>{user?.displayName || "Perfil"}</h1>, icon: <ProfileIcon/> }

  ];

  return (
    
    <header className="bg-white shadow-md sticky top-0 z-10">
      <style>
    {`@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@700&display=swap');`}
  </style>
      <nav className="container mx-auto p-4 flex justify-between items-center">
       
       
      <div className="relative inline-block overflow-hidden   p-4 ">
  {/* --- CAPA 1: La Imagen de Fondo (Detrás) --- */}
  <img
    src="../../assests/icons/christmas-tree.png"
    alt=""
    // CLASES CLAVE:
    // absolute: Permite moverla libremente dentro del contenedor relativo.
    // z-0: La coloca en la capa más baja.
    // opacity-20: Hace que sea transparente para que se lea el texto.
    // h-40: Un tamaño grande para cubrir el área.
    // -right-8 -bottom-8: La mueve hacia la esquina inferior derecha para un efecto dinámico.
    // -rotate-12: Una pequeña rotación para que parezca un sticker pegado.
    className="absolute -right-0 -bottom-0   h-8 w-8 z-100 pointer-events-none select-none"
  />

  {/* --- CAPA 2: El Texto (Delante) --- */}
  {/* CLASES CLAVE: relative y z-10 para asegurar que esté sobre la imagen */}
  <div className="relative z-10 text-4xl font-extrabold text-[#1E8242] tracking-tight"
  style={{ 
    color: '#1E8242',
    // Aquí aplicamos la fuente que importamos arriba
    fontFamily: "'Mountains of Christmas', cursive" 
  }}>
    Loyola   2025
  </div>
</div>  
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{ 
                color: '#3B3535',
                // Aquí aplicamos la fuente que importamos arriba
                fontFamily: "'Mountains of Christmas', cursive" 
              }}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};