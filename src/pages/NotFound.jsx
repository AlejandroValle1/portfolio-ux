import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container"
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                padding: 'var(--space-12) 0'
            }}
        >
            <h1 className="brutalist-title" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', color: 'var(--accent-primary)', marginBottom: 'var(--space-4)' }}>
                404
            </h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 'var(--space-4)', opacity: 0.9 }}>
                Parece que esta ruta no existe.
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: 'var(--space-8)', opacity: 0.7, maxWidth: '450px', lineHeight: 1.5 }}>
                Incluso las mejores experiencias de usuario tienen un camino sin salida. Volvamos al inicio para seguir explorando.
            </p>
            <Link to="/" className="btn-elegant" style={{ 
                padding: '16px 36px', 
                borderRadius: 'var(--radius-pill)', 
                textDecoration: 'none',
                fontWeight: 'var(--fw-bold)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: '1.5px solid var(--accent-primary)',
                color: 'var(--text-color)'
            }}>
                Volver al inicio →
            </Link>
        </motion.div>
    );
};

export default NotFound;
