// defining routing components which come from the React router library that we loaded in index.html
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link; // not used
const HashRouter = ReactRouterDOM.HashRouter;
// creating a context to be shared by our components
// the context object comes with a provider that takes a value, which is passed to the components that are consuming that context
const UserContext = React.createContext(null);

// the Card component allows all of the other components to reference this component and pass features that are relevant to the component
function Card(props) {
  function classes() {
    // use background color that was set if there is one; otherwise, use the default
    const bg = props.bgcolor ? "bg-" + props.bgcolor : "";
    // use text color that was set if there is one; otherwise, use white text
    const text = props.txtcolor ? "text-" + props.txtcolor : "text-white";
    return "card mb-3" + " " + bg + " " + text + " " + "d-inline-flex p-2";
  }

  return (
    <div className={classes()} style={{ width: "inherit" }}>
      <div className="card-header"> {props.header} </div>
      <div className="card-body">
        {props.title && <h5 className="card-title"> {props.title} </h5>}
        {props.text && <p className="card-text"> {props.text} </p>}
        {props.body}
        {props.status && <div id="createStatus"> {props.status} </div>}
      </div>
    </div>
  );
}
