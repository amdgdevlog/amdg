/**
 * mobile-drawer.js
 * Handles the off-canvas mobile menu and internal accordion interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.querySelector('.mobile-drawer');
    const openBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-drawer-btn');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Ensure the drawer exists on the page before attaching events
    if (!drawer) return;

    /**
     * Opens the mobile drawer and prevents body scrolling
     */
    const openDrawer = () => {
        drawer.classList.add('is-open');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
        
        // Prevent background scrolling while drawer is active
        document.body.style.overflow = 'hidden';
    };

    /**
     * Closes the mobile drawer and restores body scrolling
     */
    const closeDrawer = () => {
        drawer.classList.remove('is-open');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
        
        // Restore background scrolling
        document.body.style.overflow = '';
    };

    // Attach click events to the buttons
    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close drawer when the 'Escape' key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });

    // Close drawer when clicking outside of it
    document.addEventListener('click', (e) => {
        const isClickInsideDrawer = drawer.contains(e.target);
        const isClickOnOpenBtn = openBtn && openBtn.contains(e.target);

        if (drawer.classList.contains('is-open') && !isClickInsideDrawer && !isClickOnOpenBtn) {
            closeDrawer();
        }
    });

    // =========================================================
    // MOBILE ACCORDION (For Phase 1-5 Navigation)
    // =========================================================
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Check the current expanded state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle the clicked accordion's state
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Optional: If you want only one accordion open at a time, uncomment below
            /*
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });
            */
        });
    });
});
