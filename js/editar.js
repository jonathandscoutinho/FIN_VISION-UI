// Função para preencher o formulário com os dados da finança a ser editada
function preencherFormulario() {
    const params = new URLSearchParams(window.location.search);
    const financaId = params.get('id');
    if (financaId) {
        fetch(`${baseURL}/${financaId}`)
        .then(response => response.json())
        .then(financa => {
            document.getElementById('id').value = financa.id;
            document.getElementById('date').value = financa.date;
            document.getElementById('description').value = financa.description;
            document.getElementById('category').value = financa.category;
            document.getElementById('value').value = financa.value;
        })
        .catch(error => console.error('Erro ao buscar financa:', error));
    }
}

// Função para editar uma financa
function editarFinanca(event) {
    event.preventDefault();
    const financaId = document.getElementById('id').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const value = document.getElementById('value').value;
    
    fetch(`${baseURL}/${financaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            description: description,
            category: category,
            value: value
        })
    })
    .then(() => {
        console.log('Finança editada com sucesso');
        window.location.href = 'cadastrar.html';
    })
    .catch(error => console.error('Erro ao editar finança:', error));
}

preencherFormulario();