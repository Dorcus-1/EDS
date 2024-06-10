import React from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import EmployeeTable from '../components/EmployeeTable';

const Employee = () => {
  return <div style={{gridTemplateColumns:"300px 1fr",gridTemplateRows:"80px 1fr"}} className='grid g h-screen '>
    <NavBar></NavBar>
    <SideBar></SideBar>
    <EmployeeTable></EmployeeTable>
  </div>;
};
export default Employee;