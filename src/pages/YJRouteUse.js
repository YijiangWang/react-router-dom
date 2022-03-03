import React,{ Component, useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  useRouteMatch,
  withRouter,
  Redirect,
  Prompt,
} from "../yj-react-router-dom";

export default function YJRouteUse() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h4 onClick={() => setCount(count + 1)}>YJRouteUse-{count}</h4>
      <Router>
        <Link to="/">Home</Link>&nbsp;&nbsp;
        <Link to="/detail">Detail</Link>&nbsp;&nbsp;
        <Link to="/user">User</Link>&nbsp;&nbsp;
        <Link to="/product/detail">产品说明</Link>&nbsp;&nbsp;
        <Link to="/product/price">产品价格</Link>
        <Switch>
          <Route
            path="/"
            exact
            children={() => {
              return <Compare />;
            }}
            component={Home}
            render={() => {
              return <Compare />;
            }}
          />
          <Route path="/detail" component={Detail} />
          <Route path="/user" component={User} />
          <Route 
            path="/product/:name" 
            // component={DynamicRoute} 
            render={() => <DynamicRouteCls />}
          />
          {/* <Route component={ErrorPage} /> */}
          <Route path="/error" component={ErrorPage} />
          <Redirect from="/*" to="/error" />
        </Switch>
      </Router>
    </div>
  );
}

// [route props]：history、location、match
/**
 * 通过 Route 中的函数传递参数
 */
// function DynamicRoute({ match }) {
//   console.log("DynamicRoute: ", match, useRouteMatch());
//   const { url, params } = match;
//   return (
//     <div>
//       <h4>DynamicRoute: {params.name}</h4>
//       <Link to={url + "/count"}>销售量</Link>
//       <Route path={url + "/count"} component={Count} />
//     </div>
//   );
// }
/**
 * 通过自定义 hook 获取 match 【Provider 可嵌套】
 */
// function DynamicRoute() {
//   console.log("DynamicRoute: ", useRouteMatch());
//   const { url, params } = useRouteMatch();
//   return (
//     <div>
//       <h4>DynamicRoute: {params.name}</h4>
//       <Link to={url + "/count"}>销售量</Link>
//       <Route path={url + "/count"} component={Count} />
//     </div>
//   );
// }
/**
 * 类组件中的使用方法，通过 hoc 方法
 */
class DynamicRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true}
  }
  render() {
    const {url, params} = this.props.match;
    return (
      <div>
        <h4>DynamicRoute: {params.name}</h4>
        <Link to={url + "/count"}>销售量-class</Link>
        <Route path={url + "/count"} component={Count} />
        <button 
          onClick={() => {
            this.setState({confirm: !this.state.confirm})
          }}
        >change</button>
        <Prompt 
          when={this.state.confirm}
          message='你真要走啊'
        />
      </div>
    );
  }
}
class DynamicRouteCls extends Component {
  render() {
    const Wrap = withRouter(DynamicRoute);
    return <Wrap />;
  }
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
