import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

const Header = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleNavigation = (id) => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header style={{
            padding: 'var(--space-3) 0',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            background: theme === 'dark' ? 'rgba(11, 17, 24, 0.8)' : 'rgba(169, 222, 249, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1.5px solid var(--text-color)',
            opacity: 1,
            transform: 'translateZ(0)',
            willChange: 'backdrop-filter'
        }}>
            <motion.div style={{ scaleX, position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: 'var(--accent-primary)', transformOrigin: '0%' }} />

            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-color)' }}>
                <Link
                    to="/"
                    onClick={(e) => {
                        if (location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <h1 style={{
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        margin: 0,
                    }}>
                        Alejandro Valle
                    </h1>
                </Link>

                {/* Mobile Menu Toggle */}
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 'var(--space-1)' }}
                    className="mobile-menu-toggle"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {isMenuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </motion.button>

                <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} style={{ gap: 'var(--space-6)', alignItems: 'center' }}>
                    <motion.button whileTap={{ scale: 0.95 }} className="nav-link-elegant" onClick={() => handleNavigation('projects')}>PROYECTOS</motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="nav-link-elegant" onClick={() => handleNavigation('about')}>SOBRE MÍ</motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="nav-link-elegant" onClick={() => handleNavigation('contact')}>CONTACTO</motion.button>
                    <motion.button 
                        whileTap={{ rotate: 15, scale: 0.9 }} 
                        onClick={toggleTheme} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 'var(--space-1)' }}
                        aria-label={theme === 'light' ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
                    >
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                        )}
                    </motion.button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
