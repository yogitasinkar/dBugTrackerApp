import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
} from "@material-ui/core/";
import CommentService from "../../services/CommentService";
import CommentBox from "./CommentBox";
import { AuthContext } from "../../context/AuthContext";

const Comments = (props) => {

  const comments = props.comments;
  const [newComment, setNewComment] = useState("");
  
  const project_id = props.project_id;
  const task_id = props.task_id;

  
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const resetForm = () => {
    setNewComment("")
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      comment: newComment,
      user: authContext.user.username
    };
    CommentService.postComment(commentObj, project_id, task_id).then((data) => {
      resetForm();
      if (!data.msgError) {
        props.getComments();
      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="show_comments_section">
      <form onSubmit={onSubmit}>
        <TextField
          label="Add a comment"
          name="newComment"
          value={newComment || ""}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
          variant="outlined"
        />
        <Button
          className="add_comment_button ml-auto"
          variant="contained"
          color="primary"
          type="submit"
        >
          Add
        </Button>
      </form>
      <div>
        <br />
        <br />
        {comments.map((comment) => {
          
          return (
            <div>
              <CommentBox comment={comment} project_id={project_id} task_id={task_id}/>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
