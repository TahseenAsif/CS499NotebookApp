const minimize = document.getElementById("minimize");
const maximize = document.getElementById("maximize");
const exit = document.getElementById("exit");

minimize.addEventListener("click", () => {
    api.terminal.minimize();
});

maximize.addEventListener("click", () => {
    api.terminal.maximize();
});

exit.addEventListener("click", () => {
    api.terminal.exit();
});