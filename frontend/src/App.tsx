"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Novelty from "./pages/Novelty"

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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />}/>
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Novelty" element={<Novelty />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
