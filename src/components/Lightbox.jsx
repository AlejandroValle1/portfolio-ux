import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Hook de swipe táctil
function useTouchSwipe(onSwipeLeft, onSwipeRight) {
    const touchStartX = useRef(null);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) onSwipeLeft();
            else onSwipeRight();
        }
        touchStartX.current = null;
    };

    return { onTouchStart, onTouchEnd };
}

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Ensure images is always an array
    const imageList = Array.isArray(images) ? images : [images];
    const image = imageList[currentIndex];

    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [currentIndex]);

    // Prevent scrolling when Lightbox is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    if (!image) return null;

    const handleWheel = (e) => {
        e.stopPropagation();
        // Mayor sensibilidad para el zoom con rueda
        const delta = -e.deltaY * 0.0015;
        const newScale = Math.max(1, Math.min(5, scale + delta));
        setScale(newScale);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
        if (scale === 1 || !containerRef.current) {
            setPosition({ x: 0, y: 0 });
            return;
        }

        const { width, height } = containerRef.current.getBoundingClientRect();
        const xPct = e.clientX / width;
        const yPct = e.clientY / height;

        // Paneo dinámico basado en la escala
        const moveX = (width * (scale - 1) * 0.5) * (0.5 - xPct) * 2;
        const moveY = (height * (scale - 1) * 0.5) * (0.5 - yPct) * 2;

        setPosition({ x: moveX, y: moveY });
    };

    const toggleZoom = (e) => {
        e.stopPropagation();
        setScale(prev => prev === 1 ? 2.5 : 1);
        if (scale !== 1) setPosition({ x: 0, y: 0 });
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    const swipe = useTouchSwipe(
        () => { if (scale === 1) nextImage(); },
        () => { if (scale === 1) prevImage(); }
    );

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...swipe}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(2, 6, 15, 0.99)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: scale > 1 ? 'crosshair' : 'zoom-in',
                touchAction: 'pan-y',
                userSelect: 'none',
            }}
            onClick={onClose}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: 1,
                        scale: scale,
                        x: position.x,
                        y: position.y
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                        scale: { type: "tween", ease: "easeOut", duration: 0.15 },
                        opacity: { duration: 0.3 },
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        y: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        paddingTop: '80px', // Añadido para que la pill no tape la foto
                        paddingBottom: '40px'
                    }}
                >
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={image}
                            alt={`Zoomed view ${currentIndex + 1}`}
                            draggable={false}
                            style={{
                                maxWidth: 'calc(100vw - clamp(60px, 15vw, 140px))',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                pointerEvents: 'auto',
                                boxShadow: '0 30px 100px rgba(0,0,0,0.9)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                            onClick={toggleZoom}
                        />

                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Top Header Pill - iOS Style (Matching Carousel) */}
            {imageList.length > 1 && scale === 1 && (
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3010,
                    pointerEvents: 'none'
                }}>
                    <div style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        background: 'rgba(0,0,0,0.4)',
                        padding: '8px 24px',
                        borderRadius: '30px',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        Explorar Galería <span style={{ opacity: 0.5 }}>[{currentIndex + 1} / {imageList.length}]</span>
                    </div>
                </div>
            )}

            {/* Navigation Arrows - iOS Style */}
            {imageList.length > 1 && scale === 1 && (
                <>
                    <motion.button
                        onClick={prevImage}
                        aria-label="Ver imagen anterior"
                        whileHover={{ scale: 1.2, opacity: 1, y: "-50%" }}
                        initial={{ opacity: 0.7, y: "-50%" }}
                        animate={{ opacity: 0.7, y: "-50%" }}
                        style={{
                            position: 'absolute',
                            left: 'clamp(12px, 3vw, 40px)',
                            top: '50%',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3001,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={nextImage}
                        aria-label="Ver imagen siguiente"
                        whileHover={{ scale: 1.2, opacity: 1, y: "-50%" }}
                        initial={{ opacity: 0.7, y: "-50%" }}
                        animate={{ opacity: 0.7, y: "-50%" }}
                        style={{
                            position: 'absolute',
                            right: 'clamp(12px, 3vw, 40px)',
                            top: '50%',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3001,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </motion.button>
                </>
            )}

            <motion.button
                onClick={onClose}
                aria-label="Cerrar imagen ampliada"
                whileHover={{ scale: 1.1, color: '#ff4444' }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3020,
                    transition: 'color 0.2s ease'
                }}
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </motion.button>
        </motion.div>,
        document.body
    );
};

export default Lightbox;
