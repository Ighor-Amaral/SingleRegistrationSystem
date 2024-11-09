export function handleLogin() {
    const loginButton = document.getElementById("button-login");

    if (loginButton) {
        loginButton.addEventListener("click", function() {
            const enteredEmail = document.getElementById("loginEmailInput").value;
            const enteredPassword = document.getElementById("loginPasswordInput").value;

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = data.redirectUrl; // Redireciona para a página de usuários
                } else {
                    const messageElement = document.getElementById("loginMessage");
                    messageElement.style.display = "block";
                    messageElement.textContent = data.message;
                }
            })                               
                        .catch((error) => {
                console.error('Erro:', error);
            });
        });
    }
}
