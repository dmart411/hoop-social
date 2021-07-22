import { connect } from "react-redux";

const UserProfile = ({ auth }) => {
  const renderProfile = () => {
    return (
      <div>
        <img className="ui avatar image" src={auth.photo} alt="avatar" />
        <div>Name: {auth.name}</div>
        <div>Email: {auth.email}</div>
      </div>
    );
  };

  return (
    <div className="ui container">
      <h3>Profile</h3>
      {auth ? renderProfile() : "Not signed in"}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(UserProfile);
