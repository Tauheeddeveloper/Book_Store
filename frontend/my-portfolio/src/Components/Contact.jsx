import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

const Contact = () => {
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const contactDetails = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    console.log(data)

    await axios.post(`${window.location.origin}/contact`, contactDetails)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMessage("Message sent successfully!");
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      })
      .catch((er) => {
        setMessage("Failed to send message.");
        setIsSuccess(false);
      });
  };

  useEffect(() => {
    const contactModal = document.getElementById("contact_modal");
    if (contactModal) {
      contactModal.showModal();
    }
  }, []);

  return (
    <div>
      {/* Modal */}
      <dialog id="contact_modal" className="modal">
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
            <h3 className="font-bold text-xl text-center">Contact Us</h3>
            {
              message&&(
                <div className={`flex justify-center items-center ${isSuccess? 'text-green-500':'text-red-500'}`}>
                  <span>{`${isSuccess? "✔" : "✖"}`}</span>
                  <span>{message}</span>
                </div>
              )
            }


            {/* Name Field */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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

            {/* Message Field */}
            <div className="form-control">
              <label htmlFor="message" className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                id="message"
                className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
                placeholder="Enter your message"
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Want to go back?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Home
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Contact;
