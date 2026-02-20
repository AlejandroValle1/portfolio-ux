import React from 'react';

const Footer = () => {
    const links = [
        { label: "Gmail", url: "mailto:alevalle1310@gmail.com" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/alejandro-valle-295a13306" },
        { label: "WhatsApp", url: "https://wa.me/" } // Add number if available, otherwise just base
    ];

    return (
        <footer id="contact" className="container" style={{ padding: 'var(--space-12) 0 var(--space-8) 0', borderTop: '20px solid var(--accent-primary)', textAlign: 'center' }}>
            <h2 className="brutalist-title" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
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

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-elegant"
                            style={{
                                textDecoration: 'none',
                                padding: 'var(--space-3) 0',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 'var(--space-3)',
                                fontSize: '1rem',
                                border: '1.5px solid var(--text-color)',
                                borderRadius: '50px',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                fontWeight: 700,
                                width: '220px'
                            }}
                        >
                            {link.label === "Gmail" && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            )}
                            {link.label === "LinkedIn" && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path fill="currentColor" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M8 10a1 1 0 0 1 .993.883L9 11v5a1 1 0 0 1-1.993.117L7 16v-5a1 1 0 0 1 1-1m3-1a1 1 0 0 1 .984.821a6 6 0 0 1 .623-.313c.667-.285 1.666-.442 2.568-.159c.473.15.948.43 1.3.907c.315.425.485.942.519 1.523L17 12v4a1 1 0 0 1-1.993.117L15 16v-4c0-.33-.08-.484-.132-.555a.55.55 0 0 0-.293-.188c-.348-.11-.849-.052-1.182.09c-.5.214-.958.55-1.27.861L12 12.34V16a1 1 0 0 1-1.993.117L10 16v-6a1 1 0 0 1 1-1M8 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
                                    </g>
                                </svg>
                            )}
                            {link.label === "WhatsApp" && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                                </svg>
                            )}
                            {link.label}
                        </a>
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
