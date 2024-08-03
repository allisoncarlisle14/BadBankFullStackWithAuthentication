function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);
  

  function validate(field) {
    if (Number(field) <= 0 || isNaN(field)) {
      setStatus("Error: You must enter a positive number.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    if (Number(field) > ctx.currentUser.balance) {
      setStatus("Error: That's more money than you have in your account!");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }

    return true;
  }

  function change(e) {
    setWithdraw(e.currentTarget.value);
    setButtonDisabled(!e.currentTarget.value);
  }

  function handle() {
    setStatus("");
    if (!validate(withdraw)) return;
    let numberWithdraw = Number(withdraw);
    ctx.currentUser.balance -= numberWithdraw;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      setStatus("Authentication error.")
      return;
    }

    const requestBody = {email: ctx.currentUser.email, amount: numberWithdraw, token: token}
    const url = `/auth/account/withdraw`;

    (async () => {
      let res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
      });
      let data = await res.json();
      console.log(data);
    })();

    ctx.transactions.unshift({
      name: ctx.currentUser.name,
      type: "withdraw",
      amount: withdraw,
      updatedbalance: ctx.currentUser.balance,
    });
    setShow(false);
  }


  function clearForm() {
    setWithdraw(0);
    setButtonDisabled(true);
    setShow(true);
  }

  const inputFields = [
    {
      title: "Withdraw Amount",
      type: "input",
      id: "withdraw",
      placeholder: "Withdraw Amount",
      value: withdraw,
    },
  ];

  const submitButtonLabels = ["Withdraw", "Refresh Form"];

  const formMessages = [
    "Your account balance is $" + ctx.currentUser.balance + ".",
    "Success! Click the button to refresh the form."
  ];

  return (
    <>
      <Card
        bgcolor="danger"
        header={"Hello, " + ctx.currentUser.name + "."}
        text={"Withdraw money from your account here."}
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
