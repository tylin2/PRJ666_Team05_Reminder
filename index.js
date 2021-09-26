const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Project = require('./models/project');
const Task = require('./models/task');
const User = require('./models/user');

const { createProject, listProject } = require("./controllers/project");
const {
  createOrUpdateUser,
  currentUser,
  allUser,
} = require("./controllers/user");
const { createTask, listTask } = require("./controllers/task");

// app
const app = express();

//db
// process.env.DATABASE_URL :
// mongodb+srv://klee214:eu2EIvcJGuJ6g2MW@cluster0.eajz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(`${process.env.DATABASE_URL}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((data) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`DB CONNECTION ERROR: ${err}`);
  });

//check if the task model works correctly.
function initialize(){
  const task1 = new Task({
      name: 'Sample task',
      dueDate: new Date(),
      remindDate: new Date(),
      descript: 'for test'
  })
  const project1 = new Project({
      name: 'Sample project',
      descript: 'for test'
  });
  
  task1.project = project1;
  project1.task.push(task1);
  
  task1.save(function(err){
      if(err) return handleError(err);
      project1.save(function (err) {
          if(err) return handleError(err);
      });
  });
}

function population(){
  Project.findOne({name: 'Sample project'})
          .populate('task')
          .exec(function (err, project){
              if(err) return handleError(err);
              console.log(`The task in the project is ${project.task[0]}`);
          });

  Task.findOne({name: 'Sample task'})
          .populate('project')
          .exec(function(err, task){
              if(err) console.log(err);
              console.log(`The project this task belongs is ${task.project}`);
          });
}
initialize();
//population();





//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// server for user model
app.post(`/create-or-update-user`, createOrUpdateUser)
app.post(`/current-user`, currentUser)
app.post(`/all-user`, allUser)

// server for project model
app.post(`/create-project`, createProject)
app.post(`/list-project`, listProject)

// server for task model
app.post(`/create-task`, createTask)
app.post(`/list-task`, listTask)

