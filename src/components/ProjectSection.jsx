import React from 'react';
import { motion } from 'framer-motion';
import ImageWithSkeleton from './ImageWithSkeleton';

/**
 * ProjectSection — Editorial Layout
 * 
 * icon + title
 * body text (full column width)
 * image BELOW as evidence (full-width or contained), only if meaningful
 * 
 * No zig-zag. No side-by-side. Text first, image as evidence.
 */
const ProjectSection = ({
    icon = '◆',
    title,
    text,
    image,           // string or null
    imageCaption,    // optional caption below image
    imageStyle = {}, // override image container style
    onImageClick,
    children          // for custom content (carousels, compare, cards, etc.)
}) => {
    return (
        <motion.section
            className="container"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            style={{ paddingTop: 'var(--space-12)' }}
        >
            <div className="section-grid">
                {/* Left: Heading */}
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-2)'
                    }}>
                        <span style={{ 
                            fontSize: '1.2rem', 
                            color: 'var(--accent-primary)', 
                            lineHeight: 1,
                            fontWeight: 900
                        }}>{icon}</span>
                        <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Right: Content */}
                <div>
                    {/* Body text */}
                    {text && (
                        <div
                            className="project-chapter-text"
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                lineHeight: 1.75,
                                maxWidth: '72ch'
                            }}
                        >
                            {text}
                        </div>
                    )}
                </div>
            </div>

            {/* Image as full-width evidence, only if provided */}
            {image && (
                <motion.div
                    whileHover={onImageClick ? { scale: 1.01 } : {}}
                    onClick={() => onImageClick && onImageClick(image)}
                    style={{
                        width: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-inactive)',
                        cursor: onImageClick ? 'pointer' : 'default',
                        marginTop: 'var(--space-12)',
                        ...imageStyle
                    }}
                >
                    <ImageWithSkeleton
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    {imageCaption && (
                        <p style={{
                            padding: 'var(--space-2) var(--space-4)',
                            fontSize: '0.8rem',
                            opacity: 0.5,
                            fontStyle: 'italic',
                            margin: 0,
                            borderTop: '1px solid var(--border-inactive)'
                        }}>
                            {imageCaption}
                        </p>
                    )}
                </motion.div>
            )}

            {/* Custom children (carousel, compare, cards, etc.) */}
            {children && (
                <div style={{ width: '100%', marginTop: text ? 'var(--space-12)' : 0 }}>
                    {children}
                </div>
            )}
        </motion.section>
    );
};

export default ProjectSection;
