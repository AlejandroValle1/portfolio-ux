import React, { createContext, useContext, useEffect, useState } from 'react';

const PerformanceContext = createContext({
    isLowEnd: false,
    reducedMotion: false,
    isMobile: false
});

export const PerformanceProvider = ({ children }) => {
    const [stats, setStats] = useState({
        isLowEnd: false,
        reducedMotion: false,
        isMobile: false
    });

    useEffect(() => {
        const checkPerformance = () => {
            // 1. Detectar memoria (RAM)
            const memory = navigator.deviceMemory || 8; // asume 8GB si no puede detectar
            
            // 2. Detectar núcleos del CPU
            const cores = navigator.hardwareConcurrency || 8;
            
            // 3. Detectar preferencia de movimiento reducido (sistema operativo)
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            // 4. Tamaño de pantalla
            const isMobile = window.innerWidth <= 768;

            // Definimos "Low End" como dispositivos con menos de 4GB RAM o menos de 4 núcleos
            // O si el usuario explícitamente pide menos movimiento
            const isLowEnd = memory < 4 || cores < 4 || motionQuery.matches;

            setStats({
                isLowEnd,
                reducedMotion: motionQuery.matches,
                isMobile
            });
        };

        checkPerformance();
        window.addEventListener('resize', checkPerformance);
        return () => window.removeEventListener('resize', checkPerformance);
    }, []);

    return (
        <PerformanceContext.Provider value={stats}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => useContext(PerformanceContext);
