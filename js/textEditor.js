window.addEventListener('DOMContentLoaded', (event) => {
    const textTabs = document.querySelector('#text-editor-tabs');
    var tabCount = 1;
    var tabID = 1;

    //Adding more Font styles
    let Font = Quill.import('formats/font');
    // We do not add Sans Serif since it is the default
    Font.whitelist = ['sans-serif', 'serif', 'monospace', 'inconsolata', 'roboto', 'mirza', 'arial', 'verdana'];
    Quill.register(Font, true);

    fontOptions = [{'font': ['sans-serif', 'serif', 'monospace', 'inconsolata', 'roboto', 'mirza', 'arial', 'verdana']}];

    // -----------------------------------------------------------------
    //quill text editor
    function createTextEditor(id){
        var quill = new Quill(`#${id}`, {
            modules: {
                toolbar: [
                    [{ 'header': [false,6,5,4,3,2,1] }],
                    fontOptions,
                    [{ 'color': [] }, { 'background': [] }],     
                    ['bold', 'italic', 'underline'],        
                    [{ 'script': 'sub'}, { 'script': 'super' }],    
                    [{ 'align': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image'],
                    ['paint'],
                    ['save'],
                ],            
            },
            theme: 'snow'
        });

        //paint window button
        const paint = document.querySelectorAll('.ql-paint');
        for(let i = 0; i < paint.length; i++){
            paint[i].addEventListener('click', () => {
                api.paint_window.paint();
            });
        }

        const save = document.querySelectorAll('.ql-save');
        for(let i = save.length-1; i < save.length; i++){
            save[i].addEventListener('click', () =>{
                saveTab(i, true);
            });
        }
    };

    //create the first tab within the text editor
    createTextEditor('Tab1');

    //create tab within text editor
    function createTab(){
        const newTab = document.createElement('smart-tab-item');
        tabID++;
        //label will be  changed to text file name once opened
        newTab.label = `Tab ${tabID}`;
        const newEditor = document.createElement('div');
        newEditor.id = `Tab${tabID}`;
        newTab.appendChild(newEditor);
        textTabs.appendChild(newTab);
        tabCount++;
        textTabs.selectedIndex = tabCount - 1;
        createTextEditor(`Tab${tabID}`);
    }

    window.api.createTextTab((event, msg) => {
        createTab();
        console.log(msg);
    });

    //load tab into text editor
    var loadedTabCount = 0;
    window.api.loadTextTabData((event, data) => {
        //nothing has been loaded into the text editor
        if(loadedTabCount == 0){
            const selectedTabText = textTabs.getTabLabel(textTabs.selectedIndex);
            const splitTabLabelText = selectedTabText.split(' ');
            let textid = `${splitTabLabelText[0]}${splitTabLabelText[1]}`;
            const tempEditor = document.querySelector(`#${textid} .ql-editor`);
            tempEditor.innerHTML = data;
            loadedTabCount++;
        }
        else{
            createTab();
            const tempEditor = document.querySelector(`#Tab${tabCount} .ql-editor`);
            tempEditor.innerHTML = data;
        }
    });

    //close a tab within text editor
    textTabs.addEventListener('closing', (event) => {
        tabCount--;
	    // event handling code goes here.
    });

    //save a tab within the text editor
    function saveTab(index, saveAll){
        console.log(index);
        const tabText = document.querySelector(`#Tab${index+1} .ql-editor`);
        const content = tabText.innerHTML;
        api.text_editor.save(content, saveAll);
    };

    //save a tab requested by main (processing to save all tabs)
    window.api.saveTextTabData((event, index) => {
        var last_request;
        const save = document.querySelectorAll('.ql-save');
        //check if this is the last request
        if(index + 1 < save.length){
            last_request = false;
            console.log("Last Request: false");
        }
        else{
            last_request = true;
            console.log("Last Request: true");
        }
        saveTab(index, last_request);
    });
});