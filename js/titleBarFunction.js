//sets the functionality of the buttons shown on the title bar of the window

const remote = require("electron").remote;

var minimize = document.getElementById("minimize");
var maximize = document.getElementById("maximize");
var exit = document.getElementById("exit");

minimize.addEventListener("click", minimizeApp);
maximize.addEventListener("click", maximizeApp);
exit.addEventListener("click", exitApp);

function minimizeApp(){
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximizeApp(){
    remote.BrowserWindow.getFocusedWindow().maximize();
}

function exitApp(){
    remote.getCurrentWindow().close();
}