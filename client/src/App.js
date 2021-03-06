import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';


import "./styles.scss";
import OtherShapes from "./components/OtherShapes";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute path='/bubbles' component={BubblePage}/>
          <PrivateRoute path='/others' component={OtherShapes}/>
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
