// Retrieve Elements
const executeCodeBtn = document.querySelector("#run_code");
const resetCodeBtn = document.querySelector("#reset_code");

// Setup Ace
let codeEditor = ace.edit("editor");
let defaultCode = 'console.log("Hello World!");';
// Configure Ace

// Theme
codeEditor.setTheme("ace/theme/dracula");

// Set language
codeEditor.session.setMode("ace/mode/javascript");

// Set Options
codeEditor.setOptions({
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
});

// Set Default Code
codeEditor.setValue(defaultCode);

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
});
