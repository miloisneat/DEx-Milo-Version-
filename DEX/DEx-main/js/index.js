window.onload = () => {

    function validateLogin(usernameBox, passwordBox) {

        const username = usernameBox.value.trim();
        const password = passwordBox.value.trim();

        if (username.length > 0 && password.length > 0) {

            sessionStorage.setItem('username', username);

            window.location.href = 'main_hub.html';

        } else {

            alert('Enter a username and password');

        }
    }

    const usernameBox = document.getElementById('usernameInputBox');
    const passwordBox = document.getElementById('passwordInputBox');
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', (event) => {

        event.preventDefault();

        validateLogin(usernameBox, passwordBox);

    });

    passwordBox.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {

            validateLogin(usernameBox, passwordBox);

        }
    });
};