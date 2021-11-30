import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase";
import { CSVLink } from "react-csv";
import { getAuth, reauthenticateWithCredential } from "firebase/auth";
import { useHistory } from "react-router-dom";

import {
  Card,
  ListGroup,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.js";
import { updateUser } from "./UserServices";
import styles from "./Signup.module.scss";
import EditUser from "./EditUser.js";
import { constrainPoint } from "@fullcalendar/common";

export default function Account(props) {
  // const onComplete = (e, id) => {
  //     //setCheck(e.target.checked);
  //     const task = {
  //       isCompleted: e.target.checked,
  //     };
  //     editTask(task, id);
  //     setTasks(
  //       tasks.map((task) =>
  //         task._id === id ? { ...task, isCompleted: e.target.checked } : task
  //       )
  //     );
  //   };

  const idToken = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });

  const { currentUser, logout, getCredential } = useAuth();
  const [isEditing, setIsEditing] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const { name, email, password } = inputs;

  useEffect(() => {
    getUser(props);
  }, []);

  const getUser = async (props) => {
    try {
      setError(null);
      setLoading(true);
      const userOfEmail = await axios.get(
        "http://localhost:8080/api/current-user/" + currentUser.email,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );

      setUser(userOfEmail.data);
      setInputs({
        ...inputs,
        name: user.userName,
        email: user.email,
        password: user.password,
      });
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  const onEdit = (e) => {
    e.preventDefault();

    const user = {
      userName: inputs.name,
    };

    editUser(user);
    console.log(user);
    setIsEditing(!isEditing);
    console.log(user);

    history.push("/");
  };

  const onCancel = (e) => {
    setIsEditing(!isEditing);
    setInputs({
      ...inputs,
      name: user.userName,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onDelete = () => {
    //error: TypeError: Object(...) is not a function
    /*const auth = getAuth();
    const user = auth.currentUser;
    reauthenticateWithCredential(user, "Password")
      .then(() => {
        // User re-authenticated.
        console.log(`user has been re-authenticated`);
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(`error during re-auth: ${error}`);
      });*/

    currentUser
      .delete()
      .then(() => {
        deleteUser();
        console.log("user is deleted");
        localStorage.removeItem("token");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("Error occurred while deleting user: " + error);
      });

  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        "http://localhost:8080/api/delete-user/" + currentUser.email,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const editUser = async (props) => {
    try {
      const updatedUser = await axios.put(
        "http://localhost:8080/api/update-user/" + currentUser.email,
        props,
        {
          headers: {
            Authorization: "Bearer " + idToken,
          },
        }
      );

      console.log(`from within editUser -----------------`);
      console.log(updatedUser.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <Card style={{ width: "90rem" }} className={styles.accountCard}>
        {isEditing ? (
          <h2 className="text-center mb-4">Account Service</h2>
        ) : (
          <></>
        )}
        <Card.Body>
          {!isEditing ? (
            <EditUser
              name={name}
              email={email}
              onEdit={onEdit}
              onChange={onChange}
              onCancel={onCancel}
              existUser={user}
            />
          ) : (
            <>
              <p>Username: {user.userName}</p>
              <p>Email: {user.email}</p>
              <ListGroup.Item action href="/forgotPass">
                Reset Password
              </ListGroup.Item>
              <ListGroup.Item>
                Set Notification Time
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Dropdown button"
                  onSelect={"6"}
                >
                  <Dropdown.Item eventKey="6">06:00</Dropdown.Item>
                  <Dropdown.Item eventKey="12">12:00</Dropdown.Item>
                  <Dropdown.Item eventKey="21">21:00</Dropdown.Item>
                  <Dropdown.Item eventKey="0">00:00</Dropdown.Item>
                </DropdownButton>
              </ListGroup.Item>
              <ListGroup.Item>Export Tasks to CSV</ListGroup.Item>
              <ListGroup.Item onClick={() => setIsEditing(!isEditing)}>
                Edit User Information
              </ListGroup.Item>
              <ListGroup.Item
                action
                href=""
                onClick={() => setShowConfirm(!showConfirm)}
              >
                Delete Account
              </ListGroup.Item>
              {showConfirm && (
                <ListGroup.Item
                  action
                  href=""
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={styles.deleteMessage}
                >
                  Deleting account will permanently remove your data. If you
                  want to, &nbsp;  <span className={styles.reLoginMessage}>Re-login </span>and click
                  confirm.
                </ListGroup.Item>
              )}
              {showConfirm && (
                <Button
                  type="submit"
                  style={{
                    color: "#00000",
                    background: "#0A7BC2",
                    border: "none",
                    paddingRight: 16,
                    paddingLeft: 16,
                    fontSize: 14,
                  }}
                  size="lg"
                  onClick={onDelete}
                >
                  Confirm
                </Button>
              )}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              {showConfirm && (
                <Button
                  style={{
                    color: "#00000",
                    background: "#FE6D73",
                    border: "none",
                    paddingRight: 16,
                    paddingLeft: 16,
                    fontSize: 14,
                  }}
                  size="lg"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
