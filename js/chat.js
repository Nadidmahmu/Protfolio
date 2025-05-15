// AI Chat Assistant
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');

    // CV/Resume file path - change this to your actual CV file path
    const cvFilePath = "files/Tahshin_Mahmud_Nadid_CV.pdf";

    // Knowledge base about Tahshin Mahmud Nadid - Enhanced with chat.md content
    const knowledgeBase = {
        // Personal Information
        personal: {
            'who are you': 'I\'m Tahshin Mahmud Nadid, a passionate CSE undergraduate and freelance graphic designer from Dhaka, Bangladesh.',
            'what is your name': 'My full name is Tahshin Mahmud Nadid.',
            'can you tell me about yourself': 'I\'m a tech enthusiast with a strong background in graphic design and programming, aiming to become a professional hacker.',
            'what is your background': 'I have over 5 years of experience in freelancing as a graphic designer and am currently pursuing a degree in Computer Science & Engineering.',
            'where are you from': 'I\'m originally from Jalsuka, Nabinagar, Brahmanbaria, Bangladesh.',
            'where are you currently based': 'I currently reside in Gandaria, Dhaka, Bangladesh.',
            'what do you do for a living': 'I work as a freelance graphic designer and am a full-time CSE student.',
            'what inspired you to create this portfolio': 'To showcase my skills, projects, and journey in tech and design, and to connect with potential collaborators and clients.',
            'about': 'I\'m Tahshin Mahmud Nadid, a tech enthusiast with a strong background in graphic design and programming, aiming to become a professional hacker. I have over 5 years of experience in freelancing and am currently pursuing a degree in Computer Science & Engineering.',
            'bio': 'Tahshin Mahmud Nadid is a passionate CSE undergraduate and freelance graphic designer from Dhaka, Bangladesh with over 5 years of experience in design and programming.'
        },
        
        // Skills Information
        skills: {
            'what skills do you have': 'Proficient in C++, Python, JavaScript, HTML, CSS, and graphic design using Adobe Suite.',
            'what are your areas of expertise': 'Software development, AI development, voice assistant creation, and graphic design.',
            'which programming languages or frameworks do you know': 'C++, Python, JavaScript, HTML, CSS; familiar with frameworks like React and Firebase.',
            'what design or technical skills do you have': 'Skilled in Photoshop, Illustrator, Figma, and have experience with VS Code and Git.',
            'are you specialized in any particular field or technology': 'Specialize in AI development and creating voice assistants like JARVIS.',
            'are you a front-end, back-end, or full-stack developer': 'I\'m a full-stack developer with a focus on AI integration.',
            'what makes you unique in your field': 'Combining creative design with technical programming skills to develop innovative solutions.',
            'what tools and technologies do you excel at': 'Adobe Photoshop, Illustrator, VS Code, Git, GitHub, Figma, Firebase.',
            'how would you describe your main skill set': 'A blend of graphic design and software development, with a strong inclination towards AI technologies.',
            'programming languages': 'Proficient in C++, Python, JavaScript, HTML, CSS, and familiar with frameworks like React and Firebase.',
            'design skills': 'Expert in Adobe Photoshop, Illustrator, and Figma for comprehensive graphic design work.',
            'ai skills': 'Specialized in AI development and voice assistant creation, like my JARVIS project.'
        },
        
        // Projects Information
        projects: {
            'what projects have you worked on': 'Developed an offline AI assistant (JARVIS), various graphic design projects including logos, banners, and posters.',
            'which projects are in your portfolio': 'My portfolio includes AI assistant development, game development, and a range of graphic design works.',
            'can you share examples of your work': 'Yes, you can view my projects on my GitHub: github.com/Nadidmahmu',
            'do you have any case studies or project descriptions': 'Detailed descriptions are available on my portfolio website: nadid.dev',
            'which project are you most proud of': 'The development of my offline AI assistant, JARVIS, integrating voice and text commands.',
            'what is the most recent project you completed': 'Recently completed a game development project using Python and Pygame.',
            'can you tell me about an interesting project you\'ve done': 'Created a voice-controlled AI assistant capable of system control and web API integration.',
            'where can I view your projects': 'Projects are showcased on my GitHub and portfolio website.',
            'what kinds of projects do you specialize in': 'Specialize in AI development, voice assistants, and graphic design projects.',
            'have you worked on any large or notable projects': 'Developed a comprehensive AI assistant and completed numerous freelance graphic design projects for clients.',
            'jarvis': 'JARVIS is my offline AI assistant project that integrates voice and text commands for system control and web API integration.',
            'ai assistant': 'My AI assistant project (JARVIS) is a voice-controlled system capable of managing computer functions and integrating with various APIs.',
            'game development': 'I\'ve created game development projects using Python and Pygame, focusing on interactive experiences.'
        },
        
        // Work Experience Information
        experience: {
            'what companies or clients have you worked with': 'Worked with various clients globally through freelance platforms, focusing on graphic design and software development.',
            'what is your current or most recent job title': 'Freelance Graphic Designer and Software Developer.',
            'how long have you been working in this field': 'Over 5 years of experience in graphic design and software development.',
            'what roles have you held in the past': 'Roles include freelance graphic designer, software developer, and AI enthusiast.',
            'have you worked at any well-known companies or organizations': 'Primarily worked as a freelancer, collaborating with various clients on diverse projects.',
            'do you have experience as a freelancer or contractor': 'Yes, extensive experience as a freelancer in both design and development.',
            'what industries have you worked in': 'Worked across tech, education, and creative industries.',
            'what is your professional background': 'Background in computer science and graphic design, with a focus on AI development.',
            'what responsibilities have you had in previous jobs': 'Responsibilities included project planning, design execution, coding, and client communication.',
            'can you describe your career path so far': 'Started as a freelance graphic designer, transitioned into software development, now focusing on AI technologies.',
            'freelance experience': 'Over 5 years of freelance experience in graphic design and software development for clients worldwide.',
            'work history': 'Started as a freelance designer, developed skills in programming, and now combine both with a focus on AI technologies.'
        },
        
        // Education Information
        education: {
            'what is your highest academic qualification': 'Currently pursuing a Bachelor\'s degree in Computer Science & Engineering.',
            'which school or university did you attend': 'Completed SSC from Dhaka Collegiate School and HSC from St. Gregory High School & College.',
            'what did you study or major in': 'Major in Computer Science & Engineering.',
            'did you attend any noteworthy educational programs': 'Participated in various online courses related to AI and software development.',
            'do you have any academic honors or awards': 'Achieved GPA 5.00 in both SSC and HSC examinations.',
            'have you taken any courses or training related to your work': 'Completed courses in AI development, Python programming, and graphic design.',
            'when did you graduate': 'Graduated SSC in 2022 and HSC in 2024; currently pursuing undergraduate studies.',
            'are you pursuing any further education': 'Yes, currently enrolled in a Bachelor\'s program in Computer Science & Engineering.',
            'do you have any vocational training or bootcamp experience': 'Attended workshops and online bootcamps focused on AI and software development.',
            'what degrees or diplomas do you hold': 'Holding a Higher Secondary Certificate; pursuing a Bachelor\'s degree.',
            'what is your field of study': 'Computer Science & Engineering.',
            'school': 'I completed my school level (SSC) from Dhaka Collegiate School in Dhaka with a GPA of 5.00.',
            'college': 'I completed my college level (HSC) from St. Gregory High School & College in Dhaka with a GPA of 5.00.'
        },
        
        // Certifications Information
        certifications: {
            'what professional certifications do you have': 'Obtained certifications in Python programming and AI development from online platforms.',
            'are you certified in any programming languages or platforms': 'Yes, certified in Python and JavaScript through online courses.',
            'do you hold any industry-recognized certificates': 'Possess certificates from recognized online learning platforms like Coursera and Udemy.',
            'have you completed any official training courses': 'Completed official courses in AI, machine learning, and web development.',
            'which certifications or credentials do you have': 'Credentials in AI development, Python programming, and graphic design.',
            'when did you earn your latest certification': 'Earned the latest certification in AI development in 2024.',
            'do you have any certificates from online courses or workshops': 'Yes, multiple certificates from online courses and workshops in tech and design.',
            'are you certified in agile, cloud, security, etc': 'Currently pursuing certifications in cloud computing and cybersecurity.',
            'what badges or certificates do you hold': 'Hold badges in Python, AI, and graphic design from various online platforms.'
        },
        
        // Contact Information
        contact: {
            'contact': 'You can contact me via email at nadidmahmud05@gmail.com or through the contact form on this website.',
            'email': 'My email address is nadidmahmud05@gmail.com.',
            'location': 'I am based in Gandaria, Dhaka, Bangladesh but available for remote work worldwide.',
            'remote work': 'Yes, I am available for remote work and collaboration.',
            'hire': 'I am available for hire for full-time positions, freelance work, or consulting. Please contact me via email at nadidmahmud05@gmail.com.',
            'freelance': 'Yes, I am available for freelance projects. Please reach out with your project details.',
            'social media': 'You can find me on GitHub (github.com/Nadidmahmu) and Behance (behance.net/31TAhsin).',
            'linkedin': 'You can find my professional profile on LinkedIn, where I showcase my experience and skills.'
        },
        
        // Generic Responses
        generic: {
            'hello': 'Hello! How can I help you learn about Tahshin Mahmud Nadid today?',
            'hi': 'Hi there! Feel free to ask me anything about Tahshin Mahmud Nadid.',
            'hey': 'Hey! I can tell you about Tahshin Mahmud Nadid. What would you like to know?',
            'thank you': 'You\'re welcome! Is there anything else you\'d like to know about Tahshin Mahmud Nadid?',
            'thanks': 'You\'re welcome! Is there anything else you\'d like to know?',
            'bye': 'Goodbye! Feel free to chat again if you have more questions about Tahshin Mahmud Nadid.',
            'goodbye': 'Goodbye! Thank you for your interest in Tahshin Mahmud Nadid\'s portfolio.',
            'help': 'I can provide information about Tahshin\'s background, skills, projects, education, work experience, or how to contact him. What would you like to know?',
            'menu': 'You can ask about: personal information, skills, projects, work experience, education, certifications, or contact details.'
        },
        
        // Technical Knowledge
        technical: {
            'what is html': 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
            'what is css': 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.',
            'what is javascript': 'JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.',
            'what is machine learning': 'Machine Learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.',
            'what is deep learning': 'Deep Learning is a subset of machine learning that uses neural networks with many layers (deep neural networks) to analyze various factors of data.',
            'what is python': 'Python is a high-level, interpreted programming language known for its readability and versatility in web development, data science, and machine learning.',
            'what is c++': 'C++ is a general-purpose programming language created as an extension of the C programming language with object-oriented features.',
            'what is c': 'C is a general-purpose, procedural computer programming language that provides low-level access to system memory.',
            'what is frontend': 'Frontend development involves creating the user interface and user experience of a website or application using HTML, CSS, and JavaScript.',
            'what is backend': 'Backend development involves server-side logic, databases, and application integration to power the functionality of web applications.',
            'what is full stack': 'Full Stack development combines both frontend and backend development skills to build complete web applications.',
            'what is ai': 'Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn like humans.',
            'what is voice assistant': 'A voice assistant is an AI-powered digital assistant that uses voice recognition, speech synthesis, and natural language processing to provide services.'
        },
        
        // Portfolio Specific
        portfolio: {
            'portfolio': 'This portfolio showcases Tahshin Mahmud Nadid\'s skills, projects, and experience as a Software Engineer and Graphic Designer.',
            'website': 'This website was built using HTML, CSS, and vanilla JavaScript to showcase Tahshin\'s skills and projects.',
            'resume': 'I can provide you with Tahshin\'s resume. Would you like to download it?',
            'cv': 'I can provide you with Tahshin\'s CV. Would you like to download it?',
            'github': 'You can view Tahshin\'s projects on GitHub at github.com/Nadidmahmu.',
            'behance': 'You can view Tahshin\'s design portfolio on Behance at behance.net/31TAhsin.'
        },
        
        // Hobbies and Interests
        interests: {
            'hobbies': 'Outside of coding and design, Tahshin enjoys exploring new technologies and contributing to open-source projects.',
            'interests': 'Tahshin is particularly interested in AI technologies, voice assistants, and innovative software solutions.',
            'free time': 'In his free time, Tahshin works on personal AI projects and enhances his graphic design portfolio.'
        }
    };

    // Toggle chat window
    chatIcon.addEventListener('click', function() {
        chatWindow.classList.add('active');
        // Add welcome message when chat is opened
        if (chatMessages.children.length === 0) {
            addMessage('Hello! I\'m Tahshin\'s virtual assistant. How can I help you today?');
        }
    });

    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });

    // Function to add messages to the chat with typing animation
    function addMessage(message, isUser = false, includeDownloadButton = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');
        
        const messageText = document.createElement('p');
        
        // For bot messages, simulate typing
        if (!isUser) {
            messageElement.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            chatMessages.appendChild(messageElement);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate typing speed (average 30ms per character)
            const typingSpeed = Math.min(30 * message.length, 2000); // Cap at 2 seconds
            
            setTimeout(() => {
                messageElement.innerHTML = ''; // Remove typing indicator
                messageElement.appendChild(messageText);
                
                let i = 0;
                const typeWriter = () => {
                    if (i < message.length) {
                        messageText.textContent += message.charAt(i);
                        i++;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                        setTimeout(typeWriter, 10); // Character by character typing speed
                    } else {
                        // Add download button after typing is complete
                        if (includeDownloadButton) {
                            const downloadButton = document.createElement('button');
                            downloadButton.classList.add('cv-download-btn');
                            downloadButton.innerHTML = '<i class="fas fa-download"></i> Download CV';
                            messageElement.appendChild(downloadButton);
                            
                            // Add event listener to download button
                            downloadButton.addEventListener('click', function() {
                                downloadCV();
                            });
                        }
                    }
                };
                
                typeWriter();
            }, 500); // Show typing indicator for 500ms
        } else {
            messageText.textContent = message;
            messageElement.appendChild(messageText);
            chatMessages.appendChild(messageElement);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Function to handle CV download
    function downloadCV() {
        // Create an anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = cvFilePath;
        downloadLink.download = 'Tahshin_Mahmud_Nadid_CV.pdf';
        downloadLink.target = '_blank';
        
        // Append to body, click and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Add a confirmation message
        setTimeout(() => {
            addMessage('Your download should begin shortly. If it doesn\'t, please try again or contact me directly at nadidmahmud05@gmail.com');
        }, 1000);
    }

    // Function to get response based on user input
    function getResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        const isCVRequest = input.includes('cv') || input.includes('resume') || input.includes('curriculum') || input.includes('vitae');
        
        // Special handling for CV/resume requests
        if (isCVRequest) {
            return {
                text: 'Here\'s Tahshin\'s CV. Click the download button below to get it.',
                includeDownloadButton: true
            };
        }
        
        // Check all categories in knowledge base
        for (const category in knowledgeBase) {
            const categoryData = knowledgeBase[category];
            
            // Direct matches in the current category
            for (const key in categoryData) {
                if (input === key || input.includes(key)) {
                    return {
                        text: categoryData[key],
                        includeDownloadButton: key === 'cv' || key === 'resume'
                    };
                }
            }
            
            // Check for more complex patterns with partial matches
            if (category === 'personal') {
                if (input.match(/who (are|is) (you|tahshin|nadid)/i) || 
                    input.match(/tell me about (yourself|tahshin)/i)) {
                    return {
                        text: categoryData['who are you'],
                        includeDownloadButton: false
                    };
                }
                
                if (input.match(/what('s| is) your name/i) || input.match(/name/i)) {
                    return {
                        text: categoryData['what is your name'],
                        includeDownloadButton: false
                    };
                }
            }
            
            if (category === 'skills') {
                if (input.match(/skills|can you do|able to do|capable of|expertise/i)) {
                    return {
                        text: categoryData['what skills do you have'],
                        includeDownloadButton: false
                    };
                }
                
                if (input.match(/programming|code|develop|languages/i)) {
                    return {
                        text: categoryData['which programming languages or frameworks do you know'],
                        includeDownloadButton: false
                    };
                }
                
                if (input.match(/design|graphic|creative/i) && !input.match(/what is/i)) {
                    return {
                        text: categoryData['what design or technical skills do you have'],
                        includeDownloadButton: false
                    };
                }
            }
            
            if (category === 'projects') {
                if (input.match(/project|portfolio|work|create|built|develop/i)) {
                    return {
                        text: categoryData['what projects have you worked on'],
                        includeDownloadButton: false
                    };
                }
                
                if (input.match(/jarvis|assistant|ai/i) && !input.match(/what is/i)) {
                    return {
                        text: categoryData['jarvis'],
                        includeDownloadButton: false
                    };
                }
            }
            
            if (category === 'education') {
                if (input.match(/study|graduate|degree|education|university|college|school/i)) {
                    return {
                        text: categoryData['what is your highest academic qualification'],
                        includeDownloadButton: false
                    };
                }
            }
            
            if (category === 'contact') {
                if (input.match(/contact|email|reach|message|touch/i)) {
                    return {
                        text: categoryData['contact'],
                        includeDownloadButton: false
                    };
                }
                
                if (input.match(/hire|work with|employ|job/i)) {
                    return {
                        text: categoryData['hire'],
                        includeDownloadButton: false
                    };
                }
            }
        }
        
        // Default response with suggestion
        return {
            text: "Sorry, I don't have specific information about that. You can ask me about Tahshin's background, skills, projects, education, work experience, or how to contact him.",
            includeDownloadButton: false
        };
    }

    // Send message when button is clicked
    sendMessageBtn.addEventListener('click', sendUserMessage);

    // Send message when Enter key is pressed
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Function to send user message and get response
    function sendUserMessage() {
        const userMessage = userMessageInput.value.trim();
        
        if (userMessage !== '') {
            // Add user message to chat
            addMessage(userMessage, true);
            
            // Clear input field
            userMessageInput.value = '';
            
            // Get and add AI response
            const response = getResponse(userMessage);
            
            // Small delay to simulate thinking
            setTimeout(() => {
                addMessage(response.text, false, response.includeDownloadButton);
            }, 300);
        }
    }

    // Add CSS for the download button
    const style = document.createElement('style');
    style.textContent = `
        .cv-download-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }
        
        .cv-download-btn:hover {
            background-color: #45a049;
        }
        
        .cv-download-btn i {
            margin-right: 5px;
        }
    `;
    document.head.appendChild(style);

    // Add initial welcome message
    if (chatMessages.children.length === 0 && chatWindow.classList.contains('active')) {
        addMessage('Hello! I\'m Tahshin\'s virtual assistant. How can I help you today?');
    }
});