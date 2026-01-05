// Mobile Menu Logic
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if(btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        btn.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.classList.remove('open');
        });
    });

    // Mobile Menu Dropdown Logic
    const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
    const mobileDropdownIcon = document.getElementById('mobile-dropdown-icon');

    if(mobileDropdownBtn && mobileDropdownMenu && mobileDropdownIcon) {
        mobileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            mobileDropdownMenu.classList.toggle('hidden');
            mobileDropdownIcon.classList.toggle('rotate-180');
        });
    }
}

// Modal Logic
window.toggleModal = function(show, filter = 'all') {
    const modal = document.getElementById('stores-modal');
    if (!modal) return;
    
    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
        
        // Filter Logic
        const container = modal.querySelector('.space-y-8');
        if (container) {
            const categories = container.querySelectorAll(':scope > div');
            const modalTitle = modal.querySelector('h3');
            
            categories.forEach(div => {
                const titleElement = div.querySelector('h4');
                if (!titleElement) return;
                const title = titleElement.textContent.toLowerCase();
                
                let shouldShow = false;
                
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'fashion') {
                    if (title.includes('clothing') || 
                        title.includes('footwear') || 
                        title.includes('men\'s') || 
                        title.includes('womens') || 
                        title.includes('jewellery') || 
                        title.includes('eyewear') || 
                        title.includes('hair') || 
                        title.includes('beauty')) {
                        shouldShow = true;
                    }
                } else if (filter === 'food') {
                    if (title.includes('food') || 
                        title.includes('restaurant') || 
                        title.includes('dining')) {
                        shouldShow = true;
                    }
                } else if (filter === 'retail') {
                    // Retail = Everything NOT Fashion and NOT Food (and maybe not services like Banks if we want pure retail, but let's include them as "General" or exclude banks? Let's exclude Banks/Services for "Retail Hub" focus)
                    const isFashion = title.includes('clothing') || title.includes('footwear') || title.includes('men\'s') || title.includes('womens') || title.includes('jewellery') || title.includes('eyewear') || title.includes('hair') || title.includes('beauty');
                    const isFood = title.includes('food') || title.includes('restaurant') || title.includes('dining');
                    
                    if (!isFashion && !isFood) {
                        shouldShow = true;
                    }
                }
                
                div.style.display = shouldShow ? 'block' : 'none';
            });
            
            // Update Title
            if (modalTitle) {
                if (filter === 'fashion') modalTitle.textContent = 'Fashion & Lifestyle Stores';
                else if (filter === 'food') modalTitle.textContent = 'Dining & Food Court';
                else if (filter === 'retail') modalTitle.textContent = 'Retail Hub Directory';
                else modalTitle.textContent = 'Store Directory';
            }
        }
        
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalBottomBtn = document.getElementById('close-modal-bottom-btn');
const modal = document.getElementById('stores-modal');

if(closeModalBtn) closeModalBtn.addEventListener('click', () => window.toggleModal(false));
if(closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', () => window.toggleModal(false));

if(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) window.toggleModal(false);
    });
}

