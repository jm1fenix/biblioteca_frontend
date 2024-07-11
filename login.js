document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const matricula = document.getElementById('matriculaL').value;
    const senha = document.getElementById('senhaL').value;
    const messageElement = document.getElementById('message');
    const estudante={
        nome_:'',
        matricula_: '',
        email_:'',
        telefone_:'',
        idEstudante_: ''
    };

    axios.post('http://localhost:8010/biblio/estudante/login', {
        matricula: matricula,
        senha: senha
    })
    .then(function (response) {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Login bem-sucedido!';
        estudante.nome_ = response.data.nome;
        estudante.matricula_ = response.data.matricula;
        estudante.email_ = response.data.email;
        estudante.telefone_ = response.data.telefone;
        estudante.idEstudante_ = response.data.idEstudante;
       
        window.localStorage.setItem('nome', estudante.nome_);
        window.localStorage.setItem('matricula', estudante.matricula_);
        window.localStorage.setItem('email', estudante.email_);
        document.location.reload();
    })
    .catch(function (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Matrícula ou Senha incorretos.';
        console.error(error);
        ativaModal('Matrícula ou Senha incorretos!');
        setTimeout(function() {
            messageElement.textContent = '';

          }, 3000);
    });
});

