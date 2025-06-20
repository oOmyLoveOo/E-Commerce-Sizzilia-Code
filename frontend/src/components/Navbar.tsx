import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { useCart } from '../hooks/useCart';
import { debounce } from "lodash";
import { getProducts } from "../api/products";
import CartSidebar from './CartSidebar';
import logo from "../assets/img/logo.jpg";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Navbar = () => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Función debounce para buscar productos
  const searchProducts = debounce(async (query: string) => {
    if (query.trim().length > 1) { // Solo busca si hay al menos 2 caracteres
      try {
        const products = await getProducts();
        const filtered = products.filter((product: Product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  }, 300);

  useEffect(() => {
    return () => {
      searchProducts.cancel();
    };
  }, [searchProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProducts(query);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchResults([]);
      setIsSearchFocused(false);
    }
  };

  const handleResultClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-2">
          <NavLink to="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={logo} alt="Sizzilia Code logo" className="w-12 h-12" />
              <span className="font-bold text-2xl">Sizzilia Code</span>
            </div>
          </NavLink>

          <h1 className="text-4xl font-semibold text-gray-700">Drop soon✨!</h1>

          <div className="flex items-center gap-4">
            <div className="relative" ref={searchRef}>
              <form 
                onSubmit={handleSearchSubmit}
                className="flex items-center border rounded px-2 py-1 bg-white shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="outline-none text-sm md:text-base ml-2 w-full xs:w-48 md:w-64"
                  aria-label="Buscar productos"
                />
                <button 
                  type="submit"
                  className="ml-1 p-1"
                  aria-label="Buscar"
                  onClick={handleSearchSubmit}
                >
                  <FcSearch className="text-lg cursor-pointer" />
                </button>
              </form>
              
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleResultClick(product._id)}
                    >
                      <img 
                        src={product.image || "/placeholder-product.jpg"} 
                        alt={product.name}
                        className="w-8 h-8 object-cover mr-2 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
                        }}
                      />
                      <div className="truncate">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div 
              className="relative cursor-pointer group"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="text-xl hover:text-blue-600 transition-colors" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs min-w-[20px] h-5 flex items-center justify-center hover:bg-red-600 transition-colors">
                  {state.itemCount}
                </span>
              )}
              
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Ver carrito
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-36 py-6 sm:py-8 md:py-10 border-t border-gray-200 text-sm sm:text-base md:text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 text-blue-600 pb-1"
                : "hover:text-blue-600 transition-colors pb-1"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 text-blue-600 pb-1"
                : "hover:text-blue-600 transition-colors pb-1"
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 text-blue-600 pb-1"
                : "hover:text-blue-600 transition-colors pb-1"
            }
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 text-blue-600 pb-1"
                : "hover:text-blue-600 transition-colors pb-1"
            }
          >
            Contacta
          </NavLink>

          <NavLink
            to="/novelty"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-600 text-blue-600 pb-1"
                : "hover:text-blue-600 transition-colors pb-1"
            }
          >
            Novedad
          </NavLink>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;