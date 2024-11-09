console.log("Arquivo register.js carregado.");

// Função para lidar com o redirecionamento para a página de registro
export function handleRegisterRedirect() {
    const registerButton = document.getElementById("button-register");

    if (registerButton) {
        registerButton.addEventListener("click", function() {
            window.location.href = "../html/register.html"; // Altere para o caminho correto da sua página de registro
        });
    }
}

// Função para lidar com o processo de registro
export function handleRegistration() {
    const registerForDbButton = document.getElementById("button-for-db");

    if (registerForDbButton) {
        registerForDbButton.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o envio do formulário padrão
            console.log("Prevent default acionado - formulário não será enviado.");

            const name = document.getElementById('firstName').value;
            const birthDate = document.getElementById('birthDate').value;
            const email = document.getElementById('registerEmailInput').value;
            const password = document.getElementById('registerPasswordInput').value;

            fetch('http://localhost:3000/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, birthDate, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                const messageElement = document.getElementById("message");
                messageElement.style.display = "block";
                messageElement.textContent = data.message;

                if (data.success) {
                    setTimeout(() => {
                        window.location.href = "../html/index.html"; 
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
            });
        });
    } else {
        console.error("Botão de registro não encontrado");
    }
}

// Verifica se está na página de registro antes de chamar a função handleRegistration
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("register.html")) {
        handleRegistration();
        console.log("Função handleRegistration chamada após o DOM ser carregado na página de registro.");
    }
});
