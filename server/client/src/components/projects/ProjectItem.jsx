import React from "react";
import { Link } from "react-router-dom";
// import LaunchIcon from "@material-ui/icons/Launch";


const ProjectItem = (props) => {
 let updatedAt = props.project.updatedAt.split("T")[0];
  return (
    <div
      className="card"
      style={{
        width: "20rem",
        padding: "20px",
        paddingBottom: "0px",
        backgroundColor: "#409091",
        color: "#F8F3ED",
        fontFamily: "Comfortaa",
        margin: "0 auto",
        margin: "10px",
      }}
    >
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{props.project.title.toUpperCase()}</h4>
        <p className="card-text" style={{ color: "#2A292B" }}>
          <strong>{props.project.description}</strong>
        </p>
        <button type="button" className="mt-auto ml-auto btn btn-light-blue btn-md">
          <Link to={`${props.project._id}/tasks`}>
            {/* <LaunchIcon style={{ fontSize: 40, color: "black" }} /> */}
            View
          </Link>
        </button>
        <br />
        <p style={{ fontSize: 14, color: "black" }}>
          Last Updated: {updatedAt}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
