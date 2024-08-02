function DeleteAccount() {
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
      } else if (email !== ctx.currentUser.email) {
        setStatus("Error: You must enter the email address associated with this account before proceeding.");
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
      setEmail("");
      ctx.currentUser = {name: "",
        email: "",
        password: "",
        balance: 0
      };
      const url = `/account/delete/${email}`;
      (async () => {
        let res = await fetch(url);
        let data = await res.json();
        if (data.valid) {
          setShow(false);
          console.log(data.response);
          const auth = firebase.auth();
          const user = auth.currentUser;
          user.delete()
            .then ( () => {
                console.log('Successfully deleted user from FireBase.');
            })
            .catch ( (error) => {
            console.log('Error code: ' + error.code);
            console.log('Error message: ' + error.message);
        })
        }
        setStatus(data.response);
      })();
    }
  
    function clearForm() {
      
      firebase.auth().signOut()
        .then ( () => {
          console.log('Successfully signed out.');
        })
        .catch ( (error) => {
          console.log('Error code: ' + error.code);
          console.log('Error message: ' + error.message);
        })

    }
  
    const inputFields = [
      {
        title: "Email",
        type: "input",
        id: "email",
        placeholder: "Enter your email address.",
        value: email,
      },
    ];
  
    const submitButtonLabels = ["Close Account", "Create a new account"];
  
    const formMessages = [`Hello, ${ctx.currentUser.name}. Enter your email and click the button to permanently close your account.`, "We're sorry to see you go"];
  
    
      return (
      <>
        <Card
          bgcolor="dark"
          header="Close my account"
          text={
            ''
          }
          status={status}
          body={
            <HashRouter>
                <Route path="/CreateAccount" component={CreateAccount} />
            <FormTemplate
              show={show}
              formMessages={formMessages}
              data={inputFields}
              onChange={change}
              disabled={buttonDisabled}
              onClick={handle}
              submitButtonLabels={submitButtonLabels}
              onClear={clearForm}
              href = "#/CreateAccount"
            />
            </HashRouter>
          }
        />
      </>
    )
}