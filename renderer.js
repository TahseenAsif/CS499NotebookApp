const { ipcRenderer } = require('electron');
        
document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');
    signInButton.addEventListener('click', () => {
        ipcRenderer.send('sign-in');
    });
    signOutButton.addEventListener('click', () => {
        ipcRenderer.send('sign-out');
    });
});