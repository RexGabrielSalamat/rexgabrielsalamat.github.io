document.addEventListener("DOMContentLoaded", () => {

    // --- INTRO WAVE & FALL OFF ANIMATION ---
    const overlay = document.getElementById('intro-overlay');
    const introBrand = document.getElementById('intro-brand');

    if (overlay && introBrand) {
        document.body.style.overflow = 'hidden';

        // Wait 1.8s for the text to wave nicely, then fall off
        setTimeout(() => {
            // 1. Trigger gravity fall & rotate on the brand element
            introBrand.classList.add('fall-off');

            // 2. Fade out black background quickly as it drops
            overlay.classList.add('bg-transparent');

            // 3. Remove overlay from view once fallen off screen
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 700);

        }, 1800); 
    }

    // --- SOLID BRAND BADGE SLOT MACHINE ---
    const reel = document.getElementById("slot-reel");
    const container = document.getElementById("slot-container");

    if (reel && container) {
        const totalItems = reel.children.length;
        let currentIndex = 0;

        function updateSlot(index) {
            const currentChild = reel.children[index];
            const itemHeight = currentChild.offsetHeight;

            // 1. Shift vertical text reel
            reel.style.transform = `translateY(-${index * itemHeight}px)`;

            // 2. Smoothly resize pill width to wrap text snugly
            container.style.width = `${currentChild.offsetWidth + 24}px`;

            // 3. Reset base container styling
            container.className = "inline-flex h-8 sm:h-9 overflow-hidden align-middle rounded-md sm:rounded-lg shadow-lg transition-all duration-500 ease-in-out px-3";

            // 4. Swap in solid background color & ambient glow
            const bgClass = currentChild.getAttribute("data-bg") || "bg-white";
            const shadowClass = currentChild.getAttribute("data-shadow") || "shadow-white/20";
            container.classList.add(bgClass, shadowClass);
        }

        // Initialize state for the first item
        updateSlot(0);

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateSlot(currentIndex);
        }, 2000);
    }

    // --- AOS INITIALIZATION ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    // --- MOBILE MENU NAVIGATION ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when tapping any internal anchor link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- FORM HANDLING ---
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("submit-btn");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            button.innerText = "SENDING...";
            button.disabled = true;

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerText = "MESSAGE SENT SUCCESSFULLY!";
                    status.classList.remove("text-red-500", "hidden");
                    status.classList.add("text-green-500");
                    form.reset();
                    button.innerText = "SEND";
                    button.style.display = "none";
                } else {
                    throw new Error();
                }
            } catch (error) {
                status.innerText = "OOPS! THERE WAS A PROBLEM.";
                status.classList.remove("text-green-500", "hidden");
                status.classList.add("text-red-500");
                button.innerText = "SEND";
                button.disabled = false;
            }
        });
    }
});

// --- MODAL LOGIC (Global Scope) ---

window.openModal = function(imgSrc, title, org, tags) {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('modalContent');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalOrg = document.getElementById('modalOrg');
    const modalTags = document.getElementById('modalTags');

    if (!modal || !modalImg) return;

    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalOrg.innerText = org;
    modalTags.innerHTML = '';
    
    tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = "px-3 py-1 bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-bold rounded-full uppercase tracking-tighter";
        span.innerText = tag;
        modalTags.appendChild(span);
    });

    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modalContent) return;

    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => { 
        if (modal) modal.classList.add('hidden'); 
    }, 300);
    
    document.body.style.overflow = 'auto';
};

window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});

// --- CHATBOT LOGIC (Global Scope) ---

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!chatWindow) return;

    chatWindow.classList.toggle('hidden');
    if (chatIcon) chatIcon.classList.toggle('hidden');
    if (closeIcon) closeIcon.classList.toggle('hidden');
}

function sendQuickMessage(text) {
    const inputField = document.getElementById('chat-input');
    if (inputField) {
        inputField.value = text;
        handleChatSubmit(new Event('submit'));
    }
}

