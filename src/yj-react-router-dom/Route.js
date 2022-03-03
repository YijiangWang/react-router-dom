import React, { useContext } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./RouterContext";

export default function Route({ path, exact, component, children, render }) {
  const routerContext = useContext(RouterContext);
  const { location, match: contextMatch } = routerContext;
  // 如果没有 path 时，会渲染 404 页面
  const match = path
    ? matchPath(location.pathname, { path: path, exact: exact })
    : contextMatch;
  const extraProps = {
    ...routerContext,
    match,
  };

  /**
   * 1. match
   *  children component render null
   * 2. noMatch
   *  children(只判断是 function 的情况) null
   */
  return (
    <RouterContext.Provider value={extraProps}>
      {match
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
        : null}
    </RouterContext.Provider>
  );
}
