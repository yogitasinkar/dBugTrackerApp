const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    created_by: {    
      type: String,
    },
    created_on: {   
      type: String,
    },
    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED"],
    },
    access: {
        type: String,
        enum: ["public", "private"],
    },
    project_key:{
      type: String,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
