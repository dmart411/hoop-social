import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAuth } from "../actions";
import Header from "./Header";
import PlayerProfile from "./player-profile";
import UserProfile from "./user-profile";
import Home from "./home";
import Results from "./Results";

function App({ fetchAuth }) {
  useEffect(() => {
    fetchAuth();
  });
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/player-profile/:id" component={PlayerProfile} />
        <Route path="/results" component={Results} />
      </Switch>
      <div className="ui basic segment" style={{ marginTop: "50px" }} />
    </Router>
  );
}

export default connect(null, { fetchAuth })(App);
