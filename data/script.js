
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
                </div>
                <div class="card-content">
                    <h3>${destination.destination}</h3>
                    <p class="card-title">${destination.title}</p>
                    <p class="card-subtitle">${destination.subtitle}</p>
                </div>
            `;
            
            
            card.addEventListener('click', () => {
                window.location.href = `destination.html?id=${destination.id}`;
            });
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Fejl ved hentning af destinationer:', error);
    }
}


document.addEventListener('DOMContentLoaded', loadDestinations);
