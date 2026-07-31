import React from 'react';
import StepCard from './StepCard';

/**
 * MobileStep — One step row in the mobile layout.
 *
 * Structure (top to bottom):
 *   [line above]  ← only shown between steps (index > 0)
 *   [circle]      ← numbered indicator, filled/glowing when visited
 *   [line below]  ← short connector to the card
 *   [StepCard]
 */
const MobileStep = ({
    step,
    index,
    isActive,
    activeIndex,
    cardRef,
    stepRef,
    isMobile,
    isLowEnd,
}) => {
    const lineAboveActive = activeIndex !== null && activeIndex >= index;

    return (
        <div
            ref={stepRef}
            style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                width:          '100%',
            }}
        >
            {/* Vertical conector line leading directly to the card */}
            {index > 0 && (
                <div style={{
                    width:      '2px',
                    height:     '40px',
                    background: lineAboveActive ? 'var(--accent-primary)' : 'var(--border-inactive)',
                    transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
                    boxShadow:  lineAboveActive ? '0 0 8px var(--accent-primary)' : 'none',
                    zIndex:     1,
                }} />
            )}

            {/* Card wrapper */}
            <div ref={cardRef} style={{ width: '100%', marginBottom: 'var(--space-8)', position: 'relative' }}>
                <StepCard
                    step={step}
                    index={index}
                    isActive={isActive}
                    isLeft={true}
                    isMobile={isMobile}
                    isLowEnd={isLowEnd}
                />
            </div>
        </div>
    );
};

export default MobileStep;
