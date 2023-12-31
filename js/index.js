window.addEventListener('DOMContentLoaded', (event) => {
    var user; // need this variable for auto save
    //IPC TESTING
    window.api.sendUserData((event, userData) => {
        console.log(userData);
        user = userData;
        if(userData === "guest"){
            fetch("../data.json")
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    loadData = data;
                    console.log(loadData);
                    console.log(loadData.code);
                    const selectedTabText = textTabs.getTabLabel(textTabs.selectedIndex);
                    const splitTabLabelText = selectedTabText.split(' ');
                    let textid = `${splitTabLabelText[0]}${splitTabLabelText[1]}`;
                    const textEditor = document.querySelector(`#${textid} .ql-editor`);
                    textEditor.innerHTML=data.text[0];
                    //FOR LOADING MULTIPLE TEXT
                    for(i = 1; i < data.text.length; i++){
                        createNewTab('text');
                        const textEditor2 = document.querySelector(`#Tab${numOfTextTabs} .ql-editor`);
                        textEditor2.innerHTML = data.text[i];
                    }
                    textTabs.selectedIndex = totalTextTabs;
                    //FOR LOADING MULTIPLE CODE
                    codeEditors[0].setValue(data.code[0]);
                    console.log(data.code.length);
                    console.log(data.code);
                    for(i = 1; i < data.code.length; i++){
                        createNewTab('code');
                        codeEditors[i].setValue(data.code[i]);
                    }
                })
                .catch((error) => console.log(error));
        } else {
            console.log(userData);
            console.log(userData.json_data);
            console.log(userData.json_data.text);
            console.log(userData.json_data.code);
            
            setTimeout(() => {
                const selectedTabText = textTabs.getTabLabel(textTabs.selectedIndex);
                const splitTabLabelText = selectedTabText.split(' ');
                let textid = `${splitTabLabelText[0]}${splitTabLabelText[1]}`;
                const textEditor = document.querySelector(`#${textid} .ql-editor`);
                textEditor.innerHTML=userData.json_data.text[0];
                //FOR LOADING MULTIPLE TEXT
                for(i = 1; i < userData.json_data.text.length; i++){
                    createNewTab('text');
                    const textEditor2 = document.querySelector(`#Tab${numOfTextTabs} .ql-editor`);
                    textEditor2.innerHTML = userData.json_data.text[i];
                }
                textTabs.selectedIndex = totalTextTabs;
                //FOR LOADING MULTIPLE CODE
                codeEditors[0].setValue(userData.json_data.code[0]);
                console.log(userData.json_data.code.length);
                console.log(userData.json_data.code);
                for(i = 1; i < userData.json_data.code.length; i++){
                    createNewTab('code');
                    codeEditors[i].setValue(userData.json_data.code[i]);
                }
            }, 100);
        }
    })
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
    const newText = document.querySelector("#new-text");
    const newCode = document.querySelector("#new-code");
    const newPair = document.querySelector("#new-pair");
    const open = document.querySelector('#open');
    const saveAll = document.querySelector('#saveAll');
    const signOut = document.querySelector('#signOut');
    const textTabs = document.querySelector('#text-editor-tabs');
    const codeTabs = document.querySelector('#code-editor-tabs');
    let codeEditors = [];
    let codeEditorsLangs = [];
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

    //functions that deals with interactions between menu and main

    //if the focus is an element within main, remove highlights and close any open submenu
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

    //swapping editors position
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

    //opening files
    open.addEventListener('click', () => {
       //loadMultipleJSON();
        //----The below implementation is for single files per each tab
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt, .html, .css, .js, .cpp'
        input.onchange = () => {
            var reader = new FileReader();
            reader.onload = () => {
                var content = reader.result;
                let fileName = input.files[0].name;
                const splitName = fileName.split('.');
                const fileTitle = splitName[0];
                const fileType = splitName[1];
                if(fileType === 'txt' || fileType === 'html'){
                    const selectedTab = textTabs.getTabLabel(textTabs.selectedIndex);
                    const splitTabLabel = selectedTab.split(' ');
                    let id = `${splitTabLabel[0]}${splitTabLabel[1]}`;
                    const textEditor = document.querySelector(`#${id} .ql-editor`);
                    textEditor.innerHTML = content;
                    const t = document.querySelector('smart-tabs');
                    //t.update(textTabs.selectedIndex, fileTitle)
                    //textEditor.classList.add(`${id}`)
                    textEditor.label = fileTitle;
                }
                else{
                    const selectedTab = codeTabs.getTabLabel(codeTabs.selectedIndex);
                    const splitTabLabel = selectedTab.split(' ');
                    let id = `${splitTabLabel[1]}`;
                    codeEditors[id-1].setValue(content) // this just makes the first tab code editor value, need to implement new code tab first before updating this
                }
            };
            reader.readAsText(input.files[0])
        };
        input.click()
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
        
    })

    saveAll.addEventListener('click', () => {
        console.log(numOfTextTabs);
        const testSave = saveAllJSON();
        console.log(testSave);
        api.editor.allSave(testSave)
    })

    signOut.addEventListener('click', () => {
        api.login.signOutRequest();
    })

    function loadSingleJSON(){
        let input = document.createElement('input');
        var loadData;
        input.type = 'file';
        input.accept = '.json';
        input.onchange = () => {
            fetch("../test.json")
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    loadData = data;
                    console.log(loadData);
                    console.log(loadData.code);
                    const selectedTabText = textTabs.getTabLabel(textTabs.selectedIndex);
                    const splitTabLabelText = selectedTabText.split(' ');
                    let textid = `${splitTabLabelText[0]}${splitTabLabelText[1]}`;
                    const textEditor = document.querySelector(`#${textid} .ql-editor`);
                    textEditor.innerHTML=data.text[0];
                    codeEditors[0].setValue(data.code[0]);
                });
        }
        input.click();
    }

    function loadMultipleJSON(){
        let input = document.createElement('input');
        var loadData;
        input.type = 'file';
        input.accept = '.json';
        input.onchange = () => {
            fetch("../data.json")
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    loadData = data;
                    console.log(loadData);
                    console.log(loadData.code);
                    // const selectedTab = codeTabs.getTabLabel(codeTabs.selectedIndex);
                    // const splitTabLabel = selectedTab.split(' ');
                    // let id = `${splitTabLabel[1]}`;
                    // codeEditors[id-1].setValue(data.code.TAB1);
                    const selectedTabText = textTabs.getTabLabel(textTabs.selectedIndex);
                    const splitTabLabelText = selectedTabText.split(' ');
                    let textid = `${splitTabLabelText[0]}${splitTabLabelText[1]}`;
                    const textEditor = document.querySelector(`#${textid} .ql-editor`);
                    textEditor.innerHTML=data.text[0];
                    //FOR LOADING MULTIPLE TEXT
                    for(i = 1; i < data.text.length; i++){
                        createNewTab('text');
                        const textEditor2 = document.querySelector(`#Tab${numOfTextTabs} .ql-editor`);
                        textEditor2.innerHTML = data.text[i];
                    }
                    //FOR LOADING MULTIPLE CODE
                    // (async () => {
                    //     codeEditors[0].setValue(data.code[0]);
                    //     console.log(data.code.length);
                    //     console.log(data.code);
                    //     await createCodeEditor(`TAB${1}`);
                    // })()
                    codeEditors[0].setValue(data.code[0]);
                    console.log(data.code.length);
                    console.log(data.code);
                    for(i = 1; i < data.code.length; i++){
                        createNewTab('code');
                        codeEditors[i].setValue(data.code[i]);
                    }
                });
        }
        input.click();
    }

    //creating new tabs
    var numOfTextTabs = 1;
    var numOfCodeTabs = 1;
    var totalTextTabs = 0;
    var totalCodeTabs = 0;

    newText.addEventListener('click', () =>{
        createNewTab('text')
        textTabs.selectedIndex = totalTextTabs;
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
        textTabs.selectedIndex = totalTextTabs;
        createNewTab('code');
        files.classList.toggle("chosen");
        files.parentElement.classList.toggle("tooltip");
    })

    //create new tab function
    function createNewTab(e){
        const newTab = document.createElement('smart-tab-item');
        if(e === 'text'){
            numOfTextTabs++;
            totalTextTabs++;
            newTab.label = `Tab ${numOfTextTabs}`;
            const newEditor = document.createElement('div');
            newEditor.id = `Tab${numOfTextTabs}`;
            newTab.appendChild(newEditor);
            textTabs.appendChild(newTab);
            createTextEditor(`Tab${numOfTextTabs}`);
        }
        else if (e === 'code'){
            numOfCodeTabs++;
            totalCodeTabs++;
            newTab.label = `TAB ${numOfCodeTabs}`;
            // Adding nav bar
            let navToAdd = document.createElement('div');
            navToAdd.id = "codeNavBar";
            let runButton = document.createElement('button');
            let resetButton = document.createElement('button');
            let saveButton = document.createElement('button');
            //let setButton = document.createElement('button');
            runButton.classList.add("codeNavButton");
            resetButton.classList.add("codeNavButton");
            saveButton.classList.add("codeNavButton");
            //setButton.classList.add("codeNavButton");
            runButton.id="run_code";
            resetButton.id="reset_code";
            saveButton.id="save";
            //setButton.id="set_code";
            runButton.innerHTML="RUN";
            resetButton.innerHTML="RESET";
            saveButton.innerHTML="SAVE";
            //setButton.innerHTML="SET";

            //Create array of options to be added
			const langSettings = ["javascript", "python", "sql", "java"];
			const langNames = ["Javascript", "Python", "SQL", "Java"];

			//Create and append select list
			var selectList = document.createElement("select");
			selectList.setAttribute("id", "language");
			navToAdd.appendChild(selectList);

			//Create and append the options
			for (var i = 0; i < 4; i++) {
				var option = document.createElement("option");
				option.setAttribute("value", langSettings[i]);
				option.text = langNames[i];
				selectList.appendChild(option);
			}

            navToAdd.appendChild(runButton);
            navToAdd.appendChild(resetButton);
            navToAdd.appendChild(saveButton);
            //navToAdd.appendChild(setButton);
            newTab.appendChild(navToAdd);
            //Adding container
            let codeContainer = document.createElement('div');
            codeContainer.classList.add("codeEditorContainer");
            newTab.appendChild(codeContainer);
            let codeEditPart = document.createElement('div');
            codeEditPart.classList.add("codeEditor");
            codeContainer.appendChild(codeEditPart);

            //--------------------BELOW IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//
            const newEditor = document.createElement('div');
            newEditor.classList.add("editor");
            newEditor.id = `TAB${numOfCodeTabs}`;
            codeContainer.appendChild(newEditor);
            //--------------------ABOVE IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//
            codeTabs.appendChild(newTab);
            codeTabs.selectedIndex = totalCodeTabs;
            createCodeEditor(`TAB${numOfCodeTabs}`);
        }
    }


    textTabs.addEventListener('closing', function (event) {
        totalTextTabs--;
	// event handling code goes here.
    })
    codeTabs.addEventListener('closing', function (event) {
        totalCodeTabs--;
	// event handling code goes here.
    })

    
    //Adding more Font styles
    
    let Font = Quill.import('formats/font');
    // We do not add Sans Serif since it is the default
    Font.whitelist = ['sans-serif', 'serif', 'monospace', 'inconsolata', 'roboto', 'mirza', 'arial', 'verdana'];
    Quill.register(Font, true);

    fontOptions = [{'font': ['sans-serif', 'serif', 'monospace', 'inconsolata', 'roboto', 'mirza', 'arial', 'verdana']}]

    // -----------------------------------------------------------------

    //this variable is used for auto save
    let changesMade = false;

    //function to auto save, checks every 15 seconds to see if there were any changes, if there were it runs save function, if not nothing happens.
    //auto save is a feature only for account holders
    setInterval(() => {
        if(user != 'guest'){
            if(changesMade != false){
                console.log(numOfTextTabs);
                const testSave = saveAllJSON();
                console.log(testSave);
                api.editor.allSave(testSave)
                changesMade = false;
            } 
        }
    }, 15000);

    //quill text editor
    function createTextEditor(id){
        var quill = new Quill(`#${id}`,{
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
          for(let i = paint.length - 1 ; i < paint.length; i++){
            paint[i].addEventListener('click', () =>{
               api.paint_window.paint();
            })
        }

          const save = document.querySelectorAll('.ql-save');
          //Remove this, replace with single doc saving
          for(let i = save.length - 1; i < save.length; i++){
            save[i].addEventListener('click', () => {
                const textEditor = document.querySelector(`#Tab${i+1} .ql-editor`);
                const content = textEditor.innerHTML;
                api.editor.textSave(content, `Tab${i+1}`);
            })
          }

          //for auto save
          quill.on('text-change', function(delta,oldDelta,source){
            changesMade = true;
          })
    }
    createTextEditor('Tab1');

    function saveAllJSON(){
        var toSave = {
            text: [],
            code: []
        };
        for(i = 0; i < numOfTextTabs; i++){
            const textEditor = document.querySelector(`#Tab${i+1} .ql-editor`);
            //textToJSON = JSON.stringify(textEditor.innerHTML);
            //toSave.text.push(textToJSON);
            toSave.text.push(textEditor.innerHTML);
        }
        for(i = 0; i < numOfCodeTabs; i++){
            //codeToJSON = JSON.stringify(codeEditors[i].getValue());
            //toSave.code.push(codeToJSON);
            toSave.code.push(codeEditors[i].getValue());
        }
        console.log(toSave.text);
        console.log(toSave.code);
        return toSave;
    }

    //----------------------------Making a function for creating code editors
    function createCodeEditor(id){
        // Setup Ace
        let codeEditor = ace.edit(id);
        let defaultCode = 'console.log("Hello World!");';
        // Configure Ace

        // Theme
        if (dark){
            codeEditor.setTheme("ace/theme/clouds_midnight");
        } else{
            codeEditor.setTheme("ace/theme/github");
        }

        // Set language
        codeEditor.session.setMode("ace/mode/javascript");

        // Set Options
        codeEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
        
        // Adding listeners for each new button
        const executeCodeBtns = document.querySelectorAll("#run_code");
        if(executeCodeBtns.length == 1){
            executeCodeBtns[0].addEventListener('click', (e) => {
                const userCode = codeEditor.getValue();
                try{
                    const toSaveCode = codeEditor.getValue();
                    //console.log(toSaveCode);
                    console.log(codeEditorsLangs[0])
                    if(codeEditorsLangs[0] == "python"){
                        api.editor.saveAndRunPy(toSaveCode);
                    }
                    else if(codeEditorsLangs[0] == "javascript"){
                        api.editor.saveAndRunJS(toSaveCode);
                    }
                } catch (err) {
                    console.log(err);
                }
                //This is just to test if data can be saved as JSON (it can)
                // const jsonString = JSON.stringify(userCode);
                // console.log(jsonString);
            });
        } else {
            for(let i = executeCodeBtns.length - 1; i < executeCodeBtns.length; i++){
                const selectedTab = codeTabs.getTabLabel(codeTabs.selectedIndex);
                executeCodeBtns[i].addEventListener('click', (e) => {
                    try{
                        const toSaveCode = codeEditor.getValue();
                        console.log(toSaveCode);
                        console.log(codeEditorsLangs[i])
                        if(codeEditorsLangs[i] == "python"){
                            api.editor.saveAndRunPy(toSaveCode);
                        }
                        else if(codeEditorsLangs[0] == "javascript"){
                            api.editor.saveAndRunJS(toSaveCode);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        }
        const resetCodeBtns = document.querySelectorAll("#reset_code");
        for(let i = resetCodeBtns.length - 1; i < resetCodeBtns.length; i++){
            resetCodeBtns[i].addEventListener('click', () => {
                codeEditor.setValue(defaultCode);
            })
        }

        const languageBoxes = document.querySelectorAll("#language");
		for (let i = languageBoxes.length - 1; i < languageBoxes.length; i++) {
			languageBoxes[i].addEventListener("change", (e) => {
                const selectedTab = codeTabs.getTabLabel(codeTabs.selectedIndex);
                const splitTabLabelCode = selectedTab.split(' ');
                let idCode = `${splitTabLabelCode[1]}`;
                codeEditor.session.setMode("ace/mode/" + e.target.value);
                codeEditorsLangs[idCode-1] = e.target.value;
                const content = codeEditor.session.getValue();
                checkContentChange(content, e.target.value);
                console.log(codeEditorsLangs);
                console.log(codeEditors);
            });
		}

        const saveCodeBtns = document.querySelectorAll("#save");
        for(let i = 0; i < saveCodeBtns.length; i++){
            saveCodeBtns[i].addEventListener('click', (e) =>{
                let content = codeEditors[i].getValue()
                if(codeEditorsLangs[i] === "python")
                    api.editor.codeSave(content, `TAB${i+1}.py`)
                if(codeEditorsLangs[i] === "javascript")
                    api.editor.codeSave(content, `TAB${i+1}.js`)
                if(codeEditorsLangs[i] === "java")
                    api.editor.codeSave(content, `TAB${i+1}.java`)
                if(codeEditorsLangs[i] === "sql")
                    api.editor.codeSave(content, `TAB${i+1}.sql`)
            });
        }

        function checkContentChange(currentContent, targetLanguage){
            const defaultPrints = ['console.log("Hello World!");', 'print("Hello World!")', 'System.out.println("Hello World!");', 'select "Hello World!;']; 
            for(i = 0; i < defaultPrints.length; i++){
                //if it has default content, change the default content
                if(currentContent === defaultPrints[i]){
                    if(targetLanguage === 'python'){
                        currentContent = defaultPrints[1];
                    }
                    else if(targetLanguage === 'javascript'){
                        currentContent = defaultPrints[0];
                    }
                    else if(targetLanguage === 'java'){
                        currentContent = defaultPrints[2];
                    }
                    else if(targetLanguage === 'sql'){
                        currentContent = defaultPrints[3];
                    }
                }
            }
            codeEditor.session.setValue(currentContent);
        }

        //for auto save
        for(let i = numOfCodeTabs - 1; i < numOfCodeTabs; i++){
            codeEditor.getSession().on('change', () =>{
                changesMade = true;
            })
        }

        `//-------PLACEHOLDER CODE FOR THE BUTTONS ONLY WORKS FOR FIRST TAB---
        const executeCodeBtn = document.querySelector("#run_code");
        const resetCodeBtn = document.querySelector("#reset_code");
        // Events
        executeCodeBtn.addEventListener("click", () => {
            // Get input from the code editor
            const userCode = codeEditor.getValue();

            // Run the user code
            try {
                new Function(userCode)();
            } catch (err) {
                console.error(err);
            }
        });

        resetCodeBtn.addEventListener("click", () => {
            // Clear ace editor
            codeEditor.setValue(defaultCode);
        });`
        codeEditors.push(codeEditor);
        codeEditorsLangs.push("javascript");
    }
    createCodeEditor('TAB1');
    console.log(codeEditors);


    // // Events
    // executeCodeBtn.addEventListener("click", () => {
    //     // Get input from the code editor
    //     const userCode = codeEditor.getValue();

    //     // Run the user code
    //     try {
    //         new Function(userCode)();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // });

    // resetCodeBtn.addEventListener("click", () => {
    //     // Clear ace editor
    //     codeEditor.setValue(defaultCode);
    // });
    // -----------------------------------------------------------------

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

    //Dark Mode (Will be moved)
    var styles = `
    .ql-container {
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
    .ql-paint:after, .ql-save:after {
        color: white;
    }
    `

    validateDark();

    function codeEditorThemeSwitch() {
        if(dark){
            for(i = 0; i < codeEditors.length; i++){
                codeEditors[i].setTheme("ace/theme/clouds_midnight");
            }
        } else {
            for(i = 0; i < codeEditors.length; i++){
                codeEditors[i].setTheme("ace/theme/github");
            }
        }
	}

    function darkMode() {
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
        codeEditorThemeSwitch();
    })

    function validateDark(){
        if(dark){
            darkButton.children[0].innerHTML = "Light Mode";
        } else {
            darkButton.children[0].innerHTML = "Dark Mode";
        }
    }
});