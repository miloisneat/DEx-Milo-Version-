/************************************************************************
 *
 * This file stores functions called in the main.
 * Helps with keeping things as organized as possible lol.
 *
 ***********************************************************************/


/**
 * Displays the user's 'entry' mode on the status bar.
 * @param {string} mode - Entry mode you wish to display. "n" = Normal, "i" = Insert
 */
export function setStatusBar(mode) {
    const statusOutput = document.getElementById('statusBarOutput');
    if (mode === "n") {
	statusOutput.textContent = ' --NORMAL-- ';
    }
    else if (mode === "i") {
	statusOutput.textContent = ' --INSERT-- ';
    }
    else if (mode === "Window") {
	statusOutput.textContent = ' --WINDOW-- ';
    }
}

/**
 * Focuses on the first <input> element in the document, if one exists.
 * @param {array} fieldList - Input Element array.
 */
export function focusFirstField(fieldList) {
    if (fieldList.length > 0) {
	fieldList[0].focus();
    }
}

/**
 * Moves focus to the next field in the form when a specific key is
 * pressed.
 * @param {string} key - The key input from the user.
 * @param {number} indexOfElement - The current index of the focused field.
 * @param {HTMLElement[]} focusableElements - An array of focusable form elements.
 */
export function nextField(key, indexOfElement, focusableElements) {
    if (key === "j") {
	if (indexOfElement < focusableElements.length - 1) {
	    focusableElements[indexOfElement + 1].focus();
	}
    }
}

/**
 * Moves focus to the previous field in the form when a specific key is
 * pressed.
 * @param {string} keyPress - The key input from the user.
 * @param {number} indexOfElement - The current index of the focused field.
 * @param {HTMLElement[]} focusableElements - An array of focusable form elements.
 */
export function previousField(key, indexOfElement, focusableElements) {
    if (key === "k") {
        if (indexOfElement > 0) {
            focusableElements[indexOfElement - 1].focus();
        }
    }
}

export function createListFromValues(list) {
    let values = [];
    for (let i = 0; i < list.length; i++) {
        values.push(list[i].value);
    }

    // Join using pipe delimiter
    const content = values.join("|");

    // Create text file
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "data.txt";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function displayFunctionalities(mode) {
    const container = document.getElementById('modeOptions');
    if (mode === "n") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;i&gt;&thinsp;Insert&thinsp;</p>
            <p class="functionality">&lt;j&gt;&thinsp;Next Field&thinsp;</p>
            <p class="functionality">&lt;k&gt;&thinsp;Previous Field&thinsp;</p>
            <p class="functionality">&lt;d&gt;&thinsp;Delete&thinsp;</p>
            <p class="functionality">&lt;c&gt;&thinsp;Change&thinsp;</p>
            <p class="functionality">&lt;F1&gt;&thinsp;Forms&thinsp;</p>
            <p class="functionality">&lt;F10&gt;&thinsp;Download&thinsp;</p>
            <p class="functionality">&lt;F11&gt;&thinsp;Save and Close&thinsp;</p>
        `;
    }
    else if (mode === "i") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;ESC&gt;&thinsp;Exit Mode&thinsp;</p>
            <p class="functionality">&lt;ENTER&gt;&thinsp;Next Field&thinsp;</p>
        `;
    }
    else if (mode === "Window") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;ESC&gt;&thinsp;Close&thinsp;</p>
            <p class="functionality">&lt;j&gt;&thinsp;Next&thinsp;</p>
            <p class="functionality">&lt;k&gt;&thinsp;Previous&thinsp;</p>
            <p class="functionality">&lt;ENTER&gt;&thinsp;Confirm&thinsp;</p>
        `;
    }
}

export function saveAndClose() {
    document.location.href = "main_hub.html";
}

export function displayFormsPanel(key, schema = null) {
    const formPanel = document.getElementById('centerPanel');

    // ESC = close panel immediately and stop
    if (key === "Escape") {
        formPanel.replaceChildren();
        return;
    }

    // Panel UI
    formPanel.innerHTML = `
        <div id="formPanel">
            <div class="panelHeader">
                <span>Saved Forms</span>
            </div>
            <div id="formsList"></div>
        </div>
    `;

    const forms = document.getElementById('formsList');

    // Only render schema if it exists
    if (schema && schema.formName) {
        forms.textContent = schema.formName;
    } else {
        forms.textContent = "No form loaded";
    }
}
