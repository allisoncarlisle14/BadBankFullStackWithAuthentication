function AllData() {

  const [accounts, setAccounts] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
 
  React.useEffect( () => {
    console.log('React Use Effect Called') // console.log('React Use Effect Called')
    // fetch all accounts from API

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      setStatus("Authentication error.")
      return;
    }

    // The request body is the payload of the request (what the client sends to the server) and is passed as the body option. 
    // See MDN documentation https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    (async function getData () {
      const requestBody = {token: token};
      const url = `/auth/account/all`;
    // The default method is GET, but you can't include a body with GET, which is why the method is POST.
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
          throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach(entry => delete entry._id);
        console.log(data); // console log data
        setAccounts(data);

      } catch (error) {
        console.error(error.message);
      }
    })()
  }, []);

  React.useEffect( () => {
    console.log('React Use Effect Called')
    // fetch all transactions from API

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      setStatus("Authentication error.")
      return;
    }

    (async function getData () {
      const requestBody = {token: token}
      const url = `/auth/transactions/all`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
          throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach(entry => delete entry._id);
        console.log(data); // console log data
        setTransactions(data);

      } catch (error) {
        console.error(error.message);
      }
    })()
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
    bgcolor: "info",
    txtcolor: "white",
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
