import React from 'react';

const Footer = () => {
  const footerStyle = {
    marginTop: '100px',
    backgroundImage: 'linear-gradient(to right, rgba(172, 66, 255, 1), rgba(103, 40, 153, 1), rgba(96, 23, 154, 1), rgba(86, 7, 148, 1))',
    height: '70px',
    boxShadow: '1px 4px 8px 1px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    minWidth: '470px',
    minHeight: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'row'

  };

  const contactStyle = {
    textAlign: 'center',
    margin: '50px',
    padding: '5px'
  };

  const paragraphStyle={
    color: 'white', 
  }
  
  return (
    <footer style={footerStyle}>
      <section id="contact1" className="contact" style={contactStyle}>
        <p style={paragraphStyle}>Phone: 1 (515) 815-4987</p>
        <p style={paragraphStyle}>Email: nawang2@iastate.edu</p>
        <p style={paragraphStyle}>Instagram: alx__wang</p>
      </section>
      <section id="contact2" className="contact" style={contactStyle}>
        <p style={paragraphStyle}>Phone: 1 (515) 520-5750</p>
        <p style={paragraphStyle}>Email: belle27@iastate.edu</p>
        <p style={paragraphStyle}>Instagram: yiyunkhor</p>
      </section>
    </footer>
  );
};

export default Footer;
