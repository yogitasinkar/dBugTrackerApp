import React, { useRef,useContext, useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
import CommentService from "../../services/CommentService";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  TextField,
  Container,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  Radio,
  FormHelperText,
} from "@material-ui/core/";
import Alert from "react-bootstrap/Alert";
import { TaskSchema } from "./ValidationSchemas";
import Comments from "./Comments";


const ViewTaskItem = (props) => {
  
  const project_id = props.match.params.project_id;
  const task_id = props.match.params.task_id;
  let date = new Date().toISOString().split("T")[0];

  const authContext = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [task, setTask] = useState({});
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });
  let timerID = useRef(null);

  let isEditable = false
  if (props.location.Editobj)
    isEditable = props.location.Editobj.isEditable;


  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (props.location.Editobj){
      TaskService.getTaskById(project_id, task_id).then((data) => {
        if (!data.msgError) {
          setTask(data.task);
        } else if (data.msgBody === "UnAuthorized") {
          setMessage(data);
          authContext.setUser({ username: "", role: "" });
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(data);
        }
      });
      TaskService.getUsers().then((data) => {
        let userObj = data.users;
        let result = userObj.map((a) => a.username);
        setUsers(result);
      });
    } else{
      props.history.goBack();
    }

  }, []);

  const resetForm = () => {
    setTask({
      ...task,
    });
  };

  const getComments = () => {
    setShowComments(true);
    CommentService.getComments(project_id, task_id).then((data) => {
      if (!data.msgError) {
        setComments(data.comments);
      } else if (data.msgBody === "UnAuthorized") {
        //setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        // setMessage(data);
      }
    });  
  }

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(task.type === "Select"){
      task.type = ""
    }
    if (task.assigned_to === "Select") {
      task.assigned_to = "";
    }
    const { error } = TaskSchema.validate({
      title: task.title,
      description: task.description,
      type: task.type,
      assigned_to: task.assigned_to,
    });
    if (error) {
      setError({
        errorEnum: error.details[0].context.key,
        errorMsg: error.details[0].message,
      });
    } else {
      task.assigned_by = user.username;
      TaskService.editTask(task, project_id, task_id).then((data) => {

        resetForm();
        if (!data.msgError) {
          timerID = setTimeout(() => {
            props.history.goBack();
          }, 2000);
          setMessage("Task Updated Successfully");
        } else if (data.msgBody === "UnAuthorized") {
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
    <div className="view_task_item_section container">
      <Container className="view_task_item_form">
        <br />
        <form onSubmit={onSubmit}>
          <h3>View Task {!isEditable && <span> - Read Only</span>}</h3>
          <br />

          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={task.title || ""}
            onChange={handleChange}
            disabled={!isEditable}
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
            disabled={!isEditable}
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
          <div style={{ display: "flex" }}>
            <FormControl variant="outlined" style={{ minWidth: 200, flex: 1 }}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Assign To
              </InputLabel>
              <Select
                native
                value={task.assigned_to || ""}
                onChange={handleChange}
                label="Assigned to"
                fullWidth
                disabled={!isEditable}
                inputProps={{
                  name: "assigned_to",
                  id: "outlined-age-native-simple",
                }}
              >
                {users &&
                  users.map((user, index) => {
                    return <option>{user}</option>;
                  })}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl variant="outlined" style={{ minWidth: 300, flex: 1 }}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Status
              </InputLabel>
              <Select
                native
                value={task.status || ""}
                onChange={handleChange}
                label="Status"
                fullWidth
                disabled={!isEditable}
                inputProps={{
                  name: "status",
                  id: "outlined-age-native-simple",
                }}
              >
                <option>NEW</option>
                <option>IN PROGRESS</option>
                <option>IN REVIEW</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </Select>
            </FormControl>
          </div>
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                disabled={!isEditable}
                inputProps={{ "aria-label": "HIGH" }}
              />
            }
            label="HIGH"
            labelPlacement="top"
          ></FormControlLabel>

          <br />
          <br />
          <TextField
            name="created_on"
            label="Created On"
            variant="outlined"
            defaultValue={date}
            disabled={!isEditable}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <br />
          <br />
          <Button
            type="submit"
            disabled={!isEditable}
            variant="contained"
            color="secondary"
          >
            Update
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
      <div className="comments_section">
        <Button variant="contained" color="primary" onClick={getComments}>
          {showComments ? "Comments" : "View Comments"}
        </Button>
        {showComments && (
          <Comments
            comments={comments}
            getComments={getComments}
            project_id={project_id}
            task_id={task_id}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTaskItem;
