import * as fnEngine from './functions_editor.js';

window.onload = function() {

    const returnBtn = document.getElementById('returnBtnIR');

        returnBtn.addEventListener('click', () => {
        window.location.href = "main_hub.html";
    });

    // Get all saved forms from localStorage
    const savedForms = JSON.parse(localStorage.getItem('forms')) || [];

    // If there are no saved forms, send the user back to the main hub
    if (savedForms.length === 0) {
        alert("No forms detected. \n Please create a form first.");
        window.location.href = "main_hub.html";
        return;
    }

    // Get HTML elements
    const formSelector = document.getElementById('formSelector');
    const recordForm = document.getElementById('recordForm');
    const formTitle = document.getElementById('formTitle');

    // Page Title before a form is selected
    formTitle.textContent = "Input Records";

    // This array will hold all input/select elements for navigation
    let fieldList = [];

    // Initial mode: Normal
    let mode = "n";
    fnEngine.setStatusBar(mode);
    fnEngine.displayFunctionalities(mode);

    // Add every saved form from Form Builder into the dropdown
    savedForms.forEach(form => {
        const option = document.createElement('option');
        option.value = form.id;
        option.textContent = form.formName;
        formSelector.appendChild(option);
    });

    // When a form is selected from the dropdown
    formSelector.addEventListener('change', function() {
        const selectedFormId = Number(formSelector.value);

        const schema = savedForms.find(form => form.id === selectedFormId);

        // If the default option is selected, clear the form area
        if (!schema) {
            formTitle.textContent = "Input Records";
            recordForm.innerHTML = "";
            fieldList = [];
            localStorage.removeItem('selectedFormId');
            return;
        }

        // Save selected form ID
        localStorage.setItem('selectedFormId', selectedFormId);

        // Load the selected form
        loadForm(schema);
    });

    function loadForm(schema) {

        // Clear previous form fields
        recordForm.innerHTML = "";

        // Clear previous field navigation list
        fieldList = [];

        // Page Title = Form Title
        formTitle.textContent = schema.formName;

        // Generate fields dynamically
        if (schema && schema.fields.length > 0) {
            schema.fields.forEach(field => {

                // Label
                const labelEl = document.createElement('label');
                labelEl.textContent = field.label + ":";
                labelEl.setAttribute('for', field.name);

                // Input element
                let inputEl;

                if (field.type === 'select') {
                    inputEl = document.createElement('select');
                    inputEl.id = field.name;

                    // Add each dropdown option
                    field.options.forEach(opt => {
                        const optionEl = document.createElement('option');
                        optionEl.value = opt;
                        optionEl.textContent = opt;
                        inputEl.appendChild(optionEl);
                    });
                } 
                else {
                    inputEl = document.createElement('input');
                    inputEl.type = field.type === 'number' ? 'number' : 'text';
                    inputEl.id = field.name;
                }

                // Append to form
                recordForm.appendChild(labelEl);
                recordForm.appendChild(inputEl);
                recordForm.appendChild(document.createElement('br'));
                recordForm.appendChild(document.createElement('br'));

                // Add to field list for navigation
                fieldList.push(inputEl);
            });
        }

        // Focus on the first field
        fnEngine.focusFirstField(fieldList);

        // Set back to normal mode
        mode = "n";
        fnEngine.setStatusBar(mode);
        fnEngine.displayFunctionalities(mode);
    }

    // Keydown listener
    document.addEventListener('keydown', function(keyPress) {

        // Do not run form keyboard controls while using the form selector dropdown
        if (document.activeElement === formSelector) {
            return;
        }

        // If no form has been chosen yet, do not run form keyboard controls
        if (fieldList.length === 0) {
            return;
        }

        const focusedField = document.activeElement;
        const focusedFieldIndex = fieldList.indexOf(focusedField);
        const key = keyPress.key;

        if (mode === "n") {
            // Block typing
            keyPress.preventDefault();

            // Navigation
            fnEngine.nextField(key, focusedFieldIndex, fieldList);
            fnEngine.previousField(key, focusedFieldIndex, fieldList);

            // Motions
            if (key === "d") {                  // Delete field value: d
                focusedField.value = "";
            }
            else if (key === "c") {             // Change field (c) -> enters insert mode
                focusedField.value = "";
                mode = "i";
            }
            else if (key === "F1") {
                const selectedFormId = Number(formSelector.value);
                const schema = savedForms.find(form => form.id === selectedFormId);

                fnEngine.displayFormsPanel(null, schema);
                mode = "Window";
            }
            else if (key === "F10") {           // Downloads file
                fnEngine.createListFromValues(fieldList);
            }
            else if (key === "F11") {           // Save and Close
                fnEngine.saveAndClose();
            }
            else if (key === "i") {             // Enter insert mode
                mode = "i";
            }
        }

        if (mode === "i") {
            fnEngine.setStatusBar(mode);
            fnEngine.displayFunctionalities(mode);

            if (key === "Escape") {
                mode = "n";
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
            }
            else if (key === "Enter") {
                if (focusedFieldIndex < fieldList.length - 1) {
                    fieldList[focusedFieldIndex + 1].focus();
                }
            }
        }

        if (mode === "Window") {
            keyPress.preventDefault();
            fnEngine.displayFunctionalities(mode);
            fnEngine.setStatusBar(mode);
            
            if (key === "Escape") {
                fnEngine.displayFormsPanel(key);
                mode = "n";
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
            }
        }

        
    });
};