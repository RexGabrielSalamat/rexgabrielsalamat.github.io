const trainingCerts = [
    { file: 'assets/certificates/Certificate of Completion - Computer System Servicing.jpg', title: 'Computer System Servicing', org: 'Power Technical Training Center', tags: ['Hardware', 'Networking', 'Computer Logic'] },
    { file: 'assets/certificates/Certificate of Completion - Launchpad Ramp.jpg', title: 'Launchpad Ramp', org: 'Endless Studios', tags: ['Team Collaboration', 'Creativity', 'Game Development'] },
    { file: 'assets/certificates/Data Fundamentals - IBM Skillsbuild.jpg', title: 'Data Fundamentals', org: 'IBM Skillsbuild', tags: ['Data Science', 'DSLC'] },
    { file: 'assets/certificates/Certificate of Attendance - Python Programming with Red Hat.jpg', title: 'Python with Red Hat Academy', org: 'Red Hat Academy', tags: ['Python'] },
    { file: 'assets/certificates/Certificate of Completion - Learning Java 11.jpg', title: 'Learning Java 11', org: 'LinkedIn Learning', tags: ['Java', 'OOP'] },
    { file: 'assets/certificates/Certificate of Completion - Python Essential Training.jpg', title: 'Python Essential Training', org: 'LinkedIn Learning', tags: ['Python'] },
    { file: 'assets/certificates/Certificate of Completion - Python for Students.jpg', title: 'Python for Students', org: 'LinkedIn Learning', tags: ['Python'] },
    { file: 'assets/certificates/Certificate of Completion - Complete Guide to C Programming Foundations.jpg', title: 'C Programming Foundations', org: 'LinkedIn Learning', tags: ['C Programming Language'] },
    { file: 'assets/certificates/Certificate of Completion - IoT Foundations - Fundamentals.jpg', title: 'IoT Foundations', org: 'LinkedIn Learning', tags: ['IoT', 'Hardware'] },
    { file: 'assets/certificates/Certificate of Completion - Programming Foundations - Inside Computing Hardware.jpg', title: 'Inside Computing Hardware', org: 'LinkedIn Learning', tags: ['Hardware', 'Architecture'] },
    { file: 'assets/certificates/Certificate of Completion - Software Design - Developing Effective Requirements.jpg', title: 'Software Design Requirements', org: 'LinkedIn Learning', tags: ['SDLC', 'Design'] },
    { file: 'assets/certificates/Certificate of Completion - Learning GitHub.jpg', title: 'Learning GitHub', org: 'LinkedIn Learning', tags: ['GitHub'] },
    { file: 'assets/certificates/Certificate of Completion - Introduction to Web Design and Development.jpg', title: 'Introduction to Web Design and Development', org: 'LinkedIn Learning', tags: ['Web Development', 'HTML', 'CSS', 'JS'] }
];

const eventCerts = [
    { file: 'assets/certificates/Certificate of Participation - NASA Space Apps Challenge Abu Dhabi.jpg', title: 'NASA Space Apps Challenge', org: 'NASA Space Apps - Abu Dhabi 2025', tags: ['Data Analysis', 'Python', 'HTML'] },
    { file: 'assets/certificates/Certificate of Participation - AURAK Engineering Explorers Spring Camp.jpg', title: 'Engineering Explorers Spring Camp', org: 'American University of Ras Al Khaimah', tags: ['Engineering', 'Computer Science'] },
    { file: 'assets/certificates/Certificate of Attendance - UOWD Summer Camp.jpg', title: 'UOWD Summer Camp', org: 'University of Wollongong Dubai', tags: ['Computer Science', 'Robotics', 'Data Science'] },
    { file: 'assets/certificates/Certificate of Participation - Introduction to the Web Hacking Fundamentals.jpg', title: 'Introduction to the Web Hacking Fundamentals Webinar', org: 'RedTeam Hacker Academy', tags: ['Cybersecurity Basics', 'Ethical Hacking Basics'] }
];

function renderCerts(data, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    data.forEach(c => {
        const card = document.createElement('div');
        card.className = "group bg-white/5 border border-white/10 rounded-2xl hover:border-red-600 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm flex flex-col";
        card.onclick = () => openModal('../' + c.file, c.title, c.org, c.tags);
        
        const tagsHTML = c.tags.map(tag => 
            `<span class="px-2 py-0.5 bg-red-600/10 border border-red-600/20 text-red-500 text-[7px] font-bold rounded uppercase tracking-tighter">${tag}</span>`
        ).join('');

        card.innerHTML = `
            <div class="aspect-video overflow-hidden border-b border-white/5">
                <img src="../${c.file}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onerror="this.src='https://via.placeholder.com/400x225/111/444?text=Image+Not+Found'">
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-white font-bold uppercase text-[10px] tracking-tighter mb-1 leading-tight">${c.title}</h3>
                <p class="text-gray-500 text-[8px] uppercase tracking-widest mb-4">${c.org}</p>
                <div class="mt-auto flex flex-wrap gap-1.5">
                    ${tagsHTML}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Modal logic
const modal = document.getElementById('certModal');
const modalContent = document.getElementById('modalContent');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalOrg = document.getElementById('modalOrg');
const modalTags = document.getElementById('modalTags');

function openModal(imgSrc, title, org, tags) {
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
}

function closeModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
    document.body.style.overflow = 'auto';
}

// Execution
document.addEventListener('DOMContentLoaded', () => {
    renderCerts(trainingCerts, 'trainingGrid');
    renderCerts(eventCerts, 'eventGrid');
});

window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });