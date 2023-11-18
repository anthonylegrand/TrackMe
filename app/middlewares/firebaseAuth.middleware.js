require("dotenv").config();
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./../../appweave-firebase.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const { Users } = global.sequelize.models;

const firebaseAuth = async (req, res, next) => {
  const token = req.headers["authorization"] || req.cookies.authorization;
  try {
    if (!token || !token.startsWith("Bearer "))
      throw "errorMessage_token_missing";

    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));
    if (decodedToken) {
      const { uid, name, email, email_verified } = decodedToken;

      const user = await Users.findOrCreate({
        where: { uid },
        defaults: {
          email,
          email_verified,
          anonymous: decodedToken.provider_id === "anonymous",
        },
      });

      req.user = { name, email_verified, ...user[0]?.dataValues };

      next();
    } else throw "errorMessage_token_missing";
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = { firebaseAuth };
