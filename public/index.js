function Spa() {

  return (
    // using the routing components loaded in context.js to create a routing mechanism that points to components
    // the context provider tag takes an initial value, which is shared by all of the consuming components
    <HashRouter>
      <UserContext.Provider
        value={{
          currentUser: {name: "",
            email: "",
            password: "",
            balance: 0
          },
          transactions: [],
        }}
      >
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/CreateAccount" component={CreateAccount} />
        <Route path="/login" component={Login} />
        <Route path="/deposit" component={Deposit} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/balance" component={Balance} />
        <Route path="/alldata" component={AllData} />
      </UserContext.Provider>
    </HashRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Spa />);


