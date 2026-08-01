/**
 * mega-menu.js
 * Enhances the CSS-based desktop mega menu with accessibility (ARIA attributes),
 * keyboard support (Escape to close), and touch-device handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');

    megaMenuTriggers.forEach(trigger => {
        const triggerLink = trigger.querySelector('a');
        const megaMenu = trigger.querySelector('.mega-menu');

        // Skip if this trigger doesn't have the expected internal structure
        if (!triggerLink || !megaMenu) return;

        // 1. Hover Interactions (Mouse)
        trigger.addEventListener('mouseenter', () => {
            triggerLink.setAttribute('aria-expanded', 'true');
        });

        trigger.addEventListener('mouseleave', () => {
            triggerLink.setAttribute('aria-expanded', 'false');
        });

        // 2. Keyboard Navigation (:focus-within)
        trigger.addEventListener('focusin', () => {
            triggerLink.setAttribute('aria-expanded', 'true');
        });

        trigger.addEventListener('focusout', (event) => {
            // Only collapse if the new focus target is outside the current mega menu dropdown
            if (!trigger.contains(event.relatedTarget)) {
                triggerLink.setAttribute('aria-expanded', 'false');
            }
        });

        // 3. Touch Device Handling
        triggerLink.addEventListener('click', (event) => {
            // Check if the device primarily uses touch
            const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
            const isExpanded = triggerLink.getAttribute('aria-expanded') === 'true';

            if (isTouchDevice) {
                // On first tap, open the menu (prevent navigation). 
                // Second tap on the link will act normally and navigate.
                if (!isExpanded) {
                    event.preventDefault();
                    triggerLink.setAttribute('aria-expanded', 'true');
                    
                    // Programmatically apply focus to trigger CSS :focus-within
                    triggerLink.focus(); 
                }
            }
        });
    });

    // 4. Global Interactions: Escape Key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            // Find if any mega menu is currently active via focus
            const activeTrigger = document.querySelector('.mega-menu-trigger:focus-within');
            
            if (activeTrigger) {
                const triggerLink = activeTrigger.querySelector('a');
                if (triggerLink) {
                    triggerLink.setAttribute('aria-expanded', 'false');
                }
                
                // Blur the active element to drop the CSS `:focus-within` state and hide the menu
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            }
        }
    });

    // 5. Global Interactions: Click Outside (Touch devices)
    document.addEventListener('click', (event) => {
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        
        if (isTouchDevice) {
            megaMenuTriggers.forEach(trigger => {
                const triggerLink = trigger.querySelector('a');
                // If a click happens outside this trigger, ensure it is marked as collapsed
                if (!trigger.contains(event.target) && triggerLink) {
                    triggerLink.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});
