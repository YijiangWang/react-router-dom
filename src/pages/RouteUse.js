import { Component, useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Prompt,
} from "react-router-dom";

export default function RouteUse() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h4 onClick={() => setCount(count + 1)}>RouteUse-{count}</h4>
      <Router>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/detail">Detail</Link>&nbsp;
        <Link to="/user">User</Link>&nbsp;
        <Link to="/product/detail">产品说明</Link>&nbsp;
        <Link to="/product/price">产品价格</Link>

        <Switch>
          <Route
            path="/"
            exact
            children={() => {
              return <Compare />;
            }}
            component={Compare}
            render={() => {
              return <Compare />;
            }}
          />
          <Route path="/detail" component={Detail} />
          <Route path="/user" component={User} />
          <Route path="/product/:name" component={DynamicRoute} />
          <Route path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
          <Redirect from="/*" to="/error" />
        </Switch>
      </Router>
    </div>
  );
}

// [route props]：history、location、match
function DynamicRoute({ match }) {
  console.log("DynamicRoute: ", match);
  const { url, params } = match;
  return (
    <div>
      <h4>DynamicRoute: {params.name}</h4>
      <Link to={url + "/count"}>销售量</Link>
      <Route path={url + "/count"} component={Count} />
      <Link to='/'>go home</Link>
      <Prompt 
        when={true}
        message='Are you ok?'
      />
    </div>
  );
}
function Count() {
  return <h4>Count</h4>;
}

class Compare extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    return (
      <div>
        <h4>Compare</h4>
      </div>
    );
  }
}

function Home() {
  return (
    <div>
      <h4>Home</h4>
    </div>
  );
}
function Detail() {
  return (
    <div>
      <h4>Detail</h4>
    </div>
  );
}
function User() {
  return (
    <div>
      <h4>User</h4>
    </div>
  );
}
function ErrorPage() {
  return <h4>404 page</h4>;
}
