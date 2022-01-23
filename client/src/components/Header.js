import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { fetchPlayers } from "../actions";
import Search from "./Search";

const Header = ({ auth, fetchPlayers }) => {
  let location = useLocation();

  const renderAuthButton = () => {
    return auth ? (
      <a href="/api/logout" className="ui item">
        <div className="ui orange inverted button">Log Out</div>
      </a>
    ) : (
      <a href="/auth/google" className="ui item">
        <div className="ui orange inverted button">
          <i className="google icon" />
          Sign in With Google
        </div>
      </a>
    );
  };

  const renderUserButtons = () => {
    return (
      <>
        <Link
          className={`item ${
            location.pathname === `/user-profile/${auth.googleId}`
              ? "active"
              : null
          } orange`}
          to={`/user-profile/${auth.googleId}`}
        >
          Profile
        </Link>
      </>
    );
  };

  return (
    <div className="ui stackable fluid inverted menu" style={{ minHeight: "60px" }}>
      <div className="ui container">
        <Link
          to="/"
          className={`item ${
            location.pathname === "/" ? "active" : null
          } orange`}
        >
          Home
        </Link>
        <Link
          to="/discussion"
          className={`item ${
            location.pathname === "/discussion" ? "active" : null
          } orange`}
        >
          Discussion
        </Link>
        {auth ? renderUserButtons() : null}
        <div className="right menu">
          <div
            className="item"
            style={location.pathname === "/" ? { display: "none" } : {}}
          >
            <Search size="mini"/>
          </div>
          {renderAuthButton()}
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

export default connect(mapStateToProps, { fetchPlayers })(Header);
