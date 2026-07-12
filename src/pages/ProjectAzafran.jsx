import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectHero from '../components/ProjectHero';
import ProjectSection from '../components/ProjectSection';
import ProjectGroupLabel from '../components/ProjectGroupLabel';
import ProjectSummary from '../components/ProjectSummary';
import Lightbox from '../components/Lightbox';
import SpotlightGrid from '../components/SpotlightGrid';
import ComparisonSlider from '../components/ComparisonSlider';
import { AZAFRAN_DATA } from '../data/projectsData';
import { usePerformance } from '../context/PerformanceContext';

const ProjectAzafran = () => {
    const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], index: 0 });
    const { isMobile } = usePerformance();

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
                title={AZAFRAN_DATA.title}
                tagline={AZAFRAN_DATA.tagline}
                metadata={AZAFRAN_DATA.metadata}
                figmaLink={AZAFRAN_DATA.figmaLink}
                mainImage={null}
                indexItems={[
                    { label: 'El Disparador', id: 'azafran-disparador' },
                    { label: 'El Diagnóstico', id: 'azafran-diagnostico' },
                    { label: 'La Solución', id: 'azafran-solucion' },
                    { label: 'Impacto y Viabilidad', id: 'azafran-impacto' },
                ]}
            />

            {/* ════════════════════════════════
                GRUPO 1: El Disparador
            ════════════════════════════════ */}
            <ProjectGroupLabel label="El Disparador (The Spark)" id="azafran-disparador" />

            <ProjectSection
                icon="⚡"
                title="¿Can a digital interface convey the silence, the air, and the rhythm of a Michelin-starred tasting menu?"
                text="Todo comenzó de manera orgánica. Estaba viendo un video en YouTube del creador de contenido Ramitagram experimentando el ritual de pasos en Azafrán (Mendoza, Argentina). Mientras observaba la obsesión por el detalle, la vajilla artesanal y la coreografía de los mozos y el sommelier en el salón, me surgió una duda de diseño: ¿Cómo es la antesala digital de este lugar? ¿Su web prepara al comensal para esta experiencia?"
            />

            <ProjectSection
                icon="→"
                title="La brecha entre lo físico y lo digital"
                text="Al ingresar al sitio web, la realidad era otra. Encontré una interfaz rígida y despojada que delegaba la fricción en el usuario: el menú de pasos vivía atrapado en un PDF estático y el flujo de reservas te expulsaba a OpenTable, una plataforma de terceros completamente ajena a la atmósfera y sofisticación del restaurante. Ahí nació el desafío: acortar la brecha entre la excelencia física del salón y su experiencia digital."
            />

            {/* ════════════════════════════════
                GRUPO 2: El Diagnóstico
            ════════════════════════════════ */}
            <ProjectGroupLabel label="El Diagnóstico (The Friction)" id="azafran-diagnostico" />

            <ProjectSection
                icon="🔍"
                title="Identificando la desconexión entre la marca y la interfaz"
                text="Para resolver este problema, no bastaba con cambiar tipografías; había que analizar los casos borde de negocio en la gestión de reservas de alta gama:"
            >
                <SpotlightGrid 
                    items={[
                        { label: 'Carga cognitiva innecesaria', text: 'Obligar al usuario a descargar un archivo PDF externo para conocer la propuesta rompe el flujo de navegación y arruina la accesibilidad.' },
                        { label: 'Pérdida de control del flujo', text: 'Derivar al usuario a un tercero (OpenTable) diluye la identidad de la marca justo en el momento más crítico: la conversión y el pago.' },
                        { label: 'El Falso Supuesto de mesas grupales', text: 'Las interfaces estándar asumen que toda la mesa se comporta de forma homogénea, ignorando restricciones alimentarias individuales o preferencias de maridaje.' }
                    ]}
                    renderItem={(item, i) => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '0 0 6px', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)' }}>
                                {item.label}
                            </p>
                            <p style={{ fontWeight: 'var(--fw-medium)', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
                        </div>
                    )}
                />
            </ProjectSection>

            <ProjectSection
                icon="🎥"
                title="El contraste visual: Antes vs. Después"
                text="Mira la comparativa en video que muestra el comportamiento rígido y fragmentado del sitio original frente a las transiciones fluidas y el flujo nativo de la propuesta de rediseño."
            >
                <div style={{ 
                    margin: 'var(--space-4) auto 0', 
                    width: '100%', 
                    maxWidth: '900px', 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1.5px solid var(--border-inactive)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    backgroundColor: '#000'
                }}>
                    <video 
                        src="/azafran-antes-despues.mp4" 
                        controls 
                        playsInline
                        muted
                        loop
                        style={{ width: '100%', display: 'block' }}
                    />
                </div>
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 3: La Solución
            ════════════════════════════════ */}
            <ProjectGroupLabel label="La Solución (The Product Concept)" id="azafran-solucion" />

            <ProjectSection
                icon="💡"
                title="Un sistema de hospitalidad nativo, asimétrico y elástico"
                text="Diseñé y programé un prototipo interactivo modelo basado en tres pilares de Calm Technology y diseño editorial:"
            >
                <SpotlightGrid 
                    showCelestial={true}
                    items={[
                        { name: '01 / Identidad Inmersiva', type: 'One Page Editorial', desc: 'Rediseñé la interfaz utilizando el aire, la luz y una paleta cromática limpia que evoca la sofisticación de la arquitectura del restaurante. El menú de pasos ahora vive nativamente en la web.' },
                        { name: '02 / Checkout Nativo', type: 'Inteligente e Integrado', desc: 'Eliminé los intermediarios creando un flujo de reserva integrado que retiene al usuario y le permite al negocio administrar sus transacciones directamente, aumentando la confianza.' },
                        { name: '03 / Personalización Asimétrica', type: 'Por Comensal (Paso 03/04)', desc: 'La interfaz permite desglosar de forma individual qué comensal prefiere un maridaje de exploración, quién maneja y opta por mocktails, o quién presenta celiaquía.' }
                    ]}
                    renderItem={(pilar) => (
                        <>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '0 0 6px', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{pilar.type}</p>
                            <p style={{ fontWeight: 'var(--fw-medium)', margin: '0 0 var(--space-2)', fontSize: '1.05rem', color: 'var(--accent-primary)' }}>{pilar.name}</p>
                            <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8, lineHeight: 1.6 }}>{pilar.desc}</p>
                        </>
                    )}
                />
            </ProjectSection>

            <ProjectSection
                icon="⟳"
                title="Principio de Diseño: Divulgación Progresiva"
                text="El flujo se comporta de manera elástica. Si una mesa no presenta requerimientos especiales, la reserva se completa en menos de un minuto. Si se activan necesidades específicas, la interfaz se expande orgánicamente para capturar la información sin abrumar al usuario, incluyendo campos opcionales de cortesía (como registrar los nombres de los acompañantes para una recepción personalizada)."
            />

            {/* ════════════════════════════════
                GRUPO 4: Impacto y Viabilidad
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Impacto y Viabilidad (The Value)" id="azafran-impacto" />

            <ProjectSummary
                title="Diseño con impacto en el negocio y la operación"
                content={
                    <>
                        Este rediseño demuestra cómo la UX/UI se convierte en una herramienta de optimización operativa en la alta gastronomía: 
                        <br /><br />
                        • <strong>Para el Comensal:</strong> Transforma el trámite de la reserva en el primer paso del ritual gastronómico, eliminando la frustración y la fricción de las redirecciones.
                        <br />
                        • <strong>Para el Restaurante (Negocio):</strong> Reduce el margen de error en la preparación del servicio de pasos, permitiendo a la cocina conocer de antemano el mapa exacto de alergias y maridajes de cada mesa. Al centralizar los pagos de manera nativa, se optimiza la conversión.
                    </>
                }
            />

            <ProjectSummary
                title="De la Idea al Código"
                type="epilogue"
                content={
                    <div style={{ fontSize: '1.1rem', lineHeight: 1.75 }}>
                        Para validar la usabilidad y la fluidez visual del proyecto, el prototipo interactivo fue programado con lógicas de animación fluidas (cubic-bezier), demostrando que no se trata de una maqueta estática, sino de un producto digital viable y ejecutable que respeta los estándares del desarrollo moderno.
                        <br /><br />
                        <span style={{ fontSize: '0.95rem', opacity: 0.85, fontStyle: 'italic' }}>
                            Nota técnica: El prototipo interactivo está vivo, programado en alta fidelidad y responde a interacciones reales del comensal.
                        </span>
                    </div>
                }
            />

            {/* ── Navegación al siguiente proyecto ── */}
            <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', borderTop: '1px solid var(--border-inactive)', marginTop: 'var(--space-16)' }}>
                <Link to="/smartock" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <motion.div
                        className="glass-card btn-elegant"
                        style={{ padding: 'var(--space-12)', borderRadius: 'var(--radius-card)', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <span style={{ fontSize: '0.75rem', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Siguiente Proyecto</span>
                        <h4 className="brutalist-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginTop: 'var(--space-2)' }}>SMARTOCK →</h4>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectAzafran;
