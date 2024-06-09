document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
});

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
});

// Optionally, handle form submissions
document.querySelector('#loginForm form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Mock backend validation
    if (username === 'user' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'dashboard.html';  // Redirect to dashboard
    } else {
        document.getElementById('loginErrorMessage').textContent = 'Invalid username or password.';
    }
});

document.querySelector('#signupForm form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Clear previous error messages
    const errorMessage = document.getElementById('signupErrorMessage');
    errorMessage.textContent = '';

    // Basic validation
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    // Mock backend registration
    alert('Registration successful! Please log in.');
    window.location.href = 'index.html';  // Redirect to login page (for this example, it's the same page)
});
