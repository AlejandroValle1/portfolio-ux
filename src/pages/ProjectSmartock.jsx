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
import { SMARTOCK_DATA } from '../data/projectsData';
import { usePerformance } from '../context/PerformanceContext';

const ProjectSmartock = () => {
    const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], index: 0 });
    const [activeScreenIdx, setActiveScreenIdx] = useState(0);
    const [activeVersionIdx, setActiveVersionIdx] = useState(-1);
    const { isMobile } = usePerformance();

    const EVOLUTION_SCREENS = [
        {
            screen: 'El Dashboard de Control General (Modo Oscuro)',
            context: 'Muestra la visión macro del negocio. Demuestra cómo organicé la arquitectura de la información pasando de un sistema saturado a un diseño limpio.',
            highlight: 'La separación visual y elevación de las tarjetas sobre el fondo oscuro. Uso estratégico de color semántico en las Acciones Rápidas para dirigir la atención en un segundo. El modo oscuro reduce la fatiga visual en jornadas comerciales extensas.',
            versions: [
                { label: 'V1 — Original', tag: 'Auditoría', desc: 'Pantalla saturada con métricas sin jerarquía visual. El usuario no puede distinguir lo urgente de lo informativo.', img: '/smartock-dashboard-v1.webp' },
                { label: 'V2 — Auditoría', tag: 'Resultado de auditoría', desc: 'Reorganicé la jerarquía visual priorizando las acciones rápidas y separando métricas operativas de las financieras.', img: '/smartock-dashboard-v2.webp' },
                { label: 'V3 — Final (Marca Blanca Azul)', tag: 'Iteración visual', desc: 'Aplicación de tokens de "Marca Blanca" en azul corporativo para demostrar escalabilidad. Refinamiento de contraste y código de color semántico sin romper la accesibilidad.', img: '/smartock-dashboard-v3.webp' }
            ]
        },
        {
            screen: 'El Punto de Venta (POS) en Acción (Modo Claro)',
            context: 'Diseñada para Lucía (La Cajera) en momentos de alta demanda. Es la pantalla con mayor nivel de estrés y velocidad del sistema, donde se procesa el cobro mixto o dividido.',
            highlight: 'Escala tipográfica clara (Inter/Roboto) y tamaño del botón principal de COBRAR maximizado para evitar errores de precisión. Aplicación de la regla 60-30-10 para el Modo Claro, usando el color corporativo principal solo en puntos de interacción clave. Contraste nivel WCAG AA/AAA en inputs.',
            versions: [
                { label: 'V1 — Original', tag: 'Auditoría', desc: 'Flujo de cobro con demasiados pasos y botones ambiguos. Alta probabilidad de error en hora pico.', img: '/smartock-pdv-v1.webp' },
                { label: 'V2 — Auditoría', tag: 'Resultado de auditoría', desc: 'Simplifiqué el flujo a 3 pasos esenciales con botones de acción claros y soporte nativo para cobro dividido.', img: '/smartock-pdv-v2.webp' },
                { label: 'V3 — Final (Marca Blanca Azul)', tag: 'Iteración visual', desc: 'El sistema mantiene los estados de éxito/error inalterables, pero inyecta el azul del cliente en las interacciones principales, probando la solidez de la regla 60-30-10.', img: '/smartock-pdv-v3.webp' }
            ]
        },
        {
            screen: 'Importación de Mercadería con Asistencia de IA',
            context: 'Resuelve el dolor principal de Martín (El Dueño): el tiempo perdido en la carga manual. El usuario puede subir una foto de su factura de compra y la IA extrae los productos automáticamente, reduciendo horas de data entry.',
            highlight: 'Transparencia del sistema para evitar el "Efecto Caja Negra". En lugar de un algoritmo oculto, el usuario ve exactamente los pasos (Stepper visual) e instrucciones gráficas (Check/Cross) para tomar una buena foto. Siempre exige "Confirmación Humana" final.',
            versions: [
                { label: 'V1 — Original', tag: 'Auditoría', desc: 'Instrucciones densas en bloque de texto que nadie leía para subir la foto, y mensajes de error o límites ("0/4 usos") que generaban frustración y bloqueo.', img: '/smartock-inventario-v1.webp' },
                { label: 'V2 — Auditoría', tag: 'Resultado de auditoría', desc: 'Diseñé un Stepper visual (1. Subir -> 2. Procesar -> 3. Confirmar), reemplacé el texto por iconos claros para guiar la fotografía y añadí vías de resolución al límite de usos.', img: '/smartock-inventario-v2.webp' },
                { label: 'V3 — Final (Marca Blanca Azul)', tag: 'Iteración visual', desc: 'Interfaz adaptada al color de la franquicia sin romper jerarquías. La IA actúa como un asistente transparente dándole control total al usuario.', img: '/smartock-inventario-v3.webp' }
            ]
        },
        {
            screen: 'Centro de Errores Fiscales (Ex "Resolver ARCA/AFIP")',
            context: 'La pantalla que le da autonomía a Nicolás (El Encargado) para destrabar el negocio sin depender del contador, transformando códigos crípticos en acciones claras.',
            highlight: 'Diseño de mensajes de error en lenguaje humano ("El CUIT del cliente tiene un dígito erróneo. Podés corregirlo acá"). Uso del color semántico de alerta (--status-error) transicionando a verde (--status-success) en tiempo real cuando el sistema valida el dato modificado.',
            versions: [
                { label: 'V1 — Original', tag: 'Auditoría', desc: 'Errores fiscales (ARCA/AFIP) mostrados en códigos técnicos incomprensibles. Sin guía de resolución.', img: '/smartock-fiscal-v1.webp' },
                { label: 'V2 — Auditoría', tag: 'Resultado de auditoría', desc: 'Traduje cada código de error a lenguaje humano con acciones sugeridas paso a paso para destrabar facturas.', img: '/smartock-fiscal-v2.webp' },
                { label: 'V3 — Final (Marca Blanca Azul)', tag: 'Iteración visual', desc: 'Interfaz final customizada. Los colores semánticos de alerta y los "Empty States" ilustrados conviven en perfecta armonía con la paleta inyectada por el cliente.', img: '/smartock-fiscal-v3.webp' }
            ]
        }
    ];

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
                title={SMARTOCK_DATA.title}
                tagline={SMARTOCK_DATA.tagline}
                metadata={SMARTOCK_DATA.metadata}
                figmaLink={SMARTOCK_DATA.figmaLink}
                mainImage={null}
                indexItems={[
                    { label: 'Introducción y Desafío', id: 'smartock-intro' },
                    { label: 'Auditoría y Diagnóstico', id: 'smartock-diagnostico' },
                    { label: 'El Factor Humano', id: 'smartock-humano' },
                    { label: 'Arquitectura de Información', id: 'smartock-arquitectura' },
                    { label: 'Sistema de Diseño', id: 'smartock-sistema' },
                    { label: 'Resultados e Iteración', id: 'smartock-resultados' },
                ]}
            />

            {/* ════════════════════════════════
                GRUPO 1: Introducción y Desafío
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Introducción y El Desafío" id="smartock-intro" />

            <ProjectSection
                icon="📑"
                title="Transformando una interfaz compleja en gestión fluida"
                text="El sistema original de Smartock presentaba una alta carga cognitiva, pantallas saturadas y flujos fragmentados que ralentizaban la operación diaria. La información crítica (como las ventas o el estado fiscal) estaba oculta bajo tecnicismos difíciles de digerir para el comercio real."
            />

            <ProjectSection
                icon="🚀"
                title="Impacto Real: En producción y escalando"
                text="Este rediseño no fue un ejercicio conceptual. Trabajé en conjunto con el equipo de desarrollo (Devs) para asegurar la viabilidad técnica de cada componente. Hoy, la nueva plataforma se encuentra viva, en producción y es utilizada diariamente por aproximadamente 50 usuarios comerciales."
            />

            <ProjectSection
                icon="○"
                title="La meta: Cero fricción"
                text="El objetivo fue rediseñar la plataforma construyendo una arquitectura de información clara y un sistema visual con altos estándares de accesibilidad, respetando la identidad del producto representada por su característico pulpo animado."
            />

            <ProjectSection
                icon="⚙️"
                title="Modelo de Negocio Escalable (SaaS & Marca Blanca)"
                text="La plataforma no solo debía ser eficiente para el usuario final, sino que estructuralmente requería una arquitectura de Marca Blanca (White-Label). El desafío técnico de diseño consistió en armar un sistema lo suficientemente flexible para que cualquier empresa proveedora de software pueda adquirir el sistema, inyectar su propia paleta de colores y tipografías core, y revenderlo como un producto propio sin romper la experiencia ni la accesibilidad."
            />

            {/* ════════════════════════════════
                GRUPO 2: Auditoría y Diagnóstico
            ════════════════════════════════ */}
            <ProjectGroupLabel label="La Auditoría (El Diagnóstico)" id="smartock-diagnostico" />

            <ProjectSection
                icon="🔍"
                title="Metodología basada en Evaluación Heurística"
                text="Realicé una auditoría profunda pantalla por pantalla de la V1, aplicando las Reglas de Nielsen y leyes de UX para diagnosticar fricciones y proyectar soluciones de alto impacto:"
            >
                <SpotlightGrid 
                    items={[
                        { 
                            label: 'Inversión de la Pirámide Operativa', 
                            teoria: 'Ley de Fitts',
                            text: 'En el dashboard, las acciones rápidas (cobrar, vender) estaban ocultas debajo de métricas gigantes. Moverlas a la zona superior (Above the fold) redujo el tiempo de escaneo y disparó la productividad.' 
                        },
                        { 
                            label: 'Atajos de Teclado Ocultos', 
                            teoria: 'Heurística #7 (Eficiencia)',
                            text: 'En el Punto de Venta, el cajero experto prefiere el teclado al mouse. Diseñé una "Barra de Atajos" visual en la base (ej: F2 para cobrar) que hace el proceso hasta 3 veces más rápido.' 
                        },
                        { 
                            label: 'El "Efecto Caja Negra" en IA', 
                            teoria: 'Transparencia del Sistema',
                            text: 'Al subir una factura al lector automático, el usuario sentía que entregaba un documento valioso a ciegas. Implementé un "Mapeo en Espejo" (PDF a la izquierda, campos a la derecha) para generar confianza.' 
                        },
                        { 
                            label: 'Carga Cognitiva en Resoluciones', 
                            teoria: 'Prevención de Errores',
                            text: 'El área de errores fiscales de ARCA asustaba con textos técnicos largos. Se reemplazó por "Empty States" ilustrados de tranquilidad y diagnósticos clasificados en lenguaje humano (Ej: "Error de CUIT").' 
                        }
                    ]}
                    renderItem={(item) => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <div style={{ marginBottom: '8px' }}>
                                <span style={{ 
                                    fontSize: '0.65rem', 
                                    padding: '4px 8px', 
                                    borderRadius: '4px', 
                                    backgroundColor: 'rgba(255,255,255,0.05)', 
                                    color: 'var(--text-color)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.05em', 
                                    fontWeight: 'var(--fw-bold)' 
                                }}>
                                    {item.teoria}
                                </span>
                            </div>
                            <p style={{ fontSize: '1.05rem', fontWeight: 'var(--fw-bold)', margin: '0 0 6px', color: 'var(--accent-primary)' }}>
                                {item.label}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.85 }}>{item.text}</p>
                        </div>
                    )}
                />
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 3: El Factor Humano
            ════════════════════════════════ */}
            <ProjectGroupLabel label="El Factor Humano (Storytelling)" id="smartock-humano" />

            <ProjectSection
                icon="👥"
                title="Diseñar para roles operativos reales"
                text="Para humanizar el software, definí tres arquetipos clave basados en la realidad operativa diaria de una PyME argentina:"
            >
                <SpotlightGrid 
                    showCelestial={true}
                    items={[
                        { name: 'Martín', type: 'El Dueño / El Estratega', desc: 'Necesita controlar la rentabilidad, los costos y el stock crítico de forma rápida y sin perderse en la carga de datos manual.' },
                        { name: 'Lucía', type: 'La Cajera / La Operativa', desc: 'Su prioridad es la velocidad y la precisión en la hora pico. Interfaz limpia, botones claros y nulo margen de error al cobrar.' },
                        { name: 'Nicolás', type: 'El Encargado / El Facilitador', desc: 'El resolvedor de problemas. Necesita control logístico y autonomía para destrabar gestiones fiscales sin depender del contador.' }
                    ]}
                    renderItem={(persona) => (
                        <>
                            <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: '0 0 6px', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{persona.type}</p>
                            <p style={{ fontWeight: 'var(--fw-medium)', margin: '0 0 var(--space-2)', fontSize: '1.05rem', color: 'var(--accent-primary)' }}>{persona.name}</p>
                            <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8, lineHeight: 1.6 }}>{persona.desc}</p>
                        </>
                    )}
                />
            </ProjectSection>

            <ProjectSection
                icon="→"
                title="El valor de los minutos devueltos"
                text="Humanizar el software significa medir el éxito en tiempo libre. Diseñé el sistema para que Martín pudiera automatizar el ingreso de stock mediante scanner e IA, ahorrando hasta 40 minutos diarios en tareas administrativas, y para que Lucía pudiera liquidar ventas multi-pago en segundos sin generar filas en el salón."
            />

            {/* ════════════════════════════════
                GRUPO 4: Evolución Visual
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Evolución Visual" id="smartock-evolucion" />

            <ProjectSection
                icon="⟳"
                title="Evolución Visual: 3 iteraciones, 1 producto"
                text="Cada pantalla del sistema atravesó tres etapas claras de evolución. A continuación se muestra el recorrido cronológico de las pantallas clave, desde la versión original hasta el resultado final refinado con asistencia de IA en Figma."
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
                    gap: 'var(--space-10)',
                    position: 'relative',
                    alignItems: 'start'
                }}>
                    {/* ── COLUMNA IZQUIERDA: Sticky Index ── */}
                    {!isMobile && (
                        <div style={{
                            position: 'sticky',
                            top: '100px',
                            height: 'calc(100vh - 160px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                            paddingRight: 'var(--space-4)',
                            overflow: 'hidden',
                        }}>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4, margin: '0 0 var(--space-4)' }}>Índice de Pantallas</p>

                            {/* Solo mostrar pantalla activa + hint de la siguiente */}
                            {EVOLUTION_SCREENS.map((screen, sIdx) => {
                                const isActive = activeScreenIdx === sIdx;
                                const isNext = sIdx === activeScreenIdx + 1;

                                // Ocultar todo lo que no sea activo ni el siguiente
                                if (!isActive && !isNext) return null;

                                if (isNext) {
                                    // Hint en gris de la pantalla siguiente — FIJO al fondo
                                    return (
                                        <div key={sIdx} style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 'var(--space-4)',
                                            paddingTop: 'var(--space-5)',
                                            borderTop: '1px solid var(--border-inactive)',
                                            opacity: 0.35,
                                        }}>
                                            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px', color: 'var(--text-color)' }}>A continuación</p>
                                            <a
                                                href={`#smartock-version-${sIdx}-0`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(`smartock-version-${sIdx}-0`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }}
                                                style={{
                                                    textDecoration: 'none',
                                                    fontSize: '0.88rem',
                                                    fontWeight: 'var(--fw-medium)',
                                                    color: 'var(--text-color)',
                                                    lineHeight: 1.3,
                                                    display: 'block',
                                                }}
                                            >
                                                Pantalla {sIdx + 1}: {screen.screen.split(' (')[0]}
                                            </a>
                                        </div>
                                    );
                                }

                                // Pantalla activa — título + sub-bullets completos
                                return (
                                    <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {/* Título activo */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '10px',
                                            marginBottom: 'var(--space-4)',
                                        }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--accent-primary)',
                                                marginTop: '6px',
                                                flexShrink: 0,
                                            }} />
                                            <span style={{
                                                fontSize: '1rem',
                                                fontWeight: 'var(--fw-black)',
                                                color: 'var(--accent-primary)',
                                                lineHeight: 1.3,
                                            }}>
                                                Pantalla {sIdx + 1}: {screen.screen.split(' (')[0]}
                                            </span>
                                        </div>

                                        {/* Sub-bullets de versiones */}
                                        <div style={{
                                            marginLeft: '16px',
                                            borderLeft: '1px solid var(--border-inactive)',
                                            paddingLeft: 'var(--space-4)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--space-1)',
                                        }}>
                                            {screen.versions.map((v, vIdx) => {
                                                const isVersionActive = activeVersionIdx === vIdx;
                                                return (
                                                    <div key={vIdx}>
                                                        <a
                                                            href={`#smartock-version-${sIdx}-${vIdx}`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                document.getElementById(`smartock-version-${sIdx}-${vIdx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                            }}
                                                            style={{
                                                                textDecoration: 'none',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                padding: '6px 0',
                                                                fontSize: '0.82rem',
                                                                fontWeight: isVersionActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
                                                                color: isVersionActive ? 'var(--accent-primary)' : 'var(--text-color)',
                                                                opacity: isVersionActive ? 1 : 0.35,
                                                                transition: 'all 0.3s ease',
                                                            }}
                                                        >
                                                            <div style={{
                                                                width: '4px',
                                                                height: '4px',
                                                                borderRadius: '50%',
                                                                backgroundColor: isVersionActive ? 'var(--accent-primary)' : 'var(--text-color)',
                                                                flexShrink: 0,
                                                                transition: 'background-color 0.3s ease'
                                                            }} />
                                                            {vIdx === 0 ? 'Versión 1: Auditoría' : vIdx === 1 ? 'Versión 2: Resultado de auditoría' : 'Versión 3: Iteración visual'}
                                                        </a>

                                                        {/* Descripción visible solo cuando la versión está activa */}
                                                        <div style={{
                                                            maxHeight: isVersionActive ? '200px' : '0px',
                                                            opacity: isVersionActive ? 1 : 0,
                                                            overflow: 'hidden',
                                                            transition: 'max-height 0.4s ease, opacity 0.3s ease',
                                                            paddingLeft: '12px',
                                                        }}>
                                                            <p style={{
                                                                fontSize: '0.78rem',
                                                                lineHeight: 1.55,
                                                                opacity: 0.8,
                                                                margin: '2px 0 var(--space-3)',
                                                                fontStyle: 'italic',
                                                                color: 'var(--text-color)'
                                                            }}>
                                                                {v.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* ── COLUMNA DERECHA: Galería Scrollable ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '180px' }}>
                        {EVOLUTION_SCREENS.map((screen, screenIdx) => (
                            <div key={screenIdx} id={`smartock-screen-${screenIdx}`} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

                                {/* Cards de Contexto — Snap item propio, altura de pantalla */}
                                <motion.div
                                    className={isMobile ? '' : 'evolution-snap-item'}
                                    onViewportEnter={() => {
                                        setActiveScreenIdx(screenIdx);
                                        setActiveVersionIdx(-1);
                                    }}
                                    viewport={{ margin: '-20% 0px -70% 0px' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        minHeight: isMobile ? 'auto' : '85vh',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingTop: 'var(--space-8)',
                                        paddingBottom: 'var(--space-8)',
                                        gap: 'var(--space-6)',
                                    }}
                                >
                                    {/* Eyebrow label */}
                                    {!isMobile && (
                                        <p style={{
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.14em',
                                            opacity: 0.4,
                                            margin: 0,
                                        }}>
                                            Pantalla {screenIdx + 1} — {screen.screen.split(' (')[0]}
                                        </p>
                                    )}

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                        gap: 'var(--space-6)',
                                        flex: 1,
                                        alignItems: 'stretch',
                                    }}>
                                        {/* Card: El Contexto */}
                                        <div className="glass-card" style={{
                                            padding: 'var(--space-8)',
                                            borderRadius: '16px',
                                            border: '1px solid var(--border-inactive)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--space-5)',
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}>
                                            {/* Decorative top bar */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0,
                                                height: '3px',
                                                background: 'linear-gradient(90deg, transparent, var(--border-inactive), transparent)',
                                                borderRadius: '16px 16px 0 0',
                                            }} />
                                            <div>
                                                <p style={{
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.15em',
                                                    opacity: 0.45,
                                                    margin: '0 0 var(--space-3)',
                                                    fontWeight: 'var(--fw-bold)',
                                                }}>El Contexto</p>
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    lineHeight: 1.75,
                                                    margin: 0,
                                                    opacity: 0.9,
                                                    fontWeight: 'var(--fw-medium)',
                                                }}>
                                                    {screen.context}
                                                </p>
                                            </div>
                                            {/* Número de versiones como indicador */}
                                            <div style={{
                                                marginTop: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)',
                                                opacity: 0.4,
                                            }}>
                                                {screen.versions.map((_, i) => (
                                                    <div key={i} style={{
                                                        width: '24px', height: '3px',
                                                        borderRadius: '2px',
                                                        backgroundColor: 'var(--text-color)',
                                                    }} />
                                                ))}
                                                <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                                                    {screen.versions.length} iteraciones
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card: Decisión Destacada */}
                                        <div className="glass-card" style={{
                                            padding: 'var(--space-8)',
                                            borderRadius: '16px',
                                            border: '1px solid var(--accent-primary)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--space-5)',
                                            background: 'linear-gradient(135deg, rgba(var(--accent-primary-rgb, 139,92,246),0.08) 0%, rgba(var(--accent-primary-rgb, 139,92,246),0.02) 100%)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: '0 0 40px rgba(139,92,246,0.08)',
                                        }}>
                                            {/* Glow top bar */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0,
                                                height: '3px',
                                                background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
                                                borderRadius: '16px 16px 0 0',
                                            }} />
                                            <div>
                                                <p style={{
                                                    fontSize: '0.65rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.15em',
                                                    color: 'var(--accent-primary)',
                                                    margin: '0 0 var(--space-3)',
                                                    fontWeight: 'var(--fw-bold)',
                                                }}>Decisión de Diseño</p>
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    lineHeight: 1.75,
                                                    margin: 0,
                                                    opacity: 0.9,
                                                    fontWeight: 'var(--fw-medium)',
                                                }}>
                                                    {screen.highlight}
                                                </p>
                                            </div>
                                            {/* Tag de herramienta */}
                                            <div style={{
                                                marginTop: 'auto',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                opacity: 0.6,
                                            }}>
                                                <div style={{
                                                    width: '6px', height: '6px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent-primary)',
                                                }} />
                                                <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', letterSpacing: '0.05em', fontWeight: 'var(--fw-bold)' }}>
                                                    Figma + Gemini
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Imágenes de las 3 versiones — cada una snappea al centro */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                    {screen.versions.map((version, vIdx) => (
                                        <motion.div
                                            key={vIdx}
                                            id={`smartock-version-${screenIdx}-${vIdx}`}
                                            className={isMobile ? '' : 'evolution-snap-item'}
                                            onViewportEnter={() => {
                                                setActiveScreenIdx(screenIdx);
                                                setActiveVersionIdx(vIdx);
                                            }}
                                            viewport={{ margin: '-35% 0px -35% 0px' }}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 'var(--space-3)',
                                                minHeight: isMobile ? 'auto' : '85vh',
                                                justifyContent: 'center',
                                                paddingTop: 'var(--space-8)',
                                                paddingBottom: 'var(--space-8)',
                                            }}
                                        >
                                            {/* Etiqueta encima de la imagen (solo mobile, en desktop está en el sidebar) */}
                                            {isMobile && (
                                                <div>
                                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 'var(--fw-black)', color: vIdx === 2 ? 'var(--accent-primary)' : 'var(--text-color)', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
                                                        V{vIdx + 1} — {version.tag}
                                                    </span>
                                                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.75, margin: 0 }}>{version.desc}</p>
                                                </div>
                                            )}

                                            {/* Imagen con badge flotante */}
                                                <div
                                                    onClick={() => openLightbox(version.img)}
                                                    style={{
                                                        borderRadius: '14px',
                                                        overflow: 'hidden',
                                                        border: vIdx === 2 ? '2px solid var(--accent-primary)' : '1px solid var(--border-inactive)',
                                                        boxShadow: vIdx === 2 ? '0 16px 48px var(--accent-glow)' : '0 8px 28px rgba(0,0,0,0.12)',
                                                        cursor: 'zoom-in',
                                                        transition: 'all 0.35s ease',
                                                        position: 'relative',
                                                        aspectRatio: '1520/792',
                                                    }}
                                                >
                                                    <img
                                                        src={version.img}
                                                        alt={`V${vIdx + 1} — ${version.label}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                                                    />
                                                {!isMobile && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        left: '12px',
                                                        padding: '5px 12px',
                                                        borderRadius: '20px',
                                                        backgroundColor: 'rgba(10,10,20,0.85)',
                                                        backdropFilter: 'blur(8px)',
                                                        border: '1px solid var(--border-inactive)',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 'var(--fw-bold)',
                                                        color: vIdx === 2 ? 'var(--accent-primary)' : 'var(--text-color)',
                                                        letterSpacing: '0.05em',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                                    }}>
                                                        V{vIdx + 1} — {version.tag}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ProjectSection>


            {/* ════════════════════════════════
                GRUPO 4: Arquitectura de Información
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Arquitectura de Información (El Cambio)" id="smartock-arquitectura" />

            <ProjectSection
                icon="🗺️"
                title="Reorganización estructural del sistema"
                text="Reestructuré el sitemap completo, delegando las configuraciones pesadas y fiscales a un plano secundario y priorizando en la barra lateral las dos acciones de uso constante: Caja e Inventario."
            />

            <ProjectSection
                icon="→"
                title="Optimización de las trayectorias clave (User Journeys)"
                text="Mapeé y pulí tres trayectorias críticas del sistema:"
            >
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
                    <div className="glass-card" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-inactive)' }}>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', margin: '0 0 var(--space-2)' }}>Abastecimiento Inteligente</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Carga rápida de mercadería utilizando asistencia de Inteligencia Artificial para el escaneo y procesamiento automático de remitos y facturas PDF.</p>
                    </div>
                    <div className="glass-card" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-inactive)' }}>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', margin: '0 0 var(--space-2)' }}>La Venta Rápida</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Un viaje sin fricciones para Lucía en la hora pico, resolviendo el cobro dividido (efectivo + tarjeta + billeteras digitales) en apenas tres taps.</p>
                    </div>
                    <div className="glass-card" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-inactive)' }}>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', margin: '0 0 var(--space-2)' }}>Resolución Fiscal</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>Traducción de errores del servidor de facturación facturas rechazadas a lenguaje humano claro con guías accionables inmediatas para destrabarlas.</p>
                    </div>
                </div>
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 5: Sistema de Diseño
            ════════════════════════════════ */}
            <ProjectGroupLabel label="El Sistema de Diseño (Design System)" id="smartock-sistema" />

            <ProjectSection
                icon="🎨"
                title="Estética 'Zen' equilibrada con la identidad de marca"
                text="Tomé la esencia lúdica del pulpo animado (los púrpuras y violetas identitarios) y los equilibré con espacios en blanco generosos y tipografía legible para no sobrecargar ni fatigar la vista de los trabajadores en turnos largos de 8 horas."
            />

            <ProjectSection
                icon="💡"
                title="Estructuración en dos grandes pilares lógicos"
                text="Para garantizar la escalabilidad y el modelo de Marca Blanca, el Design System se dividió estratégicamente:"
            >
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
                    <div className="glass-card" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-inactive)' }}>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 var(--space-3)' }}>A. Smartock Core System (La Base)</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9, margin: '0 0 var(--space-3)' }}>
                            <strong>Estructura y Componentes Atómicos:</strong> Definición de la grilla, espaciados de 8px, formas de botones, inputs y contenedores. Esta lógica estructural es fija y garantiza consistencia y accesibilidad (AA/AAA) sin importar los colores.
                        </p>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>
                            <strong>Multitono Nativo:</strong> Paralelismo estricto entre Light Mode y Dark Mode para mitigar la fatiga visual según el entorno de trabajo.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-inactive)' }}>
                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 var(--space-3)' }}>B. Marcas Blancas System (La Capa de Personalización)</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9, margin: '0 0 var(--space-3)' }}>
                            <strong>Tokens Intercambiables:</strong> En lugar de hardcodear los colores, el sistema utiliza Design Tokens de Marca que permiten cambiar a Azules, Verdes o Grises Corporativos en segundos inyectando identidad.
                        </p>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9, margin: 0 }}>
                            <strong>Consistencia Semántica:</strong> Los estados críticos (Éxito, Error, Alerta) se mantienen universales, pero las acciones primarias mutan adaptándose al ADN de la marca cliente.
                        </p>
                    </div>
                </div>
            </ProjectSection>

            {/* ════════════════════════════════
                GRUPO 6: Iteración Visual y Resultados
            ════════════════════════════════ */}
            <ProjectGroupLabel label="Iteración Visual y Resultados" id="smartock-resultados" />

            <ProjectSection
                icon="🚀"
                title="Acciones rápidas orientadas a la conversión y la usabilidad"
                text="En el dashboard final, las tarjetas de acciones rápidas (Punto de venta, Caja y Reportes) aplican un código de color semántico muy específico: Púrpura de Marca, Verde Éxito y Coral Control. De este modo, guiamos el ojo del usuario de manera inmediata y le ahorramos la necesidad de escanear o leer bloques densos de pantalla."
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                    <div className="glass-card" style={{ 
                        padding: 'var(--space-4) var(--space-6)', 
                        borderLeft: '4px solid var(--accent-primary)',
                        backgroundColor: 'rgba(123, 31, 162, 0.05)',
                        fontSize: '0.95rem',
                        fontWeight: 'var(--fw-medium)',
                        lineHeight: 1.6
                    }}>
                        💡 <strong>Diseñado con lógica de contraste AAA:</strong> El púrpura noche reduce la fatiga visual en comercios con pantallas activas durante más de 10 horas diarias.
                    </div>
                    
                    <div className="glass-card" style={{ 
                        padding: 'var(--space-4) var(--space-6)', 
                        borderLeft: '4px solid var(--accent-primary)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        fontSize: '0.95rem',
                        fontWeight: 'var(--fw-medium)',
                        lineHeight: 1.6
                    }}>
                        🚀 <strong>El verdadero poder de este Design System</strong> es su capacidad de desacoplar la estructura visual de la identidad de marca. Al diseñar una arquitectura white-label, demostramos cómo el diseño UX/UI puede apalancar directamente el modelo de negocio de una startup, permitiendo que Smartock se transforme visualmente en el producto de cualquier cliente corporativo con solo cambiar un archivo de tokens CSS.
                    </div>
                </div>
            </ProjectSection>

            <ProjectSummary
                title="Diseño estratégico como aliado del negocio"
                content={
                    <>
                        El rediseño de Smartock demuestra que un sistema administrativo no tiene por qué ser aburrido ni difícil de operar. Integrando el diseño estratégico de experiencia centrado en las personas, transformamos una herramienta de software fría en un aliado intuitivo, ágil y clave para el crecimiento de cualquier PyME en Argentina.
                    </>
                }
            />

            <ProjectSummary
                title="Foco en el Código"
                type="epilogue"
                content={
                    <div style={{ fontSize: '1rem', opacity: 0.85, fontStyle: 'italic', lineHeight: 1.6 }}>
                        Nota técnica: El prototipo interactivo está vivo, programado en alta fidelidad y responde a interacciones reales del usuario en tiempo real, validando la solidez de la experiencia planteada.
                    </div>
                }
            />

            {/* ── Navegación al siguiente proyecto ── */}
            <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', borderTop: '1px solid var(--border-inactive)', marginTop: 'var(--space-16)' }}>
                <Link to="/separa" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <motion.div
                        className="glass-card btn-elegant"
                        style={{ padding: 'var(--space-12)', borderRadius: 'var(--radius-card)', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <span style={{ fontSize: '0.75rem', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Siguiente Proyecto</span>
                        <h4 className="brutalist-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginTop: 'var(--space-2)' }}>SE-PA-RÁ →</h4>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectSmartock;
