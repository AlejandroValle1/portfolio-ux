import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectHero from '../components/ProjectHero';
import ProjectSection from '../components/ProjectSection';
import ProjectGroupLabel from '../components/ProjectGroupLabel';
import ProjectSummary from '../components/ProjectSummary';
import Lightbox from '../components/Lightbox';
import CompareCarousel from '../components/CompareCarousel';
import ParallaxGallery from '../components/ParallaxGallery';
import { TIENDA_DATA } from '../data/projectsData';
import SpotlightGrid from '../components/SpotlightGrid';

const ProjectTienda = () => {
    const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], index: 0 });
    const [hoveredFlowStep, setHoveredFlowStep] = useState(0);
    const [isFlowPaused, setIsFlowPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isFlowPaused) return;
        const interval = setInterval(() => {
            setHoveredFlowStep(prev => (prev + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, [isFlowPaused]);

    const openLightbox = (images, index = 0) => {
        setLightboxState({
            isOpen: true,
            images: Array.isArray(images) ? images : [images],
            index
        });
    };

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {lightboxState.isOpen && (
                    <Lightbox
                        images={lightboxState.images}
                        initialIndex={lightboxState.index}
                        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
                    />
                )}
            </AnimatePresence>

            {/* ── Hero ── */}
            <ProjectHero 
                title={TIENDA_DATA.title}
                tagline={TIENDA_DATA.tagline}
                metadata={TIENDA_DATA.metadata}
                figmaLink={TIENDA_DATA.figmaLink}
                mainImage={null}
                indexItems={[
                    { label: 'Contexto y Punto de Partida', id: 'tienda-contexto' },
                    { label: 'Investigación',               id: 'tienda-investigacion' },
                    { label: 'Proceso de Diseño',           id: 'tienda-proceso' },
                    { label: 'Impacto del Diseño',          id: 'tienda-impacto' },
                ]}
            />

            {/* ── Galería Destacada Parallax ── */}
            <ParallaxGallery 
                darkImage="/Mockup-tienda_tecno dark.webp"
                lightImage="/Mockup-tienda_tecno light.webp"
                alt="Showcase final de Tienda Tecno en desktop"
                objectFit="contain"
                scale={1}
            />

            {/* ════════════════════════════════
                GRUPO 1: Contexto
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Contexto y Punto de Partida" id="tienda-contexto" />

            <ProjectSection
                icon="○"
                title="El desafío"
                text="El cliente tenía dos locales físicos en Buenos Aires pero ninguna presencia digital. La meta era clara: crear una tienda online accesible y funcional, capaz de mostrar el catálogo completo, ampliar el alcance geográfico y generar confianza en un mercado competitivo."
            />

            {/* ════════════════════════════════
                GRUPO 2: Investigación
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Investigación" id="tienda-investigacion" />

            <ProjectSection
                icon="◎"
                title="Análisis de la competencia"
                text="Analicé competidores directos como Maximus, Gaming City y ArmyTech para identificar dónde el mercado fallaba y dónde Tienda Tecno podía diferenciarse."
            >
                <SpotlightGrid 
                    items={[
                        { label: 'Fortaleza del mercado', text: 'Alta variedad de hardware y asesoramiento técnico presencial' },
                        { label: 'Debilidad detectada', text: 'Fricción en el checkout, mala atención postventa y escasa presencia digital' },
                        { label: 'Nuestra oportunidad', text: 'Experiencia cercana donde el asesoramiento acompañe todo el proceso de compra' }
                    ]}
                    renderItem={(item, i) => (
                        <>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '0 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: i === 2 ? 'var(--accent-primary)' : 'inherit' }}>
                                {item.label}
                            </p>
                            <p style={{ fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>{item.text}</p>
                        </>
                    )}
                />
            </ProjectSection>

            <ProjectSection
                icon="◉"
                title="Quiénes son los usuarios"
                text="Definí tres protopersonas que representan los distintos tipos de compradores: Franco (usuario avanzado que busca specs), Camila (principiante que necesita orientación) y Leonardo (funcional, que solo quiere que funcione). Sus objetivos y frustraciones guiaron cada decisión de diseño."
            >
                <SpotlightGrid 
                    items={[
                        { name: 'Franco', type: 'Modo Avanzado', desc: 'Busca especificaciones técnicas precisas y rendimiento extremo para gaming o trabajo pesado.' },
                        { name: 'Camila', type: 'Modo Principiante', desc: 'Necesita orientación, explicaciones claras y recomendaciones armadas para su uso diario.' },
                        { name: 'Leonardo', type: 'Modo Funcional', desc: 'Prioriza que el producto funcione y resuelva su necesidad rápido y sin demasiadas vueltas.' }
                    ]}
                    renderItem={(persona) => (
                        <>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '0 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{persona.type}</p>
                            <p style={{ fontWeight: 600, margin: '0 0 var(--space-2)', fontSize: '1.05rem', color: 'var(--accent-primary)' }}>{persona.name}</p>
                            <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8, lineHeight: 1.6 }}>{persona.desc}</p>
                        </>
                    )}
                />
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 3: Proceso de Diseño
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Proceso de Diseño" id="tienda-proceso" />

            <ProjectSection
                icon="→"
                title="El flujo dentro de la app"
                text="Con esos hallazgos, definí el user flow de la aplicación. El recorrido empezaba con una bienvenida motivadora, luego el registro o ingreso, y desde el inicio el usuario podía elegir entre aprender sobre reciclaje o conocer eco puntos cercanos."
            >
                <motion.div 
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
                    className="user-flow-container"
                >
                    {['Home / Catálogo', 'Filtros y Búsqueda', 'Ficha del Producto', 'Carrito de Compras', 'Checkout seguro'].map((step, i, arr) => (
                        <React.Fragment key={i}>
                            <motion.div 
                                onHoverStart={() => { setHoveredFlowStep(i); setIsFlowPaused(true); }}
                                onHoverEnd={() => setIsFlowPaused(false)}
                                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } }} 
                                animate={hoveredFlowStep === i ? { y: -4, scale: 1.03, borderColor: 'var(--accent-primary)' } : { y: 0, scale: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                className="glass-card capsule-flow" 
                                style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-color)' }}
                            >
                                {step}
                            </motion.div>
                            {i < arr.length - 1 && (
                                <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} style={{ fontWeight: 700, display: 'inline-block' }}>
                                    <motion.span 
                                        animate={{ 
                                            opacity: hoveredFlowStep === i ? 1 : 0.3, 
                                            color: hoveredFlowStep === i ? 'var(--accent-primary)' : 'var(--text-color)', 
                                            x: !isMobile && hoveredFlowStep === i ? [0, 4, 0] : 0,
                                            y: isMobile && hoveredFlowStep === i ? [0, 4, 0] : 0 
                                        }} 
                                        transition={{ 
                                            x: !isMobile && hoveredFlowStep === i ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : { duration: 0.3 },
                                            y: isMobile && hoveredFlowStep === i ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : { duration: 0.3 },
                                            color: { duration: 0.4 },
                                            opacity: { duration: 0.4 }
                                        }} 
                                        style={{ display: 'inline-block' }}>
                                        {isMobile ? '↓' : '→'}
                                    </motion.span>
                                </motion.span>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </ProjectSection>

            <ProjectSection
                icon="⟳"
                title="Iteración: de baja a alta fidelidad"
                text="El proceso pasó de wireframes de baja fidelidad a alta fidelidad, integrando tipografía, color y reforzando las breadcrumbs para dar más control y seguridad al usuario durante el checkout."
            >
                <div style={{ marginTop: 'var(--space-4)', width: '100%' }}>
                    <CompareCarousel
                        lowFiImages={[
                            "/1-Home-baja-fidelidad.webp",
                            "/3-Catalogo-baja-fidelidad.webp",
                            "/4-Ficha-de-producto-baja-fidelidad.webp",
                            "/5-Carrito-de-compras-baja-fidelidad.webp",
                            "/8-Pago-baja-fidelidad.webp"
                        ]}
                        highFiImages={[
                            "/1-Home-alta-fidelidad.webp",
                            "/3-Catalogo-alta-fidelidad.webp",
                            "/4-Ficha-de-producto-alta-fidelidad.webp",
                            "/5-Carrito-de-compras-alta-fidelidad.webp",
                            "/8-Pago-alta-fidelidad.webp"
                        ]}
                        desktopFrame={true}
                    />
                </div>
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 4: Reflexión
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Reflexión" id="tienda-impacto" />

            <ProjectSummary
                title="Impacto del Diseño"
                content={
                    <>
                        El rediseño transformó un catálogo disperso en una <strong>experiencia de venta guiada</strong>. Al implementar un flujo de checkout transparente y estructurar la información para distintos perfiles de usuario, se logró un prototipo que <strong>reduce la fricción cognitiva y garantiza confianza</strong> en cada paso de la compra.
                    </>
                }
            />

            <ProjectSummary
                title="Contexto del Proyecto"
                type="epilogue"
                content={
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)', alignItems: 'center' }}>
                        <div style={{ 
                            flex: isMobile ? '1 1 100%' : '1 1 400px', 
                            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', 
                            lineHeight: 1.75, 
                            maxWidth: isMobile ? '100%' : '72ch' 
                        }}>
                            Tienda Tecno fue desarrollado como proyecto final para el bootcamp intensivo <strong>Digitalers (Telecom)</strong>, donde fui becado. Fue un desafío clave para consolidar metodologías de investigación y diseño orientado a conversión (e-commerce).
                        </div>
                        <motion.div
                            whileHover={!isMobile ? { rotate: 1, scale: 1.03 } : {}}
                            style={{
                                flex: '0 0 320px',
                                padding: 'var(--space-2)',
                                backgroundColor: 'white',
                                transform: !isMobile ? 'rotate(-1.5deg)' : 'none',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                            onClick={() => openLightbox("/Certificado-Asistencia-digitalers-2025_page-0001.webp")}
                        >
                            <img
                                src="/Certificado-Asistencia-digitalers-2025_page-0001.webp"
                                alt="Certificado Digitalers"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </motion.div>
                    </div>
                }
            />

            {/* ── Navegación al siguiente proyecto ── */}
            <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', borderTop: '1px solid var(--border-inactive)', marginTop: 'var(--space-16)' }}>
                <Link to="/separa" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <motion.div
                        className="glass-card btn-elegant"
                        style={{ padding: 'var(--space-12)', borderRadius: '32px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <span style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Siguiente Proyecto</span>
                        <h4 className="brutalist-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginTop: 'var(--space-2)' }}>SE-PA-RÁ →</h4>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectTienda;
