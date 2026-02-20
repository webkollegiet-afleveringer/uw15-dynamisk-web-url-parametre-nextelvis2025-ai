
async function loadDestinations() {
    try {
        const response = await fetch('destinations.json');
        const data = await response.json();
        
        const container = document.getElementById('destinationsContainer');
        container.innerHTML = '';
        
        data.destinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="../img/${destination.image}" alt="${destination.destination}">
                    <span class="heart" data-id="${destination.id}">♥</span>
                </div>
                <div class="card-content">
                    <h3>${destination.destination}</h3>
                    <p class="card-title">${destination.title}</p>
                    <p class="card-subtitle">${destination.subtitle}</p>
                </div>
            `;
            
            const heart = card.querySelector('.heart');
            heart.classList.toggle('favorite', isFavorite(destination.id));
            
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(destination.id);
                heart.classList.toggle('favorite', isFavorite(destination.id));
            });
            
            card.addEventListener('click', () => {
                window.location.href = `destination.html?id=${destination.id}`;
            });
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Fejl ved hentning af destinationer:', error);
    }
}

function loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(id) {
    const favorites = loadFavorites();
    return favorites.includes(id);
}

function toggleFavorite(id) {
    let favorites = loadFavorites();
    if (favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites(favorites);
}


document.addEventListener('DOMContentLoaded', loadDestinations);
