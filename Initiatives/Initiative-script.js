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
}

// Initialize list with permanent players
updateList();

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleCheckbox = document.getElementById('mode-toggle');

    // Function to set the mode based on the saved preference or system preference
    const setMode = (mode) => {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(mode);
        toggleCheckbox.checked = mode === 'dark-mode';
        localStorage.setItem('mode', mode);
    };

    // Check for saved user preference in localStorage
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        setMode(savedMode);
    } else {
        // If no saved preference, use system preference
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setMode(prefersDarkScheme ? 'dark-mode' : 'light-mode');
    }

    toggleCheckbox.addEventListener('change', () => {
        const newMode = toggleCheckbox.checked ? 'dark-mode' : 'light-mode';
        setMode(newMode);
    });
});
