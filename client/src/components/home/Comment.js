import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ comment, user, auth }) => {
  const [hovering, setHovering] = useState(true);

  const displayAdmin = () => {
    return auth && auth._id === comment.postedBy ? (
      <Link to="/" className="active reply">
        Delete
      </Link>
    ) : null;
  };

  return user ? (
    <div
      className="comment"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <Link to={`/user-profile/${user.googleId}`} className="avatar">
        <img src={user.photo} alt="avatar" />
      </Link>
      <div className="content">
        <Link to={`/user-profile/${user.googleId}`} className="author">
          {user.name}
        </Link>
        <div className="text">{comment.text}</div>
        <div className="actions">{hovering ? displayAdmin() : null}</div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users
      .filter((user) => {
        return user._id === ownProps.comment.postedBy;
      })
      .pop(),
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Comment);
