document.addEventListener('DOMContentLoaded', fetchListDetails);

const token = localStorage.getItem('token'); // Pega o token de autenticação
const login = localStorage.getItem('username');

// Função para obter o ID da lista a partir da URL
function getListIdFromURL() {
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = 'index.html';  // Redireciona para a página de login
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const listId = urlParams.get('listId'); // Obtém o parâmetro 'listId'
    return listId ? Number(listId) : null; // Retorna o ID como número ou null se não existir
}

// Função para buscar os detalhes da lista
async function fetchListDetails() {
    const listId = getListIdFromURL();
    if (!listId) {
        alert("Nenhuma lista selecionada ou ID inválido!");
        return;
    }

    try {
        const response = await fetch(`https://listasdecompras-api.up.railway.app/api/shopping/${listId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const listDetails = await response.json();
            renderListDetails(listDetails); // Renderiza os detalhes da lista
        } else {
            alert('Erro ao buscar detalhes da lista. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar com a API. Verifique sua conexão.');
    }
}

function renderListDetails(listDetails) {
    const listDetailsDiv = document.getElementById('listDetails');
    listDetailsDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-arrow-left" onclick="goBack()" style="cursor: pointer; font-size: 24px; color: #fff; position: absolute; margin-left: -300px"></i>
            <h2 style="font-size: 35px; color: #fff; margin-bottom: 25px;">${listDetails.nome}</h2>
        </div>
        <div class="list-container">
            <ul class="item-list">
                ${listDetails.itens.map((item, index) => `
                    <li class="item">
                        ${item}
                        <i class="fas fa-trash" onclick="removeItem(${index})"></i>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function goBack() {
    window.location.href = 'lists.html'; // Redireciona para lists.html
}

// Função para adicionar um novo item à lista
document.getElementById('addItemForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Impede o recarregamento da página

    const newItem = document.getElementById('newItem').value.trim();
    if (!newItem) return;

    const listId = getListIdFromURL();
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`https://listasdecompras-api.up.railway.app/api/shopping/${listId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nome: newItem })
        });

        if (response.ok) {
            fetchListDetails();  // Atualiza a lista na página
        } else {
            alert('Erro ao adicionar item.');
        }
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        alert('Erro ao conectar com a API.');
    }

    document.getElementById('newItem').value = '';  // Limpa o campo
});

// Função para remover um item da lista
async function removeItem(index) {
    const listId = getListIdFromURL();
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`https://listasdecompras-api.up.railway.app/api/shopping/${listId}/items/${index}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            fetchListDetails();  // Atualiza a lista na página
        } else {
            alert('Erro ao remover item.');
        }
    } catch (error) {
        console.error('Erro ao remover item:', error);
        alert('Erro ao conectar com a API.');
    }

}
