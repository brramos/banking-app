console.log("hello world :o");

const accounts = [];

const accountForm = document.forms[0];
const nameInput = accountForm.elements["name"];
const accountTypeInput = accountForm.elements["accountType"];
const balanceInput = accountForm.elements["balance"];

const accountList = document.getElementById("accounts");
const clearButton = document.querySelector('#clear-accounts');

const appendNewAccount = account => {
  const newListItem = document.createElement("li");
  newListItem.innerText = account;
  accountList.appendChild(newListItem);
};

fetch("/api/accounts", {})
  .then(res => res.json())
  .then(accounts => {
    accounts.forEach(account => {
      appendNewAccount(account.name);
    });
  });

accountForm.onsubmit = event => {
  event.preventDefault();

  const data = {
    name: nameInput.value,
    accountType: accountTypeInput.value,
    balance: balanceInput.value
  };

  fetch("/api/accounts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });
  // get dream value and add it to the list
  accounts.push(nameInput.value);
  appendNewAccount(nameInput.value);

  // reset form
  nameInput.value = '';
  accountTypeInput.value = '';
  balanceInput.value = '';

  nameInput.focus();
};

clearButton.addEventListener('click', event => {
  fetch("/api/dream/clearDreams", {})
    .then(res => res.json())
    .then(response => {
      console.log("cleared dreams");
    });
  accountList.innerHTML = "";
});
