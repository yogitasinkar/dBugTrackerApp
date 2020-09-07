import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core/";
import { AuthContext } from "../../context/AuthContext";
import ProjectService from "../../services/ProjectService";
import Alert from "react-bootstrap/Alert";
import { ProjectSchema } from "./ValidationSchemas";

const NewProjectForm = (props) => {
  const { user } = useContext(AuthContext);
  let date = new Date().toISOString().split("T")[0];

  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "ONGOING",
    access: "public",
    project_key: "",
    created_by: user.username
  });

  const [message, setMessage] = useState(null);
 // const [downloadFile, setdownloadFile] = useState(false);
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);
  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const resetForm = () => {
    setProject({
      title: "",
      description: "",
      status: "ONGOING",
      access: "public",
      project_key: "",
      created_by: "",
    });
  };


  // const handleDownloadFile = (e) => {
  //   setdownloadFile(!downloadFile, download());
  // };

function download(filename, text) {
 
  filename = "projectKey.txt";
  text = document.getElementById("project_key").value;
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  }


  const randomStr = () => {
    let randStr = new Date().toString().replace(/[^a-zA-Z0-9]/g, "");
    let len = 15;
    let pk = ""
    for (let i = len; i > 0; i--) {
      pk += randStr[Math.floor(Math.random() * randStr.length)];
    }
    return pk
  } 


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
      let projectTosend = project;

      if (project.access === "private") {
        let pk = document.getElementById("project_key").value;
        setProject({ ...project, project_key: pk });
        projectTosend = { ...project, project_key: pk };
      }

      ProjectService.postProject(projectTosend).then((data) => {
        const { message } = data;
        resetForm();
        if (!message.msgError) {
          timerID = setTimeout(() => {
            props.history.push("/projects");
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
    <div className="new_project_form_section">
      <Container className="new_project_form">
        <h3 className="new_project_form_heading">Create New Project</h3>
        <form onSubmit={onSubmit}>
          <br />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={project.title}
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
            value={project.description}
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
          <TextField
            name="created_by"
            label="Created By"
            variant="outlined"
            value={user.username}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <br />
          <br />
          <TextField
            name="created_on"
            label="Created On"
            variant="outlined"
            defaultValue={date}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <br />
          <br />
          <RadioGroup
            row
            aria-label="position"
            name="access"
            value={project.access}
            onChange={handleChange}
          >
            <FormControlLabel
              value="public"
              control={<Radio color="primary" value="public" />}
              label="Public"
              labelPlacement="start"
            />
            <FormControlLabel
              value="private"
              control={<Radio color="primary" value="private" />}
              label="Private"
              labelPlacement="start"
            />
          </RadioGroup>
          <div className="access_message">
            {project.access === "public" ? (
              <em>Everyone will have access to the project.</em>
            ) : (
              <em>
                Only users with the project key will have access to the project.
              </em>
            )}
          </div>
          <br />
          {project.access === "private" ? (
            <>
              <TextField
                id="project_key"
                className="new_project_field"
                label="Project key"
                variant="outlined"
                value={randomStr()}
                fullWidth
              />
              <Button color="primary" onClick={download}>
                Save To File
              </Button>
              <div className="private_key_msg">
                <em>
                  Make Sure you have saved the Project key. You will need it to
                  access this project.
                </em>
              </div>
            </>
          ) : null}
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

export default NewProjectForm;

