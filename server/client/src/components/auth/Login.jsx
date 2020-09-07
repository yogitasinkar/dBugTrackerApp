import React, { useState, useContext } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { TextField, FormHelperText } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { loginSchema} from "./ValidationSchemas";
import Alert from 'react-bootstrap/Alert'


const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      password: "",
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const { error } = loginSchema.validate({
      username: user.username,
      password: user.password,
    });
    if (error) {
      setError({
        errorEnum: error.details[0].context.key,
        errorMsg: error.details[0].message,
      });
    } else {
      AuthService.login(user).then((data) => {
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          props.history.push("/projects");
        } else {
          setMessage("Username and Password do not match.");
          resetForm();
        }
      });
    }
  };

  return (
    <>
      <div className="register_section">
        <div className="Register shadow p-3 mb-5 bg-white rounded">
          <div className="register_title">
            <h4>Sign In</h4>
          </div>
          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <TextField
              required
              id="standard-secondary"
              className="loginfield"
              name="username"
              onChange={onChange}
              label="Username"
              color="primary"
              value={user.username}
              aria-describedby="component-error-text"
              fullWidth
            />
            {err.errorEnum === "username" ? (
              <FormHelperText
                id="component-error-text"
                style={{ position: "absolute" }}
              >
                {err.errorMsg}
              </FormHelperText>
            ) : (
              ""
            )}
            <TextField
              required
              id="standard-secondary"
              onChange={onChange}
              name="password"
              value={user.password}
              className="loginfield"
              type="password"
              label="Password"
              color="primary"
              fullWidth
            />
            {err.errorEnum === "password" ? (
              <FormHelperText
                id="component-error-text"
                style={{ position: "absolute" }}
              >
                {err.errorMsg}
              </FormHelperText>
            ) : (
              ""
            )}
            <div className="register_page">
              <button className="register_submit" type="submit">
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>

              <div className="already">
                <span>Don't have an account? </span>
                {"   "}
                <Link to="/register">SIGN UP</Link>
              </div>
            </div>
          </form>
        </div>
        {message ? (
          <Alert className="msg" variant="danger">
            {message}
          </Alert>
        ) : null}
      </div>
    </>
  );
};

export default Login;
