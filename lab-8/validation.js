function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function validateForm() {
    var firstName = sanitizeInput(document.getElementById('firstName').value);
    var lastName = sanitizeInput(document.getElementById('lastName').value);
    var email = sanitizeInput(document.getElementById('email').value);
    var password = sanitizeInput(document.getElementById('password').value);
    var confirmPassword = sanitizeInput(document.getElementById('confirmPassword').value);

    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields');
        return false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    alert('Form submitted successfully');
    return true;
}

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    validateForm();
});
