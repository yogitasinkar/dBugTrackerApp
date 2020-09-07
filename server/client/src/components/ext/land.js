import React, { useRef } from "react";
import logo from "../../assets/images/landing.png";
import getStarted from "../../assets/images/getStarted.png";
import Features from "../features/features";
import NavigationBar from "../navbar/NavigationBar";

const Home = (props) => {

  const featureRef = useRef();

  const useStyle = {
    logo: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "50px",
    },
    tagline: {
      color: "gainsboro",
      fontFamily: "Comfortaa",
      fontSize: "20px",
      marginTop: "-25px",
    },
    button: {
      width: "200px",
    },
  };

  const handleOnClick = (event) => {
    var features = document.getElementById("features");
    if (features) {
      features.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <>
      {/* <NavigationBar handleOnClick={handleOnClick}/>  */}
      <section className="home">
        <div style={useStyle.logo}>
          <img src={logo} className="responsive" alt="Brand logo" />
          <img
            src={getStarted}
            className="getStarted"
            alt="Get Started"
            onClick={handleOnClick}
          />
        </div>
      </section>
      {/* <Features featureRef={featureRef} />  */}
    </>
  );
};

export default Home;
