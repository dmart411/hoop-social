import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPost, fetchPosts, fetchUsers } from "../../actions";
import Post from "../Post";

const Discussion = ({ auth, createPost, posts, fetchPosts, fetchUsers }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  });

  const createPostButton = () => {
    return auth ? (
      <div
        className="ui right floated orange inverted button"
        onClick={() => {
          setShowCreatePost(true);
        }}
      >
        Compose a post!
      </div>
    ) : null;
  };

  const onPostSubmit = () => {
    const post = {
      text: postText,
      postedBy: auth._id,
      comments: [],
    };
    createPost(post);
    setPostText("");
    setShowCreatePost(false);
  };

  const displayCreatePost = () => {
    return showCreatePost ? (
      <div className="ui container">
        <button
          className="ui icon right floated small button"
          onClick={() => {
            setShowCreatePost(false);
          }}
          style={{ marginBottom: "5px" }}
        >
          <i className="close icon"></i>
        </button>
        <h2 className="ui header">Create a Post</h2>
        <form className="ui reply form">
          <div className="field">
            <textarea
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              value={postText}
            ></textarea>
          </div>
          <div
            onClick={onPostSubmit}
            className="ui orange inverted button"
            style={{ marginTop: "5px" }}
          >
            Submit Post
          </div>
        </form>
      </div>
    ) : null;
  };

  return (
    <div className="ui container">
      {createPostButton()}
      <h1>Discussion</h1>
      <div className="ui comments">
        {displayCreatePost()}
        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            return <Post postId={post._id} key={post._id} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { fetchPosts, createPost, fetchUsers })(Discussion);
