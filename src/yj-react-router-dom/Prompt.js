import Lifecycle from "./Lifecycle";
import { RouterContext } from "./RouterContext";

export default function Prompt({message, when=true}) {
  return (
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
  )
}