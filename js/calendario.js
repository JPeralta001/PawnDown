// Sample events data - Chess tournaments and matches
var events = [
    {
        id: 1,
        title: "Torneo Apertura Grand Prix",
        date: new Date(2026, 2, 14), // March 14, 2026
        time: "10:00 AM - 6:00 PM",
        description: "Torneo de apertura del Grand Prix 2026. Categorías: Sub-12, Sub-16, Absoluto. Sistema suizo a 7 rondas.",
        location: "Centro Cultural Riviera, Ensenada"
    },
    {
        id: 2,
        title: "Simultánea con Maestro FIDE",
        date: new Date(2026, 2, 21), // March 21, 2026
        time: "4:00 PM - 8:00 PM",
        description: "Partidas simultáneas con el Maestro FIDE invitado. Cupo limitado a 30 participantes.",
        location: "Club de Ajedrez Ensenada"
    },
    {
        id: 3,
        title: "Torneo Relámpago",
        date: new Date(2026, 2, 28), // March 28, 2026
        time: "5:00 PM - 9:00 PM",
        description: "Torneo blitz con ritmo de 3+2. Premios en efectivo para los primeros 5 lugares.",
        location: "Plaza Cívica de Ensenada"
    },
    {
        id: 4,
        title: "Clínica de Aperturas",
        date: new Date(2026, 3, 4), // April 4, 2026
        time: "10:00 AM - 2:00 PM",
        description: "Taller teórico-práctico sobre aperturas modernas. Impartido por el GM Carlos Ramírez.",
        location: "Universidad Autónoma de Baja California"
    },
    {
        id: 5,
        title: "Segunda Ronda Grand Prix",
        date: new Date(2026, 3, 11), // April 11, 2026
        time: "9:00 AM - 7:00 PM",
        description: "Segunda fecha del circuito Grand Prix 2026. Puntos acumulables para el ranking regional.",
        location: "Centro Cultural Riviera, Ensenada"
    },
    {
        id: 6,
        title: "Torneo Infantil de Primavera",
        date: new Date(2026, 3, 18), // April 18, 2026
        time: "10:00 AM - 3:00 PM",
        description: "Torneo especial para categorías Sub-8 y Sub-10. Medallas y reconocimientos para todos.",
        location: "Parque Revolución, Ensenada"
    },
    {
        id: 7,
        title: "Match de Exhibición",
        date: new Date(2026, 3, 25), // April 25, 2026
        time: "6:00 PM - 9:00 PM",
        description: "Encuentro de exhibición entre los dos mejores jugadores de la región.",
        location: "Teatro de la Ciudad"
    },
    {
        id: 8,
        title: "Tercera Ronda Grand Prix",
        date: new Date(2026, 4, 9), // May 9, 2026
        time: "9:00 AM - 7:00 PM",
        description: "Tercera fecha del circuito Grand Prix 2026. Categoría absoluta y por edades.",
        location: "Centro Cultural Riviera, Ensenada"
    },
    {
        id: 9,
        title: "Seminario de Finales",
        date: new Date(2026, 4, 16), // May 16, 2026
        time: "11:00 AM - 4:00 PM",
        description: "Seminario especializado en finales de torre y peón. Nivel intermedio-avanzado.",
        location: "Biblioteca Pública Central"
    },
    {
        id: 10,
        title: "Final Grand Prix 2026",
        date: new Date(2026, 5, 20), // June 20, 2026
        time: "9:00 AM - 8:00 PM",
        description: "Gran final del circuito Grand Prix. Los 32 mejores clasificados compiten por el título.",
        location: "Centro de Convenciones Ensenada"
    }
];


