import React from 'react';
import { motion } from 'framer-motion';

// Hook: tracks which card ref is most centered in the viewport
function useScrollSpotlight(refs) {
    const [activeIndex, setActiveIndex] = React.useState(null);

    React.useEffect(() => {
        const observers = [];
        const ratios = new Array(refs.length).fill(0);

        const updateActive = () => {
            let maxRatio = 0;
            let maxIndex = null;
            ratios.forEach((r, i) => {
                if (r > maxRatio) { maxRatio = r; maxIndex = i; }
            });
            setActiveIndex(maxRatio > 0.15 ? maxIndex : null);
        };

        refs.forEach((ref, i) => {
            if (!ref.current) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    ratios[i] = entry.intersectionRatio;
                    updateActive();
                },
                { 
                    threshold: Array.from({ length: 21 }, (_, k) => k / 20),
                    rootMargin: "-35% 0px -35% 0px"
                }
            );
            obs.observe(ref.current);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [refs]);

    return activeIndex;
}

const About = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024); // incluye tablets
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Refs for each bento card (scroll spotlight)
    const cardRefs = [
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
        React.useRef(null),
    ];
    const activeIndex = useScrollSpotlight(cardRefs);

    const getCardStyle = (index, baseStyle = {}) => ({
        ...baseStyle,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease, transform 0.4s ease',
        ...(isMobile && activeIndex !== null ? {
            borderColor: activeIndex === index ? 'var(--accent-primary)' : 'var(--border-inactive)',
            boxShadow: activeIndex === index
                ? '0 0 0 1.5px var(--accent-primary), 0 16px 40px var(--accent-glow)'
                : '0 4px 20px rgba(0,0,0,0.05)',
            opacity: activeIndex === index ? 1 : 0.7,
            transform: activeIndex === index ? 'scale(1.01)' : 'scale(1)',
        } : {}),
    });

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
            borderColor: 'var(--border-inactive)',
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: {
            y: -8,
            borderColor: 'var(--accent-primary)',
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
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    marginBottom: 'var(--space-12)',
                    color: 'var(--accent-primary)',
                    fontWeight: 900,
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
                        padding: isMobile ? 'var(--space-6)' : 'var(--space-8)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1.5px solid var(--border-inactive)',
                        cursor: 'default',
                    })}
                >
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 'var(--space-4)', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                        QUIÉN SOY
                    </h3>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, opacity: 0.9 }}>
                        Soy Alejandro Valle, diseñador UX con una sólida base en Comunicación. Me apasiona crear experiencias digitales claras, inclusivas y funcionales, combinando la sensibilidad narrativa con la precisión estructural.
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
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-inactive)',
                        overflow: 'hidden',
                        position: 'relative'
                    })}
                >
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.6 }
                        }}
                        src="/ale-valle-selfie.webp"
                        alt="Alejandro Valle"
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '300px',
                            objectFit: 'cover',
                            filter: 'grayscale(10%) contrast(110%)',
                        }}
                    />
                </motion.div>

                {/* Block 3: Mi recorrido (Comunicación) */}
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
                        padding: isMobile ? 'var(--space-6)' : 'var(--space-6)',
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-inactive)',
                    })}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)', opacity: 0.6, fontWeight: 700 }}>
                        Formación
                    </h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                        Estudié Comunicación en la UNT (Tucumán). La semiótica y el guión me enseñaron a construir mensajes que generan confianza y narrativas que conectan.
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
                        padding: isMobile ? 'var(--space-6)' : 'var(--space-6)',
                        borderRadius: '24px',
                        border: '1.5px solid var(--border-inactive)',
                    })}
                >
                    <h4 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)', opacity: 0.6, fontWeight: 700 }}>
                        Evolución UX
                    </h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, opacity: 0.9 }}>
                        De autodidacta a becado en Digitalers (Telecom). Hoy aplico investigación y diseño atómico para crear sistemas escalables y humanos.
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
                        padding: isMobile ? 'var(--space-6)' : 'var(--space-8)',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1.5px solid var(--border-inactive)',
                        cursor: 'default',
                    })}
                >
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 'var(--space-3)', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                        MI FILOSOFÍA
                    </h3>
                    <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Me caracterizo por ser detallista, metódico y transparente. No solo diseño interfaces; construyo puentes de confianza entre el negocio y las personas a través de la claridad visual y la arquitectura de información.
                    </p>
                </motion.div>

                {/* Block 6: Descargar CV */}
                <motion.a
                    ref={cardRefs[5]}
                    href="/CV - ALEJANDRO VALLE.pdf"
                    download="CV - ALEJANDRO VALLE.pdf"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView={isMobile ? "mobileScroll" : "visible"}
                    whileHover={!isMobile ? "hover" : undefined}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="bento-about-cv about-bento-card btn-elegant"
                    style={getCardStyle(5, {
                        backdropFilter: 'blur(12px)',
                        border: '1.5px solid var(--border-inactive)',
                        padding: 'var(--space-8)',
                        borderRadius: '24px',
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
                            fontWeight: 900,
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
                            fontWeight: 600,
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
