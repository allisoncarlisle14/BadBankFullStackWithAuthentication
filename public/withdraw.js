function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);
  

  function validate(field, label) {
    if (Number(field) <= 0 || Number(field) > ctx.currentUser.balance) {
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
    setWithdraw(e.currentTarget.value);
    setButtonDisabled(!e.currentTarget.value);
  }

  function handle() {
    setStatus("");
    if (!validate(withdraw, "Please enter a valid amount.")) return;
    let numberWithdraw = Number(withdraw);
    ctx.currentUser.balance -= numberWithdraw;
    const url = `/account/withdraw/${ctx.currentUser.email}/${numberWithdraw}`;
    (async () => {
      let res = await fetch(url);
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
    "Make another withdraw.",
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
