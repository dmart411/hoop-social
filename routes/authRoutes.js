const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

mongoose.set("useFindAndModify", false);

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(`/user-profile/${req.user.googleId}`);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.patch("/api/current_user", (req, res) => {
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
};
