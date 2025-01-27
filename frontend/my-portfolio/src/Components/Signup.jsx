import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import '../../src/index.css'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user,setUser]=useState()
  const saveUser = (userData) => {
    // Save user data in localStorage
    localStorage.setItem("users", JSON.stringify(userData));
    // Update user state
    console.log("User is",user)
    setUser(userData);
  };

  const [responseMessage, setResponseMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null); // `true` for success, `false` for error
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data) => {
    const userinfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(`${window.location.origin}/signup`, userinfo);
      setResponseMessage("Signup Successful!");
      setIsSuccess(true); // Set to true for success

      // Delay navigation to allow the user to see the success message
      setTimeout(() => {
        navigate("/"); // Redirect to homepage or login page after successful signup
      }, 2000); // 2-second delay (you can adjust this)
    } catch (err) {
      setResponseMessage("Signup Failed. Please try again.");
      setIsSuccess(false); // Set to false for error
    }
  };

  useEffect(() => {
    const signupModal = document.getElementById("signup_modal");
    if (signupModal) {
      signupModal.showModal();
    }
  }, []);

  return (
    <div>
      {/* Modal */}
      <dialog id="signup_modal" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            {/* Title */}
            <h3 className="font-bold text-2xl text-center">Sign Up</h3>

            {/* Response Message (Placed in the middle of the form) */}
            {responseMessage && (
              <div
                className={`flex items-center gap-2 mb-4 justify-center ${
                  isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                <span>{isSuccess ? "✔" : "✖"}</span>
                <span>{responseMessage}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Signup;
