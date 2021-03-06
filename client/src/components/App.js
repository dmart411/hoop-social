import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAuth } from "../actions";
import Header from "./Header";
import PlayerProfile from "./player-profile";
import UserProfile from "./user-profile";
import Home from "./home";
import Discussion from "./discussion";

function App({ fetchAuth }) {
  useEffect(() => {
    fetchAuth();
  });
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discussion" component={Discussion} />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/player-profile/:id" component={PlayerProfile} />
      </Switch>
    </Router>
  );
}

export default connect(null, { fetchAuth })(App);
