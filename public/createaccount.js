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


  function handle() {
    setStatus("");
   
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) {return};

    // see authentication with Firebase lecture videos and https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account

    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
      .then( (userCredential) => {
        console.log(userCredential.user); // console log Firebase user

        (async function createData () {
          const url = `/auth/account/create/${name}/${email}/${password}`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error (`Response status: ${response.status}`);
            }
            const data = await response.json();
            if (data.valid) {
              ctx.currentUser.name = data.content.name;
              ctx.currentUser.email = data.content.email;
              ctx.currentUser.password = data.content.password;
              ctx.currentUser.balance = 0;
              console.log(data.content); // console log user in database
              document.getElementById('navbarDropdown').innerHTML = data.content.name;
              localStorage.setItem('token', data.token);
              setShow(false);
            } else {
              setStatus('An error occurred: ' + data.content) // maybe come up with a different name than content on the back end?
              setTimeout(() => setStatus(""), 5000);
            }
            
          } catch (error) {
            console.error(error.message); // error authenticating with the server 
          }
        })();
      })
      .catch( (error) => {
        console.error('Error Code: ' + error.code); // error authenticating with Firebase
        console.error('Error Message: ' + error.message); // error authenticating with Firebase
        setStatus("Firebase authentication failed.");
        setTimeout(() => setStatus(""), 5000);
      })
    
  };

  function clearForm() {
    localStorage.removeItem('token'); 

    setName("");
    setEmail("");
    setPassword("");
    ctx.currentUser = {name: "",
      email: "",
      password: "",
      balance: 0
    };

    // see authentication with Firebase lecture videos and https://firebase.google.com/docs/auth/web/password-auth

    firebase.auth().signOut()
      .then (() => {
        console.log('Successfully signed out of Firebase.');
        setShow(true);
      })
      .catch ( (error) => {
        console.error('Error code: ' + error.code); // error signing out of Firebase
        console.error('Error message: ' + error.message); // error signing out of Firebase
      })
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
