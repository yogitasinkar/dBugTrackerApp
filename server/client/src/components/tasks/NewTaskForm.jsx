import React, { useState, useRef, useContext, useEffect } from "react";
import { Button, TextField, Container } from "@material-ui/core/";
import { AuthContext } from "../../context/AuthContext";
import TaskService from "../../services/TaskService";
import { Radio, FormControlLabel, InputLabel, FormControl, Select,FormHelperText } from "@material-ui/core";
import { TaskSchema } from "./ValidationSchemas";
import Alert from "react-bootstrap/Alert";

const NewTaskForm = (props) => {
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    type :"",
    assigned_to: "",
    assigned_by: "",
    priority: "LOW",
    status: "NEW",
  });
  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });
  let types = ["TASK", "DEFECT"];
  const curr_project = props.match.params.project_id;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    TaskService.getUsers().then((data) => {
      let userObj = data.users;
      let result = userObj.map((a) => a.username);
      setUsers(result);
    });
  }, []);

  const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  const authContext = useContext(AuthContext);
  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      type:"",
      assigned_to: "",
      assigned_by: "",
      priority: "",
      status: "NEW",
    });
  };

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (task.type === "Select") {
      task.type = "";
    }
    if (task.assigned_to === "Select") {
      task.assigned_to = "";  
    }
    const { error } = TaskSchema.validate({
      title: task.title,
      description: task.description,
      type: task.type,
      assigned_to: task.assigned_to
    });
    if (error) {
      setError({
        errorEnum: error.details[0].context.key,
        errorMsg: error.details[0].message,
      });
    } else{

      task.assigned_by = user.username;

      TaskService.postTask(task, curr_project).then((data) => {
        const { message } = data;
        resetForm();
        if (!message.msgError) {
          timerID = setTimeout(() => {
            props.history.goBack();
          }, 2000);
          setMessage(message.msgBody);
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
    <div className="new_task_form_section container">
      <Container className="new_task_form">
        <br />

        <form onSubmit={onSubmit}>
          <h3>Create New Task</h3>
          <br />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={task.title.toUpperCase() || ""}
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
            value={task.description || ""}
            onChange={handleChange}
            multiline
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
          <FormControl variant="outlined" style={{ minWidth: 300 }}>
            <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
            <Select
              native
              value={task.type || ""}
              onChange={handleChange}
              label="Type"
              fullWidth
              inputProps={{
                name: "type",
                id: "outlined-age-native-simple",
              }}
            >
              <option>Select</option>
              {types &&
                types.map((type, index) => {
                  return <option key={type}>{type}</option>;
                })}
            </Select>
          </FormControl>
          {err.errorEnum === "type" ? (
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
          <FormControl variant="outlined" style={{ minWidth: 300 }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Assign To
            </InputLabel>
            <Select
              native
              value={task.assigned_to || ""}
              onChange={handleChange}
              label="Assigned to"
              fullWidth
              inputProps={{
                name: "assigned_to",
                id: "outlined-age-native-simple",
              }}
            >
              <option>Select</option>
              {users &&
                users.map((user, index) => {
                  return <option key={user}>{user}</option>;
                })}
            </Select>
          </FormControl>
          {err.errorEnum === "assigned_to" ? (
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
          <FormControlLabel
            value="LOW"
            control={
              <Radio
                color="primary"
                checked={task.priority === "LOW"}
                onChange={handleChange}
                value="LOW"
                name="priority"
                inputProps={{ "aria-label": "LOW" }}
              />
            }
            label="LOW"
            labelPlacement="top"
          ></FormControlLabel>
          <FormControlLabel
            value="MEDIUM"
            control={
              <Radio
                color="primary"
                checked={task.priority === "MEDIUM"}
                onChange={handleChange}
                value="MEDIUM"
                name="priority"
                inputProps={{ "aria-label": "MEDIUM" }}
              />
            }
            label="MEDIUM"
            labelPlacement="top"
          ></FormControlLabel>
          <FormControlLabel
            value="HIGH"
            control={
              <Radio
                color="primary"
                checked={task.priority === "HIGH"}
                onChange={handleChange}
                value="HIGH"
                name="priority"
                inputProps={{ "aria-label": "HIGH" }}
              />
            }
            label="HIGH"
            labelPlacement="top"
          ></FormControlLabel>

          <br />

          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
          <br />
          <br />
        </form>
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
      <br />
    </div>
  );
};

export default NewTaskForm;
