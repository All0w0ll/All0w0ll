/**
 * Cybersecurity Portfolio - Interactive Scripts
 * Author: Your Name
 * Version: 1.0.0
 * Last Updated: 2025-01
 */

(function() {
    'use strict';
    
    // DOM Ready function
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Portfolio loaded successfully');
        
        // Initialize all functionality
        initPortfolio();
    });
    
    function initPortfolio() {
        // Set current year in footer
        updateCopyrightYear();
        
        // Set last updated date
        updateLastUpdated();
        
        // Initialize expertise card interactions
        initExpertiseCards();
        
        // Initialize smooth scrolling for anchor links
        initSmoothScroll();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize contact link interactions
        initContactLinks();
        
        // Security: Add rel attributes to external links
        secureExternalLinks();
        
        // Performance: Lazy load images (if any added later)
        initLazyLoading();
    }
    
    // Update copyright year dynamically
    function updateCopyrightYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
        }
    }
    
    // Update last updated date
    function updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const now = new Date();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            lastUpdatedElement.textContent = `${month} ${year}`;
        }
    }
    
    // Expertise cards hover effects and animations
    function initExpertiseCards() {
        const cards = document.querySelectorAll('.expertise-card');
        
        cards.forEach(card => {
            // Add hover effect delay for smoothness
            card.addEventListener('mouseenter', function() {
                this.style.transitionDelay = '0s';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transitionDelay = '0.1s';
            });
            
            // Add click effect for mobile
            card.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    this.classList.toggle('active');
                }
            });
        });
        
        // Animate skill tags on scroll
        const skillTags = document.querySelectorAll('.skill-tags li');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // Scroll animations for elements
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.expertise-card, .cert-card, .section-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Header scroll effect
        const header = document.querySelector('.main-header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Show header when scrolling up
            if (currentScroll < lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Contact link interactions
    function initContactLinks() {
        const contactLinks = document.querySelectorAll('.contact-link[href^="mailto"], .contact-link[href^="http"]');
        
        contactLinks.forEach(link => {
            // Add click animation
            link.addEventListener('click', function(e) {
                // Only animate if it's not a disabled link
                if (!this.classList.contains('linkedin-link')) {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                } else {
                    e.preventDefault();
                    // Show a tooltip for LinkedIn
                    showTooltip(this, 'LinkedIn profile coming soon!');
                }
            });
            
            // Add focus styles for accessibility
            link.addEventListener('focus', function() {
                this.style.outline = `2px solid var(--color-accent)`;
                this.style.outlineOffset = '4px';
            });
            
            link.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // Simple tooltip function
    function showTooltip(element, message) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.custom-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-secondary);
            color: var(--color-text);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            border: 1px solid var(--color-accent);
            z-index: 1000;
            white-space: nowrap;
        `;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }
    
    // Security: Add security attributes to external links
    function secureExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(link => {
            // Skip if already has rel attribute
            if (link.hasAttribute('rel')) return;
            
            // Add security attributes
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add target blank for external links
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
        });
    }
    
    // Lazy loading for future images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            // Use this when you add images to your portfolio
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Global function for back to top button
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Portfolio error:', e.message);
        // You could add error reporting here
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const timing = performance.getEntriesByType('navigation')[0];
            if (timing) {
                console.log(`Page loaded in ${timing.domContentLoadedEventEnd - timing.fetchStart}ms`);
            }
        });
    }
    
})();
