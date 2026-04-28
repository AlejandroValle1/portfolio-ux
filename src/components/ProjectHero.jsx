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
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 1024);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ position: 'relative', backgroundColor: 'var(--bg-color)' }}>
            {/* Atmosphere Layer: Only for Title & Index */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: isMobile ? '700px' : '550px',
                backgroundImage: 'var(--hero-gradient-muted)',
                backgroundSize: 'cover',
                zIndex: 0,
                // Máscara más agresiva en móvil para despejar el texto
                WebkitMaskImage: isMobile 
                    ? 'linear-gradient(to bottom, black 40%, transparent 90%)' 
                    : 'linear-gradient(to bottom, black 60%, transparent 100%)',
                maskImage: isMobile 
                    ? 'linear-gradient(to bottom, black 40%, transparent 90%)' 
                    : 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }} />

            {/* Content Wrapper */}
            <div className="container" style={{ 
                position: 'relative', 
                zIndex: 1, 
                paddingTop: isMobile ? '160px' : '140px', // Más aire en móvil
                paddingBottom: 'var(--space-8)'
            }}>
                {/* Top Section: Rebalanced Editorial Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
                    alignItems: 'flex-start',
                    gap: isMobile ? 'var(--space-8)' : 'clamp(var(--space-12), 8vw, var(--space-24))',
                    marginBottom: 'var(--space-12)'
                }}>
                    {/* Left: Content Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
                    >
                        <div>
                            <span style={{
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                opacity: 1, // Opacidad máxima para contraste
                                display: 'block',
                                marginBottom: 'var(--space-3)',
                                fontWeight: 700
                            }}>
                                Caso de Estudio
                            </span>

                            <h1 className="brutalist-title" style={{
                                fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
                                lineHeight: 0.9,
                                color: 'var(--accent-primary)',
                                marginBottom: 'var(--space-4)',
                                textShadow: isMobile 
                                    ? '0 4px 25px rgba(0,0,0,0.15)' // Sombra más fuerte en móvil para contraste
                                    : '0 2px 10px rgba(0,0,0,0.08)'
                            }}>
                                {title}
                            </h1>

                            {tagline && (
                                <p style={{
                                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                    lineHeight: 1.5,
                                    opacity: 0.9,
                                    maxWidth: '60ch',
                                    fontWeight: 500,
                                    margin: 0
                                }}>
                                    {tagline}
                                </p>
                            )}
                        </div>

                        {figmaLink && (
                            <div style={{ 
                                marginTop: 'var(--space-2)',
                                display: isMobile ? 'flex' : 'block',
                                justifyContent: isMobile ? 'center' : 'flex-start' 
                            }}>
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
                                        gap: '12px',
                                        padding: '16px 36px',
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
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Editorial Index — Now more balanced */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-1)',
                            minWidth: isMobile ? '100%' : '260px',
                            borderLeft: '4px solid var(--accent-primary)',
                            padding: 'var(--space-6) var(--space-8)',
                            flex: '0 0 auto',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '16px',
                            alignSelf: isMobile ? 'stretch' : 'center',
                        }}
                    >
                        <span style={{ 
                            fontSize: '0.75rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.25em', 
                            fontWeight: 900,
                            marginBottom: 'var(--space-4)',
                            color: 'var(--text-color)',
                            opacity: 0.9
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
                                        alignItems: 'center',
                                        gap: '16px',
                                        background: 'none',
                                        border: 'none',
                                        padding: '8px 0',
                                        cursor: id ? 'pointer' : 'default',
                                        textAlign: 'left',
                                        transition: 'all 0.3s ease',
                                        color: 'var(--text-color)',
                                    }}
                                    aria-label={`Ir a la sección: ${label}`}
                                >
                                    <span style={{ 
                                        fontSize: '0.75rem', 
                                        fontWeight: 900, 
                                        color: 'var(--text-color)', 
                                        opacity: isHovered ? 1 : 0.7,
                                        fontFamily: 'var(--font-heading)',
                                        width: '24px',
                                        transition: 'opacity 0.3s ease'
                                    }}>
                                        {(i + 1).toString().padStart(2, '0')}
                                    </span>
                                    <span style={{ 
                                        fontSize: '1rem', 
                                        fontWeight: 600,
                                        letterSpacing: '-0.01em',
                                        opacity: isHovered ? 1 : 0.8,
                                        transition: 'all 0.3s ease',
                                        borderBottom: isHovered ? '1px solid var(--text-color)' : '1px solid transparent'
                                    }}>
                                        {label}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Technical Dashboard Metadata Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                        rowGap: isMobile ? 'var(--space-10)' : 'var(--space-8)', // Más espacio entre filas
                        columnGap: isMobile ? '16px' : 'var(--space-8)',
                        borderTop: '1px solid var(--border-inactive)',
                        borderBottom: '1px solid var(--border-inactive)',
                        padding: 'var(--space-8) 0',
                        marginBottom: 'var(--space-12)',
                        alignItems: 'start',
                        width: '100%'
                    }}
                >
                    {metadata.map((item, i) => {
                        const isTools = item.label.toLowerCase().includes('herramientas');
                        
                        return (
                            <div key={i} style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 'var(--space-2)',
                                borderLeft: (i === 0 || (isMobile && i % 2 === 0)) ? 'none' : '1px solid var(--border-inactive)',
                                paddingLeft: (i === 0 || (isMobile && i % 2 === 0)) ? 0 : 'var(--space-6)',
                                minWidth: 0 // Evita que el contenido ensanche la columna
                            }}>
                                <span style={{
                                    fontSize: '0.65rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--accent-primary)',
                                    fontWeight: 900, // Más presencia
                                    display: 'block',
                                    opacity: 0.9
                                }}>
                                    {item.label}
                                </span>
                                
                                {isTools && item.tools ? (
                                    <div style={{ 
                                        display: 'flex', 
                                        gap: isMobile ? '8px' : '16px', // Menos espacio para que entren
                                        flexWrap: 'nowrap',
                                        marginTop: '4px',
                                        width: '100%'
                                    }}>
                                        {item.tools.map((tool, idx) => (
                                            <div key={idx} style={{ 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center', 
                                                gap: '4px' 
                                            }}>
                                                {tool.icon && (
                                                    <div style={{ 
                                                        width: isMobile ? '16px' : '22px', 
                                                        height: isMobile ? '16px' : '22px', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center' 
                                                    }}>
                                                        <img src={tool.icon} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    </div>
                                                )}
                                                <span style={{ fontSize: isMobile ? '0.55rem' : '0.65rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>
                                                    {tool.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span style={{ 
                                        fontSize: isMobile ? '0.9rem' : 'clamp(1rem, 1.2vw, 1.15rem)', 
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        color: 'var(--text-color)',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                {/* Full-width Hero Image */}
                {mainImage && (
                    <div style={{
                        width: '100%',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-inactive)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.08)',
                        marginBottom: 'var(--space-16)',
                        position: 'relative',
                        zIndex: 1
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
        </div>
    );
};

export default ProjectHero;
