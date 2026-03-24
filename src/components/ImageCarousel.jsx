import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            if (diff > 0) onSwipeLeft();   // swipe izquierda = siguiente
            else onSwipeRight();            // swipe derecha = anterior
        }
        touchStartX.current = null;
    };

    return { onTouchStart, onTouchEnd };
}

const ImageCarousel = ({ images, title, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const swipe = useTouchSwipe(nextImage, prevImage);

    if (!images || images.length === 0) return null;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0',
            marginBottom: '2rem'
        }}>
            {/* The Main Content Box */}
            <div
                className="carousel-inner-box"
                {...swipe}
                style={{
                    position: 'relative',
                    backgroundColor: 'var(--surface-color)',
                    borderRadius: 'var(--radius)',
                    paddingBottom: '3.5rem',
                    boxShadow: '0 15px 45px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    transition: 'background-color 0.3s ease',
                    userSelect: 'none',
                    touchAction: 'pan-y', // permite scroll vertical, captura horizontal
                }}
            >
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            className="carousel-nav-button prev-button"
                            onClick={prevImage}
                            aria-label="Ver imagen anterior"
                            style={{
                                position: 'absolute',
                                left: 'clamp(12px, 3vw, 30px)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0,0,0,0.15)',
                                border: '2.5px solid var(--text-color)',
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                minWidth: '44px',
                                minHeight: '44px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-color)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 1,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: 0
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--accent-primary)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.15)';
                                e.currentTarget.style.borderColor = 'var(--text-color)';
                                e.currentTarget.style.color = 'var(--text-color)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-1px)' }}>
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button
                            className="carousel-nav-button next-button"
                            onClick={nextImage}
                            aria-label="Ver imagen siguiente"
                            style={{
                                position: 'absolute',
                                right: 'clamp(12px, 3vw, 30px)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0,0,0,0.15)',
                                border: '2.5px solid var(--text-color)',
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                minWidth: '44px',
                                minHeight: '44px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-color)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 1,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: 0
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--accent-primary)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.15)';
                                e.currentTarget.style.borderColor = 'var(--text-color)';
                                e.currentTarget.style.color = 'var(--text-color)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(1px)' }}>
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </>
                )}

                <div
                    className="carousel-image-viewport zoomable-image"
                    style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
                    onClick={() => onImageClick && onImageClick(images, currentIndex)}
                >
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            loading="lazy"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: '4px',
                                pointerEvents: 'none',
                            }}
                        />
                    </AnimatePresence>
                </div>

                {/* Dot indicators — touch target 44px, estilo visual vía CSS */}
                {images.length > 1 && (
                    <div className="carousel-indicators">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                role="button"
                                aria-label={`Ir a imagen ${idx + 1}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                                style={{
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <div className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
