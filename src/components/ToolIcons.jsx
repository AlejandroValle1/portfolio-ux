import React from 'react';

/**
 * Individual tool icon: SVG logo + name label below.
 */
const ToolItem = ({ name, children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
    }}>
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>
        <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: 0.7,
            whiteSpace: 'nowrap',
        }}>
            {name}
        </span>
    </div>
);

/* ── Individual SVG Icons ── */

export const FigmaIcon = () => (
    <svg viewBox="0 0 38 57" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z" fill="#FF7262"/>
        <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
);

export const GeminiIcon = () => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4"/>
                <stop offset="50%" stopColor="#9B72CB"/>
                <stop offset="100%" stopColor="#D96570"/>
            </linearGradient>
        </defs>
        <path
            d="M14 2C14 2 10 9.5 2 14C10 18.5 14 26 14 26C14 26 18 18.5 26 14C18 9.5 14 2 14 2Z"
            fill="url(#gem-grad)"
        />
    </svg>
);

export const ChatGPTIcon = () => (
    <svg viewBox="0 0 41 41" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M37.53 16.63a10.07 10.07 0 0 0-.87-8.27 10.18 10.18 0 0 0-10.96-4.88A10.08 10.08 0 0 0 18.1 0a10.17 10.17 0 0 0-9.7 7.04 10.08 10.08 0 0 0-6.73 4.88 10.17 10.17 0 0 0 1.25 11.93 10.07 10.07 0 0 0 .87 8.27 10.18 10.18 0 0 0 10.96 4.88A10.08 10.08 0 0 0 22.35 41a10.18 10.18 0 0 0 9.71-7.05 10.08 10.08 0 0 0 6.73-4.87 10.17 10.17 0 0 0-1.26-12.45zM22.35 38.38a7.55 7.55 0 0 1-4.85-1.75l.24-.14 8.05-4.65a1.34 1.34 0 0 0 .67-1.16V18.9l3.4 1.97a.12.12 0 0 1 .07.1v9.4a7.57 7.57 0 0 1-7.58 8.01zM6.05 31.35a7.55 7.55 0 0 1-.9-5.07l.24.14 8.05 4.65c.41.24.92.24 1.34 0l9.83-5.68v3.93a.12.12 0 0 1-.05.1l-8.14 4.7a7.57 7.57 0 0 1-10.37-2.77zm-1.64-17.6a7.54 7.54 0 0 1 3.95-3.32v9.57c0 .47.25.9.67 1.16l9.83 5.67-3.4 1.97a.12.12 0 0 1-.12.01L7.2 23.7a7.57 7.57 0 0 1-2.79-9.95zm27.9 6.49-9.83-5.68 3.4-1.96a.12.12 0 0 1 .12-.01l8.14 4.7a7.57 7.57 0 0 1-1.17 13.65V21.4a1.34 1.34 0 0 0-.66-1.16zm3.38-5.1-.24-.14-8.05-4.65a1.34 1.34 0 0 0-1.34 0l-9.83 5.68V12.1a.12.12 0 0 1 .05-.1l8.13-4.69a7.57 7.57 0 0 1 11.28 7.83zm-21.27 7-3.4-1.97a.12.12 0 0 1-.07-.1v-9.4a7.57 7.57 0 0 1 12.41-5.82l-.24.14-8.05 4.65a1.34 1.34 0 0 0-.67 1.16zm1.85-3.98 4.37-2.52 4.37 2.52v5.03l-4.37 2.52-4.37-2.52z"
            fill="#10A37F"
        />
    </svg>
);

/**
 * ToolIcons — renders a row of tools: Figma + Gemini + ChatGPT
 */
const ToolIcons = () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <ToolItem name="Figma"><FigmaIcon /></ToolItem>
        <ToolItem name="Gemini"><GeminiIcon /></ToolItem>
        <ToolItem name="ChatGPT"><ChatGPTIcon /></ToolItem>
    </div>
);

export default ToolIcons;
