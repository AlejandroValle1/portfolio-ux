import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarousel = ({ images, title, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

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
            <div style={{
                position: 'relative',
                width: 'calc(100% + 40px)',
                left: '-20px',
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-4) 80px',
                paddingBottom: '3.5rem',
                boxShadow: '0 15px 45px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                minHeight: '400px',
                transition: 'background-color 0.3s ease'
            }}>
                {/* Maximize Icon - Universal Accessibility */}
                {/* Expand button removed as per user request */}

                {/* Navigation Arrows - AAA Contrast Standards & Perfect Alignment */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            style={{
                                position: 'absolute',
                                left: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0,0,0,0.15)',
                                border: '2.5px solid var(--text-color)',
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-color)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 1,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: 0 // Reset padding for perfect centering
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
                            onClick={nextImage}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0,0,0,0.15)',
                                border: '2.5px solid var(--text-color)',
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-color)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 1,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: 0 // Reset padding for perfect centering
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
                    className="zoomable-image"
                    style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
                    onClick={() => onImageClick && onImageClick(images, currentIndex)}
                >
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${title} - Image ${currentIndex + 1}`}
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
                                borderRadius: '4px'
                            }}
                        />
                    </AnimatePresence>
                </div>

                {/* Dots indicator - High Contrast Navigation */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        display: 'flex',
                        gap: '10px',
                        zIndex: 20,
                        background: 'rgba(128, 128, 128, 0.1)', // Subtle contrasting area
                        padding: '8px 16px',
                        borderRadius: '20px'
                    }}>
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: idx === currentIndex ? '30px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: idx === currentIndex
                                        ? 'var(--accent-primary)'
                                        : 'var(--text-color)',
                                    opacity: idx === currentIndex ? 1 : 0.35,
                                    border: idx === currentIndex ? 'none' : '1px solid rgba(128,128,128,0.2)',
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
