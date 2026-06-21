
    function normalizeText(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
    
    // Tournament participants data
    const participants = [
      {"id":1,"name":"José Peralta","usuario":"Kyoumaa001","club":"PawnDown","titulo":"","elo":1607,"points":19,"games":5},
      {"id":2,"name":"Isai Alvarez","usuario":"MilkInDaShoe","club":"PawnDown","titulo":"","elo":2001,"points":31,"games":5},
      {"id":3,"name":"Carlos Jose Marin Diaz","usuario":"petoneitor","club":"Hipocampos","titulo":"","elo":1441,"points":50,"games":5},
      {"id":4,"name":"Jussep Iñaki Marquez Pineda","usuario":"Jussep_MP","club":"Hipocampos","titulo":"","elo":879,"points":2,"games":4},
      {"id":5,"name":"Alejandro Eliseo Almanza Velasco","usuario":"elcapibara127","club":"Hipocampos","elo":1148,"points":4,"games":4},
      {"id":6,"name":"Giovanni Olmedo De Hoyos","usuario":"GiovanniODH","club":"PawnDown","elo":1698,"points":34,"games":4},
      {"id":7,"name":"Alejandro Ceceña Oropeza","usuario":"Geantenu","club":"BajaChess","elo":1937,"points":25,"games":5},
      {"id":8,"name":"Gael Abrajan","usuario":"GaelAbrajan","club":"PawnDown","titulo_fake":"Pequeño Cesar","elo":1380,"points":16,"games":5},
      {"id":9,"name":"Jeshua Omar Rivera López","usuario":"HijoDeHombre23","club":"Peón pasado","titulo":"","elo":2193,"points":2,"games":3},
      {"id":10,"name":"Santiago Valencia Soto","usuario":"SantiagoNomagnus","club":"Sec. 18","titulo":"","elo":1582,"points":22,"games":5},
      {"id":11,"name":"Israel Alejandro Ramos rojo","usuario":"Rojo1998","club":"PawnDown","titulo":"","elo":1375,"points":0,"games":0},
      {"id":12,"name":"Jeremy Matias Paniagua Gomez","usuario":"JEMAT1810","club":"PawnDown","titulo":"","elo":1569,"points":28,"games":5},
      {"id":13,"name":"Ricardo Geovanny Velázquez Mendoza","usuario":"GeovasVM","club":"","titulo":"","elo":266,"points":10,"games":1},
      {"id":14,"name":"Maicol Alexis Paniagua Gomez","usuario":"Maicolpgg","club":"PawnDown","titulo":"","elo":1316,"points":2,"games":3},
      {"id":15,"name":"Miguel Mayoral Nevárez","usuario":"culdesac7","club":"PawnDown","titulo":"","elo":1894,"points":40,"games":4},
      {"id":16,"name":"Fernando Cabrera","usuario":"Dudiyack","club":"PawnDown","titulo":"","elo":2013,"points":7,"games":5},
      {"id":17,"name":"Alvaro Casco","usuario":"Alvareiruz","club":"E2E4","titulo":"","elo":2024,"points":37,"games":5},
      {"id":18,"name":"Aldair Gonzalez","usuario":"Aldair161103","club":"PawnDown","titulo":"","elo":2008,"points":13,"games":4}
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
            <div class="player-details">
              <div class="player-name-row">
                ${player.titulo ? `<span class="player-title">${player.titulo}</span>` : ''}
                ${player.titulo_fake ? `<span class="player-title_fake">${player.titulo_fake}</span>` : ''}
                <span class="player-name">${player.name}</span>
              </div>
              <div class="player-club">${player.club}</div>
              <div class="player-username">@${player.usuario}</div>
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
  const sortedParticipants = [...participants].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;   // 1. Puntos
    //if (b.games !== a.games) 
    return b.games - a.games;       // 2. Partidas
    //return b.elo - a.elo;                                    // 3. Elo
  });
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
        normalizeText(p.name).includes(normalizeText(searchTerm))
      );

      
      if (player) {
        const position = participants.indexOf(player) + 1;
        
        document.getElementById('resultAvatar').textContent = getInitials(player.name);
        document.getElementById('resultName').innerHTML = player.titulo
        ? `<span class="player-title-search">${player.titulo}</span> ${player.name}`: player.name;

        document.getElementById('resultName').innerHTML = player.titulo_fake
        ? `<span class="player-title_fake_search">${player.titulo_fake}</span> ${player.name}`: player.name;

        document.getElementById('resultClub').textContent = player.club;
        document.getElementById('resultUser').textContent = "@" + player.usuario;
        document.getElementById('resultPosition').textContent = `#${position}`;
        document.getElementById('resultElo').textContent = player.elo;
        document.getElementById('resultPoints').textContent = player.points;
        document.getElementById('resultGames').textContent = player.games;
        
        resultCard.classList.remove('not-found');
        resultCard.classList.add('show');
      } else {
        document.getElementById('resultAvatar').textContent = '?';
        document.getElementById('resultName').textContent = 'Jugador no encontrado';
        document.getElementById('resultUser').textContent = '-'; 
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