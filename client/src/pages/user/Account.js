
import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import firebase from 'firebase';

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

import "bootstrap/dist/css/bootstrap.css";
 

export default function Account( props ) {

    const idToken = window.localStorage.getItem("token")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const [user, setUser] = useState([]);    
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
    })

    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const { name, email } = inputs;
    const [notificationTime, setNotificationTime] = useState('');
    const headers = [
        { label: "Subject", key: "name" },
        { label: "Start date", key: "dueDate" },
        { label: "Descript", key: "descript" }
    ];
    const [taskData, setTaskData] = useState([]);


    useEffect(() => {            
        getUser(props);                                
    },[])   
    
    const getUser = async (props) => {        
        
        try {
            setError(null);
            setLoading(true);
            setTaskData([]);       
            const userOfEmail = await axios.get(
                'http://localhost:8080/api/current-user/' + currentUser.email, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            setUser(userOfEmail.data)
            setInputs({
                ...inputs,
                name: user.userName,
                email: user.email
            })
            setNotificationTime(userOfEmail.data.notificationTime)

            const tasksOfuser = await axios.get(
                "http://localhost:8080/api/tasks-of-user/" + currentUser.email,
                {
                  headers: {
                    Authorization: "Bearer " + idToken,
                  },
                }
            );            
            var tasklist = []
            tasksOfuser.data.map(task => {
                tasklist.push({name: task.name, dueDate: `${task.dueDate.split("T")[0]}`,descript: task.descript})
            })
            console.log(tasklist)            
            setTaskData(taskData.concat(tasklist)) 
            
        }catch(e) {
            setError(e)
            console.log(e)
        }        
        setLoading(false)
    }

    const onEdit = (e) => {
        e.preventDefault();
        
        const user = {
            userName: inputs.name,
            notificationTime: notificationTime

        }
      

      editUser(user);
      console.log(user);
      setIsEditing(!isEditing);
      console.log(user);
  
      history.push("/");
    }
  
  const handleNotificationTimeChange = (e) => {
        setNotificationTime(e.target.value)
        console.log('notificationTime: ' + e.target.value)
   }

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
    <br />
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
              handleNotificationTimeChange={handleNotificationTimeChange}
            />
          ) : (
            <>
              <p>Username: {user.userName}</p>
              <p>Email: {user.email}</p>
              <ListGroup.Item action href="/forgotPass">
                Reset Password
              </ListGroup.Item>
              
               <ListGroup.Item action> <CSVLink 
                                    filename="The_Reminder.csv" 
                                    headers={headers}
                                    data={taskData}
                                    className = {styles.csvlink}>Export to CSV </ CSVLink>
                                    </ListGroup.Item>

              <ListGroup.Item action onClick={() => setIsEditing(!isEditing)}>
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
