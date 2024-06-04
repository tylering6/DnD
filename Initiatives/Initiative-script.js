let enemies = [];
const permanentPlayers = [
    { name: 'Player 1', id: 'player1Number' },
    { name: 'Player 2', id: 'player2Number' },
    { name: 'Player 3', id: 'player3Number' },
    { name: 'Player 4', id: 'player4Number' },
    { name: 'Player 5', id: 'player5Number' }
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

function sortList() {
    const allPlayers = [...permanentPlayers.map(player => ({
        name: player.name,
        number: parseInt(document.getElementById(player.id).value) || 0
    })), ...enemies];
    allPlayers.sort((a, b) => a.number - b.number);
    updateList(allPlayers);
}

function toggleList() {
    const playerList = document.getElementById('playerList');
    playerList.classList.toggle('hidden');
}

function updateList(players = []) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.number}`;
        playerList.appendChild(li);
    });
}

updateList(permanentPlayers.map(player => ({ name: player.name, number: 0 })));
