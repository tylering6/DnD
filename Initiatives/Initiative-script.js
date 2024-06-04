let players = [];
let enemies = [];

function addEnemy() {
    const playerInput = document.getElementById('playerInput').value;
    if (playerInput && !players.includes(playerInput)) {
        players.push(playerInput);
        updateList();
        document.getElementById('playerInput').value = '';
    }
}

function removePlayer() {
    const playerInput = document.getElementById('playerInput').value;
    const index = players.indexOf(playerInput);
    if (index !== -1) {
        players.splice(index, 1);
        updateList();
        document.getElementById('playerInput').value = '';
    }
}

function sortList() {
    players.sort();
    enemies.sort((a, b) => a.custom.localeCompare(b.custom));
    updateList();
}

function toggleList() {
    const playerList = document.getElementById('playerList');
    playerList.classList.toggle('hidden');
}

function updateList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `Player: ${player}`;
        playerList.appendChild(li);
    });

    enemies.forEach(enemy => {
        const li = document.createElement('li');
        li.textContent = `Enemy: ${enemy.custom} (Original: ${enemy.original})`;
        playerList.appendChild(li);
    });
}
