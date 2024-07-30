function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);

  function validate(field) {
    if (!field) {
      setStatus("Error: required field.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)){
      setStatus("Error: You must enter a valid email address.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function change(e) {
    setEmail(e.currentTarget.value);
    setButtonDisabled(!e.currentTarget.value);
  }

  function handle() {
    setStatus("");
    if (!validate(email)) return;
    const url = `/account/balance/${email}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.valid) {
        setName(data.name);
        setBalance(data.balance);
        setShow(false);
        }
      else {
        setStatus('An error occured: ' + data.response);
      }
    })();
  }

  function clearForm() {
    setEmail("");
    setShow(true);
  }

  const inputFields = [
    {
      title: "Email",
      type: "input",
      id: "email",
      placeholder: "Enter the email address for any account.",
      value: email,
    },
  ];

  const submitButtonLabels = ["Check Balance", "Refresh Form"];

  const formMessages = [
    `Hello, ${ctx.currentUser.name}. Your account balance is $${ctx.currentUser.balance}. You may check the balance of any account here.`,
    name + "'s account balance is $" + balance + ".",
  ];


  if (ctx.currentUser.name === 'Griphook') {
    return (
    <>
      <Card
        bgcolor="dark"
        header="Balance"
        text={
          ''
        }
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
  )
} else {
  return (
    <>
      <Card
        bgcolor="dark"
        header="Balance"
        text={
          `Hello, ${ctx.currentUser.name}. Your account balance is $${ctx.currentUser.balance}.`
        }
        status={status}
        body={
          ''
        }
      />
    </>
  )
}
}
