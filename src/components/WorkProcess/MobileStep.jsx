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
    isVisited,
    activeIndex,
    cardRef,
    stepRef,
    isMobile,
    isLowEnd,
}) => {
    const lineAboveActive = activeIndex !== null && activeIndex >= index - 1;

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
            {/* Vertical line above circle (between steps) */}
            {index > 0 && (
                <div style={{
                    width:      '2px',
                    height:     '28px',
                    background: lineAboveActive ? 'var(--accent-primary)' : 'var(--border-inactive)',
                    transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
                    boxShadow:  lineAboveActive ? '0 0 8px var(--accent-primary)' : 'none',
                }} />
            )}

            {/* Numbered circle indicator */}
            <div style={{
                width:           '32px',
                height:          '32px',
                borderRadius:    '50%',
                border:          `2px solid ${isVisited ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                backgroundColor: isVisited ? 'var(--accent-primary)' : 'var(--surface-color)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontSize:        '0.75rem',
                fontWeight:      'var(--fw-black)',
                color:           isVisited ? 'var(--bg-color)' : 'var(--text-color)',
                transition:      'all 0.4s ease',
                flexShrink:      0,
                boxShadow:       isActive ? '0 0 10px var(--accent-primary)' : 'none',
                zIndex:          2,
            }}>
                {index + 1}
            </div>

            {/* Short vertical line below circle */}
            <div style={{
                width:      '2px',
                height:     '16px',
                background: isVisited ? 'var(--accent-primary)' : 'var(--border-inactive)',
                transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
                boxShadow:  isVisited ? '0 0 8px var(--accent-primary)' : 'none',
            }} />

            {/* Card */}
            <div ref={cardRef} style={{ width: '100%', marginBottom: 'var(--space-2)' }}>
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
