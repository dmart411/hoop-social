import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import FavoritePlayers from "./FavoritePlayers";
import UserPosts from "./UserPosts";

const UserProfile = ({ user, auth, match, fetchUser }) => {
  const FAVORITE_PLAYER = "favorite_player";
  const POSTS = "posts";
  const [activeItem, setActiveItem] = useState(FAVORITE_PLAYER);

  useEffect(() => {
    if (!auth && !user) {
      fetchUser(match.params.id);
    }
  });

  const showActiveItem = () => {
    switch (activeItem) {
      case FAVORITE_PLAYER:
        return <FavoritePlayers userId={user.googleId} />;
      case POSTS:
        return <UserPosts userId={user._id} />;
      default:
        return null;
    }
  };
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
        <div className="ui two item menu">
          <div
            className={`${
              activeItem === FAVORITE_PLAYER ? "active" : null
            } item`}
            onClick={() => {
              setActiveItem(FAVORITE_PLAYER);
            }}
          >
            Favorite Players
          </div>
          <div
            className={`${activeItem === POSTS ? "active" : null} item`}
            onClick={() => {
              setActiveItem(POSTS);
            }}
          >
            Posts
          </div>
        </div>
        {showActiveItem()}
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
