import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Container,
  FormHelperText,
} from "@material-ui/core/";
import Alert from "react-bootstrap/Alert";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import { basicSchema, contactSchema } from "../auth/ValidationSchemas";


const Profile = () => {
    let timerID = useRef(null);
    const [profile, setProfile] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      username: "",
    });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const [err, setError] = useState({
      errorEnum: "",
      errorMsg: "",
    });

    const handleChange = (e) => {
        setProfile({
        ...profile,
        [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const { error } = basicSchema.validate({
        firstname: profile.firstname,
        lastname: profile.lastname,
      });
      if (error) {
        setError({
          errorEnum: error.details[0].context.key,
          errorMsg: error.details[0].message,
        });
      } else {
        const { error } = contactSchema.validate({
          email: profile.email,
          phone: profile.phone,
        });

        if (error) {
          setError({
            errorEnum: error.details[0].context.key,
            errorMsg: error.details[0].message,
          });
        } else{
            setError({
              errorEnum: "",
              errorMsg: "",
            });
            AuthService.editUser(authContext.user.username, profile).then((data) => {
              if (!data.msgError) {
                timerID = setTimeout(() => {
                  setMessage(null);
                }, 2000);
                setMessage("Profile Updated Successfully");
              } else if (data.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" });
                authContext.setIsAuthenticated(false);
              } else {
                setMessage(message);
              }
            });
        }
    }

    }

    useEffect(() => {
      AuthService.getUserByUsername(authContext.user.username).then((data) => {
        if (!data.msgError) {
          setProfile(data.user[0]);
        } else if (data.msgBody === "UnAuthorized") {
          setMessage(data);
          authContext.setUser({ username: "", role: "" });
          authContext.setIsAuthenticated(false);
        } else {
          setMessage(data);
        }
      });
    }, []);

    return (
      <div className="view_task_item_section container">
        <Container className="view_task_item_form">
          <br />
          <form onSubmit={onSubmit}>
            <h3>Profile</h3>
            <br />
              <TextField
                name="firstname"
                label="FirstName"
                variant="outlined"
                value={profile.firstname || ""}
                onChange={handleChange}
                fullWidth
              />
              {err.errorEnum === "firstname" ? (
                <FormHelperText
                  id="component-error-text"
                  style={{ position: "absolute" }}
                >
                  {err.errorMsg}
                </FormHelperText>
              ) : (
                ""
              )}
              <br/>
              <br/>
              <TextField
                name="lastname"
                label="LastName"
                variant="outlined"
                value={profile.lastname || ""}
                onChange={handleChange}
                fullWidth
              />
              {err.errorEnum === "lastname" ? (
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
            <br/>
            <TextField
              name="email"
              label="email"
              variant="outlined"
              value={profile.email || ""}
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
              name="phone"
              label="phone"
              variant="outlined"
              value={profile.phone || ""}
              onChange={handleChange}
              fullWidth
            />
            {err.errorEnum === "phone" ? (
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
            <Button type="submit" variant="contained" color="secondary">
              Update
            </Button>
            <br />
            <br />
          </form>
        </Container>
        <br />
        {message ? (
          <Alert className="msg" variant="success">
            {message}
          </Alert>
        ) : null}
        <br />
      </div>
    );
}

export default Profile;
