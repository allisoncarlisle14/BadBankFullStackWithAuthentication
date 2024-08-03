function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (Number(field) <= 0) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    if (isNaN(field)) {
      setStatus("Error: " + label);
      return false;
    }
    return true;
  }

  function change(e) {
    setDeposit(e.currentTarget.value);
    setButtonDisabled(!e.currentTarget.value);
  }

  async function handle() {
    setStatus("");
    
    if (!validate(deposit, "You must enter a positive number.")) return;
    let numberDeposit = Number(deposit);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      setStatus("Authentication error.")
      return;
    }

    // See MDN documentation https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    (async function updateData () {
      const requestBody = {email: ctx.currentUser.email, amount: numberDeposit, token: token}
      const url = `/auth/account/deposit`;

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
        if (data.valid) {
          ctx.currentUser.balance = data.content.balance;
          setShow(false);
        
        } else {
          // no action required because console.log(data.response), below, will console log a message whether the data is valid or not.
        }
        console.log(data.content); // console log data from the server.
      } catch (error) {
        console.error(error.message); // error communicating with the server.
      }
    })();
  }

  function clearForm() {
    setDeposit(0);
    setButtonDisabled(true);
    setShow(true);
  }

  const inputFields = [
    {
      title: "Deposit Amount",
      type: "input",
      id: "deposit",
      placeholder: "Deposit Amount",
      value: deposit,
    },
  ];

  const submitButtonLabels = ["Deposit", "Refresh Form"];

  const formMessages = [
    "Your account balance is $" + ctx.currentUser.balance + ".",
    "Success! Click the button to refresh the form."
  ];

  return (
    <>
      <Card
        bgcolor="success"
        header={"Hello, " + ctx.currentUser.name + "."}
        text={"Deposit money into your account here."}
        status={status}
        body={
          <FormTemplate
            show={show}
            formMessages={formMessages}
            data={inputFields}
            onChange={change}
            disabled={buttonDisabled}
            onClick={handle}
            submitButtonLabels={submitButtonLabels}
            onClear={clearForm}
          />
        }
      />
    </>
  );
}
