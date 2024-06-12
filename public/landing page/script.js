// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Login form submitted!');
    });

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Signup form submitted!');
    });
});