function getBotResponse(input) {
    const query = input.toLowerCase().replace(/[^\w\s]/gi, '');
    const matchesWord = (word) => new RegExp(`\\b${word}\\b`, 'i').test(query);

    // 1. Web Development & Frontend/Backend
    if (query.includes('web') || query.includes('frontend') || query.includes('backend') || query.includes('html') || query.includes('css') || query.includes('site') || query.includes('website')) {
        return "Yes! Rex works on **web development** using modern HTML, CSS, JavaScript, and framework tools. You can see his web stack tagged across his projects! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"projects\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>View Web Projects →</a>";
    }

    // 2. Machine Learning & AI / Data Science
    if (query.includes('machine learning') || matchesWord('ml') || matchesWord('ai') || query.includes('data science') || query.includes('artificial intelligence')) {
        return "Yes! Rex is currently focusing on **Machine Learning** and Data Science in Python. You can check out his data certificates and project tags! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"certificates\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>View Certifications →</a>";
    }

    // 3. General Skills & Tech Stack
    if (query.includes('skill') || query.includes('language') || query.includes('tech') || query.includes('stack') || query.includes('code') || query.includes('coding') || query.includes('program') || query.includes('java') || query.includes('python') || query.includes('database')) {
        return "Rex actively codes in **Java, Python, C, C++, OCaml, and HTML/CSS**. His skills are tagged throughout his portfolio sections! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"projects\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>Explore Projects →</a>";
    } 

    // 4. Projects & Apps
    if (query.includes('project') || query.includes('work') || query.includes('built') || query.includes('app') || query.includes('make') || query.includes('create')) {
        return "Rex built a **Library Catalogue Management System** (Java/XML) and participated in NASA Space Apps with a **Meteor Impact Simulator** (Python/JS)! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"projects\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>View Projects Section →</a>";
    } 

    // 5. Certificates & Awards
    if (query.includes('cert') || query.includes('award') || query.includes('qualification') || query.includes('achievement') || query.includes('license')) {
        return "Rex holds industry certifications including **IBM SkillsBuild Data Fundamentals**, **Red Hat Academy Python**, **My Stirling Award Bronze**, and **One Million Prompters**! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"certificates\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>View Certificates Section →</a>";
    }

    // 6. Experience, Education & Leadership
    if (query.includes('experience') || query.includes('role') || query.includes('rep') || query.includes('leadership') || query.includes('university') || query.includes('stirling') || query.includes('education') || query.includes('school')) {
        return "Rex is a Software Engineering student and served as an **Academic Module Representative** at University of Stirling RAK, bridging communication between faculty and students across multiple technical courses. <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"experience\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>View Experience Section →</a>";
    } 

    // 7. Contact, Socials & Hire
    if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach') || query.includes('linkedin') || query.includes('github') || query.includes('message') || query.includes('whatsapp') || query.includes('instagram')) {
        return "You can reach Rex directly via LinkedIn, GitHub, WhatsApp, Instagram, or through the contact form! <br><br><a href='javascript:void(0)' onclick='navigateToSection(\"contact\")' class='inline-block mt-1 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-lg text-red-300 font-bold hover:bg-red-600 hover:text-white transition'>Go to Contact Section →</a>";
    } 

    // 8. Gratitude / Salamat Pun
    if (query.includes('thank') || query.includes('thanks') || query.includes('thx') || query.includes('salamat')) {
        return "You're very welcome! *(Fun fact: 'Salamat' literally means 'Thank you'—so gratitude is built right into the family name!)* Let me know if you need anything else!";
    }

    // 9. Greetings
    if (matchesWord('hi') || matchesWord('hello') || matchesWord('hey') || matchesWord('greetings')) {
        return "Hello there! How can I help you explore Rex's portfolio today?";
    }

    // Default Fallback
    return "I'm still learning! Try asking about Rex's **projects**, **certificates**, **experience**, or how to **contact** him.";
}

function handleChatSubmit(event) {
    event.preventDefault();
    const inputField = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    if (!inputField || !messagesContainer) return;

    const userText = inputField.value.trim();
    if (!userText) return;

    // Append User Message
    messagesContainer.innerHTML += `
        <div class="bg-red-600/20 border border-red-600/30 p-2.5 rounded-xl rounded-tr-none max-w-[85%] ml-auto text-white">
            ${userText}
        </div>
    `;

    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate Bot Response Delay
    setTimeout(() => {
        const botReply = getBotResponse(userText);
        messagesContainer.innerHTML += `
            <div class="bg-white/5 border border-white/10 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-gray-200">
                ${botReply}
            </div>
        `;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 400);
}

function navigateToSection(sectionId) {
    // 1. Close or minimize the chat window
    toggleChat();

    // 2. Check if the section element exists on the current page
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
        // If we are on index.html where the section exists, smooth scroll to it
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        // If we are on a subpage (e.g., library.html), navigate back to index.html with the anchor hash
        window.location.href = `index.html#${sectionId}`;
    }
}

