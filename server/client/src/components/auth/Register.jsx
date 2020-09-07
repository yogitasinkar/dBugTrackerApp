import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { TextField, Select, FormHelperText } from "@material-ui/core";
import { basicSchema, contactSchema, loginDetailsSchema } from "./ValidationSchemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faArrowAltCircleLeft, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Alert from 'react-bootstrap/Alert'

const Register = (props) => {

  const [user, setUser] = useState({
    firstname: "yoyo",
    lastname: "yoyoyo",
    email: "yo@gi.yo",
    phone: "9999999999",
    username: "yoman",
    password: "12345678",
    role: "Developer",
  });

  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [message, setMessage] = useState(null);
  const [msgVariant, setMsgVariant] = useState("success");
  const [page, setPage] = useState(1);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const [err, setError] = useState({
    errorEnum: "",
    errorMsg: "",
  });

  const basic = (dir) => {
    const { error } = basicSchema.validate({ firstname: user.firstname, lastname: user.lastname });
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
      if(dir==="next"){
        setPage((prevState) => prevState + 1);
      } else{
        setPage((prevState) => prevState - 1);
      }
    }
  };

  const contact = (dir) => {
    const { error } = contactSchema.validate({ email: user.email, phone: user.phone });
    
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
      if(dir==="next"){
        setPage((prevState) => prevState + 1);
      } else{
        setPage((prevState) => prevState - 1);
      }
    }
  };

  const onChange = (e) => {
    if(e.target.name === "confirmPassword")
      setConfirmPassword(e.target.value)
    else
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      role: "Developer",
    });
  };
  
  const resetLoginDetailsForm = () => {
    setUser({
      ...user,
      username: "",
      password: "",
    });
    setConfirmPassword("")
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { error } = loginDetailsSchema.validate({ username: user.username, password: user.password, confirmPassword:confirmPassword });
    if (error) {
      setError({
        errorEnum: error.details[0].context.key,
        errorMsg: error.details[0].message,
      });
    } else {
        AuthService.register(user).then((data) => {
          const { message } = data; 
          setMessage(message.msgBody);
          if (!message.msgError) {
            timerID = setTimeout(() => {
              props.history.push("/login");
            }, 2000);
            resetForm();
            setPage(1);
          } else{
            setMsgVariant("danger")
            resetLoginDetailsForm();
          }
        }); 
        setError({
          errorEnum: "",
          errorMsg: "",
        });
        
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if(page === 1)
      basic("next")
    else if(page === 2)
      contact("next")
  };

  const prevPage = (e) => {
    e.preventDefault();
    if (page === 2) 
      setPage((prevState) => prevState - 1);
    else if(page === 3) 
      setPage((prevState) => prevState - 1);
  };

  return (
    <>
      <div className="register_section">
        <div className="Register shadow p-3 mb-5 bg-white rounded">
          <div className="register_title">
            <h4>Sign Up</h4>
          </div>
          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            {page === 1 && (
              <div>
                <div className="register_page_title">
                  <h5>Basic</h5>
                </div>
                <TextField
                  required
                  id="standard-secondary"
                  className="regisfield"
                  name="firstname"
                  onChange={onChange}
                  label="First Name"
                  color="primary"
                  value={user.firstname}
                  aria-describedby="component-error-text"
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
                <TextField
                  required
                  id="standard-secondary"
                  className="regisfield"
                  label="Last Name"
                  onChange={onChange}
                  name="lastname"
                  color="primary"
                  value={user.lastname}
                  fullWidth
                />
                {err.errorEnum === "lastname" ? (
                  <FormHelperText
                    id="component-error-text"
                    style={{ position: "absolute" }}
                  >
                    {err.errorMsg}
                  </FormHelperText>
                ) : null}
                <p className="regisfield"></p>
                <br />
                <Select
                  native
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={onChange}
                  style={{ paddingRight: "50px!important" }}
                  fullWidth
                >
                  <option value="Developer">Developer</option>
                  <option value="Admin">Admin</option>
                </Select>
              </div>
            )}
            {page === 2 && (
              <div>
                <div className="register_page_title">
                  <h5>Contact</h5>
                </div>
                <TextField
                  required
                  id="standard-secondary"
                  className="regisfield"
                  label="Email"
                  onChange={onChange}
                  name="email"
                  value={user.email}
                  color="primary"
                  inputProps={{
                    type: "email",
                  }}
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
                <TextField
                  required
                  id="standard-secondary"
                  className="regisfield"
                  label="Phone"
                  onChange={onChange}
                  name="phone"
                  inputProps={{ maxLength: 10 }}
                  value={user.phone}
                  color="primary"
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
                <TextField
                  required
                  id="standard-secondary"
                  label="Phone"
                  color="primary"
                  fullWidth
                  style={{ visibility: "hidden" }}
                />
              </div>
            )}
            {page === 3 && (
              <div>
                <div className="register_page_title">
                  <h5>Login Details</h5>
                </div>
                <TextField
                  required
                  id="standard-secondary"
                  onChange={onChange}
                  name="username"
                  value={user.username}
                  className="regisfield"
                  label="Username/ Emp Id"
                  color="primary"
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
                  className="regisfield"
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
                <TextField
                  required
                  id="standard-secondary"
                  onChange={onChange}
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  className="regisfield"
                  label="Confirm Password"
                  color="primary"
                  fullWidth
                />
                {err.errorEnum === "confirmPassword" ? (
                  <FormHelperText
                    id="component-error-text"
                    style={{ position: "absolute" }}
                  >
                    {err.errorMsg}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </div>
            )}

            <div className="register_page">
              {(page === 2 || page === 3) && (
                <span className="register_prev_page" onClick={prevPage}>
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                </span>
              )}
              {(page === 1 || page === 2) && (
                <span className="register_next_page" onClick={nextPage}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              )}
              {page === 3 && (
                <button className="register_submit" type="submit">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
              )}
              <div className="already">
                <span>Already have an account? </span>
                {"   "}
                <Link  to="/login">
                  SIGN IN
                </Link>
              </div>
            </div>
          </form>
        </div>
        {message ? (
          <Alert className="msg" variant={msgVariant}>
            {message}
          </Alert>
        ) : null}
      </div>
    </>
  );
};

export default Register;
