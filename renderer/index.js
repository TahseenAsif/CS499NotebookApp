$(document).ready(function(){
    $('.textarea').css('min-height', $('text.area').height());
    $('.textarea').html('');
    var currentHeight = $('.textarea').height();
    var lineHeight = currentHeight;
    $('.textarea').keyup(function(){
      if($(this).height()!=currentHeight){
        currentHeight = $(this).height();
        var lines = currentHeight/lineHeight;
        $('.line-numbers').html('')
        for (i = 1; i < lines+1; i++) {
          $('.line-numbers').append('<span>'+i+'</span>')
        }
      }
    });
});



window.addEventListener("DOMContentLoaded" , (event) => { 

    const font = document.getElementById('fonts')

    font.addEventListener('change', event => {
        document.querySelector('.note').style.fontFamily = font.value
    })

    document.getElementById('bold').addEventListener('click', event =>{
        document.execCommand("bold");
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })
    
    document.getElementById('italic').addEventListener('click', event =>{
        document.execCommand('italic')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })
    
    document.getElementById('underline').addEventListener('click', event =>{
        document.execCommand('underline')
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })

    document.querySelector('.textarea').addEventListener('keydown', function(e){
        if(e.keyCode == 9){
            document.execCommand('insertHTML' ,false,"&nbsp&nbsp&nbsp&nbsp")
        }
    })

    document.getElementById('font-color').addEventListener('input', event => {
        document.execCommand('foreColor', false, document.getElementById('font-color').value)
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
    })
    


    document.getElementById('highlight').addEventListener('click', () => {
        var dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.style.display === 'none'){
            dropdownMenu.style.display = 'flex'
        }
        else {
            dropdownMenu.style.display = 'none';
        }
    })

    document.getElementById('yellow').addEventListener('mousedown', () =>{
        document.execCommand('backcolor', true, '#FFFF00')
        document.querySelector('.dropdown-menu').style.display='none'
        if(window.getSelection){
            window.getSelection().removeAllRanges();
        }
  
    })

    document.getElementById('none').addEventListener('mousedown', () =>{
        document.execCommand('removeFormat')
    })


       

})
