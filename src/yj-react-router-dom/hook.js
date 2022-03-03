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