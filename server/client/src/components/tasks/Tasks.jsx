import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import NewTaskItem from "./NewTaskItem";
import FormGroup from "@material-ui/core/FormGroup";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import TaskService from "../../services/TaskService";
import TasksTable from "./TasksTable";
import { Link } from "react-router-dom";

const Tasks = (props) => {

  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const curr_project = props.match.params.project_id;

  const [tasks, setTasks] = useState([]);
  const [tasksByMe, setTasksByMe] = useState([]);
  const [tasksOth, setTasksOth] = useState([]);

  const [viewTasks, setViewTasks] = useState({
    assigned_to_me: true,
    assigned_by_me: false,
    other: false,
  });

  useEffect(() => {

    TaskService.getTasks(curr_project).then((data) => {
      if (!data.msgError) {
        setTasks(data.tasks);
      } else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(data);
      }
    });

    TaskService.getTasksByMe(curr_project).then((data) => {
      
      if (!data.msgError) {
        setTasksByMe(data.tasks);
      } else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(data);
      }
    });

    TaskService.getTasksOth(curr_project).then((data) => {

      if (!data.msgError) {
        setTasksOth(data.tasks);
      } else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(data);
      }
    });
  }, []);

  useEffect(
    () => {
      function fun (event){
        var id = event.target.name;
        var tbl_tasks = document.getElementById(id);
        var isChecked = event.target.checked;
        if (tbl_tasks && isChecked) {
          tbl_tasks.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
      document.addEventListener("change", fun);

    },
    [viewTasks]
  );

  const handleChange = (event) => {
    setViewTasks({ ...viewTasks, [event.target.name]: event.target.checked });

  };


  return (
    <div className="tasks_section container">
      <div>
        <h6>Create New Task</h6>
        <NewTaskItem project_id={curr_project}></NewTaskItem>
      </div>
      <hr />

      <div>
        <div className="tasks_view_opt">
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewTasks.assigned_to_me}
                  onChange={handleChange}
                  name="assigned_to_me"
                  color="primary"
                />
              }
              label="Assigned to me"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewTasks.assigned_by_me}
                  onChange={handleChange}
                  name="assigned_by_me"
                  color="primary"
                />
              }
              label="Assigned by me"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={viewTasks.other}
                  onChange={handleChange}
                  name="other"
                  color="primary"
                />
              }
              label="View Other Tasks"
            />
            <Link
              to={`/projects/${curr_project}`}
              className="ml-auto"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="contained" color="primary" disableElevation>
                View Project Details
              </Button>
            </Link>
          </FormGroup>
        </div>
        {viewTasks.assigned_to_me ? (
          <TasksTable
            tasks={tasks}
            project_id={curr_project}
            user={authContext.user.username}
            isEditable={true}
          />
        ) : null}
        <br />
        {viewTasks.assigned_by_me ? (
          <div id="assigned_by_me" className="buffer">
            <h5 className="assigned">Assigned By Me</h5>
            <TasksTable
              tasks={tasksByMe}
              project_id={curr_project}
              user={authContext.user.username}
              isEditable={true}
            />
          </div>
        ) : null}
        <br />
        {viewTasks.other ? (
          <div id="other" className="buffer">
            <h5 className="assigned">Other Tasks</h5>
            <TasksTable
              tasks={tasksOth}
              project_id={curr_project}
              user={authContext.user.username}
              isEditable={false}
            />
          </div>
        ) : null}
        <br />
        <br />
        <br />
      </div>
    </div>
  );

};

export default Tasks;
