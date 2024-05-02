import React, { useContext } from "react";
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
    console.log(data); // log all data
    console.log(data.fullName); // log only fullname
  };

  const handleHome = (e) => {
    
    e.preventDefault(); // Prevents form submission or other default actions
    setCurrentView(0);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group">
            <input
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="form-control"
            />
            {errors.fullName && (
              <p className="text-danger">Full Name is required.</p>
            )}
          </div>
          <div className="form-group">
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
          <button type="submit" className="btn btn-primary" onClick={handleHome}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Email;
