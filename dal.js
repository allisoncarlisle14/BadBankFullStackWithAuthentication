const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "myProject";

let db = null;
let customers = null;
let transactions = null;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  customers = db.collection("users");
  transactions = db.collection("transactions");
  return "done.";
}

main().then(console.log).catch(console.error);
//.finally(() => client.close());

async function create(name, email, password) {
  const doc = { name, email, password, balance: 0 };
  const customerArray = await customers.find({ email }).toArray();
  if (customerArray.length === 0) {
  await customers.insertOne(doc);
  const newCustomer = await customers.find({ email }).toArray();
  console.log("Customer inserted", newCustomer);
  return {valid: true, response: newCustomer}}
  else {
    return ({valid: false, response: 'A customer with that email address already exists!'})
  }
}

async function login(email, password) {
  const customerArray = await customers.find({ email, password }).toArray();
  if (customerArray.length === 0) {
  return {valid: false, response: 'The email address and password you have entered are incorrect.'}}
  else {
    const customer = customerArray[0];
    return ({valid: true, response: customer})
  }
}

async function deposit(email, amount) {
  // updating customer's balance in the database
  const customerArray = await customers.find({ email }).toArray();
  const customer = customerArray[0];

  const previousBalance = Number(customer.balance);

  const newBalance = previousBalance + Number(amount);

  const updateResult = await customers.updateOne({email}, {$set: {balance: newBalance}});

  // updating transactions in the database
  const name = customer.name;
 
  const transaction = {name, type: 'deposit', amount, newBalance};
  await transactions.insertOne(transaction);
  return updateResult;
}

async function withdraw(email, amount) {
  const customerArray = await customers.find({ email }).toArray();
  const customer = customerArray[0];
 
  const previousBalance = Number(customer.balance);

  if (Number(amount) <= previousBalance) {
  const newBalance = previousBalance - Number(amount);

  const updateResult = await customers.updateOne({email}, {$set: {balance: newBalance}});
 
  const name = customer.name;

  const transaction = {name, type: 'withdraw', amount, newBalance};
  await transactions.insertOne(transaction);

  return updateResult;}
  else {
    return "You can't withdraw more money than you have in your account!"
  }
}

async function balance(email) {
  const customerArray = await customers.find({ email }).toArray();
  if (customerArray.length === 0) {
    return {valid: false, response: 'There is no account associated with that email address.'}}
  else {
  const customer = customerArray[0];
  console.log('the customer is' + JSON.stringify(customer));
  const currentBalance = Number(customer.balance);
  console.log('the current balance is $' + currentBalance);
  return({valid: true, name: customer.name, balance: currentBalance})
  };
}

async function deleteAccount(email) {
  const customerArray = await customers.find({ email }).toArray();
  if (customerArray.length === 0) {
    return {valid: false, response: 'There is no account associated with that email address.'}}
  else {
  const customer = customerArray[0];
  const balance = Number(customer.balance);

  if (balance === 0) {
    await customers.deleteOne({email});
    return {valid: true, response: "Success! Your account has been closed. We retain a record of your transaction history."}
  }
    else {
      return {valid: false, response: "You must empty your account first!"}
    }
  }
}

async function allCustomers() {
  const findResult = await customers.find({}).toArray();
  console.log("Found documents =>", findResult);
  return findResult;
}

async function allTransactions() {
  const findResult = await transactions.find({}).toArray();
  console.log("Found documents =>", findResult);
  return findResult;
}


module.exports = { create, login, deposit, withdraw, balance, deleteAccount, allCustomers, allTransactions };
