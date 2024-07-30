function AllData() {

  const [data, setData] = React.useState([]);

  React.useEffect( () => {
    console.log('React Use Effect Called')
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
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
        headings={["ID", "Name", "Email", "Password", "Balance"]}
        data={data}
      />
    ),
  };

  // const transactionData = {
  //   bgcolor: "white",
  //   txtcolor: "primary",
  //   header: "All Transation Data",
  //   title: "User Data",
  //   text: "Here is a history of user transactions from most to least recent.",
  //   body: (
  //     <DataTable
  //       headings={["Name", "Transaction Type", "Amount", "Update Balance"]}
  //       data={ctx.transactions}
  //     />
  //   ),
  // };

  return (
    <div>
      <Card {...userData} />
      {/* <Card {...transactionData}/> */}
    </div>
  );
}
