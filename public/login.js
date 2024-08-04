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

firebase.auth().onAuthStateChanged ( firebaseUser => {
  if (firebaseUser) {
    loggedOutNavTabs.forEach(tab => document.getElementById(tab).style.display = 'none');
    userNavTabs.forEach(tab => document.getElementById(tab).style.display = 'inline');
    
    if (firebaseUser.email === 'griphook@gringotts.com') {
      document.getElementById('all-data').style.display = 'inline';
    }
  } else {
    loggedOutNavTabs.forEach(tab => document.getElementById(tab).style.display ='inline');
      userNavTabs.forEach(tab => document.getElementById(tab).style.display = 'none');
      document.getElementById('navbarDropdown').innerHTML = '';
      document.getElementById('all-data').style.display = 'none';
  }
})

function updateCtxCurrentUser (response) {
  ctx.currentUser.name = response.name;
  ctx.currentUser.email = response.email;
  ctx.currentUser.password = response.password;
  ctx.currentUser.balance = response.balance;
}

  function handle() {
    setStatus("");
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;

    // see authentication with Firebase lecture videos and:
    // https://firebase.google.com/docs/auth/web/password-auth
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
      .then( (userCredential) => {
        console.log(userCredential.user); // console log Firebase user

        // See MDN documentation:
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

        (async function getData () {
          const url = `/auth/account/login/${email}/${password}`;

          try {
            const response = await fetch(url, {
              method: 'GET'
            });
            if (!response.ok) {
              throw new Error (`Response status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.content); // console log data from the server
            if (data.valid) {
              updateCtxCurrentUser(data.content);
              setName(data.content.name);
              document.getElementById('navbarDropdown').innerHTML = data.content.name;
              localStorage.setItem('token', data.token);
              setShow(false);
            } else {
              setStatus('An error occurred: ' + data.content) 
              setTimeout(() => setStatus(""), 5000);
            }
          } catch (error) {
            console.error(error.message); // error authenticating with the server 
          }
        })();
      })
      .catch((error) => {
        console.log('Error Code: ' + error.code); // error authenticating with Firebase
        console.log('Error Message: ' + error.message); // error authenticating with Firebase
        setStatus('Firebase authentication failed.');
        setTimeout(() => setStatus(""), 5000);
      })
  }

  function clearForm() {
    localStorage.removeItem('token');
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
  const userNavTabs = ['deposit', 'withdraw', 'username', 'balance', 'delete-account'];

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