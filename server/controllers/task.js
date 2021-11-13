const Task = require("../models/task");
const User = require("../models/user");
const Project = require("../models/project");
const mongoose = require("mongoose");

exports.call_api_to_check_due_date = async (end_of_week) => {
  try {
    const tasks = await Task.find({
      $and: [
        { dueDate: { $gte: new Date() } },
        { dueDate: { $lte: end_of_week } },
      ],
    }).exec();
    if (!tasks) {
      res
        .status(400)
        .send("Fail to call api for due date check -- see the console log");
      console.log(
        "*************DB errors: controllers.task.call_api_to_check_due_date*************"
      );
      console.log("There are no tasks");
      console.log(
        "********************************************************************************"
      );
    }

    return tasks;
  } catch (error) {
    res
      .status(400)
      .send("Fail to call api for due date check -- see the console log");
    console.log(
      "*************DB errors: controllers.task.call_api_to_check_due_date*************"
    );
    console.log(error.message);
    console.log(
      "********************************************************************************"
    );
  }
};

//find all task of a particular user
exports.findTasksOf_aUser = async (req, res) => {
  try {
    User.findOne({ email: req.params.email })
      .populate("taskSet") //todo not sure.
      .exec((err, user) => {
        if (err) throw new Error(error);
        res.json(user.taskSet); //!taskSet is an array
      });
  } catch (error) {
    res.status(400).send("Fail to get a task -- see the console log");
    console.log(
      "*************DB errors: controllers.task.currentUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

exports.findTaskbyId = async (req, res) => {
  try {
    Task.findById(req.params.id).then((task) => res.json(task));
  } catch (error) {
    res.status(400).send("Fail to find a task -- see the console log");
    console.log(
      "*************DB errors: controllers.task.findTaskbyId*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

// create task
exports.createTask = async (req, res) => {
  try {
    const { name, dueDate, remindDate, user, participants, descript } =
      req.body;
    let { project } = req.body;

    project = mongoose.Types.ObjectId(project);

    //todo: TypeError: Assignment to constant variable.
    // participants = participants.map((p) => {
    //   return mongoose.Types.ObjectId(p);
    // });
    console.log(project)
    const task = await new Task({
      name,
      dueDate,
      remindDate,
      user,
      participants,
      descript,
      project,
    });

    let savedTask = await task.save();

    let currentUser = await User.findOne({ email: req.params.email });
    currentUser.taskSet.push(savedTask);
    currentUser.save();

    console.log(project)
    if(project){
      let currentProject = await Project.findOne({ _id: project }); 
      currentProject.taskSet.push(savedTask);
      console.log(currentProject)
      currentProject.save();
    }

    res.json(task);
  } catch (error) {
    res.status(400).send("Fail to create a task -- see the console log");
    console.log(
      "*************DB errors: controllers.task.createTask*************"
    );
    console.log(error);
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
    if (!task) {
      res.status(404).send("No item was found");
    } else {
      res.send(task + "has been deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//todo I am not sure if I have to include userEmail? or any user info in the req.body.
exports.updateTask = async (req, res) => {
  try {
    //const task = await Task.findByIdAndUpdate(req.params.id, {descript: 'updating'}, {new: true});
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

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

//find all task of a particular user
exports.findTasksOf_aProject = async (req, res) => {
  try {
    Project.findById(req.params.project)
      .populate("taskSet") //todo not sure.
      .exec((err, project) => {
        if (err) throw new Error(error);
        res.json(project.taskSet); //!taskSet is an array
      });
  } catch (error) {
    res.status(400).send("Fail to get a task -- see the console log");
    console.log(
      "*************DB errors: controllers.task.currentUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};
