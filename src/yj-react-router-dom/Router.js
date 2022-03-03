import React, { useEffect, useState } from "react";
import { RouterContext } from "./RouterContext";

function computeRootMatch(pathname) {
  return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
}

// 三个大哥：HistoryRouter、HashRouter、BrowserRouter
const Router = ({ history, children }) => {
  const [location, setLocation] = useState(history.location);
  useEffect(() => {
    const unlisten = history.listen(loc => {
      setLocation(loc);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (
    <RouterContext.Provider 
      value={{history, location, match:computeRootMatch(location.pathname)}} 
    >
      {children}
    </RouterContext.Provider>
  );
};

export default Router;