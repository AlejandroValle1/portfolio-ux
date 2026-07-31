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
                                    backgroundColor: 'var(--surface-color)', 
                                    color: 'var(--text-color)', 
                                    border: '1px solid var(--border-inactive)', 
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
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    padding: isMobile ? '0 var(--space-4)' : '0 var(--space-8)',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px',
                }}>
                    {EVOLUTION_SCREENS.map((screen, screenIdx) => (
                        <motion.div
                            key={screenIdx}
                            id={`smartock-screen-${screenIdx}`}
                            className={isMobile ? '' : 'evolution-snap-item'}
                            onViewportEnter={() => {
                                setActiveScreenIdx(screenIdx);
                                if (activeScreenIdx !== screenIdx) {
                                    setActiveVersionIdx(0);
                                }
                            }}
                            viewport={{ margin: '-40% 0px -40% 0px' }}
                            initial={{ opacity: 0.3 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-3)',
                                height: isMobile ? 'auto' : 'calc(100vh - 80px)',
                                justifyContent: 'flex-start',
                                boxSizing: 'border-box',
                                paddingTop: isMobile ? '40px' : '64px',
                                paddingBottom: isMobile ? '40px' : '40px',
                                maxWidth: '1600px',
                                margin: '0 auto',
                                width: '100%',
                                scrollMarginTop: '80px',
                                borderTop: screenIdx > 0 ? '1px solid var(--border-inactive)' : 'none',
                            }}
                        >
                            {(() => {
                                const currentVIdx = (activeScreenIdx === screenIdx && activeVersionIdx >= 0) ? activeVersionIdx : 0;
                                const currentVersion = screen.versions[currentVIdx];

                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', justifyContent: 'flex-start' }}>
                                        
                                        {/* 1. CABECERA 2 COLUMNAS CON JERARQUÍA MASIVA */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                                            gap: 'var(--space-8)',
                                            alignItems: 'start',
                                        }}>
                                            {/* Columna Izquierda: Titular + Contexto */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.2em',
                                                    fontWeight: 'var(--fw-black)',
                                                    color: 'var(--accent-primary)',
                                                    display: 'block',
                                                }}>
                                                    PANTALLA {screenIdx + 1} DE {EVOLUTION_SCREENS.length}
                                                </span>
                                                <h2 style={{
                                                    fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                                                    fontWeight: '900',
                                                    lineHeight: 1.15,
                                                    margin: 0,
                                                    color: 'var(--text-color)',
                                                    letterSpacing: '-0.02em',
                                                }}>
                                                    {screen.screen.split(' (')[0]}
                                                </h2>
                                                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.65 }}>
                                                    {screen.context}
                                                </p>
                                            </div>

                                            {/* Columna Derecha: Solo Decisión Clave (Legibilidad Mejorada) */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', lineHeight: 1.6, paddingTop: '4px' }}>
                                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 'var(--fw-black)', color: 'var(--accent-primary)' }}>
                                                    Decisión Clave
                                                </span>
                                                <p style={{ margin: 0, opacity: 0.95, color: 'var(--text-color)', fontWeight: 'var(--fw-medium)' }}>
                                                    {screen.highlight}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 2. BLOQUE DE TABS VERTICALES (IZQ) + COLUMNA DERECHA (DESCRIPCIÓN + IMAGEN) */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
                                            gap: 'var(--space-3)',
                                            alignItems: 'stretch',
                                            flex: 1,
                                            minHeight: 0,
                                            maxHeight: isMobile ? 'auto' : 'calc(100vh - 220px)',
                                            overflow: 'hidden',
                                        }}>
                                            {/* Panel de Tabs Verticales (Alineado arriba) */}
                                            <div className="glass-card" style={{
                                                padding: '8px',
                                                borderRadius: '12px',
                                                border: '1px solid var(--border-inactive)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '6px',
                                                background: 'var(--surface-color)',
                                                alignSelf: 'start',
                                            }}>
                                                {screen.versions.map((ver, vIdx) => {
                                                    const isActive = currentVIdx === vIdx;
                                                    return (
                                                        <button
                                                            key={vIdx}
                                                            onClick={() => {
                                                                setActiveScreenIdx(screenIdx);
                                                                setActiveVersionIdx(vIdx);
                                                            }}
                                                            style={{
                                                                padding: '10px 12px',
                                                                borderRadius: '8px',
                                                                border: 'none',
                                                                backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                                                                color: isActive ? '#fff' : 'var(--text-color)',
                                                                opacity: isActive ? 1 : 0.6,
                                                                fontSize: '0.8rem',
                                                                fontWeight: isActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.25s ease',
                                                                textAlign: 'left',
                                                                lineHeight: 1.35,
                                                                boxShadow: isActive ? '0 3px 12px var(--accent-glow)' : 'none',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <span>V{vIdx + 1} — {ver.tag}</span>
                                                        </button>
                                                    );
                                                })}
                                             </div>

                                             {/* Columna Derecha: Texto Explicativo + Image Preview */}
                                             <div style={{
                                                 display: 'flex',
                                                 flexDirection: 'column',
                                                 gap: 'var(--space-3)',
                                                 height: '100%',
                                                 minHeight: 0,
                                                 overflow: 'hidden',
                                             }}>
                                                 {/* Tarjeta con Texto Explicativo de la Versión */}
                                                 <motion.div
                                                     key={`desc-card-${currentVIdx}`}
                                                     initial={{ opacity: 0, y: -4 }}
                                                     animate={{ opacity: 1, y: 0 }}
                                                     transition={{ duration: 0.25 }}
                                                     className="glass-card"
                                                     style={{
                                                         padding: '12px 18px',
                                                         borderRadius: '12px',
                                                         border: '1px solid var(--border-inactive)',
                                                         background: 'var(--surface-color)',
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         flexShrink: 0,
                                                         boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                                                     }}
                                                 >
                                                     <p style={{ fontSize: '0.92rem', lineHeight: 1.5, margin: 0, fontWeight: 'var(--fw-medium)', opacity: 0.95, color: 'var(--text-color)' }}>
                                                         {currentVersion.desc}
                                                     </p>
                                                 </motion.div>

                                                 {/* Preview de la Imagen HD */}
                                                 <motion.div
                                                     key={`img-box-${currentVIdx}`}
                                                     initial={{ opacity: 0.5, scale: 0.99 }}
                                                     animate={{ opacity: 1, scale: 1 }}
                                                     transition={{ duration: 0.35 }}
                                                     onClick={() => openLightbox(currentVersion.img)}
                                                     style={{
                                                         borderRadius: '14px',
                                                         overflow: 'hidden',
                                                         border: currentVIdx === 2 ? '2px solid var(--accent-primary)' : '1px solid var(--border-inactive)',
                                                         boxShadow: currentVIdx === 2 ? '0 16px 48px var(--accent-glow)' : '0 8px 28px rgba(0,0,0,0.12)',
                                                         cursor: 'zoom-in',
                                                         position: 'relative',
                                                         width: '100%',
                                                         flex: 1,
                                                         minHeight: 0,
                                                     }}
                                                 >
                                                     <img
                                                         src={currentVersion.img}
                                                         alt={`V${currentVIdx + 1} — ${currentVersion.label}`}
                                                         style={{
                                                             width: '100%',
                                                             height: '100%',
                                                             objectFit: 'cover',
                                                             objectPosition: 'top center',
                                                             display: 'block',
                                                             position: 'absolute',
                                                             top: 0,
                                                             left: 0,
                                                         }}
                                                     />

                                                     {/* Hint de Zoom */}
                                                     <div style={{
                                                         position: 'absolute',
                                                         bottom: '12px',
                                                         right: '12px',
                                                         padding: '5px 12px',
                                                         borderRadius: '20px',
                                                         backgroundColor: 'rgba(10,10,20,0.85)',
                                                         backdropFilter: 'blur(8px)',
                                                         border: '1px solid var(--border-inactive)',
                                                         fontSize: '0.72rem',
                                                         fontWeight: 'var(--fw-bold)',
                                                         color: '#ffffff',
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         gap: '6px',
                                                         boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                         pointerEvents: 'none',
                                                     }}>
                                                         🔍 Zoom HD
                                                     </div>
                                                 </motion.div>
                                             </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    ))}
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
                        border: '1px solid var(--border-inactive)',
                        borderLeftWidth: '4px',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem',
                        fontWeight: 'var(--fw-medium)',
                        lineHeight: 1.6,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        💡 <strong>Diseñado con lógica de contraste AAA:</strong> El púrpura noche reduce la fatiga visual en comercios con pantallas activas durante más de 10 horas diarias.
                    </div>
                    
                    <div className="glass-card" style={{ 
                        padding: 'var(--space-4) var(--space-6)', 
                        borderLeft: '4px solid var(--accent-primary)',
                        border: '1px solid var(--border-inactive)',
                        borderLeftWidth: '4px',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem',
                        fontWeight: 'var(--fw-medium)',
                        lineHeight: 1.6,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
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
