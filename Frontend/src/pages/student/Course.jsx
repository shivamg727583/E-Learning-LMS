import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function Course() {
  return (
    <Card classname="overflow-hidden rounded-lg dark:bg-gray-800 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300" >
  <div className='realtive '>
<img src="https://th.bing.com/th/id/OIP.9aDfr7W8jgb2z3jXPxcvnwHaEK?w=2560&h=1440&rs=1&pid=ImgDetMain" alt="" className='w-full h-36 object-cover rounded-t-lg' />
  </div>
  <CardContent className='mt-2 flex flex-col gap-2'>
    <h2 className="text-lg truncate font-bold text-gray-900 dark:text-white">Next.js Complete course</h2>
    <div className='flex items-center justify-between' >
    <div className="flex items-center gap-1">
<Avatar className='w-7 h-7'>
    <AvatarImage src='https://th.bing.com/th/id/OIP.9aDfr7W8jgb2z3jXPxcvnwHaEK?w=2560&h=1440&rs=1&pid=ImgDetMain' />
    <AvatarFallback >CN</AvatarFallback>
</Avatar>
<h1 className='font-medium text-sm'>Shivam MernStack</h1>
    </div>
    <Badge className={`bg-blue-600 p-2 py-1 rounded-xl`} >Begginer</Badge>
    </div>
    <div className='text-lg font-bold'>
        <span>₹540</span>
    </div>
  </CardContent>
  </Card>
  
  )
}

export default Course