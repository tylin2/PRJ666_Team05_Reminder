const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { email, userName, password } = req.body;

  // first find the user in the database if exit update
  const user = await User.findOneAndUpdate(
    { email },
    { userName: email.split("@")[0] },
    { new: true }
  );

  // if not exit create a new user
  if (user) {
    res.json({msg: 'Email already exists.'});
  } else {
    const newUser = await new User({
      email,
      userName: email.split("@")[0],
      password
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

exports.findUser = async (req, res) => {
  User.findOne({ email: req.query.email }).exec((err, user) => {
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
