import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");

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

            const isZoomable = target.classList.contains('zoomable-image') || target.closest('.zoomable-image');

            if (isZoomable) {
                setCursorText("Ampliar");
                setIsHovering(true);
            } else if (isClickable) {
                setCursorText("");
                setIsHovering(true);
            } else {
                setCursorText("");
                setIsHovering(false);
            }
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
                    scale: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                expand: {
                    x: mousePosition.x - 40,
                    y: mousePosition.y - 40,
                    height: 80,
                    width: 80,
                    backgroundColor: "var(--accent-primary)",
                    border: "2px solid var(--accent-primary)",
                    opacity: 0.9,
                    scale: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }}
            animate={cursorText ? "expand" : isHovering ? "hover" : "default"}
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
                zIndex: 1000000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <AnimatePresence>
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            pointerEvents: 'none'
                        }}
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Cursor;
