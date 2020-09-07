import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NewTaskItem = (props) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    assigned_to: "",
    assigned_by: "",
    priority: "LOW",
    status: "NEW",
  });
  const { project_id } = props;
  return (
    <div className="">
      <Link
        to={{
          pathname: `/${project_id}/newTaskForm`,
          task: task,
          setTask: setTask,
        }}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Button variant="contained" color="primary" size="large">
          Add New
        </Button>
      </Link>
    </div>
  );
};

export default NewTaskItem;
