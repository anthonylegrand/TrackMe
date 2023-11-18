require("dotenv").config();
const router = require("express").Router();

const controller = require("./../../controllers/user.controller");

const { firebaseAuth } = require("./../../middlewares/firebaseAuth.middleware");

module.exports = function (app) {
  // fetch Player with UUID
  router.post("/fetch/:PlayerUid", [firebaseAuth], controller.fetchPlayer);

  // Get new JWT Token
  router.post("/register", [firebaseAuth], controller.register);

  app.use("/user", router);
};
