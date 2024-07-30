function Home() {
  // the attributes are passed in as props to the Card component
  return (
    <Card
      bgcolor="white"
      txtcolor="primary"
      header="BadBank Landing Page"
      title="Welcome to Bad Bank"
      text="Thank you for using Bad Bank."
      body={<img src="bank.png" className="img-fluid" alt="Bad Bank Logo" />}
    />
  );
}
