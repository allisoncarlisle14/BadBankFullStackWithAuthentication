function FormTemplate(props) {
  return props.show ? (
    <>
      {props.formMessages[0]}
      <br />
      <br />
      {props.data.map((entry) => (
        <div key={entry.id}>
          <label> {entry.title} </label>
          <input
            type={entry.type}
            className="form-control"
            id={entry.id}
            placeholder={entry.placeholder}
            value={entry.value}
            onChange={props.onChange}
          />
          <br />
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-light"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {" "}
        {props.submitButtonLabels[0]}{" "}
      </button>
    </>
  ) : (
    <>
      <h5> {props.formMessages[1]} </h5>
      <button type="submit" className="btn btn-light" onClick={props.onClear}>
        {" "}
        {props.submitButtonLabels[1]}{" "}
      </button>
    </>
  );
}
