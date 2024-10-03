document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    itemInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addItem();
            event.preventDefault();
        }
    });
    addItem();
});

const token = localStorage.getItem('token');
let items = [];

// Função para adicionar item à lista
function addItem() {
    if (!token) {
        alert('Você precisa estar logado!');
        window.location.href = 'index.html';
    }

    const itemInput = document.getElementById('itemInput');
    const itemValue = itemInput.value;

    if (itemValue) {
        items.push(itemValue);
        
        const itemList = document.getElementById('itemList');
        const listItem = document.createElement('li');
        listItem.textContent = itemValue;
        itemList.appendChild(listItem);

        itemInput.value = '';
    }
}

// Função para salvar a lista com os itens
function saveList() {
    const listName = document.getElementById('listName').value;

    if (!listName || items.length === 0) {
        alert("Por favor, insira o nome da lista e adicione pelo menos um item.");
        return;
    }

    const usuario = localStorage.getItem('username');

    const listData = {
        nome: listName,
        itens: items,
        usuario: usuario
    };

    fetch('https://listasdecompras-api.up.railway.app/api/shopping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listData)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'lists.html';
            document.getElementById('listName').value = '';
            document.getElementById('itemList').innerHTML = '';
            console.log('Lista criada com sucesso');
            items = [];
        } else {
            alert('Erro ao salvar a lista.');
        }
    });
}
