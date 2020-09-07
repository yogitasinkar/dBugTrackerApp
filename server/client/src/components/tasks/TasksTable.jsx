import React from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";


import { tableIcons } from "../TableIcons";

const TasksTable = (props)  => {

    
  const rows = props.tasks;


  const data = rows.map((row) => {

    row.viewDetails =(
        <Link
          to={{
            pathname: `/${props.project_id}/${row._id}/task`,
            Editobj: { isEditable: props.isEditable },
          }}
        >View</Link>
    )

    if (props.user === row.assigned_to) {
      row.assigned_to = "Me";
    }
    if (props.user === row.assigned_by) {
      row.assigned_by = "Me";
    }
    row.title = row.title.toUpperCase();

    return row;
  });

  return (
    <>
    <MaterialTable
      className="tasktable"
      icons={tableIcons}
      title="Tasks"
      columns={[
        { title: "Title", field: "title" },
        { title: "Type", field: "type" },
        { title: "Priority", field: "priority" },
        {
          title: "Created On",
          field: "createdAt",
          type: "datetime",
          render: (row) => (
            <span>{(row["createdAt"] = row["createdAt"].split("T")[0])}</span>
          ),
        },
        { title: "Status", field: "status" },
        { title: "Assigned By", field: "assigned_by" },
        { title: "Assigned To", field: "assigned_to" },
        {
          title: "View",
          field: "viewDetails",
          sorting: false,
        },
      ]}
      data={data}
      options={{
        sorting: true,
        // paging: data.length > 5
      }}
    />
    <br/>
    <br/>
    </>
  );
}

export default TasksTable;
