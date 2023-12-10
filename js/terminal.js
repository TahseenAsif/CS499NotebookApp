window.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector("#output");
    const container = document.querySelector(".terminal");

    //execution resulted in errors, show errors only
    window.api.onErrorMsg((event, err) => {
        x = err.split('\n');
        for(i = 0; i < x.length; i++){
            if(x[i] != ""){
                displayOnTerminal("error", x[i]);
            }
        }
        exitStatus(1);
    });

    //execution resulted in no errors, show output
    window.api.noErrorMsg((event, msg) => {
        console.log(msg);
        getMessage();
    })

    async function getMessage(){
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
                exitMsg = "File executed! (returns 0)";
                break;
            case 1:
                exitID = "exitStatus1";
                exitMsg = "File terminated! (returns 1)";
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
});

window.addEventListener('keydown', (e) => {
    api.terminal.exit();
})