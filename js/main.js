/**
 * main.js
 * Core interactions for Blueprint Architecture template
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MOBILE OFF-CANVAS DRAWER
    // =========================================================
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeDrawerBtn = document.querySelector('.close-drawer-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    const openDrawer = () => {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('is-open');
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('is-open');
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
        
        // Restore background scrolling
        document.body.style.overflow = '';
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openDrawer);
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking outside of it
    document.addEventListener('click', (event) => {
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
            // Check if the click was outside the drawer and not on the hamburger button
            if (!mobileDrawer.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                closeDrawer();
            }
        }
    });

    // Close drawer on 'Escape' key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });


    // =========================================================
    // 2. MOBILE MENU ACCORDIONS
    // =========================================================
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Check current state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Optional: Close all other accordions (uncomment to make it exclusive)
            /*
            accordions.forEach(acc => {
                if (acc !== this) {
                    acc.setAttribute('aria-expanded', 'false');
                }
            });
            */
            
            // Toggle the clicked accordion
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });


    // =========================================================
    // 3. MEGA MENU ACCESSIBILITY (Keyboard navigation fallback)
    // =========================================================
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger > a');

    // The mega menu is primarily handled by CSS (:hover, :focus-within).
    // This script ensures that tapping the top-level link on touch devices 
    // or hitting Enter toggles visibility properly without immediately redirecting 
    // if it acts purely as a dropdown toggle.
    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // If the link has a hash or is strictly meant to open the menu
            const href = trigger.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                // CSS :focus-within handles the visual state natively
            }
        });
    });

});
