import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SignIn from "../Pages/Login/LoginPage";
import SignUp from "../Pages/SignUp/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthRouter from "./AuthRouter";

export default function RouterDOM() {
  return (
    <Router>
      

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <AuthRouter exact path="/" component={SignIn}/>
          <AuthRouter path = "/signUp" component = {SignUp} />

          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
  );
}