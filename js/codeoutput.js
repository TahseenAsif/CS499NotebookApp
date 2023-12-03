window.addEventListener('DOMContentLoaded', (event) => {
    const terminal = document.querySelector("#output"); 
    const overTerminal = document.querySelector(".terminal");  

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
                    overTerminal.appendChild(toAdd);
                }
            })
    }

    function getMessageAgain(){
        var a = document.body.appendChild(document.createElement('a'));
        var textToWrite = terminal.innerHTML;
        a.download = "../message.txt";
        textToWrite = textToWrite.replace(/\n/g, "%0D%0A"); 
        a.href = "data:text/plain," + textToWrite;
        a.click();
    }
    getMessage()
});