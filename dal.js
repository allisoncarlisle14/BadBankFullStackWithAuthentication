const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "myProject";

let db = null;
let collection = null;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  collection = db.collection("users");

  return "done.";
}

main().then(console.log).catch(console.error);
//.finally(() => client.close());

async function create(name, email, password) {
  const doc = { name, email, password, balance: 0 };
  const customerArray = await collection.find({ email }).toArray();
  if (customerArray.length === 0) {
  await collection.insertOne(doc);
  const newCustomer = await collection.find({ email }).toArray();
  console.log("Customer inserted", newCustomer);
  return {valid: true, response: newCustomer}}
  else {
    return ({valid: false, response: 'A customer with that email address already exists!'})
  }
}

async function login(email, password) {
  const customerArray = await collection.find({ email, password }).toArray();
  if (customerArray.length === 0) {
  return {valid: false, response: 'The email address and password you have entered are incorrect.'}}
  else {
    const customer = customerArray[0];
    return ({valid: true, response: customer})
  }
}

async function deposit(email, amount) {
  const customerArray = await collection.find({ email }).toArray();
  const customer = customerArray[0];
  console.log('the customer is' + JSON.stringify(customer));
  const previousBalance = Number(customer.balance);
  console.log('the previous balance was' + previousBalance);
  const newBalance = previousBalance + Number(amount);
  console.log('the new balance is' + newBalance);
  const updateResult = await collection.updateOne({email}, {$set: {balance: newBalance}});
  console.log('Updated documents', updateResult);
  return updateResult;
}

async function withdraw(email, amount) {
  const customerArray = await collection.find({ email }).toArray();
  const customer = customerArray[0];
  console.log('the customer is' + JSON.stringify(customer));
  const previousBalance = Number(customer.balance);
  console.log('the previous balance was' + previousBalance);
  if (Number(amount) <= previousBalance) {
  const newBalance = previousBalance - Number(amount);
  console.log('the new balance is' + newBalance);
  const updateResult = await collection.updateOne({email}, {$set: {balance: newBalance}});
  console.log('Updated documents', updateResult);
  return updateResult;}
  else {
    return "You can't withdraw more money than you have in your account!"
  }
}

async function balance(email) {
  const customerArray = await collection.find({ email }).toArray();
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

async function all() {
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return findResult;
}

module.exports = { create, login, deposit, withdraw, balance, all };
