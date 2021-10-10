import React from "react";
import Nav from "./components/nav/Nav";
import NavLink from "./components/nav/navlink/NavLink";
import Input from "./components/form/Input";
import Form from "./components/form/Form";
import Container from "./components/container/Container";
import Body from "./components/body/Body";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import Login from "./components/header/login/Login";

import logo from "./assets/img/logo.png";

import TaskList from "./pages/tasks/taskList";
import Signup from "./pages/user/Signup";
import LoginComp from "./pages/user/Login";
import PrivateRoute from "./pages/user/PrivateRoute";

import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <Container>
      <Header>
        {" "}
        <img
          src={logo}
          alt="logo"
          style={{ height: "3.25rem", marginLeft: "2rem" }}
        />
        <Form>
          {" "}
          <Input placeholder="Search by anything..." />
        </Form>
        <Login />
      </Header>
      <Body>
        {" "}
        <Nav>
          {" "}
          <NavLink href="">Project_test</NavLink>
          <NavLink href="/task_list">Task_test</NavLink>
          <NavLink href="">User_test</NavLink>
        </Nav>
        <Content>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <LoginComp />
            </Route>                       
            <Route path="/task_list">
              <TaskList />
            </Route>
          </Switch>
          {/* Your code must be placed here */}
          <h1>This is where the main contents will be placed</h1>
          <hr />
          <h1>Font should be changed as well...</h1>
          <hr />
          <h1>Kind of responsive design...</h1>
          <hr />
          <h1>Change logo...</h1>
          
        </Content>
      </Body>
      
    </Container>
  );
}

export default App;
