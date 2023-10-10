window.addEventListener('DOMContentLoaded', (event) => {
    //-------- window bar variables
    //sets the functionality of the buttons shown on the title bar of the window
    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const exit = document.getElementById("exit");
    // ---------------------------------------------------------

    minimize.addEventListener("click", () => {
        api.child_window.minimize();
    });

    maximize.addEventListener("click", () => {
        api.child_window.maximize();
    });

    exit.addEventListener("click", () => {
        api.child_window.exit();
    });
});