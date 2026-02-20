import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { createPortal } from 'react-dom';

// Modern Glass Toggle Component
const GlassToggle = ({ mode, setMode }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            zIndex: 10
        }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid var(--text-color)',
                opacity: 0.8,
                borderRadius: '50px',
                padding: '4px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                width: 'fit-content'
            }}>
                <LayoutGroup id="glassToggle">
                    <motion.div
                        layoutId="activePill"
                        style={{
                            position: 'absolute',
                            top: '4px',
                            bottom: '4px',
                            left: mode === 'low' ? '4px' : '50%',
                            width: 'calc(50% - 4px)',
                            background: 'var(--accent-primary)',
                            borderRadius: '40px',
                            zIndex: 0,
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <button
                        onClick={() => setMode('low')}
                        style={{
                            position: 'relative',
                            padding: '10px 28px',
                            border: 'none',
                            background: 'transparent',
                            color: mode === 'low' ? 'white' : 'var(--text-color)',
                            cursor: 'pointer',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            transition: 'color 0.3s ease',
                            borderRadius: '40px',
                            zIndex: 1,
                            minWidth: '150px',
                            opacity: mode === 'low' ? 1 : 0.6
                        }}
                    >
                        Baja Fidelidad
                    </button>
                    <button
                        onClick={() => setMode('high')}
                        style={{
                            position: 'relative',
                            padding: '10px 28px',
                            border: 'none',
                            background: 'transparent',
                            color: mode === 'high' ? 'white' : 'var(--text-color)',
                            cursor: 'pointer',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            transition: 'color 0.3s ease',
                            borderRadius: '40px',
                            zIndex: 1,
                            minWidth: '150px',
                            opacity: mode === 'high' ? 1 : 0.6
                        }}
                    >
                        Alta Fidelidad
                    </button>
                </LayoutGroup>
            </div>
        </div>
    );
};

// Component for handling Pan/Zoom logic in fullscreen
const ZoomableImage = ({ src, alt, mobileFrame }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (scale === 1 || !containerRef.current) {
            setPosition({ x: 0, y: 0 });
            return;
        }
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const xPct = (e.clientX - left) / width;
        const yPct = (e.clientY - top) / height;
        const moveX = (0.5 - xPct) * (width * (scale - 1));
        const moveY = (0.5 - yPct) * (height * (scale - 1));
        setPosition({ x: moveX, y: moveY });
    };

    const handleClick = (e) => {
        e.stopPropagation();
        setScale(scale === 1 ? 2.2 : 1);
        if (scale !== 1) setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: scale > 1 ? 'crosshair' : 'zoom-in'
            }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <motion.img
                src={src}
                alt={alt}
                draggable={false}
                animate={{ scale: scale, x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    maxWidth: '85vw',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    borderRadius: mobileFrame ? '32px' : '4px',
                    border: mobileFrame ? '12px solid #111' : 'none',
                    boxShadow: '0 30px 100px rgba(0,0,0,0.5)'
                }}
            />
        </div>
    );
};

const CompareCarousel = ({ lowFiImages, highFiImages, title, mobileFrame = false, desktopFrame = false }) => {
    const [mode, setMode] = useState('low'); // 'low' or 'high'
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const currentImages = mode === 'low' ? lowFiImages : highFiImages;

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentImages]);

    useEffect(() => {
        document.body.style.overflow = isFullscreen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isFullscreen]);

    const toggleFullscreen = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsFullscreen(!isFullscreen);
    };

    const FullscreenOverlay = () => (
        <motion.div
            key="compare-fullscreen"
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
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '3px solid white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 100001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <button
                onClick={prevImage}
                style={{
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '3px solid white',
                    borderRadius: '50%',
                    width: '70px',
                    height: '70px',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 100001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-2px)' }}><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button
                onClick={nextImage}
                style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '3px solid white',
                    borderRadius: '50%',
                    width: '70px',
                    height: '70px',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 100001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(2px)' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <ZoomableImage src={currentImages[currentIndex]} alt={title} mobileFrame={mobileFrame} />
        </motion.div>
    );

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem', // Added more gap from the switch to the container
            position: 'relative',
            marginTop: '2rem',
            alignItems: 'center'
        }}>
            <AnimatePresence>
                {isFullscreen && createPortal(<FullscreenOverlay />, document.body)}
            </AnimatePresence>

            <GlassToggle mode={mode} setMode={setMode} />

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1000px', // Adjusted to exactly 1000px as requested
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-6) 60px 7rem 60px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '650px', // FIXED HEIGHT to avoid jumps
                zIndex: 1,
                overflow: 'hidden' // Keep it clean
            }}>
                <button
                    onClick={toggleFullscreen}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '25px',
                        zIndex: 40,
                        background: 'rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(10px)',
                        color: 'var(--text-color)',
                        border: '1.5px solid var(--text-color)',
                        borderRadius: '10px',
                        width: '42px',
                        height: '42px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                </button>

                {currentImages.length > 1 && (
                    <>
                        <button onClick={prevImage} style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.08)',
                            border: '1.5px solid var(--text-color)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-color)'
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-1px)' }}><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button onClick={nextImage} style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.08)',
                            border: '1.5px solid var(--text-color)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-color)'
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(1px)' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </>
                )}

                <AnimatePresence mode='wait'>
                    <motion.img
                        key={`${mode}-${currentIndex}`}
                        src={currentImages[currentIndex]}
                        alt={`${title} - ${mode} Fidelity`}
                        onClick={toggleFullscreen}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '85%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: mobileFrame ? '32px' : '4px',
                            border: mobileFrame ? '12px solid #111' : 'none',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                            display: 'block',
                            cursor: 'zoom-in'
                        }}
                    />
                </AnimatePresence>

                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    width: '100%',
                    zIndex: 20
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        background: 'rgba(128, 128, 128, 0.08)',
                        padding: '10px 20px',
                        borderRadius: '30px'
                    }}>
                        {currentImages.map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: idx === currentIndex ? '32px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: idx === currentIndex ? 'var(--accent-primary)' : 'var(--text-color)',
                                    opacity: idx === currentIndex ? 1 : 0.2,
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        opacity: 0.9,
                        fontSize: '1rem',
                        fontWeight: 700
                    }}>
                        {mode === 'low' ? 'Bocetos y estructura base' : 'Diseño visual final'}
                        <span style={{ marginLeft: '12px', opacity: 0.5, fontWeight: 400 }}>
                            [{currentIndex + 1} / {currentImages.length}]
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareCarousel;
