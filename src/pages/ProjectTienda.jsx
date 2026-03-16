import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import CompareCarousel from '../components/CompareCarousel';
import Lightbox from '../components/Lightbox';

// --- Components ---

// Lightbox for zooming images with Mouse Panning
// Lightbox has been moved to its own component file to be shared across projects.

const ImageWithSkeleton = ({ src, alt, style, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    return (
        <div style={{ position: 'relative', width: style?.width || '100%', height: style?.height }}>
            {!isLoaded && (
                <div className="skeleton-shimmer" style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: style?.borderRadius || 'var(--radius)',
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                }} />
            )}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onClick={onClick}
                style={{
                    ...style,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    position: 'relative',
                    zIndex: 1
                }}
            />
        </div>
    );
};

const Chapter = ({ title, text, image, index, isCompare, onImageClick, desktopFrame }) => {
    // Zig-Zag logic: Even index (0, 2) = Default (Text Left), Odd index (1) = Reversed (Image Left)
    // Zig-Zag logic: Now inverted visually (Index 0 acts like odd = Image Left) to balance Hero
    const isEven = (index + 1) % 2 === 0;

    // Special Layout for Comparison Chapter (Top Text, Bottom Image)
    if (isCompare) {
        return (
            <section style={{
                padding: 'var(--space-8) 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '800px' }}
                >
                    <h3 className="brutalist-title" style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: 'var(--accent-primary)',
                        marginBottom: 'var(--space-4)',
                        lineHeight: 1.1
                    }}>
                        <span style={{
                            display: 'block',
                            fontSize: '0.4em',
                            opacity: 0.7,
                            marginBottom: 'var(--space-2)',
                            fontFamily: 'monospace'
                        }}>
                            CAPÍTULO 0{index + 1}
                        </span>
                        {title.split(':')[1] || title}
                    </h3>
                    <p className="project-chapter-text">
                        {text}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ width: '100%' }}
                >
                    <CompareCarousel
                        lowFiImages={image.low}
                        highFiImages={image.high}
                        title={title}
                        desktopFrame={desktopFrame}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        marginTop: 'var(--space-16)',
                        width: '100%',
                        maxWidth: '1000px',
                        position: 'relative',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Mesh Gradient Background */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        opacity: 0.4,
                        pointerEvents: 'none',
                        background: 'radial-gradient(circle at 70% 20%, var(--accent-primary) 0%, transparent 50%), radial-gradient(circle at 30% 80%, #6366f1 0%, transparent 50%)',
                        filter: 'blur(60px)'
                    }} />

                    <div style={{
                        position: 'relative',
                        padding: '48px 24px', // Strict 8px rule (6 * 8)
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px', // 3 * 8
                        zIndex: 1,
                        flexWrap: 'wrap-reverse'
                    }}>
                        {/* Left: Mockup Section */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [-2, 0, -2] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                flex: '1 1 300px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src="/tienda-mockup.webp"
                                alt="Figma Prototype Preview"
                                style={{
                                    width: '320px',
                                    borderRadius: '16px',
                                    boxShadow: '20px 20px 60px rgba(0,0,0,0.5)',
                                    transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            />
                        </motion.div>

                        {/* Right: Content Section */}
                        <div style={{
                            flex: '1.2 1 350px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left'
                        }}>
                            <h2 className="brutalist-title" style={{
                                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                color: '#fff',
                                margin: '0 0 16px 0',
                                lineHeight: 1,
                                letterSpacing: '-0.02em'
                            }}>
                                Prototipo <br /> Interactivo
                            </h2>
                            <p style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '1.1rem',
                                marginBottom: '32px',
                                maxWidth: '450px',
                                fontWeight: 500,
                                lineHeight: 1.4
                            }}>
                                Te invito a testear y conocer en detalle el diseño
                            </p>

                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <a
                                    href="https://www.figma.com/proto/BerM7QNvQfAiNONrNjHLVX/Wireframe-Tienda-Tecno.?node-id=232-705&t=WoaQTWZcyQQrxDfD-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=232%3A705&show-proto-sidebar=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '16px 32px',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '50px',
                                            color: '#fff',
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" fillRule="evenodd" d="M8.667 9.417a2.583 2.583 0 1 0 0 5.166h2.583V9.417zm2.583-1.5H8.667a2.583 2.583 0 0 1 0-5.167h2.583zm1.5-5.167v5.167h2.583a2.584 2.584 0 0 0 0-5.167zm2.583 6.666a2.583 2.583 0 0 0-2.583 2.542v.083a2.583 2.583 0 1 0 2.583-2.625m-6.666 6.667a2.584 2.584 0 1 0 2.583 2.584v-2.584z" clipRule="evenodd" />
                                        </svg>
                                        Ver prototipo en figma
                                    </motion.div>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        );
    }

    // Standard Zig-Zag Layout
    return (
        <section
            style={{
                padding: 'var(--space-8) 0',
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-8)',
                alignItems: 'start',
                width: '100%'
            }}>
                {/*
               ZigZag Logic:
               Even (0, 2): Text Left, Image Right.
            */}
                {isEven ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="brutalist-title" style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                color: 'var(--accent-primary)',
                                marginBottom: 'var(--space-6)',
                                lineHeight: 1.1
                            }}>
                                <span style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    marginBottom: 'var(--space-2)',
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--accent-primary)',
                                    fontWeight: 800
                                }}>
                                    CAPÍTULO 0{index + 1}
                                </span>
                                {title.split(':')[1] || title}
                            </h3>
                            <p className="project-chapter-text">
                                {text}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-4)'
                            }}
                        >
                            {Array.isArray(image) ? (
                                <ImageCarousel
                                    images={image}
                                    title={title}
                                    onImageClick={onImageClick}
                                />
                            ) : (
                                <motion.div
                                    onClick={() => image && onImageClick(image)}
                                    style={{
                                        position: 'relative',
                                        boxShadow: '10px 10px 0px rgba(0,0,0,0.1)',
                                        borderRadius: 'var(--radius)',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        cursor: 'none'
                                    }}
                                    className="zoomable-image"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Expand button removed */}
                                    <ImageWithSkeleton
                                        src={image}
                                        alt={`Visual for ${title}`}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                        onClick={() => image && onImageClick(image)}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    </>
                ) : (
                    <>
                        {/* Swapped DOM Order for ZigZag Effect in Odd chapters */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-4)'
                            }}
                        >
                            {Array.isArray(image) ? (
                                <ImageCarousel
                                    images={image}
                                    title={title}
                                    onImageClick={onImageClick}
                                />
                            ) : (
                                <motion.div
                                    onClick={() => image && onImageClick(image)}
                                    style={{
                                        position: 'relative',
                                        boxShadow: '-10px 10px 0px rgba(0,0,0,0.1)',
                                        borderRadius: 'var(--radius)',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        cursor: 'none'
                                    }}
                                    className="zoomable-image"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Expand button removed */}
                                    <ImageWithSkeleton
                                        src={image}
                                        alt={`Visual for ${title}`}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                        onClick={() => image && onImageClick(image)}
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h3 className="brutalist-title" style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                color: 'var(--accent-primary)',
                                marginBottom: 'var(--space-6)',
                                lineHeight: 1.1
                            }}>
                                <span style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    marginBottom: 'var(--space-2)',
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--accent-primary)',
                                    fontWeight: 800
                                }}>
                                    CAPÍTULO 0{index + 1}
                                </span>
                                {title.split(':')[1]?.trim() || title}
                            </h3>
                            <p className="project-chapter-text">
                                {text}
                            </p>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

