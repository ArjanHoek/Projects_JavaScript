const addNewUserBtn = document.getElementById('add-new-user-btn');
const doubleMoneyBtn = document.getElementById('double-money-btn');
const showOnlyMillionairesBtn = document.getElementById('show-only-millionaires-btn');
const sortByWealthBtn = document.getElementById('sort-by-wealth-btn');
const calculateTotalWealthBtn = document.getElementById('calculate-total-wealth-btn');
const userList = document.getElementById('user-list');
const totalWealth = document.getElementById('total-wealth');
const allUsers = [];

const addUser = async () => {
  const randomUser = await fetch('https://randomuser.me/api/').then(res => res.json()).then(data => data.results[0]);
  randomUser.wealth = Math.random() * 100000;
  allUsers.push(randomUser);
  return allUsers;
};

const clearElements = (...elements) => elements.forEach(el => el.innerHTML = '');
const createListItem = data => `<li><p>${data[0]}</p><p>${data[1]}</p></li>`;
const toggleDisplay = (element, display) => element.style.display = display;
const refactorMoney = number => {
  let fixedNumber = number.toFixed(2);
  let array = fixedNumber.toString().split('');
  for (let i = array.length - 5; i >= 0; i--) { (array.length - 1 - i) % 3 === 0 && (array[i] += ',') };
  return array.join('')
}

const refreshUserList = users => {
  clearElements(userList);
  toggleDisplay(totalWealth.parentElement, 'none');
  const listItems = users.map(user => createListItem([`${user.name.first} ${user.name.last}`, refactorMoney(user.wealth)]));
  listItems.forEach(item => userList.innerHTML += item)
};

const doubleMoney = users => {
  users.forEach(user => (user.wealth *= 2));
  return users;
};

const returnMillionaires = users => users.filter(user => user.wealth > 1000000);
const sortByWealth = users => [...users].sort((a, b) => a.wealth - b.wealth);
const calculateTotalWealth = users => {
  totalWealth.innerHTML = `€${users.reduce((total, cur) => total + cur.wealth, 0).toFixed(2)}`;
  toggleDisplay(totalWealth.parentElement, 'flex');
};

addNewUserBtn.addEventListener('click', () => addUser().then(users => refreshUserList(users)));
doubleMoneyBtn.addEventListener('click', () => refreshUserList(doubleMoney(allUsers)));
showOnlyMillionairesBtn.addEventListener('click', () => refreshUserList(returnMillionaires(allUsers)));
sortByWealthBtn.addEventListener('click', () => refreshUserList(sortByWealth(allUsers)));
calculateTotalWealthBtn.addEventListener('click', () => calculateTotalWealth(allUsers));

const addInitialUsers = () => { for (i = 0; i < 7; i++) { addUser().then(users => refreshUserList(users)) } };

addInitialUsers();
