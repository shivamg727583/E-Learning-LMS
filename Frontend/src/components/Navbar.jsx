import { Book, BookDashed, Edit2, LogOut, LogOutIcon, Menu, School } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, Links, NavLink } from 'react-router-dom';
// import { useLogoutUserQuery } from '@/feature/api/authApi';
import { userLoggedIn } from '@/feature/authSlice';
import { useLoadUserQuery } from '@/feature/api/authApi';

function Navbar() {
  const {data,isLoading,error} = useLoadUserQuery();
// const {user,succes,message} = data;
const user = data?.user || null;
  
  

  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 '>
{/* Desktop */}
<div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full gap-4">
<div className="flex items-center gap-2">
  <School size={'30'} />
  <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>

</div>
{/* /* User icons and dark mode icon */ }
<div className='flex items-center gap-6'>
  {user ? (
     <DropdownMenu>
     <DropdownMenuTrigger asChild>
       
       <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>SG</AvatarFallback>
    </Avatar>
      
     </DropdownMenuTrigger>
     <DropdownMenuContent className="w-56">
       <DropdownMenuLabel>My Account</DropdownMenuLabel>
       <DropdownMenuSeparator />
     
      
       
          
       <DropdownMenuItem>
       <Link to='my-learning'>  
       <span>My Learning</span>
       </Link>
       
     </DropdownMenuItem>
       
     <DropdownMenuItem>
       <Link to='profile'>
       <span>Edit Profile</span>
       </Link>
       
     </DropdownMenuItem>
         
      <DropdownMenuItem >
       
         <span>Log out</span>
         <LogOutIcon />
       </DropdownMenuItem>
         
       <DropdownMenuItem>
       
         <span>Dashboard</span>
         
       </DropdownMenuItem>

     </DropdownMenuContent>
   </DropdownMenu>
  ): <div className='flex items-center gap-4'> 
     <Link to='login'> <Button variant='outline'>Login</Button></Link>
  <Link to='login'>  <Button >Signup</Button></Link>

     </div>
   

  }
    <DarkMode />
</div>

</div>
<div className="flex md:hidden items-center h-full justify-between px-2">
<div className="flex items-center gap-2 ">
  <School size={'25'} />
  <h1 className='font-extrabold text-xl'>E-Learning</h1>

</div>
<MobileNavBar  />
</div>

    </div>

  
  )
}

export default Navbar;

const MobileNavBar =()=>{
  const role = 'instructor';
  return (
    <Sheet className="">
    <SheetTrigger asChild>
      <Button size='icon' variant="outline" className='rounded-full bg-gray-200'>
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent className='flex flex-col '>
      <SheetHeader className='flex flex-row items-center justify-between mt-2'>
        <SheetTitle className='font-extrabold text-xl'>E-Learning</SheetTitle>
        <DarkMode />
      </SheetHeader>
      <Separator className='mr-2' />

      <nav className='flex flex-col space-y-4'>
<Link to='my-learning'>        <span  className='w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm'>
          My Learning
          <Book size={'20'} />
        </span>
        </Link>
        <Link to='profile'>
        <span className='w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm'>Edit Profile
          <Edit2 size={'20'}/>
        </span>
        </Link>

        <span className='w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm'>
          Logout
          <LogOut size={'20'} />

        </span>

      </nav>
      {role === 'instructor' && (
 <SheetFooter>
 <SheetClose asChild>
   <Button type="submit">Dashboard</Button>
 </SheetClose>
</SheetFooter>
      )}
     
    </SheetContent>
  </Sheet>
  )
}