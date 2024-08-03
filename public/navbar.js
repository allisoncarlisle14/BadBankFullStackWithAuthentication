function NavBar() {

  const ctx = React.useContext(UserContext);
  
  function logout () {
    localStorage.removeItem('token');
    ctx.currentUser = {name: "",
      email: "",
      password: "",
      balance: 0
    };
    firebase.auth().signOut()
      .then ( () => {
        console.log('Successfully signed out.');
      })
      .catch ( (error) => {
        console.log('Error code: ' + error.code);
        console.log('Error message: ' + error.message);
      })
  }

  function setActiveTab (e) {
    for (let i = 0; i < navLinkIds.length; i ++) {
      if (navLinkIds[i] !== e.currentTarget.getAttribute('id')) {
        let element = document.getElementById(navLinkIds[i]);
        element.style.backgroundColor = '';
        element.style.color = '';
      }
    }
    let element = document.getElementById(e.currentTarget.getAttribute('id'));
    element.style.backgroundColor = '#0d6efd';
    element.style.color = 'white';

  }

  const navLinkIds = ['home-link', 'create-account-link', 'login-link', 'deposit-link', 'withdraw-link', 'balance-link', 'delete-account-link', 'all-data-link'];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid padLeft" >
        <a className="navbar-brand" id = "home-link" href="#" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
          BadBank
          <span className = "homepage-tooltip-text"> Bad Bank's landing page. </span>
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
              <a className="nav-link" id = "create-account-link" href="#/CreateAccount" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
                Create Account
                <span className = "navtab-tooltip-text"> Create an account with Bad Bank. </span>
              </a>
            </li>
            <li className="nav-item" id = "login" >
              <a className="nav-link" id = "login-link" href="#login" style = {{borderRadius: '5px'}}onClick = {e => setActiveTab(e)}>
                Login
                <span className = "navtab-tooltip-text"> Log in to Bad Bank. </span>
              </a>
            </li>
            <li className="nav-item" id = "deposit" style = {{ display: "none" }}>
              <a className="nav-link" id = "deposit-link" href="#deposit" style = {{borderRadius: '5px'}}onClick = {e => setActiveTab(e)}>
                Deposit
                <span className = "navtab-tooltip-text"> Deposit money into your account. </span>
              </a>
            </li>
            <li className="nav-item" id = "withdraw" style = {{ display: "none" }}>
              <a className="nav-link" id = "withdraw-link" href="#withdraw" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
                Withdraw
                <span className = "navtab-tooltip-text"> Withdraw money from your account. </span>
              </a>
            </li>
            <li className="nav-item" id = "balance" style = {{ display: "none" }}>
              <a className="nav-link" id = "balance-link" href="#balance" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
                Balance
                <span className = "navtab-tooltip-text"> Check your account balance. </span>
              </a>
            </li>
            <li className="nav-item" id = "delete-account" style = {{ display: "none" }}>
              <a className="nav-link" id = "delete-account-link" href="#DeleteAccount" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
                Delete Account
                <span className = "navtab-tooltip-text"> Close your account with Bad Bank. </span>
              </a>
            </li>
            <li className="nav-item" id = "all-data" style = {{ display: "none" }}>
              <a className="nav-link" id = "all-data-link" href="#alldata" style = {{borderRadius: '5px'}} onClick = {e => setActiveTab(e)}>
                AllData
                <span className = "navtab-tooltip-text"> See user data and transaction history. </span>
              </a>
            </li>
            </ul>
        <ul className ="navbar-nav ml-auto padRight" >
        <li className="nav-item dropdown" id = "username" style = {{ display: "none" }}>
        <a className="nav-link dropdown-toggle" id="navbarDropdown" style = {{borderRadius: '5px'}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        
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