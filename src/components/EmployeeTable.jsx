import React from 'react';
import { useEffect, useState } from "react";
import data from '../assets/data.json'
import App from './TableBody';
import Modal from './Modal';

const EmployeeTable = () => {

  const fields = ["FirstName", "LastName", "NationalId", "Telephone", "Email", "Department", "Position", "Manufacturer", "Model", "SN"];
  const itemsPerPage = 2; // Change this value to set the number of rows per page

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the offset and the slice of data to display
  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  return <div style={{gridColumn:"-2/-1",gridRow:"-2/-1"}} className='bg-gray-100 flex items-center justify-center'>

    <div  className="bg-white   rounded-lg flex  flex-col m-6" >
      <div className="flex h-[60px] w-full justify-between items-center">
        <h1 className='font-medium text-xl p-4' >Employee's Laptop</h1>
        <Modal/>
        
      </div>
    <App/>
    </div>
  </div>;
  
};
export default EmployeeTable;