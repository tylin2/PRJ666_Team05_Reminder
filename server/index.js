const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { createProject, listProject } = require("./controllers/project");
const {
  createOrUpdateUser,
  currentUser,
  allUser,
} = require("./controllers/user");
const {
  findTasksOf_aUser,
  createTask,
  listTask,
  deleteTask,
  updateTask,
  findTaskbyId,
} = require("./controllers/task");
const { authCheck } = require("./middleware/auth");

const time_set_function = require("./functions/sendgrid/timer");
dotenv.config();

// app
const app = express();
app.use(express.static('public'))

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

// server for project model
app.post(`/api/create-project`, authCheck, createProject);
app.get(`/api/list-project`, authCheck, listProject);

// server for task model
app.post(`/api/create-task/:email`, authCheck, createTask);
app.get(`/api/list-task`, authCheck, listTask);
app.get(`/api/display-task/:id`, authCheck, findTaskbyId);
app.delete(`/api/delete-task/:id`, authCheck, deleteTask);
app.put(`/api/update-task/:id`, authCheck, updateTask);
app.get(`/api/tasks-of-user/:email`, authCheck, findTasksOf_aUser);
//app.put(`/api/update-task-of-user/:email`, authCheck, updateTaskOf_aUser);
