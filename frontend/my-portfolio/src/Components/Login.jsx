import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'

const Login = () => {
  const [message,setmessage]=useState()
  const [isSuccess,setIsSuccess]=useState(null)
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=async (data)=>{
    const login_user={
      email:data.email,
      password:data.password
    }
    await axios.post(`${window.location.origin}/login`,login_user)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
       
        setmessage("Login Successfull")
        setIsSuccess(true)
        setTimeout(()=>{
          navigate('/')

        },2000)

      }
      
    }).catch((er)=>{
      setmessage("Login Failed")
      setIsSuccess(false)
    })

  }

  useEffect(() => {
    const loginModal = document.getElementById("my_modal_3");
    if (loginModal) {
      loginModal.showModal();
    }
  }, []);

  return (
    <div>
      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="space-y-6">
            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            {/* Title */}
            <h3 className="font-bold text-xl text-center">Login</h3>
            {message &&(
              <div className={` flex justify-center items-center text-center${isSuccess?'text-green-500 ': 'text-red-500'}`}>
                <span>{isSuccess ? "✔" : "✖"}</span>
                <span>{message}</span>
              </div>
            )}


            {/* Email Field */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
