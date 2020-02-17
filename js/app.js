class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    // date functionality needed
    this.expenseDate = document.getElementById("date-input");
    // this is for the category; make a dropdown for the category list. may need another list for
    // categories of expenses
    //this.expenseCat = document.getElementById();
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  // submit budget method
  submitBudgetForm() {
    const value = parseFloat(this.budgetInput.value);
    if (value === '' || value < 0 || isNaN(value)) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = '<p>Value Cannot Be Empty Or Negative</p>';
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove('showItem');
      }, 4000);
    }
    else {
      this.budgetAmount.textContent = value.toFixed(2);
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseFloat(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total.toFixed(2);
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else {
      this.balance.classList.remove('showGreen', 'showRed');
      this.balance.classList.add('showBlack');
    }
  }

  // submit expense form
  submitExpenseForm() {
    const dateValue = this.expenseDate.value;
    const expenseValue = this.expenseInput.value;
    const amountValue = parseFloat(this.amountInput.value);
    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = '<p>values cannot be empty or negative</p>';
      const self = this;
      setTimeout(function() {
        self.expenseFeedback.classList.remove('showItem');
      }, 4000)
    }
    else {
      let amount = parseFloat(amountValue);
      amount = amount.toFixed(2);
      amount = parseFloat(amount);
      this.expenseInput.value = '';
      this.amountInput.value = '';
      this.expenseDate.value = '';
      // expense object to add it to the list in UI class
      let expense = {
        id:this.itemID,
        title:expenseValue,
        date:dateValue,
        amount:amount
      }
      this.itemID++
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  // add expense
  addExpense(expense) {
    const div = document.createElement('div');
    const expenseAmount = expense.amount.toFixed(2);
    div.classList.add('expense');
    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-date mb-0 list-item">${expense.date}</h6>
         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">-${expenseAmount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
    `;
    this.expenseList.appendChild(div);
  }

  // total expense
  totalExpense() {
    let total = parseFloat('0');
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function(acc, curr) {
        console.log(`Total is: ${acc} and the current value is: ${curr.amount}`);
        console.log(typeof curr.amount);
        acc += curr.amount;
        return acc;
      }, 0);
    }
    total = parseFloat(total);
    //console.log(typeof total);
    this.expenseAmount.textContent = total.toFixed(2);
    return total;
  }

  // edit expense
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    });
    // show value
    this.expenseDate.value = expense[0].date;
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount.toFixed(2);
    // remove from list
    let tmpList = this.itemList.filter(function(item) {
      return item.id !== id;
    });
    this.itemList = tmpList;
    this.showBalance();
  }

  // delete expense
  deleteExpense(element) {
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    let tmpList = this.itemList.filter(function(item) {
      return item.id !== id;
    });
    this.itemList = tmpList;
    this.showBalance();
  }
  
}

function eventListeners() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  // new instance of UI class
  const ui = new UI();

  // budget form submit event
  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // expense form submit event
  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  });

  // expense click
  expenseList.addEventListener('click', function(event){
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement);
    }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  eventListeners();
});