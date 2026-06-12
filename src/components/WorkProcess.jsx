import React from 'react';
import { motion } from 'framer-motion';

import { usePerformance }         from '../context/PerformanceContext';
import { workSteps }              from '../data/workSteps';
import { useWorkProcessScroll }   from '../hooks/useWorkProcessScroll';

import ProgressSVG  from './WorkProcess/ProgressSVG';
import MobileStep   from './WorkProcess/MobileStep';
import DesktopStep  from './WorkProcess/DesktopStep';

/* ─── WorkProcess ────────────────────────────────────────── */
const WorkProcess = () => {
    const { isLowEnd, isMobile } = usePerformance();

    const {
        containerRef,
        cardRefs,
        stepRefs,
        svgData,
        activeIndex,
        smoothSegs,
    } = useWorkProcessScroll(isMobile, workSteps.length);

    return (
        <section
            id="process"
            className="container"
            style={{ paddingBottom: 'var(--space-24)', paddingTop: 'var(--space-12)' }}
        >
            <motion.h2
                className="brutalist-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize:     'clamp(3rem, 8vw, 6rem)',
                    marginBottom: 'var(--space-12)',
                    color:        'var(--accent-primary)',
                    textAlign:    'center',
                }}
            >
                PROCESO DE TRABAJO
            </motion.h2>

            <div ref={containerRef} style={{ position: 'relative' }}>

                {/* ── SVG progress curves (desktop only) ── */}
                {!isMobile && svgData && (
                    <ProgressSVG
                        svgData={svgData}
                        activeIndex={activeIndex}
                        smoothSegs={smoothSegs}
                        isLowEnd={isLowEnd}
                    />
                )}

                {/* ── Step rows ── */}
                {workSteps.map((step, index) => {
                    const isLeft   = index % 2 === 0;
                    const isActive = activeIndex === index;

                    if (isMobile) {
                        return (
                            <MobileStep
                                key={index}
                                step={step}
                                index={index}
                                isActive={isActive}
                                isVisited={activeIndex !== null && activeIndex >= index}
                                activeIndex={activeIndex}
                                cardRef={el => { cardRefs.current[index] = el; }}
                                stepRef={el => { stepRefs.current[index] = el; }}
                                isMobile={isMobile}
                                isLowEnd={isLowEnd}
                            />
                        );
                    }

                    return (
                        <DesktopStep
                            key={index}
                            step={step}
                            index={index}
                            isActive={isActive}
                            isLeft={isLeft}
                            isLast={index === workSteps.length - 1}
                            cardRef={el => { cardRefs.current[index] = el; }}
                            stepRef={el => { stepRefs.current[index] = el; }}
                            isMobile={isMobile}
                            isLowEnd={isLowEnd}
                        />
                    );
                })}

            </div>
        </section>
    );
};

export default WorkProcess;
