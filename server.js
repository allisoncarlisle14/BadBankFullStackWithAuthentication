var express = require("express");
const app = express();
var router = express.Router();
var cors = require("cors");
var dal = require("./dal.js");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { generateToken, verifyToken } = require('./utils/jwt.js');

// Never got this to work. Would like to as an improvement.
function authMiddleware(req, res, next) {
  const token = req.headers['Authorization'];
  console.log('the token intercepted by deposit is '+ token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;
  next();
}

// this tells the app to serve static files from the public directory
app.use(express.static("public"));
app.use('/auth', router);
app.use(cors());

// create account
router.post("/account/create/:name/:email/:password", async function (req, res) {

  let response = await dal.create(req.params.name, req.params.email, req.params.password);
  if (response.valid) {
    const token = generateToken({username: response.content.name});
    response.token = token;
    
    res.json(response);
  } else {
    res.send(response);
  }
});

// login
router.post("/account/login/:email/:password", async function (req, res) {
  let result = await dal.login(req.params.email, req.params.password);

  if (result.valid) {
    const token = generateToken({username: result.content.name});
    result.token = token;
    
    res.json(result);
    
    // res.send(response);
  } else {
    res.status(401).json({error: 'Invalid credentials'});
  }
  
});

// deposit
router.post("/account/deposit", async function (req, res) {

  const {email, amount, token } = req.body;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;
  let user = await dal.deposit(email, amount);
  res.send(user);
});

// withdraw
router.post("/account/withdraw", async function (req, res) {
    const {email, amount, token } = req.body;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: no token' });
    }
  
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: incorrect token' });
    }
  
    req.user = decoded;
    let result = await dal.withdraw(email, amount);
    res.send(result);
  });
  
// balance
router.post("/account/balance", async function (req, res) {
  const {email, token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;
  let response = await dal.balance(email);
  res.send(response);
});

// delete account
router.post("/account/delete", async function (req, res) {
  const {email, token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;

  let response = await dal.deleteAccount(email);
  res.send(response);
});

// all customers
router.post("/account/all", async function (req, res) {
  const {token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;


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
router.post("/transactions/all", async function (req, res) {

  const {token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: no token' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: incorrect token' });
  }

  req.user = decoded;

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
