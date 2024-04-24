document.addEventListener('DOMContentLoaded', function() {
    // Function to create and return a card element for foods, quotes, or songs
    function createCard(itemData, category) {
        const card = document.createElement('div');
        card.classList.add(`${category.toLowerCase()}-card`);
        
        let cardContent = `
            <h3>${itemData.title}</h3>
            <p>${itemData.description}</p>
        `;
        
        if (category === 'Foods') {
            cardContent += `<img src="${itemData.imageUrl}" alt="Food image" style="width: 100px; height: auto;">`;
        }

        if (itemData.rank) {
            cardContent += `<p>Rank: ${itemData.rank}</p>`;
        }

        card.innerHTML = cardContent;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            card.remove();
        };

        card.appendChild(deleteButton);
        return card;
    }

    // Function to update main content based on the selected category
    function displayCategory(category) {
        const mainContent = document.getElementById('mainContent');
        let formId = `${category.toLowerCase()}Form`;
        let containerId = `${category.toLowerCase()}Container`;

        mainContent.innerHTML = `
            <h1>Favorite ${category}</h1>
            <form id="${formId}">
                <input type="text" id="title" placeholder="${category} Title" required>
                <input type="text" id="description" placeholder="${category} Description" required>
                ${category === 'Foods' ? '<input type="text" id="imageUrl" placeholder="Image URL" required>' : ''}
                ${category === 'Foods' ? '<input type="number" id="rank" placeholder="Rank" required>' : ''}
                <button type="submit">Submit</button>
            </form>
            <div id="${containerId}"></div>
        `;

        // Attach event listener to the new form
        document.getElementById(formId).addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value.trim();
            const description = document.getElementById('description').value.trim();
            let imageUrl = '';
            let rank = 0;

            if (category === 'Foods') {
                imageUrl = document.getElementById('imageUrl').value.trim();
                rank = parseInt(document.getElementById('rank').value, 10);
                if (!title || !description || !imageUrl || isNaN(rank)) {
                    alert('Please fill all fields correctly and ensure the rank is a number.');
                    return;
                }
            } else {
                if (!title || !description) {
                    alert('Please fill all fields correctly.');
                    return;
                }
            }

            const itemData = { title, description, imageUrl, rank };
            const card = createCard(itemData, category);
            
            // For foods, insert cards based on rank
            if (category === 'Foods') {
                const container = document.getElementById(containerId);
                let inserted = false;
                Array.from(container.children).forEach(child => {
                    const childRank = parseInt(child.querySelector('p').textContent.replace('Rank: ', ''), 10);
                    if (rank < childRank) {
                        container.insertBefore(card, child);
                        inserted = true;
                    }
                });
                if (!inserted) {
                    container.appendChild(card);
                }
            } else {
                // For quotes and songs, just append the card
                document.getElementById(containerId).appendChild(card);
            }
        });
    }

    // Sidebar click event listeners
    document.getElementById('favoriteSongsSection').addEventListener('click', function() {
        displayCategory('Songs');
    });

    document.getElementById('favoriteQuotesSection').addEventListener('click', function() {
        displayCategory('Quotes');
    });

    document.getElementById('favoriteFoodsSection').addEventListener('click', function() {
        displayCategory('Foods');
    });

    // Initialize with the default category view
    displayCategory('Foods');
});
