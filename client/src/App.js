import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import setJWT from "./toolKit/setJWT";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.css";
// import "./components/Landing.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import UserProfile from "./components/profile/userProfile/UserProfile";
import UserProfileBySearch from "./components/profile/userProfile/UserProfileBySearch";
import About from "./components/introduction/About";
import EditProfile from "./components/profile/editProfile/EditProfile";
import ProfilesList from "./components/profiles/ProfilesList";

import PrivateRoute from "./components/common/PrivateRoute";

// Check for token
// PS: why we put the authorization check here?
// A: Since for preventing check for it every time it renders pages
if (localStorage.jwtToken) {
  // Set auth token header auth
  setJWT(localStorage.jwtToken);

  // Decode the jwt token
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set currentUser
  // ( Set the store.state.auth to be ture and pass the user decoded data )
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userProfile/:user_id" component={UserProfile} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/profilesList" component={ProfilesList} />
          <Route
            exact
            path="/userProfileBySearch/:user_id"
            component={UserProfileBySearch}
          />

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Route exact path="/not-found" component={NotFound} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
