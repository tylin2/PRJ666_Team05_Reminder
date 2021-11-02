
var adminls = require("firebase-admin");
const admin = require("../firebase/index");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization.split(' ')[1]

    const firebaseUser = await adminls
      .auth()
      // .verifyIdToken(req.headers.authtoken);
      .verifyIdToken(token);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({
      err: "The token is invalid or expired",
    });
  }
};