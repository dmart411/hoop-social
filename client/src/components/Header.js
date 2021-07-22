import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { searchPlayers } from "../actions";

import Search from "./Search";

const Header = ({ auth, searchPlayers }) => {
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
            location.pathname === `/user-profile/${auth.googleId}}` ? "active" : null
          } orange`}
          to={`/user-profile/${auth.googleId}}`}
        >
          Profile
        </Link>
      </>
    );
  };

  const onSearch = (text) => {
    searchPlayers(text);
  };

  return (
    <div className="ui stackable fluid inverted menu">
      <div className="ui container">
        <Link
          to="/"
          className={`item ${
            location.pathname === "/" ? "active" : null
          } orange`}
        >
          Home
        </Link>
        {auth ? renderUserButtons() : null}
        <div className="right menu">
          <div className="item">
            <Search onSearch={onSearch} />
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

export default connect(mapStateToProps, { searchPlayers })(Header);
