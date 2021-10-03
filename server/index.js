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
const { createTask, listTask } = require("./controllers/task");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// server for user model
app.post(`/api/create-or-update-user`, createOrUpdateUser)
app.post(`/api/current-user`, currentUser)
app.post(`/api/all-user`, allUser)

// server for project model
app.post(`/api/create-project`, createProject)
app.get(`/api/list-project`, listProject)

// server for task model
app.post(`/api/create-task`, createTask)
app.get(`/api/list-task`, listTask)
