import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageWithSkeleton from './ImageWithSkeleton';

/**
 * ProjectHero — Stacked Editorial Layout
 * Title → Tagline → Two-col Metadata → Full-width Hero Image
 */
const ProjectHero = ({ title, tagline, metadata, figmaLink, mainImage, indexItems = [] }) => {
    const { scrollY } = useScroll();
    const imageY = useTransform(scrollY, [0, 800], [0, 150]);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header style={{ paddingTop: '140px', paddingBottom: 0 }}>
            <div className="container">

                {/* Top Section: Title Area (Left) + Index (Right) */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--space-8)',
                    marginBottom: 'var(--space-8)'
                }}>
                    {/* Left: label + title + tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{ flex: '1 1 500px', maxWidth: '100%' }}
                    >
                        <span style={{
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            opacity: 0.85,
                            display: 'block',
                            marginBottom: 'var(--space-3)',
                            fontWeight: 700
                        }}>
                            Caso de Estudio
                        </span>

                        <h1 className="brutalist-title" style={{
                            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                            lineHeight: 0.9,
                            color: 'var(--accent-primary)',
                            marginBottom: 'var(--space-6)'
                        }}>
                            {title}
                        </h1>

                        {figmaLink && (
                            <motion.a
                                href={figmaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-elegant"
                                initial="initial"
                                whileHover="hover"
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '14px 32px',
                                    borderRadius: '50px',
                                    border: '1.5px solid var(--accent-primary)',
                                    color: 'var(--text-color)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path fill="currentColor" d="M8.667 9.417a2.583 2.583 0 1 0 0 5.166h2.583V9.417zm2.583-1.5H8.667a2.583 2.583 0 0 1 0-5.167h2.583zm1.5-5.167v5.167h2.583a2.584 2.584 0 0 0 0-5.167zm2.583 6.666a2.583 2.583 0 0 0-2.583 2.542v.083a2.583 2.583 0 1 0 2.583-2.625m-6.666 6.667a2.584 2.584 0 1 0 2.583 2.584v-2.584z" />
                                </svg>
                                Ver Prototipo
                                <motion.span 
                                    variants={{ initial: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }} 
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ display: 'inline-block', fontWeight: 900 }}
                                >
                                    ↗
                                </motion.span>
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Right: Editorial Index */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                            minWidth: '220px',
                            borderLeft: '2px solid var(--accent-primary)',
                            paddingLeft: 'var(--space-4)',
                            flex: '0 0 auto',
                            marginTop: 'var(--space-4)'
                        }}
                    >
                        <span style={{ 
                            fontSize: '0.7rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.15em', 
                            fontWeight: 800,
                            marginBottom: 'var(--space-2)',
                            opacity: 0.85
                        }}>
                            Índice
                        </span>
                        {indexItems.map((item, i) => {
                            const label = typeof item === 'string' ? item : item.label;
                            const id    = typeof item === 'string' ? null  : item.id;
                            const isHovered = hoveredIndex === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => id && scrollToSection(id)}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '8px',
                                        background: 'none',
                                        border: 'none',
                                        padding: '4px 0',
                                        cursor: id ? 'pointer' : 'default',
                                        textAlign: 'left',
                                        transition: 'transform 0.2s ease',
                                        transform: isHovered && id ? 'translateX(4px)' : 'translateX(0)'
                                    }}
                                    aria-label={`Ir a la sección: ${label}`}
                                >
                                    <span style={{ 
                                        fontSize: '0.7rem', 
                                        fontWeight: 800, 
                                        color: 'var(--accent-primary)', 
                                        opacity: isHovered ? 1 : 0.7,
                                        transition: 'opacity 0.2s'
                                    }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span style={{ 
                                        fontSize: '0.95rem', 
                                        fontWeight: 600, 
                                        letterSpacing: '-0.02em', 
                                        color: 'var(--text-color)',
                                        opacity: isHovered ? 1 : 0.85,
                                        transition: 'opacity 0.2s',
                                        borderBottom: isHovered && id ? '1px solid var(--accent-primary)' : '1px solid transparent',
                                        paddingBottom: '1px'
                                    }}>
                                        {label}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Two-column metadata block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: 'var(--space-8)',
                        borderTop: '1px solid var(--border-inactive)',
                        borderBottom: '1px solid var(--border-inactive)',
                        padding: 'var(--space-6) 0',
                        marginBottom: 'var(--space-8)',
                        alignItems: 'start'
                    }}
                    className="project-hero-metadata"
                >
                    {/* Left: overview paragraph */}
                    <div style={{ paddingRight: 'var(--space-8)' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            opacity: 0.85,
                            fontWeight: 800,
                            display: 'block',
                            marginBottom: 'var(--space-3)'
                        }}>
                            Resumen
                        </span>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.95, fontWeight: 500, margin: 0 }}>
                            {tagline}
                        </p>
                    </div>

                    {/* Right: key-value list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {metadata.map((item, i) => (
                            <div key={i}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    opacity: 0.85,
                                    fontWeight: 800,
                                    display: 'block',
                                    marginBottom: '4px'
                                }}>
                                    {item.label}
                                </span>
                                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Full-width Hero Image */}
                {mainImage && (
                    <div style={{
                        width: '100%',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-inactive)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.08)',
                        marginBottom: 'var(--space-4)',
                        position: 'relative'
                    }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                y: imageY,
                                width: '100%',
                                background: 'rgba(255,255,255,0.35)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '-150px',
                                paddingTop: 'calc(var(--space-8) + 150px)',
                                paddingBottom: 'var(--space-8)',
                                paddingLeft: 'var(--space-8)',
                                paddingRight: 'var(--space-8)',
                            }}
                        >
                            <ImageWithSkeleton
                                src={mainImage}
                                alt={`${title} preview`}
                                style={{
                                    width: '100%',
                                    maxWidth: '700px',
                                    height: 'auto',
                                    maxHeight: '75vh',
                                    objectFit: 'contain',
                                    display: 'block'
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProjectHero;
