let enemies = [];
const permanentPlayers = [
    { name: 'Resviel', id: 'player1Number' },
    { name: 'Etheriel', id: 'player2Number' },
    { name: 'Ukudash', id: 'player3Number' },
    { name: 'Garak', id: 'player4Number' },
    { name: 'Miyah', id: 'player5Number' }
];

function addEnemy() {
    const enemyName = document.getElementById('enemyInput').value;
    const enemyNumber = document.getElementById('enemyNumber').value;
    if (enemyName && enemyNumber && !enemies.some(enemy => enemy.name === enemyName)) {
        enemies.push({ name: enemyName, number: parseInt(enemyNumber) });
        updateList();
        document.getElementById('enemyInput').value = '';
        document.getElementById('enemyNumber').value = '';
    }
}

function removeEnemy(name) {
    enemies = enemies.filter(enemy => enemy.name !== name);
    updateList();
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
        
        if (!player.name.startsWith('Player ')) {
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
}

// Initialize list with permanent players
updateList();