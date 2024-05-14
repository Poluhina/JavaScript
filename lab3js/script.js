/**
 * Массив транзакций.
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Добавлена новая транзакция.
 * @param {Event} event 
 */
function addTransaction(event) {
    event.preventDefault();

    // Данные из формы
    const form = event.target;
    const date = form.date.value;
    const amount = parseFloat(form.amount.value);
    const category = form.category.value;
    const description = form.description.value;

    const id = transactions.length + 1;

    // Объект транзакции
    const transaction = { id, date, amount, category, description };

    transactions.push(transaction);

    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `<td>${id}</td><td>${date}</td><td>${category}</td><td>${description.substring(0, 50)}</td><td><button onclick="deleteTransaction(${id})">Удалить</button></td>`;
    row.style.color = amount >= 0 ? 'green' : 'red';

    // Пересчитываем общую сумму транзакций
    calculateTotal();
}

/**
 * Удаление транзакции по идентификатору.
 * @param {number} id 
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id); 
    document.getElementById('transaction-table').deleteRow(id); 
    calculateTotal(); 
}

/**
 * Вычисление общей суммы всех транзакций и обновление элемента на странице.
 */
function calculateTotal() {
    const totalElement = document.getElementById('total');
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    totalElement.textContent = `Общая сумма: ${totalAmount}`;
}

/**
 * Предоставляет информацию о конкретной операции.
 * @param {number} id 
 */
function showTransactionDetails(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    const detailsElement = document.getElementById('transaction-details');
    
    // Выводится вся информация о транзакциях
    detailsElement.innerHTML = `<h2>Подробности транзакции #${id}</h2>
                                <p><strong>Дата и время:</strong> ${transaction.date}</p>
                                <p><strong>Сумма:</strong> ${transaction.amount}</p>
                                <p><strong>Категория:</strong> ${transaction.category}</p>
                                <p><strong>Описание:</strong> ${transaction.description}</p>`;
}

// Функция, которая реагирует на событие отправки формы для добавления операции.
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

// Функция, которая реагирует на событие клика для показа подробной информации о операции.
document.getElementById('transaction-table').addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
        const row = target.parentElement;
        const id = parseInt(row.cells[0].textContent);
        showTransactionDetails(id);
    }
});
