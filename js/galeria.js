// Gallery images data - Using Unsplash chess-related images
var galleryImages = [
    {
        id: 1,
        src: "images/torneo1results.jpeg",
        title: "Torneo Apertura Grand Prix Blunders Festival",
        description: "Resultados del primer torneo",
        category: "torneos",
        date: "20 de junio, 2026"
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
