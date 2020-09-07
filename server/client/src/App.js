import React from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavigationBar from "./components/navbar/NavigationBar";
import Features from "./components/features/Features";
import contactUs from "./components/contactUs/ContactUs";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import Projects from "./components/projects/Projects";
import NewProjectForm from './components/projects/NewProjectForm';
import ViewProjectItem from "./components/projects/ViewProjectItem";
import Tasks from './components/tasks/Tasks';
import NewTaskForm from "./components/tasks/NewTaskForm";
import ViewTaskItem from "./components/tasks/ViewTaskItem";
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import Profile from "./components/profile/Profile";


function App() {

  return (
    <div className="App" id="App">
      <Router>
        <Route path="/" component={NavigationBar} />
        <header className="App-header">
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Features} />
          <Route exact path="/" component={contactUs} />
          <ScrollToTop>
            <UnPrivateRoute exact path="/login" component={Login} />
            <UnPrivateRoute
              exact
              path="/register"
              component={Register}
            />
            <PrivateRoute exact path="/projects"  component={Projects} />
            <PrivateRoute
              exact
              path="/newProjectForm"
              component={NewProjectForm}
            />
            <PrivateRoute
              exact
              path="/projects/:project_id"
              component={ViewProjectItem}
            />
            <PrivateRoute exact path="/:project_id/tasks" component={Tasks} />
            <PrivateRoute
              exact
              path="/:project_id/newTaskForm"
              component={NewTaskForm}
            />
            <PrivateRoute
              exact
              path="/:project_id/:task_id/task"
              component={ViewTaskItem}
            />
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
            />
          </ScrollToTop>
        </header>
      </Router>
    </div>
  );
}

export default App;
