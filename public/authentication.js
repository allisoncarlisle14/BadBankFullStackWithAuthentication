function Authentication() {
  const ctx = React.useContext(UserContext);
  [user, setUser] = React.useState("");

  React.useEffect(() => {
    setUser[ctx.currentUser];
  }, [ctx.currentUser]);
}
