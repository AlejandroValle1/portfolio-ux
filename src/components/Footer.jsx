import React, { useState } from 'react';

const contactLinks = [
    {
        label: "LinkedIn",
        sub: "Alejandro Valle",
        url: "https://www.linkedin.com/in/alejandro-valle-295a13306",
        brandColor: "#0A66C2",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M8 10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1m3-1a1 1 0 0 1 1 1v.18a6 6 0 0 1 .6-.3c.67-.285 1.67-.44 2.57-.16c.47.15.95.43 1.3.91c.31.42.48.94.52 1.52L17 12v4a1 1 0 0 1-2 0v-4c0-.33-.08-.48-.13-.55a.55.55 0 0 0-.29-.19c-.35-.11-.85-.05-1.18.09c-.5.21-.96.55-1.27.86L12 12.34V16a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1M8 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
            </svg>
        )
    },
    {
        label: "WhatsApp",
        sub: "Escribime directo",
        url: "https://wa.me/5493815000000", // Reemplazar con número real
        brandColor: "#25D366",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
            </svg>
        )
    },
    {
        label: "Gmail",
        sub: "alevalle1310@gmail.com",
        url: "mailto:alevalle1310@gmail.com",
        brandColor: "#EA4335",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        )
    }
];

const ContactLink = ({ label, sub, url, icon, brandColor }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                flex: 1,
                cursor: 'pointer' /* Fallback asegurado */
            }}
        >
            {/* Icono Permanente en Brand Color */}
            <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: brandColor,
                transform: hovered ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
                opacity: hovered ? 1 : 0.85,
            }}>
                {icon}
            </span>

            {/* Label principal cambo a Accent */}
            <span style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                lineHeight: 1,
                color: hovered ? 'var(--accent-primary)' : 'var(--text-color)',
                transition: 'color 0.4s ease',
            }}>
                {label}
            </span>

            {/* Sublabel descriptivo - también acompaña */}
            <span style={{
                fontSize: '0.72rem',
                fontWeight: 600, /* Un poco más fuerte para mejor lectura de color */
                opacity: hovered ? 0.9 : 0.5,
                letterSpacing: '0.02em',
                color: hovered ? 'var(--accent-primary)' : 'var(--text-color)',
                transition: 'color 0.4s ease, opacity 0.4s ease',
            }}>
                {sub}
            </span>
        </a>
    );
};

const Footer = () => {
    return (
        <footer id="contact" className="container" style={{ padding: 'var(--space-12) 0 var(--space-8) 0', borderTop: '20px solid var(--accent-primary)', textAlign: 'center' }}>
            <h2 className="brutalist-title" style={{
                fontSize: 'clamp(2.2rem, 9vw, 6rem)',
                lineHeight: 0.95,
                wordBreak: 'break-word',
                marginBottom: 'var(--space-12)',
                color: 'var(--accent-primary)',
                textAlign: 'center'
            }}>
                ¿HABLAMOS DE DISEÑO?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-8)', maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: '1.5rem', opacity: 0.8, lineHeight: 1.4, textTransform: 'uppercase', fontWeight: 600 }}>
                    ESTOY LISTO PARA UN NUEVO PROYECTO
                </p>

                {/* Links estilo icono + label */}
                <div className="footer-links-wrapper" style={{ width: '100%' }}>
                    {/* Separadores entre links */}
                    {contactLinks.map((link, i) => (
                        <React.Fragment key={link.label}>
                            <ContactLink {...link} />
                            {i < contactLinks.length - 1 && (
                                <div className="footer-link-separator" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-16)', fontSize: '0.8rem', opacity: 0.5, fontWeight: 500 }}>
                &copy; {new Date().getFullYear()} ALEJANDRO VALLE.
            </div>
        </footer>
    );
};

export default Footer;
