import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.classList.contains('clickable');

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="custom-cursor"
            variants={{
                default: {
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    height: 12,
                    width: 12,
                    backgroundColor: "var(--text-color)",
                    border: "2px solid transparent",
                    opacity: 1,
                    scale: 1
                },
                hover: {
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    height: 40,
                    width: 40,
                    backgroundColor: "transparent",
                    border: "2px solid var(--text-color)",
                    opacity: 0.8,
                    scale: 1
                }
            }}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 35,
                mass: 0.5
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default Cursor;
