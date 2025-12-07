import { createBrowserRouter, Outlet, useLocation, Link } from "react-router"; // Usa 'dom' para web
import Home from "../components/home";
import Events from "../components/events/event";
import { useAuth } from "../context/AuthContext";
import Profile from "../components/profile/profile";


// Layout simple para la raíz
function RootLayout() {
  const location = useLocation();
  // Condición para mostrar el Navbar: NO mostrarlo si la ruta es exactamente '/'
  const showNavbar = location.pathname !== '/'; 
  return (
    <div className="flex flex-col min-h-screen">
      {/* Condición para renderizar el Navbar */}
      {showNavbar && <Navbar />} 
      
      {/* Contenido principal: El padding solo aplica si hay Navbar para evitar espacio innecesario en Home */}
      <main >
        <Outlet />
      </main>

    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    // El RootLayout se encarga de la estructura general (Navbar, Footer)
    // y usa <Outlet /> para renderizar sus hijos.
    element: <RootLayout />,
    children: [
      {
        index: true, // Ruta por defecto para "/" (Landing/Home)
        element: <Home />,
      },
      {
        path: "login",
        element: <h1>Hola</h1>

      },
      {
        path: "events",
        element: < Events/>

      },
      {
        path: "profile",
        element: < Profile/>

      },
      {
        path: "*", // Ruta para manejar 404

      }
    ],
  },
]);

const HomeIcon = () => (
  <img 
    // Pon aquí la URL de tu imagen de internet
    src="./assests/icons/christmas-wreath.png" 
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
);function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth(); // <--- ¡Magia! Acceso directo

  const navItems = [
    { to: "/events", label: "Inicio", icon: <HomeIcon /> },
    { to: "/profile", label: <h1>{user?.displayName || "Perfil"}</h1>, icon: <ProfileIcon/> }

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
    src="./assests/icons/christmas-tree.png"
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
              className={`flex items-center space-x-1 p-2 rounded-lg transition-colors duration-200 
                ${location.pathname === item.to
                  ? ' text-indigo-700 font-semibold'
                  : ' hover:bg-gray-100 hover:text-indigo-600 '
                }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}