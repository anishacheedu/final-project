async function registerUser() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const confirmPasswordInput = document.getElementById("confirmpassword").value;
    const firstNameInput = document.getElementById("firstname").value;
    const lastNameInput = document.getElementById("lastname").value;
    const emailInput = document.getElementById("email").value;
    const phoneInput = document.getElementById("phone").value;

    if (!usernameInput || !passwordInput || !confirmPasswordInput || !firstNameInput || !lastNameInput || !emailInput || !phoneInput) {
        alert('Please fill in all fields.');
        return;
    }

    if (passwordInput !== confirmPasswordInput) {
        alert('Passwords do not match.');
        return;
    }

    const userData = {
        username: usernameInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phone: phoneInput,
        email: emailInput
    };

    try {
        const response = await fetch('http://localhost:3000/signupUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (result.success) {
            alert('Registration successful! Please log in.');
            // Redirect to login page or handle accordingly
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

async function addSession(userID) {
    console.log("inside addSession");

    const sessionData = { UserID: userID };

    try {
        const response = await fetch('http://localhost:3000/addToUserSessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        });

        const result = await response.json();

        if (!result.success) {
            console.error('Error adding to UserSessions');
        } else {
            window.location.href = "../frontend/mainDashboard.html";
        }
    } catch (error) {
        console.error('Error during addSession:', error);
    }
}

async function authenticateUser() {
    const loginUsernameInput = document.getElementById('loginusername').value;
    const loginPasswordInput = document.getElementById('loginpassword').value;

    if (!loginUsernameInput || !loginPasswordInput) {
        console.error('Login form elements not found.');
        return;
    }

    const loginData = {
        username: loginUsernameInput,
        password: loginPasswordInput
    };

    try {
        const response = await fetch('http://localhost:3000/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            alert('Login successful! UserID: ' + result.UserID);
            await addSession(result.UserID);
        } else {
            console.log('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        console.log('An error occurred during login. Please check the console for more details.');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupButton").addEventListener("click", function () {
        console.log("inside");
        registerUser();
    });

    document.getElementById("loginButton").addEventListener("click", function (event) {
        event.preventDefault();  // Prevent default form submission
        authenticateUser();
    });
});
