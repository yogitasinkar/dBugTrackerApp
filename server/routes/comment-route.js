const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const passport = require("passport");
const JWT = require("jsonwebtoken");

const Comment = require("../models/comment-model");

// POST A COMMENT
commentRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const task_id = req.params.task_id;
    let comment = new Comment(req.body);
    comment.set("task_id", task_id);
    comment.save((err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "Error has occured",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Comment successfully added",
            msgError: false,
          },
        });
      }
    });
  }
);

// GET ALL COMMENTS
commentRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const task_id = req.params.task_id;
    let userName = req.user.username;
    Comment.find({
      task_id: task_id,
    })
      .sort({ createdAt: -1 })
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({
            comments: document,
            authenticated: true,
            username: userName,
          });
        }
      });
  }
);

// EDIT COMMENT
commentRouter.post(
  "/:comment_id/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.updateOne({ _id: req.params.comment_id }, { $set: req.body }).exec(
      (err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({ comment: document, authenticated: true });
        }
      }
    );
  }
);

module.exports = commentRouter;