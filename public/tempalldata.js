function AllData() {
  
    const [data, setData] = React.useState('');
  
    React.useEffect( () => {
      console.log('React Use Effect Called')
      // fetch all accounts from API
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(JSON.stringify(data));
        })
    })
  
    return (
      <>
        <h5>All data in store:</h5>
        {data}
      </>
    );
  }
  