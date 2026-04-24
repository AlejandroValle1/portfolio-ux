import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';

const ComparisonSlider = ({ itemOne, itemTwo, mobileFrame, desktopFrame }) => {
    const { isLowEnd, isMobile } = usePerformance();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (event) => {
        if (!isDragging && event.type !== 'mousemove' && event.type !== 'touchmove') return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const relativeX = x - containerRect.left;
        const position = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));
        
        setSliderPosition(position);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderRadius: mobileFrame ? '32px' : (desktopFrame ? '12px' : '4px'),
                border: mobileFrame ? '12px solid #111' : (desktopFrame ? '16px solid #222' : 'none'),
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
        >
            {/* Item Two (High Fidelity - Bottom) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                clipPath: `inset(0 0 0 ${sliderPosition}%)`, // Muestra solo la parte derecha
                zIndex: 1
            }}>
                <img 
                    src={itemTwo} 
                    alt="High Fidelity"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none',
                        padding: '10px'
                    }}
                />
            </div>

            {/* Item One (Low Fidelity - Top Overlay) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, // Muestra solo la parte izquierda
                zIndex: 1
            }}>
                <img 
                    src={itemOne} 
                    alt="Low Fidelity"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        pointerEvents: 'none',
                        padding: '10px'
                    }}
                />
            </div>

            {/* Slider Line & Handle */}
            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                width: '2px',
                background: 'var(--accent-primary)',
                zIndex: 2,
                boxShadow: '0 0 15px rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '32px' : '44px',
                    height: isMobile ? '32px' : '44px',
                    backgroundColor: 'var(--surface-color)',
                    backdropFilter: (isLowEnd || isMobile) ? 'none' : 'blur(10px)',
                    border: '2px solid var(--accent-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    cursor: 'inherit'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '2px',
                        color: 'var(--accent-primary)',
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight: 'bold'
                    }}>
                        <span>◀</span>
                        <span>▶</span>
                    </div>
                </div>
            </div>

            {/* Floating Labels */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                zIndex: 10,
                pointerEvents: 'none',
                opacity: sliderPosition > 15 ? 1 : 0,
                transition: 'opacity 0.3s'
            }}>
                UX / Wireframe
            </div>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--accent-primary)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                zIndex: 10,
                pointerEvents: 'none',
                opacity: sliderPosition < 85 ? 1 : 0,
                transition: 'opacity 0.3s'
            }}>
                UI / Final
            </div>
        </div>
    );
};

export default ComparisonSlider;
