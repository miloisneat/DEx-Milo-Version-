function generateName(label) {
    return label.toLowerCase().replace(/\s+/g, "");
}
/* commenting out since schema is now created when clicking save button
let schema = {
    formName: "",
    fields: []
};
*/

document.getElementById('addField').addEventListener('click', () => {
    const container = document.getElementById('fieldsContainer');

    const row = document.createElement('div');
    row.className = "field-row";

    row.innerHTML = `
        <input class="label" placeholder="Field Label">

        <select class="type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
        </select>

        <input class="options" placeholder="Options (A,B,C)">
    `;

    container.appendChild(row);
});

document.getElementById('saveForm').addEventListener('click', () => {
    const formName = document.getElementById('formName').value;
    const rows = document.querySelectorAll('.field-row');

    if (!formName) {
        alert("Please enter a form name");
        return;
    }

    let schema = {
        formName: formName,
        fields: []
    };

    rows.forEach(row => {
        const label = row.querySelector('.label').value;
        const type = row.querySelector('.type').value;
        const optionsRaw = row.querySelector('.options').value;

        if (!label) return;

        let field = {
            label: label,
            name: generateName(label),
            type: type,
            required: false
        };

        if (type === 'select') {
            field.options = optionsRaw
            .split(',')
            .map(o => o.trim())
            .filter(o => o);
        }

        schema.fields.push(field);
    });


    // start with an empty array

    let savedForms = JSON.parse(localStorage.getItem('forms')) || []

    // each form will have a unique ID

    schema.id = Date.now();
    schema.createdAt = new Date().toLocaleString();

    // add a new form to the array
    savedForms.push(schema);

    //save all forms back to local storage
    localStorage.setItem('forms', JSON.stringify(savedForms));

    
    alert("Form saved!");
    console.log(schema);
    document.location.href = "main_hub.html";

    // old way of storing things. this only saves one form at a time
    // and when saving a new one, it replaces it.
    /*
    localStorage.setItem('formSchema', JSON.stringify(schema));

    alert("Form saved!");
    console.log(schema);
    document.location.href = "main_hub.html";
    */
});
