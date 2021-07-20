import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
  const renderButtons = () => {
    if (auth === null) {
      return (
        <div className="ui item">
          <div className="ui loader" />
        </div>
      );
    } else if (!auth) {
      return (
        <a href="/auth/google" className="ui red item">
          Log In with Google
        </a>
      );
    } else {
      return (
        <>
          <Link className="ui item" to={`/profile/${auth.googleId}}`}>
            Profile
          </Link>
          <a href="/api/logout" className="ui item">
            Logout
          </a>
        </>
      );
    }
  };
  return (
    <div className="ui inverted menu">
      <div className="ui container">
        <Link to="/" className="item orange">
          Home
        </Link>
        <div className="right menu">
          <div className="item orange">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Header);
