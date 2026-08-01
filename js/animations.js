/**
 * animations.js
 * Handles scroll-based animations and intersection observers 
 * for the Blueprint Architecture template.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Accessibility Check: Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Exit early if the user prefers reduced motion; elements will just render normally
        return;
    }

    // 2. Define the Intersection Observer options
    const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px 0px -50px 0px', // trigger slightly before the element hits the bottom
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    // 3. Create the Intersection Observer callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                
                // Optional: Stop observing once the animation has triggered (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // 4. Select elements to animate
    // Target common grid cards, timeline items, and matrix columns
    const animatedElements = document.querySelectorAll(`
        .pillar-card, 
        .matrix-phase-col, 
        .timeline-item, 
        .feature-card,
        .architecture-diagram-wrapper
    `);

    // 5. Initialize elements (add base class for styling if relying on JS for animations)
    animatedElements.forEach((el, index) => {
        // Optional: Add a slight staggered transition delay based on horizontal grid position
        // This makes 3-column or 5-column layouts fade in sequentially
        const delay = (index % 3) * 150; // 0ms, 150ms, 300ms
        el.style.transitionDelay = `${delay}ms`;
        
        // Add a base utility class that the CSS can hook into for initial hidden state
        el.classList.add('js-scroll-animate');
        
        // Start observing
        intersectionObserver.observe(el);
    });

    // =========================================================
    // CSS INJECTION FOR JS-ONLY ANIMATIONS (Optional)
    // =========================================================
    // We inject the base CSS here so that if JS is disabled, 
    // the elements don't get stuck in a hidden state.
    const style = document.createElement('style');
    style.textContent = `
        .js-scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .js-scroll-animate.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
