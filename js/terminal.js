const minimize = document.getElementById("minimize");
const maximize = document.getElementById("maximize");
const exit = document.getElementById("exit");

minimize.addEventListener("click", () => {
    api.term.minimize();
});

maximize.addEventListener("click", () => {
    api.term.maximize();
});

exit.addEventListener("click", () => {
    api.term.exit();
});

console.log("it works here!");

window.api.incomingData((_event, data) => {
    console.log(data);
    //termObj.write(data);
});