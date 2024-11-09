document.addEventListener('DOMContentLoaded', () => {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector('#usersTable tbody');
            users.forEach(user => {
                const row = `<tr><td>${user.id}</td><td>${user.email}</td><td>${user.name}</td></tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Erro ao carregar a lista de usuários:', error));
});
