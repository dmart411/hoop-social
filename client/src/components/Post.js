import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { updatePost, deletePost, fetchPosts } from "../actions";
import Comment from "./Comment";

const Post = ({
  postId,
  users,
  post,
  auth,
  updatePost,
  deletePost,
  fetchPosts,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [hovering, setHovering] = useState(false);
  const location = useLocation();

  const user = users
    ? users
        .filter((user) => {
          return user._id === post.postedBy;
        })
        .pop()
    : null;

  const getTimeElapsed = () => {
    const time = Math.floor((new Date() - new Date(post.updated)) / 1000 / 60);
    if (time === 0) {
      return "Just now";
    } else if (time < 60) {
      return time === 1 ? `${time} minute ago` : `${time} minutes ago`;
    } else if (time < 24 * 60) {
      const hours = Math.floor(time / 60);
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else {
      const days = Math.floor(time / 60 / 24);
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    }
  };

  const displayAdmin = () => {
    return auth && auth._id === post.postedBy ? (
      <Link
        to={location.pathname}
        className="active reply"
        onClick={() => {
          deletePost(postId);
        }}
      >
        Delete
      </Link>
    ) : null;
  };

  const onReplySubmit = () => {
    const comment = {
      text: replyText,
      postedBy: auth._id,
    };

    updatePost(postId, { comments: [...post.comments, comment] });
    setReplyText("");
    setShowReplyForm(false);
  };

  const displayReplyForm = () => {
    return showReplyForm ? (
      <>
        <form className="ui reply form">
          <div className="field">
            <textarea
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
              value={replyText}
            ></textarea>
          </div>
          <button
            className="ui right floated small button"
            onClick={() => {
              setShowReplyForm(false);
            }}
          >
            Discard
          </button>
          <div
            className="ui orange inverted submit labeled icon button"
            onClick={onReplySubmit}
          >
            <i className="icon edit"></i> Add Reply
          </div>
        </form>
      </>
    ) : null;
  };

  return user && post ? (
    <>
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
          <div className="metadata">
            <span className="date">{getTimeElapsed()}</span>
          </div>
          <div className="text">{post.text}</div>
          {auth && hovering ? (
            <div className="actions">
              <Link
                to={location.pathname}
                className="active reply"
                onClick={() => {
                  setShowReplyForm(!showReplyForm);
                }}
              >
                Reply
              </Link>
              {displayAdmin()}
            </div>
          ) : null}
          <div className="comments">
            {post.comments.map((comment) => {
              return (
                <Comment comment={comment} key={comment._id} postId={postId} />
              );
            })}
            {displayReplyForm()}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts
      .filter((post) => {
        return post._id === ownProps.postId;
      })
      .pop(),
    users: state.users,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updatePost, deletePost, fetchPosts })(
  Post
);
