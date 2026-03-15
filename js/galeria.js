// Gallery images data - Using Unsplash chess-related images
var galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
        title: "Torneo Apertura 2025",
        description: "Partida final del torneo de apertura en el Centro Cultural Riviera.",
        category: "torneos",
        date: "15 de Enero, 2025"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=800&q=80",
        title: "Concentración Total",
        description: "Momento de máxima concentración durante la ronda decisiva.",
        category: "torneos",
        date: "15 de Enero, 2025"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80",
        title: "Simultánea con GM",
        description: "El Gran Maestro invitado enfrentando a 25 jugadores locales.",
        category: "simultaneas",
        date: "28 de Febrero, 2025"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&q=80",
        title: "Premiación Categoría Absoluta",
        description: "Entrega de trofeos a los ganadores del Grand Prix 2024.",
        category: "premiaciones",
        date: "20 de Diciembre, 2024"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=800&q=80",
        title: "Taller de Finales",
        description: "Sesión práctica sobre finales de torre y peón.",
        category: "talleres",
        date: "10 de Marzo, 2025"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1538221566857-f20704e5a9e5?w=800&q=80",
        title: "Ronda de Blitz",
        description: "Torneo relámpago con ritmo de 3+2 minutos.",
        category: "torneos",
        date: "5 de Abril, 2025"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80",
        title: "Estrategia en Acción",
        description: "Análisis de posición durante partida clásica.",
        category: "torneos",
        date: "12 de Febrero, 2025"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=80",
        title: "Premiación Juvenil",
        description: "Reconocimiento a los mejores jugadores Sub-16.",
        category: "premiaciones",
        date: "18 de Noviembre, 2024"
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?w=800&q=80",
        title: "Clínica de Aperturas",
        description: "Taller teórico sobre aperturas sicilianas.",
        category: "talleres",
        date: "22 de Enero, 2025"
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&q=80",
        title: "Simultánea Infantil",
        description: "Evento especial para categorías Sub-10 y Sub-12.",
        category: "simultaneas",
        date: "14 de Marzo, 2025"
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1559480079-d1be3ad8e33e?w=800&q=80",
        title: "Final Emocionante",
        description: "Último movimiento de la partida decisiva.",
        category: "torneos",
        date: "8 de Mayo, 2025"
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
        title: "Campeones del Grand Prix",
        description: "Los tres primeros lugares del circuito 2024.",
        category: "premiaciones",
        date: "20 de Diciembre, 2024"
    },
    {
        id: 13,
        src: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&q=80",
        title: "Pensamiento Profundo",
        description: "Momento de reflexión antes del movimiento decisivo.",
        category: "torneos",
        date: "3 de Junio, 2025"
    },
    {
        id: 14,
        src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
        title: "Taller de Táctica",
        description: "Ejercicios de combinaciones y sacrificios.",
        category: "talleres",
        date: "29 de Abril, 2025"
    },
    {
        id: 15,
        src: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80",
        title: "Exhibición de Maestros",
        description: "Partida de exhibición entre maestros FIDE.",
        category: "simultaneas",
        date: "17 de Julio, 2025"
    },
    {
        id: 16,
        src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
        title: "Torneo de Verano",
        description: "Segunda edición del torneo estival en Ensenada.",
        category: "torneos",
        date: "25 de Agosto, 2025"
    }
];
// State
var currentFilter = 'all';
var displayedImages = 8;
var currentLightboxIndex = 0;
var filteredImages = [];
// DOM Elements
var galleryGrid = document.getElementById('galleryGrid');
var loadMoreBtn = document.getElementById('loadMoreBtn');
var lightbox = document.getElementById('lightbox');
var lightboxImage = document.getElementById('lightboxImage');
var lightboxTitle = document.getElementById('lightboxTitle');
var lightboxDescription = document.getElementById('lightboxDescription');
var lightboxDate = document.getElementById('lightboxDate');
var lightboxClose = document.getElementById('lightboxClose');
var lightboxPrev = document.getElementById('lightboxPrev');
var lightboxNext = document.getElementById('lightboxNext');
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
var filterButtons = document.querySelectorAll('.filter-btn');
// Category translations
var categoryNames = {
    'torneos': 'Torneos',
    'simultaneas': 'Simultáneas',
    'premiaciones': 'Premiaciones',
    'talleres': 'Talleres'
};

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// Render gallery
function renderGallery() {
    // Filter images based on current filter
    filteredImages = currentFilter === 'all'
        ? galleryImages
        : galleryImages.filter(function (img) { return img.category === currentFilter; });
    // Get images to display
    var imagesToShow = filteredImages.slice(0, displayedImages);
    // Clear and render
    galleryGrid.innerHTML = '';
    for (var _i = 0, imagesToShow_1 = imagesToShow; _i < imagesToShow_1.length; _i++) {
        var image = imagesToShow_1[_i];
        var item = createGalleryItem(image);
        galleryGrid.appendChild(item);
    }
    // Update load more button
    if (displayedImages >= filteredImages.length) {
        loadMoreBtn.style.display = 'none';
    }
    else {
        loadMoreBtn.style.display = 'flex';
    }
}
function createGalleryItem(image) {
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = image.id.toString();
    item.innerHTML = "\n        <img src=\"".concat(image.src, "\" alt=\"").concat(image.title, "\" class=\"gallery-image\" loading=\"lazy\">\n        <div class=\"gallery-overlay\">\n            <div class=\"gallery-info\">\n                <h3 class=\"gallery-title\">").concat(image.title, "</h3>\n                <span class=\"gallery-category\">").concat(categoryNames[image.category], "</span>\n            </div>\n        </div>\n        <div class=\"gallery-zoom\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line></svg>\n        </div>\n    ");
    item.addEventListener('click', function () {
        openLightbox(image);
    });
    return item;
}
// Filter functionality
function handleFilter(filter) {
    currentFilter = filter;
    displayedImages = 8;
    // Update active button
    for (var _i = 0, filterButtons_2 = filterButtons; _i < filterButtons_2.length; _i++) {
        var btn = filterButtons_2[_i];
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    }
    renderGallery();
}
// Load more functionality
function loadMore() {
    displayedImages += 4;
    renderGallery();
}
// Lightbox functions
function openLightbox(image) {
    currentLightboxIndex = filteredImages.findIndex(function (img) { return img.id === image.id; });
    updateLightboxContent(image);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
function updateLightboxContent(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxDate.textContent = image.date;
}
function showPrevImage() {
    currentLightboxIndex = currentLightboxIndex > 0
        ? currentLightboxIndex - 1
        : filteredImages.length - 1;
    updateLightboxContent(filteredImages[currentLightboxIndex]);
}
function showNextImage() {
    currentLightboxIndex = currentLightboxIndex < filteredImages.length - 1
        ? currentLightboxIndex + 1
        : 0;
    updateLightboxContent(filteredImages[currentLightboxIndex]);
}
// Mobile navigation toggle
function toggleNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}
var _loop_1 = function (btn) {
    btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        handleFilter(filter);
    });
};
// Event listeners
for (var _i = 0, filterButtons_1 = filterButtons; _i < filterButtons_1.length; _i++) {
    var btn = filterButtons_1[_i];
    _loop_1(btn);
}
loadMoreBtn.addEventListener('click', loadMore);
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);
navToggle.addEventListener('click', toggleNav);
lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active'))
        return;
    if (e.key === 'Escape') {
        closeLightbox();
    }
    else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
    else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});
// Touch swipe support for lightbox
var touchStartX = 0;
var touchEndX = 0;
lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });
function handleSwipe() {
    var swipeThreshold = 50;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        }
        else {
            showPrevImage();
        }
    }
}
// Initialize
renderGallery();
