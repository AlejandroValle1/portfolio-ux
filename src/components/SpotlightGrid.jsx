import React, { createRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';
import { useScrollSpotlight } from '../hooks/useScrollSpotlight';

const SpotlightGrid = ({ items, renderItem, columns = 'repeat(auto-fit, minmax(260px, 1fr))', showCelestial = false }) => {
    const { isLowEnd, isMobile } = usePerformance();
    const isLowPerf = isLowEnd || isMobile;
    
    const refsArray = useRef(items.map(() => createRef()));
    const refs = refsArray.current;
    
    const activeIndex = useScrollSpotlight(refs, isLowPerf);

    return (
        <motion.div 
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
            style={{
                display: 'grid',
                gridTemplateColumns: columns,
                gap: 'var(--space-4)',
                marginTop: 'var(--space-6)'
            }}
        >
            {items.map((item, i) => {
                const isActive = activeIndex === i;
                const dynamicStyle = isLowPerf && activeIndex !== null ? {
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-inactive)',
                    opacity: isActive ? 1 : 0.4,
                    transform: 'none'
                } : {};

                return (
                    <motion.div 
                        key={i} 
                        ref={refs[i]}
                        whileHover={!isLowPerf ? { y: -4, scale: 1.01, borderColor: 'var(--accent-primary)' } : {}} 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } }} 
                        className={`glass-card ${showCelestial ? 'celestial-card' : ''}`} 
                        style={{
                            padding: 'var(--space-4)',
                            borderRadius: '20px',
                            transition: 'all 0.4s ease',
                            ...dynamicStyle
                        }}
                    >
                        {renderItem(item, i, isActive)}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default SpotlightGrid;
