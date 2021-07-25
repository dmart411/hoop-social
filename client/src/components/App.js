import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import Header from "./Header";
import PlayerProfile from "./PlayerProfile";
import UserProfile from "./UserProfile";
import Home from "./Home";
import Results from "./Results";

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
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
    </Router>
  );
}

export default connect(null, { fetchUser })(App);