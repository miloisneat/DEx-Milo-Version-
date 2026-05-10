window.onload = () => {

    const operatorID = sessionStorage.getItem('username'); //changed this to username so it doesn't send me back to index //
    if (!operatorID) {
        window.location.href = 'index.html';
    }

    const output = document.getElementById('operatorID');
    output.textContent = `Operator: ${operatorID.toUpperCase()}`;

    const signOutBtn = document.getElementById('signOutBtn');
    signOutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to sign out?')) {
            sessionStorage.removeItem('operatorID');
            localStorage.removeItem('formSchema');
            window.location.href = 'index.html';
        }
    });

    document.getElementById('formBuilderBtn').addEventListener('click', () => {
        window.location.href = 'form_builder.html';
    });

    document.getElementById('inputRecordsBtn').addEventListener('click', () => {
        window.location.href = 'input_records.html';
    });

    document.getElementById('verifyRecordsBtn').addEventListener('click', () => {
        window.location.href = 'verify_records.html';
    });
    
    document.getElementById('viewerBtn').addEventListener('click', () => {
        window.location.href = 'viewer.html';
    });
};
