document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('http://localhost:3000/logout', { method: 'POST' })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('deleteEmail').value;

    fetch('http://localhost:3000/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => document.getElementById('response').innerText = JSON.stringify(data))
    .catch(error => console.error('Error:', error));
});
