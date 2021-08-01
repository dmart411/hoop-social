import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import FavoritePlayers from "./FavoritePlayers";

const UserProfile = ({ user, auth, match, fetchUser }) => {
  useEffect(() => {
    if (!auth && !user) {
      fetchUser(match.params.id);
    }
  });

  const renderProfile = () => {
    return (
      <div>
        <img
          className="ui mini bordered left floated image"
          src={user.photo}
          alt="avatar"
        />
        <h3 className="ui huge header">{user.name}</h3>
        <div className="ui divider" />
        <FavoritePlayers userId={user.googleId} />
      </div>
    );
  };

  return (
    <div className="ui container">
      {user ? renderProfile() : "Not signed in"}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return state.auth && state.auth.googleId === ownProps.match.params.id
    ? { auth: state.auth, user: state.auth }
    : {
        auth: null,
        user: state.users
          .filter((user) => {
            return user.googleId === ownProps.match.params.id;
          })
          .pop(),
      };
};

export default connect(mapStateToProps, { fetchUser })(UserProfile);
