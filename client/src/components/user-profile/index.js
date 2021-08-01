import { connect } from "react-redux";
import FavoritePlayers from "./FavoritePlayers";

const UserProfile = ({ auth }) => {
  const renderProfile = () => {
    return (
      <div>
        <img
          className="ui mini bordered left floated image"
          src={auth.photo}
          alt="avatar"
        />
        <h3 className="ui huge header">{auth.name}</h3>
        <div className="ui divider" />
        <FavoritePlayers />
      </div>
    );
  };

  return (
    <div className="ui container">
      {auth ? renderProfile() : "Not signed in"}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(UserProfile);
