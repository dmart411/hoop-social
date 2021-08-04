import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updatePost, deletePost, fetchPosts } from "../../actions";
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

  const user = users
    ? users
        .filter((user) => {
          return user._id === post.postedBy;
        })
        .pop()
    : null;

  const displayAdmin = () => {
    return auth && auth._id === post.postedBy ? (
      <Link
        to="/"
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

  return (
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
            <span className="date">{`${post.updated}`}</span>
          </div>
          <div className="text">{post.text}</div>
          {auth && hovering ? (
            <div className="actions">
              <Link
                to="/"
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
              return <Comment comment={comment} key={comment._id} />;
            })}
            {displayReplyForm()}
          </div>
        </div>
      </div>
    </>
  );
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
