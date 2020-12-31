import React from "react";
import Main from "./Main";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

const AppJsonTask = (props) => {
  return (
    <div className="myImage">
      <Router>
        <Nav />
        <div style={{ height: "60px" }}></div>
        <Header />
        <Main />
        <Footer />
      </Router>
    </div>
  );
};

export default AppJsonTask;
