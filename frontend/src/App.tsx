"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from './providers/CartProvider';
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Novelty from "./pages/Novelty";
import Policies from "./pages/Policies";
import Admin from "./pages/Admin";
import ProductDetail from "./components/ProductDetail";
import type { ReactElement } from "react"; // Importación añadida

// Componente para scroll al top al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Definición de tipos para las props de ProtectedRoute
interface ProtectedRouteProps {
  children: ReactElement; // Usamos ReactElement en lugar de JSX.Element
}

function AppWrapper() {
  useEffect(() => {
    // Configuración de Lenis para smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <CartProvider>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/novelty" element={<Novelty />} />
          <Route path="/policies" element={<Policies />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

// Componente de protección de ruta
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const adminPassword = localStorage.getItem('admin-auth');
      if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Acceso Administrativo</h2>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => {
              if (e.target.value === import.meta.env.VITE_ADMIN_PASSWORD) {
                localStorage.setItem('admin-auth', e.target.value);
                setIsAuthenticated(true);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return children;
};

// Componente para página 404
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
    <p className="text-xl text-gray-600">Página no encontrada</p>
    <a 
      href="/" 
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Volver al inicio
    </a>
  </div>
);

export default AppWrapper;