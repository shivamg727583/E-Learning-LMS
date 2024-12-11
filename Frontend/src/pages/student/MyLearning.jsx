import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import Course from './Course';

function MyLearning() {
    const isLoading = false; // Simulated loading state
    const MyLearningCourses = [1, 2]; // Simulated course data

    return (
        <div className='max-w-4xl mx-auto my-10 px-4 md:px-0'>
            <h1 className='uppercase font-bold text-2xl'>My Learning</h1>
            <div className="my-5">
                {isLoading ? (
                    <LearningSkeleton />
                ) : (
                    MyLearningCourses.length === 0 ? (
                        <h2 className='text-xl'>You are not enrolled in any course.</h2>
                    ) : 
                        (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {MyLearningCourses.map((course, idx) => (
                                <Course key={idx} course={course} />
                            ))}
                            </div>
                        )
                    
                )}
            </div>
        </div>
    );
}

export default MyLearning;

const LearningSkeleton = () => {
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
    );
};
