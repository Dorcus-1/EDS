import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillAliwangwang } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";



const navigation = [

    {
      link: "/employee",
      icon: <FaRegUserCircle />,
      text: "Employees",
      badge: null,
    },
 
  ];

const SideBar = () => {
  return <div style={{gridColumn:"1/2",gridRow:"1/3"}} className='flex items-center pt-[3rem]  flex-col  p-5'>
     <h1>EDS</h1> 
    <div className="h-full  w-full flex items-center justify-center pt-8">
    <ul className="space-y-2 font-medium  flex flex-col h-full w-full  justify-start ">
        {
            navigation.map((item,index) => {
                  return (
                     <li key={index} className=''>
                           <Link to={item.link} className="flex items-center  p-2 text-gray-500 text-sm hover:bg-gray-200 bg-gray-100">                              
                                 {item.icon}                              
                              <span className="ml-3">{item.text}</span>
                           </Link>
                     </li>
                  )
            })
        }       
      </ul>
    </div>
  </div>;
};
export default SideBar;