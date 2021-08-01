const mongoose = require("mongoose");
const User = mongoose.model("users");

mongoose.set("useFindAndModify", false);

module.exports = (app) => {
  app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  });

  app.get("/users/:id", async (req, res) => {
    try {
      const user = await User.find({ googleId: req.params.id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  });

  app.patch("/users/:id", (req, res) => {
    const updatedUser = User.findOneAndUpdate(
      { googleId: req.user.googleId },
      req.body,
      { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/users/:id", async (req, res) => {
    User.deleteOne({ googleId: req.params.id }, function (err) {
      if (err) res.status(500).send({ mesage: error });
    });
    res.send({ message: "User deleted." });
  });
};
