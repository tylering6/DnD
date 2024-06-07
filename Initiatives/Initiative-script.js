let enemies = [];
const permanentPlayers = [
    { name: 'Resviel', id: 'player1Number' },
    { name: 'Etheriel', id: 'player2Number' },
    { name: 'Ukudash', id: 'player3Number' },
    { name: 'Garak', id: 'player4Number' },
    { name: 'Miyah', id: 'player5Number' }
];
let currentPlayerIndex = 0;

function addEnemy() {
    const enemyName = document.getElementById('EnemyName').value;
    const enemyNumber = document.getElementById('EnemyRoll').value;
    if (enemyName && enemyNumber && !enemies.some(enemy => enemy.name === enemyName)) {
        enemies.push({ name: enemyName, number: parseInt(enemyNumber) });
        updateList();
        document.getElementById('EnemyName').value = '';
        document.getElementById('EnemyRoll').value = '';
        console.log('Added Enemy:', enemies);
    } else {
        console.warn('Enemy already exists or invalid input');
    }
}

function removeEnemy(name) {
    enemies = enemies.filter(enemy => enemy.name !== name);
    updateList();
    console.log('Removed Enemy:', enemies);
}

function sortList() {
    const allPlayers = [
        ...permanentPlayers.map(player => ({
            name: player.name,
            number: parseInt(document.getElementById(player.id).value) || 0
        })),
        ...enemies
    ];
    allPlayers.sort((a, b) => b.number - a.number); // Sort from highest to lowest
    updateList(allPlayers);
}

function toggleList() {
    const inputArea = document.getElementById('inputArea');
    const playerList = document.getElementById('playerList');
    inputArea.classList.toggle('hidden');
    playerList.classList.toggle('hidden');

    console.log('Toggle List Button Clicked');
    console.log('Input Area Hidden:', inputArea.classList.contains('hidden'));
    console.log('Player List Hidden:', playerList.classList.contains('hidden'));
}

function nextPlayer() {
    const playerListItems = document.querySelectorAll('#playerList li');
    if (playerListItems.length === 0) return;

    // Remove current player indicator
    playerListItems[currentPlayerIndex].classList.remove('current-player');

    // Move to the next player
    currentPlayerIndex = (currentPlayerIndex + 1) % playerListItems.length;

    // Add current player indicator
    playerListItems[currentPlayerIndex].classList.add('current-player');

    console.log('Next Player:', currentPlayerIndex);
}

function updateList(players = []) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    if (players.length === 0) {
        players = [
            ...permanentPlayers.map(player => ({
                name: player.name,
                number: parseInt(document.getElementById(player.id).value) || 0
            })),
            ...enemies
        ];
        players.sort((a, b) => b.number - a.number); // Sort from highest to lowest
    }

    players.forEach(player => {
        const li = document.createElement('li');
        
        if (!permanentPlayers.some(p => p.name === player.name)) {
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = () => removeEnemy(player.name);
            li.appendChild(removeButton);
        }

        const span = document.createElement('span');
        span.textContent = `${player.name}: ${player.number}`;
        li.appendChild(span);
        
        playerList.appendChild(li);
    });

    console.log('Updated List:', players);

    // Reset the current player index if it goes out of range
    currentPlayerIndex = Math.min(currentPlayerIndex, players.length - 1);
    // Highlight the current player
    const playerListItems = document.querySelectorAll('#playerList li');
    if (playerListItems.length > 0) {
        playerListItems[currentPlayerIndex].classList.add('current-player');
    }
}

// Initialize list with permanent players and current enemies
updateList();