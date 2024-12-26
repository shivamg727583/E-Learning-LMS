import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';

function Courses() {
    const isLoading =false;
  return (
    <div className=' bg-gray-50 '>
        <div className="max-w-7xl mx-auto p-6">
<h1 className='text-center font-extrabold text-3xl mb-5'>Our Courses</h1>

{
    isLoading ?
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '> 
         {
            Array.from({length:8}).map((_,idx)=>(
                <CourseSkeleton key={idx} />
            ))
         }
    </div>
     : 
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '> 
     {
        Array.from({length:18}).map((_,idx)=>(
            <Course key={idx} />
        ))
     }
</div>

     
}
        </div>

    </div>
  )
}

export default Courses;

const CourseSkeleton = ()=>{
    return (
        <div className="bg-white shadow-md hover:shadow-md transition-shadow rounded-lg overflow-hidden">
            <Skeleton className='w-full h-36' />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className='h-6 w-3/4' />
<div className="flex items-center justify-between">
<Skeleton className='h-6 w-6 rounded-full' />
<Skeleton className='h-4 w-20' />

</div>
<Skeleton className='h-4 w-16' />

            </div>

        </div>
    )
}