//sets the functionality of the buttons shown on the title bar of the window
const minimize = document.getElementById("minimize");
const maximize = document.getElementById("maximize");
const exit = document.getElementById("exit");

minimize.addEventListener("click", minimizeApp);
maximize.addEventListener("click", maximizeApp);
exit.addEventListener("click", exitApp);

function minimizeApp(){
    api.window.minimize();
}

function maximizeApp(){
    api.window.maximize();
}

function exitApp(){
    api.window.exit();
}