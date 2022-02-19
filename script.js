'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b)=> a-b) : movements
  movs.forEach((mov, i)=>{

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov)=> acc + mov, 0)
  labelBalance.textContent = `${acc.balance}€`
}

const calcDisplaySummary = (account) => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)

  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov)=> acc + mov, 0)

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate/100)
    .filter((int, i, arr)=> {
      return int >= 1
    })
    .reduce((acc, int)=> acc + int, 0)

  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = (accs) => {
  accs.forEach((acc)=>{
    acc.userName = acc.owner.toLowerCase()
        .split(' ')
        .map(name=> name[0])
        .join('');
  })
}
createUsernames(accounts)

const updateUI = function(acc){
   //Display movements
   displayMovements(acc.movements)
   //Display balance
   calcDisplayBalance(acc)
   //Display Summary
   calcDisplaySummary(acc)
}

//Event Handler
let currentAccount;
btnLogin.addEventListener('click', function(event){
  //Prevent form from submitting
  event.preventDefault()

  currentAccount = accounts
    .find(acc => acc.userName === inputLoginUsername.value)
  //console.log(currentAccount)

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI and Message
    labelWelcome.textContent = `Welcome back! ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    inputLoginUsername.blur()
    //Update UI
    updateUI(currentAccount)
  }
})

btnTransfer.addEventListener('click', function(event){
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc =accounts.find(acc => 
    acc.userName === inputTransferTo.value)
  
  inputTransferAmount.value = inputTransferTo.value = '' 
  
  if(amount > 0 && 
    receiverAcc &&
    amount <= currentAccount.balance && 
    receiverAcc?.userName !== currentAccount.userName)
  {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount)
    updateUI(currentAccount)
  }
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov=> mov >= amount * 0.1)){
    //Add the movement
    currentAccount.movements.push(amount)

    //update UI
    updateUI(currentAccount)

  }
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function(event){
  event.preventDefault()

  if(inputCloseUsername.value === currentAccount.userName 
    && Number(inputClosePin.value) === currentAccount.pin)
  {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
    //console.log(index)
    //Delete Account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click', function(e){
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; */

/////////////////////////////////////////////////
//Simple Array Methods
//let arr = ['a', 'b', 'c', 'd', 'e']

//SLICE
/* console.log(arr.slice(2))
console.log(arr.slice(2,4))
console.log(arr.slice(-2))
console.log(arr.slice(-1))
console.log(arr.slice(1, -2))
console.log(arr.slice()) 
console.log([...arr])*/

//SPLICE
//console.log(arr.splice(2))
/* arr.splice(-1)
console.log(arr)
arr.splice(1,2)
console.log(arr) */

//REVERSE
/* arr = ['a', 'b', 'c', 'd', 'e']
let arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse())
console.log(arr2) */

//CONCAT
/* const letters = arr.concat(arr2)
console.log(letters)
console.log([...arr, ...arr2])
 */
// JOIN
//console.log(letters.join(' - '))

//Looping Arrays: forEach
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* for(const [i, movement] of movements.enteries()){
  if( movement > 0 ){
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`)
  }
} */


/* movements.forEach(function(movement, i, arr){
  if( movement > 0 ){
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`)
  }
}) */


//forEach with Maps & Sets
//Map
/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map)=>{
  console.log(`${key}: ${value}`)
}) */

//Set
/* const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
console.log(currenciesUnique)
currenciesUnique.forEach((value, key, map)=>{
  console.log(`${key}: ${value}`)
}) */

// Map method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1
const movementsUSD = movements.map(
  movement=> movement * eurToUsd
)

console.log(movements)
console.log(movementsUSD)

const movementsUSDfor = []

for(const mov of movements){
  movementsUSDfor.push(mov * eurToUsd)
}
console.log(movementsUSDfor)

const movementDescription = movements.map((mov, i)=>
  `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'widthdrew'} ${Math.abs(mov)}`
)
console.log(movementDescription) */

//Filter method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov=> mov > 0)
console.log(movements)
console.log(deposits)


const withdrawal = movements.filter(mov => mov < 0)
console.log(withdrawal) */

//Reduce method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements)

//prevMov or accumulator -> snowball
const balance = movements.reduce((prevMov, curMov, i, arr)=>{
  return prevMov + curMov
}, 0)
//console.log(movements)
console.log(balance)

// Maximum value of movements array using reduce
const max = movements.reduce((acc, val)=> val > acc ? val : acc, movements[0])
console.log(max) */

//Magic of chaining methods
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements)

const eurToUsd = 1.1
// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov*eurToUsd)
  .map((mov, i ,arr) => {
    //console.log(arr)
    return mov*eurToUsd
  })
  .reduce((acc, mov)=> acc + mov, 0)
console.log(totalDepositsUSD) */

// Find
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements)

const firstWithdraw = movements.find((mov)=>{
  return mov < 0
})

console.log(firstWithdraw)
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account) */
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements)
console.log(movements.includes(-130))

const anyDeposits = movements.some(mov => mov > 5000)
console.log(anyDeposits) */

/* //Every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.every(mov => mov > 0))
console.log(account4.movements.every(mov => mov > 0))

//Separate callback
const deposit = mov => mov > 0
console.log(movements.some(deposit)) */

/* const arr = [[1, 2, 3], [4, 5, 7], 8, 9]
console.log(arr.flat())

const arrDeep = [[[1, 2], 3], [4, [5, 7]], 8, 9]
console.log(arrDeep.flat(2))

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov)=> acc + mov, 0)
console.log(overallBalance)

const overallBal = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov)=> acc + mov, 0)
console.log(overallBal) */

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort())

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements)

// movements.sort((a,b) => {
//   if(a > b)
//     return 1
//   if(b > a)
//     return -1
// })
movements.sort((a, b)=> a - b)
console.log(movements) */

const x = new Array(7)
console.log(x)

//x.fill(7)
//x.fill(1, 3, 5)
console.log(x)
const y = Array.from({length: 7},()=> 1)
console.log(y)

const z = Array.from({length: 7}, (cur, i)=> i+1)
console.log(z)


labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
  el => Number(el.textContent.replace('€','')))
  console.log(movementsUI)
  
})