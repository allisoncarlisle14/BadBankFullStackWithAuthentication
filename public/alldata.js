function AllData() {

  const [accounts, setAccounts] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect( () => {
    console.log('React Use Effect Called')
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        data.forEach(entry => delete entry._id);
        console.log(data);
        setAccounts(data);
      })
     .catch(error => console.error('Error fetching data: ', error));
  }, []);


  React.useEffect( () => {
    console.log('React Use Effect Called')
    // fetch all transactions from API
    fetch('/transactions/all')
      .then(response => response.json())
      .then(data => {
        data.reverse();
        data.forEach(entry => delete entry._id);
        console.log(data);
        setTransactions(data);
      })
     .catch(error => console.error('Error fetching data: ', error));
  }, []);


  const userData = {
    bgcolor: "info",
    txtcolor: "white",
    header: "All User Data",
    title: "User Data",
    text: "Here is a list of all users and their current account information.",
    body: (
      <DataTable
        headings={["Name", "Email", "Password", "Balance"]}
        data={accounts}
      />
    ),
  };

  const transactionData = {
    bgcolor: "white",
    txtcolor: "primary",
    header: "All Transation Data",
    title: "User Data",
    text: "Here is a history of user transactions from most to least recent.",
    body: (
      <DataTable
        headings={["Name", "Transaction Type", "Amount", "Updated Balance"]}
        data={transactions}
      />
    ),
  };

  return (
    <div>
      <Card {...userData} />
      <Card {...transactionData}/>
    </div>
  );
}
