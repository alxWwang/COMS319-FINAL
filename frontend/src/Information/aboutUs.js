import React, { useState,createContext } from "react";
import Nic from '../pictures/gsnteng.jpg';
import Annabelle from '../pictures/anabelle.jpeg';

// Styles
const styles = {
    header: {
      backgroundColor: '#712cf9',
      color: 'white',
      padding: '10px 20px'
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      padding: '0',
      font: 'inherit',
      cursor: 'pointer',
      outline: 'inherit'
    },
    cta: {
      float: 'right',
      padding: '8px 16px',
      background: '#00BFFF',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px'
    },
    mainTitle: {
      textAlign: 'center',
      padding: '5%'
    },
    subTitle: {
      textAlign: 'center',
      padding: '5px',
      fontSize: '15px'
    },
    date: {
      textAlign: 'center',
      paddingBottom: '5%',
      fontSize: '15px'
    },
    container: {
      maxWidth: '960px',
      margin: 'auto',
      padding: '40px'
    },
    profileImg: {
      width: '100%'
    },
    profileInfo: {
      fontFamily: "'Courier New', Courier, monospace",
      color: 'brown'
    },
    footer: {
      marginTop: '100px',
      backgroundImage: 'linear-gradient(to right, rgba(172, 66, 255, 1), rgba(103, 40, 153, 1), rgba(96, 23, 154, 1), rgba(86, 7, 148, 1))',
      height: '70px',
      boxShadow: '1px 4px 8px 1px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      overflow: 'hidden',
      flexDirection: 'row'
    },
    contactInfo: {
      textAlign: 'center',
      color: 'white'
    }
  };

  
function AboutUs(){
return(
    <>

      <main>
        <section>
          <h1 style={styles.mainTitle}>About info</h1>
          <h2 style={styles.subTitle}>
            SE/ComS319 Construction of User Interfaces, Spring 2024
          </h2>
          <h3 style={styles.date}>
            Date: 03-09-2024
          </h3>
        </section>

        <section id="about">
          <div style={styles.container}>
            <img src={Nic} alt="Profile Photo" style={styles.profileImg} />
            <h1>Nicholas Wang</h1>
            <p style={styles.profileInfo}>
              Web Developer
            </p>
            <p>
              My name is Nicholas Wang, currently I am a sophomore at Iowa State
              University studying Computer Science. I have always been interested in
              web development and programming. This website serves as my portfolio
              showcasing some of the projects that I've worked on.
            </p>
          </div>
        </section>

        <section id="about">
          <div style={styles.container}>
            <img src={Annabelle} alt="Profile Photo" style={styles.profileImg} />
            <h1>Yi Yun Khor</h1>
            <p style={styles.profileInfo}>
              UI Developer
            </p>
            <p>
              My name is Yi Yun Khor, currently I am a senior at Iowa State
              University studying Computer Science. I have always been interested in
              UI and UX design. This website serves as contact info for job seeking.
            </p>
          </div>
        </section>
      </main>
    </>
);
}

export default AboutUs;