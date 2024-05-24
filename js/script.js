const baseURL = 'https://664fd801ec9b4a4a602ff654.mockapi.io/financa';

// Função para listar todas as financas
function listarFinancas() {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            const financaList = document.createElement('table');
            financaList.innerHTML = `
            <tr>
                <th>ID</th>
                <th>DATA</th>
                <th>DESCRIÇÃO</th>
                <th>CATEGORIA</th>
                <th>VALOR</th>
                <th>AÇÕES</th>
            </tr>
        `;
            data.forEach(financa => {
                const dataFormatada = new Date(financa.data).toLocaleDateString('pt-BR');
                const valorFormatado = parseFloat(financa.valor).toFixed(2);
                financaList.innerHTML += `
                <tr>
                    <td>${financa.id}</td>
                    <td>${dataFormatada}</td>
                    <td>${financa.descricao}</td>
                    <td>${financa.categoria}</td>
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
    const data = document.querySelector('#data').value;
    const descricao = document.querySelector('#descricao').value;
    const categoria = document.querySelector('#categoria').value;
    const valor = parseFloat(document.querySelector('#valor').value).toFixed(2);

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, descricao, categoria, valor })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Finança cadastrada com sucesso:', data);
        document.querySelector('#financa-form').reset();
        listarFinancas();
    })
    .catch(error => console.error('Erro ao cadastrar finança:', error));
}

// Função para preencher o formulário com os dados da finança a ser editada
function preencherFormulario() {
    const params = new URLSearchParams(window.location.search);
    const financaId = params.get('id');
    if (financaId) {
        fetch(`${baseURL}/${financaId}`)
        .then(response => response.json())
        .then(financa => {
            document.getElementById('id').value = financa.id;
            document.getElementById('data').value = financa.data;
            document.getElementById('descricao').value = financa.descricao;
            document.getElementById('categoria').value = financa.categoria;
            document.getElementById('valor').value = financa.valor;
        })
        .catch(error => console.error('Erro ao buscar produto:', error));
    }
}

// Função para editar uma finança
function editarFinanca(event) {
    event.preventDefault();
    const financaId = document.getElementById('id').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    
    fetch(`${baseURL}/${financaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data,
            descricao: descricao,
            categoria: categoria,
            valor: valor
        })
    })
    .then(() => {
        console.log('Finança editada com sucesso');
        window.location.href = 'cadastrar.html';
    })
    .catch(error => console.error('Erro ao editar finança:', error));
}

preencherFormulario();
