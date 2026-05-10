const formsDropdown = document.getElementById("forms");
const returnBtn = document.getElementById("returnBtn");
const formPreview = document.getElementById("formPreview")


// get saved forms from localStorage
const savedForms = JSON.parse(localStorage.getItem("forms")) || [];

// if no forms exist
if (savedForms.length === 0) {
    alert("No forms found. Please create a form first.");
    window.location.href = "main_hub.html"
}

// add each saved form to the dropdown
savedForms.forEach(form => {
    const option = document.createElement("option");
    option.value = form.id;
    option.textContent = form.formName;
    formsDropdown.appendChild(option);
});

// when a form is selected, display it
formsDropdown.addEventListener("change", () => {
    const selectedFormId = Number(formsDropdown.value);

    const selectedForm = savedForms.find(form => form.id === selectedFormId);

    if (!selectedForm) {
       formPreview.innerHTML = "";
        return;
    }
    displayForm(selectedForm)

});

//Display selected form
function displayForm(form) {
    formPreview.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = form.formName;
    formPreview.appendChild(title);

    form.fields.forEach(field => {
        const fieldBox = document.createElement("div");
        fieldBox.className = "previewField";

        const label = document.createElement("label");
        label.textContent = field.label + ":";

        let input;

        if (field.type === "select") {
            input = document.createElement("select");

            field.options.forEach(optionText => {
                const option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                input.appendChild(option);

            });
        } else {
            input = document.createElement("input");
            input.type = field.type === "number" ? "number" : "text";
        }

        //viewer only previews the forms. fields are disabled
        input.disabled = true;

        fieldBox.appendChild(label);
        fieldBox.appendChild(input);

        formPreview.appendChild(fieldBox);
    })
}

// return button
returnBtn.addEventListener("click", () => {
    window.location.href = "main_hub.html";
});


/* This are hard coded forms
const formsDropdown = document.getElementById("forms");

const forms = [
    "Employee Form",
    "Inspection Form",
    "Request Form"
];

forms.forEach(formName => {
    const option = document.createElement("option");
    option.value = formName;
    option.textContent = formName;
    formsDropdown.appendChild(option);
});

const returnBtn = document.getElementById("returnBtn");

returnBtn.addEventListener("click", () => {
    window.location.href = "main_hub.html";
});
*/
