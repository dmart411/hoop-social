import { connect } from "react-redux";

const Profile = ({ auth }) => {
  return auth ? <div>{auth.name}</div> : <div>loading...</div>;
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Profile);
