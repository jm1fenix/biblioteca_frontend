document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    axios.post('http://localhost:8010/biblioteca/login', {
        email: email,
        password: password
    })
    .then(function (response) {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Login bem-sucedido!';
        console.log(response.data);  // Você pode usar isso para redirecionar ou armazenar tokens
    })
    .catch(function (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Email ou senha incorretos.';
        console.error(error);
    });
});

