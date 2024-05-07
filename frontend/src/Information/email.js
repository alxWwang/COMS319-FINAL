import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { currentViewContext } from "../website";

function Email() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Extracting the reset function from useForm
  } = useForm();

  //onclick function
  const { currentView, setCurrentView } = useContext(currentViewContext);

  const onSubmit = (data) => {
    console.log("Email submitted", data);
    console.log(data); // log all data
    console.log(data.fullName); // log only fullname
    sendEmail(data.fullName, data.email)
   
  };


  const sendEmail = async (name, addy) => {
    const data = { name, email: addy }; // Your JSON object
    try {
      const response = await fetch("http://localhost:3000/sendEmail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(response.status == 200){
        alert('Email sent')
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleHome = (e) => {
    
    e.preventDefault(); // Prevents form submission or other default actions
    setCurrentView(0);
  };

  const fillInStyle={
    margin:'10px',
  };

  const [isHovered, setIsHovered] = useState(false);  // State to track hover

  const buttonStyle = {
    margin: "0 20px",
    padding: "9px 10px",
    backgroundColor: isHovered ? "rgba(169, 0, 0, 0.8)" : "rgba(0, 136, 169, 1)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease 0s",
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group " style={fillInStyle}>
            <input
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-control"
            />
            {errors.fullName && (
              <p className="text-danger">Full Name is required.</p>
            )}
          </div>
          <div className="form-group" style={fillInStyle}>
            <input
              {...register("email", {
                required: "Email is required", // Provide a message directly for the 'required' rule
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // More specific pattern
                  message: "Invalid email format, ex:userEmail@gmail.com", // Custom message for pattern validation
                },
              })}
              placeholder="Email"
              className="form-control"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          {/* after clicking submit will appear alert and go to map page */}
          <button type="submit" className="btn btn-primary"  style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Email;
