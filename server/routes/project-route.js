const express = require("express");
const projRouter = express.Router();
const passport = require("passport");

const Project = require("../models/project-model");

// CREATE A PROJECT
projRouter.post("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const project = new Project(req.body);
    project.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.projects.push(project);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Project successfully created",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

// GET ALL PROJECTS
projRouter.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find({})
      .sort({ createdAt : -1 })
      .exec((err, document) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true },
            });
        else {
          res.status(200).json({ projects: document, authenticated: true });
        }
      });
  }
);

// GET A PROJECT_BY_ID
projRouter.get("/:project_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById({ _id: req.params.project_id }).exec((err, document) => {
      if (err)
        res
          .status(500)
          .json({
            message: { msgBody: "Error has occured", msgError: true, err: err },
          });
      else {
        res.status(200).json({ project: document, authenticated: true });
      }
    });
  }
);

// EDIT project
projRouter.post(
  "/:project_id/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.updateOne({ _id: req.params.project_id }, { $set: req.body }).exec(
      (err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true},
          });
        else {
          res.status(200).json({ project: document, authenticated: true });
        }
      }
    );
  }
);

module.exports = projRouter;















// current logged in user's project
// projRouter.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.findById({ _id: req.user._id })
//       .populate("projects")
//       .exec((err, document) => {
//         if (err)
//           res.status(500).json({
//             message: { msgBody: "Error has occured", msgError: true },
//           });
//         else {
//           res
//             .status(200)
//             .json({ projects: document.projects, authenticated: true });
//         }
//       });
//   }
// );
