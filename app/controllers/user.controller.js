require("dotenv").config();
const JWT = require("jsonwebtoken");

const { Players } = global.sequelize.models;

module.exports.fetchPlayer = async (req, res) => {
  try {
    const player = await Players.findByPk(req.params.PlayerUid);

    res.json({ player });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    const { pseudo } = req.body;
    if (!pseudo) throw "errorMessage_missing_data";

    const player = await Players.create({ uid: req.user.uid, pseudo });

    const token = JWT.sign(player.dataValues, process.env.JWT_TOKEN);

    res.json({ player, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
