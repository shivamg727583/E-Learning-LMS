import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function Profile() {
  return (
    <div className='max-w-4xl mx-auto px-4 my-10'>
        <h1 className='uppercase font-bold text-2xl text-center md:text-left'>Profile</h1>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
            <div>
                <Avatar className='w-24 h-24 md:h-32 md:w-32 mb-4'>
                    <AvatarImage src='https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png' className='bg-red-400' alt='profilePic' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className='mb-2'>
                    <h1 className='font-semibold text-gray-900 dark:text-gray-100 '>
                        Name : <span className='font-normal text-gray-700 dark:text-gray-300'>Shivam MernStack</span>
                    </h1>
                </div>
                <div className='mb-2'>
                    <h1 className='font-semibold text-gray-900 dark:text-gray-100 '>
                        Email : <span className='font-normal text-gray-700 dark:text-gray-300'>sg123@gmail.com</span>
                    </h1>
                </div>
                <div className='mb-2'>
                    <h1 className='font-semibold text-gray-900 dark:text-gray-100 '>
                        Role : <span className='font-normal text-gray-700 dark:text-gray-300'>Student</span>
                    </h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Name</Label>
                            <Input type='text' placeholder='Name' className='col-span-3' />

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

    </div>
  )
}

export default Profile