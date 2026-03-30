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
        const newScale = Math.max(1, Math.min(4, scale - e.deltaY * 0.001));
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

        const moveX = (width * scale * 0.5) * (0.5 - xPct);
        const moveY = (height * scale * 0.5) * (0.5 - yPct);

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
                        scale: { type: "tween", ease: "linear", duration: 0.1 },
                        opacity: { duration: 0.3 }
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        padding: '0 12vw'
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

                        {/* Counter - High contrast WHITE on DARK */}
                        {imageList.length > 1 && scale === 1 && (
                            <div style={{
                                marginTop: '2rem',
                                color: 'white',
                                background: 'rgba(255,255,255,0.1)',
                                border: '2px solid white', // Strong white border
                                padding: '10px 24px',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                fontWeight: '900',
                                letterSpacing: '0.15em',
                                backdropFilter: 'blur(10px)',
                                pointerEvents: 'none'
                            }}>
                                {currentIndex + 1} / {imageList.length}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - AAA Standard & Perfect Alignment */}
            {imageList.length > 1 && scale === 1 && (
                <>
                    <button
                        onClick={prevImage}
                        aria-label="Ver imagen anterior"
                        style={{
                            position: 'absolute',
                            left: 'clamp(12px, 3vw, 40px)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3001,
                            transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                            padding: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-2px)' }}>
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
                        aria-label="Ver imagen siguiente"
                        style={{
                            position: 'absolute',
                            right: 'clamp(12px, 3vw, 40px)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3001,
                            transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                            padding: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(2px)' }}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </>
            )}

            <button
                onClick={onClose}
                aria-label="Cerrar imagen ampliada"
                style={{
                    position: 'absolute',
                    top: 'clamp(10px, 4vw, 40px)',
                    right: 'clamp(10px, 4vw, 40px)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '3px solid white',
                    borderRadius: '50%',
                    width: '56px',
                    height: '56px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3020,
                    transition: 'all 0.3s ease',
                    padding: 0
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ff4444';
                    e.currentTarget.style.borderColor = '#ff4444';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'white';
                }}
                title="Cerrar imagen"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </motion.div>,
        document.body
    );
};

export default Lightbox;
