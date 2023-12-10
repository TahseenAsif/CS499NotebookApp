window.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector("#output");
    const container = document.querySelector(".terminal");
    var error = false;

    window.api.onErrorMsg((event, err) => {
        error = true;
        console.log(err);
    });

    async function getMessage(){
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
                        displayOnTerminal("output", x[i]);
                    }
                }
                exitStatus(0);
            })

    }

    async function exitStatus(value){
        var exitMsg;
        var exitID;
        switch(value){
            case 0:
                exitID = "exitStatus0";
                exitMsg = "File executed returns zero!";
                break;
            case 1:
                exitID = "exitStatus1";
                exitMsg = "File executed returns non-zero!";
                break;
        }
        exitMsg = exitMsg.concat("</br>Press any key to exit the terminal...");
        displayOnTerminal(exitID, exitMsg);
    }

    async function displayOnTerminal(parentID, content){
        const newLine = document.createElement("p");
        newLine.id = parentID;
        const wrap = document.createElement("samp");
        wrap.innerHTML = content;
        newLine.appendChild(wrap);
        container.appendChild(newLine);
    }

    async function runTerminal(){
        if(error){
            showError();
        }
        else{
            getMessage();
        }
    }

    runTerminal();
});

window.addEventListener('keydown', (e) => {
    api.terminal.exit();
})