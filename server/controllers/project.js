const Project = require("../models/project");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await new Project({
      name
    });

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(400).send("Create project failed");
  }
};
exports.listProject = async (req, res) => {
  try {
    const project = await Project.find({}).sort({ createdAt: -1 }).exec();
    res.json(project);
  } catch (error) {
    res.status(404).send("project is not found");
  }
};