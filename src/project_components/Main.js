import React from "react";
import { Switch, Route } from "react-router-dom";
import InputJson from "./InputJson";

const Main = (props) => {
  return (
    <div className="container-fluid">
      <div className="container" style={{ minHeight: "600px" }}>
        <Switch>
          <Route exact path="/" component={InputJson} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
