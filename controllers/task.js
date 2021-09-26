const Task = require("../models/task");

// create task
exports.createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const task = await new Task({
      name,
    });

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(400).send("Create task failed");
  }
};

// list all tasks
exports.listTask = async (req, res) => {
  try {
    const task = await Task.find({}).sort({ createdAt: -1 }).exec();
    res.json(task);
  } catch (error) {
    res.status(404).send("task is not found");
  }
};

