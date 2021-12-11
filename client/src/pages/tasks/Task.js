import React from "react";
import TaskList2 from "./taskList2";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.js";
import EditTask from "./EditTask";

function Tasks() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const idToken = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numOfCompleted, setNumOfCompleted] = useState(false);
  const [isPrioritySorted, setIsPrioritySorted] = useState(false);

  /**
   * onComplete
   * * What this function does
   * 1. call Api of edit task with the id passed as an argument.
   * 2. update the tasks using id param so that isCompleted is equal to e.target.checked
   * @param  e
   * @param {*} id: _id of the task clicked by user completing it.
   */
  const onComplete = (e, id) => {
    //setCheck(e.target.checked);
    const task = {
      isCompleted: e.target.checked,
    };
    editTask(task, id);
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, isCompleted: e.target.checked } : task
      )
    );
  };
  const onDelete = (e, id) => {
    deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };
  const onPrioritySorted = () => {
    setIsPrioritySorted(!isPrioritySorted);
  };

  const deleteTask = async (task_id) => {
    setError(null);
    try {
      const taskOfid = await axios.delete(
        "http://localhost:8080/api/delete-task/" + task_id,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      //history.push("/");
    } catch (e) {
      setError(e);
    }
    //setLoading(false);
  };

  const editTask = async (task, id) => {
    try {
      setError(null);
      //setTasks([null]);
      //setLoading(true);
      const updatedTask = await axios.put(
        "http://localhost:8080/api/update-task/" + id,
        task,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`from within editTask -----------------`);
      console.log(updatedTask.data);
    } catch (e) {
      setError(e);
    }
    //setLoading(false)
  };

  const fetchTasks = async () => {
    try {
      setError(null);
      setTasks(null);
      setLoading(true);

      const idToken = window.localStorage.getItem("token");
      const userEmail = currentUser.email;
      const tasksOfuser = await axios.get(
        "http://localhost:8080/api/tasks-of-user/" + userEmail,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`from Task useEffect -----------------`);
      console.log("=======");
      //console.log(project);
      console.log(tasksOfuser.data);
      setTasks(tasks.concat(tasksOfuser.data));
      //setTaskCounter({...taskCounter, });
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <TaskList2
        entries={tasks}
        loading={loading}
        error={error}
        //onChange={onChange}
        onComplete={onComplete}
        onDelete={onDelete}
        //checked={check}
        isPrioritySorted={isPrioritySorted}
        onPrioritySorted={onPrioritySorted}
      />
    </>
  );
}

export default Tasks;
