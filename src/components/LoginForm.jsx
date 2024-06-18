import React, { useState } from "react";

import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { unauthenticatedApi } from "../api/api";
import loginIllustration from "../assets/undraw_books_re_8gea.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginUser = async (event) => {
    event.preventDefault();

    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });

    try {
      await validationSchema.validate({ email, password });

      const user = { email, password };

      const response = await unauthenticatedApi.post(
        "http://localhost:9000/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response: " + response.data.token);

      if (response.data.token) {
        // Set the token in the headers
        const token = response.data.token;
        localStorage.setItem("token", token);
        message.success("Logged in successfully");

        // Navigate to the employee component after successful login
        navigate("/book");
      } else {
        console.error("Invalid response from the server");
      }
    } catch (error) {
      // console.log(error.response.data)
      message.error(error.response.data ?? "there was an error");
    }
  };

  return (
    <div className="bg-[#c8cceb] w-full justify-center md:justify-start h-screen flex items-center ">
      <div
        style={{ margin: "0 auto" }}
        className="bg-white w-fit mx-2 md:w-[80%] h-[90%] rounded-lg flex"
      >
        <div className="max-w-96  h-full flex flex-col justify-center items-center ">
          <div className="">
            <h1 className="bold pb-4  text-[#101540] font-bold text-2xl">
              Login
            </h1>
            <p className="text-sm font-bold">
              Welcome back our library management system
            </p>
          </div>
          <form action="" className="p-4 md:p-8" onSubmit={LoginUser}>
            <div className="flex flex-col text-sm p-4">
              <label htmlFor="email" className="font-bold text-base">
                Email*
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="p-2.5 w-full border border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-sm p-4">
              <label htmlFor="password" className="font-bold text-base">
                Password*
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                className="p-2.5 border w-full border-gray-300 rounded-md bg-gray-100"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-80 ml-2  bg-[#101540] font-medium rounded-lg text-sm   py-2.5 text-center text-white"
            >
              Login
            </button>
            <p className="text-sm p-2 pt-4">
              Don't have an account?
              <Link
                to="/register"
                className=" text-primary-600 hover:underline font-bold text-base"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <div className=" w-full hidden  lg:flex items-center justify-center ">
          <img
            className=" w-[70%]"
            src={loginIllustration}
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
