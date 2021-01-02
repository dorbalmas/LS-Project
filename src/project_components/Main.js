import React from "react";
import { Switch, Route } from "react-router-dom";
import InputJson from "./InputJson";
import List from "./List";
import EditSingle from "./EditSingle";

const Main = (props) => {
  return (
    <div className="container-fluid">
      <div className="container" style={{ minHeight: "600px" }}>
        <Switch>
          <Route exact path="/" component={InputJson} />
          <Route exact path="/list" component={List} />
          <Route exact path="/single/:id" component={EditSingle} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
