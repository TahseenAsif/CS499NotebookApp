$(document).ready(function () {
    $('.textarea').css('min-height', $('text.area').height());
    $('.textarea').html('');
    var currentHeight = $('.textarea').height();
    var lineHeight = currentHeight;
    $('.textarea').keyup(function () {
        if ($(this).height() != currentHeight) {
            currentHeight = $(this).height();
            var lines = currentHeight / lineHeight;
            $('.lineNumbers').html('')
            for (i = 1; i < lines + 1; i++) {
                $('.lineNumbers').append('<span>' + i + '</span>')
            }
        }
    });
});


window.addEventListener('DOMContentLoaded', (event) => {
    
    const sidePanel = document.getElementById('sidePanel');
    const addNewBook = document.getElementById('addNewBook');
    const addNewBookContainer = document.getElementById('addNewBookContainer')
    const cancel = document.getElementById('cancel')
    const save = document.getElementById('save');

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
    })

    bold.addEventListener('click', () => {
        document.execCommand('bold')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })
    
    italic.addEventListener('click', () => {
        document.execCommand('italic')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    underline.addEventListener('click', () => {
        document.execCommand('underline')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    fontColor.addEventListener('input', () => {
        document.execCommand('foreColor', false, fontColor.value)
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    highlight.addEventListener('click', () => {
        var dropdownMenu = document.querySelector('.dropdown-menu')
        var dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none'){
            dropdownMenu.style.display = 'flex'
        }
        else {
            dropdownMenu.style.display = 'none';
        }
    })

    yellow.addEventListener('mousedown', () => {
        document.execCommand('backcolor', true, '#FFFF00')
        document.querySelector('.dropdown-menu').style.display='none'
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    none.addEventListener('mousedown', () =>{
        document.execCommand('backcolor', true, 'white');
        document.querySelector('.dropdown-menu').style.display='none'
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    //Adding new Notebook
    var noteBookNum = 0;

    addNewBook.addEventListener('click', () =>{
        addNewBookContainer.style.display ='block';
    })

    cancel.addEventListener('click', () => {
        addNewBookContainer.style.display = 'none';
    })

    save.addEventListener('click', () => {
        const title = document.getElementById('bookTitle').value;
        
        const newBook = document.createElement('div');
        newBook.classList.add('books');
        var bkTitle = '';


        if(title === 'Notebook'){
            noteBookNum++;
            bkTitle = document.createTextNode(`${title} ${noteBookNum}`)
        }
        else{
            bkTitle = document.createTextNode(`${title}`)
        }

        newBook.appendChild(bkTitle);
        sidePanel.appendChild(newBook);
        addNewBookContainer.style.display = 'none';
        document.getElementById('bookTitle').value = 'Notebook';
    })
})
