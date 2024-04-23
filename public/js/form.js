document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('foodForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const foodName = document.getElementById('foodName').value;
        const description = document.getElementById('description').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const rank = document.getElementById('rank').value;

        if (!foodName || !description || !imageUrl || isNaN(rank)) {
            alert('Please fill all fields correctly!');
            return;
        }

        const card = document.createElement('div');
        card.innerHTML = `
            <h3>${foodName}</h3>
            <p>${description}</p>
            <img src="${imageUrl}" alt="Food image" style="width: 100px; height: auto;">
            <p>Rank: ${rank}</p>
            <button onclick="removeCard(this)">Delete</button>
        `;
        const container = document.getElementById('cardsContainer');
        // Inserting cards according to rank might require additional logic to sort or place correctly.
        container.appendChild(card);
    });
});

function removeCard(button) {
    const card = button.parentNode;
    card.parentNode.removeChild(card);
}
