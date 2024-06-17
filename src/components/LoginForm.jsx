import React, { useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import loginIllustration from '../assets/undraw_remotely_-2-j6y.svg'
import axios from 'axios';
import * as Yup from "yup";
import  { unauthenticatedApi } from '../api/api';
import { message } from 'antd';


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const LoginUser = async (event) => {
   event.preventDefault();

   const validationSchema = Yup.object().shape({
     email: Yup.string().email().required("Email is required"),
     password: Yup.string().required("Password is required")
   });

   try {
     await validationSchema.validate({ email, password });

     const user = { email, password };

     const response = await unauthenticatedApi.post(
       "http://localhost:9000/user/login",
       user,
       {
        headers: {
          "Content-Type": "application/json"
        }
       }
     );
    console.log("response: " + response.data.token);

     if (response.data.token) {
       // Set the token in the headers
       const token = response.data.token;
       localStorage.setItem('token', token);
       message.success("Logged in successfully")

       // Navigate to the employee component after successful login
       navigate("/employee");
     } else {
       console.error("Invalid response from the server");
     }
   } catch (error) {
     console.error("Error logging in:", error);
     message.error("Error logging in:", error)
   }
 };

  return <div className='bg-gray-100 h-screen flex items-center '>
    <div style={{margin:"0 auto"}} className="bg-white w-[80%] h-[90%] rounded-lg flex">
        <div className='max-w-96  h-full flex flex-col justify-center items-center '>
            <div className="pr-8">
            <h1 className='bold pb-4  text-[#101540] font-bold text-2xl'>Login</h1>
            <p className='text-sm'>Welcome back please enter your details</p>
            </div>
            <form action="" className=' p-8' onSubmit={LoginUser}>
                <div className="flex flex-col text-sm p-4">
                    <label htmlFor="email">Email*</label>
                <input 
                type="text"
                name='email' 
                placeholder='Enter your email'
                className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
                onChange={(e) => setEmail(e.target.value)}
                /> 
                </div>
              
               <div className="flex flex-col text-sm p-4">
                    <label htmlFor="password">Password*</label>
                <input 
                type="password"
                name='password' 
                placeholder='Minimum 8 characters'
                className='p-2.5 border w-full border-gray-300 rounded-md bg-gray-100'
                onChange={(e) => setPassword(e.target.value)}
                /> 
               </div>
               <div className="pt-2.5 flex p-4  justify-between ">
                <input 
                type="checkbox"
                className='w-4'

                 ></input>
               <label className='text-[14px] pr-12' >Remember me</label> 
               <a href="" className='text-[14px] text-[#101540] font-semibold '>Forgot Password?</a>
               </div>

            <button type="submit"  className='w-80 ml-2  bg-[#101540] font-medium rounded-lg text-sm   py-2.5 text-center text-white'>Login</button>
            <p className='text-sm p-2 pt-4'>Don't have an account? 
            <Link to="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link></p>
            </form>
        </div>
        <div className=" w-full  flex items-center justify-center ">
        <img className=' w-[80%]' src={loginIllustration} alt="Login Illustration" />
        </div>
    </div>
  </div>;
};
export default LoginForm;