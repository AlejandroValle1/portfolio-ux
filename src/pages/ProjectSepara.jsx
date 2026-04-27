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
import { SEPARA_DATA } from '../data/projectsData';
import SpotlightGrid from '../components/SpotlightGrid';

const ProjectSepara = () => {
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
                title={SEPARA_DATA.title}
                tagline={SEPARA_DATA.tagline}
                metadata={SEPARA_DATA.metadata}
                figmaLink={SEPARA_DATA.figmaLink}
                mainImage={null}
                indexItems={[
                    { label: 'Contexto y Desafío',      id: 'separa-contexto' },
                    { label: 'Investigación y Usuarios', id: 'separa-investigacion' },
                    { label: 'Proceso de Diseño',       id: 'separa-proceso' },
                    { label: 'Impacto y Resultados',     id: 'separa-impacto' },
                ]}
            />

            {/* ── Galería Destacada Parallax ── */}
            <ParallaxGallery 
                darkImage="/Galería Parallax SE-PA-RA dark mode.webp"
                lightImage="/Galería Parallax SE-PA-RA light mode.webp"
                alt="Showcase final de la aplicación SE-PA-RÁ"
            />

            {/* ════════════════════════════════
                GRUPO 1: Contexto
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Contexto y Desafío" id="separa-contexto" />

            <ProjectSection
                icon="○"
                title="El punto de partida"
                text="El proyecto surgió al identificar que la baja participación en el programa municipal de reciclaje no se debía a una falta de interés, sino a la dispersión y complejidad de la información disponible. El objetivo fue transformar esta fricción en una oportunidad: diseñar una solución digital que centralice los datos, simplifique el proceso educativo y motive la participación ciudadana para contribuir a una ciudad más sustentable."
            />

            {/* ════════════════════════════════
                GRUPO 2: Investigación
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Investigación y Usuarios" id="separa-investigacion" />

            <ProjectSection
                icon="◎"
                title="Mapear el viaje del usuario"
                text={
                    <>
                        Para entender mejor a los usuarios, analicé su recorrido diario y descubrí que en cada etapa (informarse, separar, llevar al punto de reciclaje) aparecían dudas. Transformé estos problemas en soluciones necesarias:
                    </>
                }
            >
                <SpotlightGrid 
                    items={[
                        { problem: 'Información dispersa y confusa', opportunity: 'Módulo de educación centralizado (Talleres)' },
                        { problem: 'Poco incentivo y escasez de bolsas verdes', opportunity: 'Programa de Recompensas por comprometerse' },
                        { problem: 'Desconocimiento de puntos de recolección', opportunity: 'Mapa interactivo con la red de EcoPuntos' }
                    ]}
                    renderItem={(item) => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Problema
                            </p>
                            <p style={{ fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>
                                {item.problem}
                            </p>
                            <div style={{ height: '1px', background: 'var(--border-inactive)', margin: 'var(--space-1) 0' }} />
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: 0, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)' }}>
                                Oportunidad ↳
                            </p>
                            <p style={{ fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>
                                {item.opportunity}
                            </p>
                        </div>
                    )}
                />
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 2: Proceso de Diseño
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Proceso de Diseño" id="separa-proceso" />

            <ProjectSection
                icon="→"
                title="El camino del usuario"
                text="Con esos hallazgos, definí los pasos principales dentro de la app. El recorrido comienza con una bienvenida motivadora y permite al usuario elegir fácilmente entre aprender a reciclar o encontrar puntos de recolección cercanos."
            >
                <motion.div 
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
                    className="user-flow-container"
                >
                    {['Onboarding Motivador', 'Sign up / Login', 'Home Personalizado', 'Módulo Educativo', 'Mapa de EcoPuntos'].map((step, i, arr) => (
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
                title="Evolución: de bocetos a diseño final"
                text="El proceso pasó de esquemas básicos, donde definí la estructura inicial, a diseños de alta definición donde integré colores, iconos y un lenguaje más cercano para motivar al usuario."
            >
                <div style={{ margin: 'var(--space-4) auto 0', width: '100%', maxWidth: '900px' }}>
                    <CompareCarousel
                        lowFiImages={[
                            "/Pagina-principal-baja-fidelidad.webp",
                            "/recoleccion-diferenciada.webp",
                            "/EcoPuntos.webp",
                            "/Perfil.webp",
                            "/Recompensas.webp",
                            "/Talleres.webp"
                        ]}
                        highFiImages={[
                            "/Pagina-principal-alta-fidelidad.webp",
                            "/recoleccion-diferenciada-3.webp",
                            "/EcoPuntos-alta-fidelidad.webp",
                            "/Perfil-alta-fidelidad.webp",
                            "/Recompensas-alta-fidelidad.webp",
                            "/Talleres-alta-fidelidad.webp"
                        ]}
                        mobileFrame={true}
                    />
                </div>
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 4: Impacto y Resultados
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Impacto y Resultados" id="separa-impacto" />

            <ProjectSummary
                title="Impacto del Diseño"
                content={
                    <>
                        Pasar de la idea a la realidad requirió escuchar a los usuarios reales. El resultado es un diseño que no solo informa, sino que <strong>motiva a la acción mediante incentivos dinámicos</strong>, transformando el hábito de reciclar en una <strong>experiencia gratificante y con impacto social</strong>.
                    </>
                }
            />

            <ProjectSummary
                title="Contexto del Proyecto"
                type="epilogue"
                content={
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)', alignItems: 'center' }}>
                        <div style={{ flex: isMobile ? '1 1 100%' : '1 1 400px', fontSize: '1rem', lineHeight: 1.75 }}>
                            SE-PA-RÁ fue mi primer desafío integral de UX/UI. Nació de mi frustración al intentar reciclar en mi ciudad, demostrando cómo una correcta arquitectura de información puede transformar un <strong>problema ambiental complejo en una solución digital accesible</strong>.
                        </div>
                            <motion.div
                                whileHover={!isMobile ? { rotate: 1, scale: 1.03 } : {}}
                                style={{
                                    flex: isMobile ? '0 1 100%' : '0 0 280px',
                                    maxWidth: isMobile ? '240px' : '280px',
                                    margin: isMobile ? 'var(--space-4) auto 0' : '0',
                                    padding: 'var(--space-2)',
                                    backgroundColor: 'white',
                                    transform: !isMobile ? 'rotate(-1.5deg)' : 'none',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            onClick={() => openLightbox("/Cerificado-Udemy.webp")}
                        >
                            <img src="/Cerificado-Udemy.webp" alt="Certificado Udemy" style={{ width: '100%', display: 'block' }} />
                        </motion.div>
                    </div>
                }
            />

            {/* ── Navegación al siguiente proyecto ── */}
            <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', borderTop: '1px solid var(--border-inactive)', marginTop: 'var(--space-16)' }}>
                <Link to="/tienda-tecno" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <motion.div
                        className="glass-card btn-elegant"
                        style={{ padding: 'var(--space-12)', borderRadius: '32px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <span style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Siguiente Proyecto</span>
                        <h4 className="brutalist-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginTop: 'var(--space-2)' }}>TIENDA TECNO →</h4>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectSepara;
