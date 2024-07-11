document.getElementById('editStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('password').value;
    const idEstud = document.getElementById('idEstud').value
    const messageElement = document.getElementById('messageEst');
    const statform = document.getElementById('ctrl-form-est').value;
    var acao = "post";

        if(statform === "1"){
            acao = "put";
        }

        axios({
            method: acao,
            url: 'http://localhost:8010/biblio/estudante',
            data: {
                nome: nome,
                matricula: matricula,
                email: email,
                telefone: telefone,
                senha: senha,
                idEstudante: idEstud
            }
        })
        .then(function (response) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Estudante salvo com sucesso!';
            ativaModal('Estudante salvo com sucesso! ' + response.data);
            document.getElementById('but-clear-form-estudante').click();
            console.log("Resposta cadastro estudante: " + response.data);
            setTimeout(function() {
                messageElement.textContent = '';
          }, 3000);
        })
        .catch(function (error) {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Erro ao salvar estudante.';
            ativaModal('Erro ao salvar estudante.');
            console.error(error);
        });
});

/* Função para controle do formulário de Pesquisa de Estudantes - Listner e funções */

document.getElementById('pesqStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nomep').value;
    const matricula = document.getElementById('matriculap').value;
    const email = document.getElementById('emailp').value;
    const messageElement = document.getElementById('messageEst');
    var tipopesq = "";
    var pesqval = "";
    if(nome != "") {
        tipopesq = "nome";
        pesqval = nome;
        pesqval = pesqval.replace(" ","_");
    } else if(matricula != ""){
        tipopesq = "matricula";
        pesqval = matricula;
    } else if(email != ""){
        tipopesq = "email";
        pesqval = email;
    }
    /* alert("nome: " + nome + " matricula: " + matricula + " email: " + email + " tipopesq: " + tipopesq + " pesqval: " + pesqval); */ 
    var urlpesq = 'http://localhost:8010/biblio/estudante/'+ tipopesq + "/" + pesqval;
    ativaComp("estudante-list");
    
        axios({
            method: "get",
            url: urlpesq
        })
        .then(function (response) {
            const students = response.data;
            const tbody = document.querySelector('#studentsTable tbody');
            limpaTableEst();
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.nome}</td>
                    <td>${student.matricula}</td>
                    <td>${student.email}</td>
                    <td>${student.telefone}</td>
                    <td><a href="#"><img src="./images/cancel.png" title="Excluir Estudante"
                                      onclick="excluirEstudante(${student.idEstudante});"></a></td>
                    <td><a href="#"><img src="./images/user.png" title="Alterar Estudante"
                                      onclick="alterarEstudante(${student.idEstudante});"></a></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(function (error) {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Erro ao pesquisar estudante.';
            ativaModal('Erro ao pesquisar estudante.');
            console.error(error);
        });
});


document.getElementById("estudantebar").addEventListener('click', function() {

    axios.get('http://localhost:8010/biblio/estudante/pag/1')
        .then(function (response) {
            const students = response.data;
            const tbody = document.querySelector('#studentsTable tbody');
            limpaTableEst();
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.nome}</td>
                    <td>${student.matricula}</td>
                    <td>${student.email}</td>
                    <td>${student.telefone}</td>
                    <td><a href="#"><img src="./images/cancel.png" title="Excluir Estudante"
                                      onclick="excluirEstudante(${student.idEstudante});"></a></td>
                    <td><a href="#"><img src="./images/user.png" title="Alterar Estudante"
                                      onclick="alterarEstudante(${student.idEstudante});"></a></td>
                `;
                tbody.appendChild(row);

            });
        })
        .catch(function (error) {
            console.error('Erro ao carregar a lista de estudantes:', error);
            ativaModal('Erro ao carregar a lista de estudantes: ' + error);
        });
});

function excluirEstudante(idEstudante){

    axios.delete('http://localhost:8010/biblio/estudante/id/'+ idEstudante)
        .then(function (response) {
            if(response.status === 200){
                /* alert("Estudante, id:" + idEstudante + " excluído com sucesso!"); */
                ativaModal("Estudante, id:" + idEstudante + " excluído com sucesso!");
                document.getElementById("estudantebar").click();
                return;
            } else {
                /* alert("Erro ao excluir Estudante com id:" + idEstudante); */
                ativaModal("Erro ao excluir Estudante com id: " + idEstudante);
                return;
            };


        })
        .catch(function (error) {
            console.error('Erro ao carregar a lista de estudantes:', error);
            /* alert("Erro no servidor/url ao excluir Estudante, verifique... " + error); */
            ativaModal("Erro no servidor/url ao excluir Estudante, verifique... " + error);
            return;
        });
}

function alterarEstudante(idEstudante){

    axios.get('http://localhost:8010/biblio/estudante/id/'+ idEstudante, {
        maxRedirects: 5, // Set the maximum number of redirects to follow
        validateStatus: function (status) {
          return status >= 200 && status < 300; // default
        }
      })
        .then(function (response) {
            if(response.status === 200){
                const estud = response.data;
                ativaComp('estudante-form');
                document.getElementById('nome').value = estud.nome;
                document.getElementById('matricula').value = estud.matricula;
                document.getElementById('email').value = estud.email;
                document.getElementById('telefone').value = estud.telefone;
                document.getElementById('password').value = '';
                document.getElementById('idEstud').value = estud.idEstudante;
                document.getElementById('ctrl-form-est').value = 1;
                return;
            } else {
                /* alert("Erro ao consultar Estudante com id:" + idEstudante); */
                ativaModal("Erro ao consultar Estudante com id:" + idEstudante);
                return;
            };


        })
        .catch(function (error) {
            /* alert("Erro no servidor/url ao excluir Estudante, verifique... " + error); */
            ativaModal("Erro no servidor/url ao excluir Estudante, verifique... " + error);
            return;
        });
}

function pesqEstudante(){

}