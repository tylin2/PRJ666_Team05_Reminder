const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const decodeIDToken = require('./authenticateToken');
const { createProject, listProject } = require("./controllers/project");
const {
  createOrUpdateUser,
  currentUser,
  findUser,
  allUser,
} = require("./controllers/user");
const { createTask, listTask, deleteTask, updateTask } = require("./controllers/task");
dotenv.config();

// app
const app = express();

//db
mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then((data) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`DB CONNECTION ERROR: ${err}`);
  });

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(decodeIDToken);

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// server for user model
app.post(`/api/create-or-update-user`, createOrUpdateUser)
app.post(`/api/current-user`, currentUser)
app.post(`/api/all-user`, allUser)
app.get('/api/user', findUser);

// server for project model
app.post(`/api/create-project`, createProject)
app.get(`/api/list-project`, listProject)

// server for task model
app.post(`/api/create-task`, createTask)
app.get(`/api/list-task`, listTask)
app.delete(`/api/delete-task/:id`, deleteTask)
app.post(`/api/update-task/:id`, updateTask)

