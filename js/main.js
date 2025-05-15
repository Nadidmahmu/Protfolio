// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 2000); // Hide preloader after 2 seconds
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navCloseIcon = document.querySelector('.nav-close-icon');
    const navMenu = document.querySelector('nav ul');
    
    // Open mobile menu
    mobileNavToggle.addEventListener('click', function() {
        this.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile menu with close icon
    if (navCloseIcon) {
        navCloseIcon.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if the click is outside the navigation and not on the toggle button
        const isNavMenuClick = navMenu.contains(e.target);
        const isNavToggleClick = mobileNavToggle.contains(e.target);
        
        if (!isNavMenuClick && !isNavToggleClick && navMenu.classList.contains('active')) {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Scroll to section when clicking on nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animations
    const scrollElements = document.querySelectorAll('.section-title, .about-image, .about-text, .skill-card, .project-card, .contact-info, .contact-form');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // Add fade-in class to all scroll elements
    scrollElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Initialize scroll animations
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Skill cards staggered animation
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate skill progress bars when in view
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const animateProgressBars = () => {
        skillProgressBars.forEach(progress => {
            const parent = progress.parentElement.parentElement;
            if (elementInView(parent, 1.25)) {
                const width = progress.style.width;
                progress.style.setProperty('--progress', width);
                progress.classList.add('animate');
            }
        });
    };

    // Initialize progress bar animations
    setTimeout(animateProgressBars, 300);
    
    // Listen for scroll to animate progress bars
    window.addEventListener('scroll', animateProgressBars);

    // Project modals
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalTechTags = document.getElementById('modalTechTags');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    const modalImage = document.getElementById('modalImage');
    
    // Project data for the modal
    const projectsData = [
        {
            title: 'E-Commerce Platform',
            description: 'A fully responsive e-commerce website with product filtering, cart functionality, and payment integration. Built with modern JavaScript practices and optimized for performance.',
            imagePath: 'assist/ECommerce_Platform_2.jpg',
            tech: ['HTML', 'CSS', 'JavaScript', 'localStorage API'],
            features: [
                'Responsive product grid with filter options',
                'Shopping cart with local storage persistence',
                'User authentication system',
                'Payment gateway integration',
                'Admin dashboard for product management'
            ],
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'Image Recognition App',
            description: 'An application that uses deep learning algorithms to identify objects in images with high accuracy. Leverages transfer learning on pre-trained models for optimal performance.',
            imagePath: 'assist/Image_Recognition_App_2.jpg',
            tech: ['Python', 'TensorFlow', 'Computer Vision', 'Flask'],
            features: [
                'Real-time object detection',
                'Multiple model selection',
                'Confidence score thresholding',
                'API endpoints for integration',
                'Performance optimization for edge devices'
            ],
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'Task Management System',
            description: 'A comprehensive task management application with features like task assignments, progress tracking, and deadline notifications. Ideal for small teams and personal use.',
            imagePath: 'assist/Task_Management_System_1.jpg',
            tech: ['JavaScript', 'CSS', 'HTML', 'Local Storage'],
            features: [
                'Drag and drop task organization',
                'Priority levels and categories',
                'Deadline tracking with notifications',
                'Progress visualization',
                'Data persistence with local storage'
            ],
            liveLink: '#',
            codeLink: '#'
        },
        {
            title: 'Path Finding Visualizer',
            description: 'An interactive visualization tool for various path-finding algorithms, helping users understand how they work. Includes A*, Dijkstra, BFS, and DFS algorithms.',
            imagePath: 'assist/Path_Finding_Visualizer_3.jpg',
            tech: ['JavaScript', 'HTML Canvas', 'CSS Grid', 'Algorithms'],
            features: [
                'Interactive grid system for creating obstacles',
                'Multiple algorithm selection',
                'Speed control for visualizations',
                'Maze generation algorithms',
                'Performance metrics comparison'
            ],
            liveLink: '#',
            codeLink: '#'
        }
    ];
    
    // Open modal with project data
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const project = projectsData[index];
            
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Set the modal image source
            if (modalImage && project.imagePath) {
                modalImage.src = project.imagePath;
                modalImage.alt = project.title;
                
                // Ensure image is loaded before showing modal
                modalImage.onload = function() {
                    // Image loaded successfully
                    modalImage.style.display = 'block';
                };
                
                modalImage.onerror = function() {
                    // Handle image loading error
                    console.error('Failed to load image:', project.imagePath);
                    modalImage.style.display = 'none';
                };
            }
            
            // Clear previous tech tags
            modalTechTags.innerHTML = '';
            
            // Add tech tags
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalTechTags.appendChild(span);
            });
            
            // Clear previous features
            modalFeatures.innerHTML = '';
            
            // Add features
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });
            
            // Set links
            modalLiveLink.href = project.liveLink;
            modalCodeLink.href = project.codeLink;
            
            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        // Reset modal image
        if (modalImage) {
            modalImage.src = '';
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            // Reset modal image
            if (modalImage) {
                modalImage.src = '';
            }
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            // Reset modal image
            if (modalImage) {
                modalImage.src = '';
            }
        }
    });

    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Initialize EmailJS
    (function() {
        emailjs.init("tKOI1U5Hplr1DLVWl"); // Replace with your actual EmailJS public key
    })();
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'nadidmahmud05@gmail.com'
            };
            
            // Send email using EmailJS
            emailjs.send('service_vulapar', 'template_j3rkj9r', templateParams) // Replace with your actual service and template IDs
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove loading state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show success message with animation
                    showFormSuccess();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Remove loading state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show error message
                    showFormError();
                });
        });
    }
    
    // Success message function
    function showFormSuccess() {
        // Create success message container
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        
        // Create success content
        successMessage.innerHTML = `
            <div class="success-icon">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button class="btn primary close-success">Close</button>
        `;
        
        // Hide form groups
        formGroups.forEach(group => {
            group.style.display = 'none';
        });
        
        // Hide submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.display = 'none';
        
        // Append success message
        contactForm.appendChild(successMessage);
        
        // Add close button event listener
        const closeBtn = successMessage.querySelector('.close-success');
        closeBtn.addEventListener('click', function() {
            // Remove success message
            successMessage.remove();
            
            // Show form groups and submit button again
            formGroups.forEach(group => {
                group.style.display = 'block';
            });
            submitBtn.style.display = 'block';
        });
    }
    
    // Error message function
    function showFormError() {
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        errorMessage.innerHTML = `
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <p>Sorry, there was an error sending your message. Please try again later.</p>
            <button class="btn secondary dismiss-error">Dismiss</button>
        `;
        
        // Insert error message after the form
        contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
        
        // Add dismiss button event listener
        const dismissBtn = errorMessage.querySelector('.dismiss-error');
        dismissBtn.addEventListener('click', function() {
            errorMessage.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 5000);
    }

    // 3D tilt effect for skill cards
    const addTiltEffect = (element) => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const maxRotate = 10;
            const rotateX = (0.5 - yPercent) * maxRotate;
            const rotateY = (xPercent - 0.5) * maxRotate;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    };
    
    // Add tilt effect to skill cards
    skillCards.forEach(card => {
        addTiltEffect(card);
    });

    // Initialize any animations that need JavaScript
    document.querySelectorAll('.section-title').forEach(title => {
        if (elementInView(title)) {
            title.classList.add('active');
        }
    });
    
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.section-title').forEach(title => {
            if (elementInView(title)) {
                title.classList.add('active');
            }
        });
    });

    // Additional animations for the nav elements (enhances the higher position on desktop)
    if (window.innerWidth > 768) {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 500);
        });
    }
});
