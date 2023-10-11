$(document).ready(function () {
    $('.textarea').css('min-height', $('text.area').height());
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
    const navbar = document.querySelectorAll('.navButton');
    const lists = document.querySelectorAll('.listButton');
    const header = document.querySelector('#formatBlock');

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
        document.querySelector('#highlight').style.backgroundColor='#FFFF00' //not working
    });

    none.addEventListener('mousedown', () => {
        document.execCommand('backcolor', true, 'white');
        document.querySelector('.dropdown-menu').style.display='none'
        document.querySelector('#highlight').style.backgroundColor='#f0f8ff'
    });

    navbar.forEach(button => {
        button.addEventListener('click', () => {
            if(button.id!="highlight"){
                if(button.classList.contains('active')){
                    button.classList.remove('active');
                } else {
                    button.classList.add('active');
                }
            }
        })
    })

    header.addEventListener('change', () => {
        document.execCommand(header.id, false, header.value);
    })

    //List Buttons
    lists.forEach(button => {
        button.addEventListener('click', () => {
            document.execCommand(button.id, false, null);
        })
    })

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

})