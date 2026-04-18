import React, { useState, useEffect, useRef } from 'react';

const ImageWithSkeleton = ({ src, alt, style, onClick, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    return (
        <div 
            className={`skeleton-container ${className}`}
            style={{ 
                position: 'relative', 
                width: style?.width || '100%', 
                height: style?.height || 'auto',
                overflow: 'hidden',
                borderRadius: style?.borderRadius || 'var(--radius)'
            }}
        >
            {!isLoaded && (
                <div className="skeleton-shimmer" style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                }} />
            )}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onClick={onClick}
                style={{
                    ...style,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    position: 'relative',
                    zIndex: 1,
                    display: 'block'
                }}
            />
        </div>
    );
};

export default ImageWithSkeleton;
