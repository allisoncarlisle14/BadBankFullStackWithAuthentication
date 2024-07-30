function AddData(props) {
  console.log(props.data);
  return props.data.map((entry, index) => (

    <tr key={index}>
      <td> {Object.values(entry)[0]} </td>
      <td> {Object.values(entry)[1]} </td>
      <td> {Object.values(entry)[2]} </td>
      <td> {Object.values(entry)[3]} </td>
      <td> {Object.values(entry)[4]} </td>
    </tr>
    
  ));

}
