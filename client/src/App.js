import React, { useState, useEffect } from "react";
import Nav from "./components/nav/Nav";
import NavLink from "./components/nav/navlink/NavLink";
import Input from "./components/form/Input";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Body from "./components/body/Body";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import AuthNav from "./components/header/login/AuthNav";

import logo from "./assets/img/logo.png";

import TaskList from "./pages/tasks/taskList";
import Tasks from "./pages/tasks/Task";
import CreateTask from "./pages/tasks/CreateTask"
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
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdToken();
        window.localStorage.setItem("token", idTokenResult);
      }
    });

    console.log("call?");
    if (window.localStorage.getItem("token")) {
      setIsAuth(true);
    }
    console.log(window.localStorage.getItem("token"));
    console.log(isAuth);

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Header>
        {" "}
        <a href="/">
          <img
            src={logo}
            alt="logo"
            style={{ height: "3.25rem", marginLeft: "2rem" }}
          />
        </a>
        <Form>
          {" "}
          <Input placeholder="Search by anything..." />
        </Form>
        <AuthNav/>
      </Header>
      <Body>
        {" "}
        <Nav>
          {" "}
          <NavLink href="/project">Project</NavLink>
          <NavLink href="/task_list">Task</NavLink>
          {/*<NavLink href='/calendar'>Calendar</NavLink>*/}
        </Nav>
        <Content>
        <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/task_list' component={TaskList} />
              <PrivateRoute exact path='/project' component={ProjectForm} />
              <PrivateRoute exact path='/' component={Calendar} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={LoginComp} />
              <Route path='/forgotPass' component={ForgotPassword} />
              <Route path='/task' component={Tasks} />
              <Route path='/createTask' component={CreateTask} />
            </Switch>
            {/* Your code must be placed here */}
          </AuthProvider>
        </Content>
      </Body>
    </Container>
  );
}

export default App;
