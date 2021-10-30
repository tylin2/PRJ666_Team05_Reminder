const Project = require("../models/project");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await new Project({
      name,
    });

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(400).send("Fail to create a project -- see the console log");
    console.log(
      "*************DB errors: controllers.project.createProject*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};
exports.listProject = async (req, res) => {
  try {
    const project = await Project.find({}).sort({ createdAt: -1 }).exec();
    res.json(project);
  } catch (error) {
    res.status(404).send("Prject is not found -- see the console log");
    console.log(
      "*************DB errors: controllers.project.listProject*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};
