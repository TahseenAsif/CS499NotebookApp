$(document).ready(function () {
    $('.textarea').css('min-height', $('text.area').height());
    $('.textarea').html('');
    var currentHeight = $('.textarea').height();
    var lineHeight = currentHeight;
    $('.textarea').keyup(function () {
        if ($(this).height() != currentHeight) {
            currentHeight = $(this).height();
            var lines = currentHeight / lineHeight;
            $('.lineNumbers').html('');
            for (i = 1; i < lines + 1; i++) {
                $('.lineNumbers').append('<span>' + i + '</span>');
            }
        }
    });
});

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
        const a = editors[0].innerHTML;
        const b = editors[1].innerHTML;
        editors[0].innerHTML = b;
        editors[1].innerHTML = a;
    });

    // -----------------------------------------------------------------

    // const dotted = document.getElementById("verticalDots");

    // const addNewBook = document.getElementById('addNewBookk');
    // const addNewBookContainer = document.getElementById('addNewBookContainer')
    // const cancel = document.getElementById('cancel')
    // const save = document.getElementById('save');

    // text editor variables and functions
    const font = document.getElementById('fonts');
    const bold = document.getElementById('bold');
    const italic = document.getElementById('italic');
    const underline = document.getElementById('underline');
    const fontColor = document.getElementById('fontColor');
    const highlight = document.getElementById('highlight');
    const yellow = document.getElementById('yellow');
    const none = document.getElementById('none');

    //Navbar buttons
    font.addEventListener('change', () => {
        document.execCommand('fontName', false, font.value); 
    });

    bold.addEventListener('click', () => {
        document.execCommand('bold')
    });
    
    italic.addEventListener('click', () => {
        document.execCommand('italic')
    });

    underline.addEventListener('click', () => {
        document.execCommand('underline')
    });

    fontColor.addEventListener('input', () => {
        document.execCommand('foreColor', false, fontColor.value)
    });

    highlight.addEventListener('click', () => {
        var dropdownMenu = document.querySelector('.dropdown-menu')
        var dropdownMenu = document.querySelector('.dropdown-menu');
        if(dropdownMenu.style.display === 'none'){
            dropdownMenu.style.display = 'flex'
        }
        else{
            dropdownMenu.style.display = 'none';
        }
    });

    yellow.addEventListener('mousedown', () => {
        document.execCommand('backcolor', true, '#FFFF00')
        document.querySelector('.dropdown-menu').style.display='none'
    });

    none.addEventListener('mousedown', () => {
        document.execCommand('backcolor', true, 'white');
        document.querySelector('.dropdown-menu').style.display='none'
    });

    //Adding new Notebook
    var noteBookNum = 0;

    // addNewBook.addEventListener('click', () => {
    //     addNewBookContainer.style.display ='block';
    // });

    // cancel.addEventListener('click', event => {
    //     addNewBookContainer.style.display = 'none';

    //     event.preventDefault();
    // });

    // save.addEventListener('click', event => {
    //     const title = document.getElementById('bookTitle').value;
    
    //     var bkTitle = '';

    //     if(title === 'Notebook'){
    //         noteBookNum++;
    //         bkTitle += `${title} ${noteBookNum}`
    //     }
    //     else{
    //         bkTitle = title
    //     }

    //     const notebookCon = document.createElement('div');
    //     notebookCon.classList.add('notebook')
    //     notebookCon.id = `${bkTitle}`
    //     notebookCon.innerHTML= `<i class="fa-solid fa-book"></i>
    //     <span>${bkTitle}</span>
    //     <div><i class="fa-solid fa-ellipsis"></i></div>`

    //     document.querySelector('.notebookContainer').appendChild(notebookCon);
    //     addNewBookContainer.style.display = 'none';
    //     document.getElementById('bookTitle').value = 'Notebook';
    //     event.preventDefault()

    // });

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

    resizeEditors(document.querySelector(".separator"));
});