import App from "./main";
import Header from "./pageLayout/Header";
import Footer from "./pageLayout/Footer";
import AboutUs from "./Information/aboutUs";
import Tutorial from "./Information/tutorial";
import Email from "./Information/email";
import React, { useState,createContext } from "react";
export const currentViewContext=createContext();

function Website() {
    const[currentView, setCurrentView] = useState(0);

    const appStyle = {
        display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Use 100vh to take full height of the viewport
    
        justifyContent: 'space-between' // Ensures that the footer pushes to the bottom
      };

  return (
    <div style={appStyle}>
    <currentViewContext.Provider value={{currentView, setCurrentView}}>
    <Header/>
    {currentView === 0 && <App/>}
    {currentView === 1 && <AboutUs />}
    {currentView === 2 && <Tutorial />}
    {currentView ===3 && <Email/>}
    </currentViewContext.Provider>
    <Footer/>
    </div>
  );
}
export default Website;
