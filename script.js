// DOM Elements
const savePrefsBtn = document.getElementById('savePrefs');
const resetPrefsBtn = document.getElementById('resetPrefs');
const animateBtn = document.getElementById('animateBtn');
const animationBox = document.getElementById('animationBox');
const usernameInput = document.getElementById('username');
const themeSelect = document.getElementById('theme');
const welcomeMessage = document.getElementById('welcomeMessage');

// Load saved preferences when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
    
    // Show welcome message if username exists
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        showWelcomeMessage(savedUsername);
    }
});

// Save preferences to localStorage
savePrefsBtn.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    const theme = themeSelect.value;
    
    if (username) {
        localStorage.setItem('username', username);
        localStorage.setItem('theme', theme);
        
        // Apply theme immediately
        applyTheme(theme);
        
        // Show welcome message
        showWelcomeMessage(username);
        
        // Animate the save button
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 1000);
    } else {
        alert('Please enter your name before saving preferences.');
    }
});

// Reset preferences
resetPrefsBtn.addEventListener('click', function() {
    localStorage.clear();
    usernameInput.value = '';
    themeSelect.value = 'light';
    applyTheme('light');
    welcomeMessage.classList.remove('show');
    
    // Animate the reset button
    this.classList.add('bounce');
    setTimeout(() => {
        this.classList.remove('bounce');
    }, 1000);
});

// Trigger box animation
animateBtn.addEventListener('click', function() {
    // Toggle between two different animations
    if (animationBox.classList.contains('slide-rotate')) {
        animationBox.classList.remove('slide-rotate');
        animationBox.classList.add('bounce');
    } else {
        animationBox.classList.remove('bounce');
        animationBox.classList.add('slide-rotate');
    }
    
    // Reset animation after it completes
    setTimeout(() => {
        animationBox.classList.remove('slide-rotate', 'bounce');
    }, 2000);
});

// Load saved preferences
function loadPreferences() {
    const savedUsername = localStorage.getItem('username');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
    
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}

// Apply selected theme
function applyTheme(theme) {
    // Remove all theme classes first
    document.body.classList.remove('light', 'dark', 'blue', 'green');
    
    // Add the selected theme class
    document.body.classList.add(theme);
}

// Show welcome message
function showWelcomeMessage(username) {
    welcomeMessage.textContent = `Welcome back, ${username}! Your preferences have been loaded.`;
    welcomeMessage.classList.add('show');
    
    // Hide welcome message after 5 seconds
    setTimeout(() => {
        welcomeMessage.classList.remove('show');
    }, 5000);
}