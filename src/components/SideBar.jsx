import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillAliwangwang } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";



const navigation = [

  {
    link: "/book",
    icon: <FaBookOpen />,
    text: "Books",
    badge: null,
  },

];

const SideBar = () => {
  return <div style={{ gridColumn: "1/2", gridRow: "1/3" }} className='flex items-center pt-[3rem]" bg-[#101540]  flex-col  p-5'>
    <div className="w-full flex justify-center items-center p-4">
      <FaBookOpen className='text-white text-2xl  font-bold' />
      <h1 className='text-white text-2xl font-bold pl-3'>LMS</h1>
    </div>

    <div className="h-full  w-full flex items-center justify-center pt-8">
      <ul className="space-y-2 font-medium  flex flex-col h-full w-full  justify-start ">
        {
          navigation.map((item, index) => {
            return (
              <li key={index} className=''>
                <Link to={item.link} className="flex items-center  p-2 bg-white rounded-lg text-[#101540] ">
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