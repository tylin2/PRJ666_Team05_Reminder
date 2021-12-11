const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  createProject,
  findProjectsOf_aUser,
  listProject,
  findProjectbyId,
  deleteProject,
  updateProject,
} = require("./controllers/project");
const {
  createOrUpdateUser,
  currentUser,
  allUser,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const {
  findTasksOf_aUser,
  createTask,
  listTask,
  deleteTask,
  updateTask,
  findTaskbyId,
  findTasksOf_aProject,
} = require("./controllers/task");
const { authCheck } = require("./middleware/auth");
const path = require("path");

const time_set_function = require("./functions/sendgrid/timer");
dotenv.config();

// app
const app = express();
app.use(express.static(__dirname + "/public"));

//db
mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then((data) => {
    console.log("DB CONNECTED");
    // sending emails
    time_set_function();
  })
  .catch((err) => {
    console.log(`DB CONNECTION ERROR: ${err}`);
  });

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
app.post(`/api/create-or-update-user`, createOrUpdateUser);
// app.get(`/api/current-user`, authCheck, currentUser);
app.get(`/api/current-user/:email`, authCheck, currentUser);
app.get(`/api/all-user`, authCheck, allUser);
app.delete(`/api/delete-user/:email`, authCheck, deleteUser);
app.put(`/api/update-user/:email`, authCheck, updateUser);

// server for project model
app.post(`/api/create-project/:email`, authCheck, createProject);
app.get(`/api/projects-of-user/:email`, authCheck, findProjectsOf_aUser);
app.get(`/api/list-project`, authCheck, listProject);
app.get(`/api/display-project/:id`, authCheck, findProjectbyId);
app.delete(`/api/delete-project/:id`, authCheck, deleteProject);
app.put(`/api/update-project/:id`, authCheck, updateProject);

// server for task model
app.post(`/api/create-task/:email`, authCheck, createTask);
app.get(`/api/list-task`, authCheck, listTask);
app.get(`/api/display-task/:id`, authCheck, findTaskbyId);
app.delete(`/api/delete-task/:id`, authCheck, deleteTask);
app.put(`/api/update-task/:id`, authCheck, updateTask);
app.get(`/api/tasks-of-user/:email`, authCheck, findTasksOf_aUser);
app.get(`/api/tasks-of-project/:project`, authCheck, findTasksOf_aProject);


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });
//app.put(`/api/update-task-of-user/:email`, authCheck, updateTaskOf_aUser);
