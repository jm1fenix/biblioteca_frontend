document.addEventListener('DOMContentLoaded', function() {
    const nome = window.localStorage.getItem('nome');
    const matricula = window.localStorage.getItem('matricula');
    const email = window.localStorage.getItem('email');
    ativaComp("msghome");

    var perfil = '';    


    if (nome) {
       if(matricula != 999999){
            perfil = "estudante";
            document.getElementById('estudantebar').style.display="none";
     
       } else {
            perfil = "bibliotecaria";
            document.getElementById('estudantebar').style.display="block";
       }
        document.getElementById("user").innerHTML = "Olá " + nome.split(' ')[0] + ", Matrícula: " + matricula;
        document.getElementById("loginbar").style.display="none";
        document.getElementById("loginDiv").style.display="none";
        document.getElementById("loginDiv").style.display="none";
        document.getElementById("logout").style.display="block";
    } else {        
        document.getElementById("user").style.display="none";
        document.getElementById("logout").style.display="none";
        document.getElementById("loginbar").style.display="block";
        document.getElementById("loginDiv").style.display="none";
        document.getElementById("estudantebar").style.display="none";
    }

});
function logoutSis() {
    window.localStorage.removeItem('nome');
    window.localStorage.removeItem('matricula');
    window.localStorage.removeItem('email');
    nome='', matricula='', perfil='', email='';
    document.getElementById("user").style.display="none";
    document.getElementById("logout").style.display="none";
    document.getElementById("loginDiv").style.display="none";
    document.getElementById("loginbar").style.display="block";
    document.getElementById("estudantebar").style.display="none";
    document.getElementById("estudante-list").style.display="none";
    document.location.reload();
}
var componentes = ['msghome','emprestimos','livros','estudante-list','estudante-form','estudante-pesq','loginDiv'];

function ativaComp(comp) {

    componentes.forEach(divid => {
        // Verifica se o ID do elemento atual corresponde ao ID para Ativar
        if (divid === comp) {
            document.getElementById(comp).style.display="block";
        } else {
            document.getElementById(divid).style.display="none";
        }
    });    
}

function limpaTableEst(){

    const bodySection = document.querySelectorAll("tbody")[0];
                const rows = bodySection.rows;
                var linhas = rows.length;
                for (var x=1;x<=linhas; x++) {
                    bodySection.deleteRow(-1);
                }
                return;
}

function ativaModal(msg) {
    var modal = document.getElementById("msgModal");
    document.getElementById("modal-text").innerText=msg;
    modal.style.display="block";
    var span = document.getElementsByClassName("close")[0]
    setTimeout(function() {
        document.getElementById("modal-text").value = "";
        modal.style.display="none";
    }, 3500);
    span.onclick = function() {
        modal.style.display = "none";
    }      
}

