import { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { updatePost } from "../actions";

const Comment = ({ comment, user, auth, updatePost, postId, post }) => {
  const location = useLocation();
  const [hovering, setHovering] = useState(true);

  const onDeleteComment = () => {
    const comments = post.comments.filter((com) => {
      return com._id !== comment._id;
    });
    updatePost(postId, { comments });
  };

  const displayAdmin = () => {
    return auth && auth._id === comment.postedBy ? (
      <Link to={location.pathname} className="active reply" onClick={onDeleteComment}>
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
    post: state.posts
      .filter((post) => {
        return post._id === ownProps.postId;
      })
      .pop(),
  };
};

export default connect(mapStateToProps, { updatePost })(Comment);
