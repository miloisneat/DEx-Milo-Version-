const formsDropdown = document.getElementById("forms");
const returnBtn = document.getElementById("returnBtn");

// get saved forms from localStorage
const savedForms = JSON.parse(localStorage.getItem("forms")) || [];

// add each saved form to the dropdown
savedForms.forEach(form => {
    const option = document.createElement("option");
    option.value = form.id;
    option.textContent = form.formName;
    formsDropdown.appendChild(option);
});

// when a form is selected
formsDropdown.addEventListener("change", () => {
    const selectedFormId = Number(formsDropdown.value);

    const selectedForm = savedForms.find(form => form.id === selectedFormId);

    if (!selectedForm) {
        console.log("No form selected");
        return;
    }

    localStorage.setItem("selectedFormId", selectedFormId);
    console.log(selectedForm);
});

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