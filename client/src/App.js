import React, { useEffect } from "react";
import Nav from "./components/nav/Nav";
import NavLink from "./components/nav/navlink/NavLink";
import Input from "./components/form/Input";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Body from "./components/body/Body";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import Login from "./components/header/login/Login";
import Account from "./components/header/login/Account";

import logo from "./assets/img/logo.png";

import TaskList from "./pages/tasks/taskList";
import Calendar from "./pages/calendar/Calendar";
import ProjectForm from "./pages/project/Project";
import Signup from "./pages/user/Signup";
import LoginComp from "./pages/user/Login";
import PrivateRoute from "./pages/user/PrivateRoute";
import ForgotPassword from "./pages/user/ForgotPassword";
import AuthProvider from "./contexts/AuthContext";

import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import { auth } from "./firebase";

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdToken();
        window.localStorage.setItem("token", idTokenResult);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Header>
        {" "}
        <img
          src={logo}
          alt="logo"
          style={{ height: "3.25rem", marginLeft: "2rem" }}
          href="/"
        />
        <Form>
          {" "}
          <Input placeholder="Search by anything..." />
        </Form>
        {window.localStorage.getItem("token") ? <Account /> : <Login />}
      </Header>
      <Body>
        {" "}
        <Nav>
          {" "}
          <NavLink href="/project">Project</NavLink>
          <NavLink href="/task_list">Task</NavLink>
          <NavLink href="/calendar">Calendar</NavLink>
        </Nav>
        <Content>
          <AuthProvider>
            <Switch>
              <Route path="/task_list">
                <TaskList />
              </Route>
              <Route path="/calendar">
                <Calendar />
              </Route>
              <Route path="/project">
                <ProjectForm />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <LoginComp />
              </Route>
              <Route path="/forgotPass">
                <ForgotPassword />
              </Route>
            </Switch>
            {/* Your code must be placed here */}
          </AuthProvider>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
