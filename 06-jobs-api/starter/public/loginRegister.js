// You will need to create loginRegister.js, register.js, login.js, jobs.js, and addEdit.js files, all in the public directory.

// The loginRegister.js module is as follows:
import { inputEnabled, setDiv } from './index.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
    loginRegisterDiv = document.getElementById('logon-register');
    const login = document.getElementById('logon');
    const register = document.getElementById('register');

    loginRegisterDiv.addEventListener('click', (e) => {
        if (inputEnabled && e.target.nodeName === 'BUTTON') {
            if (e.target === login) {
                showLogin();
            } else if (e.target === register) {
                showRegister();
            }
        }
    });
};

export const showLoginRegister = () => {
    setDiv(loginRegisterDiv);
};
