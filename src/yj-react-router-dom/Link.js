import React, { useContext } from "react"
import { RouterContext } from "./RouterContext";

export default function Link({to, children, ...rest}) {
  const routerContext =  useContext(RouterContext);
  const handle = (e) => {
    e.preventDefault();

    // 原生写法
    // window.history.pushState({foo:to}, to, to);
    routerContext.history.push(to);
  }
  return (
    <a href={to} onClick={handle} {...rest}>{children}</a>
  )
}