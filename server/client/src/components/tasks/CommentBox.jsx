import React, { useContext, useState } from "react";
import { Button, TextField, Paper, FormHelperText } from "@material-ui/core/";
import { AuthContext } from "../../context/AuthContext";
import CommentService from "../../services/CommentService";


const CommentBox = (props) => {


    const commentObj = props.comment;
    const project_id = props.project_id;
    const task_id = props.task_id;
    const comment_id = commentObj._id;

    const [comment, setComment] = useState(commentObj.comment);
    const [isEditMode, setIsEditMode] = useState(false);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const [err, setError] = useState({
        errorEnum: "",
        errorMsg: "",
    });
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const toggleEdit = () => {
        setIsEditMode(true)
    }

    const updateComment = (e) => {
			e.preventDefault();
			setIsEditMode(false);
      if(comment === ""){
        setError({
          errorEnum: "comment",
          errorMsg: "Comment cannnot be empty",
        });
      }
			commentObj.comment = comment;
			const commentObjSend = {
				comment: comment,
				user: authContext.user.username,
			};
			CommentService.editComment(commentObjSend, project_id, task_id, comment_id).then((data) => {
				if (!data.msgError) {
				//props.history.goBack();
				} else if (message.msgBody === "UnAuthorized") {
				setMessage(message);
				authContext.setUser({ username: "", role: "" });
				authContext.setIsAuthenticated(false);
				} else {
				setMessage(message);
				}
			});
    }

    return (
      <Paper className="comment">
        <p>{commentObj.user.toUpperCase()}</p>
        <p>
          <em>
            {commentObj.createdAt.split("T")[0]}{" "}
            {commentObj.createdAt.split("T")[1].split(".")[0]}{" "}
          </em>
        </p>

        {user.username === commentObj.user && isEditMode ? (
          <>
            <TextField
              label=""
              name="comment"
              value={comment || ""}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />
            {err.errorEnum === "description" ? (
              <FormHelperText
                id="component-error-text"
                style={{ position: "absolute" }}
              >
                {err.errorMsg}
              </FormHelperText>
            ) : (
              ""
            )}
          </>
        ) : (
          <p>{commentObj.comment}</p>
        )}
        {user.username === commentObj.user &&
          (isEditMode ? (
            <Button
              className="add_comment_button ml-auto"
              variant="contained"
              color="secondary"
              onClick={updateComment}
            >
              Update
            </Button>
          ) : (
            <Button
              className="add_comment_button ml-auto"
              variant="contained"
              color="secondary"
              onClick={toggleEdit}
            >
              Edit
            </Button>
          ))}
      </Paper>
    );
}

export default CommentBox;

