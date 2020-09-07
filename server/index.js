const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001

// atlas user pwd: newyear
const MONGODB_URI =
  "mongodb+srv://yogita:newyear@dbugtracker.3rspa.mongodb.net/<dbname>?retryWrites=true&w=majority"; 

app.use(cookieParser());
app.use(express.json());


mongoose.connect( MONGODB_URI || 
  "mongodb://localhost:27017/mernauth",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('connected', () => {
    console.log("MongoDb is connected ! :)")
});

const userRouter = require("./routes/user-route");
app.use("/user", userRouter);

const projRouter = require("./routes/project-route");
app.use("/projects", projRouter);

const taskRouter = require("./routes/task-route");
app.use("/:project_id/tasks", taskRouter);

const commentRouter = require("./routes/comment-route");
app.use("/:project_id/tasks/:task_id/comments", commentRouter);

const contactUsRouter = require("./routes/contactUs-route");
app.use("/contactUs", contactUsRouter);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../client/build'))

  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log("express server started");
});
