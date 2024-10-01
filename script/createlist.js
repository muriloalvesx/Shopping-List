document.addEventListener('DOMContentLoaded', addItem);

const token = localStorage.getItem('token');

// Armazena os itens da lista
 let items = [];

 // Função para adicionar item à lista
 function addItem() {
    if (!token) {
        alert('Você precisa estar logado!');
        window.location.href = 'index.html'; // Redireciona para a página de login
    }

     const itemInput = document.getElementById('itemInput');
     const itemValue = itemInput.value;

     if (itemValue) {
         // Adiciona o item ao array 'items'
         items.push(itemValue);

         // Exibe o item na lista na interface do usuário
         const itemList = document.getElementById('itemList');
         const listItem = document.createElement('li');
         listItem.textContent = itemValue;
         itemList.appendChild(listItem);

         // Limpa o campo de input após adicionar o item
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

// Recupera o nome do usuário do localStorage
const usuario = localStorage.getItem('username');

// Cria o objeto que será enviado para a API
const listData = {
 nome: listName,
 itens: items,
 usuario: usuario // Preenche com o usuário atual
};

// Faz a requisição POST para enviar os dados para a API Java
fetch('https://listasdetarefas-api.up.railway.app/api/shopping', {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 body: JSON.stringify(listData) // Envia os dados no formato JSON
})
.then(response => {
 if (response.ok) {
     window.location.href = 'lists.html';
     // Limpa os campos e a lista de itens
     document.getElementById('listName').value = '';
     document.getElementById('itemList').innerHTML = '';
     console.log('Lista criada com ID:', newList.id);
     items = [];
 } else {
     alert('Erro ao salvar a lista.');
 }
})
}
