import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function HeroSection() {
  return (
    <div className='relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center'>
        <div className="max-w-3xl mx-auto">
<h1 className='text-white text-4xl font-bold mb-4'>Find the Best Courses for You</h1>
<p className='text-gray-200 '>Discover, Learn , and upskill with our wide range of courses</p>


<form action="" className='flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-2xl mt-3 max-auto mb-6 '>

 <Input type="text" className='flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-100 ' placeholder='Search the books' />
 
 <Button className='bg-blue-500' >Search</Button>
 
</form>
<Button className='bg-white dark:bg-gray-800 text-blue-600 hover:bg-gray-300 rounded-xl' >Explore Courses</Button>
        </div>
    </div>
  )
}

export default HeroSection