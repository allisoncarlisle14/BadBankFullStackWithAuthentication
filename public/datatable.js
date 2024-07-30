function DataTable(props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col"> {props.headings[0]} </th>
          <th scope="col"> {props.headings[1]} </th>
          <th scope="col"> {props.headings[2]} </th>
          <th scope="col"> {props.headings[3]} </th>
          <th scope="col"> {props.headings[4]} </th>
        </tr>
      </thead>
      <tbody>
        <AddData data={props.data} />
      </tbody>
    </table>
  );
}
