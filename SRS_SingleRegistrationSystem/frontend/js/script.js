import { handleLogin } from './login.js';
import { handleRegistration } from './register.js';
import { handleRegisterRedirect } from './register.js';

document.addEventListener("DOMContentLoaded", function() {
    handleLogin();
    handleRegistration();
    handleRegisterRedirect();
});
