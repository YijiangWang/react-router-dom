import { RouterContext } from "./RouterContext";
import Lifecycle from "./Lifecycle";

export default function Redirect({to, push = false}) {
  return (<RouterContext.Consumer>
    {(ctx) => {
      const { history } = ctx;
      console.log('ctx: ', ctx);
      return (
        <Lifecycle 
          onMount = {() => {
            push ? history.push(to) : history.replace(to);
          }}
        />
      )
    }}
  </RouterContext.Consumer>)
}

