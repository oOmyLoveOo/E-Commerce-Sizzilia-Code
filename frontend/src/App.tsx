"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { Route, Routes } from "react-router-dom";
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

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/novelty" element={<Novelty />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;