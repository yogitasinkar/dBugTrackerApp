import React, { useState } from "react";
import MaterialTable from "material-table";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "./Modal";
import Tooltip from "@material-ui/core/Tooltip";

import { tableIcons } from "../TableIcons";


function ProjectTable(props) {

  const [modalShow, setModalShow] = useState(false);
  const [currpk, setCurrPk] = useState("");
  const OpenViewModal = (currpk) => {
    setModalShow(true);
    setCurrPk(currpk);
  };

  const rows=props.projects;

  const data = rows.map((row) => {
    if(row.access === "public"){
        row.viewDetails = <Link to={`/${row._id}/tasks`}>View</Link>;
    } else{
      row.viewDetails = (
        <>
          <span onClick={() => OpenViewModal(row.project_key) }style={{cursor: "pointer"}}>View</span>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            project_key={currpk}
            p_id={row._id}
            history={props.history}
          />
        </>
      );
    }
    row.title = row.title.toUpperCase()

    return row
  })

  return (
    <MaterialTable
      icons={tableIcons}
      title="Projects"
      columns={[
        { title: "Title", field: "title" },
        { title: "Created By", field: "created_by" },
        {
          title: "Start Date",
          field: "createdAt",
          type: "datetime",
          render: (row) => <span>{(row["createdAt"] = row["createdAt"].split("T")[0])}</span>,
        },
        { title: "Status", field: "status" },
        {
          title: "View",
          field: "viewDetails",
          sorting: false,
        },
        {
          title: "Access",
          field: "access",
          customSort: (a, b) => b.access.length - a.access.length,
          lookup: {
            public: (
              <Tooltip title="Public Access.">
                <LockOpenIcon />
              </Tooltip>
            ),
            private: (
              <Tooltip title="Private Access. Project Key Needed">
                <LockIcon />
              </Tooltip>
            ),
          },
        },
      ]}
      data={data}
      options={{
        sorting: true,
      }}
    />
  );
}


export default ProjectTable;