let enemies = [];
const permanentPlayers = [
    { name: 'Resviel', id: 'player1Number', img: 'https://garakobama.mvhsrobotics.org/Health/Pictures/Resviel.png' },
    { name: 'Etheriel', id: 'player2Number', img: 'https://garakobama.mvhsrobotics.org/Health/Pictures/Etheriel.png' },
    { name: 'Ukudash', id: 'player3Number', img: 'https://garakobama.mvhsrobotics.org/Health/Pictures/Ukudash.png' },
    { name: 'Garak', id: 'player4Number', img: 'https://garakobama.mvhsrobotics.org/Health/Pictures/Garak.png' },
    { name: 'Miyah', id: 'player5Number', img: 'https://garakobama.mvhsrobotics.org/Health/Pictures/Miyah.png' }
];
let currentPlayerIndex = 0;

function addEnemy() {
    const enemyName = document.getElementById('EnemyName').value;

    if (enemyName && !enemies.some(enemy => enemy.name === enemyName)) {
        const randomNumber = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
        if (randomNumber == 20) {
            enemyName == ' '+' - CRITICAL'
        }
        enemies.push({ name: enemyName, number: randomNumber });
        updateList();
        document.getElementById('EnemyName').value = '';
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
            number: parseInt(document.getElementById(player.id).value) || 0,
            img: player.img
        })),
        ...enemies
    ];
    allPlayers.sort((a, b) => b.number - a.number); // Sort from highest to lowest
    updateList(allPlayers);
}

// Function to toggle between the input area and the player list
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

// Function to toggle the visibility of the entire container
function toggleContainer() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.classList.toggle('hidden');

    console.log('Toggle Container Button Clicked');
    console.log('Container Hidden:', mainContainer.classList.contains('hidden'));
}

function nextPlayer() {
    const playerListItems = document.querySelectorAll('#playerList li');
    if (playerListItems.length === 0) return;

    // Remove the current player indicator and reset the background color
    playerListItems[currentPlayerIndex].classList.remove('current-player');
    playerListItems[currentPlayerIndex].classList.add('default-player');

    // Move to the next player in the list
    currentPlayerIndex = (currentPlayerIndex + 1) % playerListItems.length;

    // Add the current player indicator and change their background color
    playerListItems[currentPlayerIndex].classList.remove('default-player');
    playerListItems[currentPlayerIndex].classList.add('current-player');

    console.log('Next Player:', currentPlayerIndex);
}

// Function to update the player list in the UI
function updateList(players = []) {
    const playerList = document.getElementById('playerList');
    // Clear the current list
    playerList.innerHTML = '';

    // If no players are passed in, use the permanent players and enemies
    if (players.length === 0) {
        players = [
            ...permanentPlayers.map(player => ({
                name: player.name,
                number: parseInt(document.getElementById(player.id).value) || 0,
                img: player.img
            })),
            ...enemies
        ];
        // Sort the players by number from highest to lowest
        players.sort((a, b) => b.number - a.number);
    }

    // Iterate through each player and add them to the list
    players.forEach((player, index) => {
        const li = document.createElement('li');

        // Add the player's image if they are a permanent player
        if (permanentPlayers.some(p => p.name === player.name)) {
            const img = document.createElement('img');
            img.src = player.img;
            img.alt = `${player.name}'s avatar`;
            img.className = 'player-image';
            li.appendChild(img);
        }

        // Add a remove button if the player is an enemy
        if (!permanentPlayers.some(p => p.name === player.name)) {
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = () => removeEnemy(player.name);
            li.appendChild(removeButton);
        }

        // Add the player's name and number
        const span = document.createElement('span');
        span.textContent = `${player.name}: ${player.number}`;
        li.appendChild(span);

        // Apply the appropriate background class
        if (index === currentPlayerIndex) {
            li.classList.add('current-player');
        } else {
            li.classList.add('default-player');
        }

        // Add the list item to the player list
        playerList.appendChild(li);
    });

    console.log('Updated List:', players);
}

// Initialize the list with permanent players and current enemies
updateList();