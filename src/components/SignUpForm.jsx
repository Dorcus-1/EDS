import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from '../assets/undraw_remotely_-2-j6y.svg'
const SignUpForm = () => {
  return <div className='bg-gray-100 h-screen flex items-center '>
  <div style={{margin:"0 auto"}} className="bg-white w-[80%] h-[90%] rounded-lg flex">
      <div className='max-w-96  h-full flex flex-col justify-center items-center '>
          <div className="pr-24">
          <h1 className='bold pb-4  text-[#101540] font-bold text-2xl'>Sign Up</h1>
          <p className='text-sm'>Create your account to login</p>
          </div>
          <form action="" className=' p-8'>
          <div className="flex flex-col text-sm p-4">
                  <label htmlFor="name">Full Names*</label>
              <input 
              type="text"
              name='Names' 
              placeholder='Enter your email'
              className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
              /> 
              </div>
              <div className="flex flex-col text-sm p-4">
                  <label htmlFor="email">Email*</label>
              <input 
              type="text"
              name='email' 
              placeholder='Enter your email'
              className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
              /> 
              </div>
            
             <div className="flex flex-col text-sm p-4">
                  <label htmlFor="password">Password*</label>
              <input 
              type="password"
              name='password' 
              placeholder='Minimum 8 characters'
              className='p-2.5 border w-full border-gray-300 rounded-md bg-gray-100'
              /> 
             </div>
             <div className="pt-2.5 flex p-4  justify-between ">
              <input 
              type="checkbox"
              className='w-4'

               ></input>
             <label className='text-[14px] ' >I agree all terms</label> 
             <a href="" className='text-[14px] text-[#101540] font-semibold '>privacy policie and fee</a>
             </div>

          <button className='w-80 ml-2  bg-[#101540] font-medium rounded-lg text-sm   py-2.5 text-center text-white'>Signup</button>
          <p className='text-sm p-2 pt-4'>Already have an account? 
          <Link to="/" className="font-medium text-primary-600 hover:underline">Login</Link></p>
          </form>
      </div>
      <div className=" w-full  flex items-center justify-center ">
      <img className=' w-[80%]' src={loginIllustration} alt="Login Illustration" />
      </div>
  </div>
</div>;
};

export default SignUpForm;