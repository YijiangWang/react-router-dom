import React, { useContext, useEffect } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./RouterContext";

/**
 * Switch 独占路由：返回第一个匹配的 route 或者 redirect
 */
export default function Switch(props) {
  const routerContext = useContext(RouterContext);
  let match = null; // 记录是否匹配
  let element; //  记录匹配的元素（route / redirect）
  React.Children.forEach(props.children, (child) => {
    if (match === null && React.isValidElement(child)) {
      // 前面还没有匹配上，并且 child 是有效元素
      element = child;
      match = child.props.path
        ? matchPath(routerContext.location.pathname, child.props)
        : routerContext.match;
    }
  });

  // console.log('children: ', children)
  return match ? React.cloneElement(element, { computedMatch: match }) : null;
}
