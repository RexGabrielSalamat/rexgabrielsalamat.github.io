document.addEventListener("DOMContentLoaded", () => {
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
                    status.classList.remove("hidden");
                    form.reset();
                    button.innerText = "SEND";
                    button.style.display = "none";
                } else {
                    throw new Error();
                }
            } catch (error) {
                status.innerText = "OOPS! THERE WAS A PROBLEM.";
                status.classList.add("text-red-500");
                status.classList.remove("hidden");
                button.innerText = "SEND";
                button.disabled = false;
            }
        });
    }
});

// --- MODAL LOGIC (Global Functions) ---

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
    // Tiny delay to trigger the transition animation
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { 
        modal.classList.add('hidden'); 
    }, 300);
    document.body.style.overflow = 'auto';
}

window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});