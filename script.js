        const playersHealth = {
            1: { current: 41, max: 41 },
            2: { current: 52, max: 52 },
            3: { current: 47, max: 47 },
            4: { current: 57, max: 57 },
            5: { current: 45, max: 45 }
        };

        function updateHealthDisplay(playerId) {
                console.log(`Updating health display for player ${playerId}`);
                const healthElement = document.getElementById(`health-number-${playerId}`);
                if (healthElement) {
                    const player = playersHealth[playerId];
                    healthElement.textContent = `Health: ${player.current}/${player.max}`;
                } else {
                    console.error(`Element with ID health-number-${playerId} not found.`);
                }
            }

        function adjustHealth(playerId, amount) {
            console.log(`Adjusting health for player ${playerId} by ${amount}`);
            const player = playersHealth[playerId];
            player.current = Math.max(0, Math.min(player.max, player.current + amount));
            updateHealthDisplay(playerId);
        }

        function applyCustomHealthAdjustment(playerId, multiplier) {
            console.log(`Applying custom health adjustment for player ${playerId} with multiplier ${multiplier}`);
            const customAmountInput = document.getElementById(`custom-amount-${playerId}`);
            const customAmount = parseInt(customAmountInput.value, 10);
            if (!isNaN(customAmount)) {
                adjustHealth(playerId, multiplier * customAmount);
            } else {
                console.error(`Invalid custom amount entered for player ${playerId}`);
            }
        }

        // Expose functions to global scope for button onclick handlers
        window.adjustHealth = adjustHealth;
        window.applyCustomHealthAdjustment = applyCustomHealthAdjustment;

        document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            const toggleCheckbox = document.getElementById('mode-toggle');
        
            // Check for saved user preference in localStorage
            const savedMode = localStorage.getItem('mode');
            if (savedMode) {
                body.classList.remove('light-mode', 'dark-mode');
                body.classList.add(savedMode);
                toggleCheckbox.checked = savedMode === 'dark-mode';
            }
        
            toggleCheckbox.addEventListener('change', () => {
                if (toggleCheckbox.checked) {
                    body.classList.remove('light-mode');
                    body.classList.add('dark-mode');
                    localStorage.setItem('mode', 'dark-mode');
                } else {
                    body.classList.remove('dark-mode');
                    body.classList.add('light-mode');
                    localStorage.setItem('mode', 'light-mode');
                }
            });
        });