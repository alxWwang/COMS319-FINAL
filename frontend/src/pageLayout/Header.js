import React, { useContext } from "react";
import { currentViewContext } from "../website";

function Header() {
    const headerStyle = {
      backgroundImage:
        "linear-gradient(to right, rgba(172, 66, 255, 1), rgba(103, 40, 153, 1), rgba(96, 23, 154, 1), rgba(86, 7, 148, 1))",
      height: "70px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      minWidth: "470px",
      minHeight: "50px",
      marginBottom: "50px",
      position: "sticky",
    };
  
    const navStyle = {
      listStyle: "none",
      display: "flex",
    };
  
    const linkStyle = {
      background: "none",
      color: "white",
      border: "none",
      padding: "0 20px",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline",
      fontSize: "inherit", // Ensures font consistency
      transition: "all 0.3s ease 0s",
    };
  
    const buttonStyle = {
      margin: "0 20px",
      padding: "9px 10px",
      backgroundColor: "rgba(0, 136, 169, 1)",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease 0s",
    };
  
    //onclick function
    const { currentView, setCurrentView } = useContext(currentViewContext);
  
    const handleHome = (e) => {
      e.preventDefault(); // Prevents form submission or other default actions
      setCurrentView(0);
    };
    
    const handleAboutUs = (e) => {
      e.preventDefault(); // Prevents form submission or other default actions
      setCurrentView(1);
    };
    const handleTutorial = (e) => {
      e.preventDefault(); // Prevents form submission or other default actions
      setCurrentView(2);
    };
  
    return (
      <header style={headerStyle}>
        <h1 id="name" style={{ color: "white", margin: "0 20px" }}>
          MAPPY
        </h1>
        <nav id="horizontal_navigation">
          <ul style={navStyle}>
          <li style={{ display: "inline-block", padding: "0px 20px" }}>
              <button style={linkStyle} onClick={handleHome}>
                  Home
              </button>
            </li>
          
            <li style={{ display: "inline-block", padding: "0px 20px" }}>
              <button style={linkStyle} onClick={handleAboutUs}>
                About Us
              </button>
            </li>
            <li style={{ display: "inline-block", padding: "0px 20px" }}>
              <button style={linkStyle} onClick={handleTutorial}>
               Tutorial
              </button>
              </li>
          </ul>
        </nav>
  
          <button id="cta_button" style={buttonStyle} onClick={handleAboutUs}>
            Contact Us
          </button>
        
      </header>
    );
  };
  
  export default Header;
  