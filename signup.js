document.addEventListener('DOMContentLoaded', function () {
    var signUpForm = document.getElementById('submitForm');
    var successMessage = document.getElementById('successMessage');
    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var password = passwordInput.value;
        var validationErrors = getValidationErrors(password);

        if (validationErrors.length > 0) {
            passwordError.innerHTML = '<p style="text-align: left; padding-left: 0; margin-left: 0; margin-bottom: 0;">Password should include:<br><ul style="list-style-type: disc; text-align: left; padding-left: 0; margin-left: 10px;"><li>' + validationErrors.join('</li><li>') + '</li></ul></p>';
            return;
        }

        passwordError.textContent = '';

        successMessage.style.display = 'block';

        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);
    });

    function getValidationErrors(password) {
        var errors = [];

        if (password.length < 8) {
            errors.push('At least 8 characters');
        }

        if (!/\d/.test(password)) {
            errors.push('Number');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('Uppercase letter');
        }

        if (!/[a-z]/.test(password)) {
            errors.push('Lowercase letter');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Symbol (!, @, #, $, %, ^, &, *, (, ), , ., ?, ", :, {, }, |, <, >, ] )');
        }

        return errors;
    }
});