// State
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
// DOM Elements
var calendarGrid = document.getElementById('calendarGrid');
var currentMonthElement = document.getElementById('currentMonth');
var prevMonthBtn = document.getElementById('prevMonth');
var nextMonthBtn = document.getElementById('nextMonth');
var eventsList = document.getElementById('eventsList');
var modal = document.getElementById('eventModal');
var modalTitle = document.getElementById('modalTitle');
var modalBody = document.getElementById('modalBody');
var closeModalBtn = document.getElementById('closeModal');
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
// Month names in Spanish
var monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// Helper functions
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}
function getEventsForDate(date) {
    return events.filter(function (event) { return isSameDay(event.date, date); });
}
function formatDate(date) {
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    return "".concat(day, " de ").concat(month, ", ").concat(year);
}
// Render calendar
function renderCalendar() {
    var daysInMonth = getDaysInMonth(currentYear, currentMonth);
    var firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    var daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
    // Update header
    currentMonthElement.textContent = "".concat(monthNames[currentMonth], " ").concat(currentYear);
    // Clear grid
    calendarGrid.innerHTML = '';
    // Previous month days
    for (var i = firstDay - 1; i >= 0; i--) {
        var dayElement = createDayElement(daysInPrevMonth - i, true, currentYear, currentMonth - 1);
        calendarGrid.appendChild(dayElement);
    }
    // Current month days
    var today = new Date();
    for (var day = 1; day <= daysInMonth; day++) {
        var date = new Date(currentYear, currentMonth, day);
        var isToday = isSameDay(date, today);
        var dayEvents = getEventsForDate(date);
        var dayElement = createDayElement(day, false, currentYear, currentMonth, isToday, dayEvents);
        calendarGrid.appendChild(dayElement);
    }
    // Next month days
    var totalCells = calendarGrid.children.length;
    var remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (var day = 1; day <= remainingCells; day++) {
        var dayElement = createDayElement(day, true, currentYear, currentMonth + 1);
        calendarGrid.appendChild(dayElement);
    }
}
function createDayElement(day, isOtherMonth, _year, _month, isToday, dayEvents) {
    if (isToday === void 0) { isToday = false; }
    if (dayEvents === void 0) { dayEvents = []; }
    var dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    if (isToday) {
        dayElement.classList.add('today');
    }
    if (dayEvents.length > 0) {
        dayElement.classList.add('has-event');
    }
    // Day number
    var dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day.toString();
    dayElement.appendChild(dayNumber);
    // Event preview (only for current month)
    if (!isOtherMonth && dayEvents.length > 0) {
        var eventPreview = document.createElement('div');
        eventPreview.className = 'event-preview';
        eventPreview.textContent = dayEvents[0].title;
        dayElement.appendChild(eventPreview);
        // Event indicator dots
        var indicator = document.createElement('div');
        indicator.className = 'event-indicator';
        for (var i = 0; i < Math.min(dayEvents.length, 3); i++) {
            var dot = document.createElement('span');
            dot.className = 'event-dot';
            indicator.appendChild(dot);
        }
        dayElement.appendChild(indicator);
        // Click handler
        dayElement.addEventListener('click', function () {
            showEventModal(dayEvents[0]);
        });
    }
    return dayElement;
}
// Render upcoming events
function renderUpcomingEvents() {
    var today = new Date();
    var upcomingEvents = events
        .filter(function (event) { return event.date >= today; })
        .sort(function (a, b) { return a.date.getTime() - b.date.getTime(); })
        .slice(0, 5);
    eventsList.innerHTML = '';
    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<div class="no-events">No hay encuentros próximos programados.</div>';
        return;
    }
    for (var _i = 0, upcomingEvents_1 = upcomingEvents; _i < upcomingEvents_1.length; _i++) {
        var event_1 = upcomingEvents_1[_i];
        var eventCard = createEventCard(event_1);
        eventsList.appendChild(eventCard);
    }
}
function createEventCard(event) {
    var card = document.createElement('div');
    card.className = 'event-card';
    var day = event.date.getDate();
    var monthShort = monthNames[event.date.getMonth()].substring(0, 3);
    card.innerHTML = "\n        <div class=\"event-date\">\n            <span class=\"event-date-day\">".concat(day, "</span>\n            <span class=\"event-date-month\">").concat(monthShort, "</span>\n        </div>\n        <div class=\"event-info\">\n            <h3 class=\"event-name\">").concat(event.title, "</h3>\n            <p class=\"event-description\">").concat(event.description.substring(0, 80), "...</p>\n            <div class=\"event-time\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline></svg>\n                ").concat(event.time, "\n            </div>\n        </div>\n    ");
    card.addEventListener('click', function () {
        showEventModal(event);
    });
    return card;
}
// Modal functions
function showEventModal(event) {
    modalTitle.textContent = event.title;
    modalBody.innerHTML = "\n        <div class=\"modal-event-date\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line></svg>\n            <span>".concat(formatDate(event.date), "</span>\n        </div>\n        <div class=\"modal-event-time\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline></svg>\n            <span>").concat(event.time, "</span>\n        </div>\n        <div class=\"modal-event-location\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg>\n            <span>").concat(event.location, "</span>\n        </div>\n        <p class=\"modal-event-description\">").concat(event.description, "</p>\n    ");
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function hideEventModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
// Navigation functions
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}
// Mobile navigation toggle
function toggleNav() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}
// Event listeners
prevMonthBtn.addEventListener('click', previousMonth);
nextMonthBtn.addEventListener('click', nextMonth);
closeModalBtn.addEventListener('click', hideEventModal);
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        hideEventModal();
    }
});
navToggle.addEventListener('click', toggleNav);
// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        hideEventModal();
    }
    if (e.key === 'ArrowLeft') {
        previousMonth();
    }
    if (e.key === 'ArrowRight') {
        nextMonth();
    }
});
// Initialize
renderCalendar();
renderUpcomingEvents();
