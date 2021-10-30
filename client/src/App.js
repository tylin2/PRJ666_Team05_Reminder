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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Tasks from "./pages/tasks/Task";

import logo from "./assets/img/logo.png";

function App() {
  return (
    <Router>
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
          <NavLink to="">Project_test</NavLink>
          <NavLink to="/tasks">Task_test</NavLink>
          <NavLink to="">User_test</NavLink>
        </Nav>

        <Content>
        <Switch>
          <Route exact path="/task">
            <Tasks />
          </Route>
        </Switch>
        </Content>
      </Body>
    </Container>
    </Router>
  );
}

export default App;
