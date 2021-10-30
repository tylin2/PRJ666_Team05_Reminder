import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import styles from "./Signup.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { addToUser, foundUser } from "./UserServices";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, login } = useAuth(); //retrieve only signup property of value of context.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (window.localStorage.getItem("token")) {
    history.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    //console.log(foundUser(emailRef.current.value));

    // if (!foundUser(emailRef.current.value)) {
    //   return setError("Email already exists")
    // }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value); //returns UserCredential
      var userName = emailRef.current.value.split("@")[0];
      addToUser(emailRef.current.value, userName, passwordRef.current.value);
      const user = await login(
        emailRef.current.value,
        passwordRef.current.value
      );

      window.localStorage.setItem("token", user.getIdToken());

      // const credential = await signup(emailRef.current.value, passwordRef.current. value)//returns UserCredential
      //console.log(credential);
      
      window.location.reload(true);
    } catch (e) {
      console.log(e);
      if (e.code === "auth/email-already-in-use") {
        setError(e.message);
      } else {
        setError("Failed to create an account");
      }
    }

    setLoading(false);
  }

  return (
    <>
      <br />
      <Card style={{ width: "30rem" }} className={styles.card}>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={handleSubmit}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
