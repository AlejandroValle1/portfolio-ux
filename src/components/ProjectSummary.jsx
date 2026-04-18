import React from 'react';
import { motion } from 'framer-motion';

const ProjectSummary = ({ title, content, type = 'learning' }) => {
    const isEpilogue = type === 'epilogue';

    return (
        <section className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    backgroundColor: isEpilogue ? 'rgba(255,255,255,0.02)' : 'var(--surface-color)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-inactive)',
                    padding: 'var(--space-12) var(--space-8)',
                    borderRadius: '40px',
                    textAlign: isEpilogue ? 'left' : 'center',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Visual Accent */}
                {!isEpilogue && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '150px',
                        height: '4px',
                        backgroundColor: 'var(--accent-primary)',
                        borderRadius: '0 0 10px 10px'
                    }} />
                )}

                <h3 className="brutalist-title" style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    marginBottom: 'var(--space-6)',
                    color: isEpilogue ? 'var(--text-color)' : 'var(--accent-primary)',
                    letterSpacing: '-0.02em'
                }}>
                    {title}
                </h3>
                
                <div 
                    className="project-chapter-text" 
                    style={{ 
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                        maxWidth: isEpilogue ? 'none' : '900px', 
                        margin: isEpilogue ? '0' : '0 auto',
                        fontWeight: 500,
                        lineHeight: 1.6
                    }}
                >
                    {content}
                </div>
            </motion.div>
        </section>
    );
};

export default ProjectSummary;
