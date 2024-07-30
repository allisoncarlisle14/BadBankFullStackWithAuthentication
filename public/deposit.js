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

  function handle() {
    setStatus("");
    console.log('the current user is ', ctx.currentUser.name
    )
    if (!validate(deposit, "You must enter a positive number.")) return;
    let numberDeposit = Number(deposit);
    ctx.currentUser.balance += numberDeposit;
    const url = `/account/deposit/${ctx.currentUser.email}/${numberDeposit}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
    })();

    ctx.transactions.unshift({
      name: ctx.currentUser.name,
      type: "deposit",
      amount: deposit,
      updatedbalance: ctx.currentUser.balance,
    });
    setShow(false);
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