const ProjectTienda = () => {
    const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], index: 0 });

    const openLightbox = (images, index = 0) => {
        setLightboxState({
            isOpen: true,
            images: Array.isArray(images) ? images : [images],
            index
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Placeholder images - User needs to replace these
    const sections = [
        {
            title: "Capítulo 1: El punto de partida",
            text: "El cliente tenía dos locales físicos en Buenos Aires pero ninguna presencia digital. La meta era clara: crear una tienda online accesible y funcional, capaz de mostrar el catálogo completo, ampliar el alcance geográfico y generar confianza en un mercado competitivo.",
            image: "/Tienda-Tecno-punto-de-partida_page-0001.webp"
        },
        {
            title: "Capítulo 2: Investigación y competencia",
            text: "Analicé competidores como Maximus, Gaming City y ArmyTech. Vi fortalezas como variedad de hardware y asesoramiento gamer, pero también debilidades como mala atención postventa y escasa visibilidad digital. La oportunidad de Tienda Tecno estaba en diferenciarse con una experiencia cercana, asesoramiento claro y presencia digital sólida.",
            image: "/Tienda-Tecno-benchmark_page-0001.webp"
        },
        {
            title: "Capítulo 3: Conocer a los usuarios",
            text: "Definí tres protopersonas: Franco (usuario avanzado), Camila (principiante) y Leonardo (funcional). Sus objetivos y frustraciones me ayudaron a diseñar una experiencia inclusiva: desde especificaciones técnicas para expertos hasta guías claras para principiantes.",
            image: [
                "/Tienda-Tecno-protopersona_page-0001.webp",
                "/Tienda-Tecno-protopersona_page-0002.webp",
                "/Tienda-Tecno-protopersona_page-0003.webp"
            ]
        },
        {
            title: "Capítulo 4: Estructura y flujo",
            text: "Armé el sitemap con secciones clave: productos, armá tu PC, guía y asesoramiento, comunidad y carrito. Luego definí el user flow para la compra de una PC, incluyendo filtros, ficha de producto, checkout y login. El foco estuvo en reducir fricciones y dar seguridad en cada paso.",
            image: ["/Tienda-tecno-sitemap.webp", "/tienda-tecno-user-flow.webp"]
        },
        {
            title: "Capítulo 5: Iterar y ajustar",
            text: "El proceso pasó de wireframes de baja fidelidad, donde definí la estructura y jerarquía básica, a wireframes de alta fidelidad, donde integré tipografía, color, iconografía y reforcé las breadcrumbs para dar más control al usuario en el checkout. Esta transición muestra cómo pasé de la idea inicial a una experiencia visualmente atractiva y validada.",
            isCompare: true,
            desktopFrame: true,
            image: {
                low: [
                    "/1-Home-baja-fidelidad.webp",
                    "/3-Catalogo-baja-fidelidad.webp",
                    "/4-Ficha-de-producto-baja-fidelidad.webp",
                    "/5-Carrito-de-compras-baja-fidelidad.webp",
                    "/8-Pago-baja-fidelidad.webp"
                ],
                high: [
                    "/1-Home-alta-fidelidad.webp",
                    "/3-Catalogo-alta-fidelidad.webp",
                    "/4-Ficha-de-producto-alta-fidelidad.webp",
                    "/5-Carrito-de-compras-alta-fidelidad.webp",
                    "/8-Pago-alta-fidelidad.webp"
                ]
            }
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <section className="container" style={{ paddingBottom: 'var(--space-16)' }}>

                <AnimatePresence>
                    {lightboxState.isOpen && (
                        <Lightbox
                            images={lightboxState.images}
                            initialIndex={lightboxState.index}
                            onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
                        />
                    )}
                </AnimatePresence>

                {/* HERO */}
                <header style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 'var(--space-8)',
                    padding: 'var(--space-20) 0 var(--space-12) 0',
                    minHeight: '100vh',
                    marginBottom: 'var(--space-12)'
                }}>
                    {/* Centered Content: Title & Text */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-6)',
                        alignItems: 'center',
                        maxWidth: '900px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span style={{
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                opacity: 0.6,
                                display: 'block',
                                marginBottom: 'var(--space-4)',
                                fontWeight: 700
                            }}>
                                CASO DE ESTUDIO
                            </span>
                            <h1 className="brutalist-title" style={{
                                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                                lineHeight: 0.85,
                                letterSpacing: '-0.05em',
                                color: 'var(--accent-primary)',
                                margin: 0,
                                textAlign: 'center'
                            }}>
                                TIENDA<br />TECNO
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                                lineHeight: 1.6,
                                width: '100%',
                                maxWidth: '750px',
                                opacity: 1,
                                textAlign: 'center',
                                fontWeight: 400
                            }}
                        >
                            Tienda Tecno nace como respuesta a la necesidad de expandirse al <span className="serif-title" style={{ fontSize: '1.2em' }}>mundo digital</span>. El objetivo era crear un <span style={{ whiteSpace: 'nowrap' }}>e-commerce</span> que no solo venda hardware, sino que asesore y acompañe al usuario en su compra, replicando la esencia de un local físico.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 'var(--space-3)',
                                marginTop: 'var(--space-4)',
                                width: '100%',
                                maxWidth: '750px',
                                opacity: 0.7,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.9rem',
                                color: 'var(--text-color)'
                            }}
                        >
                            <span>Explorar proceso de diseño</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            marginTop: 'var(--space-8)',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '1000px'
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => openLightbox("/tienda-mockup.webp")}
                            style={{ cursor: 'none', position: 'relative' }}
                            className="zoomable-image"
                        >
                            {/* Expand button removed */}
                            <ImageWithSkeleton
                                src="/tienda-mockup.webp"
                                alt="Tienda Tecno Mockup"
                                style={{
                                    width: 'auto',
                                    maxWidth: '90%',
                                    maxHeight: '60vh',
                                    display: 'block',
                                    border: '2px solid var(--text-color)',
                                    borderRadius: 'var(--radius)',
                                    boxShadow: '15px 15px 0px rgba(0,0,0,0.1)',
                                    objectFit: 'contain'
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </header>

                {/* CONTENT CHAPTERS - ZIG ZAG and TOP-BOTTOM for COMPARE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                    {sections.map((section, idx) => (
                        <Chapter
                            key={idx}
                            index={idx}
                            {...section}
                            onImageClick={openLightbox}
                        />
                    ))}
                </div>

                {/* KEY LEARNING CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        backgroundColor: 'var(--surface-color)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid var(--text-color)',
                        padding: 'var(--space-12) var(--space-8)',
                        margin: 'var(--space-16) 0',
                        borderRadius: '24px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 className="brutalist-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-6)', color: 'var(--accent-primary)' }}>
                            LO QUE APRENDÍ
                        </h3>
                        <p className="project-chapter-text" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', maxWidth: '900px', margin: '0 auto', fontWeight: '500' }}>
                            Este proyecto me enseñó que un e‑commerce no se trata solo de mostrar productos, sino de transmitir <span className="serif-title" style={{ fontSize: '1.2em' }}>confianza</span> en cada paso. Las <span className="serif-title" style={{ fontSize: '1.2em' }}>migas de pan</span> fueron un recurso simple pero poderoso para dar seguridad y control al usuario durante el checkout.
                        </p>
                    </div>
                </motion.div>

                {/* EPILOGUE CARD */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--space-12)',
                        alignItems: 'start',
                        borderTop: '1px solid var(--text-color)',
                        paddingTop: 'var(--space-16)'
                    }}
                >
                    <div>
                        <span style={{
                            fontFamily: 'monospace',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            display: 'block',
                            marginBottom: 'var(--space-4)'
                        }}>
                            Epílogo
                        </span>
                        <h2 className="brutalist-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-6)' }}>
                            MI FORMACIÓN
                        </h2>
                        <p className="project-chapter-text">
                            Este proyecto fue parte de mi experiencia en el bootcamp intensivo Digitalers de Telecom junto a Education IT, donde fui becado durante 4 meses. Al finalizar, obtuve el certificado que valida mi recorrido inicial en la disciplina. Para mí, Tienda Tecno no solo fue un ejercicio de diseño, sino también un paso fundamental en mi camino como diseñador UX.
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        style={{
                            padding: 'var(--space-4)',
                            backgroundColor: 'white',
                            transform: 'rotate(-1deg)',
                            boxShadow: 'var(--shadow-lg)',
                            cursor: 'none'
                        }}
                        className="zoomable-image"
                        onClick={() => openLightbox("/Certificado-Asistencia-digitalers-2025_page-0001.webp")}
                    >
                        {/* Placeholder image for certificate */}
                        <img
                            src="/Certificado-Asistencia-digitalers-2025_page-0001.webp"
                            alt="Certificado Digitalers"
                            style={{ width: '100%', display: 'block' }}
                        />
                    </motion.div>
                </motion.div>

                {/* Navegación entre Proyectos */}
                <section style={{
                    marginTop: 'var(--space-24)',
                    borderTop: '1px solid rgba(128,128,128,0.1)',
                    paddingTop: 'var(--space-16)',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.9rem',
                        opacity: 0.6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        marginBottom: 'var(--space-4)'
                    }}>
                        Explorar otros proyectos
                    </p>
                    <Link
                        to="/separa"
                        onClick={() => window.scrollTo(0, 0)}
                        style={{ textDecoration: 'none' }}
                    >
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="btn-elegant"
                            style={{
                                display: 'inline-block',
                                padding: 'var(--space-12) var(--space-8)',
                                backgroundColor: 'var(--surface-color)',
                                border: '1px solid var(--text-color)',
                                borderRadius: '32px',
                                width: '100%',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <h2 className="brutalist-title" style={{
                                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                                color: 'var(--text-color)',
                                margin: 0
                            }}>
                                SE-PA-RÁ
                            </h2>
                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--text-color)',
                                opacity: 0.7,
                                marginTop: 'var(--space-2)'
                            }}>
                                App Mobile Design
                            </p>
                        </motion.div>
                    </Link>
                </section>
            </section>
        </motion.div>
    );
};

export default ProjectTienda;
