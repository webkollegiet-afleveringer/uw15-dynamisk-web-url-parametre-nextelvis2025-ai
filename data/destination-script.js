function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}


async function loadDestinationDetails() {
    const id = getIdFromUrl();
    
    if (!id) {
        document.getElementById('destinationContainer').innerHTML = '<p>Ingen destination blev valgt.</p>';
        return;
    }
    
    try {
        
        const response = await fetch(`${id}.json`);
        
        if (!response.ok) {
            throw new Error(`Destination med id ${id} blev ikke fundet`);
        }
        
        const destination = await response.json();
        
        const container = document.getElementById('destinationContainer');
        
        container.innerHTML = `
            <div class="detail-image">
                <img src="../img/${destination.image}" alt="${destination.destination}">
            </div>
            <div class="detail-content">
                <h2>${destination.destination}</h2>
                <h3 class="detail-title">${destination.title}</h3>
                <p class="detail-subtitle">${destination.subtitle}</p>
                
                <div class="detail-text">
                    <h4>Beskrivelse:</h4>
                    <p>${destination.text}</p>
                </div>
                
                <div class="facilities">
                    <h4>Faciliteter:</h4>
                    <ul>
                        ${destination.facilities.map(facility => `<li>${facility}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Fejl ved hentning af destination:', error);
        document.getElementById('destinationContainer').innerHTML = `<p>Der skete en fejl ved indlæsning af destinationen.</p>`;
    }
}


document.addEventListener('DOMContentLoaded', loadDestinationDetails);
