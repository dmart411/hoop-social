/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";
import Post from "../Post";

const UserPosts = ({ userId, fetchPosts, posts }) => {
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="ui container">
      <div className="ui comments">
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

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.filter((post) => {
      console.log(post.postedBy);
      console.log(ownProps.userId);
      return post.postedBy === ownProps.userId;
    }),
  };
};

export default connect(mapStateToProps, { fetchPosts })(UserPosts);
