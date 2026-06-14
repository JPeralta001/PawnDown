
    // Tournament participants data
    const participants = [
      { id: 1, name: "Jose Peralta", club: "Club PawnDown", elo: 2150, points: 8.5, games:5.0},
      { id: 2, name: "Isai Alvarez", club: "Club PawnDown", elo: 2080, points: 8.0, games:5.0},
      /*{ id: 3, name: "Juan Dominguez", club: "Club Ensenada", elo: 1850, points: 7.5, games:5.0},
      { id: 4, name: "Roberto Sanchez", club: "Club Tijuana", elo: 1920, points: 7.0, games:5.0},
      { id: 5, name: "Fernando Lopez", club: "Club Ensenada", elo: 1780, points: 6.5, games:5.0},
      { id: 6, name: "Alejandro Hernandez", club: "Club Rosarito", elo: 1850, points: 6.0, games:5.0},
      { id: 7, name: "Diego Garcia", club: "Club Mexicali", elo: 1720, points: 5.5, games:5.0},
      { id: 8, name: "Pedro Ramirez", club: "Club Ensenada", elo: 1680, points: 5.5, games:5.0},
      { id: 9, name: "Luis Torres", club: "Club Tijuana", elo: 1750, points: 5.0, games:5.0},
      { id: 10, name: "Jorge Mendoza", club: "Club Rosarito", elo: 1690, points: 5.0, games:5.0},
      { id: 11, name: "Ricardo Flores", club: "Club Ensenada", elo: 1620, points: 4.5, games:5.0},
      { id: 12, name: "Oscar Vargas", club: "Club Mexicali", elo: 1580, points: 4.5, games:5.0},
      { id: 13, name: "Manuel Castro", club: "Club Tijuana", elo: 1650, points: 4.0, games:5.0},
      { id: 14, name: "Alberto Reyes", club: "Club Ensenada", elo: 1540, points: 4.0, games:5.0},
      { id: 15, name: "Sergio Morales", club: "Club Rosarito", elo: 1600, points: 3.5, games:5.0},
      { id: 16, name: "Andres Jimenez", club: "Club Mexicali", elo: 1520, points: 3.5, games:5.0},
      { id: 17, name: "Pablo Ruiz", club: "Club Ensenada", elo: 1480, points: 3.0, games:5.0},
      { id: 18, name: "Eduardo Diaz", club: "Club Tijuana", elo: 1450, points: 3.0, games:5.0},
      { id: 19, name: "Gabriel Ortiz", club: "Club Rosarito", elo: 1420, points: 10.5, games:5.0},
      { id: 20, name: "Raul Gutierrez", club: "Club Mexicali", elo: 1380, points: 2.0, games:5.0},
      { id: 21, name: "Victor Navarro", club: "Club Ensenada", elo: 1350, points: 2.0, games:5.0},
      { id: 22, name: "Hugo Espinoza", club: "Club Tijuana", elo: 1320, points: 15.5, games:5.0},
      { id: 23, name: "Martin Aguilar", club: "Club Rosarito", elo: 1280, points: 1.0, games:5.0},
      { id: 24, name: "Ivan Salazar", club: "Club Mexicali", elo: 1250, points: 0.5, games:5.0}*/
    ];

    // Initialize table
    let currentFilter = 'all';
    
    // Ordenar por elo descendente
    const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
    renderTable(sortedParticipants);

    // Mobile menu toggle
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }

    // Get initials from name
    function getInitials(name) {
      return name.split(' ').map(n => n[0]).slice(0, 2).join('');
    }

    // Get position class
    function getPositionClass(pos) {
      if (pos === 1) return 'gold';
      if (pos === 2) return 'silver';
      if (pos === 3) return 'bronze';
      return 'normal';
    }

    // Render table
    function renderTable(data) {
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';
      
      data.forEach((player, index) => {
        const pos = index + 1;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <span class="position ${getPositionClass(pos)}">${pos}</span>
          </td>
          <td>
            <div class="player-info">
              <div class="player-avatar">${getInitials(player.name)}</div>
              <div>
                <div class="player-name">${player.name}</div>
                <div class="player-club">${player.club}</div>
              </div>
            </div>
          </td>
          <td><span class="elo-badge">${player.elo}</span></td>
          <td><strong>${player.points}</strong></td>
          <td class="stats-cell">${player.games}</td>
        `;
        row.style.animation = `slideIn 0.3s ease forwards`;
        row.style.animationDelay = `${index * 0.03}s`;
        row.style.opacity = '0';
        tbody.appendChild(row);
      });
    }

function filterTable(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let filteredData;
  const sorted = [...participants].sort((a, b) => b.points - a.points);

  switch(filter) {
    case 'top10':
      filteredData = sorted.slice(0, 10);
      break;
    case 'top20':
      filteredData = sorted.slice(0, 20);
      break;
    default:
      filteredData = sorted;
  }

  renderTable(filteredData);
}


    // Search player
    function searchPlayer() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
      const resultCard = document.getElementById('resultCard');
      
      if (!searchTerm) {
        resultCard.classList.remove('show');
        return;
      }
      
      const player = participants.find(p => 
        p.name.toLowerCase().includes(searchTerm)
      );
      
      if (player) {
        const position = participants.indexOf(player) + 1;
        
        document.getElementById('resultAvatar').textContent = getInitials(player.name);
        document.getElementById('resultName').textContent = player.name;
        document.getElementById('resultClub').textContent = player.club;
        document.getElementById('resultPosition').textContent = `#${position}`;
        document.getElementById('resultElo').textContent = player.elo;
        document.getElementById('resultPoints').textContent = player.points;
        document.getElementById('resultGames').textContent = player.games;
        
        resultCard.classList.remove('not-found');
        resultCard.classList.add('show');
      } else {
        document.getElementById('resultAvatar').textContent = '?';
        document.getElementById('resultName').textContent = 'Jugador no encontrado';
        document.getElementById('resultClub').textContent = 'Intenta con otro nombre';
        document.getElementById('resultPosition').textContent = '-';
        document.getElementById('resultElo').textContent = '-';
        document.getElementById('resultPoints').textContent = '-';
        document.getElementById('resultGames').textContent = '-';
        
        resultCard.classList.add('not-found', 'show');
      }
    }

    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPlayer();
      }
    });

    // Live search suggestions (optional enhancement)
    document.getElementById('searchInput').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      if (searchTerm.length >= 2) {
        searchPlayer();
      } else {
        document.getElementById('resultCard').classList.remove('show');
      }
    });