import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '../context/PerformanceContext';
import Lightbox from './Lightbox';
import ImageWithSkeleton from './ImageWithSkeleton';
import { useScrollSpotlight } from '../hooks/useScrollSpotlight';

const InterestCardContent = ({ isMobile, onOpenGallery, isActive }) => {
    const [activeTab, setActiveTab] = React.useState('default');

    const interests = [
        {
            id: 'musica',
            label: '🎹 Música',
            content: 'La música es el combustible de mi creatividad. Desde bandas sonoras para concentrarme hasta ritmos que me mantienen motivado; te invito a descubrir qué está sonando hoy en mi perfil.',
            link: 'https://open.spotify.com/user/11159312069?si=57cd591e593c401b'
        },
        {
            id: 'cosmos',
            label: '🌌 Cosmos',
            content: 'Fascinado por la inmensidad. Me encanta observar las estrellas para recordar lo pequeña y a la vez inmensa que es nuestra historia.'
        },
        {
            id: 'fotografia',
            label: '📸 Fotografía',
            content: 'La fotografía me permite observar el mundo con otros ojos. Aquí comparto algunos fragmentos de mi mirada; te invito a explorarlos y ampliarlos para ver los detalles.',
            images: ['/Fotos para galeria about me.webp', '/Fotos para galeria about me 2.webp', '/Fotos para galeria about me 3.webp']
        },
        {
            id: 'social',
            label: '🗣️ Social',
            content: 'Me encanta charlar, conocer gente apasionada y construir vínculos laborales fructíferos. ¿Hablamos?',
            link: 'https://www.linkedin.com/in/alejandro-valle-295a13306'
        }
    ];

    return (
        <AnimatePresence mode="wait">
            {activeTab === 'default' ? (
                <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'var(--fw-black)', marginBottom: 'var(--space-3)', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                        MÁS ALLÁ DEL DISEÑO
                    </h3>
                    <p style={{ fontSize: '1rem', marginBottom: 'var(--space-4)', opacity: 0.8, lineHeight: 1.5 }}>
                        Tocá las etiquetas para conocer un poco más sobre mis intereses personales.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: isMobile ? '12px' : '10px',
                        width: '100%'
                    }}>
                        {interests.map((item) => (
                            <motion.button
                                key={item.id}
                                className="interest-tag"
                                onClick={() => setActiveTab(item.id)}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'var(--accent-glow)', // Adaptable al tema (Naranja en Día, Azul en Noche)
                                    borderColor: 'var(--accent-primary)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: isMobile ? '10px 12px' : '8px 20px',
                                    borderRadius: 'var(--radius-pill)',
                                    border: '1.5px solid var(--border-inactive)',
                                    fontSize: isMobile ? '0.75rem' : '0.85rem',
                                    fontWeight: 'var(--fw-bold)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-color)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'Inter, sans-serif',
                                    width: '100%'
                                }}
                            >
                                {(() => {
                                    const [emoji, ...textParts] = item.label.split(' ');
                                    return (
                                        <>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                transform: 'translateY(-1px)' // Micro-ajuste para nivelar
                                            }}>
                                                {emoji}
                                            </span>
                                            <span>{textParts.join(' ')}</span>
                                        </>
                                    );
                                })()}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="active"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', width: '100%' }}>
                        <span style={{ fontWeight: 'var(--fw-bold)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {interests.find(i => i.id === activeTab).label}
                        </span>
                        <button
                            onClick={() => setActiveTab('default')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-primary)',
                                fontWeight: 'var(--fw-bold)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                padding: '4px 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            VOLVER
                        </button>
                    </div>

                    {activeTab === 'fotografia' ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                                {interests.find(i => i.id === 'fotografia').content}
                            </p>
                            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', justifyContent: 'center' }}>
                                {interests.find(i => i.id === 'fotografia').images.map((img, i) => (
                                    <ImageWithSkeleton
                                        key={i}
                                        src={img}
                                        alt={`Fotografía ${i + 1} de Ale`}
                                        onClick={() => onOpenGallery(interests.find(i => i.id === 'fotografia').images, i)}
                                        style={{
                                            height: '110px',
                                            width: '90px',
                                            borderRadius: 'var(--radius-small)',
                                            objectFit: 'cover',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.95, margin: 0 }}>
                                {interests.find(i => i.id === activeTab).content}
                            </p>
                        </div>
                    )}

                    {interests.find(i => i.id === activeTab).link && (
                        <a
                            href={interests.find(i => i.id === activeTab).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-elegant"
                            style={{
                                marginTop: 'var(--space-4)',
                                padding: '12px 24px',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                borderRadius: 'var(--radius-pill)',
                                textDecoration: 'none',
                                fontWeight: 'var(--fw-bold)',
                                color: 'var(--text-color)',
                                border: '1.5px solid var(--accent-primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                display: 'inline-block',
                                alignSelf: 'center',
                                width: isMobile ? '100%' : 'auto'
                            }}
                        >
                            {activeTab === 'musica' ? 'ABRIR MI SPOTIFY ↗' : (activeTab === 'social' ? 'CONECTEMOS EN LINKEDIN ↗' : 'VER MÁS ↗')}
                        </a>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const About = () => {
    const { isLowEnd, isMobile } = usePerformance();
    const [lightboxState, setLightboxState] = React.useState({ isOpen: false, images: [], index: 0 });

    const openLightbox = (images, index = 0) => {
        setLightboxState({
            isOpen: true,
            images: Array.isArray(images) ? images : [images],
            index
        });
    };

    // Refs for each bento card (scroll spotlight)
    const cardRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ];
    const activeIndex = useScrollSpotlight(cardRefs, isLowEnd || isMobile);

    const getCardStyle = (index, baseStyle = {}) => {
        const styleCopy = { ...baseStyle };
        if (styleCopy.border) {
            delete styleCopy.border;
        }
        return {
            ...styleCopy,
            transition: 'all 0.4s ease',
            ...((isLowEnd || isMobile) && activeIndex !== null ? {
                boxShadow: activeIndex === index
                    ? '0 10px 30px rgba(0,0,0,0.1), 0 0 0 1.5px var(--accent-primary)'
                    : '0 4px 20px rgba(0,0,0,0.05), 0 0 0 1.5px var(--border-inactive)',
                opacity: activeIndex === index ? 1 : 0.4,
                transform: 'none',
            } : {}),
            backdropFilter: (isLowEnd || isMobile) ? 'none' : (baseStyle.backdropFilter || 'blur(12px)'),
        };
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 0 0 1.5px var(--border-inactive)',
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: {
            y: -8,
            boxShadow: '0 15px 40px rgba(0,0,0,0.1), 0 0 0 1.5px var(--accent-primary)',
            transition: { duration: 0.3, ease: "easeOut" }
        },
        mobileScroll: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="about" className="container" style={{ paddingBottom: 'var(--space-24)', paddingTop: 'var(--space-4)' }}>
            <AnimatePresence>
                {lightboxState.isOpen && (
                    <Lightbox
                        images={lightboxState.images}
                        initialIndex={lightboxState.index}
                        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
                    />
                )}
            </AnimatePresence>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    marginBottom: 'var(--space-12)',
                    color: 'var(--accent-primary)',
                    fontWeight: 'var(--fw-black)',
                    textAlign: 'center'
                }}
            >
                SOBRE MÍ
            </motion.h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className="about-bento-layout"
            >
                {/* Block 1: Quién soy (Principal) */}
                <motion.div
                    ref={cardRefs[0]}
                    variants={itemVariants}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className="bento-about-1 about-bento-card"
                    style={getCardStyle(0, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                        borderRadius: 'var(--radius-inner)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1.5px solid var(--border-inactive)',
                        cursor: 'default',
                    })}
                >
                    <h3 style={{ fontSize: '2rem', fontWeight: 'var(--fw-black)', marginBottom: 'var(--space-4)', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                        DISEÑADOR UX/UI · DISEÑO CON DIRECCIÓN
                    </h3>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 'var(--fw-medium)', opacity: 0.9 }}>
                        Diseño experiencias digitales combinando metodologías de investigación UX con un enfoque estratégico. Mi objetivo es crear interfaces limpias, accesibles y estructuradas que resuelvan problemas reales de usabilidad y eviten la saturación visual.
                    </p>
                </motion.div>

                {/* Block 2: Foto */}
                <motion.div
                    ref={cardRefs[1]}
                    variants={itemVariants}
                    whileHover={!isMobile ? {
                        ...itemVariants.hover,
                        boxShadow: '0 15px 40px var(--accent-glow)'
                    } : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className="bento-about-2 about-bento-card"
                    style={getCardStyle(1, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 'var(--radius-inner)',
                        border: '1.5px solid var(--border-inactive)',
                        overflow: 'hidden',
                        position: 'relative'
                    })}
                >
                    <ImageWithSkeleton
                        src="/ale-valle-selfie.webp"
                        alt="Alejandro Valle"
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '300px',
                            objectFit: 'cover',
                            filter: 'grayscale(10%) contrast(110%)',
                            borderRadius: 'var(--radius-inner)'
                        }}
                    />
                </motion.div>

                {/* Block 3: Formación */}
                <motion.div
                    ref={cardRefs[2]}
                    variants={itemVariants}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className="bento-about-3 about-bento-card"
                    style={getCardStyle(2, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-6)',
                        borderRadius: 'var(--radius-inner)',
                        border: '1.5px solid var(--border-inactive)',
                    })}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)', opacity: 0.7, fontWeight: 'var(--fw-bold)' }}>
                        Formación
                    </h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                        Estudié 4 años de la carrera de <strong>Ciencias de la Comunicación</strong> (UNT), lo que me dio una base sólida en análisis de discurso, lenguaje y procesos de información. Aplico estos conocimientos para estructurar contenidos claros y flujos lógicos en productos digitales.
                    </p>
                </motion.div>

                {/* Block 4: Mi recorrido (UX) */}
                <motion.div
                    ref={cardRefs[3]}
                    variants={itemVariants}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className="bento-about-4 about-bento-card"
                    style={getCardStyle(3, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-6)',
                        borderRadius: 'var(--radius-inner)',
                        border: '1.5px solid var(--border-inactive)',
                    })}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)', opacity: 0.7, fontWeight: 'var(--fw-bold)' }}>
                        Logro
                    </h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                        <strong>Becado en el bootcamp Digitalers (Telecom)</strong> — seleccionado entre cientos de postulantes. Formación intensiva en investigación de usuarios, prototipado y diseño orientado a <strong>conversión y negocio</strong>. El curso también me marcó la importancia de la <strong>accesibilidad</strong> y el diseño funcional <strong>para todas las personas</strong>.
                    </p>
                </motion.div>

                {/* Block 5: Mi filosofía */}
                <motion.div
                    ref={cardRefs[4]}
                    variants={itemVariants}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className="bento-about-5 about-bento-card"
                    style={getCardStyle(4, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                        borderRadius: 'var(--radius-inner)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1.5px solid var(--border-inactive)',
                        cursor: 'default',
                    })}
                >
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'var(--fw-black)', marginBottom: 'var(--space-3)', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                        CRECER EN EQUIPO
                    </h3>
                    <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Creo en la colaboración <strong>transparente y sin egos</strong>. Aporto curiosidad constante, apertura para recibir <strong>feedback constructivo</strong> y el compromiso de iterar para mejorar el producto en conjunto.
                    </p>
                </motion.div>

                {/* Block 6: Intereses Interactivos */}
                <motion.div
                    ref={cardRefs[5]}
                    variants={itemVariants}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileInView={isMobile ? "mobileScroll" : undefined}
                    whileTap={{ scale: 0.98 }}
                    className={`bento-about-6 about-bento-card ${isMobile && activeIndex === 5 ? 'is-active' : ''}`}
                    style={getCardStyle(5, {
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-8)',
                        borderRadius: 'var(--radius-inner)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        border: '1.5px solid var(--border-inactive)',
                        minHeight: '240px',
                        position: 'relative',
                        overflow: 'hidden'
                    })}
                >
                    <InterestCardContent isMobile={isMobile} onOpenGallery={openLightbox} isActive={activeIndex === 5} />
                </motion.div>

                {/* Block 7: Descargar CV */}
                <motion.a
                    ref={cardRefs[6]}
                    href="/CV - ALEJANDRO VALLE.pdf"
                    download="CV - ALEJANDRO VALLE.pdf"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView={isMobile ? "mobileScroll" : "visible"}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="bento-about-cv about-bento-card btn-elegant"
                    style={getCardStyle(6, {
                        backdropFilter: 'blur(12px)',
                        border: '1.5px solid var(--border-inactive)',
                        padding: 'var(--space-8)',
                        borderRadius: 'var(--radius-inner)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: 'var(--space-4)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        minHeight: '200px',
                        zIndex: 5,
                        position: 'relative'
                    })}
                >
                    <motion.div
                        variants={{
                            hover: {
                                y: -6,
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }
                        }}
                        style={{ fontSize: '3.5rem', marginBottom: '4px' }}
                    >
                        📄
                    </motion.div>

                    <motion.div
                        variants={{
                            hover: { y: -2 }
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: 'var(--fw-black)',
                            margin: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'inherit'
                        }}>
                            DESCARGAR CV
                        </h3>
                        <p style={{
                            fontSize: '0.9rem',
                            opacity: 0.7,
                            margin: 0,
                            marginTop: '2px',
                            fontWeight: 'var(--fw-medium)',
                            color: 'inherit'
                        }}>
                            PDF
                        </p>
                    </motion.div>


                </motion.a>
            </motion.div>
        </section>
    );
};

export default About;
