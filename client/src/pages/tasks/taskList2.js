import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Card } from "react-bootstrap";
import styles from "./Task.module.scss";
import TaskItem from "./taskItem";
import { BiSortDown } from "react-icons/bi";

export default class TaskList2 extends Component {
  render() {
    let p1Count = 0;
    let p2Count = 0;
    let p3Count = 0;
    let p4Count = 0;
    let completedCount = 0;
    let unCompletedCount = 0;
    if (this.props.loading) {
      return <div>on loading..</div>;
    } else if (this.props.error) {
      return <div>error occurred</div>;
    } else {
      let tasks = this.props.entries;

      //count
      tasks.forEach((task) => {
        if (!task.isCompleted) {
          switch (task.priority) {
            case "P1":
              ++p1Count;
              break;
            case "P2":
              ++p2Count;
              break;
            case "P3":
              ++p3Count;
              break;
            case "P4":
              ++p4Count;
              break;
            default:
          }
          ++unCompletedCount;
        } else {
          ++completedCount;
        }
      });
      let p1Tasks = tasks.filter((task) => task.priority === "P1");
      let p2Tasks = tasks.filter((task) => task.priority === "P2");
      let p3Tasks = tasks.filter((task) => task.priority === "P3");
      let p4Tasks = tasks.filter((task) => task.priority === "P4");
      let sorted = tasks.sort((a, b) => {
        //if(typeof a.dueDate === 'Date')
        if (typeof a.dueDate !== "string") a.dueDate.toISOString();
        if (typeof b.dueDate !== "string") b.dueDate.toISOString();
        /*return a.dueDate //2021-11-27T23:47:00.000Z
          .split("T")[0] //2021-11-27
          .split("-") // [2021, 11, 27]
          .reverse()// [27, 11, 2021]
          .join()
          .localeCompare(b.dueDate.split("T")[0].split("-").reverse().join());*/
        return a.dueDate //2021-11-27T23:47:00.000Z
          .split("T")[0] //2021-11-27
          .split("-") // [2021, 11, 27]
          .join()
          .localeCompare(b.dueDate.split("T")[0].split("-").join());
      });

      return (
        <>
          <br />
          <Card style={{ width: "90rem" }} className={styles.card}>
            <Card.Body>
              {/* <h1 className="text-center" style={{color: 'black'}}>Task List</h1> */}
              <h1 className="text-center">Task List</h1>
              <h4 className={styles.sortRule}>
                Sorted by{" "}
                {this.props.isPrioritySorted ? "Priority" : "Due date"}
              </h4>
              <BiSortDown
                style={{}}
                className={styles.sortIcon}
                onClick={this.props.onPrioritySorted}
              />
              {unCompletedCount > 0 && (
                <h5 className={styles.isCompletedHeader}>
                  UnCompleted Tasks: {unCompletedCount}
                </h5>
              )}
              <ListGroup>
                {!this.props.isPrioritySorted &&
                  tasks.map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={this.props.onComplete}
                          onDelete={this.props.onDelete}
                        />
                      );
                    }
                  })}

                {/* {this.props.isPrioritySorted && p1Count > 0 && (
                    <h5 className={styles.p1}>
                      Priority 1-{" "}
                      <span style={{ color: "black" }}>({p1Count})</span>
                    </h5>
                  )} */}
                {this.props.isPrioritySorted && p1Count > 0 && (
                  <h5 className={styles.p1Header}>Priority 1</h5>
                )}
                {this.props.isPrioritySorted &&
                  p1Tasks.map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={this.props.onComplete}
                          onDelete={this.props.onDelete}
                        />
                      );
                    }
                  })}

                {/* {this.props.isPrioritySorted && p2Count > 0 && (
                    <h5 className={styles.p2}>
                      Priority 2-{" "}
                      <span style={{ color: "black" }}>({p2Count})</span>
                    </h5>
                  )} */}
                {this.props.isPrioritySorted && p2Count > 0 && (
                  <h5 className={styles.p2Header}>Priority 2</h5>
                )}
                {this.props.isPrioritySorted &&
                  p2Tasks.map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={this.props.onComplete}
                          onDelete={this.props.onDelete}
                        />
                      );
                    }
                  })}

                {/* {this.props.isPrioritySorted && p3Count > 0 && (
                    <h5 className={styles.p3}>
                      Priority 3 -{" "}
                      <span style={{ color: "black" }}>({p3Count})</span>
                    </h5>
                  )} */}
                {this.props.isPrioritySorted && p3Count > 0 && (
                  <h5 className={styles.p3Header}>Priority 3</h5>
                )}
                {this.props.isPrioritySorted &&
                  p3Tasks.map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={this.props.onComplete}
                          onDelete={this.props.onDelete}
                        />
                      );
                    }
                  })}

                {/* {this.props.isPrioritySorted && p4Count > 0 && (
                    <h5 className={styles.p4}>
                      Priority 4-{" "}
                      <span style={{ color: "black" }}>({p4Count})</span>
                    </h5>
                  )} */}
                {this.props.isPrioritySorted && p4Count > 0 && (
                  <h5 className={styles.p4Header}>Priority 4</h5>
                )}
                {this.props.isPrioritySorted &&
                  p4Tasks.map((task) => {
                    if (task.isCompleted === false) {
                      if (typeof task.dueDate === "object")
                        task.dueDate.toISOString();
                      return (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onComplete={this.props.onComplete}
                          onDelete={this.props.onDelete}
                        />
                      );
                    }
                  })}

                {completedCount > 0 && (
                  <h5 className={styles.isCompletedHeader}>
                    Completed Tasks: {completedCount}
                  </h5>
                )}
                {tasks.map((task) => {
                  if (task.isCompleted === true) {
                    if (typeof task.dueDate === "object")
                      task.dueDate.toISOString();
                    return (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onComplete={this.props.onComplete}
                        onDelete={this.props.onDelete}
                      />
                    );
                  }
                })}
              </ListGroup>
              <br />
              <Button
                style={{
                  color: "#00000",
                  background: "#0A7BC2",
                  border: "none",
                  fontSize: 14,
                }}
                href="/createTask"
                size="lg"
              >
                Create New Task
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }
  }
}
