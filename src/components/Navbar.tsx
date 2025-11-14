import { Link, useLocation } from "react-router-dom";
import { Home, Info, Zap } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<any>; label: string }) => {
    const isActive = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
          isActive
            ? "bg-white text-blue-600 shadow-lg"
            : "text-white hover:bg-blue-500"
        }`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Zap size={24} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Examen Desarrollo Web</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <NavLink to="/" icon={Home} label="Inicio" />
          <NavLink to="/acercade" icon={Info} label="Acerca de" />
          <NavLink to="/consumo" icon={Zap} label="Consumo" />
        </div>
      </div>
    </nav>
  );
}
