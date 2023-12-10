window.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector("#output");
    const container = document.querySelector(".terminal");

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
                    if(x[i] != ""){
                        const toAdd = document.createElement("p");
                        toAdd.id = "output";
                        const styleOutput = document.createElement("samp");
                        styleOutput.innerHTML = x[i];
                        toAdd.appendChild(styleOutput);
                        container.appendChild(toAdd);
                    }
                }
                exitMessage();
            })
    }

    async function exitMessage(){
        const exitWrap = document.createElement("p");
        const wrapType = document.createElement("samp");
        const exitMsg = 'File executed successfully! <br/>Press any key to exit...';
        wrapType.innerHTML = exitMsg;
        exitWrap.appendChild(wrapType);
        container.appendChild(exitWrap);
    }

    // function getMessageAgain(){
    //     var a = document.body.appendChild(document.createElement('a'));
    //     var textToWrite = terminal.innerHTML;
    //     a.download = "../message.txt";
    //     textToWrite = textToWrite.replace(/\n/g, "%0D%0A"); 
    //     a.href = "data:text/plain," + textToWrite;
    //     a.click();
    // }
    getMessage();
});