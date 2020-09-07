const express = require("express");
const taskRouter = express.Router({ mergeParams: true });
const passport = require("passport");
const JWT = require("jsonwebtoken");

const Task = require("../models/task-model");
const Comment = require("../models/comment-model");

// CREATE A TASK
taskRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let task = new Task(req.body);
    task.set("project_id", project_id);
    task.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: { 
            msgBody: "Error has occured",
            msgError: true 
          } 
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Task successfully created",
            msgError: false,
          },
        });
      }
    });
  }
);

// GET ALL TASKS ASSIGNED TO ME (curr_user)
taskRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let userName = req.user.username;
    Task.find({
      project_id: project_id,
      assigned_to: userName,
    }).exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res
          .status(200)
          .json({ tasks: document, authenticated: true, username: userName });
      }
    });
  }
);

// GET ALL TASKS ASSIGNED BY ME (curr_user)
taskRouter.get(
  "/assignedByMe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let userName = req.user.username;
    Task.find({
      project_id: project_id,
      assigned_by: userName,
    }).exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res
          .status(200)
          .json({ tasks: document, authenticated: true, username: userName });
      }
    });
  }
);

// Remaining--- GET ALL OTHER TASKS IN PROJ
taskRouter.get(
  "/oth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let userName = req.user.username;
    Task.find({
      $and: [
        {
          project_id: {
            $eq: project_id,
          },
        },
        {
          assigned_to: {
            $ne: userName,
          },
        },
        {
          assigned_by: {
            $ne: userName,
          },
        },
      ],
    }).exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res
          .status(200)
          .json({ tasks: document, authenticated: true, username: userName });
      }
    });
  }
);

// Count All Tasks in a project
taskRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let userName = req.user.username;
    Task.estimatedDocumentCount({ project_id: { $eq: project_id } }).exec(
      (err, result) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true },
            });
        else {
          res
            .status(200)
            .json({
              tasksCount: result,
              authenticated: true,
              username: userName,
            });
        }
      }
    );
  }
);


// Count All Resolved Tasks in a project
taskRouter.get(
  "/all/resolved",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project_id = req.params.project_id;
    let userName = req.user.username;
    Task.estimatedDocumentCount({
      $and: [
        {
          project_id: {
            $eq: project_id,
          },
        },
        {
          status: {
            $eq: "COMPLETED",
          },
        },
      ],
    }).exec((err, result) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        res.status(200).json({
          tasksCountResolved: result,
          authenticated: true,
          username: userName,
        });
      }
    });
  }
);

// GET A TASK_BY_ID
taskRouter.get(
  "/:task_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findById({ _id: req.params.task_id }).exec((err, document) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({ task: document, authenticated: true });
      }
    });
  }
);

// EDIT TASK
taskRouter.post(
  "/:task_id/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.updateOne({ _id: req.params.task_id }, { $set: req.body }).exec(
      (err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({ task: document, authenticated: true });
        }
      }
    );
  }
);


module.exports = taskRouter;
