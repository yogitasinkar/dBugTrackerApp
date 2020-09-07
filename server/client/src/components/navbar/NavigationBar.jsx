import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const NavigationBar = (props) => {
    const { isAuthenticated,user, setIsAuthenticated, setUser } = useContext(
      AuthContext
    );

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {         
              setUser(data.user);
              setIsAuthenticated(false);
              props.history.push("/login");
            }
            
        });
    };
    
    const handleOnClick = (e) => {
      const tag = e.target.className.split(" ")[0]
      var features  = document.getElementById(tag)
      if(features) { 
        features.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });   
      } 
    }; 

    const unauthenticatedNavBar = () => {
        return (
          <>
            <Nav>
              {/* <Link to="/">  */}
              {props.location.pathname === "/" && (
                <div onClick={handleOnClick}>
                  <li className="features nav-item nav-link">
                    Features
                  </li>
                </div>
              )}
              {/* </Link>  */}

              {/* <Link to="/"> */}
              {props.location.pathname === "/" && (
                <div onClick={handleOnClick}>
                  <li className="contactUs nav-item nav-link">Contact Us</li>
                </div> 
              )}
              {/* </Link> */}

            </Nav>
            <Nav className="ml-auto">
              <Link to="/login">
                <li className="nav-item nav-link">Login</li>
              </Link>
              <Link to="/register">
                <li className="nav-item nav-link">Register</li>
              </Link>
            </Nav>
          </>
        );
    };

    const authenticatedNavBar = () => {
        return (
          <>
            <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link>
            <Link to="/projects">
              <li className="nav-item nav-link">Projects</li>
            </Link>
            {/* {user.role === "admin" ? (
              <Link to="/admin">
                <li className="nav-item nav-link">Admin</li>
              </Link>
            ) : null} */}

            <button
              type="button"
              className="btn btn-link nav-item nav-link"
              onClick={onClickLogoutHandler}
            >
              Logout
            </button>
              <Link to="/profile" className="ml-auto">
                <li className="nav-item nav-link">{user.username.toUpperCase() }</li>
              </Link>
          </>
        );
    };


    return (
      <Navbar
        id="nav"
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        className="navi"
      >
        <div className="container">
          {
            <Link to="/">
              <Navbar.Brand className="nav-brand">DBUGTRACKER</Navbar.Brand>
            </Link>
          }

          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <span>
              <FontAwesomeIcon icon={faBars} />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            {!isAuthenticated
              ? unauthenticatedNavBar(props)
              : authenticatedNavBar()}
          </Navbar.Collapse>
        </div>
      </Navbar>
    );

};

export default NavigationBar;
