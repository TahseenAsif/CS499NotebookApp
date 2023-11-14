document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signInButton');
    // const signOutButton = document.getElementById('signOutButton');
    const signUpButton = document.getElementById('signUpButton');
    const guestButton = document.getElementById('guestButton');
    const exitApp = document.getElementById('exit');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    signInButton.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        api.login.signInRequest(email, password);
        // ipcRenderer.send('sign-in', email, password);
    });

    // not necessary for sign out to be in login screen
    // signOutButton.addEventListener("click", () => {
    //     api.login.signOutRequest();
    // });

    signUpButton.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        api.login.signUpRequest(email, password);
        //ipcRenderer.send('sign-up', email, password);
    });

    guestButton.addEventListener("click", () => {
        api.login.guestRequest();
        //ipcRenderer.send('sign-up', email, password);
    });

    exitApp.addEventListener("click", () => {
        api.window.exit();
    })

});