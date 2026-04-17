// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/95', 'py-2');
            navbar.classList.remove('bg-surface-dim/80', 'py-4');
        } else {
            navbar.classList.add('bg-surface-dim/80', 'py-4');
            navbar.classList.remove('bg-black/95', 'py-2');
        }
    }
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});

// --- Dynamic Menu Data ---
const menuItems = [
    {
        id: 1,
        title: "La Gran Ceiba Burger",
        desc: "200g de carne de res madurada, queso llanero fundido, cebollas al ron y tocineta crocante.",
        price: "$34.900",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
        category: "Hamburguesas",
        favorite: true
    },
    {
        id: 2,
        title: "Perro Callejero Gourmet",
        desc: "Salchicha alemana artesanal, lluvia de tocineta crocante y nuestra salsa secreta de frutos del bosque.",
        price: "$24.900",
        image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=600",
        category: "Hamburguesas",
        favorite: false
    },
    {
        id: 3,
        title: "Picada Llanera Familiar",
        desc: "Selección de cortes a la parrilla: lomo, chorizo santarrosano, morcilla, arepa llanera, criollas y chimichurri.",
        price: "$82.000",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
        category: "Para Compartir",
        favorite: true
    },
    {
        id: 4,
        title: "Chicharrón Glaseado al Barril",
        desc: "Cortes de panceta cocinados a fuego lento, con piel crocante y glaseado agridulce de guayaba.",
        price: "$32.000",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
        category: "Para Compartir",
        favorite: false
    },
    {
        id: 5,
        title: "Mojito de Frutos Rojos",
        desc: "Ron reserva, hierbabuena fresca, hielo frappé y frutos rojos de la temporada.",
        price: "$25.000",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
        category: "Bebidas",
        favorite: false
    },
    {
        id: 6,
        title: "Cerveza Artesanal Ceiba",
        desc: "Cerveza rubia de la casa, refrescante con notas cítricas, ideal para el calor del llano.",
        price: "$15.000",
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600",
        category: "Bebidas",
        favorite: false
    }
];

// --- Menu Rendering Logic ---
const menuContainer = document.getElementById('dynamic-menu');
const filtersContainer = document.getElementById('menu-filters');

function renderMenu(category = 'Todo') {
    if (!menuContainer) return;
    
    // Animate exit
    menuContainer.style.opacity = '0';
    
    setTimeout(() => {
        menuContainer.innerHTML = '';
        const filteredItems = category === 'Todo' ? menuItems : menuItems.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            // Favorito badge
            const badge = item.favorite ? `<div class="absolute top-4 left-4 bg-primary-container text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">Recomendado</div>` : '';
            
            // Item Card HTML
            const card = document.createElement('div');
            card.className = "bg-surface-container rounded-xl overflow-hidden flex flex-col md:flex-row group border border-outline-variant/30 hover:border-primary-container/50 transition-colors duration-500 shadow-lg md:col-span-6 lg:col-span-12";
            
            card.innerHTML = `
                <div class="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-black">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100">
                    ${badge}
                </div>
                <div class="md:w-7/12 p-8 flex flex-col justify-center bg-gradient-to-r from-surface-container to-surface-dim">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-primary-container material-symbols-outlined text-sm">restaurant</span>
                        <span class="text-xs uppercase text-primary-container tracking-widest font-label">${item.category}</span>
                    </div>
                    <h4 class="font-headline text-3xl font-bold text-white mb-3 group-hover:text-primary-container transition-colors">${item.title}</h4>
                    <p class="font-body text-on-surface-variant font-light mb-6">${item.desc}</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="font-headline font-bold text-3xl text-primary-container">${item.price}</span>
                        <button class="w-10 h-10 rounded-full border border-primary-container text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-colors">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(card);
        });
        
        // Animate entrance
        menuContainer.style.opacity = '1';
    }, 300); // match transition duration
}

function renderFilters() {
    if (!filtersContainer) return;
    
    // Get unique categories
    const categories = ['Todo', ...new Set(menuItems.map(item => item.category))];
    
    categories.forEach((cat, index) => {
        const btn = document.createElement('button');
        // Initial styling - mark 'Todo' as active
        const activeClasses = "bg-primary-container text-black border-transparent shadow-[0_0_15px_rgba(245,197,24,0.3)]";
        const inactiveClasses = "bg-transparent text-white border-outline-variant hover:border-primary-container";
        
        btn.className = `filter-btn px-6 py-2 border rounded-full font-label font-bold transition-all duration-300 ${index === 0 ? activeClasses : inactiveClasses}`;
        btn.innerText = cat;
        
        btn.addEventListener('click', () => {
            // Update active state on buttons
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.className = `filter-btn px-6 py-2 border rounded-full font-label font-bold transition-all duration-300 ${inactiveClasses}`;
            });
            btn.className = `filter-btn px-6 py-2 border rounded-full font-label font-bold transition-all duration-300 ${activeClasses}`;
            
            // Render menu
            renderMenu(cat);
        });
        
        filtersContainer.appendChild(btn);
    });
}

// Initialize Menu
if (menuContainer) {
    menuContainer.style.transition = 'opacity 0.3s ease';
    renderFilters();
    renderMenu();
}


// --- Lightbox / Image Modal Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

window.openLightbox = function(element) {
    if (!lightbox || !lightboxImg) return;
    
    // Find the image inside the clicked element
    const imgEl = element.querySelector('img');
    if (imgEl) {
        lightboxImg.src = imgEl.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }
}

window.closeLightbox = function() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore scrolling
}

// Prevent click on image from closing lightbox
if (lightboxImg) {
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());
}


// --- WhatsApp Form Submit ---
const resForm = document.getElementById('resForm');
if (resForm) {
    resForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const n = document.getElementById('rName').value;
        const d = document.getElementById('rDate').value;
        const g = document.getElementById('rGuests').value;
        const p = document.getElementById('rPhone') ? document.getElementById('rPhone').value : '';
        
        const msg = `Hola La Gran Ceiba! Quiero reservar una mesa.\n\nNombre: ${n}\nFecha: ${d}\nPersonas: ${g}\nTeléfono: ${p}`;
        
        const waUrl = `https://wa.me/573213650060?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    });
}
