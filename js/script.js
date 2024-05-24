const baseURL = 'http://localhost:8080/finance';
// Função para listar todas as financas
function listarFinancas() {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            const financaList = document.createElement('table');
            financaList.innerHTML = `
            <tr>
                <th>ID</th>
                <th>VENCIMENTO</th>
                <th>DESCRIÇÃO</th>
                <th>CATEGORIA</th>
                <th>VALOR</th>
                <th>AÇÕES</th>
            </tr>
        `;
            data.forEach(financa => {
                const financaDate = new Date(financa.date);
                financaDate.setHours(financaDate.getHours() + 3);
                const dataFormatada = financaDate.toLocaleDateString('pt-BR');
                const valorFormatado = parseFloat(financa.value).toFixed(2);
                financaList.innerHTML += `
                <tr>
                    <td>${financa.id}</td>
                    <td>${dataFormatada}</td>
                    <td>${financa.description}</td>
                    <td>${financa.category}</td>
                    <td>${valorFormatado}</td>
                    <td class="actions">
                        <a href="editar.html?id=${financa.id}" class="button edit-button">Editar</a>
                        <a href="#" onclick="confirmarExclusao(${financa.id})" class="button delete-button">Excluir</a>
                    </td>
                </tr>
            `;
            });
            document.getElementById('main-content').innerHTML = '';
            document.getElementById('main-content').appendChild(financaList);
        })
        .catch(error => console.error('Erro ao listar finanças:', error));
}

// Função para confirmar a exclusão de uma finança
function confirmarExclusao(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir esta finança?');
    if (confirmacao) {
        excluirFinanca(id);
    }
}

// Função para excluir uma finança pelo ID
function excluirFinanca(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log('Finança excluída com sucesso');
            listarFinancas();
        })
        .catch(error => console.error('Erro ao excluir finança:', error));
}

// Função para cadastrar uma nova finança
function cadastrarFinanca(event) {
    event.preventDefault();
    const date = document.querySelector('#date').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;
    const value = parseFloat(document.querySelector('#value').value).toFixed(2);

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, description, category, value })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Finança cadastrada com sucesso:', data);
            console.log(date);
            console.log(description);
            console.log(category);
            console.log(value);
            document.querySelector('#financa-form').reset();
            listarFinancas();
        })
        .catch(error => console.error('Erro ao cadastrar finança:', error));
}
