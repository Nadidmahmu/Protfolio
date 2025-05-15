
// Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // 3D Tilt effect for elements with the tilt-effect class
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', tiltEffect);
        element.addEventListener('mouseleave', resetTilt);
    });
    
    function tiltEffect(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (-mouseY / (cardRect.height / 2)) * 10;
        const rotateY = (mouseX / (cardRect.width / 2)) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    // Staggered animations for sequential elements (like skill cards)
    const staggerContainers = document.querySelectorAll('.skills-container, .projects-grid');
    
    staggerContainers.forEach(container => {
        const items = container.children;
        for (let i = 0; i < items.length; i++) {
            // Add a sequential delay to each item
            items[i].style.transitionDelay = `${i * 0.1}s`;
        }
    });

    // Type writing effect for hero section
    const animatedHeading = document.querySelector('.animated-heading');
    
    if (animatedHeading) {
        // Add a blinking cursor element at the end of the profession text
        const professionEl = animatedHeading.querySelector('.profession');
        const cursorEl = document.createElement('span');
        cursorEl.classList.add('typing-cursor');
        cursorEl.innerHTML = '|';
        professionEl.appendChild(cursorEl);
        
        // Style for blinking cursor
        const style = document.createElement('style');
        style.innerHTML = `
            .typing-cursor {
                animation: blink 1s infinite;
                display: inline-block;
                margin-left: 5px;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Particle animation in the background (subtle effect)
    createParticles();
    
    function createParticles() {
        const homeSection = document.getElementById('home');
        if (!homeSection) return;
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.classList.add('particles-canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.3;
        `;
        
        // Insert canvas as first child of home section
        homeSection.insertBefore(canvas, homeSection.firstChild);
        
        // Set canvas dimensions
        canvas.width = homeSection.offsetWidth;
        canvas.height = homeSection.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        
        // Particle system
        const particles = [];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: 'rgba(100, 255, 218, 0.5)'
            });
        }
        
        // Animation loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Draw connections between nearby particles
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 255, 218, ${0.15 - distance/1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Start animation
        animateParticles();
        
        // Resize handling
        window.addEventListener('resize', function() {
            canvas.width = homeSection.offsetWidth;
            canvas.height = homeSection.offsetHeight;
        });
    }

    // Smooth scrolling with parallax sections
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        sections.forEach(section => {
            // Calculate section offset from top
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in view
            if (scrollTop >= sectionTop - window.innerHeight && 
                scrollTop <= sectionTop + sectionHeight) {
                
                // Calculate how far we've scrolled into the section as a percentage
                const scrollPercent = (scrollTop - sectionTop + window.innerHeight) / 
                                    (window.innerHeight + sectionHeight);
                
                // Add subtle animation based on scroll position
                section.style.background = `linear-gradient(
                    to bottom, 
                    var(--color-secondary) ${10 + scrollPercent * 10}%, 
                    var(--color-primary) ${90 - scrollPercent * 10}%
                )`;
            }
        });
    });

    // Add floating animation to specific elements
    const floatingElements = document.querySelectorAll('.skill-icon, .logo-placeholder');
    
    floatingElements.forEach