import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "./Modal";
import Tooltip from "@material-ui/core/Tooltip";

const columns = [
  {
    id: "title",
    label: "Title",
    minWidth: 100,
  },
  {
    id: "created_by",
    label: "Project Manager",
    minWidth: 50,
  },
  {
    id: "createdAt",
    label: "Start Date",
    minWidth: 50,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
  },
  {
    id: "viewDetails",
    label: "View Details",
    minWidth: 50,
  },
  {
    id: "access",
    label: "Access",
    minWidth: 20,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ProjectsTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalShow, setModalShow] = useState(false);
  const [currpk, setCurrPk] = useState("");

  let rows1 = props.projects;

  const OpenViewModal = (currpk) => {
    setModalShow(true);
    setCurrPk(currpk);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
// classesInList.forEach((element, index, array) => {
//   for (var key of Object.keys(element)) {
//     if (element[key].includes("ma")) {
//       if (!ans.includes(element)) ans.push(element);
//     }
//   }
// });


  return (
    <Paper className={classes.root}>
      <br/>
      <input type="text" placeholder="search"/>
      <br/>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows1
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const cid = column.id;
                      let value = row[cid];
                      if (cid === "createdAt") value = value.split("T")[0];
                      if (cid === "access") {
                        if (value === "public") {
                          value = (
                            <Tooltip title="Public Access.">
                              <LockOpenIcon />
                            </Tooltip>
                          );
                        } else {
                          value = (
                            <Tooltip title="Private Access. Project Key Needed">
                              <LockIcon />
                            </Tooltip>
                          );
                        }
                      }

                      return cid !== "viewDetails" ? (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      ) : (
                        <TableCell align={column.align}>
                          {row.access === "public" ? (
                            <>
                              <Link to={`/${row._id}/tasks`}>View</Link>
                            </>
                          ) : (
                            <>
                              <span
                                onClick={() => OpenViewModal(row.project_key)}
                              >
                                View
                              </span>
                              <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                project_key={currpk}
                                p_id={row._id}
                                history={props.history}
                              />
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows1.length > 5 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default ProjectsTable;