// Contact Form Logic
window.initializeContactForm = function() {
    const contactForm = document.getElementById('contact-form');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');
    const successMessage = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (replace with actual AJAX call)
            console.log('Form submitted:', data);
            
            // Show success message
            if (successMessage) {
                successMessage.classList.remove('hidden');
                contactForm.classList.add('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                }, 5000);
            }
            
            // Close modal after successful submission (optional)
            setTimeout(() => {
                if (contactModal) {
                    contactModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 3000);
        });
    }
    
    // Close contact modal
    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener('click', () => {
            if (contactModal) {
                contactModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close contact modal when clicking outside
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
};

// Toggle Contact Modal
window.toggleContactModal = function(show) {
    const contactModal = document.getElementById('contact-modal');
    
    if (!contactModal) return;
    
    if (show) {
        contactModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Initialize form if not already initialized
        if (typeof window.initializeContactForm === 'function') {
            window.initializeContactForm();
        }
    } else {
        contactModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

// Custom Cursor & GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {
    // Initialize contact form
    if (typeof window.initializeContactForm === 'function') {
        window.initializeContactForm();
    }
    
    gsap.registerPlugin(ScrollTrigger);

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    
    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            // Move cursor directly
            cursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
            
            // Move blur with slight delay via GSAP for smoothness
            gsap.to(cursorBlur, {
                x: clientX,
                y: clientY,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Hover effects - Add contact form elements
        const hoverables = document.querySelectorAll('a, button, .bento-item, .magnetic-btn, input, textarea, select');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // --- Magnetic Buttons ---
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(magnet, {
                duration: 0.3,
                x: x * 0.2, // Movement intensity
                y: y * 0.2,
                ease: "power2.out"
            });
            
            // Also move the text/content slightly more for depth
            const content = magnet.querySelector('span.relative');
            if(content) {
                gsap.to(content, {
                    duration: 0.3,
                    x: x * 0.1,
                    y: y * 0.1,
                    ease: "power2.out"
                });
            }
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, { duration: 0.5, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
            const content = magnet.querySelector('span.relative');
            if(content) {
                gsap.to(content, { duration: 0.5, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
            }
        });
    });

    // --- Preloader & Intro Timeline ---
    const tl = gsap.timeline();

    gsap.set("nav", { y: -100, opacity: 0 });

    tl.from(".logo-img", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .to(".logo-img", {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut"
    })
    .to(".loader-half.top", {
        yPercent: -100,
        duration: 1.5,
        ease: "expo.inOut"
    }, "split")
    .to(".loader-half.bottom", {
        yPercent: 100,
        duration: 1.5,
        ease: "expo.inOut"
    }, "split")
    .set("#preloader", { display: "none" })
    .call(() => {
        document.body.classList.add("loaded");
        document.body.classList.remove("overflow-hidden");
    })
    .to("nav", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out" 
    }, "-=1.1")
    .to(".hero-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.15,
        ease: "power3.out" 
    }, "-=1.0");

    // --- Mall Status Logic ---
    function updateMallStatus() {
        const statusContainer = document.getElementById('mall-status-container');
        const statusDot = document.getElementById('status-dot');
        const statusText = document.getElementById('status-text');

        if (!statusContainer || !statusDot || !statusText) return;

        const now = new Date();
        const day = now.getDay(); // 0 is Sunday
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        // Trading Hours
        const openTime = 9;
        let closeTime = 18; // Default Mon-Thu

        if (day === 5) { // Friday
            closeTime = 19;
        } else if (day === 6) { // Saturday
            closeTime = 17;
        } else if (day === 0) { // Sunday
            closeTime = 15;
        }

        let statusString = "";
        let colorClass = "";
        let shadowColor = "";

        if (currentTime < openTime) {
            statusString = `Closed • Opens at 09:00`;
            colorClass = "bg-red-500";
            shadowColor = "rgba(239, 68, 68, 0.6)";
        } else if (currentTime >= closeTime) {
            statusString = `Closed • Opens tomorrow at 09:00`;
            colorClass = "bg-red-500";
            shadowColor = "rgba(239, 68, 68, 0.6)";
        } else if (currentTime >= closeTime - 1) { 
            const minutesLeft = Math.floor((closeTime - currentTime) * 60);
            statusString = `Closing Soon • Closes in ${minutesLeft} min`;
            colorClass = "bg-orange-400";
            shadowColor = "rgba(251, 146, 60, 0.6)";
        } else {
            statusString = `Open Now • Closes at ${closeTime}:00`;
            colorClass = "bg-emerald-400";
            shadowColor = "rgba(52, 211, 153, 0.6)";
        }

        statusText.textContent = statusString;
        statusDot.className = `w-2.5 h-2.5 rounded-full mr-4 ${colorClass} animate-pulse`;
        statusDot.style.boxShadow = `0 0 12px ${shadowColor}`;
    }

    updateMallStatus();
    setInterval(updateMallStatus, 60000);

    // --- Hero Parallax ---
    if(document.getElementById('hero-image')) {
        gsap.to("#hero-image", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            yPercent: 20,
            scale: 1.1,
            ease: "none"
        });

        gsap.to(".hero-content", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom 60%", 
                scrub: true
            },
            y: -100,
            opacity: 0,
            scale: 0.9,
            ease: "power1.in"
        });
    }

    // --- Bento Grid Parallax ---
    const bentoItems = document.querySelectorAll('.bento-item');
    if(bentoItems.length > 0) {
        bentoItems.forEach((item, index) => {
            const speed = (index + 1) * 10;
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -speed, 
                ease: "none"
            });
        });
    }

    // --- Background Shapes Parallax ---
    const shapes = document.querySelectorAll('.bento-bg-shape');
    if(shapes.length > 0) {
        shapes.forEach((shape, index) => {
            const speed = shape.getAttribute('data-speed') || 0.1;
            gsap.to(shape, {
                scrollTrigger: {
                    trigger: shape.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: (index + 1) * 100 * speed, 
                rotation: (index + 1) * 45,
                ease: "none"
            });
        });
    }

    // --- General Section Animations ---
    const sections = gsap.utils.toArray("section:not(#home)");
    sections.forEach(section => {
        const headings = section.querySelectorAll("h2, h3");
        if(headings.length > 0) {
             gsap.fromTo(headings, 
                { y: 50, scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }
            );
        }
        
        // Stagger cards with safer batch or simple fromTo logic
        const cards = section.querySelectorAll(".grid > div:not(.bento-item)");
        if(cards.length > 0) {
            ScrollTrigger.batch(cards, {
                start: "top 85%",
                onEnter: batch => gsap.fromTo(batch, 
                    { opacity: 0, y: 60, scale: 0.95 }, 
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", overwrite: true }
                ),
                once: true 
            });
        }

        // Bento Entrance
        const bentoItems = section.querySelectorAll(".bento-item");
        if(bentoItems.length > 0) {
            gsap.from(bentoItems, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
        
        const paragraphs = section.querySelectorAll("p:not(.hero-content p)");
        if(paragraphs.length > 0) {
            gsap.from(paragraphs, {
                 scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
});