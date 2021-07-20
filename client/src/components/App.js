import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";
import Profile from "./Profile";

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
  });
  return (
    <Router>
      <Header />
      <Route exact path="/">
        Home
      </Route>
      <Route path="/profile/:id">
        <Profile />
      </Route>
    </Router>
  );
}

export default connect(null, { fetchUser })(App);
