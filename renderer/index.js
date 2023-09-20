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
    })
    
    document.getElementById('italic').addEventListener('click', event =>{
        document.execCommand('italic')
    })
    
    document.getElementById('underline').addEventListener('click', event =>{
        document.execCommand('underline')
    })

    document.querySelector('.textarea').addEventListener('keydown', function(e){
        if(e.keyCode == 9){
            document.execCommand('insertHTML' ,false,"&nbsp&nbsp&nbsp&nbsp")
        }
    })

    document.getElementById('font-color').addEventListener('input', event => {
        document.execCommand('foreColor', false, document.getElementById('font-color').value)
    })

    document.getElementById('highlight').addEventListener('click', event =>{

        /*
        let selectedText = window.getSelection().getRangeAt(0);
        let s = selectedText.extractContents();
        var span = document.createElement("span");
        span.style.backgroundColor='yellow';
        span.appendChild(s);
        selectedText.insertNode(span);
        */

       /*
       const el = document.createElement('span');
       el.style.background='yellow'
       var s = window.getSelection();
       var range = s.getRangeAt(0);
       range.surroundContents(el)
        */        

       document.execCommand('backcolor', true, '#FFFF00')
      
    })


    document.getElementById('un').addEventListener('click', () =>{
        document.execCommand('removeFormat');
    })
})
