import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectSepara from './pages/ProjectSepara';
import ProjectTienda from './pages/ProjectTienda';
import Cursor from './components/Cursor';
import ScrollUpButton from './components/ScrollToTop';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [theme, setTheme] = useState(() => {
    // 1. Ver si el usuario ya eligió manualmente un tema en una visita anterior
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // 2. Si no, consultar la preferencia del sistema operativo del usuario
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    
    // 3. Por defecto absoluto (si no se puede detectar o no tiene preferencia explícita)
    return 'dark';
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', 'es');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleFirstTab = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    window.addEventListener('keydown', handleFirstTab);
    return () => window.removeEventListener('keydown', handleFirstTab);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <Cursor />
      <ScrollToTop />
      <ScrollUpButton />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/separa" element={<ProjectSepara />} />
            <Route path="/tiendatecno" element={<ProjectTienda />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
