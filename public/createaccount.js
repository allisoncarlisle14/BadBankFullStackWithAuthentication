function CreateAccount() {

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);

  function validateName (entry) {
    if (!entry) {
      setStatus("Error: You must enter a valid name.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function validateEmail (entry) {
    if (!entry || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(entry)) {
      setStatus("Error: You must enter a valid email address.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } 
    return true;
  }

  function validatePassword(entry) {
    if (entry.length < 8) {
      setStatus("Error: You must enter a password that is at least 8 characters long.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function change(e) {
    switch (e.currentTarget.id) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
    }
    setButtonDisabled(
      !document.getElementById("name").value &&
      !document.getElementById("email").value &&
      !document.getElementById("password").value
    );
  }

  function toggleNavTabs(status, user) {
    if (status === 'loggedOut') {
      loggedOutNavTabs.forEach(tab => document.getElementById(tab).style.display ='inline');
      userNavTabs.forEach(tab => document.getElementById(tab).style.display = 'none');
      document.getElementById('navbarDropdown').innerHTML = '';
      if (!document.getElementById('all-data').style.display === 'none') {
        document.getElementById('all-data').style.display = 'none';
    }
  } else if (status === 'loggedIn') {
    loggedOutNavTabs.forEach(tab => document.getElementById(tab).style.display = 'none');
    userNavTabs.forEach(tab => document.getElementById(tab).style.display = 'inline');
    document.getElementById('navbarDropdown').innerHTML = user;
  }
}

// function createFirebaseUser () {
//   const auth = firebase.auth();
//   const promise = auth.createUserWithEmailAndPassword(email, password);
//   promise.catch(e => console.log(e.message));
// }

  function handle() {
    setStatus("");
    console.log(name, email, password);
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) {return};

    // createFirebaseUser();
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
      .then ((userCredential) => {
        console.log(userCredential.user);
        const url = `/account/create/${name}/${email}/${password}`;
        (async () => {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        if (data.valid) {
          ctx.currentUser = {name, email, password, balance: 0};
          toggleNavTabs('loggedIn', name);
          setShow(false);
        } else {
          setStatus('An error occured: ' + data.response);
        }
        })();
      })
      .catch( (error) => {
        console.log('Error Code: ' + error.code);
        console.log('Error Message: ' + error.message);
        setStatus(error.message);
      })
  };

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    toggleNavTabs('loggedOut', '');
  }
  

  const inputFields = [
    {
      title: "Name",
      type: "input",
      id: "name",
      placeholder: "Enter name",
      value: name,
    },
    {
      title: "Email",
      type: "input",
      id: "email",
      placeholder: "Enter email",
      value: email,
    },
    {
      title: "Password",
      type: "password",
      id: "password",
      placeholder: "Enter password",
      value: password,
    },
  ];

  const submitButtonLabels = ["Create Account", "Create Another Account"];

  const formMessages = [
    "Enter your name, email address, and password to create an account.",
    "Success! You are now signed in as " + name,
  ];

  const loggedOutNavTabs = ['create-account', 'login'];
  const userNavTabs = ['deposit', 'withdraw', 'username', 'balance'];
  

  return (
    <>
      <Card
        bgcolor="warning"
        header="Create Account"
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
