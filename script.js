const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const button = document.getElementById("submit-btn");

async function handleSubmit(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    button.innerText = "SENDING...";
    button.disabled = true;

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.classList.remove("hidden");
            form.reset();
            button.innerText = "SEND";
            button.style.display = "none";
        } else {
            status.innerText = "OOPS! THERE WAS A PROBLEM.";
            status.classList.remove("text-green-500");
            status.classList.add("text-red-500");
            status.classList.remove("hidden");
        }
    }).catch(error => {
        status.innerText = "ERROR SENDING MESSAGE.";
        status.classList.remove("hidden");
    });
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}

// --- MODAL LOGIC FOR CERTIFICATES ---
const modal = document.getElementById('certModal');
const modalContent = document.getElementById('modalContent');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalOrg = document.getElementById('modalOrg');
const modalTags = document.getElementById('modalTags');

window.openModal = function(imgSrc, title, org, tags) {
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

window.closeModal = function() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
    document.body.style.overflow = 'auto';
}

window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});