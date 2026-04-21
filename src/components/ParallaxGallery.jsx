import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ParallaxGallery — A high-impact showcase component
 * 
 * Features:
 * - Theme-aware (switches between light/dark images)
 * - Smooth scroll-based parallax
 * - Premium overflow container with bleed
 */
const ParallaxGallery = ({ 
    darkImage, 
    lightImage, 
    alt = "Project Gallery",
    objectFit = "contain",
    scale = 1.12
}) => {
    const [theme, setTheme] = useState('dark');
    const containerRef = useRef(null);

    // ── Theme Detection ──
    useEffect(() => {
        // Initial set
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme);

        // Observer for theme changes (controlled in App.jsx via dataset)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setTheme(document.documentElement.getAttribute('data-theme'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    // ── Parallax Logic ──
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We use a spring for ultra-smooth movement
    const smoothYProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Movement: -10% to 10% for a more subtle, controlled reveal
    const y = useTransform(smoothYProgress, [0, 1], ['-10%', '10%']);

    return (
        <div 
            className="container" 
            style={{ 
                marginTop: 'var(--space-4)',
                marginBottom: 'var(--space-12)'
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '85vh', 
                    maxHeight: '1000px', 
                    borderRadius: '32px',
                    overflow: 'hidden',
                    /* Background sync */
                    backgroundColor: theme === 'light' ? '#A9DEF9' : '#0B1118',
                    border: '1px solid var(--border-inactive)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Controlled Scale Container */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: objectFit === 'cover' ? '-10%' : 0, 
                        y,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        scale: scale
                    }}
                >
                    <motion.img
                        key={theme} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        src={theme === 'light' ? lightImage : darkImage}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: objectFit,
                            display: 'block'
                        }}
                    />
                </motion.div>

                {/* Subtle Overlay to help focus on UI */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.05)',
                    pointerEvents: 'none'
                }} />
            </div>
        </div>
    );
};

export default ParallaxGallery;
