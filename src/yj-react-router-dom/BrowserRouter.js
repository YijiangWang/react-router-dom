import React from 'react'
import { createBrowserHistory } from 'history';
import Router from './Router';

export default function BrowserRouter({children}) {

  const history = createBrowserHistory();
  return <>
    <Router history={history} children={children}/>
  </>
}