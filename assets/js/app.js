// CONFIGURACIÓN INICIAL
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar animaciones de scroll (AOS)
    AOS.init({
        once: true, // La animación solo pasa una vez al bajar
        offset: 100, // Empieza la animación 100px antes de que el elemento entre
        duration: 800, // Duración en ms
        easing: 'ease-out-cubic', // Tipo de transición suave
    });

    renderSpaces(spacesDB);
    setupScrollEffect();
    setupNewsletter();
});

// DATOS (Mismo catálogo, ya que funcionaba bien)
const spacesDB = [
    {
        id: 101,
        title: "Local Esquina Premium Soho",
        type: "Local",
        location: "Palermo Soho, BA",
        size: "120 m²",
        price: 150000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Alto Tránsito", "Vidriera Doble", "Wi-Fi"]
    },
    {
        id: 102,
        title: "Showroom Industrial Loft",
        type: "Showroom",
        location: "Villa Crespo, BA",
        size: "85 m²",
        price: 80000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Luz Natural", "Seguridad 24hs", "Montacargas"]
    },
    {
        id: 103,
        title: "Oficina Privada Creativa",
        type: "Oficina",
        location: "Colegiales, BA",
        size: "40 m²",
        price: 45000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Amoblado", "Sala Reuniones", "Café"]
    },
    {
        id: 104,
        title: "Galería de Arte Pop-Up",
        type: "Local",
        location: "San Telmo, BA",
        size: "200 m²",
        price: 120000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Iluminación Riel", "Pisos Madera", "Histórico"]
    },
    {
        id: 105,
        title: "Corner en Shopping",
        type: "Showroom",
        location: "Abasto, BA",
        size: "15 m²",
        price: 60000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Seguridad", "Aire Acond.", "Alto Flujo"]
    },
    {
        id: 106,
        title: "Depósito Logístico Urbano",
        type: "Depósito",
        location: "Chacarita, BA",
        size: "300 m²",
        price: 90000,
        currency: "ARS",
        period: "día",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Acceso Camión", "Techo Alto", "Trifásica"]
    }
];

let cart = [];

// RENDERIZADO
function renderSpaces(data) {
    const grid = document.getElementById('spaces-grid');
    grid.innerHTML = '';
    
    // Añadimos un pequeño delay incremental para efecto cascada en las tarjetas
    data.forEach((space, index) => {
        const card = document.createElement('div');
        // Agregamos clases de AOS dinámicamente
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100); // 100ms, 200ms, 300ms...

        card.className = "group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col";
        const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: space.currency, maximumSignificantDigits: 3 }).format(space.price);

        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${space.image}" alt="${space.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm text-gray-800">
                    ${space.type}
                </div>
                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p class="text-white font-bold flex items-center gap-2">
                        <i class="fa-solid fa-location-dot text-brand-primary"></i> ${space.location}
                    </p>
                </div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-lg font-bold text-gray-800 leading-tight mb-2">${space.title}</h3>
                    <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-ruler-combined"></i> ${space.size}</span>
                        <span class="flex items-center gap-1"><i class="fa-regular fa-user"></i> Cap. Variable</span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${space.tags.map(tag => `<span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="flex items-center justify-between border-t pt-4">
                    <div>
                        <span class="text-xl font-bold text-gray-900">${formattedPrice}</span>
                        <span class="text-xs text-gray-400">/${space.period}</span>
                    </div>
                    <button onclick="addToCart(${space.id})" class="border border-brand-dark text-brand-dark px-4 py-2 rounded text-sm font-bold hover:bg-brand-dark hover:text-white transition">
                        Reservar
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// LOGICA CARRITO (Igual que antes)
function addToCart(id) {
    const space = spacesDB.find(s => s.id === id);
    if (!cart.some(item => item.id === id)) {
        cart.push(space);
        updateCartUI();
        toggleCart();
    } else {
        alert("Este espacio ya está en tu selección.");
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-count-summary').innerText = cart.length;
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center mt-20 text-gray-400 flex flex-col items-center">
                <i class="fa-regular fa-folder-open text-4xl mb-4"></i>
                <p>No has seleccionado ningún espacio aún.</p>
            </div>`;
        return;
    }

    cart.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = "flex gap-4 p-3 bg-gray-50 rounded border border-gray-100 relative group animate-fade-in"; // animate-fade-in es clase de tailwind o custom
        el.innerHTML = `
            <img src="${item.image}" class="w-16 h-16 object-cover rounded">
            <div class="flex-grow">
                <h4 class="font-bold text-sm text-gray-800">${item.title}</h4>
                <p class="text-xs text-gray-500 mb-1">${item.location}</p>
                <p class="font-bold text-brand-primary text-sm">$${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        container.appendChild(el);
    });
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('modal-content');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => content.classList.remove('translate-x-full'), 10);
    } else {
        content.classList.add('translate-x-full');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

function filterSpaces() {
    const type = document.getElementById('type-filter').value;
    const filtered = type === 'all' ? spacesDB : spacesDB.filter(s => s.type === type);
    renderSpaces(filtered);
}

// LOGICA NAVBAR
function setupScrollEffect() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-md', 'py-2');
            navbar.classList.add('py-4');
        }
    });
}

// LÓGICA NEWSLETTER (Simulación)
function setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // Simular llamada al servidor
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Suscribiendo...';
        btn.classList.add('opacity-75');
        
        setTimeout(() => {
            alert(`¡Gracias! Hemos enviado un correo de confirmación a ${email}`);
            document.getElementById('newsletter-email').value = '';
            btn.innerText = '¡Suscrito!';
            btn.classList.remove('bg-brand-primary');
            btn.classList.add('bg-green-600');
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.add('bg-brand-primary');
                btn.classList.remove('bg-green-600', 'opacity-75');
            }, 3000);
        }, 1500);
    });
}