import App from "./main";
import Header from "./pageLayout/Header";
import React, { useState,createContext } from "react";
export const currentViewContext=createContext();

function Website() {
    const[currentView, setCurrentView] = useState(0);

  return (
    <>
    <currentViewContext.Provider value={{currentView, setCurrentView}}>
    <Header/>
    {currentView === 0 && <App/>}
   
    </currentViewContext.Provider>
   
    </>
  );
}
export default Website;
