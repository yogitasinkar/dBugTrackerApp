import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NewProjectItem = () => {
  return (
    <div className="add_new_project">
      <Link
        to={`/newProjectForm`}
        style={{ color: "inherit", textDecoration: "" }}
      >
        <Button variant="contained" color="primary" size="large">
          Add New
        </Button>
      </Link>
    </div>
  );
};

export default NewProjectItem;
