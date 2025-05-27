import logo from "../assets/logo.jpg";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
        
      <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Sizzilia Code logo" className="w-12 h-12" />
          <span className="font-bold text-2xl">Sizzilia Code</span>
        </div>

        <h1 className="text-4xl font-semibold text-gray-700">Drop soon✨!</h1>

        <div className="flex items-center py-4 gap-6 md:gap-4">

          <a
            href="/signin"
            className="flex items-center gap-1 text-sm md:text-base"
          >
            <FaUserCircle className="text-lg" />
            Iniciar sesión
          </a>

          <div className="flex items-center border rounded px-2 py-1">
            <FcSearch className="text-lg" />
            <input
              type="text"
              placeholder="Buscar productos"
              className="outline-none text-sm md:text-base ml-2"
            />
          </div>

          <div className="relative">
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
              3
            </span>
          </div>

        </div>
      </div>

      <div className="flex justify-center gap-36 p-12 border-t border-gray-200 text-2xl">
        <a href="/">Inicio</a>
        <a href="/products">Productos</a>
        <a href="/about">Nosotros</a>
        <a href="contact">Contacta</a>
      </div>
    </nav>
  );
};

export default Navbar;
