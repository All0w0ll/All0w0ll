// Simple JavaScript for current year
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in copyright
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add security to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Simple clickjacking protection
    if (top !== self) {
        top.location = self.location;
    }
});
