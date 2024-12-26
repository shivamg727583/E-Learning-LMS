import { Book, BookDashed, Edit2, LogOut, LogOutIcon, Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadUserQuery, useLogoutUserMutation } from '@/feature/api/authApi';
import { toast } from 'sonner';

function Navbar() {
  const {data,isLoading,error} = useLoadUserQuery();
  const [logoutUser,{data:logoutdata,isSuccess,isError,isLoading:logoutIsLoading}] = useLogoutUserMutation();

const user = data?.user || null;
console.log('user',user)
const navigate = useNavigate();

useEffect(()=>{
  if(isSuccess){
    toast.success(logoutdata?.message || 'Logged out successfully');
    navigate('/login')
  }
},[isSuccess,navigate])
  
const handleLogoutUser = async()=>{
 await  logoutUser();
}
  
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
       
       <Avatar className="w-10 h-10 shadow-md"> 
      <AvatarImage src={user.photoUrl || ''} alt="DP" className='object-cover rounded-full w-full h-full' />
      <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
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
         
      <DropdownMenuItem onClick={handleLogoutUser}>
       
         <span>Log out</span>
         <LogOutIcon />
       </DropdownMenuItem>
         
      { user?.role === 'instructor' && (
         <DropdownMenuItem>
       
         <span>Dashboard</span>
         
       </DropdownMenuItem>
      )}

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

const MobileNavBar = () => {
  const { data, isLoading, error } = useLoadUserQuery();
  const [logoutUser, { data: logoutdata, isSuccess, isError, isLoading: logoutIsLoading }] = useLogoutUserMutation();

  const user = data?.user || null;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(logoutdata?.message || 'Logged out successfully');
      navigate('/login');
    }
  }, [isSuccess,navigate]);

  const handleLogoutUser = async () => {
    await logoutUser();
  };

  return (
    <Sheet className="">
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full bg-gray-200">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="font-extrabold text-xl">E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />

        { user ? (<nav className="flex flex-col space-y-4">
          <Link to="my-learning">
            <span className="w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm">
              My Learning
              <Book size={'20'} />
            </span>
          </Link>
          <Link to="profile">
            <span className="w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm">
              Edit Profile
              <Edit2 size={'20'} />
            </span>
          </Link>

          <span
            onClick={handleLogoutUser}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer hover:transition-all rounded-sm"
          >
            Logout
            <LogOut size={'20'} />
          </span>
        </nav>) : (
          <nav className="flex  items-center justify-around space-x-4">
            <Link to="login">
            <Button>Login</Button>
          </Link>
          <Link to="signup">
            <Button>Signup</Button>
          </Link>
          </nav>

        )}

        {user?.role === 'instructor' && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
