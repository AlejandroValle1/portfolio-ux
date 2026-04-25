import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProjectGroupLabel — Visual chapter/group separator
 * Renders a centered, muted label like "Investigación y Descubrimiento"
 */
const ProjectGroupLabel = ({ label, id }) => (
    <div className="container" id={id} style={{ scrollMarginTop: '100px' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-24) 0 0',
        }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-inactive)' }} />
            <span style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                opacity: 0.4,
                fontWeight: 700,
                whiteSpace: 'nowrap'
            }}>
                {label}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-inactive)' }} />
        </div>
    </div>
);


export default ProjectGroupLabel;
