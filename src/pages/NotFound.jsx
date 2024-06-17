import React from 'react';
import { Button, Result } from 'antd';
import notFoundIllustration from '../assets/undraw_not_found_re_bh2e.svg'
const App = () => (
<div className="flex flex-col justify-center items-center h-screen w-full">
    <img src={notFoundIllustration} alt="" />
    <h1 className='text-9xl font-bold text-gray-500 mt-10'>404</h1>
    <h1 className='text-xl font-bold text-gray-500 mt-10'>Not Found</h1>
</div>

);
export default App;