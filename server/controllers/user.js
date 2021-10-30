const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    // first find the user in the database if exit update
    const user = await User.findOneAndUpdate(
      { email },
      { userName: email.split("@")[0] },
      { new: true }
    );

    // if not exit create a new user
    if (user) {
      res.json(user);
    } else {
      const newUser = await new User({
        email,
        userName: email.split("@")[0],
        password
      }).save();
      res.json(newUser);
    }
  } catch (error) {
    res.status(400).send("Fail to create a user -- see the console log");
    console.log(
      "*************DB errors: controllers.user.createOrUpdateUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

// find a user by email
exports.currentUser = async (req, res) => {
  try {
    User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) throw new Error(error);
      res.json(user);
    });
  } catch (error) {
    res.status(400).send("Fail to get a user -- see the console log");
    console.log(
      "*************DB errors: controllers.user.currentUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

// get all users
exports.allUser = async (req, res) => {
  try {
    User.find().exec((err, user) => {
      if (err) throw new Error(error);
      res.json(user);
    });
  } catch (error) {
    res.status(400).send("Fail to get users -- see the console log");
    console.log(
      "*************DB errors: controllers.user.allUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};
