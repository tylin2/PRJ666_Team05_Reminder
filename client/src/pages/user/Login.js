import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import styles from "./Signup.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, setToken } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  if (window.localStorage.getItem("token")) {
    history.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const userInfo = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const token = await userInfo.getIdToken();

      window.localStorage.setItem("token", token);
      setToken(token);
      console.log(userInfo.metadata)
       firebase.auth().signInWithEmailAndPassword(email, password)
       .catch((error) => {
         console.error('Incorrect username or password');
       });
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <br />
      <Card style={{ width: "30rem" }} className={styles.card}>
        <Card.Body>
          <h2 className="text-center">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
