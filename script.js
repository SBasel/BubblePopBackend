document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const UserName = document.getElementById('registerUserName').value;
    const Email = document.getElementById('registerEmail').value;
    const Passwort = document.getElementById('registerPassword').value;

    fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, Email, Passwort }),
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const Email = document.getElementById('loginEmail').value;
    const Passwort = document.getElementById('loginPassword').value;

    fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Passwort}),
        credentials: 'include', 
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('http://localhost:3030/logout', { method: 'POST' })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const Email = document.getElementById('deleteEmail').value;

    fetch('http://localhost:3030/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email }),
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});
