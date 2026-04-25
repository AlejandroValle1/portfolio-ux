import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { usePerformance } from '../context/PerformanceContext';
import ComparisonSlider from './ComparisonSlider';

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

// Component that combines Slider + Zoom + Pan for Fullscreen
const ZoomableComparisonSlider = ({ srcLow, srcHigh, alt, mobileFrame, desktopFrame }) => {
    const { isLowEnd, isMobile } = usePerformance();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDraggingSlider, setIsDraggingSlider] = useState(false);
    const containerRef = useRef(null);

    const handleWheel = (e) => {
        e.stopPropagation();
        const delta = -e.deltaY * 0.0015;
        const newScale = Math.max(1, Math.min(5, scale + delta));
        setScale(newScale);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
    };

    const handleMove = (e) => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

        // Lógica de Slider (solo si no estamos haciendo pan o si el usuario toca el centro)
        if (isDraggingSlider) {
            const relativeX = x - containerRect.left;
            const pos = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));
            setSliderPosition(pos);
            return;
        }

        // Lógica de Paneo (solo si hay zoom)
        if (scale > 1) {
            const xPct = (x - containerRect.left) / containerRect.width;
            const yPct = (y - containerRect.top) / containerRect.height;
            const moveX = (0.5 - xPct) * (containerRect.width * (scale - 1));
            const moveY = (0.5 - yPct) * (containerRect.height * (scale - 1));
            setPosition({ x: moveX, y: moveY });
        }
    };

    const handleSliderMouseDown = (e) => {
        e.stopPropagation();
        setIsDraggingSlider(true);
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDraggingSlider(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchend', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchend', handleGlobalMouseUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: isDraggingSlider ? 'grabbing' : (scale > 1 ? 'crosshair' : 'default'),
                userSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none'
            }}
        >
            <motion.div
                animate={{ scale: scale, x: position.x, y: position.y }}
                transition={{ 
                    type: "spring", stiffness: 300, damping: 30,
                    scale: { type: "tween", ease: "easeOut", duration: 0.15 }
                }}
                style={{
                    position: 'relative',
                    width: '85vw',
                    height: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto'
                }}
            >
                {/* Image High (Bottom) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`, // Muestra solo la parte derecha
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}>
                    <img
                        src={srcHigh}
                        alt={alt}
                        draggable={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: mobileFrame ? '32px' : (desktopFrame ? '12px' : '4px'),
                            border: mobileFrame ? '12px solid #111' : (desktopFrame ? '16px solid #222' : 'none'),
                            boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
                            pointerEvents: 'none'
                        }}
                    />
                </div>

                {/* Image Low (Top Overlay) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, // Muestra solo la parte izquierda
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}>
                    <img
                        src={srcLow}
                        alt={`${alt} Low Fi`}
                        draggable={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: mobileFrame ? '32px' : (desktopFrame ? '12px' : '4px'),
                            border: mobileFrame ? '12px solid #111' : (desktopFrame ? '16px solid #222' : 'none'),
                            pointerEvents: 'none'
                        }}
                    />
                </div>

                {/* Slider Handle */}
                <div 
                    onMouseDown={handleSliderMouseDown}
                    onTouchStart={handleSliderMouseDown}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${sliderPosition}%`,
                        width: '3px',
                        background: 'var(--accent-primary)',
                        zIndex: 10,
                        cursor: 'ew-resize',
                        boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(10px)',
                        border: '3px solid var(--accent-primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                            <span>◀</span><span>▶</span>
                        </div>
                    </div>
                </div>

                {/* Floating Labels for Fullscreen */}
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '12px' : '30px',
                    left: isMobile ? '12px' : '30px',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    padding: isMobile ? '4px 10px' : '8px 16px',
                    borderRadius: '20px',
                    fontSize: isMobile ? '9px' : '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    zIndex: 20,
                    pointerEvents: 'none',
                    opacity: sliderPosition > 15 ? 1 : 0,
                    transition: 'opacity 0.3s'
                }}>
                    UX / Wireframe
                </div>
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '12px' : '30px',
                    right: isMobile ? '12px' : '30px',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    padding: isMobile ? '4px 10px' : '8px 16px',
                    borderRadius: '20px',
                    fontSize: isMobile ? '9px' : '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    zIndex: 20,
                    pointerEvents: 'none',
                    opacity: sliderPosition < 85 ? 1 : 0,
                    transition: 'opacity 0.3s'
                }}>
                    UI / Final
                </div>
            </motion.div>
        </div>
    );
};

const FullscreenOverlay = ({ srcLow, srcHigh, title, mobileFrame, desktopFrame, onClose, onNext, onPrev, isMobile, currentIndex, totalCount }) => {
    const swipe = useTouchSwipe(onNext, onPrev);
    return (
        <motion.div
            {...swipe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 15, 0.99)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        {/* Navigation Buttons (Close, Next, Prev) */}
        <button
            aria-label="Cerrar"
            onClick={onClose}
            style={{
                position: 'absolute',
                top: isMobile ? '16px' : '30px',
                right: isMobile ? '16px' : '30px',
                background: isMobile ? 'transparent' : 'rgba(255,255,255,0.1)',
                border: isMobile ? 'none' : '3px solid white',
                borderRadius: '50%',
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                color: 'white',
                cursor: 'pointer',
                zIndex: 100002,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
            }}
        >
            <svg width={isMobile ? "28" : "28"} height={isMobile ? "28" : "28"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {isMobile && (
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '85vw',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '30px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 100003,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button 
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Anterior"
                    style={{
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <div style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '9px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    pointerEvents: 'none'
                }}>
                    <span>Explorar</span>
                    <span style={{ opacity: 0.5 }}>[{currentIndex + 1} / {totalCount}]</span>
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Siguiente"
                    style={{
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        )}

        {!isMobile && (
            <>
                <button
                    aria-label="Anterior"
                    onClick={onPrev}
                    style={{
                        position: 'absolute',
                        left: '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '3px solid white',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 100002,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button
                    aria-label="Siguiente"
                    onClick={onNext}
                    style={{
                        position: 'absolute',
                        right: '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '3px solid white',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 100002,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </>
        )}

        <ZoomableComparisonSlider 
            srcLow={srcLow} 
            srcHigh={srcHigh} 
            alt={title} 
            mobileFrame={mobileFrame} 
            desktopFrame={desktopFrame} 
        />
    </motion.div>
    );
};

const Portal = ({ children }) => {
    if (typeof document === 'undefined') return null;
    return createPortal(children, document.body);
};

const CompareCarousel = ({ lowFiImages, highFiImages, title, mobileFrame = false, desktopFrame = false }) => {
    const { isLowEnd, isMobile } = usePerformance();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % lowFiImages.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + lowFiImages.length) % lowFiImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lowFiImages]);

    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isFullscreen]);

    const toggleFullscreen = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsFullscreen(!isFullscreen);
    };

    const swipe = useTouchSwipe(
        () => nextImage(),
        () => prevImage()
    );

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 'var(--space-4)' : 'var(--space-8)',
            position: 'relative',
            marginTop: '0',
            alignItems: 'center',
            padding: isMobile ? 'var(--space-4) 0' : 'var(--space-12) 0'
        }}>
            <AnimatePresence>
                {isFullscreen && (
                    <Portal>
                        <FullscreenOverlay
                            srcLow={lowFiImages[currentIndex]}
                            srcHigh={highFiImages[currentIndex]}
                            title={title}
                            mobileFrame={mobileFrame}
                            desktopFrame={desktopFrame}
                            onClose={() => setIsFullscreen(false)}
                            onNext={nextImage}
                            onPrev={prevImage}
                            isMobile={isMobile}
                            currentIndex={currentIndex}
                            totalCount={lowFiImages.length}
                        />
                    </Portal>
                )}
            </AnimatePresence>

            {/* 1. Texto de contexto (Arriba) */}
            <div style={{
                textAlign: 'center',
                color: 'var(--text-color)',
                opacity: 0.9,
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)'
            }}>
                <div>
                    {isMobile ? 'Explorar Galería' : 'Deslizá para comparar'}
                    <span style={{ marginLeft: '12px', opacity: 0.5, fontWeight: 400 }}>
                        [{currentIndex + 1} / {lowFiImages.length}]
                    </span>
                </div>

                {/* Main CTA for mobile - Moved to top */}
                {isMobile && (
                    <motion.div 
                        onClick={toggleFullscreen}
                        animate={{ y: [0, -2, 0], scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                            border: '1.5px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer'
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                        Comparar Wireframe vs Final
                    </motion.div>
                )}
            </div>

            {/* 2. Contenedor del Slider con Flechas Laterales */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1400px',
                gap: isMobile ? '0' : 'var(--space-4)',
                padding: isMobile ? '0' : '0 20px'
            }}>
                {!isMobile && lowFiImages.length > 1 && (
                    <button 
                        aria-label="Ver imagen anterior"
                        onClick={prevImage} 
                        style={{
                            flexShrink: 0,
                            background: 'var(--surface-color)',
                            backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(10px)',
                            border: '1.5px solid var(--text-color)',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-color)',
                            transition: 'all 0.3s'
                        }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                )}

                <div
                    className="compare-carousel-box"
                    {...swipe}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: isMobile ? (mobileFrame ? '300px' : '100%') : (mobileFrame ? '550px' : '1100px'),
                        height: isMobile ? 'auto' : (mobileFrame ? '600px' : '650px'),
                        minHeight: isMobile ? '300px' : (mobileFrame ? '500px' : '600px'),
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        overflow: 'visible',
                        userSelect: 'none',
                        touchAction: 'pan-y',
                    }}
                >
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            style={{ width: '100%', height: '100%' }}
                            onClick={toggleFullscreen}
                        >
                            {isMobile ? (
                                <div style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    padding: 'var(--space-2)' 
                                }}>
                                    <img 
                                        src={highFiImages[currentIndex]} 
                                        alt={title}
                                        style={{
                                            width: 'auto',
                                            maxWidth: '100%',
                                            height: 'auto',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            borderRadius: mobileFrame ? '32px' : '12px',
                                            border: mobileFrame ? '12px solid #111' : 'none',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                                        }}
                                    />
                                    {/* Small hint label at the bottom (optional, kept subtle) */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '9px',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        pointerEvents: 'none'
                                    }}>
                                        Tocar para ampliar
                                    </div>
                                </div>
                            ) : (
                                <ComparisonSlider 
                                    itemOne={lowFiImages[currentIndex]}
                                    itemTwo={highFiImages[currentIndex]}
                                    mobileFrame={mobileFrame}
                                    desktopFrame={desktopFrame}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {!isMobile && lowFiImages.length > 1 && (
                    <button 
                        aria-label="Ver imagen siguiente"
                        onClick={nextImage} 
                        style={{
                            flexShrink: 0,
                            background: 'var(--surface-color)',
                            backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(10px)',
                            border: '1.5px solid var(--text-color)',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-color)',
                            transition: 'all 0.3s'
                        }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                )}
            </div>

            {/* 3. Indicadores (Abajo, limpio) */}
            <div className="compare-indicators" style={{ marginTop: '0' }}>
                {lowFiImages.map((_, idx) => (
                    <div
                        key={idx}
                        className={`compare-indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompareCarousel;
