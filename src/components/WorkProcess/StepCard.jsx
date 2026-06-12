import React from 'react';
import { motion } from 'framer-motion';

/**
 * StepCard — Presentational card for a single work-process step.
 *
 * Layout rule (zigzag):
 *   Left cards  → number on RIGHT (inner/center side), content pushed LEFT  (marginRight: auto)
 *   Right cards → number on LEFT  (inner/center side), content pushed RIGHT (marginLeft:  auto)
 *
 * Animations:
 *   - Enter:   slide-in from outer edge + fade (whileInView, once)
 *   - Hover:   lift + accent border + shadow (desktop only)
 *   - Active:  spring-driven lift, accent border, glow ring, number reveals in accent color
 */
const StepCard = ({ step, index, isActive, isLeft, isMobile, isLowEnd }) => {
    const numberOnLeft = !isLeft && !isMobile;

    return (
        <motion.div
            /* ── Enter animation ── */
            initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -40 : 40), y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}

            /* ── Active state — spring physics ── */
            animate={!isMobile ? {
                y:         isActive ? -8 : 0,
                boxShadow: isActive
                    ? '0 28px 56px rgba(0,0,0,0.2), 0 0 0 1.5px var(--accent-primary)'
                    : '0 0px 0px rgba(0,0,0,0)',
            } : {}}

            /* ── Unified transition ── */
            transition={!isMobile ? {
                opacity:   { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                x:         { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                y:         { type: 'spring', stiffness: 280, damping: 28, mass: 0.8 },
                boxShadow: { duration: 0.35, ease: 'easeOut' },
            } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}

            /* ── Hover (desktop, non-active) ── */
            whileHover={!isMobile && !isActive ? {
                y: -6,
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                transition: { duration: 0.25 },
            } : undefined}

            style={{
                backgroundColor: 'var(--surface-color)',
                backdropFilter:  (isLowEnd || isMobile) ? 'none' : 'blur(12px)',
                border:          `1.5px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-inactive)'}`,
                borderRadius:    'var(--radius-card)',
                padding:         isMobile ? 'var(--space-4)' : 'var(--space-8)',
                position:        'relative',
                overflow:        'hidden',
                width:           '100%',
                cursor:          'default',
                // Border color via CSS transition (colors can't spring in FM)
                transition:      'border-color 0.35s ease',
            }}
        >
            {/* ── Active glow accent bar (desktop: side, mobile: top) ── */}
            <motion.div
                aria-hidden="true"
                animate={isMobile ? {
                    opacity: isActive ? 1 : 0,
                    scaleX:  isActive ? 1 : 0.4,
                } : {
                    opacity: isActive ? 1 : 0,
                    scaleY:  isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                    position:        'absolute',
                    top:             isMobile ? 0 : '15%',
                    bottom:          isMobile ? undefined : '15%',
                    left:            isMobile ? '50%' : (numberOnLeft ? 0 : undefined),
                    right:           isMobile ? undefined : (!numberOnLeft ? 0 : undefined),
                    x:               isMobile ? '-50%' : undefined,
                    width:           isMobile ? '60px' : '3px',
                    height:          isMobile ? '3px' : undefined,
                    borderRadius:    '99px',
                    background:      'var(--accent-primary)',
                    boxShadow:       '0 0 12px 4px var(--accent-primary)',
                    transformOrigin: 'center',
                }}
            />

            {/* ── Mobile connection dot on top border (acts as half-dot timeline node) ── */}
            {isMobile && (
                <motion.div
                    aria-hidden="true"
                    animate={{
                        backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--surface-color)',
                        borderColor:     isActive ? 'var(--accent-primary)' : 'var(--border-inactive)',
                        scale:           isActive ? 1.15 : 1,
                        boxShadow:       isActive ? '0 0 10px var(--accent-primary)' : 'none',
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                        position:     'absolute',
                        top:          '-6px',
                        left:         '50%',
                        x:            '-50%',
                        width:        '12px',
                        height:       '12px',
                        borderRadius: '50%',
                        border:       '1.5px solid var(--border-inactive)',
                        zIndex:       10,
                    }}
                />
            )}

            {/* ── Background number — zigzag inner side ── */}
            <motion.div
                animate={{
                    opacity: isActive ? 0.32 : 0.05,
                    color:   isActive ? 'var(--accent-primary)' : 'var(--text-color)',
                    scale:   isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                    position:   'absolute',
                    top:        '50%',
                    left:       numberOnLeft ? '8%' : undefined,
                    right:      !numberOnLeft ? '8%' : undefined,
                    y:          '-50%',
                    fontSize:   'clamp(5.5rem, 8.5vw, 8rem)',
                    fontWeight: 'var(--fw-black)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    transformOrigin: 'center',
                }}
            >
                {index + 1}
            </motion.div>

            {/* ── Content — pushed to the OUTER edge ── */}
            <div style={{
                position:    'relative',
                zIndex:      1,
                maxWidth:    isMobile ? '75%' : '340px',
                marginLeft:  numberOnLeft ? 'auto' : undefined,
                marginRight: !numberOnLeft && !isMobile ? 'auto' : undefined,
            }}>
                <span style={{
                    fontSize:      '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color:         'var(--accent-primary)',
                    fontWeight:    'var(--fw-bold)',
                    display:       'block',
                    marginBottom:  'var(--space-2)',
                }}>
                    {step.subtitle}
                </span>

                <h3 style={{
                    fontSize:      isMobile ? '1.8rem' : 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight:    'var(--fw-black)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight:    1.05,
                    marginBottom:  'var(--space-3)',
                    color:         'var(--text-color)',
                }}>
                    {step.title}
                </h3>

                <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.8 }}>
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

export default StepCard;
