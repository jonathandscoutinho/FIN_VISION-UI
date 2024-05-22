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

// Função para editar uma financa
function editarFinanca(event) {
    event.preventDefault();
    const financaId = document.getElementById('id').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const valor = document.getElementById('valor').value;
    
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