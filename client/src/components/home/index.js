/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  fetchUsers,
  fetchPosts,
  createPost,
  fetchPlayers,
} from "../../actions";
import Post from "../Post";
import Search from "../Search";

const Home = ({
  auth,
  posts,
  fetchUsers,
  fetchPosts,
  createPost,
  fetchPlayers,
}) => {
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState("");

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
    <>
      <div
        className="ui vertical masthead center aligned segment"
        style={{ marginBottom: "30px" }}
      >
        <div
          className="ui text container"
          style={{ marginTop: "70px", marginBottom: "30px" }}
        >
          <h1 className="ui header">Hoops Social</h1>
          <h4 className="ui sub header">
            Search for an NBA player and see their stats!
          </h4>
        </div>
        <Search />
      </div>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {
  fetchUsers,
  fetchPosts,
  createPost,
  fetchPlayers,
})(Home);
