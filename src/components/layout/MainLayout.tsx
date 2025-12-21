// components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { NavbarPrivate } from "./Navbar";


export const MainLayout = () => {
  return (
    <div className="app-container">
      <NavbarPrivate />
      <main className="content">
        {/* Aquí es donde React Router renderizará la página actual */}
        <Outlet />
      </main>
      <footer>© 2025 - Tu Proyecto de Tesis</footer>
    </div>
  );
};