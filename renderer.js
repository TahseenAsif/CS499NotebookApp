const { ipcRenderer } = require('electron');
        
document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');
    const signUpButton = document.getElementById('signUpButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    signInButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        ipcRenderer.send('sign-in', email, password);
    });
    signOutButton.addEventListener('click', () => {
        ipcRenderer.send('sign-out');
    });
    signUpButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        ipcRenderer.send('sign-up', email, password);
    });
});