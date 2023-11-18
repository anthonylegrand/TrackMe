const turf = require("@turf/turf");

const { Arenas, Players_Arenas } = global.sequelize.models;

module.exports.search = async (req, res) => {
  const arenas = await Arenas.findAll({
    where: {
      status: "WAITING",
    },
  });

  res.status(200).json(arenas);
};

module.exports.create = async (req, res) => {
  try {
    const { scenario, options, zonne } = req.body;

    if (!scenario || !options || !zonne) throw "errorMessage_missing_data";

    const polygon = turf.polygon(zonne);

    const game = await Games.create({
      ownerUid: req.user.uuid,
      scenario,
      options,
      zonne: { type: "Polygon", coordinates: zonne },
      surface: Math.round(turf.area(polygon)),
    });

    await Players_Arenas.create({
      PlayerUid: req.user.uuid,
      ArenaUuid: game.uuid,
    });

    res.status(201).json({ game });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.invite = async (req, res) => {};

module.exports.accept = async (req, res) => {};
