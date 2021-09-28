const Task = require("../models/task");
const mongoose = require("mongoose");

// create task
exports.createTask = async (req, res) => {
  try {
    const { name, dueDate, remindDate, descript } = req.body;
    let { user, participants, project } = req.body;

    user = mongoose.Types.ObjectId(user);
    project = mongoose.Types.ObjectId(project);

    participants = participants.map((p) => {
      return mongoose.Types.ObjectId(p);
    });

    const task = await new Task({
      name,
      dueDate,
      remindDate,
      user,
      participants,
      descript,
      project,
    });

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(400).send("Fail to create a task -- see the console log");
    console.log(
      "*************DB errors: controllers.task.createTask*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

// list all tasks
exports.listTask = async (req, res) => {
  try {
    const task = await Task.find({});
    res.json(task);
  } catch (error) {
    res.status(404).send("Tasks are not found -- see the console log");
    console.log(
      "*************DB errors: controllers.task.listTask*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};
