import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { LocalStorage } from "tubular-common";
import {
  AggregateFunctions,
  ColumnDataType,
  createColumn,
} from "tubular-common";
import { DataGrid, ToolbarOptions } from "tubular-react";



const columns = [
  createColumn("title", {
    aggregate: AggregateFunctions.Count,
    filterable: true,
    searchable: true,
    label: "Title",
    sortable: true,
  }),
  createColumn("created_by", {
    aggregate: AggregateFunctions.Count,
    filterable: true,
    searchable: true,
    label: "Project Manager",
    sortable: true,
  }),
  createColumn("createdAt", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    label: "Start Date",
    sortable: true,
  }),
  createColumn("status", {
    aggregate: AggregateFunctions.Count,
    filterable: true,
    label: "Status",
    sortable: true,
  }),
  createColumn("viewDetails"),
  createColumn("access"),
];



const ProjectsTable = (props) => {

  let rows1 = props.projects;

  return (
    <Paper >
      <DataGrid
        columns={columns}
        dataSource={rows1}
        storage={new LocalStorage()}
        gridName="Grid"
      />
    </Paper>
  );
}

export default ProjectsTable;