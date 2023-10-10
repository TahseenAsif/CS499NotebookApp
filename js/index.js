$(document).ready(function () {
    $('.textarea').css('min-height', $('text.area').height());
    $('.textarea').html('');
    var currentHeight = $('.textarea').height();
    var lineHeight = currentHeight;
    $('.textarea').keyup(function () {
        if ($(this).height() != currentHeight) {
            currentHeight = $(this).height();
            var lines = currentHeight / lineHeight;
            // var dottedHeight = 20 * lines;
            $('.lineNumbers').html('');
            for (i = 1; i < lines + 1; i++) {
                $('.lineNumbers').append('<span>' + i + '</span>');
                // document.getElementById("verticalDots").style.height = toString(dottedHeight) + "px" ;
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    /*
    //  window bar variables and functions
    */
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

    // ---------------------------------------------------------

    /*
    //  menu bar variables, its functions, and interaction with the main elements
    */
    //sets the functionality of the items listed on the side menu bar
    let main = document.querySelector(".main");
    let menuBtns = document.querySelectorAll(".btn");
    const files = document.querySelector("#files");
    const settings = document.querySelector("#settings");
    const account = document.querySelector("#account");
    const about = document.querySelector("#about");

    //if menu options that are chosen to be focused on
    for(let i = 0; i < menuBtns.length; i++){
        const btn = menuBtns[i];
        btn.addEventListener("click", (e) => {
            //if main was chosen right before
            if(main.classList.contains("chosen")){
                main.classList.toggle("chosen");
            }
            //reset all menu options to default looks
            for(j = 0; j < menuBtns.length; j++){
                const temp_btn = menuBtns[j];
                if(temp_btn.classList.contains("chosen")){
                    temp_btn.classList.toggle("chosen");
                    temp_btn.parentElement.classList.toggle("tooltip");
                }
            }
            //put focus on the clicked option in the menubar
            e.target.classList.toggle("chosen");
            e.target.parentElement.classList.toggle("tooltip");
        });
    }

    about.addEventListener("click", () => {
        api.window.about();
    });

    // ----------------------interaction------------------------------
    
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
        //give main the focus
        if(e.target.classList)
        e.target.classList.toggle("chosen");
    });

    // -----------------------------------------------------------------

    // const dotted = document.getElementById("verticalDots");

    // const addNewBook = document.getElementById('addNewBookk');
    // const addNewBookContainer = document.getElementById('addNewBookContainer')
    // const cancel = document.getElementById('cancel')
    // const save = document.getElementById('save');

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
        document.getElementById('notepad').style.fontFamily = font.value;
    });

    bold.addEventListener('click', () => {
        document.execCommand('bold')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    });
    
    italic.addEventListener('click', () => {
        document.execCommand('italic')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    });

    underline.addEventListener('click', () => {
        document.execCommand('underline')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    });

    fontColor.addEventListener('input', () => {
        document.execCommand('foreColor', false, fontColor.value)
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
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
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    });

    none.addEventListener('mousedown', () => {
        document.execCommand('backcolor', true, 'white');
        document.querySelector('.dropdown-menu').style.display='none'
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
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
});