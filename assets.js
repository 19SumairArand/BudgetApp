    // JavaScript code for the app's logic and functionality

    let monthlyBudget = 0;
    let expenses = [];

    const budgetInput = document.getElementById('budget');
    const budgetAmountElement = document.getElementById('budgetAmount');
    const remainingBudgetElement = document.getElementById('remainingBudget');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const expensesTable = document.getElementById('expensesTable');

    function addBudget() {
      monthlyBudget = parseInt(budgetInput.value);
      budgetAmountElement.textContent = monthlyBudget;
      updateRemainingBudget();
    }

    function addExpense() {
      const description = descriptionInput.value;
      const amount = parseInt(amountInput.value);
      const date = dateInput.value;

      if (description && amount && date) {
        const expense = { description, amount, date };
        expenses.push(expense);
        renderExpenses();
        updateRemainingBudget();
        clearExpenseInputs();
      } else {
        alert('Please fill in all the expense details.');
      }
    }

    function renderExpenses() {
      expensesTable.innerHTML = `
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      `;

      expenses.forEach((expense, index) => {
        const { description, amount, date } = expense;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td> <i class="fa-solid fa-bars" style="color: #18428b;"></i> ${description}</td>
          <td> <i class="fa-solid fa-dollar-sign" style="color: #2d59a4;"></i> ${amount}</td>
          <td> <i class="fa-regular fa-calendar-days" style="color: #2f528e;"></i> ${date}</td>
          <td>
            <button onclick="editExpense(${index})"> <i class="fa-solid fa-pen-to-square" style="color: #195bcc;"> </i></button>
            <button onclick="removeExpense(${index})"> <i class="fa-solid fa-trash" style="color: #244b8f;"></i> </button>
          </td>
        `;

        expensesTable.appendChild(row);
      });
    }

    function editExpense(index) {
      const expense = expenses[index];
      descriptionInput.value = expense.description;
      amountInput.value = expense.amount;
      dateInput.value = expense.date;
      expenses.splice(index, 1);
      renderExpenses();
      updateRemainingBudget();
    }

    function removeExpense(index) {
      expenses.splice(index, 1);
      renderExpenses();
      updateRemainingBudget();
    }

    function updateRemainingBudget() {
      const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
      const remainingBudget = monthlyBudget - totalExpenses;
      remainingBudgetElement.textContent = remainingBudget;
    }

    function clearExpenseInputs() {
      descriptionInput.value = '';
      amountInput.value = '';
      dateInput.value = '';
    }