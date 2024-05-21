document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        fetch('http://localhost:8080/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Registro bem-sucedido! Faça login agora.';
                successMessage.classList.add('success-message');
                registerForm.appendChild(successMessage);

                const loginLink = document.createElement('a');
                loginLink.textContent = 'Fazer login';
                loginLink.href = 'index.html';
                registerForm.appendChild(loginLink);

                registerForm.reset();
            } else {
                alert('Ocorreu um erro ao registrar. Por favor, tente novamente.');
                console.log(userData);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao registrar. Por favor, tente novamente.');
            console.log(userData);
        });
    });
});