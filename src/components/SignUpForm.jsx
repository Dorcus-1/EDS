import React , { useState }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from '../assets/undraw_books_re_8gea.svg'
import * as Yup from "yup";
import axios from 'axios';
import { message } from 'antd';
const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const validationSchema = Yup.object().shape({
            email: Yup.string().email().required("Email is required"),
            password: Yup.string().required("Password is required")
          });
       
        try {
        await validationSchema.validate({ email, password });
          const user = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
         
          };
    
          const response = await axios.post("http://localhost:9000/user/create", user);
          console.log(response.data);
          message.success("Logged in successfully")
             navigate("/");
    
        } catch (err) {
          console.error("Error creating user", err);
          message.error("Error creating user", err);
        }
      };
     

    
    
  return <div className='bg-[#c8cceb] h-screen flex items-center '>
  <div style={{margin:"0 auto"}} className="bg-white w-[80%] h-[90%] rounded-lg flex">
      <div className='max-w-96  h-full flex flex-col justify-center items-center '>
          <div className="pr-24">
          <h1 className='bold pb-4  text-[#101540] font-bold text-2xl'>Sign Up</h1>
          <p className='text-sm font-bold'>Create your account to login</p>
          </div>
          <form action="" className=' p-8' onSubmit={handleSubmit}>
          <div className="flex flex-col text-sm p-4">
              </div>
              <div className="flex flex-col text-sm p-4 font-semibold">
                  <label htmlFor="firstName" className='font-bold text-base'>Firstname*</label>
              <input 
              type="text"
              name='firstName' 
              placeholder='Enter your firstname'
              className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              /> 
              </div>
              <div className="flex flex-col text-sm p-4">
                  <label htmlFor="firstName" className='font-bold text-base'>Lastname*</label>
              <input 
              type="text"
              name='lastName' 
              placeholder='Enter your lastName'
              className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
              value={lastName}
              onChange={(e) =>setLastName(e.target.value)}
              /> 
              </div>
              <div className="flex flex-col text-sm p-4">
                  <label htmlFor="email" className='font-bold text-base'>Email*</label>
              <input 
              type="text"
              name='email' 
              placeholder='Enter your email'
              className='p-2.5 w-full border border-gray-300 rounded-md bg-gray-100'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              /> 
              </div>
            
             <div className="flex flex-col text-sm p-4">
                  <label htmlFor="password" className='font-bold text-base'>Password*</label>
              <input 
              type="password"
              name='password' 
              placeholder='Minimum 8 characters'
              className='p-2.5 border w-full border-gray-300 rounded-md bg-gray-100'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" 
                  className='w-80 ml-2  bg-[#101540] font-medium rounded-lg text-sm   py-2.5 text-center text-white' 
                >Signup</button>

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