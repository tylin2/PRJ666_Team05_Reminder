const Task = require("../models/task");
const mongoose = require("mongoose");

// create task
exports.createTask = async (req, res) => {
  try {
    let { name, dueDate, remindDate, user, participants, descript, project } = req.body;
    
    project = mongoose.Types.ObjectId(project);

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
    const tasks = await Task.find({});
    res.json(tasks);
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

// delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) {
      res.status(404).send("No item was found");
    }else{
      res.send(task + 'has been deleted');
    }

  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    //const task = await Task.findByIdAndUpdate(req.params.id, {descript: 'updating'}, {new: true});
    const task = await Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    
      res.send(`Updated task: ${task}`);
    
  } catch (error) {

    res.status(404).send("The task was not found -- see the console log");
    console.log(
        "*************DB errors: controllers.task.listTask*************"
    );
    console.log(error.message);
    console.log(
        "****************************************************************"
    );
  }
};