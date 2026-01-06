// Preloader animation with GSAP
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const logoLeft = document.querySelector('.logo-half.left');
    const logoRight = document.querySelector('.logo-half.right');
    
    // Create a timeline for the preloader animation
    const preloaderTimeline = gsap.timeline();
    
    // Animate the logo splitting
    preloaderTimeline
        .to(logoLeft, {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        })
        .to(logoRight, {
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.8")
        .to(progressBar, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut"
        })
        .to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: hidePreloader
        });
    
    // Function to hide preloader and show content
    function hidePreloader() {
        preloader.style.display = 'none';
        
        // Initialize page animations
        if (typeof initPageAnimations === 'function') {
            initPageAnimations();
        }
    }
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 90) {
            progress = 90;
        }
        progressBar.style.width = progress + '%';
    }, 200);
    
    // Clear interval when animation completes
    setTimeout(() => {
        clearInterval(progressInterval);
    }, 1500);
});