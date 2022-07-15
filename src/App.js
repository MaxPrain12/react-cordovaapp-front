import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Headerbar from "./Components/Headerbar";
import Footerbar from "./Components/Footerbar";
import { MenuItems } from './Data/MenuItems';
import "./Style/AppStyle.css";




export function App() {
  if (localStorage.getItem('Username') !== null) {
    return (
      <Router>
        <Headerbar />
        <Routes>
          
          {MenuItems.map((item) => {
            return (
              <Route
                key={item.id}
                path={item.path}
                element={< item.component />}
              />
            );
          })}
          
          
        </Routes>
        <Footerbar />
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          {MenuItems.map((item) => {
            return (
              <Route
              key={item.id}
              path={item.path}
              element={< item.component />}
              />
            );
          })}
        </Routes>
      </Router>
    );
  }

}
