window.addEventListener('DOMContentLoaded', (event) => {
    // window bar variables and functions
    //sets the functionality of the buttons shown on the title bar of the window
    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const exit = document.getElementById("exit");

    minimize.addEventListener("click", () => {
        api.window.minimize();
    });

    maximize.addEventListener("click", () => {
        api.window.maximize();
    });

    exit.addEventListener("click", () => {
        api.window.exit();
    });

    // menubar and submenu variables, their functions, and interaction with the main body elements
    //sets the functionality of the items listed on the side menu bar
    let main = document.querySelector(".main");
    let menuBtns = document.querySelectorAll(".btn");
    let editors = document.querySelectorAll(".editorFrame");
    const files = document.querySelector("#files");
    const settings = document.querySelector("#settings");
    const account = document.querySelector("#account");
    const about = document.querySelector("#about");
    const swap = document.querySelector("#swap");
    const newText = document.querySelector("#new-text");
    const newCode = document.querySelector("#new-code");
    const newPair = document.querySelector("#new-pair");
    const open = document.querySelector('#open')
    const textTabs = document.querySelector('#text-editor-tabs')
    const codeTabs = document.querySelector('#code-editor-tabs')


    //if menu options that are chosen to be focused on
    for(var i = 0; i < menuBtns.length; i++){
        menuBtns[i].addEventListener("click", (e) => {
            let option = e.target;
            let option_box = e.target.parentElement;
            option.classList.toggle("chosen");
            option_box.classList.toggle("tooltip");
            //if files is not the chosen option but it was previously chosen
            if(option != files & files.classList.contains("chosen")){
                files.classList.toggle("chosen");
                files.parentElement.classList.toggle("tooltip");
            }
            //if settings is not the chosen option but it was previously chosen
            if(option != settings & settings.classList.contains("chosen")){
                settings.classList.toggle("chosen");
                settings.parentElement.classList.toggle("tooltip");
            }
            //if account is not the chosen option but it was previously chosen
            if(option != account & account.classList.contains("chosen")){
                account.classList.toggle("chosen");
                account.parentElement.classList.toggle("tooltip");
            }
            //if about is not the chosen option but it was previously chosen
            if(option != about & about.classList.contains("chosen")){
                about.classList.toggle("chosen");
                about.parentElement.classList.toggle("tooltip");
            }
        });
    }

    about.addEventListener("click", () => {
        api.window.about();
    });

    // -------------interactions between menu and main------------------
    
    //if the focus is menubar, prevent typing in files
    // add eventlistener function here later

    //if the focus is main, remove highlights and close any open submenu
    main.addEventListener("click", (e) => {
        //reset all menu options to default looks
        for(let i = 0; i < menuBtns.length; i++){
            const btn = menuBtns[i];
            if(btn.classList.contains("chosen")){
                btn.classList.toggle("chosen");
                btn.parentElement.classList.toggle("tooltip");
            }
        }
        //give element within main its focus
        if(e.target.classList)
        e.target.classList.toggle("chosen");
    });

    swap.addEventListener("click", () => {
        const main = document.querySelector('.main');
        if(main.classList.contains('main-swap')){
            main.classList.remove('main-swap')
            resizeEditors(document.querySelector(".separator"));
        }
        else{
            main.classList.add('main-swap');
            resizeEditorsSwap(document.querySelector(".separator"));
        }
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
    });

    var numOfTextTabs = 1;
    var numOfCodeTabs = 1;

    newText.addEventListener('click', () =>{
        createNewTab('text')
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
    })
    newCode.addEventListener('click', () =>{
        createNewTab('code');
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
    })
    newPair.addEventListener('click', () =>{
        createNewTab('text');
        createNewTab('code');
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
    })

    //create new tab function
    function createNewTab(e){
        const newTab = document.createElement('smart-tab-item');
        if(e === 'text'){
            numOfTextTabs++;
            newTab.label = `Tab ${numOfTextTabs}`; //label will be  changed to text file name once opened
            const newEditor = document.createElement('div');
            newEditor.id = `Tab${numOfTextTabs}`;
            newTab.appendChild(newEditor);
            textTabs.appendChild(newTab);
            textTabs.selectedIndex = numOfTextTabs - 1;
            createTextEditor(`Tab${numOfTextTabs}`);
        }
        else if (e === 'code'){
            numOfCodeTabs++;
            newTab.label = `Tab ${numOfCodeTabs}`;

            //--------------------BELOW IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//
            const newEditor = document.createElement('div');
            newEditor.style.color = 'white';
            newEditor.style.background = 'black';
            const head = document.createElement('h1');
            head.innerText = 'Code Editor Part';
            newEditor.appendChild(head);
            newTab.appendChild(newEditor);
            //--------------------ABOVE IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//

            codeTabs.appendChild(newTab);
            codeTabs.selectedIndex = numOfCodeTabs - 1;
        }
    }


    open.addEventListener('click', () =>{
        console.log(textTabs.selectedIndex);
    })


    // -----------------------------------------------------------------
    //quill text editor
    function createTextEditor(id){
        var quill = new Quill(`#${id}`,{
            modules: {
                toolbar: [
                    [{ 'header': [false,6,5,4,3,2,1] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],     
                    ['bold', 'italic', 'underline'],        
                    [{ 'script': 'sub'}, { 'script': 'super' }],    
                    [{ 'align': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image'],
    
    
                ],            
            },
            theme: 'snow'
          });
          
    }
    createTextEditor('textarea');


  
    // resizing of editors
    function resizeEditors(resizeBar){
        const first = editors[0];
        const second = editors[1];
        var mousedown;
        resizeBar.onmousedown = onMouseDown;

        function onMouseDown(e){
            mousedown = {e,
                  offsetLeft:   resizeBar.offsetLeft,
                  offsetTop:    resizeBar.offsetTop,
                  firstWidth:   first.offsetWidth,
                  secondWidth:  second.offsetWidth
                 };
            document.onmousemove = onMouseMove;
            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
            }
        }

        function onMouseMove(e){
            var delta = {x: e.clientX - mousedown.e.clientX}
            delta.x = Math.min(Math.max(delta.x, -mousedown.firstWidth), mousedown.secondWidth);
            resizeBar.style.left = (mousedown.offsetLeft + delta.x) + "px";
            first.style.width = (mousedown.firstWidth + delta.x) + "px";
            second.style.width = (mousedown.secondWidth - delta.x) + "px";
        }
    }

    //function only used after swapping editors
    function resizeEditorsSwap(resizeBar){
        const first = editors[0];
        const second = editors[1];
        var mousedown;
        resizeBar.onmousedown = onMouseDown;

        function onMouseDown(e){
            mousedown = {e,
                  offsetLeft:   resizeBar.offsetLeft,
                  offsetTop:    resizeBar.offsetTop,
                  firstWidth:   first.offsetWidth,
                  secondWidth:  second.offsetWidth
                 };
            document.onmousemove = onMouseMove;
            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
            }
        }

        function onMouseMove(e){
            var delta = {x: e.clientX - mousedown.e.clientX}
            delta.x = Math.min(Math.max(delta.x, -mousedown.firstWidth), mousedown.secondWidth);
            resizeBar.style.left = (mousedown.offsetLeft + delta.x) + "px";
            first.style.width = (mousedown.firstWidth - delta.x) + "px";
            second.style.width = (mousedown.secondWidth + delta.x) + "px";
        }
    }

    resizeEditors(document.querySelector(".separator"));


    
});