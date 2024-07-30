function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);
  

  function validateEmail (entry) {
    if (!entry || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(entry)) {
      setStatus("Error: You must enter a valid email address.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } 
    return true;
  }

  function validatePassword(entry) {
    if (!entry) {
      setStatus("Error: You must enter a password.");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }
  
  function change(e) {
    switch (e.currentTarget.id) {
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
    }
    setButtonDisabled(
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
    if (email === 'griphook@gringotts.com') {
      document.getElementById('all-data').style.display = 'inline';
      }
  }
}

function updateCtxCurrentUser (response) {
  ctx.currentUser.name = response.name;
  ctx.currentUser.email = response.email;
  ctx.currentUser.password = response.password;
  ctx.currentUser.balance = response.balance;
}

// function IsFirebaseUser () {
//   const auth = firebase.auth();
//   // const promise = auth.signInWithEmailAndPassword(email, password)
//   // promise.catch(e => console.log(e.message));
//   auth.signInWithEmailAndPassword(email, password)
//     .then( (userCredential) => {
//       console.log(userCredential.user);
//       return true;
//     })
//     .catch((error) => {
//       console.log('Error Code: ' + error.code);
//       console.log('Error Message: ' + error.message);
//       return false;
//     })
// }

  function handle() {
    setStatus("");
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
      .then( (userCredential) => {
        console.log(userCredential.user);
        const url = `/account/login/${email}/${password}`;
        (async () => {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        if (data.valid) {
          updateCtxCurrentUser(data.response);
          setName(data.response.name);
          setShow(false);
          toggleNavTabs('loggedIn', data.response.name);
        } else {
          setStatus('An error occured: ' + data.response);
        }
        })();
      })
      .catch((error) => {
        console.log('Error Code: ' + error.code);
        console.log('Error Message: ' + error.message);
        setStatus(error.message);
      })
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setButtonDisabled(true);
    ctx.currentUser = {name: "",
      email: "",
      password: "",
      balance: 0
    };
    firebase.auth().signOut()
      .then ( () => {
        console.log('Successfully signed out.');
        toggleNavTabs('loggedOut', '');
        setShow(true);
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

  const submitButtonLabels = ["Log In", "Log Out"];

  const formMessages = ["Welcome.", "Welcome, " + name + "."];

  const loggedOutNavTabs = ['create-account', 'login'];
  const userNavTabs = ['deposit', 'withdraw', 'username', 'balance'];

  return (
    <>
      <Card
        bgcolor="primary"
        header="Login"
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