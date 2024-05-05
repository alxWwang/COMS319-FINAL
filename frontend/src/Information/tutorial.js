import React, { useState,createContext } from "react";
import tut0 from '../pictures/tutorials/tut0.png';
import tut1 from '../pictures/tutorials/tut1.png';
import tut2 from '../pictures/tutorials/tut2.png';
import tut3 from '../pictures/tutorials/tut3.png';
import tut4 from '../pictures/tutorials/tut4.png';
import tut5 from '../pictures/tutorials/tut5.png';
import tut6 from '../pictures/tutorials/tut6.png';

// Inline styles for containers and layout
const styles = {
    mainTitle: {
      textAlign: 'center',
      padding: '5%'
    },
    container: {
      maxWidth: '960px',
      margin: 'auto',
      padding: '40px'
    },
    imageFull: {
      width: '100%'
    },
    tutorialText: {
      padding: '20px',
      fontSize: '16px'
    },
    tutorialSection: {
      paddingBottom: '10rem'
    },
    imageHalf: {
      width: '30%',
      float: 'left',
      marginRight: '5rem'
    }
  };
  
function Tutorial(){
    return (
        <main>
          <section>
            <h1 style={styles.mainTitle}>How to use the website</h1>
    
            <div style={styles.container}>
              <img src={tut0} alt="Main Interface" style={styles.imageFull} />
              <p style={styles.tutorialText}>
                This is the main interface of the website, which shows the main map, and the search bar on top. 
                You can type in any location as you would in Google Maps. This pulls from the Google Maps API, therefore
                it is limited to countries that support Google Maps.
              </p>
            </div>
    
            <div style={styles.container}>
              <img src={tut1} alt="Search Results" style={styles.imageFull} />
              <p style={styles.tutorialText}>
                Begin by searching the location of the first point of travel, then it will look up 20 different places nearby that location
                within the 5 kilometer radius. The categories include: restaurant, museum, cafe, night club, clothing stores.
              </p>
            </div>
    
            <div style={{...styles.container, ...styles.tutorialSection}}>
              <img src={tut2} alt="Route Selection" style={styles.imageHalf} />
              <p style={styles.tutorialText}>
                When the recommended boxes are hovered over, the name of the place and a "+" button is implemented to add the desired location of route to the list of selected locations.
              </p>
            </div>
    
            <div style={styles.container}>
              <img src={tut3} alt="Travel Precedence" style={styles.imageFull} />
              <p style={styles.tutorialText}>
                In order from left to right, is in the order of precedence. Include the first point of travel on the left most column and continue to the right. 
              </p>
            </div>
    
            <div style={{...styles.container, ...styles.tutorialSection}}>
              <img src={tut4} alt="Location Identification" style={styles.imageHalf} />
              <p style={styles.tutorialText}>
                When you hover over the location, the name of the place will pop-up. This will help users to easily identify the location they have selected before.
                If user want to remove the place selected, "-" button is implemented to delete the desired locaiton of the route of the list of selected locations.
              </p>
            </div>

            <div style={styles.container}>
              <img src={tut5} alt="Save button" style={styles.imageFull} />
              <p style={styles.tutorialText}>
                The 'save' button serve as email function which will lead user to email page.
              </p>
            </div>

            <div style={styles.container}>
              <img src={tut6} alt="Email page" style={styles.imageFull} />
              <p style={styles.tutorialText}>
                After clicking the 'save' button, user is able to input thier full name and correct format of email.
              </p>
            </div>


          </section>
        </main>
);
}

export default Tutorial;