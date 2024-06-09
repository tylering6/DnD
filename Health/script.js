        const playersHealth = {
        /*  Resviel  */  1: { current: 47, max: 47 },
        /*  Etheriel */  2: { current: 45, max: 45 },  
        /*  Ukudash  */  3: { current: 52, max: 52 },  
        /*  Garak    */  4: { current: 57, max: 57 },  
        /*  Miyah    */  5: { current: 45, max: 45 }   
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
                document.getElementById('custom-amount-1').value = '';
                document.getElementById('custom-amount-2').value = '';
                document.getElementById('custom-amount-3').value = '';
                document.getElementById('custom-amount-4').value = '';
                document.getElementById('custom-amount-5').value = '';
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
