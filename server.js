var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

// this tells the app to serve static files from the public directory
app.use(express.static("public"));
app.use(cors());

// create account
app.get("/account/create/:name/:email/:password", async function (req, res) {
  let response = await dal.create(req.params.name, req.params.email, req.params.password);
  res.send(response);
});

// login
app.get("/account/login/:email/:password", async function (req, res) {
  let response = await dal.login(req.params.email, req.params.password);
  res.send(response);
});

// deposit
app.get("/account/deposit/:email/:amount", async function (req, res) {
  let user = await dal.deposit(req.params.email, req.params.amount);
  res.send(user);
});

// withdraw
app.get("/account/withdraw/:email/:amount", async function (req, res) {
    let result = await dal.withdraw(req.params.email, req.params.amount);
    res.send(result);
  });
  
// balance
app.get("/account/balance/:email", async function (req, res) {
   let response = await dal.balance(req.params.email);
  res.send(response);
});

// delete account
app.get("/account/delete/:email", async function (req, res) {
  let response = await dal.deleteAccount(req.params.email);
  res.send(response);
});

// all customers
app.get("/account/all", async function (req, res) {
    console.log('attempting to get all data');
    try {
  const customers = await dal.allCustomers();
  console.log('Data sent to client', customers);
  res.send(customers);
    } catch (err) {
        console.log('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
});

// all transactions
app.get("/transactions/all", async function (req, res) {
  console.log('attempting to get all data');
  try {
const transactions = await dal.allTransactions();
console.log('Data sent to client', transactions);
res.send(transactions);
  } catch (err) {
      console.log('Error fetching data', err);
      res.status(500).send('Error fetching data');
  }
});

const port = 3000;
app.listen(port);
console.log("Running on port: 3000!");
