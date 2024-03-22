async function handleLoginSubmit() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
}

async function handleCreateAccountClick() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const checkResponse = await fetch('/api/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        if (!checkResponse.ok) {
            const errorMessage = await checkResponse.text();
            alert(`Failed to create account: ${errorMessage}`);
            return;
        }
        const createResponse = await fetch('/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (createResponse.ok) {
            alert('Account created successfully. You can now log in.');
        } else {
            const errorMessage = await createResponse.text();
            alert(`Failed to create account: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error creating account:', error);
        alert('An error occurred while creating your account. Please try again later.');
    }
}
