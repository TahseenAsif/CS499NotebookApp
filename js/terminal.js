window.addEventListener('DOMContentLoaded', () => {
    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const exit = document.getElementById("exit");

    const display = document.querySelector("#output");
    const container = document.querySelector(".terminal");

    minimize.addEventListener("click", () => {
        api.terminal.minimize();
    });
    
    maximize.addEventListener("click", () => {
        api.terminal.maximize();
    });
    
    exit.addEventListener("click", () => {
        api.terminal.exit();
    });

    async function getMessage() {
        // const response = (await fetch('../messageJs.txt')).text();
        // console.log(response);
        // console.log(response[2]);
        fetch('../message.txt')
            .then((res) => res.text())
            .then((text) => {
                console.log(text.split('\n'));
                x = text.split('\n')
                console.log(x);
                for(i = 0; i < x.length; i++){
                    const toAdd = document.createElement("p");
                    toAdd.id = "output";
                    toAdd.innerHTML = x[i];
                    container.appendChild(toAdd);
                }
            })
    }

    // function getMessageAgain(){
    //     var a = document.body.appendChild(document.createElement('a'));
    //     var textToWrite = terminal.innerHTML;
    //     a.download = "../message.txt";
    //     textToWrite = textToWrite.replace(/\n/g, "%0D%0A"); 
    //     a.href = "data:text/plain," + textToWrite;
    //     a.click();
    // }
    getMessage()
});