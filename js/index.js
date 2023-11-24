// let pageContent = document.querySelector("#site").innerHTML;
// //saving html page locally
// function saveIndex(){
//     localStorage.setItem("index", pageContent);
//     console.log("Saved html in storage!");
// };

// api.loadIndex((event, message) => {
//     console.log(message);
//     document.querySelector("#site").innerHTML = localStorage.getItem("index");
//     console.log("Loaded html from storage!")
// })

// window.api.loadIndex((event) => {
//     document.querySelector("#site").innerHTML = localStorage.getItem("index");
// });

window.addEventListener("DOMContentLoaded", (event) => {
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
	const open = document.querySelector("#open");
	const textTabs = document.querySelector("#text-editor-tabs");
	const codeTabs = document.querySelector("#code-editor-tabs");
	const codeEditors = [];
	const darkButton = document.querySelector("#darkMode");

	//if menu options that are chosen to be focused on
	for (var i = 0; i < menuBtns.length; i++) {
		menuBtns[i].addEventListener("click", (e) => {
			let option = e.target;
			let option_box = e.target.parentElement;
			option.classList.toggle("chosen");
			option_box.classList.toggle("tooltip");
			//if files is not the chosen option but it was previously chosen
			if ((option != files) & files.classList.contains("chosen")) {
				files.classList.toggle("chosen");
				files.parentElement.classList.toggle("tooltip");
			}
			//if settings is not the chosen option but it was previously chosen
			if ((option != settings) & settings.classList.contains("chosen")) {
				settings.classList.toggle("chosen");
				settings.parentElement.classList.toggle("tooltip");
			}
			//if account is not the chosen option but it was previously chosen
			if ((option != account) & account.classList.contains("chosen")) {
				account.classList.toggle("chosen");
				account.parentElement.classList.toggle("tooltip");
			}
			//if about is not the chosen option but it was previously chosen
			if ((option != about) & about.classList.contains("chosen")) {
				about.classList.toggle("chosen");
				about.parentElement.classList.toggle("tooltip");
			}
		});
	}

	//functions that deals with interactions between menu and main

	//if the focus is an element within main, remove highlights and close any open submenu
	main.addEventListener("click", (e) => {
		//reset all menu options to default looks
		for (let i = 0; i < menuBtns.length; i++) {
			const btn = menuBtns[i];
			if (btn.classList.contains("chosen")) {
				btn.classList.toggle("chosen");
				btn.parentElement.classList.toggle("tooltip");
			}
		}
		//give element within main its focus
		if (e.target.classList) e.target.classList.toggle("chosen");
	});

	//swapping editors position
	swap.addEventListener("click", () => {
		const main = document.querySelector(".main");
		if (main.classList.contains("main-swap")) {
			main.classList.remove("main-swap");
			resizeEditors(document.querySelector(".separator"));
		} else {
			main.classList.add("main-swap");
			resizeEditorsSwap(document.querySelector(".separator"));
		}
		files.classList.toggle("chosen");
		files.parentElement.classList.toggle("tooltip");
	});

	//opening files
	open.addEventListener("click", () => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = ".txt, .html, .css, .js, .cpp";
		input.onchange = () => {
			var reader = new FileReader();
			reader.onload = () => {
				var content = reader.result;
				let fileName = input.files[0].name;
				const splitName = fileName.split(".");
				const fileTitle = splitName[0];
				const fileType = splitName[1];
				if (fileType === "txt") {
					const selectedTab = textTabs.getTabLabel(
						textTabs.selectedIndex
					);
					const splitTabLabel = selectedTab.split(" ");
					let id = `${splitTabLabel[0]}${splitTabLabel[1]}`;

					const textEditor = document.querySelector(
						`#${id} .ql-editor`
					);
					textEditor.innerHTML = content;
					const t = document.querySelector("smart-tabs");
					//t.update(textTabs.selectedIndex, fileTitle)
					//textEditor.classList.add(`${id}`)
					textEditor.label = fileTitle;
				} else {
					const selectedTab = codeTabs.getTabLabel(
						codeTabs.selectedIndex
					);
					const splitTabLabel = selectedTab.split(" ");
					let id = `${splitTabLabel[1]}`;
					codeEditors[id - 1].setValue(content); // this just makes the first tab code editor value, need to implement new code tab first before updating this
				}
			};
			reader.readAsText(input.files[0]);
		};
		input.click();

		files.classList.toggle("chosen");
		files.parentElement.classList.toggle("tooltip");
	});

	//creating new tabs
	var numOfTextTabs = 1;
	var numOfCodeTabs = 1;
	var totalTextTabs = 0;
	var totalCodeTabs = 0;

	newText.addEventListener("click", () => {
		createNewTab("text");
		files.classList.toggle("chosen");
		files.parentElement.classList.toggle("tooltip");
	});
	newCode.addEventListener("click", () => {
		createNewTab("code");
		files.classList.toggle("chosen");
		files.parentElement.classList.toggle("tooltip");
	});
	newPair.addEventListener("click", () => {
		createNewTab("text");
		createNewTab("code");
		files.classList.toggle("chosen");
		files.parentElement.classList.toggle("tooltip");
	});

	//create new tab function
	function createNewTab(e) {
		const newTab = document.createElement("smart-tab-item");
		if (e === "text") {
			numOfTextTabs++;
			totalTextTabs++;
			newTab.label = `Tab ${numOfTextTabs}`; //label will be  changed to text file name once opened
			const newEditor = document.createElement("div");
			newEditor.id = `Tab${numOfTextTabs}`;
			newTab.appendChild(newEditor);
			textTabs.appendChild(newTab);
			textTabs.selectedIndex = totalTextTabs;
			createTextEditor(`Tab${numOfTextTabs}`);
		} else if (e === "code") {
			numOfCodeTabs++;
			totalCodeTabs++;
			newTab.label = `TAB ${numOfCodeTabs}`;
			// Adding nav bar
			let navToAdd = document.createElement("div");
			navToAdd.id = "codeNavBar";
			let runButton = document.createElement("button");
			let resetButton = document.createElement("button");
			let saveButton = document.createElement("button");
			runButton.classList.add("codeNavButton");
			resetButton.classList.add("codeNavButton");
			saveButton.classList.add("codeNavButton");
			runButton.id = "run_code";
			resetButton.id = "reset_code";
			saveButton.id = "save";
			runButton.innerHTML = "RUN";
			resetButton.innerHTML = "RESET";
			saveButton.innerHTML = "SAVE";
			navToAdd.appendChild(runButton);
			navToAdd.appendChild(resetButton);
			navToAdd.appendChild(saveButton);
			newTab.appendChild(navToAdd);
			//Adding container
			let codeContainer = document.createElement("div");
			codeContainer.classList.add("codeEditorContainer");
			newTab.appendChild(codeContainer);
			let codeEditPart = document.createElement("div");
			codeEditPart.classList.add("codeEditor");
			codeContainer.appendChild(codeEditPart);

			//--------------------BELOW IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//
			const newEditor = document.createElement("div");
			newEditor.classList.add("editor");
			newEditor.id = `TAB${numOfCodeTabs}`;
			codeContainer.appendChild(newEditor);
			//--------------------ABOVE IS WHERE THE CODE EDITOR WILL BE PLACED----------------------------------------------------------//
			codeTabs.appendChild(newTab);
			codeTabs.selectedIndex = totalCodeTabs;
			createCodeEditor(`TAB${numOfCodeTabs}`);
		}
	}

	textTabs.addEventListener("closing", function (event) {
		totalTextTabs--;
		// event handling code goes here.
	});
	codeTabs.addEventListener("closing", function (event) {
		totalCodeTabs--;
		// event handling code goes here.
	});

	//Adding more Font styles

	let Font = Quill.import("formats/font");
	// We do not add Sans Serif since it is the default
	Font.whitelist = [
		"sans-serif",
		"serif",
		"monospace",
		"inconsolata",
		"roboto",
		"mirza",
		"arial",
		"verdana",
	];
	Quill.register(Font, true);

	fontOptions = [
		{
			font: [
				"sans-serif",
				"serif",
				"monospace",
				"inconsolata",
				"roboto",
				"mirza",
				"arial",
				"verdana",
			],
		},
	];

	// -----------------------------------------------------------------
	//quill text editor
	function createTextEditor(id) {
		var quill = new Quill(`#${id}`, {
			modules: {
				toolbar: [
					[{ header: [false, 6, 5, 4, 3, 2, 1] }],
					fontOptions,
					[{ color: [] }, { background: [] }],
					["bold", "italic", "underline"],
					[{ script: "sub" }, { script: "super" }],
					[{ align: [] }],
					[{ list: "ordered" }, { list: "bullet" }],
					["image"],
					["paint"],
					["save"],
				],
			},
			theme: "snow",
		});

		//paint window button
		const paint = document.querySelectorAll(".ql-paint");
		for (let i = paint.length - 1; i < paint.length; i++) {
			paint[i].addEventListener("click", () => {
				api.paint_window.paint();
			});
		}

		const save = document.querySelectorAll(".ql-save");
		for (let i = save.length - 1; i < save.length; i++) {
			save[i].addEventListener("click", (e) => {
				//const selectedTab = textTabs.getTabLabel(textTabs.selectedIndex);
				//const selectedEditor = document.querySelector(`.Tab1`);
				//selectedEditor.innerHTML = 'hi'

				const selectedTab = textTabs.getTabLabel(
					textTabs.selectedIndex
				);
				const splitTabLabel = selectedTab.split(" ");
				let id = `${splitTabLabel[0]}${splitTabLabel[1]}`;

				const textEditor = document.querySelector(`#${id} .ql-editor`);
				var content = textEditor.innerHTML;
				//Adding saving for code editor
				const selectedTabCode = codeTabs.getTabLabel(
					codeTabs.selectedIndex
				);
				const splitTabLabelCode = selectedTabCode.split(" ");
				let idCode = `${splitTabLabelCode[1]}`;
				const codeEditorToSave =
					document.querySelector(`.ace_text-input`);
				var codeContent = codeEditors[idCode - 1].getValue();
				console.log(codeContent);
				`if(textEditor.label != null){
                    api.editor.textSave(content,textEditor.label);
                }`;
				api.editor.codeSave(codeContent, codeEditorToSave.label);
			});
		}
	}
	createTextEditor("Tab1");

	// -----------------------------------------------------------------
	// -----------------------------------------------------------------
	//ace code editor
	// const executeCodeBtn = document.querySelector("#run_code");
	// const resetCodeBtn = document.querySelector("#reset_code");

	// // Setup Ace
	// let codeEditor = ace.edit("editor");
	// let defaultCode = 'console.log("Hello World!");';
	// // Configure Ace

	// // Theme
	// codeEditor.setTheme("ace/theme/dracula");

	// // Set language
	// codeEditor.session.setMode("ace/mode/javascript");

	// // Set Options
	// codeEditor.setOptions({
	//     enableBasicAutocompletion: true,
	//     enableLiveAutocompletion: true,
	// });

	// // Set Default Code
	// codeEditor.setValue(defaultCode);

	//----------------------------Making a function for creating code editors
	function createCodeEditor(id) {
		// Setup Ace
		let codeEditor = ace.edit(id);
		let defaultCode = 'console.log("Hello World!");';
		// Configure Ace

		// Theme
		if (dark) {
			codeEditor.setTheme("ace/theme/dracula");
		} else {
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
		if (executeCodeBtns.length == 1) {
			executeCodeBtns[0].addEventListener("click", (e) => {
				const userCode = codeEditor.getValue();
				try {
					new Function(userCode)();
				} catch (err) {
					console.log(err);
				}
			});
		} else {
			for (
				let i = executeCodeBtns.length - 1;
				i < executeCodeBtns.length;
				i++
			) {
				const selectedTab = codeTabs.getTabLabel(
					codeTabs.selectedIndex
				);
				executeCodeBtns[i].addEventListener("click", (e) => {
					const userCode = codeEditor.getValue();
					try {
						new Function(userCode)();
					} catch (err) {
						console.log(err);
					}
				});
			}
		}
		const resetCodeBtns = document.querySelectorAll("#reset_code");
		for (let i = resetCodeBtns.length - 1; i < resetCodeBtns.length; i++) {
			resetCodeBtns[i].addEventListener("click", () => {
				codeEditor.setValue(defaultCode);
			});
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
        });`;
		codeEditors.push(codeEditor);
	}
	createCodeEditor("TAB1");
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
	function resizeEditors(resizeBar) {
		const first = editors[0];
		const second = editors[1];
		var mousedown;
		resizeBar.onmousedown = onMouseDown;

		function onMouseDown(e) {
			mousedown = {
				e,
				offsetLeft: resizeBar.offsetLeft,
				offsetTop: resizeBar.offsetTop,
				firstWidth: first.offsetWidth,
				secondWidth: second.offsetWidth,
			};
			document.onmousemove = onMouseMove;
			document.onmouseup = () => {
				document.onmousemove = document.onmouseup = null;
			};
		}

		function onMouseMove(e) {
			var delta = { x: e.clientX - mousedown.e.clientX };
			delta.x = Math.min(
				Math.max(delta.x, -mousedown.firstWidth),
				mousedown.secondWidth
			);
			resizeBar.style.left = mousedown.offsetLeft + delta.x + "px";
			first.style.width = mousedown.firstWidth + delta.x + "px";
			second.style.width = mousedown.secondWidth - delta.x + "px";
		}
	}

	//function only used after swapping editors
	function resizeEditorsSwap(resizeBar) {
		const first = editors[0];
		const second = editors[1];
		var mousedown;
		resizeBar.onmousedown = onMouseDown;

		function onMouseDown(e) {
			mousedown = {
				e,
				offsetLeft: resizeBar.offsetLeft,
				offsetTop: resizeBar.offsetTop,
				firstWidth: first.offsetWidth,
				secondWidth: second.offsetWidth,
			};
			document.onmousemove = onMouseMove;
			document.onmouseup = () => {
				document.onmousemove = document.onmouseup = null;
			};
		}

		function onMouseMove(e) {
			var delta = { x: e.clientX - mousedown.e.clientX };
			delta.x = Math.min(
				Math.max(delta.x, -mousedown.firstWidth),
				mousedown.secondWidth
			);
			resizeBar.style.left = mousedown.offsetLeft + delta.x + "px";
			first.style.width = mousedown.firstWidth - delta.x + "px";
			second.style.width = mousedown.secondWidth + delta.x + "px";
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
    `;

	validateDark();

	function darkMode() {
		let codeEditor = document.querySelector(".editor");
		if (!dark) {
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

	darkButton.addEventListener("click", () => {
		darkMode();
	});

	function validateDark() {
		if (dark) {
			darkButton.children[0].innerHTML = "Light Mode";
		} else {
			darkButton.children[0].innerHTML = "Dark Mode";
		}
	}

	// saving and loading htmls
	let pageContent = document.querySelector("#showContent").innerHTML;
	//save html info locally
	function storeHTMLInfo() {
		localStorage.setItem("indexContent", pageContent);
		console.log("Saved html in storage!");
	}
	function loadHTMLInfo(contentName) {
		// pageContent =
	}
});