// 3D Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D elements
    init3DElements();

    // Add mouse movement tracking for 3D effects
    addMouseTracking();

    // Add scroll-triggered 3D animations
    initScrollAnimations();
});

// Initialize 3D elements by adding necessary wrapper divs
function init3DElements() {
    // Wrap profile image in 3D container
    const profileImg = document.querySelector('.about-image .profile-img');
    if (profileImg) {
        const container = document.createElement('div');
        container.className = 'profile-img-container';
        profileImg.parentNode.insertBefore(container, profileImg);
        container.appendChild(profileImg);
    }

    // Add inner containers to skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        const inner = document.createElement('div');
        inner.className = 'skill-card-inner';
        
        // Move all children to the inner container
        while (card.firstChild) {
            inner.appendChild(card.firstChild);
        }
        
        card.appendChild(inner);
    });

    // Add inner containers to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const inner = document.createElement('div');
        inner.className = 'project-card-inner';
        
        // Move all children to the inner container
        while (card.firstChild) {
            inner.appendChild(card.firstChild);
        }
        
        card.appendChild(inner);
    });

    // Add inner containers to achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        const inner = document.createElement('div');
        inner.className = 'achievement-card-inner';
        
        // Move all children to the inner container
        while (card.firstChild) {
            inner.appendChild(card.firstChild);
        }
        
        card.appendChild(inner);
    });

    // Add data-text attributes to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
    });

    // Wrap hero section content in 3D container
    const hero = document.querySelector('.hero .text-wrapper');
    if (hero) {
        const container = document.createElement('div');
        container.className = 'hero-3d-container';
        hero.parentNode.insertBefore(container, hero);
        container.appendChild(hero);
    }
}

// Add mouse movement tracking for 3D effects
function addMouseTracking() {
    // Mouse tracking for hero section
    const hero = document.querySelector('.hero');
    const heroContainer = document.querySelector('.hero-3d-container');
    
    if (hero && heroContainer) {
        hero.addEventListener('mousemove', e => {
            const { left, top, width, height } = hero.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            heroContainer.style.transform = `
                rotateX(${y * -10}deg)
                rotateY(${x * 10}deg)
                translateZ(20px)
            `;
            
            // Adjust individual text elements for parallax effect
            const greeting = document.querySelector('.greeting');
            const name = document.querySelector('.name');
            const profession = document.querySelector('.profession');
            
            if (greeting) greeting.style.transform = `translateZ(25px) translateX(${x * -20}px) translateY(${y * -20}px)`;
            if (name) name.style.transform = `translateZ(50px) translateX(${x * -30}px) translateY(${y * -30}px)`;
            if (profession) profession.style.transform = `translateZ(35px) translateX(${x * -25}px) translateY(${y * -25}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroContainer.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
            
            const greeting = document.querySelector('.greeting');
            const name = document.querySelector('.name');
            const profession = document.querySelector('.profession');
            
            if (greeting) greeting.style.transform = 'translateZ(0) translateX(0) translateY(0)';
            if (name) name.style.transform = 'translateZ(0) translateX(0) translateY(0)';
            if (profession) profession.style.transform = 'translateZ(0) translateX(0) translateY(0)';
        });
    }

    // Mouse tracking for profile image
    const profileContainer = document.querySelector('.about-image .image-placeholder');
    if (profileContainer) {
        profileContainer.addEventListener('mousemove', e => {
            const { left, top, width, height } = profileContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const imgContainer = document.querySelector('.profile-img-container');
            if (imgContainer) {
                imgContainer.style.transform = `
                    rotateY(${x * 20}deg)
                    rotateX(${y * -20}deg)
                    translateZ(20px)
                `;
            }
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            const imgContainer = document.querySelector('.profile-img-container');
            if (imgContainer) {
                imgContainer.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
            }
        });
    }

    // Mouse tracking for skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const inner = card.querySelector('.skill-card-inner');
            if (inner) {
                inner.style.transform = `
                    translateY(-10px)
                    rotateX(${y * 10}deg)
                    rotateY(${x * 10}deg)
                    translateZ(20px)
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.skill-card-inner');
            if (inner) {
                inner.style.transform = 'translateY(0) rotateX(0) rotateY(0) translateZ(0)';
            }
        });
    });

    // Mouse tracking for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const inner = card.querySelector('.project-card-inner');
            if (inner) {
                inner.style.transform = `
                    translateY(-15px)
                    rotateX(${y * 10}deg)
                    rotateY(${x * 10}deg)
                    translateZ(20px)
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.project-card-inner');
            if (inner) {
                inner.style.transform = 'translateY(0) rotateX(0) rotateY(0) translateZ(0)';
            }
        });
    });
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // For skill bars, start the width animation
                    if (entry.target.classList.contains('skill-card')) {
                        const progress = entry.target.querySelector('.skill-progress');
                        if (progress) {
                            const targetWidth = progress.getAttribute('data-progress');
                            setTimeout(() => {
                                progress.style.width = targetWidth;
                            }, 200);
                        }
                    }
                }
            });
        }, options);

        // Observe section titles
        document.querySelectorAll('.section-title').forEach(title => {
            observer.observe(title);
        });

        // Observe skill cards
        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });

        // Observe achievement cards
        document.querySelectorAll('.achievement-card').forEach(card => {
            observer.observe(card);
        });
    }
}