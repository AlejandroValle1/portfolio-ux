import React from 'react';
import StepCard from './StepCard';

/**
 * DesktopStep — One step row in the desktop zigzag layout.
 *
 * Structure:
 *   [left slot]  ←  card lives here when isLeft === true,  empty div otherwise
 *   [center gap] ←  80px spacer; SVG draws through it
 *   [right slot] ←  card lives here when isLeft === false, empty div otherwise
 */
const DesktopStep = ({
    step,
    index,
    isActive,
    isLeft,
    cardRef,
    stepRef,
    isMobile,
    isLowEnd,
    isLast,
}) => (
    <div
        ref={stepRef}
        style={{
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            marginBottom:    isLast ? 0 : 'var(--space-8)',
            position:        'relative',
            zIndex:          2,
            scrollSnapAlign: 'center',
            scrollSnapStop:  'normal',
        }}
    >
        {/* Left slot */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingRight: '40px' }}>
            {isLeft && (
                <div ref={cardRef} style={{ width: '100%' }}>
                    <StepCard
                        step={step}
                        index={index}
                        isActive={isActive}
                        isLeft={true}
                        isMobile={isMobile}
                        isLowEnd={isLowEnd}
                    />
                </div>
            )}
        </div>

        {/* Center gap — SVG bezier curves pass through here */}
        <div style={{ width: '80px', flexShrink: 0 }} />

        {/* Right slot */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingLeft: '40px' }}>
            {!isLeft && (
                <div ref={cardRef} style={{ width: '100%' }}>
                    <StepCard
                        step={step}
                        index={index}
                        isActive={isActive}
                        isLeft={false}
                        isMobile={isMobile}
                        isLowEnd={isLowEnd}
                    />
                </div>
            )}
        </div>
    </div>
);

export default DesktopStep;
