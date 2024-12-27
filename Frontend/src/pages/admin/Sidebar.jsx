import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Sidebar() {
    
  return (
    <div className='flex'>
        <div className='hidden lg:block w-[250px] sm:w-[300px]  space-y-8 border-r-gray-300 dark:border-gray-700 dark:bg-gray-800 bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
        <div className=' space-y-4'>
<Link to='/admin/dashboard' className='text-2xl flex font-bold items-center hover:bg-white w-full p-5 gap-3 text-gray-800 dark:text-gray-200'>
<ChartNoAxesColumn size={22} />
<h1>Dashboard</h1>
</Link>
<Link to='/admin/course' className='text-2xl flex items-center gap-3 font-bold hover:bg-white w-full p-5 text-gray-800 dark:text-gray-200'>
<SquareLibrary size={22} />
<h1>Courses</h1>
</Link>
            </div>
           

    </div>
    <div className="flex-1 md:p-14 p-2 bg-white dark:bg-gray-800">

    <Outlet />
    </div>

    </div>
  )
}

export default Sidebar