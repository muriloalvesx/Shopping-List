document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginResult = document.getElementById('loginResult');

    try {
        const response = await fetch('https://listasdecompras-api.up.railway.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', login);
            window.location.href = 'lists.html';
        } else if (response.status === 401) {
            loginResult.innerHTML = `<p>API return</p>`;
            loginResult.style.color = 'red';
        } else {
            const errorData = await response.json();
            loginResult.innerHTML = `<p>Erro: ${errorData.message}</p>`;
            loginResult.style.color = 'red';
        }
    } catch (error) {
        loginResult.innerHTML = `<p>Erro de rede: ${error.message}</p>`;
        loginResult.style.color = 'red';
    }
});
