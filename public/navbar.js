function NavBar() {

  const ctx = React.useContext(UserContext);
  
  function logout () {
    ctx.currentUser = {name: "",
      email: "",
      password: "",
      balance: 0
    };
    firebase.auth().signOut()
      .then ( () => {
        console.log('Successfully signed out.');
        loggedOutNavTabs.forEach(tab => document.getElementById(tab).style.display = 'inline');
        userNavTabs.forEach(tab => document.getElementById(tab).style.display = 'none');
        document.getElementById('navbarDropdown').innerHTML = '';
        if (!document.getElementById('all-data').style.display === 'none') {
          document.getElementById('all-data').style.display = 'none';
        }
      })
      .catch ( (error) => {
        console.log('Error code: ' + error.code);
        console.log('Error message: ' + error.message);
      })
  }

  const loggedOutNavTabs = ['create-account', 'login'];
  const userNavTabs = ['deposit', 'withdraw', 'username', 'balance'];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" id = "create-account">
              <a className="nav-link" href="#/CreateAccount" >
                Create Account
              </a>
            </li>
            <li className="nav-item" id = "login" >
              <a className="nav-link" href="#login">
                Login
              </a>
            </li>
            <li className="nav-item" id = "deposit" style = {{ display: "none" }}>
              <a className="nav-link" href="#deposit">
                Deposit
              </a>
            </li>
            <li className="nav-item" id = "withdraw" style = {{ display: "none" }}>
              <a className="nav-link" href="#withdraw">
                Withdraw
              </a>
            </li>
            <li className="nav-item" id = "balance" style = {{ display: "none" }}>
              <a className="nav-link" href="#balance">
                Balance
              </a>
            </li>
            <li className="nav-item" id = "all-data" style = {{ display: "none" }}>
              <a className="nav-link" href="#alldata">
                AllData
              </a>
            </li>
            </ul>
        <ul className ="navbar-nav ml-auto padRight" >
        <li className="nav-item dropdown" id = "username" style = {{ display: "none" }}>
        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#" onClick = {logout} >Log Out</a>
        </div>
        </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}