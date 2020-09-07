import React, { useContext, useRef, useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService";
import TaskService from "../../services/TaskService";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core/";
import Alert from "react-bootstrap/Alert";
import { ProjectSchema } from "./ValidationSchemas";

const ViewProject = (props) => {

  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "ONGOING",
  });
  const authContext = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const project_id = props.match.params.project_id;
  const [message, setMessage] = useState(null);   
  const [totalTasks, setTotalTasks] = useState(0);   
  const [totalTasksRes, setTotalTasksRes] = useState(0);   
  const [isEditable, setIsEditable] = useState(true)
  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });
  let timerID = useRef(null);
  useEffect(() => {
    ProjectService.getProjectById(project_id).then((data) => {
      if (!data.msgError) {
        var d = new Date(data.project.createdAt)
        data.project.createdAt = d.toLocaleDateString();
        data.project.access = data.project.access.toUpperCase();
        setProject(data.project)
        if (data.project.created_by !== user.username) {
          setIsEditable(false);
        }
      } else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(data);
      }
    });   
    TaskService.countAllTasks(project_id).then((data) => {
    if (!data.msgError) {
      setTotalTasks(data.tasksCount);
    } else if (data.msgBody === "UnAuthorized") {
      setMessage(data);
      authContext.setUser({ username: "", role: "" });
      authContext.setIsAuthenticated(false);
    } else {
      setMessage(data);
    }
    });
    TaskService.countAllTasksResolved(project_id).then((data) => {
      if (!data.msgError) {
        setTotalTasksRes(data.tasksCountResolved);
      } else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(data);
      }
    });

  }, []);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { error } = ProjectSchema.validate({
      title: project.title,
      description: project.description,
    });
    if (error) {
      setError({
        errorEnum: error.details[0].context.key,
        errorMsg: error.details[0].message,
      });
    } else{
      project.access = project.access.toLowerCase();
      ProjectService.editProject(project,project_id).then((data) => {
        if (!data.msgError) {
          timerID = setTimeout(() => {
            props.history.push("/projects");
          }, 2000);
          setMessage("Project Updated Successfully.");
        } else if (message.msgBody === "UnAuthorized") {
          setMessage(message);
          authContext.setUser({ username: "", role: "" });
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(message);
        }
      });
    }
  };

  return (
    <div className="new_project_form_section">
      <Container className="new_project_form">
        <h3 className="new_project_form_heading">
          Project Details {!isEditable && <span> - Read Only</span>}
        </h3>
        <form onSubmit={onSubmit}>
          <br />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            disabled={!isEditable}
            value={project.title || ""}
            onChange={handleChange}
            fullWidth
          />
          {err.errorEnum === "title" ? (
            <FormHelperText
              id="component-error-text"
              style={{ position: "absolute" }}
            >
              {err.errorMsg}
            </FormHelperText>
          ) : (
            ""
          )}
          <br />
          <br />
          <TextField
            label="Description"
            name="description"
            value={project.description || ""}
            onChange={handleChange}
            multiline
            disabled={!isEditable}
            rows={4}
            fullWidth
            variant="outlined"
          />
          {err.errorEnum === "description" ? (
            <FormHelperText
              id="component-error-text"
              style={{ position: "absolute" }}
            >
              {err.errorMsg}
            </FormHelperText>
          ) : (
            ""
          )}
          <br />
          <br />
          <FormControl variant="outlined" style={{ minWidth: 300, flex: 1 }}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              value={project.status || ""}
              onChange={handleChange}
              label="Status"
              fullWidth
              disabled={!isEditable}
              inputProps={{
                name: "status",
                id: "outlined-age-native-simple",
              }}
            >
              <option>ONGOING</option>
              <option>COMPLETED</option>
            </Select>
          </FormControl>
          <br />
          <div className="static_project_details">
            <br />
            <p>Created by: {project.created_by}</p>
            <p>Created On: {project.createdAt}</p>
            <p>Total Tasks: {totalTasks}</p>
            <p>Resolved: {totalTasksRes}</p>
            <p>Active: {totalTasks - totalTasksRes}</p>
            <p>Access: {project.access} </p>
          </div>
          <Button
            type="submit"
            disabled={!isEditable}
            variant="contained"
            color="secondary"
          >
            Update
          </Button>
        </form>
        <br />
        <br />
      </Container>
      <br />
      {message ? (
        <Alert className="msg" variant="success">
          {message}
        </Alert>
      ) : null}
      <br />
      <br />
      <br />
    </div>
  );
}

export default ViewProject;
