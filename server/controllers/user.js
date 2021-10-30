const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  // first find the user in the database if exit update
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  // if not exit create a new user
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

// find a user by email
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(error);
    res.json(user);
  });
};

// get all users
exports.allUser = async (req, res) => {
  User.find().exec((err, user) => {
    if (err) throw new Error(error);
    res.json(user);
  });
};
