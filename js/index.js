window.addEventListener('DOMContentLoaded', (event) => {
    // window bar variables and functions
    //sets the functionality of the buttons shown on the title bar of the window
    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const exit = document.getElementById("exit");
    var dark = false;

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
    const darkButton = document.querySelector("#darkMode"); 

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
    });

    // -----------------------------------------------------------------
    //quill text editor
    var quill = new Quill('#textarea', {
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

    var styles = `
    #textarea {
        background: #202020;
    }
    .ql-toolbar{
        background: #202020;
    }
    .ql-picker-label{
        color: #ffffff;
    }
    .ql-color{
        color: #ffffff;
    }
    .ql-bold > svg{
        stroke: white;
    }
    p,li,ul,h1,h2,h3,h4,h5,h6{
        color:white;
    }
    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: #06c;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active),
    .ql-snow .ql-toolbar button:hover:not(.ql-active) {
        color: #06c;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
        fill: #06c;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
        stroke: #06c;
    }
    .ql-snow .ql-stroke {
        fill: none;
        stroke: #ffffff;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }
      .ql-snow .ql-stroke-miter {
        fill: none;
        stroke: #ffffff;
        stroke-miterlimit: 10;
        stroke-width: 2;
      }
      .ql-snow .ql-fill,
      .ql-snow .ql-stroke.ql-fill {
        fill: #ffffff;
      }
      .ql-snow .ql-picker-options{
        background-color: #202020;
      }
      .ql-snow .ql-picker-options .ql-picker-item{
        color: white;
      }
    `

    validateDark();

    function darkMode() {
        /*
        var textArea = document.querySelector("#textarea");
        var quillBar = document.querySelector('.ql-toolbar');
        var quillButtons = document.querySelectorAll(".ql-formats")
        textArea.classList.add("dark");
        textArea.style.background = "#202020";
        quillBar.style.background = '#202020';
        quillButtons.forEach(button => {
            button.firstChild.style.color = "#ffffff";
            button.querySelector(".ql-picker-options").style.background = "#202020";
        })
        var textColor = document.querySelector(".ql-color .ql-picker-label").setAttribute("data-value", "#ffffff"); //doesn't work, might have smth to do with ql-active class but idk
        */
       if(!dark){
            var styleSheet = document.createElement("style");
            styleSheet.setAttribute("class", "dark");
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
            dark = true;
       } else {
            const darkStyle = document.querySelector(".dark");
            darkStyle.remove();
            dark = false;
       }
       validateDark();
    }

    darkButton.addEventListener('click', () => {
        darkMode();
    })

    function validateDark(){
        if(dark){
            darkButton.children[0].innerHTML = "Light Mode";
        } else {
            darkButton.children[0].innerHTML = "Dark Mode";
        }
    }
  
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