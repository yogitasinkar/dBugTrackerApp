const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["TASK", "DEFECT"],
    },
    assigned_to: {
      type: String,
      required: true,
    },
    assigned_by: {
      // Default val from UI as current user (created_by) DROPDOWN
      type: String,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    project_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NEW", "IN PROGRESS", "IN REVIEW", "COMPLETED", "CANCELLED"],
    },
    updated_by: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

