## react-router@5 的基本使用
> 工作中用到的版本是 5，所以这里实现了一下5的版本。比较发现与6只有很小的区别，在最下面进行了补充
- HashRouter：简单，服务器只认 # 前面的内容，而前端根据 # 后面的内容来显示对应的页面；
- BrowserRouter：需要服务器进行额外配置；
- MemoryRouter：浏览器中的地址栏看不出变化，实际变化了，存在内存中；多用在 native 中；
- 以上三种路由中，99% 的内容相同；

### Route 渲染内容的三种方式

```js
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
```

- 三种渲染方式：children、component、render；
- 这三种方式互斥，同一 Route 只能用一种；
- Route 渲染优先级：children > component > render；
- 能接收到同样的 [route props]，包括 match、location 和 match；

##### 三种方式的不同之处

###### children

- 如果 Route 没有使用 Switch 包裹，不管 location 是否匹配，都会显示；
- 使用场景：不管 location 能否匹配上，你都需要渲染一些内容；
- 除了总是会显示，其它工作方法与 render 完全一样；

###### render

- 当使用 render 的时候，调用的只是个函数；
- 只有匹配时，才会显示；

###### component

- 只有当 location 匹配时才会渲染；
- 如果是匿名函数，就使用 children 和 render，使用 component 会一直卸载、挂载子组件；

### Route、Switch、Link、Redirect 的使用

```js
<HashRouter>
  <Link to="/">Home</Link>
  <Link to="/detail">Detail</Link>
  <Link to="/user">User</Link>

  <Switch>
    <Route path="/" exact component={Compare} />
    <Route path="/detail" component={Detail} />
    <Route path="/user" component={User} />
    <Route path="/error" component={ErrorPage} />
    <Redirect from="/*" to="/error" />
  </Switch>
</HashRouter>
```

### 动态路由

- 使用 :xxx 的形式定义动态路由；

```js
<HashRouter>
  <Link to="/product/detail">产品说明</Link>
  <Link to="/product/price">产品价格</Link>

  <Switch>
    <Route path="/product/:name" component={DynamicRoute} />
  </Switch>
</HashRouter>
```

- 在组件中，通过 props 下面的 match.params.xxx 获取；

```js
// [route props]：history、location、match
function DynamicRoute({ match }) {
  const { params } = match;
  return (
    <div>
      <h4>DynamicRoute: {params.name}</h4>
    </div>
  );
}
```

### 嵌套路由

- Route 组件嵌套在其它页面组件中，就产生了嵌套路由，修改上面的 DynamicRoute：

```js
function DynamicRoute({ match }) {
  console.log("DynamicRoute: ", match);
  const { url, params } = match;
  return (
    <div>
      <h4>DynamicRoute: {params.name}</h4>
      <Link to={url + "/count"}>销售量</Link>
      <Route path={url + "/count"} component={Count} />
    </div>
  );
}
function Count() {
  return <h4>Count</h4>;
}
```

- 路由基本使用的所有代码：

```js
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
```

## 项目结构
|-- public：资源文件
    |-- index.html
|-- src
    |-- index.js：入口文件
    |-- pages
        |-- RouteUse：react-router-dom 的使用；
        |-- YJRouteUse：使用自己实现的库 yj-react-router-dom（可以和 RouteUse 比较，可以发现用法完全一致）
    |-- yj-react-router-dom：自己实现的库
        |-- index.js 入口文件
        |-- BrowserRouter
        |-- Router
        |-- Link
        |-- Route
        |-- Switch
        |-- Redirect
        |-- matchPath
        |-- Lifecycle
        |-- Prompt
        |-- RouterContext
        |-- withRouter
        |-- hook
```

## React-Router 实现
### API 罗列
- HistoryRouter
- HashRouter
- MemoryRouter
- Link
- Route
- Switch
- Redirect
- Prompt
- useHistory
- useLocation
- useParams
- useRouteMatch
- withRouter

##### BrowserRouter
- Link 是由 a 标签实现，每次点击会重新刷新页面；解决：给 a 添加点击事件，并且通过 window.history.pushState 来实现跳转的同时，阻止页面刷新；但是 window 下面的内容会有兼容性问题；这里使用 history 库（对兼容性进行了处理）。
- 通过 history 库创建；

##### Route
- 计算 match；
- 根据 match 进行 children > component > render 渲染组件；
  ```js
  /**
    * 1. match
    *    渲染以下内容：children component render null
    * 2. noMatch
    *    渲染以下内容：children(只判断是 function 的情况) null
    */
  match
    ? children
      ? typeof children === "function"
        ? children(extraProps)
        : children
      : component
      ? React.createElement(component, extraProps)
      : render
      ? render(extraProps)
      : null
    : typeof children === "function"
    ? children(extraProps)
    : null
  ```

##### Switch
- 独占路由：返回第一个匹配的 route 或者 redirect；
  ```js
  React.Children.forEach(props.children, (child) => {
    if (match === null && React.isValidElement(child)) {
      // 前面还没有匹配上，并且 child 是有效元素
      element = child;
      match = child.props.path
        ? matchPath(routerContext.location.pathname, child.props)
        : routerContext.match;
    }
  });
  ```

##### Redirect
- 获取上级传递过来的 to 和 push；
- 如果 push 为 true，则调用 `history.push(to)`，这样就可以点击返回按钮进行返回；如果为 false，就调用 `history.replace(to)`，这样就不能点击返回按钮进行返回；

##### Prompt
- 当路由发生改变时，进行弹窗提示；
- 接收两个参数，when 表示是否弹窗，message 为弹窗显示的内容；
  ```js
  // Prompt.js
  <RouterContext.Consumer>
    {ctx => {
      if(!when) {
        return null;  
      }
      return (
        <Lifecycle 
          onMount={(self) => {
            self.release = ctx.history.block(message);
          }}
          onUnMount = {(self) => {
            self.release();
          }}
        />
      )
    }}
  </RouterContext.Consumer>
  ```
  ```js
  // Lifecycle.js
  export default class Lifecycle extends React.Component {
    componentDidMount() {
      if(this.props.onMount) this.props.onMount(this);
    }

    componentWillUnmount() {
      console.log('componentWillUnmount: ', this)
      if(this.props.onUnMount) {
        this.props.onUnMount(this);
      }
    }
    
    render() {
      return null;
    }
  }
  ```
##### hook 方法：
- useHistory、useLocation、useParams、useRouteMatch
  ```js
  import { useContext } from "react";
  import { RouterContext } from "./RouterContext";

  export function useHistory() {
    return useContext(RouterContext).history;
  }

  export function useLocation() {
    return useContext(RouterContext).location;
  } 

  export function useParams() {
    const match = useContext(RouterContext).match;
    return match ? match.param : {};
  }
  export function useRouteMatch(path) {
    return useContext(RouterContext).match;
  }
  ```

##### withRouter
- 此方法为类组件提供，因为 hook 的便捷方法只能在函数组件中使用；
  ```js
  import { RouterContext } from "./RouterContext";

  const withRouter = (WrapperComponent) => props => {
    return <RouterContext.Consumer>
      {(context) => {
        return <WrapperComponent {...props} {...context} />
      }}
    </RouterContext.Consumer>
  }
  export default withRouter;
  ```

## react@6
##### 新增 `<Routes>` 取代 `<Switch>`
- Switch：按顺序扫描路由，匹配最近的一个；
- Routes：自动选择当前 URL 的最佳路由；
##### 相对路径和链接
- `<Route path>` 值总是相对于父路由，不必再从 `/` 去构建它们；