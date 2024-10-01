document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://listasdetarefas-api.up.railway.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
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
