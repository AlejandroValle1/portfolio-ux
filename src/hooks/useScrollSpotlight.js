import { useState, useEffect } from 'react';

export function useScrollSpotlight(refs, isLowPerformance) {
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const observers = [];
        const ratios = new Array(refs.length).fill(0);

        const updateActive = () => {
            let maxRatio = 0;
            let maxIndex = null;
            ratios.forEach((r, i) => {
                if (r > maxRatio) { maxRatio = r; maxIndex = i; }
            });
            setActiveIndex(maxRatio > 0.5 ? maxIndex : null);
        };

        refs.forEach((ref, i) => {
            if (!ref.current) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    ratios[i] = entry.intersectionRatio;
                    updateActive();
                },
                { 
                    threshold: isLowPerformance ? [0.5] : [0.2, 0.5, 0.8],
                    rootMargin: isLowPerformance ? "-20% 0px -20% 0px" : "-35% 0px -35% 0px"
                }
            );
            obs.observe(ref.current);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [refs, isLowPerformance]);

    return activeIndex;
}
