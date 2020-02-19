# Budget Tracker
Budget Tracking app with JS, Bootstrap and Jquery.

This app lets you manage your income and expenses. Each expenses can be tracked. Each expenses should have date, category, title and the amount to be able to validly register as an expense.

# 1. Income
Income must be a positive value, and this indicates your current budget. The user can reset the value of the budget by simply rentering the new value for the budget which keeps track of the total balance.

# 2. Expenses
## Input Fields:
### a. Date field
User can input the date of the expense by either directly entering the value, or using a calendar to select the date. Without any value in this input field, the form will reject any other input.
### b. Category Field
Users can input the category of an expense by typing in the textbox next to the dropdown. Once users input a category, the app will remember the entry and add it to dropdown menu if the item does not exist in the dropdown currently.
### c. Expense Title Field
Users can input the description for the expense by inputting values into the textbox.
### d. Expense Amount Field
This field is used to accept only numbers to record the amount of each expense.

## Expense List
This table will show the entries of expenses with the associated category, title, amount and two buttons that allows modification to each entry. By clikcing a blue edit icon, the entires can be editted, and by clikcing on red trashcan icon, entries are deleted off of the menu. Total balance and expenses amount change based on the modification.

# 3. Balance
This is to display the total budget - total expenses.
