import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";


const Features = (props) => {

    const handleClickUp = (e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
          block: "nearest",
        });
    }; 

    const handleClickDown = (e) => {
      var contactUs = document.getElementById("contactUs");
      if (contactUs) {
        contactUs.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } 
    }; 


  return (
    <>
      <section id="features">
        <div className="card">
          <p>No more tapping on shoulders.</p>
        </div>
        <div className="card">
          <p>Built for Agile Teams.</p>
        </div>
        <div className="card">
          <p>Create projects within minutes.</p>
        </div>
        <div className="card">
          <p>Project level Access Control.</p>
        </div>
        <div className="card">
          <p>Create, edit, assign and resolve tasks/bugs effortlessly.</p>
        </div>
        <div className="card">
          <p>Stream line your software development process with ease.</p>
        </div>
        <div className="navigate-features">
          <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={handleClickUp} />{" "}
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            onClick={handleClickDown}
          />
        </div>
      </section>
    </>
  );
};

export default Features;
