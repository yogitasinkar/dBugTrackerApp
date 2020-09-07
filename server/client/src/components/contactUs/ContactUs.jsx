import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, Container, FormHelperText } from "@material-ui/core/";
import { visitorSchema } from "./ValidationSchema";
import ContactUsService from "../../services/ContactUsService";
import Alert from "react-bootstrap/Alert";

const ContactUs = (props) => {

    const handleClickUp = (e) => {
      var features = document.getElementById("features");
      if (features) {
        features.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }; 

    const [visitor, setVisitor] = useState({
      name: "",
      email: "",
      comment: ""
    })

    const [err, setError] = useState({
      errorEnum: "",
      errorMsg: "",
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);
    const handleChange = (e) => {
      setVisitor({
        ...visitor,
        [e.target.name]: e.target.value,
      });
    }

    const resetForm = () => {
      setVisitor({
        name: "",
        email: "",
        comment: "",
      });
    }

    const onSubmit = (e) => {
      e.preventDefault();
      const { error } = visitorSchema.validate({
        name: visitor.name,
        email: visitor.email,
        comment: visitor.comment,
      });

      if (error) {
        setError({
          errorEnum: error.details[0].context.key,
          errorMsg: error.details[0].message,
        });
      } else {
        setError({
          errorEnum: "",
          errorMsg: "",
        });
        ContactUsService.postVisitorDetails(visitor).then((data) => {
          const { message } = data;
          resetForm();
          if (!message.msgError) {
            timerID = setTimeout(() => {
              setMessage(null);
            }, 2000);
            setMessage(message.msgBody);
          } else {
            setMessage(message);
          }
        });
      }      
    }

  return (
    <>
      <section id="contactUs">
        <div className="new_task_form_section container">
          <Container className="new_task_form">
            <form onSubmit={onSubmit}>
              <br />
              <h3 style={{ textAlign: "center" }}>Contact Us</h3>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={visitor.name || ""}
                onChange={handleChange}
                fullWidth
              />
              {err.errorEnum === "name" ? (
                <FormHelperText
                  id="component-error-text"
                  style={{ position: "absolute" }}
                >
                  {err.errorMsg}
                </FormHelperText>
              ) : (
                ""
              )}
              <br />
              <br />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={visitor.email || ""}
                onChange={handleChange}
                fullWidth
              />
              {err.errorEnum === "email" ? (
                <FormHelperText
                  id="component-error-text"
                  style={{ position: "absolute" }}
                >
                  {err.errorMsg}
                </FormHelperText>
              ) : (
                ""
              )}
              <br />
              <br />
              <TextField
                label="Comment"
                name="comment"
                value={visitor.comment || ""}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
              {err.errorEnum === "comment" ? (
                <FormHelperText
                  id="component-error-text"
                  style={{ position: "absolute" }}
                >
                  {err.errorMsg}
                </FormHelperText>
              ) : (
                ""
              )}
              <br />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "44%",
                }}
              >
                Send
              </Button>
              <br />
              <br />
            </form>
          </Container>
          <br/>
          {message ? (
            <Alert className="msg" variant="success">
              {message}
            </Alert>
          ) : null}
        </div>
        <div className="navigate-contactUs">
          <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={handleClickUp} />{" "}
        </div>
      </section>
    </>
  );
};

export default ContactUs;
