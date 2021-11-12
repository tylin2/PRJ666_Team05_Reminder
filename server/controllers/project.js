const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");

exports.findProjectsOf_aUser = async (req, res) => {
  try {
    User.findOne({ email: req.params.email })
      .populate("projectSet") 
      .exec((err, user) => {
        if (err) throw new Error(error);
        res.json(user.projectSet); 
      });
  } catch (error) {
    res.status(400).send("Fail to get a project -- see the console log");
    console.log(
      "*************DB errors: controllers.project.currentUser*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, manager, descript, createBy } = req.body;
    const project = await new Project({
      name,
      manager,
      descript,
      createBy
    });

    
    let savedProjcet = await project.save();

    let currentUser = await User.findOne({ email: req.params.email });
    currentUser.projectSet.push(savedProjcet);

    currentUser.save();   

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


exports.findProjectbyId = async (req, res) => {
  try {
    Project.findById(req.params.id).then((project) => res.json(project));
  } catch (error) {
    res.status(400).send("Fail to find a project -- see the console log");
    console.log(
      "*************DB errors: controllers.project.findProjectbyId*************"
    );
    console.log(error.message);
    console.log(
      "****************************************************************"
    );
  }
};

exports.deleteProject = async (req, res) => {
  try {   
    const project = await Project.findByIdAndDelete(req.params.id);    
    if (!project) {
      res.status(404).send("No project was found");
    } else {
      res.send(project + "has been deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};