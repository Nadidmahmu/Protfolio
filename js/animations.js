// Animations.js - Handles all custom animations for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when DOM is fully loaded
    initializeAnimations();
    
    // Add scroll event listener to trigger animations when scrolling
    window.addEventListener('scroll', function() {
        // Trigger animations as elements come into view
        animateOnScroll();
    });
    
    // Run animation on page load for elements already in viewport
    setTimeout(animateOnScroll, 500); // Slight delay to ensure elements are rendered
});

// Initialize all animations
function initializeAnimations() {
    // Add necessary classes and prepare elements for animation
    prepareSkillBars();
    prepareCounters();
    
    // Prepare achievement cards with fade effects
    prepareAchievementCards();
    
    // Initialize counter animation CSS
    addCssForCounterAnimation();
}

// Animation triggers when scrolling
function animateOnScroll() {
    // Animate skill bars when in viewport
    animateSkillBars();
    
    // Animate counter elements when in viewport
    animateCounters();
    
    // Animate achievement cards when in viewport
    animateAchievementCards();
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// ===== ACHIEVEMENT CARDS ANIMATIONS =====

// Prepare achievement cards for animation
function prepareAchievementCards() {
    const cards = document.querySelectorAll('.achievement-card');
    
    cards.forEach((card, index) => {
        // Apply staggered animation delay
        card.style.transitionDelay = `${index * 0.2}s`;
        
        // Ensure fade-in class is applied
        if (!card.classList.contains('fade-in')) {
            card.classList.add('fade-in');
        }
    });
}

// Animate achievement cards when they come into view
function animateAchievementCards() {
    const cards = document.querySelectorAll('.achievement-card');
    
    cards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('active')) {
            card.classList.add('active');
            
            // Force re-animation of the counter element inside this card
            const counter = card.querySelector('.counter');
            if (counter) {
                counter.classList.remove('animated');
            }
        }
    });
}

// ===== SKILL BAR ANIMATIONS =====

// Prepare skill bars for animation
function prepareSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        // Set initial width to 0 to be animated later
        bar.style.width = '0%';
        
        // Store the target width as an attribute for later use
        const targetWidth = bar.getAttribute('data-progress') || '0%';
        bar.setAttribute('data-progress', targetWidth);
    });
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        if (isElementInViewport(bar.parentElement.parentElement) && bar.style.width === '0%') {
            // Get the target width from the data attribute
            const targetWidth = bar.getAttribute('data-progress') || '0%';
            // Animate to the target width
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200); // Small delay for better visual effect
        }
    });
}

// ===== NUMBER COUNTER ANIMATIONS =====

// Prepare counter elements for animation
function prepareCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        // Set initial value from data-start attribute (default to 1)
        const startValue = counter.getAttribute('data-start') || '1';
        counter.textContent = startValue;
        counter.classList.remove('animated'); // Remove animated class to allow re-animation
    });
}

// Animate number counters when they come into view
function animateCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
        // Get the parent card to check if it's in viewport
        const card = counter.closest('.achievement-card');
        
        if (isElementInViewport(card) && !counter.classList.contains('animated')) {
            // Mark as animated to prevent re-animation
            counter.classList.add('animated');
            
            // Get target value from data attribute
            const target = parseInt(counter.getAttribute('data-target'));
            const startValue = parseInt(counter.getAttribute('data-start') || '1');
            
            // Current value (start from the data-start value)
            let count = startValue;
            
            // Calculate animation duration based on target value
            // Larger numbers take longer to count but not too long
            const duration = Math.min(3000, Math.max(1000, target * 5));
            
            // Calculate the increment step - slower for better visibility
            const totalSteps = 80; // Number of animation frames
            const incrementStep = Math.max(1, Math.ceil((target - startValue) / totalSteps));
            
            // For smoother timing
            const stepTime = duration / totalSteps;
            let lastUpdateTime = 0;
            
            // Start the counter animation
            const updateCount = (timestamp) => {
                if (!lastUpdateTime) lastUpdateTime = timestamp;
                const elapsed = timestamp - lastUpdateTime;
                
                if (elapsed > stepTime) {
                    lastUpdateTime = timestamp;
                    
                    if (count < target) {
                        // Increment by step or set to target if close enough
                        count = Math.min(count + incrementStep, target);
                        counter.textContent = count;
                        
                        // Add animation effect to the counter value
                        counter.style.animation = 'none';
                        counter.offsetHeight; // Trigger reflow
                        counter.style.animation = 'count-up 0.3s ease';
                        
                        // Continue animation until target is reached
                        requestAnimationFrame(updateCount);
                    }
                } else {
                    requestAnimationFrame(updateCount);
                }
            };
            
            // Start the counter animation
            requestAnimationFrame(updateCount);
        }
    });
}

// Add subtle highlight effect to counters when they update
function addCssForCounterAnimation() {
    if (!document.getElementById('counter-animation-style')) {
        const style = document.createElement('style');
        style.id = 'counter-animation-style';
        style.textContent = `
            @keyframes count-up {
                0% {
                    color: var(--color-accent);
                    transform: scale(1.1);
                }
                100% {
                    color: var(--color-text);
                    transform: scale(1);
                }
            }
            
            .achievement-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .achievement-card.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            .counter {
                display: inline-block;
            }
            
            .achievement-counter {
                position: relative;
                z-index: 2;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ADDITIONAL ANIMATIONS =====

// Hide scroll down arrow on mobile devices
function handleScrollDownVisibility() {
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        // Check if it's a mobile device (less than 768px)
        if (window.innerWidth < 768) {
            scrollDown.style.display = 'none';
        } else {
            scrollDown.style.display = 'flex';
        }
    }
}

// Check scroll down visibility on page load and resize
window.addEventListener('load', handleScrollDownVisibility);
window.addEventListener('resize', handleScrollDownVisibility);
