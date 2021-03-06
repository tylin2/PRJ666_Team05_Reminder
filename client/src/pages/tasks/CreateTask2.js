import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { Form, Button, Card, Alert } from "react-bootstrap";
import CheckBox from "../../components/checkBox/CheckBox";
import styles from "./Task.module.scss";
import "bootstrap/dist/css/bootstrap.css";

function CreateTask2({
  name,
  descript,
  dueDate,
  priority,
  notification,
  onCreate,
  onChange,
  handleDateChange,
  handlePriorityChange,
  handleNotification,
}) {
  const [check, setCheck] = useState(true);
  const onChangeNotification = (e) => {
    handleNotification(e);
    //handleNotification(e, task._id);
    setCheck(!check);
  };
  return (
    <Card style={{ width: "90rem" }} className={styles.card}>
      <Card.Body>
        <h1 className="text-center">Create Task</h1>
        <form onSubmit={onCreate}>
          <Form.Group id="name">
            <Form.Label class="col-sm-2 col-form-label col-form-label-lg">
              Task Name
            </Form.Label>
            <input
              placeholder="title"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group id="descript">
            <Form.Label class="col-sm-2 col-form-label col-form-label-lg">
              Description
            </Form.Label>
            <textarea
              placeholder="description"
              name="descript"
              value={descript}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group id="dueDate">
            <Form.Label class="col-sm-2 col-form-label col-form-label-lg">
              Due Date
            </Form.Label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                id="time-picker"
                //label="Time picker"
                value={dueDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Form.Group>

          <Form.Group id="priority">
            <Form.Label class="col-sm-2 col-form-label col-form-label-lg">
              Priority
            </Form.Label>
            <select
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="P1">Priority 1</option>
              <option value="P2">Priority 2</option>
              <option value="P3">Priority 3</option>
              <option value="P4">Priority 4</option>
            </select>
          </Form.Group>

          <Form.Group id="notification">
            <Form.Label class="col-sm-2 col-form-label col-form-label-lg">
              Check the box if you want to get notification for this task.
            </Form.Label>
            <CheckBox
              onChange={onChangeNotification}
              checked={check}
              priority={"P4"}
            />
          </Form.Group>

          <br />
          <Button
            type="submit"
            style={{
              color: "#00000",
              background: "#0A7BC2",
              border: "none",
              fontSize: 14,
            }}
            size="lg"
          >
            Create New Task
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}

export default CreateTask2;
