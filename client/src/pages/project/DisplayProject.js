import React from "react";
import axios from "axios";
import DisplayProjectComp from "./DisplayProjectComp";
import TaskItem from "../tasks/taskItem";
import TaskList2 from "../tasks/taskList2";
import EditProject from "./EditProject";
import { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BiSortDown } from "react-icons/bi";
import styles from "./Project.module.scss";

export default function DisplayProject(props) {
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inputs, setInputs] = useState({
    name: "",
    manager: "",
    descript: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const idToken = window.localStorage.getItem("token");
  const id = props.match.params.id;
  const [isEditing, setIsEditing] = useState(false);
  const [isPrioritySorted, setIsPrioritySorted] = useState(false);
  const { name, descript } = inputs;

  //added by Yonghwan
  const [p1Count, setP1Count] = useState(0);
  const [p2Count, setP2Count] = useState(0);
  const [p3Count, setP3Count] = useState(0);
  const [p4Count, setP4Count] = useState(0);

  const [editDeleteToggle, setEditDeleteToggle] = useState(0);

  // useEffect(() => {
  //   if(tasks.length == 0){
  //     getProject(props);
  //   }else{
  //     console.log(`in the useEffect else block`)
  //     calculateTaskCounts(tasks);//I should not change tasks in this function.
  //   }
  // }, [tasks]);

  useEffect(() => {
    if(editDeleteToggle == 0){
      getProject(props);
    }else{
      console.log(`in the useEffect else block---->editDeleteToggle: ${editDeleteToggle}`)

      calculateTaskCounts(tasks);//I should not change tasks in this function.
    }
  }, [editDeleteToggle]);

// Associated states: totalTasks, completedTasks, p1Count ~ p4Count.
const calculateTaskCounts = (tasks) => {
  let count = 0;
  let totalCount = 0;
  let p1counter = 0;
  let p2counter = 0;
  let p3counter = 0;
  let p4counter = 0;

  //setTotalTasks(Number(tasks.length));
  tasks.forEach(task=>{
    ++totalCount;
    if (task.isCompleted == true) {
      count = count + 1;      
    } else {
      switch (task.priority) {
        case "P1":
          ++p1counter;
          //setP1Count(p1counter);
          break;
        case "P2":
          ++p2counter;          
          //setP2Count(p2counter);
          break;
        case "P3":
          ++p3counter;          
          //setP3Count(p3counter);
          break;
        case "P4":
          ++p4counter;          
          //setP4Count(p4counter);
          break;
        default:
      }
    }
  });
  setTotalTasks(totalCount);
  setCompletedTasks(count);
  setP1Count(p1counter);
  setP2Count(p2counter);
  setP3Count(p3counter);
  setP4Count(p4counter);

  console.log(`p1: ${p1Count}`);
  console.log(`p2: ${p2Count}`);
  console.log(`p3: ${p3Count}`);
  console.log(`p4: ${p4Count}`);
}

  const getProject = async (props) => {
    try {
      setError(null);
      setProject(null);
      setLoading(true);
      setTotalTasks(0);
      setCompletedTasks(0);
      const projectOfid = await axios.get(
        "/api//api/display-project/" + id,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`from Project useEffect -----------------`);
      console.log(projectOfid.data);
      setProject(projectOfid.data);
      setInputs({
        ...inputs,
        name: projectOfid.data.name,
        manager: projectOfid.data.manager,
        descript: projectOfid.data.descript,
      });
      const tasksOfproject = await axios.get(
        "/api//api/tasks-of-project/" + id,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`from Tasks useEffect in Project -----------------`);
      console.log(tasksOfproject.data);
      setTasks(tasks.concat(tasksOfproject.data));
      setTotalTasks(Number(tasksOfproject.data.length));
      var count = 0;
      /*tasksOfproject.data.map((task) => {
        if (task.isCompleted == true) {
          count = count + 1;
          console.log(task.name);
          setCompletedTasks(count);
        }
      });*/
      let p1counter = 0;
      let p2counter = 0;
      let p3counter = 0;
      let p4counter = 0;
      tasksOfproject.data.map((task) => {
        if (task.isCompleted == true) {
          count = count + 1;
          console.log(task.name);
          setCompletedTasks(count);
        } else {
          switch (task.priority) {
            case "P1":
              ++p1counter;
              //setP1Count(p1counter);
              break;
            case "P2":
              ++p2counter;              
              //setP2Count(p2counter);
              break;
            case "P3":
              ++p3counter;              
              //setP3Count(p3counter);
              break;
            case "P4":
              ++p4counter;              
              //setP4Count(p4counter);
              break;
            default:
          }
          setP1Count(p1counter);
          setP2Count(p2counter);
          setP3Count(p3counter);
          setP4Count(p4counter);
        }
      });
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const deleteProject = async (props) => {
    try {
      const projectOfid = await axios.delete(
        "/api//api/delete-project/" + id,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );

      history.push("/");
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
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
    
    if (e.target.checked) {
      setCompletedTasks(completedTasks + 1);
    } else {
      setCompletedTasks(completedTasks - 1);
    }
    //let increase = 1;
    setEditDeleteToggle(editDeleteToggle+1);
  };
  const onDelete = (e, id) => {
    deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
    setEditDeleteToggle(editDeleteToggle+1);
  };
  const onPrioritySorted = () => {
    setIsPrioritySorted(!isPrioritySorted);
  };
  const deleteTask = async (task_id) => {
    setError(null);
    try {
      const taskOfid = await axios.delete(
        "/api//api/delete-task/" + task_id,
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
        "/api//api/update-task/" + id,
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

  const onCancel = (e) => {
    setIsEditing(!isEditing);
    setInputs({
      ...inputs,
      name: project.name,
      descript: project.descript,
    });
  };

  const onEdit = (e) => {
    e.preventDefault();
    const project = {
      name: inputs.name,
      descript: inputs.descript,
    };
    editProject(project);
    console.log(project);
    setIsEditing(!isEditing);
    console.log(project);
    //? Without this push, data is not rendered inside DisplayProjectComp.js
    history.push("/project_list");
  };

  const editProject = async (props) => {
    try {
      const updatedProject = await axios.put(
        "/api//api/update-project/" + id,
        props,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
      console.log(`from within editProject -----------------`);
      console.log(updatedProject.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };


  // let p1counter = 0;
  // let p2counter = 0;
  // let p3counter = 0;
  // let p4counter = 0;
  // tasks.forEach(t=>{
  //   if(t.isCompleted === false) {
  //     switch (t.priority) {
  //       case "P1":
  //         ++p1counter;
  //         //setP1Count(p1counter);
  //         break;
  //       case "P2":
  //         ++p2counter;
  //         //setP2Count(p2counter);
  //         break;
  //       case "P3":
  //         ++p3counter;
  //         //setP3Count(p3counter);
  //         break;
  //       case "P4":
  //         ++p4counter;
  //         //setP4Count(p4counter);
  //         break;
  //       default:
  //     }
  //   }
  // });


  return (
    <>
      <br />
      <Card style={{ width: "90rem" }} className={styles.card}>
        <Card.Body>
          {isEditing ? (
            <EditProject
              name={name}
              descript={descript}
              onEdit={onEdit}
              onChange={onChange}
              onCancel={onCancel}
              existProject={project}
            />
          ) : (
            <>
              <DisplayProjectComp
                entry={project}
                comp={Math.round((completedTasks / totalTasks) * 100)}
                loading={loading}
                error={error}
                onPrioritySorted={onPrioritySorted}
                isPrioritySorted={isPrioritySorted}
              />
              <h4 className={styles.sortRule}>
                Sorted by {isPrioritySorted ? "Priority" : "Due date"}
              </h4>
              <BiSortDown
                style={{}}
                className={styles.sortIcon}
                onClick={onPrioritySorted}
              />
              {/* {tasks?.map((task) => {
                return (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                  />
                );
              })} */}
              {totalTasks - completedTasks > 0 && (
                <h5 className={styles.isCompletedHeader}>
                  UnCompleted Tasks: {totalTasks - completedTasks}
                </h5>
              )}
              {!isPrioritySorted &&
                tasks
                  .sort((a, b) => {
                    //if(typeof a.dueDate === 'Date')
                    if (typeof a.dueDate !== "string") a.dueDate.toISOString();
                    if (typeof b.dueDate !== "string") b.dueDate.toISOString();
                    return a.dueDate //2021-11-27T23:47:00.000Z
                      .split("T")[0] //2021-11-27
                      .split("-") // [2021, 11, 27]
                      .join()
                      .localeCompare(b.dueDate.split("T")[0].split("-").join());
                  })
                  .map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={onComplete}
                          onDelete={onDelete}
                        />
                      );
                    }
                  })}

              {isPrioritySorted && p1Count > 0 && (                 
                <div className={styles.textBox}>
                  <h5 className={styles.alignLeft}>{p1Count}</h5>
                  <h5 className={styles.P1_alignCenter}>Priority 1</h5>
                </div>
              )}
              {isPrioritySorted &&
                tasks
                  .filter((task) => task.priority === "P1")
                  .map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={onComplete}
                          onDelete={onDelete}
                        />
                      );
                    }
                  })}

              {isPrioritySorted && p2Count > 0 && (                 
                <div className={styles.textBox}>
                  <h5 className={styles.alignLeft}>{p2Count}</h5>
                  <h5 className={styles.P2_alignCenter}>Priority 2</h5>
                </div>
              )}
              {isPrioritySorted &&
                tasks
                  .filter((task) => task.priority === "P2")
                  .map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={onComplete}
                          onDelete={onDelete}
                        />
                      );
                    }
                  })}

              {isPrioritySorted && p3Count > 0 && (
                <div className={styles.textBox}>
                  <h5 className={styles.alignLeft}>{p3Count}</h5>
                  <h5 className={styles.P3_alignCenter}>Priority 3</h5>
                </div>
              )}
              {isPrioritySorted &&
                tasks
                  .filter((task) => task.priority === "P3")
                  .map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={onComplete}
                          onDelete={onDelete}
                        />
                      );
                    }
                  })}

              {isPrioritySorted && p4Count > 0 && (                 
                <div className={styles.textBox}>
                  <h5 className={styles.alignLeft}>{p4Count}</h5>
                  <h5 className={styles.P4_alignCenter}>Priority 4</h5>
                </div>
              )}
              {isPrioritySorted &&
                tasks
                  .filter((task) => task.priority === "P4")
                  .map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={onComplete}
                          onDelete={onDelete}
                        />
                      );
                    }
                  })}
              {completedTasks > 0 && (
                <h5 className={styles.isCompletedHeader}>
                  Completed Tasks: {completedTasks}
                </h5>
              )}
              {tasks
                .sort((a, b) => {
                  //if(typeof a.dueDate === 'Date')
                  if (typeof a.dueDate !== "string") a.dueDate.toISOString();
                  if (typeof b.dueDate !== "string") b.dueDate.toISOString();
                  return a.dueDate //2021-11-27T23:47:00.000Z
                    .split("T")[0] //2021-11-27
                    .split("-") // [2021, 11, 27]
                    .join()
                    .localeCompare(b.dueDate.split("T")[0].split("-").join());
                })
                .map((task) => {
                  if (task.isCompleted === true) {
                    if (typeof task.dueDate === "object")
                      task.dueDate.toISOString();
                    return (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onComplete={onComplete}
                        onDelete={onDelete}
                      />
                    );
                  }
                })}

              <br />
            </>
          )}
          {!isEditing ? (
            <span>
              <Button
                style={{
                  color: "#00000",
                  background: "#0A7BC2",
                  border: "none",
                  paddingRight: 16,
                  paddingLeft: 16,
                  fontSize: 14,
                }}
                size="lg"
                href={`/createProjectTask/${id}`}
              >
                Add Task
              </Button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Button
                style={{
                  color: "#00000",
                  background: "#0A7BC2",
                  border: "none",
                  paddingRight: 16,
                  paddingLeft: 16,
                  fontSize: 14,
                }}
                size="lg"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit Project
              </Button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Button
                style={{
                  color: "#00000",
                  background: "#FE6D73",
                  border: "none",
                  fontSize: 14,
                }}
                size="lg"
                onClick={deleteProject}
              >
                Delete Project
              </Button>
            </span>
          ) : (
            <span></span>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
