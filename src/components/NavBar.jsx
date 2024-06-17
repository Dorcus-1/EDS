import React, { useState } from 'react';
import { FaRegBell } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useSearchContext } from '../context/SearchContext';

const NavBar = () => {
  const{query,setQuery}=useSearchContext()
  const[search,setSearch]=useState("")
  const handleSearch=(e)=>{
    e.preventDefault()
    console.log("consoling ",search)
    setQuery(search)
    console.log(query)
  }
  return <div style={{gridColumn:"2/3",gridRow:"-3/-2"}}  className='border border-slate-100 flex items-center justify-between'>
<div className=" ml-8">
  <form class="max-w-md mx-auto ">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-[500px]">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" value={search} onChange={(e)=>{
          setSearch(e.target.value)

        }} id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-600 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-gray-500 dark:focus:border-gray-500"  placeholder="Search Employees, More..." required />
        <button class="text-gray-500 absolute end-1.5 bottom-1.5    font-medium rounded-lg text-sm px-4 py-2  dark:hover:text-gray-900 dark:focus:ring-gray-800" onClick={handleSearch}>Search</button>
    </div>
</form>
</div>

<div className="flex items-center mr-8">
<FaRegBell  />
<div class="relative w-10 h-10 m-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
<IoLogOutOutline />
</div>
  </div>;
};
export default NavBar;