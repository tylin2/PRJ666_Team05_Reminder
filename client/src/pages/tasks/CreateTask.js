import React from "react";
import moment from "moment";
import "moment-timezone";

import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CreateTask2 from "./CreateTask2";
import { useAuth } from "../../contexts/AuthContext.js";

export default function CreateTask() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({
    //_id: null,
    name: "",
    user: null,
    descript: "",
  });
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("P4");
  const [notification, setNotification] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, user, descript } = inputs;


  const history = useHistory();

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    console.log("Priority: " + e.target.value);
  };
  const handleDateChange = (date) => {
    console.log(date);
    setDueDate(date);
  };
  const handleNotification = (e) => {
    console.log(notification);
    setNotification(e.target.checked);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
    //console.log(priority.current)
  };

  const addNewTask = async (task) => {
    try {
      //console.log('task to be added: '+task.user)
      const idToken = window.localStorage.getItem("token");
      const userEmail = currentUser.email;

      const response = await axios.post(
        "http://localhost:8080/api/create-task/" + userEmail,
        task,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`addNewTask's response: ${response.data._id}`);

      setTasks([...tasks, response.data]);

      history.push("/task_list");
    } catch (e) {
      console.error(e);
    }
  };

  const onCreate = (e) => {
    e.preventDefault();
    console.log(dueDate);
    const userEmail = currentUser.email;
    const task = {
      name: inputs.name,
      user: userEmail,
      participants: [user],
      descript: inputs.descript,
      dueDate: moment(dueDate).tz("America/Toronto").toString(),//???
      priority: priority,
      notification: notification,
    };
    
    console.log(task.dueDate);
    addNewTask(task);
  };

  return (
    <>
      <CreateTask2
        name={name}
        descript={descript}
        dueDate={dueDate}
        priority={priority}        
        onCreate={onCreate}
        onChange={onChange}
        handleDateChange={handleDateChange}
        handlePriorityChange={handlePriorityChange}
        handleNotification={handleNotification}
      />
    </>
  );
}
