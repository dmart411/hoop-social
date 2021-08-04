const mongoose = require("mongoose");
const Post = mongoose.model("posts");

module.exports = (app) => {
  app.get("/posts", async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

  app.get("/posts/:id", getPost, (req, res) => {
    res.json(res.post);
  });

  app.patch("/posts/:id", getPost, async (req, res) => {
    if (req.body.text != null) {
      res.post.text = req.body.text;
    }
    if (req.body.comments != null) {
      res.post.comments = req.body.comments;
    }
    try {
      const updatedPost = await res.post.save();
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/posts", async (req, res) => {
    const post = new Post({
      text: req.body.text,
      postedBy: req.body.postedBy,
      comments: req.body.comments,
    });
    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/posts/:id", getPost, async (req, res) => {
    try {
      await res.post.remove();
      res.json({ message: "Post deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  async function getPost(req, res, next) {
    try {
      post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send({ message: "Can not find post" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

    res.post = post;
    next();
  }
};
