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
import Calendar from './pages/user/Calendar'
import ProjectForm from "./pages/project/Project";

import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
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
        <Login />
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
        <Switch>                       
                       <Route path="/task_list">
                           <TaskList />
                       </Route>
        </Switch>
        <Switch>                       
                       <Route path="/calendar">
                           <Calendar />
                       </Route>
        </Switch>
        <Switch>                       
                       <Route path="/project">
                           <ProjectForm />
                       </Route>
        </Switch>
        {/* Your code must be placed here */}
          
        </Content>
      </Body>
     
    </Container>
  );
}

export default App;
