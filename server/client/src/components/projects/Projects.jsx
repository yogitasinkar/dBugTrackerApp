import React, { useState, useEffect, useContext } from "react";
import NewProjectItem from "./NewProjectItem";
import ProjectsTable from "./ProjectsTable";
import ProjectService from "../../services/ProjectService";
import { AuthContext } from "../../context/AuthContext";


const Projects = (props) => {

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {

    ProjectService.getProjects().then((data) => {
      if (!data.msgError ) {
        setProjects(data.projects);
      } 
      else if (data.msgBody === "UnAuthorized") {
        setMessage(data);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);       
      } else {
        setMessage(data);
      }
    });
   
  }, []);

  return (
    <div className="project_section container">
      <div>
        <h6>Create New Project</h6>
        <NewProjectItem></NewProjectItem>
      </div>
      <hr />
      <h6>View Projects</h6>
      <div className="Projects">
        <ProjectsTable projects={projects}></ProjectsTable>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );

};

export default Projects;
