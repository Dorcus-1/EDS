import React from 'react';
import { useEffect, useState } from "react";
import data from '../assets/data.json'
import App from './TableBody';
import Modal from './Modal';

const EmployeeTable = () => {
 
  return <div style={{gridColumn:"-2/-1",gridRow:"-2/-1"}} className='bg-[#c8cceb] flex items-center justify-center'>

    <div  className="bg-white  w-[95%] h-[90%] rounded-lg flex  flex-col m-6" >
      <div className="flex h-[60px] w-full justify-between items-center">
        <h1 className='font-medium text-xl p-4' >Books Table</h1>  
      </div>
    <App/>
    </div>
  </div>;
  
};
export default EmployeeTable;