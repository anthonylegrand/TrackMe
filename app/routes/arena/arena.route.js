const router = require("express").Router();

const controller = require("../../controllers/arena.controller");

const { authMiddleware } = require("./../../middlewares/auth.middleware");

module.exports = function (app) {
  app.use(authMiddleware);

  router.post("/search", controller.search);

  router.post("/create", controller.create);

  router.post("/invite/:uuid", controller.invite);

  router.post("/accept/", controller.accept);

  app.use("/game", router);
};
