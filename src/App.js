import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Headerbar from "./Components/Headerbar";
import Footerbar from "./Components/Footerbar";
import { MenuItems } from './Data/MenuItems';
import "./Style/AppStyle.css"





export function App() {
  if (localStorage.getItem('Username') !== null) {
    return (
      <Router>
        <Headerbar />
        {MenuItems.map((item) => {
          return (
            <Route
              key={item.id}
              path={item.path}
              exact
              component={item.component}
            />
          );
        })}
        <Footerbar />
      </Router>
    );
  } else {
    return (
      <Router>
        {MenuItems.map((item) => {
          return (
            <Route
              key={item.id}
              path={item.path}
              exact
              component={item.component}

            />
          );
        })}
      </Router>
    );
  }

}
