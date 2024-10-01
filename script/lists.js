document.addEventListener('DOMContentLoaded', fetchLists);

const token = localStorage.getItem('token');
const usuario = localStorage.getItem('username');

// Função para buscar as listas criadas pelo usuário
async function fetchLists() {
    if (!token) {
        alert('Você precisa estar logado!');
        window.location.href = 'index.html'; // Redireciona para a página de login
    }
    
    // Se o nome do usuário estiver disponível, exibe na página
    if (userName) {
        document.getElementById('userName').textContent = usuario;
    }

    try {
        const response = await fetch(`https://listasdetarefas-api.up.railway.app/api/shopping?username=${usuario}`, { 
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
     }
    });

        if (response.ok) {
            const lists = await response.json();
            renderLists(lists);  // Renderiza as listas na página
        } else {
            alert('Erro ao buscar listas. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar com a API. Verifique sua conexão.');
    }
}

// Função para renderizar as listas na página
function renderLists(lists) {
    const shoppingLists = document.getElementById('shoppingLists');
    shoppingLists.innerHTML = ''; // Limpa a lista antes de renderizar

    if (lists.length === 0) {
        shoppingLists.innerHTML = '<p style="color: #fff; text-align: center; font-size: 25px">Nenhuma lista encontrada</p>';
        return;
    }

    lists.forEach(list => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong style="margin-left: 20px;">${list.nome}</strong>
            <div style="display: flex; gap: 30px;">
            <i class="fas fa-eye" onclick="viewList(${list.id})"></i>
            <i class="fas fa-trash" onclick="deleteList(${list.id})"></i>
            </div>
            `;
        shoppingLists.appendChild(listItem);
    });
}

// Função para visualizar uma lista (redireciona para uma página de detalhes da lista)
function viewList(listId) {
    window.location.href = `viewlist.html?listId=${listId}`;
}

// Função para deletar uma lista
async function deleteList(listId) {
    const token = localStorage.getItem('token'); // Pega o token de autenticação

    if (!token) {
        alert("Você precisa estar logado!");
        return;
    }

    if (!confirm("Você tem certeza que deseja deletar essa lista?")) {
        return;
    }

    try {
        const response = await fetch(`https://listasdetarefas-api.up.railway.app/api/shopping/${listId}`, {  // URL da API para deletar listas
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            fetchLists();  // Atualiza as listas após a exclusão
        } else {
            alert('Erro ao deletar lista. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar com a API. Verifique sua conexão.');
    }
}

// Função para realizar logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';  // Redireciona para a página de login
}

// Carrega as listas ao carregar a página
document.addEventListener('DOMContentLoaded', fetchLists);
