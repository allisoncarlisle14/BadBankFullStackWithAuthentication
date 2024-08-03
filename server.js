var express = require("express");
const app = express();
var router = express.Router();
var cors = require("cors");
var dal = require("./dal.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { generateToken, verifyToken } = require("./utils/jwt.js");

// Never got this authMiddleware function to work. Would like to as an improvement.
// Would also like to add authorization for different roles. So most people will be users, and then admins can access the account/all and transactions/all routes
function authMiddleware(req, res, next) {
  const token = req.headers["Authorization"];
  console.log("the token intercepted by deposit is " + token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }

  req.user = decoded;
  next();
}

// this tells the app to serve static files from the public directory
app.use(express.static("public"));
app.use("/auth", router);
app.use(cors());

// create account
router.get("/account/create/:name/:email/:password", async function (req, res) {
  const response = await dal.create(
    req.params.name,
    req.params.email,
    req.params.password
  );

  // Generating a Json Web Token using the customer's id in the database
  if (response.valid) {
    const token = generateToken({ ID: response.content._id });
    response.token = token;
  } 
  // res.send(response);
  res.json(response);
});

// login
router.get("/account/login/:email/:password", async function (req, res) {
  const response = await dal.login(req.params.email, req.params.password);

  // Generating a Json Web Token using the customer's id in the database
  if (response.valid) {
    const token = generateToken({ ID: response.content._id });
    response.token = token;

    
  }
  // res.send(response);
  res.json(response);
});

// deposit
router.post("/account/deposit", async function (req, res) {
  const { email, amount, token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  const response = await dal.deposit(email, amount);
  console.log(response); // console log response 
  res.send(response);
});

// withdraw
router.post("/account/withdraw", async function (req, res) {
  const { email, amount, token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  const response = await dal.withdraw(email, amount);
  console.log(response); // console log response 
  res.send(response);
});

// balance
router.post("/account/balance", async function (req, res) {
  const { email, token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  const response = await dal.balance(email);
  console.log(response); // console log response 
  res.send(response);
});

// delete account
router.post("/account/delete", async function (req, res) {
  const { email, token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  const response = await dal.deleteAccount(email);
  console.log(response); // console log response 
  res.send(response);
});

// all customers
router.post("/account/all", async function (req, res) {
  const { token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  console.log("attempting to get all user data");
  const customers = await dal.allCustomers();
  console.log("Data sent to client", customers); // console log customer data 
  res.send(customers);
 
});

// all transactions
router.post("/transactions/all", async function (req, res) {
  const { token } = req.body;

  // Checking for JWT authentication
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized: incorrect token" });
  }
  req.user = decoded;

  console.log("attempting to get all transaction data");
  const transactions = await dal.allTransactions();
  console.log("Data sent to client", transactions); // console log transaction data
  res.send(transactions);

});

const port = 3000;
app.listen(port);
console.log("Running on port: 3000!");
