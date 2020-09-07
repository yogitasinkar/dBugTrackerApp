import React from "react";
import logo from "../../assets/images/landing.png"
import getStarted from "../../assets/images/getStarted.png"



const Home = (props) => {

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
      var features  = document.getElementById("features")
      if(features) { 
        features.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        
      } 
    };  

  return (
    <>    
      <section id="home">
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
    </>
  );
};

export default Home;
