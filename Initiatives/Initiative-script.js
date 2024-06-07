let enemies = [];
const permanentPlayers = [
    { name: 'Resviel', id: 'player1Number' },
    { name: 'Etheriel', id: 'player2Number' },
    { name: 'Ukudash', id: 'player3Number' },
    { name: 'Garak', id: 'player4Number' },
    { name: 'Miyah', id: 'player5Number' }
];

function addEnemy() {
    const enemyName = document.getElementById('EnemyName').value;
    const enemyNumber = document.getElementById('EnemyRoll').value;
    if (enemyName && enemyNumber && !enemies.some(enemy => enemy.name === enemyName)) {
        enemies.push({ name: enemyName, number: parseInt(enemyNumber) });
        updateList(); // Call updateList to reflect the changes in the list
        document.getElementById('EnemyName').value = '';
        document.getElementById('EnemyRoll').value = '';
        console.log('Added Enemy:', enemies); // Debugging log
    } else {
        console.warn('Enemy already exists or invalid input');
    }
}

function removeEnemy(name) {
    enemies = enemies.filter(enemy => enemy.name !== name);
    updateList();
    console.log('Removed Enemy:', enemies); // Debugging log
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

    // Debugging logs to check toggle functionality
    console.log('Toggle List Button Clicked');
    console.log('Input Area Hidden:', inputArea.classList.contains('hidden'));
    console.log('Player List Hidden:', playerList.classList.contains('hidden'));
}

function updateList(players = []) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = ''; // Clear the current list

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

    console.log('Updated List:', players); // Debugging log
}

// Initialize list with permanent players and current enemies
updateList();