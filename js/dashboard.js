document.addEventListener('DOMContentLoaded', function() {
    const financeData = document.getElementById('financeData');
    const addFinanceForm = document.getElementById('addFinanceForm');

    // Função para carregar os dados
    function loadFinances() {
        fetch('https://664cffb5ede9a2b556525a05.mockapi.io/gasto')
            .then(response => response.json())
            .then(data => {
                financeData.innerHTML = ''; // Limpa a tabela
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.date}</td>
                        <td>${item.description}</td>
                        <td>${item.category}</td>
                        <td>${item.amount}</td>
                        <td class="actions">
                            <button onclick="deleteFinance('${item.id}')">Excluir</button>
                        </td>
                    `;
                    financeData.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }

    // Carrega os dados ao carregar a página
    loadFinances();

    // Função para adicionar um novo item
    addFinanceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;

        const newFinance = {
            date: date,
            description: description,
            category: category,
            amount: parseFloat(amount)
        };

        fetch('https://664cffb5ede9a2b556525a05.mockapi.io/gasto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFinance)
        })
        .then(response => response.json())
        .then(data => {
            // Após adicionar, recarrega os dados
            loadFinances();
            addFinanceForm.reset();
        })
        .catch(error => console.error('Erro ao adicionar o dado:', error));
    });
});

// Função para excluir um item
function deleteFinance(id) {
    fetch(`https://664cffb5ede9a2b556525a05.mockapi.io/gasto/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadFinances();
        } else {
            console.error('Erro ao excluir o dado:', response.statusText);
        }
    })
    .catch(error => console.error('Erro ao excluir o dado:', error));
}

// Função para recarregar os dados (declarada globalmente para ser usada em deleteFinance)
function loadFinances() {
    fetch('https://664cffb5ede9a2b556525a05.mockapi.io/gasto')
        .then(response => response.json())
        .then(data => {
            const financeData = document.getElementById('financeData');
            financeData.innerHTML = ''; // Limpa a tabela
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.date}</td>
                    <td>${item.description}</td>
                    <td>${item.category}</td>
                    <td>${item.amount}</td>
                    <td class="actions">
                        <button onclick="deleteFinance('${item.id}')">Excluir</button>
                    </td>
                `;
                financeData.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}
